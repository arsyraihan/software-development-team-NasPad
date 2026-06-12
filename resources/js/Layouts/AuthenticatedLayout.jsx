import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { Clock, Bell, LayoutDashboard, Activity, CalendarDays, Users, User, LogOut } from 'lucide-react';

export default function AuthenticatedLayout({ header, children }) {
    const authUser = usePage().props.auth.user;
    const { flash, notifications } = usePage().props;

    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [currentTime, setCurrentTime] = useState(new Date());

    // Jam Global
    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    // Toast Notifikasi
    useEffect(() => {
        if (flash?.success) {
            setShowToast(true);
            const timer = setTimeout(() => setShowToast(false), 3000);
            return () => clearTimeout(timer);
        }
    }, [flash?.success]);

    return (
        <div className="min-h-screen bg-gray-50 relative font-sans text-gray-900">
            
            {/* TOAST POP-UP */}
            {showToast && (
                <div className="fixed top-20 right-5 z-50 bg-gradient-to-r from-emerald-500 to-green-500 text-white px-6 py-3 rounded-xl shadow-2xl flex items-center transform transition-all duration-500 animate-bounce">
                    <span className="font-semibold">{flash.success}</span>
                </div>
            )}

            <nav className="border-b border-gray-200 bg-white/80 backdrop-blur-md sticky top-0 z-40 shadow-sm">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 justify-between items-center">
                        <div className="flex items-center">
                            <Link href="/" className="shrink-0 transition transform hover:scale-105">
                                <ApplicationLogo className="block h-9 w-auto text-red-600" />
                            </Link>
                            
                            <div className="hidden space-x-6 sm:-my-px sm:ms-10 sm:flex">
                                <NavLink href={route('dashboard')} active={route().current('dashboard')}>
                                    <LayoutDashboard className="w-4 h-4 mr-2" /> Dashboard
                                </NavLink>
                                <NavLink href={route('activities.index')} active={route().current('activities.*')}>
                                    <Activity className="w-4 h-4 mr-2" /> Activities
                                </NavLink>
                                <NavLink href={route('calendar.index')} active={route().current('calendar.*')}>
                                    <CalendarDays className="w-4 h-4 mr-2" /> Kalender
                                </NavLink>
                                {authUser.role === 'atasan' && (
                                    <NavLink href={route('users.index')} active={route().current('users.*')}>
                                        <Users className="w-4 h-4 mr-2" /> Users
                                    </NavLink>
                                )}
                            </div>
                        </div>

                        <div className="hidden sm:flex sm:items-center space-x-6">
                            {/* GLOBAL CLOCK */}
                            <div className="flex items-center text-orange-600 font-bold font-mono text-lg bg-orange-50 px-4 py-1.5 rounded-full border border-orange-100 shadow-sm">
                                <Clock className="w-5 h-5 mr-2 text-red-500 animate-pulse" />
                                {currentTime.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }).replace(':', '.')}
                            </div>
                            
                            {/* NOTIFICATION BELL */}
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <button className="relative p-2 text-gray-500 hover:text-red-600 transition-all duration-300 transform hover:-translate-y-1 hover:bg-red-50 rounded-full focus:outline-none">
                                        <Bell className="w-6 h-6" />
                                        {notifications?.length > 0 && (
                                            <span className="absolute top-1 right-1 flex h-3 w-3">
                                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600"></span>
                                            </span>
                                        )}
                                    </button>
                                </Dropdown.Trigger>
                                <Dropdown.Content>
                                    <div className="block px-4 py-2 text-xs font-bold uppercase bg-gradient-to-r from-red-600 to-orange-500 text-white rounded-t-md">
                                        Notifikasi Terbaru
                                    </div>
                                    <div className="max-h-60 overflow-y-auto">
                                        {notifications?.length > 0 ? (
                                            notifications.map((notif) => (
                                                <div key={notif.id} className="block px-4 py-3 text-sm border-b hover:bg-orange-50 transition">
                                                    <span className="font-bold text-red-600 block">{notif.pesan}</span>
                                                    <span className="text-[10px] text-gray-400">{new Date(notif.created_at).toLocaleString('id-ID')}</span>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="block px-4 py-4 text-sm text-gray-500 text-center">Bersih.</div>
                                        )}
                                    </div>
                                </Dropdown.Content>
                            </Dropdown>

                            {/* USER PROFILE */}
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <button type="button" className="inline-flex items-center rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 hover:border-red-300 hover:text-red-600 hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
                                        <User className="w-4 h-4 mr-2 text-orange-500" />
                                        {authUser.name}
                                    </button>
                                </Dropdown.Trigger>
                                <Dropdown.Content>
                                    <Dropdown.Link href={route('profile.edit')}><User className="w-4 h-4 inline mr-2"/> Profile</Dropdown.Link>
                                    <Dropdown.Link href={route('logout')} method="post" as="button"><LogOut className="w-4 h-4 inline mr-2 text-red-500"/> Log Out</Dropdown.Link>
                                </Dropdown.Content>
                            </Dropdown>
                        </div>
                    </div>
                </div>
            </nav>

            {header && (
                <header className="bg-white shadow-sm relative z-10 border-b border-gray-100">
                    <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            <main className="relative z-0 pb-12">{children}</main>
        </div>
    );
}