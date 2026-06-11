<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash; // Jangan lupa import ini untuk password

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Membuat akun khusus untuk PM-Raihan
        User::factory()->create([
            'name' => 'PM-Raihan',
            'email' => 'raihan@gmail.com',
            'password' => Hash::make('arsyraihan2004'), 
        ]);
    }
}