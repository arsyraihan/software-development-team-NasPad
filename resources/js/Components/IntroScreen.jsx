import { useEffect, useState } from 'react';

export default function IntroScreen() {
    const [introState, setIntroState] = useState(() => {
        if (typeof window !== 'undefined') {
            const isIntroEnabled = localStorage.getItem('enableIntro') !== 'false';
            const isAlreadyPlayedThisSession = sessionStorage.getItem('introPlayed') === 'true';

            if (!isIntroEnabled || isAlreadyPlayedThisSession) {
                return 'hidden';
            }
            return 'playing';
        }
        return 'hidden';
    });

    // PERBAIKAN LOGIKA TIMER & DURASI ANIMASI
    useEffect(() => {
        let timer;
        
        if (introState === 'playing') {
            // Tahan layar intro selama 3 detik, lalu mulai memudar
            timer = setTimeout(() => setIntroState('fading'), 3000);
        } else if (introState === 'fading') {
            // Diperpanjang menjadi 1000ms (1 detik) agar sesuai dengan durasi CSS (duration-1000)
            // Ini mencegah layar terhapus mendadak sebelum efek memudarnya selesai.
            timer = setTimeout(() => {
                setIntroState('hidden');
                sessionStorage.setItem('introPlayed', 'true');
            }, 1000); 
        }

        return () => clearTimeout(timer);
    }, [introState]);

    if (introState === 'hidden') return null;

    return (
        <>
            <style>{`
                @keyframes float-up {
                    0% { opacity: 0; transform: translateY(20px); }
                    100% { opacity: 1; transform: translateY(0); }
                }
                .animate-float-up {
                    animation: float-up 1s ease-out forwards;
                }
            `}</style>

            {/* TAMBAHAN EFEK SINEMATIK: 
                - duration-1000 (1 detik memudar perlahan)
                - Saat fading: scale-105 (sedikit membesar) & blur-sm (sedikit mengabur/dissolve)
            */}
            <div 
                className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#fcfcfd] transition-all duration-1000 ease-in-out overflow-hidden ${
                    introState === 'fading' 
                        ? 'opacity-0 scale-105 blur-sm pointer-events-none' 
                        : 'opacity-100 scale-100 blur-none'
                }`}
            >
                {/* Background Gradasi Intro Lembut */}
                <div className="absolute top-[-20%] left-[-15%] w-[65%] h-[70%] bg-gradient-to-br from-[#c4daf7]/60 via-[#eef3fb]/40 to-transparent rounded-full blur-[100px]" />
                <div className="absolute bottom-[-20%] right-[-15%] w-[65%] h-[70%] bg-gradient-to-tl from-[#fadcd9]/70 via-[#fbedea]/40 to-transparent rounded-full blur-[100px]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50%] h-[50%] bg-gradient-to-r from-orange-200/20 via-blue-200/20 to-red-200/20 rounded-full blur-[80px]" />

                {/* Konten Intro */}
                <div className="relative z-10 flex flex-col items-center animate-float-up">
                    <p className="text-gray-400 font-semibold tracking-[0.2em] uppercase text-sm mb-6">
                        Powered By
                    </p>

                    <div className="flex items-center justify-center space-x-6 mb-8 bg-white/40 backdrop-blur-md px-8 py-4 rounded-3xl shadow-[0_10px_30px_rgba(0,0,0,0.03)] border border-white/60">
                        {/* Logo Frameworks */}
                        <img src="https://upload.wikimedia.org/wikipedia/commons/9/9a/Laravel.svg" alt="Laravel" className="h-10 w-auto opacity-90 hover:opacity-100 transition-opacity drop-shadow-sm" />
                        <img src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" alt="React" className="h-10 w-auto opacity-90 hover:opacity-100 transition-opacity drop-shadow-sm" />
                        <img src="https://upload.wikimedia.org/wikipedia/commons/9/91/Electron_Software_Framework_Logo.svg" alt="Electron" className="h-10 w-auto opacity-90 hover:opacity-100 transition-opacity drop-shadow-sm" />
                        
                        <div className="h-10 w-[2px] bg-gray-200 rounded-full mx-2"></div>

                        {/* Logo NasPad Team */}
                        <img src="/b20958bd-6fca-46af-88f1-dd313a547c28.jpeg" alt="NasPad Team" className="h-11 w-11 object-cover rounded-xl mix-blend-multiply border-0 shadow-none ring-0 outline-none pointer-events-none select-none" />
                    </div>

                    <h2 className="text-2xl font-extrabold tracking-tight text-gray-800">
                        NasPad Team
                    </h2>
                </div>
            </div>
        </>
    );
}