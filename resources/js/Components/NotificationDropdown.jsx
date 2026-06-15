import { useState, useEffect, useRef } from 'react';
import { Bell, Check, Trash2 } from 'lucide-react';

export default function NotificationDropdown() {
    const [isOpen, setIsOpen] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const dropdownRef = useRef(null);

    // 1. Logika Klik Sembarangan (Tutup Notif jika klik area luar)
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // 2. Logika Local Cache & Hapus Otomatis 7 Hari
    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem('onetracker_notifs')) || [];
        const now = new Date().getTime();
        const SEVEN_DAYS = 7 * 24 * 60 * 60 * 1000; // 7 Hari dalam Milidetik

        // Saring: Buang yang sudah lebih dari 7 hari
        const validNotifs = stored.filter(n => (now - n.timestamp) < SEVEN_DAYS);
        
        // Simpan kembali jika ada yang terhapus karena kadaluarsa
        if (stored.length !== validNotifs.length) {
            localStorage.setItem('onetracker_notifs', JSON.stringify(validNotifs));
        }

        // Simulasi: Beri pesan selamat datang jika cache kosong (opsional)
        if (validNotifs.length === 0 && !sessionStorage.getItem('welcome_seen')) {
            validNotifs.push({
                id: Date.now(),
                title: 'Berhasil Masuk',
                message: 'Selamat datang kembali di OneTracker!',
                isRead: false,
                timestamp: now
            });
            localStorage.setItem('onetracker_notifs', JSON.stringify(validNotifs));
            sessionStorage.setItem('welcome_seen', 'true');
        }

        setNotifications(validNotifs);
    }, [isOpen]); // Update setiap kali dropdown dibuka

    const markAsRead = (id) => {
        const updated = notifications.map(n => n.id === id ? { ...n, isRead: true } : n);
        setNotifications(updated);
        localStorage.setItem('onetracker_notifs', JSON.stringify(updated));
    };

    const deleteNotif = (id) => {
        const updated = notifications.filter(n => n.id !== id);
        setNotifications(updated);
        localStorage.setItem('onetracker_notifs', JSON.stringify(updated));
    };

    const unreadCount = notifications.filter(n => !n.isRead).length;

    return (
        <div className="relative" ref={dropdownRef}>
            {/* Tombol Bell Notifikasi */}
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors focus:outline-none"
            >
                <Bell className="w-6 h-6" />
                {unreadCount > 0 && (
                    <span className="absolute top-1 right-1 flex h-3 w-3 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white border-2 border-white">
                    </span>
                )}
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="absolute right-0 mt-3 w-80 bg-white rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] border border-gray-100 overflow-hidden z-50">
                    <div className="px-4 py-3 bg-gray-50/80 border-b border-gray-100 flex justify-between items-center">
                        <h3 className="text-sm font-semibold text-gray-700">Notifikasi</h3>
                        <span className="text-xs text-gray-400">{notifications.length} Pesan</span>
                    </div>

                    <div className="max-h-80 overflow-y-auto">
                        {notifications.length === 0 ? (
                            <div className="p-6 text-center text-sm text-gray-400">
                                Tidak ada notifikasi saat ini.
                            </div>
                        ) : (
                            notifications.map((notif) => (
                                <div 
                                    key={notif.id} 
                                    className={`p-4 border-b border-gray-50 transition-colors ${notif.isRead ? 'bg-white opacity-70' : 'bg-[#f8fafc]'}`}
                                >
                                    <div className="flex justify-between items-start mb-1">
                                        <h4 className={`text-sm ${notif.isRead ? 'font-medium text-gray-500' : 'font-bold text-gray-800'}`}>
                                            {notif.title}
                                        </h4>
                                        
                                        {/* Aksi: Read & Delete */}
                                        <div className="flex space-x-2">
                                            {!notif.isRead && (
                                                <button onClick={() => markAsRead(notif.id)} className="text-gray-400 hover:text-green-500 transition-colors" title="Tandai dibaca">
                                                    <Check className="w-4 h-4" />
                                                </button>
                                            )}
                                            <button onClick={() => deleteNotif(notif.id)} className="text-gray-400 hover:text-red-400 transition-colors" title="Hapus">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                    <p className="text-xs text-gray-500 leading-relaxed">
                                        {notif.message}
                                    </p>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}