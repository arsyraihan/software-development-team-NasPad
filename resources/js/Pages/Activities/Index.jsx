import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { Edit3, HeartPulse, Save, Send } from 'lucide-react';

export default function Index({ auth, activities, userRole }) {
    const [mode, setMode] = useState('aktivitas'); 

    const { data, setData, post, processing, reset } = useForm({
        tanggal: '', task: '', waktu_mulai: '', waktu_akhir: '', keluaran: '', kategori: 'Daily Task'
    });

    const handleModeSwitch = (newMode) => {
        setMode(newMode);
        reset();
        if (newMode === 'halangan') {
            setData(prev => ({ ...prev, kategori: 'Izin', waktu_mulai: '00:00', waktu_akhir: '00:00', keluaran: 'Laporan Ketidakhadiran' }));
        }
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('activities.store'), {
            onSuccess: () => { reset(); if (mode === 'halangan') handleModeSwitch('halangan'); },
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-bold text-2xl text-gray-800">Tracker Aktivitas</h2>}
        >
            <Head title="Activities" />

            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 py-8 space-y-6">
                
                {/* FORM INPUT CARD */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    {/* Tab Header Modern */}
                    <div className="flex bg-gray-50 border-b border-gray-100">
                        <button onClick={() => handleModeSwitch('aktivitas')} 
                            className={`flex-1 py-4 text-sm font-bold flex items-center justify-center transition-all ${mode === 'aktivitas' ? 'bg-white text-orange-600 border-t-2 border-t-orange-500 shadow-sm' : 'text-gray-500 hover:bg-gray-100'}`}>
                            <Edit3 className="w-4 h-4 mr-2"/> Input Aktivitas Kerja
                        </button>
                        <button onClick={() => handleModeSwitch('halangan')} 
                            className={`flex-1 py-4 text-sm font-bold flex items-center justify-center transition-all ${mode === 'halangan' ? 'bg-white text-red-600 border-t-2 border-t-red-600 shadow-sm' : 'text-gray-500 hover:bg-gray-100'}`}>
                            <HeartPulse className="w-4 h-4 mr-2"/> Lapor Halangan
                        </button>
                    </div>

                    <div className="p-6 sm:p-8">
                        <form onSubmit={submit} className="space-y-5">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">Tanggal</label>
                                    <input type="date" className="w-full rounded-xl border-gray-200 bg-gray-50 focus:bg-white focus:border-orange-500 focus:ring-orange-200 transition-all"
                                        value={data.tanggal} onChange={e => setData('tanggal', e.target.value)} required />
                                </div>

                                {mode === 'aktivitas' ? (
                                    <>
                                        <div className="lg:col-span-2">
                                            <label className="block text-sm font-semibold text-gray-700 mb-1">Task / Pekerjaan</label>
                                            <input type="text" placeholder="Ketik deskripsi..." className="w-full rounded-xl border-gray-200 bg-gray-50 focus:bg-white focus:border-orange-500 focus:ring-orange-200 transition-all"
                                                value={data.task} onChange={e => setData('task', e.target.value)} required />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-1">Waktu Mulai</label>
                                            <input type="time" className="w-full rounded-xl border-gray-200 bg-gray-50 focus:bg-white focus:border-orange-500 focus:ring-orange-200 transition-all"
                                                value={data.waktu_mulai} onChange={e => setData('waktu_mulai', e.target.value)} required />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-1">Waktu Selesai</label>
                                            <input type="time" className="w-full rounded-xl border-gray-200 bg-gray-50 focus:bg-white focus:border-orange-500 focus:ring-orange-200 transition-all"
                                                value={data.waktu_akhir} onChange={e => setData('waktu_akhir', e.target.value)} required />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-1">Kategori</label>
                                            <select className="w-full rounded-xl border-gray-200 bg-gray-50 focus:bg-white focus:border-orange-500 focus:ring-orange-200 transition-all"
                                                value={data.kategori} onChange={e => setData('kategori', e.target.value)}>
                                                <option value="Daily Task">Daily Task</option>
                                                <option value="BSC / OKR">BSC / OKR</option>
                                                <option value="Improvement Goal">Improvement Goal</option>
                                            </select>
                                        </div>
                                        <div className="lg:col-span-3">
                                            <label className="block text-sm font-semibold text-gray-700 mb-1">Output (Link/Keterangan)</label>
                                            <input type="text" className="w-full rounded-xl border-gray-200 bg-gray-50 focus:bg-white focus:border-orange-500 focus:ring-orange-200 transition-all"
                                                value={data.keluaran} onChange={e => setData('keluaran', e.target.value)} required />
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div>
                                            <label className="block text-sm font-semibold text-red-700 mb-1">Jenis Halangan</label>
                                            <select className="w-full rounded-xl border-red-200 bg-red-50 text-red-700 focus:border-red-500 focus:ring-red-200 transition-all"
                                                value={data.kategori} onChange={e => setData('kategori', e.target.value)}>
                                                <option value="Izin">Izin</option>
                                                <option value="Sakit">Sakit</option>
                                            </select>
                                        </div>
                                        <div className="lg:col-span-3">
                                            <label className="block text-sm font-semibold text-gray-700 mb-1">Alasan Lengkap</label>
                                            <textarea rows="3" className="w-full rounded-xl border-gray-200 bg-gray-50 focus:bg-white focus:border-red-500 focus:ring-red-200 transition-all"
                                                value={data.task} onChange={e => setData('task', e.target.value)} required />
                                        </div>
                                    </>
                                )}
                            </div>
                            
                            {/* Tombol dengan Animasi Bubble/Scale */}
                            <div className="flex justify-end pt-4 border-t border-gray-100">
                                <button type="submit" disabled={processing} 
                                    className={`flex items-center px-6 py-3 text-white font-bold rounded-xl transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg active:scale-95
                                    ${mode === 'aktivitas' ? 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600' : 'bg-red-600 hover:bg-red-700'}`}>
                                    {processing ? 'Menyimpan...' : (mode === 'aktivitas' ? <><Save className="w-4 h-4 mr-2"/> Simpan Aktivitas</> : <><Send className="w-4 h-4 mr-2"/> Kirim Laporan</>)}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                {/* TABEL DATA ... (Struktur tabel biarkan sama, kelas CSS saya otomatis sesuaikan global dari AuthenticatedLayout) */}
            </div>
        </AuthenticatedLayout>
    );
}