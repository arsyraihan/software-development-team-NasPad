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

    // --- TAMBAHAN CRUD: UPDATE ---
    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'role' => 'required|in:atasan,karyawan',
            'divisi' => 'required|string|max:255',
            // Email harus unik, tapi abaikan jika itu adalah email milik user ini sendiri
            'email' => 'required|email|unique:users,email,' . $id, 
            'password' => 'nullable|string|min:8|confirmed', 
        ]);

        // Jika form password diisi, maka di-hash. Jika kosong, buang dari array agar password lama tidak tertimpa
        if (!empty($validated['password'])) {
            $validated['password'] = Hash::make($validated['password']);
        } else {
            unset($validated['password']);
        }

        // Pastikan fungsi updateUser ada di UserRepository Anda
        $this->userRepository->updateUser($id, $validated);

        return redirect()->back()->with('success', 'Data Karyawan berhasil diperbarui.');
    }

    // --- TAMBAHAN CRUD: DESTROY ---
    public function destroy($id)
    {
        // Pastikan fungsi deleteUser ada di UserRepository Anda
        $this->userRepository->deleteUser($id);

        return redirect()->back()->with('success', 'Karyawan berhasil dihapus.');
    }
}