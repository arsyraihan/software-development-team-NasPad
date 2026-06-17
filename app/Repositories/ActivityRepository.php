<?php

namespace App\Repositories;

use App\Models\Activity; 
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

    // --- TAMBAHAN LOGIKA DATABASE CRUD ---
    public function updateActivity($id, array $data)
    {
        $activity = Activity::findOrFail($id);
        $activity->update($data);
        return $activity;
    }

    public function deleteActivity($id)
    {
        $activity = Activity::findOrFail($id);
        return $activity->delete();
    }
}