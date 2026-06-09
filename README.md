## Cara Menjalankan Project

Install Dependencies

- `composer install`
- `npm install` or `npm install --legacy-peer-deps` (lakukan jika npm error karena perbedaan versi)
- `npm run build`
- `npm install` or `npm install --legacy-peer-deps` (lakukan jika npm error karena perbedaan versi)

Konfigurasi Database ke Supabase

- `Copy file .env.example dan ubah salah satu filenya menjadi .env`
- `Sesuaikan konfigurasi database sama supabase:`
  `CONTOH`
  `host:db.abcdefghij.supabase.co`
  `port:3000`
  `database:postgres`
  `user:postgres`
  `password:password_kamu`

generate key

- `php artisan key:generate`

-----//`OPSIONAL`//-----

- `php artisan migrate:fresh --seed`
  (jika database error atau saat login tidak bisa, command tersebut ke terminal)

Jalankan Server

- `php artisan serve`
- `npm run dev`

Dibuat bersama:
`wyzeiX`  [Project Manager]
`rzwig4`  [Frontend] --Status: AFK
`Ghea2003`[Backend]