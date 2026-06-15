import { useState, useEffect, useRef } from 'react';
import { Settings, Globe, Palette, Check } from 'lucide-react';

export default function SettingsDropdown() {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    // State untuk pengaturan
    const [language, setLanguage] = useState(localStorage.getItem('onetracker_lang') || 'id');
    const [theme, setTheme] = useState(localStorage.getItem('onetracker_theme') || 'default');

    // Tutup dropdown jika klik di luar
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Fungsi mengubah bahasa
    const handleLanguageChange = (lang) => {
        setLanguage(lang);
        localStorage.setItem('onetracker_lang', lang);
        // Nanti di sini Anda memanggil fungsi library terjemahan (seperti i18next)
    };

    // Fungsi mengubah tema
    const handleThemeChange = (selectedTheme) => {
        setTheme(selectedTheme);
        localStorage.setItem('onetracker_theme', selectedTheme);
        // Nanti di sini Anda menyuntikkan class CSS ke <body> untuk mengubah tema global
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="relative p-2 text-gray-500 hover:text-blue-600 transition-all duration-300 transform hover:-translate-y-1 hover:bg-blue-50 rounded-full focus:outline-none"
            >
                <Settings className={`w-6 h-6 transition-transform duration-500 ${isOpen ? 'rotate-90' : 'rotate-0'}`} />
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-3 w-72 bg-white rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] border border-gray-100 overflow-hidden z-50">
                    <div className="px-4 py-3 bg-gray-50/80 border-b border-gray-100">
                        <h3 className="text-sm font-semibold text-gray-700">Pengaturan Tampilan</h3>
                    </div>

                    <div className="p-4 space-y-5">
                        
                        {/* Pengaturan Bahasa */}
                        <div>
                            <div className="flex items-center text-xs font-bold text-gray-400 uppercase mb-3">
                                <Globe className="w-4 h-4 mr-2" /> Bahasa
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                                <button 
                                    onClick={() => handleLanguageChange('id')}
                                    className={`py-2 px-3 text-sm rounded-xl border transition-all flex items-center justify-center ${language === 'id' ? 'bg-blue-50 border-blue-200 text-blue-700 font-semibold' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                                >
                                    Indonesia {language === 'id' && <Check className="w-4 h-4 ml-1" />}
                                </button>
                                <button 
                                    onClick={() => handleLanguageChange('en')}
                                    className={`py-2 px-3 text-sm rounded-xl border transition-all flex items-center justify-center ${language === 'en' ? 'bg-blue-50 border-blue-200 text-blue-700 font-semibold' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                                >
                                    English {language === 'en' && <Check className="w-4 h-4 ml-1" />}
                                </button>
                            </div>
                        </div>

                        {/* Pengaturan Tema */}
                        <div>
                            <div className="flex items-center text-xs font-bold text-gray-400 uppercase mb-3">
                                <Palette className="w-4 h-4 mr-2" /> Tema Sistem
                            </div>
                            <div className="space-y-2">
                                <button 
                                    onClick={() => handleThemeChange('default')}
                                    className={`w-full flex items-center justify-between py-3 px-4 rounded-xl border transition-all ${theme === 'default' ? 'bg-orange-50 border-orange-200 text-orange-700 font-semibold' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                                >
                                    <div className="flex items-center">
                                        <div className="w-4 h-4 rounded-full bg-gradient-to-r from-red-400 to-orange-400 mr-3"></div>
                                        Default (Merah Oranye)
                                    </div>
                                    {theme === 'default' && <Check className="w-4 h-4" />}
                                </button>
                                <button 
                                    onClick={() => handleThemeChange('bluewhite')}
                                    className={`w-full flex items-center justify-between py-3 px-4 rounded-xl border transition-all ${theme === 'bluewhite' ? 'bg-blue-50 border-blue-200 text-blue-700 font-semibold' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                                >
                                    <div className="flex items-center">
                                        <div className="w-4 h-4 rounded-full bg-gradient-to-r from-blue-300 to-blue-500 mr-3"></div>
                                        Blue White
                                    </div>
                                    {theme === 'bluewhite' && <Check className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            )}
        </div>
    );
}