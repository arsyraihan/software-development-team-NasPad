<?php

namespace App\Http\Controllers;

use App\Models\AppNotification;
use Illuminate\Http\Request;

class NotificationController extends Controller
{
    public function markAsRead($id)
    {
        $notif = AppNotification::where('user_id', auth()->id())->findOrFail($id);
        $notif->update(['is_read' => true]);
        return redirect()->back();
    }

    public function destroy($id)
    {
        AppNotification::where('user_id', auth()->id())->findOrFail($id)->delete();
        return redirect()->back();
    }

    public function destroyAll()
    {
        AppNotification::where('user_id', auth()->id())->delete();
        return redirect()->back();
    }
}