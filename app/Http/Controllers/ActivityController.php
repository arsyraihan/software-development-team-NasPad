<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\ActivityService;
use App\Repositories\Contracts\ActivityRepositoryInterface;
use App\Models\AppNotification; // Tambahan untuk memanggil model notifikasi
use Inertia\Inertia;

class ActivityController extends Controller
{
    protected $activityService;
    protected $activityRepository;

    public function __construct(ActivityService $activityService, ActivityRepositoryInterface $activityRepository)
    {
        $this->activityService = $activityService;
        $this->activityRepository = $activityRepository;
    }

    public function index()
    {
        $user = auth()->user();
        
        if ($user->role === 'atasan') {
            // Tarik data dari repository
            $allActivities = $this->activityRepository->getAllActivities();
            
            // -------------------------------------------------------------
            // BUG FIX: KEBOCORAN PRIVASI LINTAS DIVISI UNTUK ATASAN
            // Filter koleksi agar atasan hanya melihat data anggota divisinya sendiri
            // -------------------------------------------------------------
            $activities = collect($allActivities)->filter(function ($activity) use ($user) {
                return $activity->user && $activity->user->divisi === $user->divisi;
            })->values();
            
        } else {
            // Logika ini sudah aman, user reguler hanya mendapat datanya sendiri
            $activities = $this->activityRepository->getUserActivities($user->id);
        }

        return Inertia::render('Activities/Index', [
            'activities' => $activities,
            'userRole' => $user->role
        ]);
    }

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

        // Panggil Service untuk mengurus perhitungan dan penyimpanan
        $this->activityService->storeActivity($validated, auth()->id());

        // --- SISTEM PENCATATAN NOTIFIKASI ---
        AppNotification::create([
            'user_id' => auth()->id(),
            'pesan' => 'Berhasil mengirim data Tracker/Laporan baru.',
            'tipe' => 'success'
        ]);
        // ------------------------------------

        return redirect()->back()->with('success', 'Aktivitas berhasil dicatat.');
    }
}
