<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class DailyTrackerController extends Controller
{
    private DailyTrackerInterface $trackerRepository;

    // Inject Interface melalui Constructor
    public function __construct(DailyTrackerInterface $trackerRepository)
    {
        $this->trackerRepository = $trackerRepository;
    }

    public function index(Request $request)
    {
        // $request->user()->id mengambil ID dari user yang sedang login via token
        $trackers = $this->trackerRepository->getAllTrackers($request->user()->id);
        return response()->json(['data' => $trackers]);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'date' => 'required|date',
            'task' => 'required|string',
            'start_time' => 'required',
            'end_time' => 'nullable',
            'duration' => 'nullable',
            'category' => 'required|string',
            // Tambahkan validasi lain sesuai kebutuhan
        ]);

        // Otomatis memasukkan ID user yang sedang login
        $validatedData['user_id'] = $request->user()->id;

        $tracker = $this->trackerRepository->createTracker($validatedData);
        
        return response()->json(['message' => 'Task created successfully', 'data' => $tracker], 201);
    }

    public function summary(Request $request)
    {
        $summary = $this->trackerRepository->getPerformanceSummary($request->user()->id);
        return response()->json(['data' => $summary]);
    }
}
