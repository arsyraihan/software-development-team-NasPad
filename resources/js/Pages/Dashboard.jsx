import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import Chart from 'react-apexcharts';
import { Target, CheckCircle, TrendingUp, Users } from 'lucide-react';

export default function Dashboard({ auth, userRole, totalUsers, notesHariIni, userActivityCounts, chartData }) {
    const isAtasan = userRole === 'atasan';

    const areaOptions = {
        chart: { type: 'area', toolbar: { show: false } },
        colors: ['#ea580c'],
        dataLabels: { enabled: false },
        stroke: { curve: 'smooth', width: 3 },
        xaxis: { categories: chartData.area.labels, labels: { style: { colors: '#9ca3af' } } },
        yaxis: { labels: { style: { colors: '#9ca3af' } } },
        fill: { type: 'gradient', gradient: { shadeIntensity: 1, opacityFrom: 0.4, opacityTo: 0.05, stops: [0, 90, 100] } },
        grid: { borderColor: '#f3f4f6', strokeDashArray: 4 }
    };

    const polarOptions = {
        chart: { type: 'polarArea' },
        labels: chartData.polar.labels,
        colors: ['#dc2626', '#f97316', '#fbbf24'],
        stroke: { colors: ['#ffffff'], width: 2 },
        fill: { opacity: 0.85 },
        legend: { position: 'bottom', markers: { radius: 12 } }
    };

    const barOptions = {
        chart: { type: 'bar', toolbar: { show: false } },
        colors: ['#ef4444'],
        plotOptions: { bar: { borderRadius: 6, columnWidth: '45%', distributed: true } },
        dataLabels: { enabled: false },
        xaxis: { categories: chartData.bar.labels, labels: { style: { colors: '#9ca3af' } } },
        grid: { borderColor: '#f3f4f6', strokeDashArray: 4 },
        legend: { show: false }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-bold text-2xl text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500">Command Center</h2>}
        >
            <Head title="Dashboard" />
            
            {/* Latar Belakang Aksen Modern */}
            <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-red-50 to-transparent -z-10"></div>

            <div className="pt-8 max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-8">
                
                {/* BARIS 1: STATISTIK WIDGETS */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {isAtasan && (
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-semibold text-gray-400 uppercase">Total Tim Aktif</p>
                                    <h3 className="text-3xl font-black text-gray-800 mt-1">{totalUsers}</h3>
                                </div>
                                <div className="p-3 bg-red-50 rounded-xl text-red-600"><Users className="w-8 h-8"/></div>
                            </div>
                        </div>
                    )}
                    
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-semibold text-gray-400 uppercase">BSC / OKR Selesai</p>
                                <h3 className="text-3xl font-black text-gray-800 mt-1">{chartData.polar.data[0]}</h3>
                            </div>
                            <div className="p-3 bg-orange-50 rounded-xl text-orange-600"><Target className="w-8 h-8"/></div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-semibold text-gray-400 uppercase">Daily Task</p>
                                <h3 className="text-3xl font-black text-gray-800 mt-1">{chartData.polar.data[1]}</h3>
                            </div>
                            <div className="p-3 bg-yellow-50 rounded-xl text-yellow-600"><CheckCircle className="w-8 h-8"/></div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-semibold text-gray-400 uppercase">Improvement Goal</p>
                                <h3 className="text-3xl font-black text-gray-800 mt-1">{chartData.polar.data[2]}</h3>
                            </div>
                            <div className="p-3 bg-green-50 rounded-xl text-emerald-600"><TrendingUp className="w-8 h-8"/></div>
                        </div>
                    </div>
                </div>

                {/* BARIS 2: CHARTS UTAMA */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Area Chart */}
                    <div className="lg:col-span-8 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                            <span className="w-2 h-6 bg-orange-500 rounded-full mr-3"></span> Trend Durasi Harian
                        </h3>
                        <Chart options={areaOptions} series={[{ name: 'Durasi (Jam)', data: chartData.area.data }]} type="area" height={280} />
                    </div>

                    {/* Polar Chart */}
                    <div className="lg:col-span-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                            <span className="w-2 h-6 bg-red-600 rounded-full mr-3"></span> Distribusi Kategori
                        </h3>
                        <Chart options={polarOptions} series={chartData.polar.data} type="polarArea" height={280} />
                    </div>
                </div>

                {/* BARIS 3: NOTES & BAR CHART */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Bar Chart Selisih */}
                    <div className="lg:col-span-8 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                            <span className="w-2 h-6 bg-red-500 rounded-full mr-3"></span> {isAtasan ? 'Perbandingan Jam Karyawan' : 'Total Jam Kategori'}
                        </h3>
                        <Chart options={barOptions} series={[{ name: 'Durasi', data: chartData.bar.data }]} type="bar" height={250} />
                    </div>

                    {/* Widget Notes Hari Ini */}
                    <div className="lg:col-span-4 bg-gradient-to-br from-red-600 to-orange-500 p-1 rounded-2xl shadow-lg">
                        <div className="bg-white rounded-xl h-full flex flex-col overflow-hidden">
                            <div className="bg-red-50 p-4 border-b border-red-100">
                                <h3 className="font-bold text-red-700 flex items-center">📝 Pengingat Hari Ini</h3>
                            </div>
                            <div className="p-4 flex-1 overflow-y-auto max-h-64 custom-scrollbar">
                                {notesHariIni.length > 0 ? (
                                    <div className="space-y-3">
                                        {notesHariIni.map((note) => (
                                            <div key={note.id} className="p-3 bg-white border border-gray-100 rounded-lg shadow-sm hover:border-orange-300 transition">
                                                <span className="text-xs font-bold text-orange-500 block mb-1">{note.user?.name}</span>
                                                <p className="text-sm text-gray-700">{note.catatan}</p>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="h-full flex flex-col items-center justify-center text-gray-400 py-8">
                                        <p className="text-sm">Tidak ada jadwal hari ini.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Scrollbar Custom */}
            <style>{`
                .custom-scrollbar::-webkit-scrollbar { width: 6px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #f97316; }
            `}</style>
        </AuthenticatedLayout>
    );
}