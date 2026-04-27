<?php

namespace App\Repositories;

use App\Interfaces\DailyTrackerInterface;
use App\Models\DailyTracker;
use Illuminate\Support\Facades\DB;

class DailyTrackerRepository implements DailyTrackerInterface 
{
    public function getAllTrackers($userId) 
    {
        // Mengambil aktivitas semua users.
        return DailyTracker::where('user_id', $userId)
                           ->orderBy('date', 'desc')
                           ->orderBy('start_time', 'desc')
                           ->get();
    }

    public function createTracker(array $data) 
    {
        return DailyTracker::create($data);
    }

    public function getPerformanceSummary($userId) 
    {
        // Menghitung (BSC/OKR, Daily Task, dan Improvement Goal)
        return DailyTracker::select('category', DB::raw('count(*) as total_tasks'))
                           ->where('user_id', $userId)
                           ->groupBy('category')
                           ->get();
    }
}