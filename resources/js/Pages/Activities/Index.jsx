import React, { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { Edit3, HeartPulse, Save, Send, ListTodo, AlertCircle, Clock, XCircle, Trash2 } from 'lucide-react';
import { useAppSettings } from '@/Context/AppSettings'; 

export default function Index({ auth, activities, userRole }) {
    const [mode, setMode] = useState('aktivitas'); 
    const { t, theme } = useAppSettings();

    const getLocalDate = () => {
        const d = new Date();
        return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
    };
    const getLocalTime = () => {
        const d = new Date();
        return String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0');
    };

    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState(null);

    const { data, setData, post, put, delete: destroy, processing, reset } = useForm({
        tanggal: getLocalDate(), 
        task: '', 
        waktu_mulai: getLocalTime(), 
        waktu_akhir: '', 
        keluaran: '', 
        kategori: 'Daily Task'
    });

    const handleModeSwitch = (newMode) => {
        setMode(newMode);
        reset();
        setIsEditing(false); 
        setEditId(null);
        if (newMode === 'halangan') {
            setData({ tanggal: getLocalDate(), task: '', waktu_mulai: '00:00', waktu_akhir: '00:00', keluaran: 'Laporan Ketidakhadiran', kategori: 'Izin' });
        } else {
            setData({ tanggal: getLocalDate(), task: '', waktu_mulai: getLocalTime(), waktu_akhir: '', keluaran: '', kategori: 'Daily Task' });
        }
    };

    // --- FUNGSI CEK BATAS WAKTU 6 JAM (DIPERKETAT) ---
    const isEditable = (createdAt) => {
        if (!createdAt) return false; // Wajib false jika gagal mengambil data waktu dari server
        
        // Ubah format "YYYY-MM-DD HH:mm:ss" menjadi format standar ISO agar terbaca di semua browser (Safari/Mobile)
        const safeDateString = createdAt.replace(' ', 'T'); 
        const activityTime = new Date(safeDateString).getTime();
        const currentTime = new Date().getTime();
        
        // Hitung selisih jam
        const diffInHours = (currentTime - activityTime) / (1000 * 60 * 60);
        
        // HANYA bernilai TRUE jika selisih waktu di bawah atau sama dengan 6 jam
        return diffInHours >= 0 && diffInHours <= 6; 
    };

    const handleEdit = (activity) => {
        setIsEditing(true);
        setEditId(activity.id);
        
        if (activity.kategori === 'Izin' || activity.kategori === 'Sakit') {
            setMode('halangan');
        } else {
            setMode('aktivitas');
        }

        setData({
            tanggal: activity.tanggal,
            task: activity.task,
            waktu_mulai: activity.waktu_mulai ? activity.waktu_mulai.slice(0,5) : '00:00',
            waktu_akhir: activity.waktu_akhir ? activity.waktu_akhir.slice(0,5) : '00:00',
            keluaran: activity.keluaran || 'Laporan Ketidakhadiran',
            kategori: activity.kategori || 'Daily Task'
        });
        
        window.scrollTo({ top: 0, behavior: 'smooth' }); 
    };

    const cancelEdit = () => {
        setIsEditing(false);
        setEditId(null);
        reset();
        setData(prev => ({ ...prev, tanggal: getLocalDate(), waktu_mulai: getLocalTime(), waktu_akhir: '' }));
    };

    const handleDelete = (id) => {
        if (confirm('Apakah Anda yakin ingin menghapus data ini?')) {
            destroy(route('activities.destroy', id), {
                preserveScroll: true,
            });
        }
    };

    const submit = (e) => {
        e.preventDefault();
        
        if (isEditing) {
            put(route('activities.update', editId), {
                onSuccess: () => {
                    cancelEdit();
                }
            });
        } else {
            post(route('activities.store'), {
                onSuccess: () => { 
                    reset(); 
                    setData(prev => ({ ...prev, tanggal: getLocalDate(), waktu_mulai: getLocalTime(), waktu_akhir: '' }));
                    if (mode === 'halangan') handleModeSwitch('halangan'); 
                },
            });
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className={`font-extrabold text-2xl text-transparent bg-clip-text bg-gradient-to-r tracking-tight ${theme === 'bluewhite' ? 'from-blue-600 to-cyan-500' : 'from-red-600 to-orange-500'}`}>
                    {t('act_title')}
                </h2>
            }
        >
            <Head title="Activities" />
            <div className={`absolute top-0 left-0 w-full h-72 bg-gradient-to-b -z-10 pointer-events-none ${theme === 'bluewhite' ? 'from-blue-50/80' : 'from-red-50/80'}`}></div>

            <div className="pt-8 pb-12 max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition hover:shadow-md">
                    <div className="flex bg-gray-50/80 border-b border-gray-100">
                        <button onClick={() => handleModeSwitch('aktivitas')} 
                            className={`flex-1 py-4 text-sm font-bold flex items-center justify-center transition-all ${mode === 'aktivitas' ? `bg-white shadow-sm border-t-2 ${theme === 'bluewhite' ? 'text-blue-600 border-t-blue-500' : 'text-orange-600 border-t-orange-500'}` : 'text-gray-500 hover:bg-gray-100'}`}>
                            <Edit3 className="w-4 h-4 mr-2"/> {t('act_tab_work')}
                        </button>
                        <button onClick={() => handleModeSwitch('halangan')} 
                            className={`flex-1 py-4 text-sm font-bold flex items-center justify-center transition-all ${mode === 'halangan' ? 'bg-white text-red-600 border-t-2 border-t-red-600 shadow-sm' : 'text-gray-500 hover:bg-gray-100'}`}>
                            <HeartPulse className="w-4 h-4 mr-2"/> {t('act_tab_absent')}
                        </button>
                    </div>

                    <div className="p-6 sm:p-8">
                        <form onSubmit={submit} className="space-y-5">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">{t('act_date')}</label>
                                    <input type="date" className={`w-full rounded-xl border-gray-200 bg-gray-50 focus:bg-white transition-all text-sm ${theme === 'bluewhite' ? 'focus:border-blue-500 focus:ring-blue-200' : 'focus:border-orange-500 focus:ring-orange-200'}`}
                                        value={data.tanggal} onChange={e => setData('tanggal', e.target.value)} required />
                                </div>

                                {mode === 'aktivitas' ? (
                                    <>
                                        <div className="lg:col-span-2">
                                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">{t('act_task')}</label>
                                            <input type="text" placeholder="..." className={`w-full rounded-xl border-gray-200 bg-gray-50 focus:bg-white transition-all text-sm ${theme === 'bluewhite' ? 'focus:border-blue-500 focus:ring-blue-200' : 'focus:border-orange-500 focus:ring-orange-200'}`}
                                                value={data.task} onChange={e => setData('task', e.target.value)} required />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">{t('act_start')}</label>
                                            <input type="time" className={`w-full rounded-xl border-gray-200 bg-gray-50 focus:bg-white transition-all text-sm ${theme === 'bluewhite' ? 'focus:border-blue-500 focus:ring-blue-200' : 'focus:border-orange-500 focus:ring-orange-200'}`}
                                                value={data.waktu_mulai} onChange={e => setData('waktu_mulai', e.target.value)} required />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">{t('act_end')}</label>
                                            <input type="time" className={`w-full rounded-xl border-gray-200 bg-gray-50 focus:bg-white transition-all text-sm ${theme === 'bluewhite' ? 'focus:border-blue-500 focus:ring-blue-200' : 'focus:border-orange-500 focus:ring-orange-200'}`}
                                                value={data.waktu_akhir} onChange={e => setData('waktu_akhir', e.target.value)} required />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">{t('act_cat')}</label>
                                            <select className={`w-full rounded-xl border-gray-200 bg-gray-50 focus:bg-white transition-all text-sm ${theme === 'bluewhite' ? 'focus:border-blue-500 focus:ring-blue-200' : 'focus:border-orange-500 focus:ring-orange-200'}`}
                                                value={data.kategori} onChange={e => setData('kategori', e.target.value)}>
                                                <option value="Daily Task">Daily Task</option>
                                                <option value="BSC / OKR">BSC / OKR</option>
                                                <option value="Improvement Goal">Improvement Goal</option>
                                            </select>
                                        </div>
                                        <div className="lg:col-span-3">
                                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">{t('act_out')}</label>
                                            <input type="text" className={`w-full rounded-xl border-gray-200 bg-gray-50 focus:bg-white transition-all text-sm ${theme === 'bluewhite' ? 'focus:border-blue-500 focus:ring-blue-200' : 'focus:border-orange-500 focus:ring-orange-200'}`}
                                                value={data.keluaran} onChange={e => setData('keluaran', e.target.value)} required />
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div>
                                            <label className="block text-xs font-bold text-red-500 uppercase tracking-wider mb-1">{t('act_type')}</label>
                                            <select className="w-full rounded-xl border-red-200 bg-red-50 text-red-700 focus:border-red-500 focus:ring-red-200 transition-all text-sm font-semibold"
                                                value={data.kategori} onChange={e => setData('kategori', e.target.value)}>
                                                <option value="Izin">Izin</option>
                                                <option value="Sakit">Sakit</option>
                                            </select>
                                        </div>
                                        <div className="lg:col-span-3">
                                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">{t('act_reason')}</label>
                                            <textarea rows="3" className="w-full rounded-xl border-gray-200 bg-gray-50 focus:bg-white focus:border-red-500 focus:ring-red-200 transition-all text-sm"
                                                value={data.task} onChange={e => setData('task', e.target.value)} required />
                                        </div>
                                    </>
                                )}
                            </div>
                            
                            <div className="flex justify-end pt-4 border-t border-gray-100 gap-3">
                                {isEditing && (
                                    <button type="button" onClick={cancelEdit} className="flex items-center px-6 py-2.5 text-gray-600 bg-gray-100 hover:bg-gray-200 text-sm font-bold rounded-xl transition-all duration-300">
                                        <XCircle className="w-4 h-4 mr-2" /> Batal
                                    </button>
                                )}

                                <button type="submit" disabled={processing} 
                                    className={`flex items-center px-6 py-2.5 text-white text-sm font-bold rounded-xl transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-md active:scale-95
                                    ${isEditing ? 'bg-indigo-600 hover:bg-indigo-700' :
                                      mode === 'aktivitas' 
                                        ? (theme === 'bluewhite' ? 'bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600' : 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600') 
                                        : 'bg-red-600 hover:bg-red-700'}`}>
                                    {processing ? t('act_saving') : (isEditing ? <><Save className="w-4 h-4 mr-2"/> Simpan Perubahan</> : mode === 'aktivitas' ? <><Save className="w-4 h-4 mr-2"/> {t('act_save')}</> : <><Send className="w-4 h-4 mr-2"/> {t('act_send')}</>)}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="bg-gray-50/80 px-6 py-4 border-b border-gray-100 flex items-center">
                        <ListTodo className={`w-5 h-5 mr-2 ${theme === 'bluewhite' ? 'text-blue-500' : 'text-orange-500'}`} />
                        <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider">{t('act_hist')}</h3>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-100">
                            <thead className="bg-white">
                                <tr>
                                    {userRole === 'atasan' && <th className="px-6 py-3 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">{t('act_th_name')}</th>}
                                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">{t('act_th_date')}</th>
                                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">{t('act_th_desc')}</th>
                                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">{t('act_th_cat')}</th>
                                    <th className="px-6 py-3 text-right text-xs font-bold text-gray-400 uppercase tracking-wider">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-50">
                                {activities.map((act) => (
                                    <tr key={act.id} className={`hover:bg-gray-50/50 transition ${editId === act.id ? 'bg-indigo-50/50' : ''}`}>
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
                                                  act.kategori === 'BSC / OKR' ? (theme === 'bluewhite' ? 'bg-cyan-50 text-cyan-700 border-cyan-100' : 'bg-indigo-50 text-indigo-700 border-indigo-100') : 'bg-emerald-50 text-emerald-700 border-emerald-100'}`}>
                                                {act.kategori === 'Sakit' || act.kategori === 'Izin' ? <AlertCircle className="w-3 h-3 mr-1.5"/> : null}
                                                {act.kategori}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            {(userRole === 'atasan' || act.user_id === auth.user.id) && (
                                                <div className="flex items-center justify-end space-x-3">
                                                    
                                                    {/* TOMBOL EDIT HANYA MUNCUL JIKA < 6 JAM (HILANG JIKA LEBIH DARI ITU) */}
                                                    {isEditable(act.created_at) && (
                                                        <button onClick={() => handleEdit(act)} className="text-indigo-600 hover:text-indigo-900 font-bold transition-colors flex items-center" title="Edit">
                                                            <Edit3 className="w-4 h-4 mr-1" /> Edit
                                                        </button>
                                                    )}
                                                    
                                                    <button onClick={() => handleDelete(act.id)} className="text-red-600 hover:text-red-900 font-bold transition-colors flex items-center" title="Hapus">
                                                        <Trash2 className="w-4 h-4 mr-1" /> Hapus
                                                    </button>
                                                </div>
                                            )}
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