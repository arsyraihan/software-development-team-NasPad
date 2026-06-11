<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Activity;
use App\Models\Note;
use Inertia\Inertia;
use Carbon\Carbon;

class DashboardController extends Controller
{
    public function index()
    {
        $user = auth()->user();
        $isAtasan = $user->role === 'atasan';

        // 1. Total User
        $totalUsers = User::where('role', 'karyawan')->count();

        // Data aktivitas bulan ini
        $query = Activity::with('user')->whereMonth('tanggal', Carbon::now()->month);
        if (!$isAtasan) {
            $query->where('user_id', $user->id);
        }
        $activities = $query->get();

        // 2. Jadwal / Catatan Khusus Hari Ini
        $notesHariIni = Note::with('user')->whereDate('tanggal', Carbon::today())->get();

        // 3. Widget Aktivitas per User (Scrollable)
        $userActivityCounts = [];
        if ($isAtasan) {
            foreach ($activities->groupBy('user_id') as $acts) {
                $userActivityCounts[] = [
                    'name' => $acts->first()->user->name,
                    'total' => $acts->count()
                ];
            }
            // Urutkan dari aktivitas terbanyak
            usort($userActivityCounts, fn($a, $b) => $b['total'] <=> $a['total']);
        }

        // 4. Data untuk ApexCharts (Area, Polar, Bar)
        
        // Chart 1: Area (Trend Durasi Harian)
        $areaLabels = [];
        $areaData = [];
        foreach ($activities->groupBy('tanggal')->sortBy(fn($val, $key) => $key) as $tgl => $acts) {
            $areaLabels[] = Carbon::parse($tgl)->format('d M');
            $areaData[] = round($acts->sum('durasi_menit') / 60, 2);
        }

        // Chart 2: Polar Area (Distribusi Kategori)
        $polarLabels = ['BSC / OKR', 'Daily Task', 'Improvement Goal'];
        $polarData = [
            $activities->where('kategori', 'BSC / OKR')->count(),
            $activities->where('kategori', 'Daily Task')->count(),
            $activities->where('kategori', 'Improvement Goal')->count(),
        ];

        // Chart 3: Bar (Selisih & Perbandingan Durasi)
        $barLabels = [];
        $barData = [];
        if ($isAtasan) {
            foreach ($activities->groupBy('user_id') as $acts) {
                $barLabels[] = explode(' ', $acts->first()->user->name)[0]; // Ambil nama depan saja
                $barData[] = round($acts->sum('durasi_menit') / 60, 2);
            }
        } else {
             foreach ($activities->groupBy('kategori') as $kat => $acts) {
                 $barLabels[] = $kat;
                 $barData[] = round($acts->sum('durasi_menit') / 60, 2);
             }
        }

        return Inertia::render('Dashboard', [
            'userRole' => $user->role,
            'totalUsers' => $totalUsers,
            'notesHariIni' => $notesHariIni,
            'userActivityCounts' => $userActivityCounts,
            'chartData' => [
                'area' => ['labels' => $areaLabels, 'data' => $areaData],
                'polar' => ['labels' => $polarLabels, 'data' => $polarData],
                'bar' => ['labels' => $barLabels, 'data' => $barData],
            ]
        ]);
    }
}