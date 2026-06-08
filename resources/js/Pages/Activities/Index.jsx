import React, { useRef } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';

export default function Index({ auth, activities, userRole }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        tanggal: '',
        task: '',
        waktu_mulai: '',
        waktu_akhir: '',
        keluaran: '',
        kategori: 'Daily Task',
        ibadah: ''
    });

    // Membuat referensi (ref) untuk setiap inputan
    const tanggalRef = useRef(null);
    const taskRef = useRef(null);
    const waktuMulaiRef = useRef(null);
    const waktuAkhirRef = useRef(null);
    const keluaranRef = useRef(null);
    const kategoriRef = useRef(null);
    const submitBtnRef = useRef(null);

    // Fungsi untuk mendeteksi tombol Enter dan memindahkan fokus
    const handleKeyDown = (e, nextRef) => {
        if (e.key === 'Enter') {
            e.preventDefault(); // Mencegah form langsung tersubmit
            if (nextRef && nextRef.current) {
                nextRef.current.focus(); // Pindah ke input selanjutnya
            }
        }
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('activities.store'), {
            onSuccess: () => {
                reset();
                // Setelah berhasil menyimpan, otomatis fokus kembali ke kolom tanggal
                if (tanggalRef.current) {
                    tanggalRef.current.focus();
                }
            },
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Tracker Aktivitas</h2>}
        >
            <Head title="Activities" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">

                    {/* Form Input Aktivitas (Sekarang tampil untuk SEMUA role, tanpa syarat) */}
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg border-t-4 border-blue-500">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Input Aktivitas Harian</h3>
                        <form onSubmit={submit} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Tanggal</label>
                                    <input
                                        type="date"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                                        value={data.tanggal}
                                        onChange={e => setData('tanggal', e.target.value)}
                                        ref={tanggalRef}
                                        onKeyDown={(e) => handleKeyDown(e, taskRef)}
                                        required
                                    />
                                </div>
                                <div className="lg:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700">Task / Kegiatan</label>
                                    <input
                                        type="text"
                                        placeholder="Deskripsikan pekerjaan Anda..."
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                                        value={data.task}
                                        onChange={e => setData('task', e.target.value)}
                                        ref={taskRef}
                                        onKeyDown={(e) => handleKeyDown(e, waktuMulaiRef)}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Waktu Mulai</label>
                                    <input
                                        type="time"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                                        value={data.waktu_mulai}
                                        onChange={e => setData('waktu_mulai', e.target.value)}
                                        ref={waktuMulaiRef}
                                        onKeyDown={(e) => handleKeyDown(e, waktuAkhirRef)}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Waktu Selesai</label>
                                    <input
                                        type="time"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                                        value={data.waktu_akhir}
                                        onChange={e => setData('waktu_akhir', e.target.value)}
                                        ref={waktuAkhirRef}
                                        onKeyDown={(e) => handleKeyDown(e, keluaranRef)}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Kategori</label>
                                    <select
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                                        value={data.kategori}
                                        onChange={e => setData('kategori', e.target.value)}
                                        ref={kategoriRef}
                                        onKeyDown={(e) => handleKeyDown(e, submitBtnRef)}
                                    >
                                        <option value="Daily Task">Daily Task</option>
                                        <option value="BSC / OKR">BSC / OKR</option>
                                        <option value="Improvement Goal">Improvement Goal</option>
                                    </select>
                                </div>
                                <div className="lg:col-span-3">
                                    <label className="block text-sm font-medium text-gray-700">Output / Hasil Kerja (Link Dokumen / Keterangan)</label>
                                    <input
                                        type="text"
                                        placeholder="Contoh: Dokumen telah diupload di Google Drive..."
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                                        value={data.keluaran}
                                        onChange={e => setData('keluaran', e.target.value)}
                                        ref={keluaranRef}
                                        onKeyDown={(e) => handleKeyDown(e, kategoriRef)}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end pt-2">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    ref={submitBtnRef}
                                    className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                >
                                    {processing ? 'Menyimpan...' : 'Simpan Aktivitas'}
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Bagian Tabel Riwayat Aktivitas */}
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg border border-gray-100">
                        <h3 className="text-lg font-medium text-gray-900 mb-4 border-l-4 border-blue-500 pl-2">
                            Riwayat Aktivitas {userRole === 'atasan' ? 'Seluruh Tim' : 'Saya'}
                        </h3>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        {userRole === 'atasan' && <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Nama Karyawan</th>}
                                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Tanggal</th>
                                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Task</th>
                                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Waktu</th>
                                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Durasi</th>
                                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Kategori</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {activities.length > 0 ? (
                                        activities.map((act) => (
                                            <tr key={act.id} className="hover:bg-gray-50">
                                                {userRole === 'atasan' && <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{act.user?.name}</td>}
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{act.tanggal}</td>
                                                <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">{act.task}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                                    <span className="font-mono bg-gray-100 px-2 py-1 rounded text-xs">{act.waktu_mulai.slice(0, 5)}</span>
                                                    <span className="mx-1">-</span>
                                                    <span className="font-mono bg-gray-100 px-2 py-1 rounded text-xs">{act.waktu_akhir.slice(0, 5)}</span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-medium">{act.durasi_menit} mnt</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                                                        ${act.kategori === 'Daily Task' ? 'bg-yellow-100 text-yellow-800' :
                                                            act.kategori === 'BSC / OKR' ? 'bg-red-100 text-red-800' :
                                                                'bg-purple-100 text-purple-800'}`}>
                                                        {act.kategori}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={userRole === 'atasan' ? 6 : 5} className="px-6 py-8 text-center text-gray-500">
                                                Belum ada data aktivitas yang dicatat.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}