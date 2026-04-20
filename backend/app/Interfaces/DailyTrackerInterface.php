<?php

namespace App\Interfaces;

interface DailyTrackerInterface 
{
    public function getAllTrackers($userId);
    public function createTracker(array $data);
    public function getPerformanceSummary($userId);
}