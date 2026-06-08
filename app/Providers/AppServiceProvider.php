<?php

namespace App\Providers;

use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;

// Tambahkan dua baris ini untuk mengimpor Interface dan Repository
use App\Repositories\Contracts\ActivityRepositoryInterface;
use App\Repositories\ActivityRepository;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        // Kurung tutup dan titik koma sudah ditambahkan di sini
        $this->app->bind(
            ActivityRepositoryInterface::class, 
            ActivityRepository::class
        );
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);
    }
}