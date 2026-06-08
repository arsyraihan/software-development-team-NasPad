<?php

namespace App\Repositories;

use App\Models\Activity; // <--- BARIS INI SANGAT PENTING
use App\Repositories\Contracts\ActivityRepositoryInterface;

class ActivityRepository implements ActivityRepositoryInterface 
{
    public function getAllActivities() 
    {
        return Activity::with('user')->orderBy('tanggal', 'desc')->get();
    }

    public function getUserActivities($userId) 
    {
        return Activity::where('user_id', $userId)->orderBy('tanggal', 'desc')->get();
    }

    public function createActivity(array $data) 
    {
        return Activity::create($data);
    }
}