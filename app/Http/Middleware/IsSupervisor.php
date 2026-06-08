<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class IsSupervisor
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Pastikan user sudah login dan memiliki role 'atasan'
        if (auth()->check() && auth()->user()->role === 'atasan') {
            return $next($request);
        }

        // Jika bukan atasan, tendang kembali ke halaman aktivitas
        return redirect()->route('dashboard')->with('error', 'Akses ditolak. Berhenti disini Jendral.');
    }
}