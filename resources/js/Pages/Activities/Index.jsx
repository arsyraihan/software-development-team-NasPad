import React, { useRef, useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';

export default function Index({ auth, activities, userRole }) {
    const [mode, setMode] = useState('aktivitas'); // 'aktivitas' atau 'halangan'

    const { data, setData, post, processing, errors, reset } = useForm({
        tanggal: '',
        task: '',
        waktu_mulai: '',
        waktu_akhir: '',
        keluaran: '',
        kategori: 'Daily Task',
        ibadah: ''
    });

    // Mengganti Mode Form (Aktivitas vs Halangan)
    const handleModeSwitch = (newMode) => {
        setMode(newMode);
        reset(); // Bersihkan form saat ganti mode
        if (newMode === 'halangan') {
            // Isi otomatis field yang tidak terpakai dengan dummy agar database aman
            setData(prev => ({
                ...prev,
                kategori: 'Izin',
                waktu_mulai: '00:00',
                waktu_akhir: '00:00',
                keluaran: 'Laporan Ketidakhadiran'
            }));
        }
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('activities.store'), {
            onSuccess: () => {
                reset();
                if (mode === 'halangan') handleModeSwitch('halangan'); // Set ulang dummy jika di mode halangan
            },
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Tracker Aktivitas & Kehadiran</h2>}
        >
            <Head title="Activities" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        
                        {/* TAB MENU PILIHAN */}
                        <div className="flex space-x-6 border-b border-gray-200 mb-6">
                            <button 
                                onClick={() => handleModeSwitch('aktivitas')} 
                                className={`pb-3 font-semibold transition ${mode === 'aktivitas' ? 'border-b-2 border-indigo-600 text-indigo-600' : 'text-gray-400 hover:text-gray-600'}`}
                            >
                                ✍️ Input Aktivitas Kerja
                            </button>
                            <button 
                                onClick={() => handleModeSwitch('halangan')} 
                                className={`pb-3 font-semibold transition ${mode === 'halangan' ? 'border-b-2 border-red-600 text-red-600' : 'text-gray-400 hover:text-gray-600'}`}
                            >
                                🚑 Lapor Halangan (Izin/Sakit)
                            </button>
                        </div>

                        <form onSubmit={submit} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Tanggal</label>
                                    <input type="date" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200"
                                        value={data.tanggal} onChange={e => setData('tanggal', e.target.value)} required />
                                </div>

                                {mode === 'aktivitas' ? (
                                    <>
                                        <div className="lg:col-span-2">
                                            <label className="block text-sm font-medium text-gray-700">Task / Pekerjaan</label>
                                            <input type="text" placeholder="Deskripsikan pekerjaan Anda..." className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200"
                                                value={data.task} onChange={e => setData('task', e.target.value)} required />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Waktu Mulai</label>
                                            <input type="time" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                                value={data.waktu_mulai} onChange={e => setData('waktu_mulai', e.target.value)} required />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Waktu Selesai</label>
                                            <input type="time" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                                value={data.waktu_akhir} onChange={e => setData('waktu_akhir', e.target.value)} required />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Kategori</label>
                                            <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                                value={data.kategori} onChange={e => setData('kategori', e.target.value)}>
                                                <option value="Daily Task">Daily Task</option>
                                                <option value="BSC / OKR">BSC / OKR</option>
                                                <option value="Improvement Goal">Improvement Goal</option>
                                            </select>
                                        </div>
                                        <div className="lg:col-span-3">
                                            <label className="block text-sm font-medium text-gray-700">Output / Hasil Kerja</label>
                                            <input type="text" placeholder="Link dokumen atau keterangan hasil..." className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                                value={data.keluaran} onChange={e => setData('keluaran', e.target.value)} required />
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        {/* FORM KHUSUS HALANGAN */}
                                        <div>
                                            <label className="block text-sm font-medium text-red-700">Jenis Halangan</label>
                                            <select className="mt-1 block w-full rounded-md border-red-300 shadow-sm focus:border-red-500 focus:ring focus:ring-red-200 bg-red-50 text-red-700 font-bold"
                                                value={data.kategori} onChange={e => setData('kategori', e.target.value)}>
                                                <option value="Izin">Izin (Keperluan Mendesak)</option>
                                                <option value="Sakit">Sakit</option>
                                            </select>
                                        </div>
                                        <div className="lg:col-span-3">
                                            <label className="block text-sm font-medium text-gray-700">Keterangan / Alasan Lengkap</label>
                                            <textarea rows="3" placeholder="Sebutkan alasan atau kondisi Anda..." className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring focus:ring-red-200"
                                                value={data.task} onChange={e => setData('task', e.target.value)} required />
                                        </div>
                                    </>
                                )}

                            </div>
                            
                            <div className="flex justify-end pt-2">
                                <button type="submit" disabled={processing} 
                                    className={`px-6 py-2 text-white font-semibold rounded-md transition ${mode === 'aktivitas' ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-red-600 hover:bg-red-700'}`}>
                                    {processing ? 'Menyimpan...' : (mode === 'aktivitas' ? 'Simpan Aktivitas' : 'Kirim Laporan Halangan')}
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Tabel Riwayat Aktivitas... (Biarkan kode tabel bagian ini seperti yang sudah ada) */}
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        {userRole === 'atasan' && <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase">Nama</th>}
                                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase">Tanggal</th>
                                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase">Tugas / Keterangan</th>
                                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase">Waktu/Durasi</th>
                                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase">Kategori</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {activities.map((act) => (
                                        <tr key={act.id} className="hover:bg-gray-50">
                                            {userRole === 'atasan' && <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{act.user?.name}</td>}
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{act.tanggal}</td>
                                            <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">{act.task}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                                {act.kategori === 'Izin' || act.kategori === 'Sakit' ? (
                                                    <span className="text-red-500 font-bold">- (Absen)</span>
                                                ) : (
                                                    <span>{act.waktu_mulai.slice(0,5)} - {act.waktu_akhir.slice(0,5)} <br/>({act.durasi_menit} mnt)</span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                                <span className={`px-3 py-1 inline-flex text-xs leading-5 font-bold rounded-full 
                                                    ${act.kategori === 'Sakit' ? 'bg-red-200 text-red-900' : 
                                                      act.kategori === 'Izin' ? 'bg-orange-200 text-orange-900' :
                                                      act.kategori === 'Daily Task' ? 'bg-yellow-100 text-yellow-800' : 
                                                      act.kategori === 'BSC / OKR' ? 'bg-red-100 text-red-800' : 'bg-emerald-100 text-emerald-800'}`}>
                                                    {act.kategori}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}