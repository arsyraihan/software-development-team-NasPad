import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, router } from '@inertiajs/react';
import { UserPlus, Users as UsersIcon, Shield, Briefcase, Mail, Key, Trash2, KeyRound, Edit3, XCircle } from 'lucide-react'; // <-- TAMBAHAN Edit3 & XCircle
import { useAppSettings } from '@/Context/AppSettings';

export default function Index({ auth, users }) {
    const { t, theme } = useAppSettings();

    // --- TAMBAHAN STATE UNTUK EDIT ---
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState(null);

    // --- TAMBAHAN put DARI useForm ---
    const { data, setData, post, put, processing, errors, reset } = useForm({
        name: '', email: '', password: '', password_confirmation: '', role: 'karyawan', divisi: 'IT'
    });

    // --- FUNGSI TOMBOL EDIT ---
    const handleEdit = (user) => {
        setIsEditing(true);
        setEditId(user.id);
        setData({
            name: user.name,
            email: user.email,
            password: '', // Kosongkan password agar tidak tertimpa jika tidak ingin diubah
            password_confirmation: '',
            role: user.role,
            divisi: user.divisi || 'IT',
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // --- FUNGSI BATAL EDIT ---
    const cancelEdit = () => {
        setIsEditing(false);
        setEditId(null);
        reset(); // Kembalikan form ke kondisi kosong (tambah user baru)
    };

    // --- MODIFIKASI FUNGSI SUBMIT (POST & PUT) ---
    const submit = (e) => {
        e.preventDefault();
        
        if (isEditing) {
            put(route('users.update', editId), {
                onSuccess: () => cancelEdit(),
            });
        } else {
            post(route('users.store'), {
                onSuccess: () => reset(),
            });
        }
    };

    const deleteUser = (id) => {
        if (confirm(t('user_delete_confirm') || 'Yakin ingin menghapus user ini?')) {
            router.delete(route('users.destroy', id), { preserveScroll: true });
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className={`font-extrabold text-2xl text-transparent bg-clip-text bg-gradient-to-r tracking-tight ${theme === 'bluewhite' ? 'from-blue-600 to-cyan-500' : 'from-red-600 to-orange-500'}`}>
                    {t('user_title') || 'User Management'}
                </h2>
            }
        >
            <Head title="User Management" />
            <div className={`absolute top-0 left-0 w-full h-72 bg-gradient-to-b -z-10 pointer-events-none ${theme === 'bluewhite' ? 'from-blue-50/80 to-transparent' : 'from-red-50/80 to-transparent'}`}></div>

            <div className="pt-8 pb-12 max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                
                {/* Form Tambah/Edit User */}
                <div className={`bg-white rounded-xl shadow-sm border overflow-hidden transition hover:shadow-md ${isEditing ? 'border-indigo-200' : 'border-gray-100'}`}>
                    <div className={`px-6 py-4 border-b flex items-center ${isEditing ? 'bg-indigo-50/50 border-indigo-100' : 'bg-gray-50/80 border-gray-100'}`}>
                        {isEditing ? (
                            <Edit3 className="w-5 h-5 mr-2 text-indigo-500" />
                        ) : (
                            <UserPlus className={`w-5 h-5 mr-2 ${theme === 'bluewhite' ? 'text-blue-500' : 'text-orange-500'}`} />
                        )}
                        <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider">
                            {isEditing ? 'Edit Pengguna' : (t('user_add_new') || 'Tambah Pengguna Baru')}
                        </h3>
                    </div>
                    <div className="p-6 sm:p-8">
                        <form onSubmit={submit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1"><Briefcase className="inline w-3 h-3 mr-1"/> {t('user_fullname') || 'Nama Lengkap'}</label>
                                    <input type="text" className={`w-full rounded-xl border-gray-200 bg-gray-50 focus:bg-white transition-all text-sm ${theme === 'bluewhite' ? 'focus:border-blue-500 focus:ring-blue-200' : 'focus:border-orange-500 focus:ring-orange-200'}`}
                                        value={data.name} onChange={e => setData('name', e.target.value)} required />
                                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1"><Mail className="inline w-3 h-3 mr-1"/> {t('user_email') || 'Email'}</label>
                                    <input type="email" className={`w-full rounded-xl border-gray-200 bg-gray-50 focus:bg-white transition-all text-sm ${theme === 'bluewhite' ? 'focus:border-blue-500 focus:ring-blue-200' : 'focus:border-orange-500 focus:ring-orange-200'}`}
                                        value={data.email} onChange={e => setData('email', e.target.value)} required />
                                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">{t('user_div') || 'Divisi / Departemen'}</label>
                                    <input type="text" placeholder="IT, HRD, Finance..." className={`w-full rounded-xl border-gray-200 bg-gray-50 focus:bg-white transition-all text-sm ${theme === 'bluewhite' ? 'focus:border-blue-500 focus:ring-blue-200' : 'focus:border-orange-500 focus:ring-orange-200'}`}
                                        value={data.divisi} onChange={e => setData('divisi', e.target.value)} required />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1"><Key className="inline w-3 h-3 mr-1"/> {t('user_password') || 'Password'}</label>
                                    <input type="password" placeholder={isEditing ? "Kosongkan jika tidak diubah" : "Min 8 chars"} className={`w-full rounded-xl border-gray-200 bg-gray-50 focus:bg-white transition-all text-sm ${theme === 'bluewhite' ? 'focus:border-blue-500 focus:ring-blue-200' : 'focus:border-orange-500 focus:ring-orange-200'}`}
                                        value={data.password} onChange={e => setData('password', e.target.value)} required={!isEditing} />
                                    {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1"><KeyRound className="inline w-3 h-3 mr-1"/> {t('user_confirm_pass') || 'Konfirmasi Password'}</label>
                                    <input type="password" placeholder={isEditing ? "Kosongkan jika tidak diubah" : "..."} className={`w-full rounded-xl border-gray-200 bg-gray-50 focus:bg-white transition-all text-sm ${theme === 'bluewhite' ? 'focus:border-blue-500 focus:ring-blue-200' : 'focus:border-orange-500 focus:ring-orange-200'}`}
                                        value={data.password_confirmation} onChange={e => setData('password_confirmation', e.target.value)} required={!isEditing && data.password !== ''} />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1"><Shield className="inline w-3 h-3 mr-1"/> {t('user_role') || 'Peran (Role)'}</label>
                                    <select className={`w-full rounded-xl border-gray-200 bg-gray-50 focus:bg-white transition-all text-sm ${theme === 'bluewhite' ? 'focus:border-blue-500 focus:ring-blue-200' : 'focus:border-orange-500 focus:ring-orange-200'}`}
                                        value={data.role} onChange={e => setData('role', e.target.value)}>
                                        <option value="karyawan">Karyawan</option>
                                        <option value="atasan">Atasan / Supervisor</option>
                                    </select>
                                </div>
                            </div>
                            
                            <div className="flex justify-end pt-4 border-t border-gray-100 gap-3">
                                {/* TAMBAHAN TOMBOL BATAL JIKA MODE EDIT */}
                                {isEditing && (
                                    <button type="button" onClick={cancelEdit} className="flex items-center px-6 py-2.5 text-gray-600 bg-gray-100 hover:bg-gray-200 text-sm font-bold rounded-xl transition-all duration-300">
                                        <XCircle className="w-4 h-4 mr-2" /> Batal
                                    </button>
                                )}

                                <button type="submit" disabled={processing} 
                                    className={`flex justify-center items-center px-8 py-2.5 text-white text-sm font-bold rounded-xl transition-all transform hover:-translate-y-0.5 hover:shadow-md active:scale-95 
                                    ${isEditing ? 'bg-indigo-600 hover:bg-indigo-700' : (theme === 'bluewhite' ? 'bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600' : 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600')}`}>
                                    {isEditing ? <Edit3 className="w-4 h-4 mr-2"/> : <UserPlus className="w-4 h-4 mr-2"/>} 
                                    {processing ? (t('user_processing') || 'Memproses...') : (isEditing ? 'Simpan Perubahan' : (t('user_btn_submit') || 'Daftarkan User'))}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Tabel Data Users */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="bg-gray-50/80 px-6 py-4 border-b border-gray-100 flex items-center">
                        <UsersIcon className={`w-5 h-5 mr-2 ${theme === 'bluewhite' ? 'text-blue-500' : 'text-red-500'}`} />
                        <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider">{t('user_list') || 'Daftar Pengguna Sistem'}</h3>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-100">
                            <thead className="bg-white">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">{t('user_th_name') || 'Nama & Email'}</th>
                                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">{t('user_role') || 'Role'}</th>
                                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">{t('user_div') || 'Divisi'}</th>
                                    <th className="px-6 py-3 text-right text-xs font-bold text-gray-400 uppercase tracking-wider">{t('user_th_action') || 'Aksi'}</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-50">
                                {users.map((u) => (
                                    <tr key={u.id} className={`hover:bg-gray-50/50 transition group ${editId === u.id ? 'bg-indigo-50/40' : ''}`}>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-bold text-gray-800">{u.name}</div>
                                            <div className="text-xs text-gray-500 flex items-center mt-0.5"><Mail className="w-3 h-3 mr-1"/>{u.email}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2.5 py-1 inline-flex text-xs font-bold rounded-md border 
                                                ${u.role === 'atasan' 
                                                    ? (theme === 'bluewhite' ? 'bg-blue-50 text-blue-700 border-blue-100' : 'bg-red-50 text-red-700 border-red-100') 
                                                    : 'bg-gray-50 text-gray-600 border-gray-200'}`}>
                                                {u.role === 'atasan' ? <Shield className="w-3 h-3 mr-1"/> : <UserPlus className="w-3 h-3 mr-1"/>}
                                                {u.role}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2.5 py-1 rounded-md text-xs font-bold border ${theme === 'bluewhite' ? 'bg-cyan-50 text-cyan-700 border-cyan-100' : 'bg-orange-50 text-orange-700 border-orange-100'}`}>
                                                {u.divisi || '-'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            {/* TOMBOL EDIT & HAPUS */}
                                            <div className="flex items-center justify-end space-x-2">
                                                <button onClick={() => handleEdit(u)} 
                                                    className={`transition-colors p-1.5 rounded-md text-gray-400 ${theme === 'bluewhite' ? 'hover:text-indigo-600 hover:bg-indigo-50' : 'hover:text-orange-500 hover:bg-orange-50'}`} title="Edit Pengguna">
                                                    <Edit3 className="w-4 h-4" />
                                                </button>
                                                
                                                {auth.user.id !== u.id && (
                                                    <button onClick={() => deleteUser(u.id)} 
                                                        className={`transition-colors p-1.5 rounded-md text-gray-400 ${theme === 'bluewhite' ? 'hover:text-red-500 hover:bg-red-50' : 'hover:text-red-500 hover:bg-red-50'}`} title="Hapus Pengguna">
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                )}
                                            </div>
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