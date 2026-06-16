<div align="center">
  <a href="https://github.com/arsyraihan/software-development-team-naspad">
    <img src="https://readme-typing-svg.herokuapp.com/?font=Righteous&weight=800&size=35&pause=1000&color=F97316&center=true&vCenter=true&width=600&lines=Welcome+to+OneTracker;Empower+Your+Team;Boost+Productivity" alt="Typing SVG" />
  </a>
  
  <br>
  
  <img src="public/b20958bd-6fca-46af-88f1-dd313a547c28.jpeg" alt="OneTracker Logo" width="140" style="border-radius: 30px; box-shadow: 0 10px 25px rgba(0,0,0,0.15); margin-top: 15px; margin-bottom: 20px;">

  <p><b>Platform Pelacak Aktivitas, Kehadiran, dan Produktivitas Tim Terpadu</b></p>

  <p>
    <img src="https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white" alt="Laravel"/>
    <img src="https://img.shields.io/badge/React-0F172A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React"/>
    <img src="https://img.shields.io/badge/Inertia.js-9553E9?style=for-the-badge&logo=inertia&logoColor=white" alt="Inertia"/>
    <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind"/>
    <img src="https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=111827" alt="Supabase"/>
    <img src="https://img.shields.io/badge/Electron-47848F?style=for-the-badge&logo=electron&logoColor=white" alt="Electron"/>
  </p>
</div>

<br>

> [!TIP]
> **Kenapa OneTracker?**
> OneTracker dibangun menggunakan arsitektur **Monolith Modern (SPA)**. Aplikasi ini tidak sekadar mencatat data, melainkan merangkumnya dalam antarmuka kelas _enterprise_ yang estetik. Tersedia untuk Web dan Desktop, menghadirkan pengalaman pengguna (UX) yang sangat mulus tanpa _loading/refresh_ halaman!

<div align="center">
  <br>
  <a href="https://onetracker.up.railway.app">
    <img src="https://img.shields.io/badge/Live_Website-0EA5E9?style=for-the-badge&logo=google-chrome&logoColor=white" alt="Live Website" />
  </a>
  <a href="../../releases">
    <img src="https://img.shields.io/badge/Download_.EXE-F43F5E?style=for-the-badge&logo=windows&logoColor=white" alt="Download Desktop" />
  </a>
  <br><br>
</div>

---

## ![Tentang Aplikasi](https://img.shields.io/badge/Tentang_Aplikasi-3B82F6?style=for-the-badge)

**OneTracker** adalah aplikasi manajemen produktivitas kelas _enterprise_ yang dirancang secara khusus untuk membantu tim dan perusahaan dalam melacak tugas harian, memonitor jam kerja efektif, mengelola jadwal secara kolaboratif, serta mencatat log kehadiran. Aplikasi ini tersedia dalam dua ekosistem, yakni platform Web dan aplikasi Desktop (Windows `.exe`), menghadirkan pengalaman pengguna (UX) yang sangat mulus, modern, dan sangat _responsive_.

---

## ![Arsitektur & Teknologi](https://img.shields.io/badge/Arsitektur_&_Teknologi-0EA5E9?style=for-the-badge)

Aplikasi ini menggunakan pendekatan infrastruktur **Monolith Modern (SPA)** yang dipadukan dengan **Repository Pattern** pada sisi _backend_. Kombinasi ini menghasilkan basis kode yang sangat bersih (_Clean Code_), terstruktur, _scalable_, dan mudah untuk di-_maintain_.

| Layer Sistem              | Teknologi / Pattern      | Peran & Fungsi Sistem                                                                                            |
| :------------------------ | :----------------------- | :--------------------------------------------------------------------------------------------------------------- |
| <kbd>Design Pattern</kbd> | **Repository & Service** | Memisahkan logika akses data (Repository) dan logika bisnis (Service) agar _Controller_ tetap ramping dan solid. |
| <kbd>Backend</kbd>        | **Laravel 11**           | Menangani _Routing_, _Controller_, logika sistem inti, dan Autentikasi yang tangguh.                             |
| <kbd>Frontend</kbd>       | **React.js 18**          | Merender _User Interface_ yang dinamis dan interaktif menggunakan _Functional Components_.                       |
| <kbd>Bridge</kbd>         | **Inertia.js**           | Bertindak sebagai penghubung data SPA antara _Backend_ dan _Frontend_ tanpa perlu membuat REST API manual.       |
| <kbd>Database</kbd>       | **Supabase**             | Penyimpanan data relasional berbasis PostgreSQL yang sangat aman dan modern.                                     |
| <kbd>Styling</kbd>        | **Tailwind CSS**         | Pengaturan gaya visual UI/UX, transisi animasi, dan _Dynamic Theming_.                                           |
| <kbd>Desktop</kbd>        | **Electron.js**          | Membungkus (_wrapper_) aplikasi web menjadi format eksekusi lokal Desktop (`.exe`).                              |

---

## ![Fitur Unggulan](https://img.shields.io/badge/Fitur_Unggulan-8B5CF6?style=for-the-badge)

