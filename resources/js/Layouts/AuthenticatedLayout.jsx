import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;
    const { flash, notifications } = usePage().props;

    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
    const [showToast, setShowToast] = useState(false);

    // Otomatis memunculkan toast popup jika ada flash success
    useEffect(() => {
        if (flash.success) {
            setShowToast(true);
            const timer = setTimeout(() => setShowToast(false), 3000);
            return () => clearTimeout(timer);
        }
    }, [flash.success]);

    return (
        <div className="min-h-screen bg-gray-100 relative">
            
            {/* TOAST POP-UP NOTIFICATION (Muncul di pojok kanan atas) */}
            {showToast && (
                <div className="fixed top-20 right-5 z-50 bg-emerald-500 text-white px-6 py-3 rounded-lg shadow-xl flex items-center transition-opacity duration-300">
                    <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    <span className="font-medium">{flash.success}</span>
                </div>
            )}

            <nav className="border-b border-gray-100 bg-white sticky top-0 z-40">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 justify-between">
                        <div className="flex">
                            <div className="flex shrink-0 items-center">
                                <Link href="/">
                                    <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800" />
                                </Link>
                            </div>
                            <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                                <NavLink href={route('dashboard')} active={route().current('dashboard')}>Dashboard</NavLink>
                                <NavLink href={route('activities.index')} active={route().current('activities.*')}>Activities</NavLink>
                                <NavLink href={route('calendar.index')} active={route().current('calendar.*')}>Kalender</NavLink>
                                {user.role === 'atasan' && (
                                    <NavLink href={route('users.index')} active={route().current('users.*')}>User Management</NavLink>
                                )}
                            </div>
                        </div>

                        <div className="hidden sm:ms-6 sm:flex sm:items-center space-x-4">
                            
                            {/* NOTIFICATION BELL WIDGET */}
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <button className="relative p-2 text-gray-400 hover:text-gray-600 focus:outline-none transition">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
                                        {notifications.length > 0 && (
                                            <span className="absolute top-1 right-1 flex h-3 w-3">
                                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                                            </span>
                                        )}
                                    </button>
                                </Dropdown.Trigger>
                                <Dropdown.Content>
                                    <div className="block px-4 py-2 text-xs text-gray-400 font-bold uppercase bg-gray-50 border-b">
                                        Riwayat Notifikasi Terbaru
                                    </div>
                                    <div className="max-h-60 overflow-y-auto custom-scrollbar">
                                        {notifications.length > 0 ? (
                                            notifications.map((notif) => (
                                                <div key={notif.id} className="block px-4 py-3 text-sm text-gray-700 border-b hover:bg-gray-50">
                                                    <span className="font-semibold text-emerald-600 block">{notif.tipe === 'success' ? 'Berhasil' : 'Info'}</span>
                                                    {notif.pesan}
                                                    <span className="text-[10px] text-gray-400 block mt-1">{new Date(notif.created_at).toLocaleString('id-ID')}</span>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="block px-4 py-4 text-sm text-gray-500 text-center">Belum ada notifikasi.</div>
                                        )}
                                    </div>
                                </Dropdown.Content>
                            </Dropdown>

                            <Dropdown>
                                <Dropdown.Trigger>
                                    <span className="inline-flex rounded-md">
                                        <button type="button" className="inline-flex items-center rounded-md border border-transparent bg-white px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-700">
                                            {user.name}
                                            <svg className="-me-0.5 ms-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                            </svg>
                                        </button>
                                    </span>
                                </Dropdown.Trigger>
                                <Dropdown.Content>
                                    <Dropdown.Link href={route('profile.edit')}>Profile</Dropdown.Link>
                                    <Dropdown.Link href={route('logout')} method="post" as="button">Log Out</Dropdown.Link>
                                </Dropdown.Content>
                            </Dropdown>
                        </div>
                    </div>
                </div>
            </nav>

            {header && (
                <header className="bg-white shadow relative z-10">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            <main className="relative z-0">{children}</main>
        </div>
    );
}