import { useEffect, useState } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Eye, EyeOff } from 'lucide-react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    // State untuk mengontrol visibilitas password
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route('login'));
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            <div className="flex justify-center mb-10 mt-2">
                <h1 className="text-3xl font-black tracking-widest uppercase text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-600 drop-shadow-md">
                    OneTracker
                </h1>
            </div>

            {status && <div className="mb-4 font-medium text-sm text-green-400">{status}</div>}

            <form onSubmit={submit} className="space-y-6 mt-2">
                
                {/* 1. INPUT EMAIL */}
                <div className="relative p-[2px] rounded-xl overflow-hidden shadow-lg group">
                    <div className="absolute top-1/2 left-1/2 w-[400%] h-[400%] spin-fast bg-[conic-gradient(from_0deg,transparent_0%,#991b1b_10%,#ff0000_20%,#ffffff_25%,transparent_25%)]" />
                    <div className="absolute top-1/2 left-1/2 w-[400%] h-[400%] spin-fast bg-[conic-gradient(from_180deg,transparent_0%,#991b1b_10%,#ff0000_20%,#ffffff_25%,transparent_25%)]" />

                    <div className="relative bg-[#1f2229] rounded-[0.6rem] px-4 pt-6 pb-2 z-10 h-full w-full">
                        <div className="relative">
                            <input
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="peer block w-full px-1 py-1 bg-transparent border-0 border-b-2 border-gray-600 text-gray-200 focus:ring-0 focus:border-red-500 transition-colors text-sm placeholder-transparent font-medium"
                                placeholder="Email Address"
                                onChange={(e) => setData('email', e.target.value)}
                                required
                                autoFocus
                            />
                            <label 
                                htmlFor="email" 
                                className="absolute left-1 -top-4 text-gray-400 text-xs transition-all cursor-text peer-placeholder-shown:text-sm peer-placeholder-shown:top-1 peer-focus:-top-4 peer-focus:text-xs peer-focus:text-red-500 peer-valid:-top-4 peer-valid:text-xs"
                            >
                                Email Address
                            </label>
                        </div>
                        {errors.email && <p className="text-red-400 text-xs mt-1.5">{errors.email}</p>}
                    </div>
                </div>

                {/* 2. INPUT PASSWORD */}
                <div className="relative p-[2px] rounded-xl overflow-hidden shadow-lg group">
                    <div className="absolute top-1/2 left-1/2 w-[400%] h-[400%] spin-fast bg-[conic-gradient(from_0deg,transparent_0%,#991b1b_10%,#ff0000_20%,#ffffff_25%,transparent_25%)]" />
                    <div className="absolute top-1/2 left-1/2 w-[400%] h-[400%] spin-fast bg-[conic-gradient(from_180deg,transparent_0%,#991b1b_10%,#ff0000_20%,#ffffff_25%,transparent_25%)]" />

                    <div className="relative bg-[#1f2229] rounded-[0.6rem] px-4 pt-6 pb-2 z-10 h-full w-full">
                        <div className="relative flex items-center">
                            <input
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                value={data.password}
                                className="peer block w-full px-1 py-1 pr-8 bg-transparent border-0 border-b-2 border-gray-600 text-gray-200 focus:ring-0 focus:border-red-500 transition-colors text-sm placeholder-transparent font-medium"
                                placeholder="Password"
                                onChange={(e) => setData('password', e.target.value)}
                                required
                            />
                            <label 
                                htmlFor="password" 
                                className="absolute left-1 -top-4 text-gray-400 text-xs transition-all cursor-text peer-placeholder-shown:text-sm peer-placeholder-shown:top-1 peer-focus:-top-4 peer-focus:text-xs peer-focus:text-red-500 peer-valid:-top-4 peer-valid:text-xs"
                            >
                                Password
                            </label>
                            
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-1 bottom-1.5 text-gray-500 hover:text-red-500 transition-colors focus:outline-none"
                            >
                                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                        </div>
                        {errors.password && <p className="text-red-400 text-xs mt-1.5">{errors.password}</p>}
                    </div>
                </div>

                {/* Link Pendukung */}
                <div className="flex justify-between items-center px-2 mt-1">
                    {canResetPassword && (
                        <Link
                            href={route('password.request')}
                            className="text-xs font-medium text-gray-400 hover:text-red-400 transition-colors"
                        >
                            Forgot Password ?
                        </Link>
                    )}
                    
                    <Link
                        href={route('register')}
                        className="text-xs font-medium text-gray-400 hover:text-red-400 transition-colors"
                    >
                        Create Account
                    </Link>
                </div>

                {/* Tombol Login */}
                <div className="pt-4">
                    <button 
                        type="submit" 
                        disabled={processing}
                        className="w-28 py-2.5 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold rounded-md transition-all shadow-lg shadow-red-500/30 active:scale-95 text-sm tracking-wide"
                    >
                        {processing ? 'Loading...' : 'Login'}
                    </button>
                </div>
            </form>
        </GuestLayout>
    );
}