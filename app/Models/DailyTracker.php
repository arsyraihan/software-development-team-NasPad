<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DailyTracker extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'date',
        'task',
        'start_time',
        'end_time',
        'duration',
        'status',
        'output',
        'category',
        'evaluation',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
