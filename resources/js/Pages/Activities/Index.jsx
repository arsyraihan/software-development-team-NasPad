import React, { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { Edit3, HeartPulse, Save, Send, ListTodo, AlertCircle, Clock } from 'lucide-react';

export default function Index({ auth, activities, userRole }) {
    const [mode, setMode] = useState('aktivitas'); 

    // Helper untuk mendapatkan Tanggal & Waktu Lokal
    const getLocalDate = () => {
        const d = new Date();
        return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
    };
    const getLocalTime = () => {
        const d = new Date();
        return String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0');
    };

    const { data, setData, post, processing, reset } = useForm({
        tanggal: getLocalDate(), 
        task: '', 
        waktu_mulai: getLocalTime(), 
        waktu_akhir: '', // Dikosongkan agar user input sendiri
        keluaran: '', 
        kategori: 'Daily Task'
    });

    const handleModeSwitch = (newMode) => {
        setMode(newMode);
        reset();
        // Kembalikan ke waktu saat ini jika beralih mode, tapi waktu_akhir tetap kosong
        if (newMode === 'halangan') {
            setData({ tanggal: getLocalDate(), task: '', waktu_mulai: '00:00', waktu_akhir: '00:00', keluaran: 'Laporan Ketidakhadiran', kategori: 'Izin' });
        } else {
            setData({ tanggal: getLocalDate(), task: '', waktu_mulai: getLocalTime(), waktu_akhir: '', keluaran: '', kategori: 'Daily Task' });
        }
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('activities.store'), {
            onSuccess: () => { 
                reset(); 
                // Set ulang waktu ke saat ini, biarkan waktu_akhir kosong kembali
                setData(prev => ({ ...prev, tanggal: getLocalDate(), waktu_mulai: getLocalTime(), waktu_akhir: '' }));
                if (mode === 'halangan') handleModeSwitch('halangan'); 
            },
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-extrabold text-2xl text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500 tracking-tight">
                    Tracker Aktivitas
                </h2>
            }
        >
            <Head title="Activities" />
            <div className="absolute top-0 left-0 w-full h-72 bg-gradient-to-b from-red-50/80 to-transparent -z-10 pointer-events-none"></div>

            <div className="pt-8 pb-12 max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                
                {/* FORM INPUT CARD */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition hover:shadow-md">
                    <div className="flex bg-gray-50/80 border-b border-gray-100">
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
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Tanggal</label>
                                    <input type="date" className="w-full rounded-xl border-gray-200 bg-gray-50 focus:bg-white focus:border-orange-500 focus:ring-orange-200 transition-all text-sm"
                                        value={data.tanggal} onChange={e => setData('tanggal', e.target.value)} required />
                                </div>

                                {mode === 'aktivitas' ? (
                                    <>
                                        <div className="lg:col-span-2">
                                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Task / Pekerjaan</label>
                                            <input type="text" placeholder="Ketik deskripsi..." className="w-full rounded-xl border-gray-200 bg-gray-50 focus:bg-white focus:border-orange-500 focus:ring-orange-200 transition-all text-sm"
                                                value={data.task} onChange={e => setData('task', e.target.value)} required />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Waktu Mulai</label>
                                            <input type="time" className="w-full rounded-xl border-gray-200 bg-gray-50 focus:bg-white focus:border-orange-500 focus:ring-orange-200 transition-all text-sm"
                                                value={data.waktu_mulai} onChange={e => setData('waktu_mulai', e.target.value)} required />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Waktu Selesai</label>
                                            <input type="time" className="w-full rounded-xl border-gray-200 bg-gray-50 focus:bg-white focus:border-orange-500 focus:ring-orange-200 transition-all text-sm"
                                                value={data.waktu_akhir} onChange={e => setData('waktu_akhir', e.target.value)} required />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Kategori</label>
                                            <select className="w-full rounded-xl border-gray-200 bg-gray-50 focus:bg-white focus:border-orange-500 focus:ring-orange-200 transition-all text-sm"
                                                value={data.kategori} onChange={e => setData('kategori', e.target.value)}>
                                                <option value="Daily Task">Daily Task</option>
                                                <option value="BSC / OKR">BSC / OKR</option>
                                                <option value="Improvement Goal">Improvement Goal</option>
                                            </select>
                                        </div>
                                        <div className="lg:col-span-3">
                                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Output (Link/Keterangan)</label>
                                            <input type="text" className="w-full rounded-xl border-gray-200 bg-gray-50 focus:bg-white focus:border-orange-500 focus:ring-orange-200 transition-all text-sm"
                                                value={data.keluaran} onChange={e => setData('keluaran', e.target.value)} required />
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div>
                                            <label className="block text-xs font-bold text-red-500 uppercase tracking-wider mb-1">Jenis Halangan</label>
                                            <select className="w-full rounded-xl border-red-200 bg-red-50 text-red-700 focus:border-red-500 focus:ring-red-200 transition-all text-sm font-semibold"
                                                value={data.kategori} onChange={e => setData('kategori', e.target.value)}>
                                                <option value="Izin">Izin</option>
                                                <option value="Sakit">Sakit</option>
                                            </select>
                                        </div>
                                        <div className="lg:col-span-3">
                                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Alasan Lengkap</label>
                                            <textarea rows="3" className="w-full rounded-xl border-gray-200 bg-gray-50 focus:bg-white focus:border-red-500 focus:ring-red-200 transition-all text-sm"
                                                value={data.task} onChange={e => setData('task', e.target.value)} required />
                                        </div>
                                    </>
                                )}
                            </div>
                            
                            <div className="flex justify-end pt-4 border-t border-gray-100">
                                <button type="submit" disabled={processing} 
                                    className={`flex items-center px-6 py-2.5 text-white text-sm font-bold rounded-xl transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-md active:scale-95
                                    ${mode === 'aktivitas' ? 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600' : 'bg-red-600 hover:bg-red-700'}`}>
                                    {processing ? 'Menyimpan...' : (mode === 'aktivitas' ? <><Save className="w-4 h-4 mr-2"/> Simpan</> : <><Send className="w-4 h-4 mr-2"/> Kirim</>)}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                {/* TABEL DATA */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="bg-gray-50/80 px-6 py-4 border-b border-gray-100 flex items-center">
                        <ListTodo className="w-5 h-5 text-orange-500 mr-2" />
                        <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider">Riwayat Log Aktivitas</h3>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-100">
                            <thead className="bg-white">
                                <tr>
                                    {userRole === 'atasan' && <th className="px-6 py-3 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Nama</th>}
                                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Tanggal & Waktu</th>
                                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Tugas / Keterangan</th>
                                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Kategori</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-50">
                                {activities.map((act) => (
                                    <tr key={act.id} className="hover:bg-gray-50/50 transition">
                                        {userRole === 'atasan' && <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-800">{act.user?.name}</td>}
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-800">{act.tanggal}</div>
                                            {act.kategori !== 'Izin' && act.kategori !== 'Sakit' && (
                                                <div className="text-xs text-gray-500 flex items-center mt-1"><Clock className="w-3 h-3 mr-1"/> {act.waktu_mulai.slice(0,5)} - {act.waktu_akhir.slice(0,5)}</div>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600 max-w-sm truncate">{act.task}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-3 py-1 inline-flex text-xs leading-5 font-bold rounded-md border 
                                                ${act.kategori === 'Sakit' ? 'bg-red-50 text-red-700 border-red-100' : 
                                                  act.kategori === 'Izin' ? 'bg-orange-50 text-orange-700 border-orange-100' :
                                                  act.kategori === 'Daily Task' ? 'bg-yellow-50 text-yellow-700 border-yellow-100' : 
                                                  act.kategori === 'BSC / OKR' ? 'bg-indigo-50 text-indigo-700 border-indigo-100' : 'bg-emerald-50 text-emerald-700 border-emerald-100'}`}>
                                                {act.kategori === 'Sakit' || act.kategori === 'Izin' ? <AlertCircle className="w-3 h-3 mr-1.5"/> : null}
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
        </AuthenticatedLayout>
    );
}