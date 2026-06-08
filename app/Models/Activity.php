<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Activity extends Model
{
    use HasFactory;

    /**
     * Tentukan kolom yang bisa diisi (Mass Assignment).
     * Pastikan semua kolom ini ada di migrasi 'activities' Anda.
     */
    protected $fillable = [
        'user_id', 
        'tanggal', 
        'task', 
        'waktu_mulai', 
        'waktu_akhir', 
        'durasi_menit', 
        'keluaran', 
        'kategori', 
        'ibadah'
    ];

    /**
     * Relasi: Satu aktivitas dimiliki oleh satu User.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}