<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Note;
use Inertia\Inertia;

class CalendarController extends Controller
{
    public function index()
    {
        $user = auth()->user();
        $divisi = $user->divisi;
        
        $notesQuery = Note::with('user');

        // -------------------------------------------------------------
        // BUG FIX: KEBOCORAN PRIVASI DATA NOTES
        // -------------------------------------------------------------
        if ($user->role === 'atasan') {
            // Atasan hanya melihat catatan dari anggota divisinya
            $notesQuery->whereHas('user', function($q) use ($divisi) {
                if ($divisi) {
                    $q->where('divisi', $divisi);
                }
            });
        } else {
            // User reguler hanya melihat catatannya sendiri
            $notesQuery->where('user_id', $user->id);
        }

        $notes = $notesQuery->get();

        return Inertia::render('Calendar/Index', [
            'notes' => $notes
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'tanggal' => 'required|date',
            'catatan' => 'required|string|max:255',
        ]);

        $validated['user_id'] = auth()->id();
        Note::create($validated);

        return redirect()->back()->with('success', 'Catatan kalender berhasil ditambahkan.');
    }
}
