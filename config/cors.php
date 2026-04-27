<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Cross-Origin Resource Sharing (CORS) Configuration
    |--------------------------------------------------------------------------
    */

    // Mengizinkan SEMUA rute tanpa kecuali
    'paths' => ['*'],

    // Mengizinkan SEMUA metode (GET, POST, PUT, DELETE, dll)
    'allowed_methods' => ['*'],

    'allowed_origins' => ['http://localhost:5173', 'http://127.0.0.1:5173'],

    'allowed_origins_patterns' => [],

    'allowed_headers' => ['*'],

    'exposed_headers' => [],

    'max_age' => 0,

    // Ini WAJIB true agar otentikasi Cookie/Sanctum bisa lewat
    'supports_credentials' => true,

];