<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Repositories\Contracts\UserRepositoryInterface;
use Inertia\Inertia;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    protected $userRepository;

    public function __construct(UserRepositoryInterface $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    public function index()
    {
        return Inertia::render('Users/Index', [
            'users' => $this->userRepository->getAllUsers()
        ]);
    }

    public function store(Request $request)
    {
        // Tambahkan validasi confirmed pada password
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'role' => 'required|in:atasan,karyawan',
            'divisi' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:8|confirmed', 
        ]);

        $validated['password'] = Hash::make($validated['password']);
        $this->userRepository->createUser($validated);

        return redirect()->back()->with('success', 'User berhasil ditambahkan.');
    }
}