import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';

export default function Index({ auth, notes }) {
    const today = new Date();
    const [currentMonth, setCurrentMonth] = useState(today.getMonth());
    const [currentYear, setCurrentYear] = useState(today.getFullYear());
    const [selectedDate, setSelectedDate] = useState('');

    const { data, setData, post, processing, reset, errors } = useForm({
        tanggal: '',
        catatan: ''
    });

    const namaBulan = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
    const namaHari = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];

    // Menghitung jumlah hari & offset (mulai hari apa)
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

    const handlePrevMonth = () => {
        if (currentMonth === 0) {
            setCurrentMonth(11);
            setCurrentYear(currentYear - 1);
        } else {
            setCurrentMonth(currentMonth - 1);
        }
    };

    const handleNextMonth = () => {
        if (currentMonth === 11) {
            setCurrentMonth(0);
            setCurrentYear(currentYear + 1);
        } else {
            setCurrentMonth(currentMonth + 1);
        }
    };

    const handleDayClick = (day) => {
        // Format tanggal ke YYYY-MM-DD
        const formattedDate = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        setSelectedDate(formattedDate);
        setData('tanggal', formattedDate);
    };

    const submitNote = (e) => {
        e.preventDefault();
        post(route('calendar.store'), {
            onSuccess: () => {
                reset('catatan');
            }
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Kalender & Catatan Tim</h2>}
        >
            <Head title="Kalender" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        
                        {/* KOMPONEN KALENDER UTAMA */}
                        <div className="lg:col-span-2 p-6 bg-white shadow sm:rounded-lg">
                            <div className="flex justify-between items-center mb-6">
                                <button onClick={handlePrevMonth} className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded font-bold text-gray-600">&laquo; Prev</button>
                                <h3 className="text-xl font-bold text-gray-800 uppercase tracking-widest">{namaBulan[currentMonth]} {currentYear}</h3>
                                <button onClick={handleNextMonth} className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded font-bold text-gray-600">Next &raquo;</button>
                            </div>

                            <div className="grid grid-cols-7 gap-1 text-center">
                                {/* Header Hari */}
                                {namaHari.map(hari => (
                                    <div key={hari} className="font-bold py-2 text-gray-500 bg-gray-50 border-b border-gray-200">{hari}</div>
                                ))}

                                {/* Kotak Kosong (Offset Awal Bulan) */}
                                {Array.from({ length: firstDayOfMonth }).map((_, index) => (
                                    <div key={`empty-${index}`} className="p-4 border border-transparent"></div>
                                ))}

                                {/* Kotak Tanggal */}
                                {Array.from({ length: daysInMonth }).map((_, index) => {
                                    const day = index + 1;
                                    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                                    
                                    // Filter catatan untuk tanggal ini
                                    const dayNotes = notes.filter(n => n.tanggal === dateStr);
                                    const isToday = dateStr === `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

                                    return (
                                        <div 
                                            key={day} 
                                            onClick={() => handleDayClick(day)}
                                            className={`min-h-[100px] p-2 border border-gray-100 hover:border-blue-400 hover:shadow-md cursor-pointer transition 
                                                ${selectedDate === dateStr ? 'bg-blue-50 border-blue-500 ring-2 ring-blue-200' : 'bg-white'} 
                                                ${isToday ? 'bg-yellow-50' : ''}`
                                            }
                                        >
                                            <div className={`text-right font-semibold ${isToday ? 'text-red-500' : 'text-gray-700'}`}>{day}</div>
                                            
                                            {/* Render Catatan di dalam Kotak Tanggal */}
                                            <div className="mt-1 space-y-1">
                                                {dayNotes.map(note => (
                                                    <div key={note.id} className="text-xs bg-indigo-100 text-indigo-800 p-1 rounded truncate shadow-sm">
                                                        <span className="font-bold">{note.user.name.split(' ')[0]}:</span> {note.catatan}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* PANEL TAMBAH CATATAN */}
                        <div className="p-6 bg-white shadow sm:rounded-lg h-fit border-t-4 border-indigo-500">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">Tambahkan Peringatan / Catatan</h3>
                            
                            {selectedDate ? (
                                <form onSubmit={submitNote} className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Tanggal Terpilih</label>
                                        <input 
                                            type="date" 
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-gray-100 cursor-not-allowed"
                                            value={data.tanggal} 
                                            readOnly 
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Catatan Hari H</label>
                                        <textarea 
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200"
                                            rows="3"
                                            placeholder="Contoh: Meeting evaluasi bulanan / Tenggat waktu proyek X"
                                            value={data.catatan}
                                            onChange={e => setData('catatan', e.target.value)}
                                            required
                                        ></textarea>
                                        {errors.catatan && <span className="text-red-500 text-xs">{errors.catatan}</span>}
                                    </div>
                                    <button 
                                        type="submit" 
                                        disabled={processing} 
                                        className="w-full px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 transition"
                                    >
                                        Simpan Catatan
                                    </button>
                                </form>
                            ) : (
                                <div className="p-4 bg-gray-50 border border-dashed border-gray-300 rounded text-center text-gray-500 text-sm">
                                    &larr; Silakan klik salah satu tanggal di kalender untuk menambahkan catatan.
                                </div>
                            )}
                        </div>

                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}