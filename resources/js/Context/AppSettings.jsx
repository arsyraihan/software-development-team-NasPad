import { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '@/utils/translations';

const AppSettingsContext = createContext();

export function AppSettingsProvider({ children }) {
    // Default bahasa diubah menjadi 'en' (English)
    const [language, setLanguage] = useState(() => {
        if (typeof window !== 'undefined') return localStorage.getItem('onetracker_lang') || 'en';
        return 'en';
    });
    
    const [theme, setTheme] = useState(() => {
        if (typeof window !== 'undefined') return localStorage.getItem('onetracker_theme') || 'default';
        return 'default';
    });

    useEffect(() => {
        localStorage.setItem('onetracker_lang', language);
    }, [language]);

    useEffect(() => {
        localStorage.setItem('onetracker_theme', theme);
    }, [theme]);

    // Fungsi Penterjemah (T)
    const t = (key) => {
        return translations[language]?.[key] || key;
    };

    return (
        <AppSettingsContext.Provider value={{ language, setLanguage, theme, setTheme, t }}>
            {children}
        </AppSettingsContext.Provider>
    );
}

export function useAppSettings() {
    return useContext(AppSettingsContext);
}