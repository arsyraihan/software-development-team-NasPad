<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Activity;
use App\Models\Note;
use Inertia\Inertia;
use Carbon\Carbon;

class DashboardController extends Controller
{
    public function index()
    {
        $user = auth()->user();
        $isAtasan = $user->role === 'atasan';
        $divisi = $user->divisi; 

        $totalUsers = User::where('role', 'karyawan')->where('divisi', $divisi)->count();

        $query = Activity::with('user')->whereHas('user', function($q) use ($divisi) {
            if ($divisi) $q->where('divisi', $divisi);
        })->whereMonth('tanggal', Carbon::now()->month);

        $activitiesForChart = (clone $query);
        if (!$isAtasan) {
            $activitiesForChart->where('user_id', $user->id);
        }
        $activities = $activitiesForChart->get();

        // LOG TERBARU (Tidak dibatasi hari ini, ambil 15 terakhir)
        $logTerbaru = Activity::with('user')
            ->whereHas('user', function($q) use ($divisi) {
                if ($divisi) $q->where('divisi', $divisi);
            })
            ->orderBy('created_at', 'desc')
            ->take(15)
            ->get();

        $notesHariIni = Note::with('user')->whereHas('user', function($q) use ($divisi) {
            if ($divisi) $q->where('divisi', $divisi);
        })->whereDate('tanggal', Carbon::today())->get();

        // Chart 1: Trend Durasi Harian (Area Chart)
        $areaLabels = [];
        $areaData = [];
        foreach ($activities->groupBy('tanggal')->sortBy(fn($v, $k) => $k) as $tgl => $acts) {
            $areaLabels[] = Carbon::parse($tgl)->format('d M');
            $areaData[] = round($acts->whereNotIn('kategori', ['Sakit', 'Izin'])->sum('durasi_menit') / 60, 2);
        }

        // Chart 2: Polar Area Kategori
        $polarLabels = ['BSC / OKR', 'Daily Task', 'Improvement Goal'];
        $polarData = [
            $activities->where('kategori', 'BSC / OKR')->count(),
            $activities->where('kategori', 'Daily Task')->count(),
            $activities->where('kategori', 'Improvement Goal')->count(),
        ];

        // Chart 3: Perbandingan Jam Tim (Line Straight)
        $dates = $activities->pluck('tanggal')->unique()->sort()->values();
        $comparisonLabels = [];
        foreach($dates as $d) {
            $comparisonLabels[] = Carbon::parse($d)->format('d M');
        }
        $comparisonSeries = [];

        if ($isAtasan) {
            foreach ($activities->groupBy('user_id') as $userId => $acts) {
                $userData = [];
                foreach ($dates as $date) {
                    $sum = $acts->where('tanggal', $date)->whereNotIn('kategori', ['Sakit', 'Izin'])->sum('durasi_menit');
                    $userData[] = round($sum / 60, 2);
                }
                $comparisonSeries[] = [
                    'name' => explode(' ', $acts->first()->user->name)[0],
                    'data' => $userData
                ];
            }
        } else {
            foreach (['Daily Task', 'BSC / OKR', 'Improvement Goal'] as $kat) {
                $katData = [];
                foreach ($dates as $date) {
                    $sum = $activities->where('tanggal', $date)->where('kategori', $kat)->sum('durasi_menit');
                    $katData[] = round($sum / 60, 2);
                }
                $comparisonSeries[] = ['name' => $kat, 'data' => $katData];
            }
        }

        return Inertia::render('Dashboard', [
            'userRole' => $user->role,
            'userDivisi' => $divisi,
            'totalUsers' => $totalUsers,
            'logTerbaru' => $logTerbaru, // Diubah namanya
            'notesHariIni' => $notesHariIni,
            'chartData' => [
                'area' => ['labels' => $areaLabels, 'data' => $areaData],
                'polar' => ['labels' => $polarLabels, 'data' => $polarData],
                'comparison' => ['labels' => $comparisonLabels, 'series' => $comparisonSeries],
            ]
        ]);
    }
}