| Kategori             | Nama Fitur & Deskripsi                                                                                                                        |
| :------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------- |
| <kbd>Dashboard</kbd> | **Command Center:** Visualisasi data interaktif menggunakan grafik (Area, Polar) untuk memantau performa dan pencapaian OKR/BSC.              |
| <kbd>Tracker</kbd>   | **Activity Tracker:** Pencatatan log aktivitas harian (Daily Task, Improvement) dan pelaporan ketidakhadiran (Sakit/Izin) secara _real-time_. |
| <kbd>Schedule</kbd>  | **Team Calendar:** Kalender interaktif bergaya modern untuk mencatat agenda, jadwal rapat, dan pengingat lintas divisi.                       |
| <kbd>UI/UX</kbd>     | **Dynamic Theming:** Mendukung kustomisasi tema visual bawaan (_Apricot_ & _Skyline_) dengan transisi animasi yang mulus.                     |
| <kbd>Locale</kbd>    | **Multi-Language:** Dukungan _Internationalization_ (ID & EN) yang dapat diganti secara instan di menu pengaturan tanpa perlu _reload_.       |
| <kbd>System</kbd>    | **Zero-Lag Notif:** Sistem notifikasi berbasis _Local Cache_ yang memangkas beban _query database_ hingga 0%, super cepat dan ringan!         |

---

## ![Keamanan Sistem](https://img.shields.io/badge/Keamanan_Sistem-EF4444?style=for-the-badge)

Keamanan adalah fondasi utama dari arsitektur OneTracker:

- <kbd>RBAC</kbd> **Role-Based Access:** Pemisahan hak akses ketat antara **Atasan** (Supervisor) dan **Karyawan**. Modul krusial hanya dapat diakses oleh Atasan.
- <kbd>ENV</kbd> **Environment Safe:** Kredensial `.env` dan API Key diamankan dan dipastikan tidak pernah diekspos ke repositori publik.
- <kbd>Auth</kbd> **Encrypted Auth:** Seluruh kata sandi pengguna dienkripsi menggunakan algoritma **Bcrypt** tingkat lanjut bawaan sistem.
- <kbd>Sec</kbd> **XSS/CSRF Shield:** Proteksi otomatis terhadap serangan injeksi _script_ lintas-situs yang ditangani berlapis oleh Middleware dan React DOM.

---

## ![Panduan Instalasi](https://img.shields.io/badge/Panduan_Instalasi-10B981?style=for-the-badge)

> [!IMPORTANT]
> Sebelum memulai, pastikan perangkat Anda memenuhi spesifikasi minimum berikut sesuai dengan dependensi `composer.json` dan `package.json`:
>
> - <kbd>Core</kbd> **PHP** 8.4.12
> - <kbd>Core</kbd> **Node.js** 24.13.0 & **NPM** 11.6.2
> - <kbd>Core</kbd> **Composer** 2.9.4
> - <kbd>Framework</kbd> **Laravel** 13.15.0
> - <kbd>Library</kbd> **React** 18.3.1
> - <kbd>Database</kbd> **Supabase** (PostgreSQL) 17.6
> - <kbd>Tools</kbd> **Git**

### 1. Clone Repositori

Buka Terminal atau Command Prompt, lalu jalankan perintah berikut untuk mengunduh kode sumber aplikasi:

```bash
git clone https://github.com/arsyraihan/software-development-team-naspad.git
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

Local Host dapat diakses melalui:

```bash
http://localhost:8000
```

---

## ![Tim Pengembang](https://img.shields.io/badge/Tim_Pengembang-F59E0B?style=for-the-badge)

<div align="center">
  <br>
  <img src="https://img.shields.io/badge/Developed_by-Tim_NasPad-0F172A?style=for-the-badge&logo=github&logoColor=white" alt="Tim NasPad" />
  <p><i>Aplikasi ini dirancang, dibangun, dan dikembangkan dengan dedikasi tinggi oleh:</i></p>
</div>

|        Peran Sistem        | Profil Pengembang                                                                                                                                 | Area Pengembangan Utama                                  |
| :------------------------: | :------------------------------------------------------------------------------------------------------------------------------------------------ | :------------------------------------------------------- |
| <kbd>Project Manager</kbd> | [![Arsy Raihan](https://img.shields.io/badge/Arsy_Raihan-F97316?style=flat-square&logo=github&logoColor=white)](https://github.com/arsyraihan)    | _Project Management, Arsitektur Inti (SPA), React UI/UX_ |
|   <kbd>Backend Dev</kbd>   | [![Dwi Aris Setiawan](https://img.shields.io/badge/Dwi_Aris_S-3B82F6?style=flat-square&logo=github&logoColor=white)](https://github.com/Ghea2003) | _Backend, Database dan arsitektur_                       |
|  <kbd>Frontend Dev</kbd>   | [![Rizky Wiga](https://img.shields.io/badge/Rizky_Wiga-10B981?style=flat-square&logo=github&logoColor=white)](https://github.com/rzwig4)          | _Status -- AFK_                                          |

<br>

<div align="center">
  <img src="https://img.shields.io/badge/©_2026_OneTracker_Team-09090B?style=flat-square" alt="Copyright">
</div>
