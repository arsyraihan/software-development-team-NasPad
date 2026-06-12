import { Link } from '@inertiajs/react';

export default function Guest({ children }) {
    return (
        <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 font-sans animated-bg">
            
            <style>{`
                /* Animasi Gradasi Background */
                .animated-bg {
                    background: linear-gradient(-45deg, #f87171, #fb923c, #f472b6, #fda4af);
                    background-size: 300% 300%;
                    animation: gradientBG 8s ease-in-out infinite;
                }
                
                @keyframes gradientBG {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }

                /* PERBAIKAN ANIMASI: Mengunci titik tengah (-50%) agar rotasi 100% bulat sempurna ke Kanan */
                @keyframes spin-cw {
                    0% { transform: translate(-50%, -50%) rotate(0deg); }
                    100% { transform: translate(-50%, -50%) rotate(360deg); }
                }
                
                .spin-slow { animation: spin-cw 6s linear infinite; }
                .spin-fast { animation: spin-cw 4s linear infinite; }

                /* Mengakali autofill background chrome agar tetap gelap */
                input:-webkit-autofill,
                input:-webkit-autofill:hover, 
                input:-webkit-autofill:focus, 
                input:-webkit-autofill:active{
                    -webkit-box-shadow: 0 0 0 30px #1f2229 inset !important;
                    -webkit-text-fill-color: white !important;
                    transition: background-color 5000s ease-in-out 0s;
                }
            `}</style>

            {/* BINGKAI UTAMA (Guest Layout) DENGAN ANIMASI CAHAYA */}
            <div className="relative w-full sm:max-w-md mt-6 p-[3px] rounded-[1.2rem] overflow-hidden shadow-[0_30px_60px_-10px_rgba(0,0,0,0.6)]">
                
                {/* Ekor Cahaya 1 (0 derajat) */}
                <div className="absolute top-1/2 left-1/2 w-[1500px] h-[1500px] spin-slow bg-[conic-gradient(from_0deg,transparent_0%,#991b1b_10%,#ff0000_20%,#ffffff_25%,transparent_25%)]" />
                
                {/* Ekor Cahaya 2 (180 derajat) */}
                <div className="absolute top-1/2 left-1/2 w-[1500px] h-[1500px] spin-slow bg-[conic-gradient(from_180deg,transparent_0%,#991b1b_10%,#ff0000_20%,#ffffff_25%,transparent_25%)]" />

                {/* KOTAK GELAP BAGIAN DALAM */}
                <div className="relative bg-[#1f2229] rounded-[1rem] px-8 py-12 z-10 w-full h-full flex flex-col">
                    {children}
                </div>
            </div>
            
        </div>
    );
}