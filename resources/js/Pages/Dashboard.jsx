import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import Chart from 'react-apexcharts'; 
import { Target, CheckCircle, TrendingUp, Users, CalendarClock, ListTodo, AlertCircle } from 'lucide-react';
import { useAppSettings } from '@/Context/AppSettings'; 

// Komponen menerima Data dari laravel (Controller)
export default function Dashboard({ auth, userRole, userDivisi, totalUsers, notesHariIni, logTerbaru, chartData }) {
    const isAtasan = userRole === 'atasan';
    const fontFamily = 'inherit';
    const { t, theme } = useAppSettings(); // Ambil settings Translation dan Theme

    // Chart configurations...
    const areaOptions = {
        chart: { type: 'area', toolbar: { show: false }, fontFamily },
        colors: [theme === 'bluewhite' ? '#3b82f6' : '#ea580c'],
        dataLabels: { enabled: false },
        stroke: { curve: 'straight', width: 2 },
        xaxis: { categories: chartData.area.labels, labels: { style: { colors: '#94a3b8' } }, tooltip: { enabled: false } },
        yaxis: { labels: { formatter: (val) => val + " Jam", style: { colors: '#94a3b8' } } },
        fill: { type: 'gradient', gradient: { shadeIntensity: 1, opacityFrom: 0.35, opacityTo: 0.0, stops: [0, 100] } },
        grid: { borderColor: '#f1f5f9', strokeDashArray: 4 }
    };

    const polarOptions = {
        chart: { type: 'polarArea', fontFamily },
        labels: chartData.polar.labels,
        colors: theme === 'bluewhite' ? ['#3b82f6', '#06b6d4', '#6366f1'] : ['#ef4444', '#f97316', '#fbbf24'],
        stroke: { colors: ['#ffffff'], width: 2 },
        fill: { opacity: 0.85 },
        yaxis: { show: false },
        legend: { position: 'bottom', fontSize: '13px', markers: { radius: 12 } },
        plotOptions: { polarArea: { rings: { strokeWidth: 1, strokeColor: '#f1f5f9' }, spines: { strokeWidth: 1, strokeColor: '#f1f5f9' } } }
    };

    const comparisonOptions = {
        chart: { type: 'area', toolbar: { show: true, tools: { download: false, selection: false, zoom: false, pan: false } }, fontFamily },
        colors: ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#06b6d4', '#f97316'], 
        dataLabels: { enabled: false },
        stroke: { curve: 'straight', width: 2 }, 
        markers: { size: 4, hover: { size: 7 } }, 
        xaxis: { categories: chartData.comparison.labels, labels: { style: { colors: '#94a3b8' } }, tooltip: { enabled: false } },
        yaxis: { labels: { formatter: (val) => val + " Jam", style: { colors: '#94a3b8' } } },
        fill: { type: 'solid', opacity: 0.25 },
        grid: { borderColor: '#f1f5f9', strokeDashArray: 4 },
        tooltip: { shared: true, intersect: false },
        legend: { position: 'top', horizontalAlign: 'right', fontSize: '13px' }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className={`font-extrabold text-2xl text-transparent bg-clip-text bg-gradient-to-r tracking-tight ${theme === 'bluewhite' ? 'from-blue-600 to-cyan-500' : 'from-red-600 to-orange-500'}`}>
                        {t('dash_title')}
                    </h2>
                    <span className={`px-3 py-1 font-bold text-xs uppercase rounded-full border ${theme === 'bluewhite' ? 'bg-blue-100 text-blue-700 border-blue-200' : 'bg-red-100 text-red-700 border-red-200'}`}>
                        {t('dash_div')} {userDivisi || t('dash_all')}
                    </span>
                </div>
            }
        >
            <Head title="Dashboard" />
            <div className={`absolute top-0 left-0 w-full h-72 bg-gradient-to-b -z-10 pointer-events-none ${theme === 'bluewhite' ? 'from-blue-50/80' : 'from-red-50/80'}`}></div>

            <div className="pt-8 pb-12 max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                    {isAtasan && (
                        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 transition hover:shadow-md hover:-translate-y-1">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">{t('dash_team')} {userDivisi}</p>
                                    <h3 className="text-3xl font-black text-gray-800 mt-1">{totalUsers}</h3>
                                </div>
                                <div className={`p-2.5 rounded-lg ${theme === 'bluewhite' ? 'bg-blue-50 text-blue-500' : 'bg-red-50 text-red-500'}`}><Users className="w-6 h-6"/></div>
                            </div>
                        </div>
                    )}
                    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 transition hover:shadow-md hover:-translate-y-1">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">BSC / OKR</p>
                                <h3 className="text-3xl font-black text-gray-800 mt-1">{chartData.polar.data[0]}</h3>
                            </div>
                            <div className={`p-2.5 rounded-lg ${theme === 'bluewhite' ? 'bg-cyan-50 text-cyan-500' : 'bg-orange-50 text-orange-500'}`}><Target className="w-6 h-6"/></div>
                        </div>
                    </div>
                    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 transition hover:shadow-md hover:-translate-y-1">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">{t('dash_daily')}</p>
                                <h3 className="text-3xl font-black text-gray-800 mt-1">{chartData.polar.data[1]}</h3>
                            </div>
                            <div className={`p-2.5 rounded-lg ${theme === 'bluewhite' ? 'bg-indigo-50 text-indigo-500' : 'bg-yellow-50 text-yellow-500'}`}><CheckCircle className="w-6 h-6"/></div>
                        </div>
                    </div>
                    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 transition hover:shadow-md hover:-translate-y-1">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">{t('dash_improve')}</p>
                                <h3 className="text-3xl font-black text-gray-800 mt-1">{chartData.polar.data[2]}</h3>
                            </div>
                            <div className={`p-2.5 rounded-lg ${theme === 'bluewhite' ? 'bg-sky-50 text-sky-500' : 'bg-emerald-50 text-emerald-500'}`}><TrendingUp className="w-6 h-6"/></div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <div className="mb-2">
                            <h3 className="text-base font-bold text-gray-800">{t('dash_trend_title')}</h3>
                            <p className="text-xs text-gray-400">{t('dash_trend_desc')}</p>
                        </div>
                        {chartData.area.labels.length > 0 ? (
                            <Chart options={areaOptions} series={[{ name: 'Total Jam Efektif', data: chartData.area.data }]} type="area" height={280} />
                        ) : <div className="h-[280px] flex items-center justify-center text-gray-400 text-sm">{t('dash_no_data')}</div>}
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center">
                        <h3 className="text-base font-bold text-gray-800 w-full text-left mb-2">{t('dash_dist')}</h3>
                        <Chart options={polarOptions} series={chartData.polar.data} type="polarArea" height={280} />
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <div className="mb-2">
                            <h3 className="text-base font-bold text-gray-800">{isAtasan ? t('dash_comp_team') : t('dash_comp_cat')}</h3>
                            <p className="text-xs text-gray-400">{t('dash_comp_desc')}</p>
                        </div>
                        {chartData.comparison.labels.length > 0 ? (
                            <Chart options={comparisonOptions} series={chartData.comparison.series} type="area" height={300} />
                        ) : <div className="h-[300px] flex items-center justify-center text-gray-400 text-sm">{t('dash_no_compare')}</div>}
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col h-[400px]">
                        <h3 className="text-base font-bold text-gray-800 flex items-center mb-4">
                            <CalendarClock className={`w-5 h-5 mr-2 ${theme === 'bluewhite' ? 'text-blue-500' : 'text-orange-500'}`}/> {t('dash_sched')}
                        </h3>
                        <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-3">
                            {notesHariIni.length > 0 ? ( //Menampilkan daftar catatan
                                notesHariIni.map((note) => (
                                    <div key={note.id} className={`p-3 border rounded-lg transition ${theme === 'bluewhite' ? 'bg-blue-50/50 border-blue-100 hover:border-blue-200' : 'bg-orange-50/50 border-orange-100 hover:border-orange-200'}`}>
                                        <span className={`text-xs font-bold block mb-0.5 ${theme === 'bluewhite' ? 'text-blue-600' : 'text-orange-600'}`}>{note.user?.name}</span>
                                        <p className="text-sm text-gray-700 leading-snug">{note.catatan}</p>
                                    </div>
                                ))
                            ) : (
                                <div className="h-full flex items-center justify-center text-gray-400 text-sm">{t('dash_empty')}</div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="bg-gray-50/80 px-5 py-3 border-b border-gray-100 flex items-center justify-between">
                        <div className="flex items-center">
                            <ListTodo className={`w-5 h-5 mr-2 ${theme === 'bluewhite' ? 'text-blue-500' : 'text-indigo-500'}`} />
                            <h3 className="text-sm font-bold text-gray-700">{t('dash_log')}</h3>
                        </div>
                    </div>
                    
                    <div className="p-0">
                        {logTerbaru.length > 0 ? ( // Menampilkan histori Aktivitas Terbaru
                            <div className="max-h-64 overflow-y-auto custom-scrollbar divide-y divide-gray-100">
                                {logTerbaru.map((log) => {
                                    const isHalangan = log.kategori === 'Sakit' || log.kategori === 'Izin';
                                    return (
                                        <div key={log.id} className={`px-5 py-3 hover:bg-gray-50 transition flex items-start ${isHalangan ? 'bg-red-50/30' : ''}`}>
                                            <div className="min-w-[80px] pt-0.5">
                                                <span className="text-xs font-mono text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded border border-gray-200">
                                                    {log.waktu_mulai.slice(0,5)}
                                                </span>
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-center mb-1">
                                                    <span className="font-bold text-sm text-gray-800 mr-2">{log.user?.name}</span>
                                                    {isHalangan ? (
                                                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-red-100 text-red-700 uppercase flex items-center border border-red-200">
                                                            <AlertCircle className="w-3 h-3 mr-1"/> {log.kategori}
                                                        </span>
                                                    ) : (
                                                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase border ${theme === 'bluewhite' ? 'bg-cyan-100 text-cyan-700 border-cyan-200' : 'bg-blue-100 text-blue-700 border-blue-200'}`}>
                                                            {log.kategori}
                                                        </span>
                                                    )}
                                                    <span className="text-[10px] text-gray-400 ml-2">({log.tanggal})</span>
                                                </div>
                                                <p className="text-sm text-gray-600">{log.task}</p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <div className="p-8 text-center text-gray-400 text-sm">
                                {t('dash_no_log')}
                            </div>
                        )}
                    </div>
                </div>

            </div>

            <style>{`
                .custom-scrollbar::-webkit-scrollbar { width: 5px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: ${theme === 'bluewhite' ? '#3b82f6' : '#f97316'}; }
                .apexcharts-tooltip { box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1) !important; border: 1px solid #f1f5f9 !important; border-radius: 8px !important; }
            `}</style>
        </AuthenticatedLayout>
    );
}