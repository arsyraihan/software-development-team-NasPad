import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';

export default function Index({ auth, users }) {
    const { data, setData, post, processing, reset, errors } = useForm({
        name: '',
        role: 'karyawan',
        divisi: '',
        email: '',
        password: '',
        password_confirmation: ''
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('users.store'), {
            onSuccess: () => reset(), 
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">User Management</h2>}
        >
            <Head title="User Management" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">

                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg border-t-4 border-red-500">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Tambahkan User Baru</h3>
                        <form onSubmit={submit} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Nama</label>
                                    <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                        value={data.name} onChange={e => setData('name', e.target.value)} required />
                                    {errors.name && <span className="text-red-500 text-xs">{errors.name}</span>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Role</label>
                                    <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                        value={data.role} onChange={e => setData('role', e.target.value)}>
                                        <option value="karyawan">Karyawan</option>
                                        <option value="atasan">Atasan / Supervisor</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Divisi</label>
                                    <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                        value={data.divisi} onChange={e => setData('divisi', e.target.value)} required />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Email</label>
                                    <input type="email" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                        value={data.email} onChange={e => setData('email', e.target.value)} required />
                                    {errors.email && <span className="text-red-500 text-xs">{errors.email}</span>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Password</label>
                                    <input type="password" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                        value={data.password} onChange={e => setData('password', e.target.value)} required />
                                    {errors.password && <span className="text-red-500 text-xs">{errors.password}</span>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Konfirmasi Password</label>
                                    <input type="password" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                        value={data.password_confirmation} onChange={e => setData('password_confirmation', e.target.value)} required />
                                </div>
                            </div>
                            <button type="submit" disabled={processing} className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition">
                                Simpan Data
                            </button>
                        </form>
                    </div>

                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nama</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Divisi</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {users.map((u) => (
                                        <tr key={u.id}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{u.name}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{u.role.toUpperCase()}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{u.divisi || '-'}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{u.email}</td>
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