<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Repositories\Contracts\ActivityRepositoryInterface;
use Inertia\Inertia;
use App\Models\User;
use App\Models\Activity;

class DashboardController extends Controller
{
    protected $activityRepository;

    public function __construct(ActivityRepositoryInterface $activityRepository)
    {
        $this->activityRepository = $activityRepository;
    }

    public function index()
    {
        $user = auth()->user();
        
        // Ambil data untuk statistik
        $query = Activity::query();
        if ($user->role !== 'atasan') {
            $query->where('user_id', $user->id);
        }

        $totalAktivitas = (clone $query)->count();
        $totalDurasiJam = round((clone $query)->sum('durasi_menit') / 60, 2);

        // Menghitung persentase kategori pekerjaan (BSC, Daily, Improvement)
        $kategoriStats = (clone $query)
            ->selectRaw('kategori, count(*) as jumlah')
            ->groupBy('kategori')
            ->get()
            ->pluck('jumlah', 'kategori');

        return Inertia::render('Dashboard', [
            'userRole' => $user->role,
            'stats' => [
                'totalAktivitas' => $totalAktivitas,
                'totalDurasiJam' => $totalDurasiJam,
                'kategori' => [
                    'BSC_OKR' => $kategoriStats['BSC / OKR'] ?? 0,
                    'Daily_Task' => $kategoriStats['Daily Task'] ?? 0,
                    'Improvement_Goal' => $kategoriStats['Improvement Goal'] ?? 0,
                ]
            ],
            // Jika atasan, kita kirim daftar seluruh anggota tim
            'teamMembers' => $user->role === 'atasan' ? User::where('role', 'karyawan')->get() : []
        ]);
    }
}