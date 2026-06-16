<p align="center">
  <a href="https://laravel.com" target="_blank">
    <img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400" alt="Laravel Logo">
  </a>
</p>

<p align="center">
  <a href="https://laravel.com/"><img src="https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white" alt="Laravel"></a>
  <a href="https://react.dev/"><img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React"></a>
  <a href="https://inertiajs.com/"><img src="https://img.shields.io/badge/Inertia.js-9553E9?style=for-the-badge&logo=Inertia&logoColor=white" alt="Inertia.js"></a>
  <a href="https://supabase.com/"><img src="https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white" alt="Supabase"></a>
  <a href="https://tailwindcss.com/"><img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS"></a>
</p>

# OneTracker 🚀

**OneTracker** adalah aplikasi sistem manajemen tugas dan aktivitas internal yang dikembangkan untuk memudahkan pemantauan dan pelaporan produktivitas tim. Dibangun dengan memprioritaskan performa dan antarmuka yang modern, aplikasi ini mengusung mode gelap (Dark Mode) yang elegan dengan sentuhan animasi dinamis.

---

## 🛠️ Teknologi & Arsitektur

Aplikasi ini dikembangkan menggunakan teknologi modern (_Tech Stack_) dengan struktur arsitektur yang kokoh:

- **Bahasa Pemrograman:** [PHP 8.2+](https://www.php.net/) & [JavaScript (ES6+)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- **Backend Framework:** [Laravel 11](https://laravel.com/)
- **Frontend Library:** [React.js](https://react.dev/)
- **Bridge / SPA Routing:** [Inertia.js](https://inertiajs.com/) (Menghilangkan kebutuhan pembuatan REST API terpisah)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Database:** PostgreSQL terkelola oleh [Supabase](https://supabase.com/)
- **Arsitektur Desain:** \* **MVC (Model-View-Controller)**: Pemisahan logika data, tampilan, dan kontroler.
    - **Repository Pattern**: Ekstraksi logika _query_ database (terlihat pada `ActivityRepository` & `UserRepository`) untuk membuat _controller_ lebih bersih dan _codebase_ lebih mudah dipelihara.

---

## ⚙️ Prasyarat (Prerequisites)

Sebelum melakukan kloning dan instalasi, pastikan komputer Anda telah terinstal perangkat lunak berikut:

1.  **PHP** (Minimal versi 8.2)
2.  **Composer** (Package manager untuk PHP)
3.  **Node.js & NPM** (Package manager untuk JavaScript)
4.  **Git** ---

## 💻 Panduan Instalasi (Local Development)

Ikuti langkah-langkah di bawah ini untuk mengunduh dan menjalankan **OneTracker** di mesin lokal Anda:

### 1. Clone Repositori

Buka Terminal atau Command Prompt, lalu jalankan perintah berikut untuk mengunduh kode sumber aplikasi:

```bash
git clone [https://github.com/arsyraihan/software-development-team-naspad.git](https://github.com/arsyraihan/software-development-team-naspad.git)
cd software-development-team-naspad
```

### 2. Instalasi Dependensi

Instal pustaka (library) yang dibutuhkan oleh PHP dan JavaScript:

```bash
# Instal dependensi Backend (Laravel)
composer install

# Instal dependensi Frontend (React/Vite)
npm install
```

### 3. Pengaturan Environment Variables (.env)

Salin file pengaturan bawaan dan jadikan sebagai konfigurasi lokal Anda:

```bash
copy .env.example
# menjadi
.env
```

Setelah disalin, buka file .env dan sesuaikan konfigurasi Databasemu

```bash
DB_CONNECTION=
DB_HOST=
DB_PORT=
DB_DATABASE=
DB_USERNAME=
DB_PASSWORD=
```

### 4. Generate Application Key

Buat kunci unik untuk keamanan aplikasi Laravel Anda:

```bash
php artisan key:generate
```

### 5. Migrasi & Seeding Database

Buat struktur tabel ke dalam database Supabase dan isi dengan data awalan (seeder)

```bash
php artisan migrate:fresh --seed

# data dummy telah ditambahkan secara default di DatabaseSeeder.php
```

### 6. Menjalankan Aplikasi dan server

Aplikasi ini membutuhkan dua buah server lokal yang berjalan secara bersamaan. Buka dua terminal terpisah

```bash
# Terminal 1
npm run dev

# Terminal 2
php artisan serve
```

---

### 🔒 Keamanan

Fitur registrasi umum dinonaktifkan pada proyek ini (disabled public registration). Hal ini diimplementasikan secara sengaja agar manajemen penambahan pengguna (user) sepenuhnya dikontrol oleh Administrator (PM/Atasan) untuk melindungi data internal perusahaan/tim

---

### 👨‍💻 Dikembangkan Oleh

**NasPad Team - Software Development Project.**

- **Arsy Raihan:** - Project Manager
- **Dwi Aris Setiawan:** - Backend Developer
- **Rizky Wiga:** - Frontend (AFK)

---
