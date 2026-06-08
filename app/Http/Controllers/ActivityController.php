<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Repositories\Contracts\ActivityRepositoryInterface;
use Inertia\Inertia;
use Carbon\Carbon;

class ActivityController extends Controller
{
    protected $activityRepository;

    // Melakukan inject interface ke dalam controller
    public function __construct(ActivityRepositoryInterface $activityRepository)
    {
        $this->activityRepository = $activityRepository;
    }

    // Menampilkan halaman dashboard beserta datanya
    public function index()
    {
        $user = auth()->user();

        // Logika Role-Based Access Control (RBAC)
        if ($user->role === 'atasan') {
            $activities = $this->activityRepository->getAllActivities();
        } else {
            $activities = $this->activityRepository->getUserActivities($user->id);
        }

        // Mengirim data ke Frontend React (Inertia)
        return Inertia::render('Activities/Index', [
            'activities' => $activities,
            'userRole' => $user->role
        ]);
    }

    // Fungsi untuk menyimpan aktivitas harian
    public function store(Request $request)
    {
        $validated = $request->validate([
            'tanggal' => 'required|date',
            'task' => 'required|string|max:255',
            'waktu_mulai' => 'required',
            'waktu_akhir' => 'required',
            'keluaran' => 'required|string',
            'kategori' => 'required|string',
            'ibadah' => 'nullable|string'
        ]);

        // Menghitung durasi otomatis menggunakan library Carbon bawaan Laravel
        $mulai = Carbon::parse($validated['waktu_mulai']);
        $akhir = Carbon::parse($validated['waktu_akhir']);

        // Jika waktu akhir lewat tengah malam
        if ($akhir->lessThan($mulai)) {
            $akhir->addDay(); 
        }

        $durasi = $mulai->diffInMinutes($akhir);

        // Menambahkan user_id dan durasi ke dalam data yang akan disimpan
        $validated['user_id'] = auth()->id();
        $validated['durasi_menit'] = $durasi;

        // Menyimpan data melalui Repository
        $this->activityRepository->createActivity($validated);

        return redirect()->back()->with('success', 'Aktivitas berhasil dicatat.');
    }
}