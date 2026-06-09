import React, { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import Chart from 'react-apexcharts';

export default function Dashboard({ auth, userRole, totalUsers, notesHariIni, userActivityCounts, chartData }) {
    const isAtasan = userRole === 'atasan';

    // --- WIDGET JAM REAL-TIME ---
    const [currentTime, setCurrentTime] = useState(new Date());
    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);
    // Format Jam 10.30 (Tanpa detik)
    const timeString = currentTime.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }).replace(':', '.');

    // --- WIDGET KALENDER MINI ---
    const [calMonth, setCalMonth] = useState(currentTime.getMonth());
    const [calYear, setCalYear] = useState(currentTime.getFullYear());
    
    const namaBulan = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Ags", "Sep", "Okt", "Nov", "Des"];
    const daysInMonth = new Date(calYear, calMonth + 1, 0).getDate();
    const firstDay = new Date(calYear, calMonth, 1).getDay();

    const nextMonth = () => {
        if (calMonth === 11) { setCalMonth(0); setCalYear(calYear + 1); } 
        else { setCalMonth(calMonth + 1); }
    };
    const prevMonth = () => {
        if (calMonth === 0) { setCalMonth(11); setCalYear(calYear - 1); } 
        else { setCalMonth(calMonth - 1); }
    };

    // --- KONFIGURASI APEXCHARTS ---
    const areaOptions = {
        chart: { type: 'area', toolbar: { show: false }, zoom: { enabled: false } },
        colors: ['#ea580c'], // Oranye
        dataLabels: { enabled: false },
        stroke: { curve: 'smooth', width: 2 },
        xaxis: { categories: chartData.area.labels },
        fill: { type: 'gradient', gradient: { shadeIntensity: 1, opacityFrom: 0.7, opacityTo: 0.1, stops: [0, 90, 100] } }
    };

    const polarOptions = {
        chart: { type: 'polarArea' },
        labels: chartData.polar.labels,
        colors: ['#dc2626', '#f97316', '#fbbf24'], // Merah, Oranye, Kuning
        stroke: { colors: ['#fff'] },
        fill: { opacity: 0.8 },
        legend: { position: 'bottom' }
    };

    const barOptions = {
        chart: { type: 'bar', toolbar: { show: false } },
        colors: ['#dc2626'], // Merah
        plotOptions: { bar: { borderRadius: 4, columnWidth: '50%', distributed: true } },
        dataLabels: { enabled: false },
        xaxis: { categories: chartData.bar.labels },
        legend: { show: false }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Beranda</h2>}
        >
            <Head title="Dashboard" />
            
            {/* Tema Latar Merah-Oranye (Referensi GitHub) */}
            <div className="bg-gradient-to-r from-red-600 to-orange-500 h-40 w-full absolute -z-10 top-16 left-0 shadow-inner"></div>

            <div className="py-8 pt-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    
                    {/* BARIS 1: 5 KOLOM WIDGET */}
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                        
                        {/* WIDGET 1: TOTAL USER & JAM */}
                        <div className="flex flex-col gap-4">
                            {isAtasan && (
                                <div className="bg-white p-4 rounded-xl shadow-md border-l-4 border-red-500 flex items-center justify-between">
                                    <div>
                                        <h4 className="text-xs font-bold text-gray-400 uppercase">Total User</h4>
                                        <p className="text-2xl font-black text-red-600">{totalUsers}</p>
                                    </div>
                                    <div className="bg-red-100 p-2 rounded-lg text-red-600">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                                    </div>
                                </div>
                            )}
                            <div className="bg-white p-4 rounded-xl shadow-md flex flex-col justify-center items-center flex-grow">
                                <h4 className="text-xs font-bold text-gray-400 uppercase mb-1">Jam Saat Ini</h4>
                                <div className="text-4xl font-extrabold text-orange-500 tracking-wider">
                                    {timeString}
                                </div>
                            </div>
                        </div>

                        {/* WIDGET 2: AKTIVITAS PER USER (Scrollable) */}
                        <div className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col h-48">
                            <div className="bg-orange-500 text-white p-3 text-xs font-bold uppercase tracking-wider">
                                {isAtasan ? 'Aktivitas Karyawan' : 'Tugas Selesai'}
                            </div>
                            <div className="p-3 overflow-y-auto flex-grow custom-scrollbar">
                                {isAtasan && userActivityCounts.length > 0 ? (
                                    <ul className="space-y-2">
                                        {userActivityCounts.map((u, idx) => (
                                            <li key={idx} className="flex justify-between items-center text-sm border-b border-gray-100 pb-1">
                                                <span className="font-semibold text-gray-700">{u.name.split(' ')[0]}</span>
                                                <span className="bg-red-100 text-red-600 px-2 py-0.5 rounded-full text-xs font-bold">{u.total} task</span>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-sm text-gray-400 text-center mt-6">Data belum tersedia.</p>
                                )}
                            </div>
                        </div>

                        {/* WIDGET 3: KALENDER MINI */}
                        <div className="bg-white rounded-xl shadow-md p-4">
                            <div className="flex justify-between items-center mb-2">
                                <button onClick={prevMonth} className="text-orange-500 hover:text-red-600 font-bold px-2">&lt;</button>
                                <h4 className="text-sm font-bold text-gray-700 uppercase">{namaBulan[calMonth]} {calYear}</h4>
                                <button onClick={nextMonth} className="text-orange-500 hover:text-red-600 font-bold px-2">&gt;</button>
                            </div>
                            <div className="grid grid-cols-7 gap-1 text-center text-[10px] mt-1">
                                {['M', 'S', 'S', 'R', 'K', 'J', 'S'].map((d, i) => <div key={i} className="font-bold text-gray-400">{d}</div>)}
                                {Array.from({ length: firstDay }).map((_, i) => <div key={`empty-${i}`}></div>)}
                                {Array.from({ length: daysInMonth }).map((_, i) => {
                                    const day = i + 1;
                                    const isToday = day === currentTime.getDate() && calMonth === currentTime.getMonth();
                                    return (
                                        <div key={day} className={`py-1 rounded-sm ${isToday ? 'bg-red-500 text-white font-bold' : 'text-gray-600'}`}>
                                            {day}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* WIDGET 4 & 5: NOTES / JADWAL HARI INI (Span 2) */}
                        <div className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col h-48 lg:col-span-2">
                            <div className="bg-red-600 text-white p-3 text-xs font-bold uppercase tracking-wider flex justify-between">
                                <span>Jadwal & Catatan Hari Ini</span>
                                <span>{currentTime.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}</span>
                            </div>
                            <div className="p-4 overflow-y-auto flex-grow bg-red-50">
                                {notesHariIni.length > 0 ? (
                                    <div className="space-y-3">
                                        {notesHariIni.map((note) => (
                                            <div key={note.id} className="bg-white p-3 rounded border-l-4 border-orange-500 shadow-sm text-sm">
                                                <span className="font-bold text-red-600 text-xs block mb-1">{note.user?.name}</span>
                                                <span className="text-gray-700">{note.catatan}</span>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center justify-center h-full text-gray-400">
                                        <svg className="w-8 h-8 mb-2 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path></svg>
                                        <p className="text-sm">Tidak ada jadwal hari ini.</p>
                                    </div>
                                )}
                            </div>
                        </div>

                    </div>

                    {/* BARIS 2: 3 CHART APEXCHARTS */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        
                        {/* CHART 1: AREA (Span 1) */}
                        <div className="bg-white p-5 rounded-xl shadow-md border border-gray-100">
                            <h3 className="text-sm font-bold text-gray-700 mb-2 uppercase">Trend Durasi Harian (Jam)</h3>
                            <Chart options={areaOptions} series={[{ name: 'Total Jam', data: chartData.area.data }]} type="area" height={250} />
                        </div>

                        {/* CHART 2: POLAR AREA */}
                        <div className="bg-white p-5 rounded-xl shadow-md border border-gray-100 flex flex-col items-center">
                            <h3 className="text-sm font-bold text-gray-700 mb-2 uppercase w-full text-left">Target Kategori Diselesaikan</h3>
                            <div className="w-full flex justify-center mt-2">
                                <Chart options={polarOptions} series={chartData.polar.data} type="polarArea" height={260} />
                            </div>
                        </div>

                        {/* CHART 3: BAR / SELISIH */}
                        <div className="bg-white p-5 rounded-xl shadow-md border border-gray-100">
                            <h3 className="text-sm font-bold text-gray-700 mb-2 uppercase">
                                {isAtasan ? 'Selisih Durasi Antar Tim (Jam)' : 'Total Jam Per Kategori'}
                            </h3>
                            <Chart options={barOptions} series={[{ name: 'Durasi', data: chartData.bar.data }]} type="bar" height={250} />
                        </div>

                    </div>

                </div>
            </div>

            {/* Custom Scrollbar CSS for Widgets */}
            <style>{`
                .custom-scrollbar::-webkit-scrollbar { width: 4px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: #f1f1f1; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: #f97316; border-radius: 4px; }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #ea580c; }
            `}</style>

        </AuthenticatedLayout>
    );
}