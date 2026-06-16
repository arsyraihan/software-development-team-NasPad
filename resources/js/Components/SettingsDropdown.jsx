import { useState, useEffect, useRef } from 'react';
import { Settings, Globe, Palette, Check, MonitorPlay, ShieldCheck, Code } from 'lucide-react';
import { useAppSettings } from '@/Context/AppSettings';

export default function SettingsDropdown() {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const { language, setLanguage, theme, setTheme, t } = useAppSettings();

    // State untuk fitur baru
    const [skipIntro, setSkipIntro] = useState(() => {
        if (typeof window !== 'undefined') return localStorage.getItem('enableIntro') === 'false';
        return false;
    });

    const [rememberLogin, setRememberLogin] = useState(() => {
        if (typeof window !== 'undefined') return localStorage.getItem('onetracker_remember') === 'true';
        return false;
    });

    // Menangani penutupan dropdown jika klik area luar
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Handlers untuk Toggle Fitur Baru
    const toggleSkipIntro = () => {
        const newValue = !skipIntro;
        setSkipIntro(newValue);
        localStorage.setItem('enableIntro', newValue ? 'false' : 'true');
    };

    const toggleRememberLogin = () => {
        const newValue = !rememberLogin;
        setRememberLogin(newValue);
        localStorage.setItem('onetracker_remember', newValue ? 'true' : 'false');
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className={`relative p-2 hover:bg-gray-100 rounded-full transition-all duration-300 transform hover:-translate-y-1 focus:outline-none ${theme === 'bluewhite' ? 'text-gray-500 hover:text-blue-600 hover:bg-blue-50' : 'text-gray-500 hover:text-red-600 hover:bg-red-50'}`}
            >
                <Settings className={`w-6 h-6 transition-transform duration-500 ${isOpen ? 'rotate-90' : 'rotate-0'}`} />
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-3 w-80 bg-white rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] border border-gray-100 overflow-hidden z-50 flex flex-col max-h-[85vh]">
                    {/* Header Dropdown */}
                    <div className="px-5 py-4 bg-gray-50/80 border-b border-gray-100 flex items-center shrink-0">
                        <Settings className={`w-4 h-4 mr-2 ${theme === 'bluewhite' ? 'text-blue-500' : 'text-orange-500'}`} />
                        <h3 className="text-sm font-bold text-gray-800">{t('settings_title')}</h3>
                    </div>

                    {/* Area Konten Scrollable */}
                    <div className="p-5 space-y-6 overflow-y-auto custom-scrollbar">
                        
                        {/* BAGIAN 1: TAMPILAN */}
                        <div>
                            <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 border-b border-gray-100 pb-1">
                                {t('settings_appearance')}
                            </div>
                            
                            {/* Bahasa */}
                            <div className="mb-4">
                                <label className="flex items-center text-xs font-bold text-gray-600 mb-2">
                                    <Globe className="w-3.5 h-3.5 mr-1.5" /> {t('settings_language')}
                                </label>
                                <div className="grid grid-cols-2 gap-2">
                                    <button onClick={() => setLanguage('id')} className={`py-2 px-3 text-xs rounded-xl border transition-all flex items-center justify-center ${language === 'id' ? (theme === 'bluewhite' ? 'bg-blue-50 border-blue-200 text-blue-700 font-bold' : 'bg-red-50 border-red-200 text-red-700 font-bold') : 'bg-white border-gray-200 text-gray-500 hover:bg-gray-50'}`}>
                                        Indonesia {language === 'id' && <Check className="w-3.5 h-3.5 ml-1" />}
                                    </button>
                                    <button onClick={() => setLanguage('en')} className={`py-2 px-3 text-xs rounded-xl border transition-all flex items-center justify-center ${language === 'en' ? (theme === 'bluewhite' ? 'bg-blue-50 border-blue-200 text-blue-700 font-bold' : 'bg-red-50 border-red-200 text-red-700 font-bold') : 'bg-white border-gray-200 text-gray-500 hover:bg-gray-50'}`}>
                                        English {language === 'en' && <Check className="w-3.5 h-3.5 ml-1" />}
                                    </button>
                                </div>
                            </div>

                            {/* Tema */}
                            <div>
                                <label className="flex items-center text-xs font-bold text-gray-600 mb-2">
                                    <Palette className="w-3.5 h-3.5 mr-1.5" /> {t('settings_theme')}
                                </label>
                                <div className="space-y-2">
                                    <button onClick={() => setTheme('default')} className={`w-full flex items-center justify-between py-2.5 px-3 rounded-xl border transition-all ${theme === 'default' ? 'bg-orange-50 border-orange-200 text-orange-700 font-bold' : 'bg-white border-gray-200 text-gray-500 hover:bg-gray-50'}`}>
                                        <div className="flex items-center text-xs">
                                            <div className="w-3.5 h-3.5 rounded-full bg-gradient-to-r from-red-400 to-orange-400 mr-2.5 shadow-sm"></div>
                                            {t('theme_default')}
                                        </div>
                                        {theme === 'default' && <Check className="w-3.5 h-3.5" />}
                                    </button>
                                    <button onClick={() => setTheme('bluewhite')} className={`w-full flex items-center justify-between py-2.5 px-3 rounded-xl border transition-all ${theme === 'bluewhite' ? 'bg-blue-50 border-blue-200 text-blue-700 font-bold' : 'bg-white border-gray-200 text-gray-500 hover:bg-gray-50'}`}>
                                        <div className="flex items-center text-xs">
                                            <div className="w-3.5 h-3.5 rounded-full bg-gradient-to-r from-blue-300 to-blue-500 mr-2.5 shadow-sm"></div>
                                            {t('theme_bluewhite')}
                                        </div>
                                        {theme === 'bluewhite' && <Check className="w-3.5 h-3.5" />}
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* BAGIAN 2: PREFERENSI (TOGGLES) */}
                        <div>
                            <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 border-b border-gray-100 pb-1">
                                {t('settings_preferences')}
                            </div>
                            <div className="space-y-3">
                                {/* Toggle 1: Lewati Intro */}
                                <div className="flex items-center justify-between group cursor-pointer" onClick={toggleSkipIntro}>
                                    <div className="flex items-center text-sm font-semibold text-gray-600 group-hover:text-gray-800 transition-colors">
                                        <MonitorPlay className={`w-4 h-4 mr-2 ${skipIntro ? (theme === 'bluewhite' ? 'text-blue-500' : 'text-orange-500') : 'text-gray-400'}`} />
                                        {t('settings_skip_intro')}
                                    </div>
                                    <div className={`w-10 h-5.5 flex items-center rounded-full p-1 transition-colors duration-300 ${skipIntro ? (theme === 'bluewhite' ? 'bg-blue-500' : 'bg-gradient-to-r from-red-500 to-orange-500') : 'bg-gray-200'}`}>
                                        <div className={`bg-white w-4 h-4 rounded-full shadow-sm transform transition-transform duration-300 ${skipIntro ? 'translate-x-4' : ''}`}></div>
                                    </div>
                                </div>

                                {/* Toggle 2: Simpan Login */}
                                <div className="flex items-center justify-between group cursor-pointer" onClick={toggleRememberLogin}>
                                    <div className="flex items-center text-sm font-semibold text-gray-600 group-hover:text-gray-800 transition-colors">
                                        <ShieldCheck className={`w-4 h-4 mr-2 ${rememberLogin ? (theme === 'bluewhite' ? 'text-blue-500' : 'text-orange-500') : 'text-gray-400'}`} />
                                        {t('settings_remember')}
                                    </div>
                                    <div className={`w-10 h-5.5 flex items-center rounded-full p-1 transition-colors duration-300 ${rememberLogin ? (theme === 'bluewhite' ? 'bg-blue-500' : 'bg-gradient-to-r from-red-500 to-orange-500') : 'bg-gray-200'}`}>
                                        <div className={`bg-white w-4 h-4 rounded-full shadow-sm transform transition-transform duration-300 ${rememberLogin ? 'translate-x-4' : ''}`}></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* BAGIAN 3: INFORMASI & TENTANG */}
                        <div>
                            <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 border-b border-gray-100 pb-1">
                                {t('settings_info')}
                            </div>
                            <a 
                                href="https://github.com/arsyraihan/software-development-team-NasPad.git" 
                                target="_blank" 
                                rel="noreferrer"
                                className="w-full flex items-center justify-center py-2.5 px-4 rounded-xl border border-gray-200 bg-white text-gray-600 text-xs font-bold hover:bg-gray-50 hover:text-gray-900 transition-all shadow-sm group"
                            >
                                <Code className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" /> 
                                {t('settings_about')}
                            </a>
                        </div>
                    </div>

                    {/* Footer / Copyright */}
                    <div className="px-5 py-3 bg-gray-50 border-t border-gray-100 text-center shrink-0">
                        <p className="text-[10px] font-semibold text-gray-400">
                            {t('copyright_text')}
                        </p>
                    </div>

                </div>
            )}
        </div>
    );
}