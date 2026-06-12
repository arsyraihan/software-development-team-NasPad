import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, router } from '@inertiajs/react';
import { UserPlus, Users as UsersIcon, Shield, Briefcase, Mail, Key, Trash2, KeyRound } from 'lucide-react';

export default function Index({ auth, users }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '', email: '', password: '', password_confirmation: '', role: 'karyawan', divisi: 'IT'
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('users.store'), {
            onSuccess: () => reset(),
        });
    };

    const deleteUser = (id) => {
        if (confirm('Yakin ingin menghapus user ini?')) {
            router.delete(route('users.destroy', id), { preserveScroll: true });
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-extrabold text-2xl text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500 tracking-tight">
                    User Management
                </h2>
            }
        >
            <Head title="User Management" />
            <div className="absolute top-0 left-0 w-full h-72 bg-gradient-to-b from-red-50/80 to-transparent -z-10 pointer-events-none"></div>

            <div className="pt-8 pb-12 max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                
                {/* Form Tambah User */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition hover:shadow-md">
                    <div className="bg-gray-50/80 px-6 py-4 border-b border-gray-100 flex items-center">
                        <UserPlus className="w-5 h-5 text-orange-500 mr-2" />
                        <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider">Tambah Pengguna Baru</h3>
                    </div>
                    <div className="p-6 sm:p-8">
                        <form onSubmit={submit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1"><Briefcase className="inline w-3 h-3 mr-1"/> Nama Lengkap</label>
                                    <input type="text" className="w-full rounded-xl border-gray-200 bg-gray-50 focus:bg-white focus:border-orange-500 focus:ring-orange-200 transition-all text-sm"
                                        value={data.name} onChange={e => setData('name', e.target.value)} required />
                                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1"><Mail className="inline w-3 h-3 mr-1"/> Email</label>
                                    <input type="email" className="w-full rounded-xl border-gray-200 bg-gray-50 focus:bg-white focus:border-orange-500 focus:ring-orange-200 transition-all text-sm"
                                        value={data.email} onChange={e => setData('email', e.target.value)} required />
                                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Divisi / Departemen</label>
                                    <input type="text" placeholder="Contoh: IT, HRD, Finance..." className="w-full rounded-xl border-gray-200 bg-gray-50 focus:bg-white focus:border-orange-500 focus:ring-orange-200 transition-all text-sm"
                                        value={data.divisi} onChange={e => setData('divisi', e.target.value)} required />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1"><Key className="inline w-3 h-3 mr-1"/> Password</label>
                                    <input type="password" placeholder="Minimal 8 karakter" className="w-full rounded-xl border-gray-200 bg-gray-50 focus:bg-white focus:border-orange-500 focus:ring-orange-200 transition-all text-sm"
                                        value={data.password} onChange={e => setData('password', e.target.value)} required />
                                    {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1"><KeyRound className="inline w-3 h-3 mr-1"/> Konfirmasi Password</label>
                                    <input type="password" placeholder="Ulangi password" className="w-full rounded-xl border-gray-200 bg-gray-50 focus:bg-white focus:border-orange-500 focus:ring-orange-200 transition-all text-sm"
                                        value={data.password_confirmation} onChange={e => setData('password_confirmation', e.target.value)} required />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1"><Shield className="inline w-3 h-3 mr-1"/> Peran (Role)</label>
                                    <select className="w-full rounded-xl border-gray-200 bg-gray-50 focus:bg-white focus:border-orange-500 focus:ring-orange-200 transition-all text-sm"
                                        value={data.role} onChange={e => setData('role', e.target.value)}>
                                        <option value="karyawan">Karyawan</option>
                                        <option value="atasan">Atasan / Supervisor</option>
                                    </select>
                                </div>
                            </div>
                            
                            <div className="flex justify-end pt-4 border-t border-gray-100">
                                <button type="submit" disabled={processing} 
                                    className="flex justify-center items-center px-8 py-2.5 text-white text-sm font-bold rounded-xl bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 transition-all transform hover:-translate-y-0.5 hover:shadow-md active:scale-95">
                                    <UserPlus className="w-4 h-4 mr-2"/> {processing ? 'Memproses...' : 'Daftarkan User'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Tabel Data Users */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="bg-gray-50/80 px-6 py-4 border-b border-gray-100 flex items-center">
                        <UsersIcon className="w-5 h-5 text-red-500 mr-2" />
                        <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider">Daftar Pengguna Sistem</h3>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-100">
                            <thead className="bg-white">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Nama & Email</th>
                                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Role</th>
                                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Divisi</th>
                                    <th className="px-6 py-3 text-right text-xs font-bold text-gray-400 uppercase tracking-wider">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-50">
                                {users.map((u) => (
                                    <tr key={u.id} className="hover:bg-gray-50/50 transition group">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-bold text-gray-800">{u.name}</div>
                                            <div className="text-xs text-gray-500 flex items-center mt-0.5"><Mail className="w-3 h-3 mr-1"/>{u.email}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2.5 py-1 inline-flex text-xs font-bold rounded-md border 
                                                ${u.role === 'atasan' ? 'bg-red-50 text-red-700 border-red-100' : 'bg-gray-50 text-gray-600 border-gray-200'}`}>
                                                {u.role === 'atasan' ? <Shield className="w-3 h-3 mr-1"/> : <UserPlus className="w-3 h-3 mr-1"/>}
                                                {u.role}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="bg-orange-50 text-orange-700 border border-orange-100 px-2.5 py-1 rounded-md text-xs font-bold">
                                                {u.divisi || '-'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            {auth.user.id !== u.id && (
                                                <button onClick={() => deleteUser(u.id)} 
                                                    className="text-gray-300 hover:text-red-500 transition-colors p-1.5 rounded-md hover:bg-red-50">
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
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