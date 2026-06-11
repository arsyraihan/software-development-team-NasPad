<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Note;
use Inertia\Inertia;

class CalendarController extends Controller
{
    public function index()
    {
        $notes = Note::with('user')->get();

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