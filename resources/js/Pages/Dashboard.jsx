import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard({ auth, stats, userRole }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            {/* Aksen banner merah sesuai referensi */}
            <div className="bg-red-600 h-24 w-full absolute -z-10 top-16 left-0"></div>

            <div className="py-8 pt-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">

                    {/* Baris Pertama: Kartu Total & Tanggal */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex items-center justify-between">
                            <div>
                                <h3 className="text-gray-500 text-sm font-bold uppercase tracking-wider">Total Karyawan Aktif</h3>
                                <p className="mt-2 text-3xl font-bold text-gray-900">12</p>
                            </div>
                            <div className="text-red-500 bg-red-100 p-3 rounded-full">
                                {/* Placeholder Icon */}
                                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20"><path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"></path></svg>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 text-center">
                            <h3 className="text-gray-500 text-sm font-bold tracking-wider">HARI INI</h3>
                            <p className="mt-2 text-4xl font-bold text-gray-900">{new Date().getDate()}</p>
                            <p className="text-sm font-semibold text-green-500 uppercase mt-1">{new Date().toLocaleString('id-ID', { month: 'long', year: 'numeric' })}</p>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                            <h3 className="text-gray-500 text-sm font-bold uppercase tracking-wider">Durasi Kerja {userRole === 'atasan' ? 'Tim' : 'Saya'}</h3>
                            <p className="mt-2 text-3xl font-bold text-blue-600">{stats?.totalDurasiJam || 0} <span className="text-sm text-gray-500">Jam</span></p>
                        </div>
                    </div>

                    {/* Baris Kedua: Breakdown Kategori Pekerjaan */}
                    <div className="bg-white shadow-sm sm:rounded-lg p-6 border border-gray-100">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-bold text-gray-800 border-l-4 border-red-500 pl-2">Breakdown Kategori Pekerjaan</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="border border-gray-200 p-4 rounded text-center">
                                <h4 className="text-gray-600 font-semibold mb-2">Daily Task</h4>
                                <span className="text-3xl font-bold text-yellow-600">{stats?.kategori?.Daily_Task || 0}</span>
                            </div>
                            <div className="border border-gray-200 p-4 rounded text-center">
                                <h4 className="text-gray-600 font-semibold mb-2">BSC / OKR</h4>
                                <span className="text-3xl font-bold text-red-600">{stats?.kategori?.BSC_OKR || 0}</span>
                            </div>
                            <div className="border border-gray-200 p-4 rounded text-center">
                                <h4 className="text-gray-600 font-semibold mb-2">Improvement Goal</h4>
                                <span className="text-3xl font-bold text-purple-600">{stats?.kategori?.Improvement_Goal || 0}</span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}