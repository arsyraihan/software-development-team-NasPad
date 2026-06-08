<?php

namespace App\Repositories;

use App\Models\User;
use App\Repositories\Contracts\UserRepositoryInterface;

class UserRepository implements UserRepositoryInterface 
{
    public function getAllUsers() 
    {
        return User::orderBy('name', 'asc')->get();
    }

    public function createUser(array $data) 
    {
        return User::create($data);
    }
}