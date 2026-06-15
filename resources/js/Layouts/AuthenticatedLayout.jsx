import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import NotificationDropdown from '@/Components/NotificationDropdown'; 
import SettingsDropdown from '@/Components/SettingsDropdown'; // <-- Ini Import yang ditambahkan
import { Link, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { Clock, LayoutDashboard, Activity, CalendarDays, Users, User, LogOut } from 'lucide-react';

export default function AuthenticatedLayout({ header, children }) {
    const authUser = usePage().props.auth.user;
    const { flash } = usePage().props; 

    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [currentTime, setCurrentTime] = useState(new Date());

    // Jam Global
    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    // Toast Notifikasi (Popup Hijau saat Berhasil)
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
                            
                            {/* Navigasi Layar Desktop */}
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
                            
                            {/* ============================================== */}
                            {/* WIDGET NOTIFIKASI & SETTINGS */}
                            {/* ============================================== */}
                            <NotificationDropdown />
                            <SettingsDropdown />

                            {/* USER PROFILE */}
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <button type="button" className="inline-flex items-center rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 hover:border-red-300 hover:text-red-600 hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 focus:outline-none">
                                        <User className="w-4 h-4 mr-2 text-orange-500" />
                                        {authUser.name}
                                    </button>
                                </Dropdown.Trigger>
                                <Dropdown.Content>
                                    <Dropdown.Link href={route('profile.edit')}><User className="w-4 h-4 inline mr-2 text-gray-500"/> Profile</Dropdown.Link>
                                    <Dropdown.Link href={route('logout')} method="post" as="button"><LogOut className="w-4 h-4 inline mr-2 text-red-500"/> Log Out</Dropdown.Link>
                                </Dropdown.Content>
                            </Dropdown>
                        </div>

                        {/* Hamburger Menu Layar HP */}
                        <div className="-me-2 flex items-center sm:hidden">
                            <button
                                onClick={() => setShowingNavigationDropdown((previousState) => !previousState)}
                                className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 transition duration-150 ease-in-out hover:bg-gray-100 hover:text-gray-500 focus:bg-gray-100 focus:text-gray-500 focus:outline-none"
                            >
                                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                    <path className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                    <path className={showingNavigationDropdown ? 'inline-flex' : 'hidden'} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Navigasi Layar Mobile (Dropdown saat layar kecil) */}
                <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' sm:hidden'}>
                    <div className="space-y-1 pb-3 pt-2">
                        <ResponsiveNavLink href={route('dashboard')} active={route().current('dashboard')}>Dashboard</ResponsiveNavLink>
                        <ResponsiveNavLink href={route('activities.index')} active={route().current('activities.*')}>Activities</ResponsiveNavLink>
                        <ResponsiveNavLink href={route('calendar.index')} active={route().current('calendar.*')}>Kalender</ResponsiveNavLink>
                        {authUser.role === 'atasan' && (
                            <ResponsiveNavLink href={route('users.index')} active={route().current('users.*')}>User Management</ResponsiveNavLink>
                        )}
                    </div>
                    <div className="border-t border-gray-200 pb-1 pt-4">
                        <div className="px-4">
                            <div className="text-base font-medium text-gray-800">{authUser.name}</div>
                            <div className="text-sm font-medium text-gray-500">{authUser.email}</div>
                        </div>
                        <div className="mt-3 space-y-1">
                            <ResponsiveNavLink href={route('profile.edit')}>Profile</ResponsiveNavLink>
                            <ResponsiveNavLink method="post" href={route('logout')} as="button">Log Out</ResponsiveNavLink>
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

            {/* Custom Scrollbar untuk area tertentu */}
            <style>{`
                .custom-scrollbar::-webkit-scrollbar { width: 4px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #ef4444; }
            `}</style>
        </div>
    );
}