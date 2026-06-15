import { useEffect, useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
import IntroScreen from '@/Components/IntroScreen';

export default function Login({ status }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
    });

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
        <>
            <Head title="Log in" />
            
            {/* Memanggil File Komponen Intro */}
            <IntroScreen />

            {/* CSS Langsung untuk Animasi Gradasi Teks & FIX BUG MATA BROWSER */}
            <style>{`
                @keyframes text-gradient {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
                .animate-text-gradient {
                    background-size: 200% auto;
                    animation: text-gradient 4s ease-in-out infinite;
                }
                
                /* MEMATIKAN IKON MATA BAWAAN BROWSER (EDGE/CHROME) */
                input[type="password"]::-ms-reveal,
                input[type="password"]::-ms-clear,
                input[type="password"]::-webkit-reveal {
                    display: none !important;
                }
            `}</style>

            <div className="min-h-screen w-full flex items-center justify-center bg-[#fcfcfd] relative overflow-hidden p-4">
                
                {/* Background Fluid */}
                <div className="absolute top-[-20%] left-[-15%] w-[65%] h-[70%] bg-gradient-to-br from-[#dce8fa]/80 via-[#eef3fb]/60 to-transparent rounded-full blur-[100px] pointer-events-none" />
                <div className="absolute bottom-[-20%] right-[-15%] w-[65%] h-[70%] bg-gradient-to-tl from-[#fce2df]/80 via-[#fbedea]/60 to-transparent rounded-full blur-[100px] pointer-events-none" />
                <div className="absolute top-[30%] right-[10%] w-[30%] h-[30%] bg-[#e3ecfa]/40 rounded-full blur-[100px] pointer-events-none" />
                <div className="absolute bottom-[30%] left-[10%] w-[30%] h-[30%] bg-[#fce9e6]/40 rounded-full blur-[100px] pointer-events-none" />

                {/* Kartu Login */}
                <div className="w-full max-w-md relative z-10">
                    <div className="bg-white/60 backdrop-blur-2xl rounded-[2rem] shadow-[0_25px_60px_rgba(0,0,0,0.04)] border border-white p-8 sm:p-10">
                        
                        {/* Header */}
                        <div className="flex items-center justify-center space-x-3 mb-10 mt-1">
                            <img 
                                src="/b20958bd-6fca-46af-88f1-dd313a547c28.jpeg" 
                                alt="OneTracker Logo" 
                                className="w-[3.75rem] h-[3.75rem] object-cover rounded-[1.2rem] bg-transparent mix-blend-multiply border-0 shadow-none ring-0 outline-none pointer-events-none select-none"
                            />
                            <h1 className="text-[2.75rem] font-extrabold tracking-tight select-none pointer-events-none">
                                <span className="animate-text-gradient bg-gradient-to-r from-[#4579b5] via-[#e47356] to-[#7cbce7] bg-clip-text text-transparent">
                                    onetracker
                                </span>
                            </h1>
                        </div>

                        {status && <div className="mb-4 text-center font-medium text-sm text-green-600">{status}</div>}

                        <form onSubmit={submit} className="space-y-6">
                            
                            {/* Input Email */}
                            <div>
                                <div className="relative flex items-center border border-gray-200 rounded-2xl focus-within:border-blue-400 focus-within:ring-4 focus-within:ring-blue-400/10 bg-white/90 transition-all px-4 py-3.5 shadow-sm">
                                    <Mail className="text-gray-400 w-5 h-5 mr-3 flex-shrink-0" />
                                    <input
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={data.email}
                                        className="w-full p-0 bg-transparent border-0 text-gray-700 text-sm font-medium focus:ring-0 placeholder-gray-400"
                                        placeholder="Nama Pengguna atau Email"
                                        onChange={(e) => setData('email', e.target.value)}
                                        required
                                        autoFocus
                                    />
                                </div>
                                {errors.email && <p className="text-red-500 text-xs mt-1.5 ml-2">{errors.email}</p>}
                            </div>

                            {/* Input Password */}
                            <div>
                                <div className="relative flex items-center border border-gray-200 rounded-2xl focus-within:border-blue-400 focus-within:ring-4 focus-within:ring-blue-400/10 bg-white/90 transition-all px-4 py-3.5 shadow-sm">
                                    <Lock className="text-gray-400 w-5 h-5 mr-3 flex-shrink-0" />
                                    <input
                                        id="password"
                                        type={showPassword ? 'text' : 'password'}
                                        name="password"
                                        value={data.password}
                                        className="w-full p-0 bg-transparent border-0 text-gray-700 text-sm font-medium focus:ring-0 placeholder-gray-400"
                                        placeholder="Kata Sandi"
                                        onChange={(e) => setData('password', e.target.value)}
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="text-gray-400 hover:text-blue-500 transition-colors focus:outline-none ml-2"
                                    >
                                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                                {errors.password && <p className="text-red-500 text-xs mt-1.5 ml-2">{errors.password}</p>}
                            </div>

                            {/* Tombol Login */}
                            <div className="pt-4">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full py-4 bg-gradient-to-r from-[#1750a2] via-[#5c6da4] to-[#ea9070] text-white font-bold text-sm rounded-2xl transition-all shadow-[0_8px_20px_rgba(23,80,162,0.15)] hover:shadow-[0_12px_25px_rgba(23,80,162,0.25)] active:scale-[0.98] disabled:opacity-70"
                                >
                                    {processing ? 'MEMPROSES...' : 'Masuk Sekarang'}
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}