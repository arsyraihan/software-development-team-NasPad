import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, router } from '@inertiajs/react';
import { CalendarPlus, Save, Trash2, ChevronLeft, ChevronRight, Info, AlignLeft, Edit3, XCircle } from 'lucide-react';
import { useAppSettings } from '@/Context/AppSettings'; 

export default function Index({ auth, notes }) {
    const { t, theme } = useAppSettings(); 

    const getLocalDate = () => {
        const d = new Date();
        return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
    };

    const [calDate, setCalDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(getLocalDate());

    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState(null);

    const { data, setData, post, put, processing, reset } = useForm({
        tanggal: selectedDate,
        catatan: '',
    });

    const calMonth = calDate.getMonth();
    const calYear = calDate.getFullYear();
    const daysInMonth = new Date(calYear, calMonth + 1, 0).getDate();
    const firstDay = new Date(calYear, calMonth, 1).getDay();
    
    const monthNames = [
        t('month_jan'), t('month_feb'), t('month_mar'), t('month_apr'), 
        t('month_may'), t('month_jun'), t('month_jul'), t('month_aug'), 
        t('month_sep'), t('month_oct'), t('month_nov'), t('month_dec')
    ];

    const nextMonth = () => setCalDate(new Date(calYear, calMonth + 1, 1));
    const prevMonth = () => setCalDate(new Date(calYear, calMonth - 1, 1));

    const handleDayClick = (day) => {
        const dateStr = `${calYear}-${String(calMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        setSelectedDate(dateStr);
        setData('tanggal', dateStr);
        if (isEditing) cancelEdit();
    };

    // --- FUNGSI CEK BATAS WAKTU 6 JAM (DIPERKETAT) ---
    const isEditable = (createdAt) => {
        if (!createdAt) return false; 
        
        const safeDateString = createdAt.replace(' ', 'T');
        const noteTime = new Date(safeDateString).getTime();
        const currentTime = new Date().getTime();
        
        const diffInHours = (currentTime - noteTime) / (1000 * 60 * 60);
        return diffInHours >= 0 && diffInHours <= 6;
    };

    const handleEdit = (note) => {
        setIsEditing(true);
        setEditId(note.id);
        setData({
            tanggal: note.tanggal,
            catatan: note.catatan,
        });
    };

    const cancelEdit = () => {
        setIsEditing(false);
        setEditId(null);
        reset('catatan');
        setData('tanggal', selectedDate);
    };

    const submit = (e) => {
        e.preventDefault();
        
        if (isEditing) {
            put(route('calendar.update', editId), {
                onSuccess: () => {
                    cancelEdit();
                }
            });
        } else {
            post(route('calendar.store'), {
                onSuccess: () => reset('catatan'), 
            });
        }
    };

    const deleteNote = (id) => {
        if (confirm(t('cal_delete_confirm'))) {
            router.delete(route('calendar.destroy', id), { preserveScroll: true, preserveState: true });
        }
    };

    const notesOnSelectedDate = notes.filter(n => n.tanggal === selectedDate);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className={`font-extrabold text-2xl text-transparent bg-clip-text bg-gradient-to-r tracking-tight ${theme === 'bluewhite' ? 'from-blue-600 to-cyan-500' : 'from-red-600 to-orange-500'}`}>
                    {t('cal_title')}
                </h2>
            }
        >
            <Head title="Kalender" />
            <div className={`absolute top-0 left-0 w-full h-72 bg-gradient-to-b -z-10 pointer-events-none ${theme === 'bluewhite' ? 'from-blue-50/80 to-transparent' : 'from-red-50/80 to-transparent'}`}></div>

            <div className="pt-8 pb-12 max-w-[95rem] mx-auto sm:px-6 lg:px-8 space-y-6">
                
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    
                    <div className="lg:col-span-8 xl:col-span-9 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col h-auto min-h-[600px]">
                        
                        <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center bg-white z-10">
                            <div className="flex items-center gap-4">
                                <button onClick={prevMonth} className={`p-2 bg-gray-50 text-gray-500 rounded-lg transition-colors ${theme === 'bluewhite' ? 'hover:bg-blue-50 hover:text-blue-600' : 'hover:bg-orange-50 hover:text-orange-600'}`}><ChevronLeft className="w-5 h-5"/></button>
                                <h3 className="text-xl font-black text-gray-800 uppercase tracking-widest min-w-[200px] text-center">
                                    {monthNames[calMonth]} {calYear}
                                </h3>
                                <button onClick={nextMonth} className={`p-2 bg-gray-50 text-gray-500 rounded-lg transition-colors ${theme === 'bluewhite' ? 'hover:bg-blue-50 hover:text-blue-600' : 'hover:bg-orange-50 hover:text-orange-600'}`}><ChevronRight className="w-5 h-5"/></button>
                            </div>
                            <div className="flex items-center text-xs font-bold text-gray-400 bg-gray-50 px-4 py-2 rounded-lg">
                                <Info className={`w-4 h-4 mr-2 ${theme === 'bluewhite' ? 'text-blue-500' : 'text-orange-500'}`}/> {t('cal_info')}
                            </div>
                        </div>

                        <div className="flex-1 flex flex-col p-4 bg-gray-50/50">
                            
                            <div className="grid grid-cols-7 gap-2 mb-2 text-center text-xs font-black uppercase tracking-wider">
                                <div className={theme === 'bluewhite' ? 'text-blue-500' : 'text-red-500'}>{t('cal_sun')}</div>
                                <div className="text-gray-500">{t('cal_mon')}</div>
                                <div className="text-gray-500">{t('cal_tue')}</div>
                                <div className="text-gray-500">{t('cal_wed')}</div>
                                <div className="text-gray-500">{t('cal_thu')}</div>
                                <div className="text-gray-500">{t('cal_fri')}</div>
                                <div className="text-gray-500">{t('cal_sat')}</div>
                            </div>

                            <div className="flex-1 grid grid-cols-7 gap-2">
                                {Array.from({ length: firstDay }).map((_, i) => <div key={`empty-${i}`} className="bg-transparent rounded-xl aspect-square"></div>)}
                                
                                {Array.from({ length: daysInMonth }).map((_, i) => {
                                    const day = i + 1;
                                    const dateStr = `${calYear}-${String(calMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                                    const isToday = dateStr === getLocalDate();
                                    const isSelected = dateStr === selectedDate;
                                    
                                    const dayNotes = notes.filter(n => n.tanggal === dateStr);

                                    return (
                                        <div 
                                            key={day} 
                                            onClick={() => handleDayClick(day)}
                                            className={`relative flex flex-col rounded-xl border p-2 transition-all cursor-pointer aspect-square overflow-hidden
                                                ${isSelected 
                                                    ? (theme === 'bluewhite' ? 'bg-blue-50/50 border-blue-400 ring-2 ring-blue-100 shadow-sm' : 'bg-orange-50/50 border-orange-400 ring-2 ring-orange-100 shadow-sm') 
                                                    : `bg-white border-gray-100 hover:shadow-sm ${theme === 'bluewhite' ? 'hover:border-blue-300' : 'hover:border-orange-300'}`
                                                }
                                            `}
                                        >
                                            <div className={`text-right text-sm font-black mb-1
                                                ${isToday 
                                                    ? (theme === 'bluewhite' ? 'text-white bg-blue-500 rounded-md inline-block ml-auto px-2 py-0.5 shadow-sm' : 'text-white bg-red-500 rounded-md inline-block ml-auto px-2 py-0.5 shadow-sm') 
                                                    : isSelected 
                                                        ? (theme === 'bluewhite' ? 'text-blue-600' : 'text-orange-600') 
                                                        : 'text-gray-500'
                                                }
                                            `}>
                                                {day}
                                            </div>

                                            <div className="flex-1 overflow-y-auto custom-scrollbar space-y-1.5 pr-1">
                                                {dayNotes.map(n => (
                                                    <div key={n.id} className={`text-[10px] leading-tight px-1.5 py-1 rounded border shadow-sm font-medium line-clamp-2 ${theme === 'bluewhite' ? 'bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-800 border-blue-100' : 'bg-gradient-to-r from-red-50 to-orange-50 text-red-800 border-orange-100'}`} title={`${n.user?.name}: ${n.catatan}`}>
                                                        <span className={`font-extrabold ${theme === 'bluewhite' ? 'text-blue-600' : 'text-orange-600'}`}>{n.user?.name.split(' ')[0]}:</span> {n.catatan}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-4 xl:col-span-3 space-y-6">
                        
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className={`px-5 py-3 flex items-center text-white bg-gradient-to-r ${isEditing ? 'from-indigo-600 to-purple-500' : (theme === 'bluewhite' ? 'from-blue-600 to-cyan-500' : 'from-red-600 to-orange-500')}`}>
                                {isEditing ? <Edit3 className="w-4 h-4 mr-2" /> : <CalendarPlus className="w-4 h-4 mr-2" />}
                                <h3 className="text-sm font-bold uppercase tracking-wider">
                                    {isEditing ? 'Edit Catatan' : t('cal_add_note')}
                                </h3>
                            </div>
                            <div className="p-5">
                                <form onSubmit={submit} className="flex flex-col gap-4">
                                    <div>
                                        <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">{t('cal_selected_date')}</label>
                                        <input type="date" className={`w-full rounded-xl border-gray-200 bg-gray-50 focus:bg-white transition-all text-sm font-semibold ${theme === 'bluewhite' ? 'focus:border-blue-500 focus:ring-blue-200 text-blue-600' : 'focus:border-orange-500 focus:ring-orange-200 text-orange-600'}`}
                                            value={data.tanggal} onChange={e => { setData('tanggal', e.target.value); setSelectedDate(e.target.value); }} required />
                                    </div>
                                    <div>
                                        <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">{t('cal_desc_label')}</label>
                                        <textarea rows="3" placeholder={t('cal_desc_placeholder')} className={`w-full rounded-xl border-gray-200 bg-gray-50 focus:bg-white transition-all text-sm ${theme === 'bluewhite' ? 'focus:border-blue-500 focus:ring-blue-200' : 'focus:border-orange-500 focus:ring-orange-200'}`}
                                            value={data.catatan} onChange={e => setData('catatan', e.target.value)} required />
                                    </div>
                                    
                                    <div className="flex gap-2 mt-1">
                                        {isEditing && (
                                            <button type="button" onClick={cancelEdit} className="w-1/3 flex justify-center items-center px-3 py-2.5 text-gray-600 text-xs font-bold rounded-xl bg-gray-100 hover:bg-gray-200 transition-all">
                                                <XCircle className="w-4 h-4 mr-1"/> Batal
                                            </button>
                                        )}
                                        <button type="submit" disabled={processing} 
                                            className={`${isEditing ? 'w-2/3 bg-indigo-600 hover:bg-indigo-700' : 'w-full bg-gray-800 hover:bg-gray-900'} flex justify-center items-center px-4 py-2.5 text-white text-sm font-bold rounded-xl transition-all transform hover:-translate-y-0.5 hover:shadow-md active:scale-95`}>
                                            <Save className="w-4 h-4 mr-2"/> {processing ? t('cal_saving') : (isEditing ? 'Simpan' : t('cal_save_btn'))}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col max-h-[380px]">
                            <div className="bg-gray-50/80 px-5 py-3 border-b border-gray-100">
                                <h3 className="text-xs font-bold text-gray-600 uppercase tracking-wider flex items-center">
                                    <AlignLeft className={`w-4 h-4 mr-2 ${theme === 'bluewhite' ? 'text-blue-500' : 'text-orange-500'}`}/> 
                                    {t('cal_schedule')} {selectedDate.split('-')[2]} {monthNames[parseInt(selectedDate.split('-')[1]) - 1]}
                                </h3>
                            </div>
                            <div className="p-0 flex-1 overflow-y-auto custom-scrollbar">
                                {notesOnSelectedDate.length > 0 ? (
                                    <div className="divide-y divide-gray-50">
                                        {notesOnSelectedDate.map((note) => (
                                            <div key={note.id} className={`p-4 transition group flex justify-between items-start gap-2 ${editId === note.id ? 'bg-indigo-50/40' : (theme === 'bluewhite' ? 'hover:bg-blue-50/30' : 'hover:bg-orange-50/30')}`}>
                                                <div>
                                                    <span className={`text-xs font-bold block mb-0.5 ${theme === 'bluewhite' ? 'text-blue-500' : 'text-red-500'}`}>{note.user?.name}</span>
                                                    <p className="text-sm text-gray-700 leading-snug">{note.catatan}</p>
                                                </div>
                                                
                                                {auth.user.role === 'atasan' || auth.user.id === note.user_id ? (
                                                    <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        
                                                        {/* TOMBOL EDIT HANYA MUNCUL JIKA < 6 JAM */}
                                                        {isEditable(note.created_at) && (
                                                            <button onClick={() => handleEdit(note)} 
                                                                className={`p-1.5 rounded-md text-gray-400 ${theme === 'bluewhite' ? 'hover:text-blue-600 hover:bg-blue-50' : 'hover:text-orange-500 hover:bg-orange-50'}`} title="Edit Catatan">
                                                                <Edit3 className="w-4 h-4" />
                                                            </button>
                                                        )}

                                                        <button onClick={() => deleteNote(note.id)} 
                                                            className="p-1.5 rounded-md text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors" title="Hapus Catatan">
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                ) : null}
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="h-full flex flex-col items-center justify-center py-12 text-gray-400">
                                        <CalendarPlus className="w-10 h-10 mb-2 opacity-20" />
                                        <p className="text-xs font-medium text-center px-4">{t('cal_empty')}</p>
                                    </div>
                                )}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            
            <style>{`
                .custom-scrollbar::-webkit-scrollbar { width: 4px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: ${theme === 'bluewhite' ? '#3b82f6' : '#f97316'}; }
            `}</style>
        </AuthenticatedLayout>
    );
}