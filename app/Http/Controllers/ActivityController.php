<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\ActivityService;
use App\Repositories\Contracts\ActivityRepositoryInterface;
use App\Models\AppNotification; 
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

            $allActivities = $this->activityRepository->getAllActivities();
            

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

        $this->activityService->storeActivity($validated, auth()->id());

        AppNotification::create([
            'user_id' => auth()->id(),
            'pesan' => 'Berhasil mengirim data Tracker/Laporan baru.',
            'tipe' => 'success'
        ]);

        return redirect()->back()->with('success', 'Aktivitas berhasil dicatat.');
    }

    // --- TAMBAHAN CRUD: UPDATE ---
    public function update(Request $request, $id)
    {
        // --- GEMBOK GANDA: Pengecekan 6 Jam ---
        $dataLama = \App\Models\Activity::findOrFail($id);
       if ($dataLama->created_at && $dataLama->created_at->diffInHours(now()) > 6) {
            abort(403, 'Batas waktu edit (6 jam) sudah habis.');
        }
        // --------------------------------------

        $validated = $request->validate([
            'tanggal' => 'required|date',
            'task' => 'required|string|max:255',
            'waktu_mulai' => 'required',
            'waktu_akhir' => 'required',
            'keluaran' => 'required|string',
            'kategori' => 'required|string',
            'ibadah' => 'nullable|string'
        ]);

        // Memanggil service untuk update (Pastikan fungsi updateActivity ada di ActivityService Anda)
        $this->activityService->updateActivity($id, $validated);

        AppNotification::create([
            'user_id' => auth()->id(),
            'pesan' => 'Berhasil mengubah data Aktivitas.',
            'tipe' => 'info'
        ]);

        return redirect()->back()->with('success', 'Aktivitas berhasil diperbarui.');
    }

    // --- TAMBAHAN CRUD: DESTROY ---
    public function destroy($id)
    {
        // Memanggil repository untuk hapus (Pastikan fungsi deleteActivity ada di Repository Anda)
        $this->activityRepository->deleteActivity($id);

        AppNotification::create([
            'user_id' => auth()->id(),
            'pesan' => 'Data Aktivitas berhasil dihapus.',
            'tipe' => 'error'
        ]);

        return redirect()->back()->with('success', 'Aktivitas berhasil dihapus.');
    }
}

