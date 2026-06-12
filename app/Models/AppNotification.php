<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class AppNotification extends Model
{
    protected $fillable = ['user_id', 'pesan', 'tipe'];
}