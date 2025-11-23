import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const Settings = () => {
    const { t, i18n } = useTranslation();
    const { theme, toggleTheme } = useTheme();
    const isDark = theme === 'dark';

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-dark-bg text-slate-900 dark:text-white font-sans transition-colors duration-300 p-6 lg:p-12">
            <header className="mb-12 flex items-center justify-between border-b border-slate-200 dark:border-white/10 pb-6">
                <div className="flex items-center gap-4">
                    <Link to="/" className="text-sm font-mono text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-neon-blue transition-colors">
                        ← {t('dashboard.returnToHub')}
                    </Link>
                </div>
                <h1 className="text-3xl font-bold tracking-tighter">
                    {t('settings.title')}
                </h1>
                <div className="w-8"></div> {/* Spacer for alignment */}
            </header>

            <main className="max-w-2xl mx-auto space-y-8">
                {/* Language Settings */}
                <section className="bg-white/80 dark:bg-card-bg backdrop-blur-md p-8 rounded-2xl border border-slate-200 dark:border-white/5 shadow-lg">
                    <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                        <span className="text-2xl">🌐</span> {t('settings.language.title')}
                    </h2>
                    <div className="grid grid-cols-2 gap-4">
                        <button
                            onClick={() => changeLanguage('ko')}
                            className={`p-4 rounded-xl border transition-all duration-300 flex items-center justify-center gap-2 font-bold ${i18n.language === 'ko'
                                    ? 'bg-blue-50 border-blue-500 text-blue-600 dark:bg-neon-blue/20 dark:border-neon-blue dark:text-neon-blue'
                                    : 'bg-slate-50 border-transparent text-slate-600 hover:bg-slate-100 dark:bg-white/5 dark:text-slate-400 dark:hover:bg-white/10'
                                }`}
                        >
                            <span className="text-lg">🇰🇷</span> 한국어
                        </button>
                        <button
                            onClick={() => changeLanguage('en')}
                            className={`p-4 rounded-xl border transition-all duration-300 flex items-center justify-center gap-2 font-bold ${i18n.language === 'en'
                                    ? 'bg-blue-50 border-blue-500 text-blue-600 dark:bg-neon-blue/20 dark:border-neon-blue dark:text-neon-blue'
                                    : 'bg-slate-50 border-transparent text-slate-600 hover:bg-slate-100 dark:bg-white/5 dark:text-slate-400 dark:hover:bg-white/10'
                                }`}
                        >
                            <span className="text-lg">🇺🇸</span> English
                        </button>
                    </div>
                </section>

                {/* Theme Settings */}
                <section className="bg-white/80 dark:bg-card-bg backdrop-blur-md p-8 rounded-2xl border border-slate-200 dark:border-white/5 shadow-lg">
                    <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                        <span className="text-2xl">🎨</span> {t('settings.theme.title')}
                    </h2>
                    <div className="grid grid-cols-2 gap-4">
                        <button
                            onClick={() => !isDark && toggleTheme()}
                            className={`p-4 rounded-xl border transition-all duration-300 flex flex-col items-center justify-center gap-2 font-bold ${isDark
                                    ? 'bg-purple-50 border-purple-500 text-purple-600 dark:bg-neon-purple/20 dark:border-neon-purple dark:text-neon-purple'
                                    : 'bg-slate-50 border-transparent text-slate-600 hover:bg-slate-100 dark:bg-white/5 dark:text-slate-400 dark:hover:bg-white/10'
                                }`}
                        >
                            <span className="text-2xl">🌙</span>
                            {t('settings.theme.dark')}
                        </button>
                        <button
                            onClick={() => isDark && toggleTheme()}
                            className={`p-4 rounded-xl border transition-all duration-300 flex flex-col items-center justify-center gap-2 font-bold ${!isDark
                                    ? 'bg-yellow-50 border-yellow-500 text-yellow-600 dark:bg-yellow-400/20 dark:border-yellow-400 dark:text-yellow-400'
                                    : 'bg-slate-50 border-transparent text-slate-600 hover:bg-slate-100 dark:bg-white/5 dark:text-slate-400 dark:hover:bg-white/10'
                                }`}
                        >
                            <span className="text-2xl">☀️</span>
                            {t('settings.theme.light')}
                        </button>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default Settings;
