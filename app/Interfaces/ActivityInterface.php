<?php
namespace App\Interfaces;

interface ActivityInterface 
{
    public function getAllActivities();
    public function getUserActivities($userId);
    public function createActivity(array $data);
    public function updateActivity($id, array $data);
    public function deleteActivity($id);
}