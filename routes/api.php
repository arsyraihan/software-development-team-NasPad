<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/trackers', [DailyTrackerController::class, 'index']);
    Route::post('/trackers', [DailyTrackerController::class, 'store']);
    Route::get('/trackers/summary', [DailyTrackerController::class, 'summary']);
});

Route::get('/users', [UserController::class, 'index']);
Route::post('/users', [UserController::class, 'store']);