<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
{
    Schema::create('activities', function (Blueprint $table) {
        $table->id();
        $table->foreignId('user_id')->constrained()->cascadeOnDelete();
        $table->date('tanggal');
        $table->string('task');
        $table->time('waktu_mulai');
        $table->time('waktu_akhir');
        $table->integer('durasi_menit'); // Diisi via mutator/service saat save
        $table->text('keluaran');
        
        // Menggunakan string atau enum untuk konsistensi data kategori
        $table->string('kategori'); // BSC / OKR, Daily Task, Improvement Goal
        
        // Opsional untuk tracking ibadah/shalat
        $table->string('ibadah')->nullable(); 
        
        $table->timestamps();
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('activities');
    }
};
