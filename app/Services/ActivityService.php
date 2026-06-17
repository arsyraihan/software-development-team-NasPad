<?php

namespace App\Services;

use App\Repositories\Contracts\ActivityRepositoryInterface;
use Carbon\Carbon;

class ActivityService
{
    protected $activityRepository;

    public function __construct(ActivityRepositoryInterface $activityRepository)
    {
        $this->activityRepository = $activityRepository;
    }

    /**
     * Memproses data aktivitas harian sebelum disimpan ke database.
     */
    public function storeActivity(array $data, $userId)
    {
        // Kalkulasi durasi otomatis
        $mulai = Carbon::parse($data['waktu_mulai']);
        $akhir = Carbon::parse($data['waktu_akhir']);
        
        // Antisipasi jika waktu selesai melewati tengah malam
        if ($akhir->lessThan($mulai)) {
            $akhir->addDay(); 
        }
        
        $durasi = $mulai->diffInMinutes($akhir);

        // Siapkan data final
        $data['user_id'] = $userId;
        $data['durasi_menit'] = $durasi;

        // Panggil repository untuk menyimpan data
        return $this->activityRepository->createActivity($data);
    }

    // --- TAMBAHAN LOGIKA SERVIS CRUD ---
    public function updateActivity($id, array $data)
    {
        // Kalkulasi ulang durasi otomatis saat data di-edit
        $mulai = Carbon::parse($data['waktu_mulai']);
        $akhir = Carbon::parse($data['waktu_akhir']);
        
        if ($akhir->lessThan($mulai)) {
            $akhir->addDay(); 
        }
        
        $durasi = $mulai->diffInMinutes($akhir);

        // Masukkan kembali durasi baru ke dalam payload data
        $data['durasi_menit'] = $durasi;

        // Panggil repository untuk mengupdate data di tabel
        return $this->activityRepository->updateActivity($id, $data);
    }

    public function deleteActivity($id)
    {
        // Panggil repository untuk menghapus data
        return $this->activityRepository->deleteActivity($id);
    }
}