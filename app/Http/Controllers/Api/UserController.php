<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class UserController extends Controller
{
    // Mengambil semua data user
    public function index()
    {
        $users = User::orderBy('created_at', 'desc')->get();
        return response()->json($users);
    }

    // Menyimpan user baru
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'division' => 'required|string|max:255',
            // Aturan 'confirmed' otomatis akan mencocokkan dengan field 'password_confirmation' dari React
            'password' => 'required|string|min:8|confirmed', 
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'division' => $request->division,
            'password' => Hash::make($request->password),
        ]);

        return response()->json([
            'message' => 'User berhasil ditambahkan!',
            'user' => $user
        ], 201);
    }
}