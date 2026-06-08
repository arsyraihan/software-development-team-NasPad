<?php

namespace App\Repositories\Contracts;

interface ActivityRepositoryInterface 
{
    public function getAllActivities();
    public function getUserActivities($userId);
    public function createActivity(array $data);
}