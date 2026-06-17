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

        if ($user->role === 'atasan') {
            $notesQuery->whereHas('user', function($q) use ($divisi) {
                if ($divisi) {
                    $q->where('divisi', $divisi);
                }
            });
        } else {
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

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'tanggal' => 'required|date',
            'catatan' => 'required|string|max:255',
        ]);

        $note = Note::findOrFail($id);
        
        // --- GEMBOK GANDA: Batas 6 Jam ---
        if ($note->created_at->diffInHours(now()) > 6) {
            abort(403, 'Batas waktu edit (6 jam) sudah habis.');
        }

        if ($note->user_id !== auth()->id() && auth()->user()->role !== 'atasan') {
            abort(403, 'Akses ditolak.');
        }

        $note->update($validated);

        return redirect()->back()->with('success', 'Catatan kalender berhasil diperbarui.');
    }

    public function destroy($id)
    {
        $note = Note::findOrFail($id);

        if ($note->user_id !== auth()->id() && auth()->user()->role !== 'atasan') {
            abort(403, 'Akses ditolak.');
        }

        $note->delete();

        return redirect()->back()->with('success', 'Catatan kalender berhasil dihapus.');
    }
}