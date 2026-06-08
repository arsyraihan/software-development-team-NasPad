import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';

export default function Index({ auth, activities, userRole }) {
    // Inisialisasi form menggunakan hook bawaan Inertia
    const { data, setData, post, processing, errors, reset } = useForm({
        tanggal: '',
        task: '',
        waktu_mulai: '',
        waktu_akhir: '',
        keluaran: '',
        kategori: 'Daily Task',
        ibadah: ''
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('activities.store'), {
            onSuccess: () => reset(),
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard OneTracker</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    
                    {/* Bagian Form Input (Hanya tampil untuk karyawan) */}
                    {userRole === 'karyawan' && (
                        <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">Input Aktivitas Harian</h3>
                            <form onSubmit={submit} className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Tanggal</label>
                                        <input type="date" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                            value={data.tanggal} onChange={e => setData('tanggal', e.target.value)} required />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Task / Kegiatan</label>
                                        <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
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
                                        <label className="block text-sm font-medium text-gray-700">Output / Hasil</label>
                                        <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                            value={data.keluaran} onChange={e => setData('keluaran', e.target.value)} required />
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
                                </div>
                                <button type="submit" disabled={processing} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                                    Simpan Aktivitas
                                </button>
                            </form>
                        </div>
                    )}

                    {/* Bagian Tabel Riwayat Aktivitas */}
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Riwayat Aktivitas {userRole === 'atasan' ? 'Tim' : 'Saya'}</h3>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        {userRole === 'atasan' && <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nama User</th>}
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tanggal</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Task</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Waktu</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Durasi</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Kategori</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {activities.map((act) => (
                                        <tr key={act.id}>
                                            {userRole === 'atasan' && <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{act.user?.name}</td>}
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{act.tanggal}</td>
                                            <td className="px-6 py-4 text-sm text-gray-900">{act.task}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{act.waktu_mulai} - {act.waktu_akhir}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{act.durasi_menit} menit</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
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