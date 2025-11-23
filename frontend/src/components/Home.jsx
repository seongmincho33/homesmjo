import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useTranslation } from 'react-i18next';
import LanguageSelector from './LanguageSelector';

const Home = () => {
    const { t } = useTranslation();

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-dark-bg text-slate-900 dark:text-white font-sans transition-colors duration-300 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/10 dark:bg-neon-blue/10 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 dark:bg-neon-purple/10 rounded-full blur-[120px]"></div>
            </div>

            <div className="relative z-10 container mx-auto px-6 py-12 h-screen flex flex-col">
                {/* Header */}
                <header className="flex justify-between items-center mb-16">
                    <div className="text-2xl font-bold tracking-tighter">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-neon-blue dark:to-neon-purple">
                            {t('home.hubTitle').split('_')[0]}
                        </span>
                        <span className="text-slate-400 dark:text-slate-600">_{t('home.hubTitle').split('_')[1]}</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link to="/settings" className="p-2 text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-white transition-colors">
                            <span className="text-xl">⚙️</span>
                        </Link>
                    </div>
                </header>

                {/* Main Content */}
                <main className="flex-grow flex flex-col justify-center items-center text-center max-w-4xl mx-auto w-full">
                    <div className="mb-16 space-y-6">
                        <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-4">
                            <span className="block text-slate-900 dark:text-white">{t('home.ourUniverse').split(' ')[0]}</span>
                            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-neon-blue dark:via-white dark:to-neon-purple animate-gradient-x">
                                {t('home.ourUniverse').split(' ').slice(1).join(' ')}
                            </span>
                        </h1>
                        <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
                            {t('home.welcomeMessage')}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl">
                        {/* Economy Card */}
                        <Link to="/dashboard" className="group relative">
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-neon-blue dark:to-cyan-400 rounded-2xl blur opacity-30 group-hover:opacity-75 transition duration-500"></div>
                            <div className="relative h-full bg-white dark:bg-card-bg border border-slate-200 dark:border-white/10 rounded-2xl p-8 flex flex-col items-start justify-between hover:transform hover:-translate-y-1 transition duration-300">
                                <div className="mb-8">
                                    <div className="w-12 h-12 bg-blue-100 dark:bg-neon-blue/20 rounded-xl flex items-center justify-center mb-4 text-2xl">
                                        🌍
                                    </div>
                                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{t('home.cards.economy.title')}</h3>
                                    <p className="text-slate-500 dark:text-slate-400 text-sm text-left">
                                        {t('home.cards.economy.description')}
                                    </p>
                                </div>
                                <div className="flex items-center text-blue-600 dark:text-neon-blue font-mono text-sm font-bold group-hover:translate-x-2 transition-transform duration-300">
                                    {t('home.cards.economy.action')} <span className="ml-2">→</span>
                                </div>
                            </div>
                        </Link>

                        {/* Memory Archive Card (Placeholder) */}
                        <div className="group relative opacity-75 cursor-not-allowed">
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 dark:from-neon-purple dark:to-pink-400 rounded-2xl blur opacity-10 group-hover:opacity-20 transition duration-500"></div>
                            <div className="relative h-full bg-slate-50 dark:bg-card-bg/50 border border-slate-200 dark:border-white/5 rounded-2xl p-8 flex flex-col items-start justify-between grayscale-[0.5]">
                                <div className="mb-8">
                                    <div className="w-12 h-12 bg-purple-100 dark:bg-neon-purple/20 rounded-xl flex items-center justify-center mb-4 text-2xl">
                                        📸
                                    </div>
                                    <h3 className="text-2xl font-bold text-slate-700 dark:text-slate-300 mb-2">{t('home.cards.memory.title')}</h3>
                                    <p className="text-slate-500 dark:text-slate-500 text-sm text-left">
                                        {t('home.cards.memory.description')}
                                    </p>
                                </div>
                                <div className="flex items-center text-slate-400 dark:text-slate-600 font-mono text-sm font-bold">
                                    {t('home.cards.memory.action')} <span className="ml-2">🔒</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>

                <footer className="mt-16 text-center text-slate-400 dark:text-slate-600 text-xs font-mono">
                    {t('home.footer')}
                </footer>
            </div>
        </div>
    );
};

export default Home;
