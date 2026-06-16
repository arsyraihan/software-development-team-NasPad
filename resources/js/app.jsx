import '../css/app.css';
import './bootstrap.js';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import { AppSettingsProvider } from '@/Context/AppSettings';
import IntroScreen from '@/Components/IntroScreen'; 

const appName = 'onetracker';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob('./Pages/**/*.jsx'),
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <AppSettingsProvider>
                {/* INTRO SCREEN BERJALAN GLOBAL DI SELURUH APLIKASI */}
                <IntroScreen />
                <App {...props} />
            </AppSettingsProvider>
        );
    },
    progress: {
        color: '#4B5563',
    },
});