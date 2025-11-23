import React, { useEffect, useState } from 'react';
import WorldMap from './WorldMap';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSelector from './LanguageSelector';

function Dashboard() {
    const { t } = useTranslation();
    const [economics, setEconomics] = useState([]);
    const [insights, setInsights] = useState([]);
    const [statuses, setStatuses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [ecoRes, insightRes, statusRes] = await Promise.all([
                    axios.get('http://localhost:8080/api/economics'),
                    axios.get('http://localhost:8080/api/insights'),
                    axios.get('http://localhost:8080/api/status')
                ]);
                setEconomics(ecoRes.data);
                setInsights(insightRes.data);
                setStatuses(statusRes.data);
            } catch (error) {
                console.error("Error fetching data:", error);
                // Fallback mock data for demo purposes if backend isn't running
                setEconomics([
                    { name: "Oil (WTI)", value: 78.50, unit: "USD/bbl", changePercent: 1.2 },
                    { name: "Gold", value: 2030.10, unit: "USD/oz", changePercent: -0.5 },
                    { name: "USD/EUR", value: 0.92, unit: "Ratio", changePercent: 0.1 }
                ]);
                setInsights([
                    { country: "USA", leaderName: "Joe Biden", visionQuote: "Focusing on domestic infrastructure and clean energy transition.", focusArea: "Economy" },
                    { country: "China", leaderName: "Xi Jinping", visionQuote: "Expanding global trade partnerships and technological sovereignty.", focusArea: "Technology" }
                ]);
                setStatuses([
                    { countryCode: "UA", countryName: "Ukraine", statusType: "Conflict", description: "Active conflict zone" },
                    { countryCode: "US", countryName: "USA", statusType: "Stable", description: "Economic growth focus" }
                ]);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-dark-bg text-slate-900 dark:text-white p-6 lg:p-12 font-sans selection:bg-neon-purple selection:text-white transition-colors duration-300">
            <header className="mb-12 flex flex-col md:flex-row justify-between items-end border-b border-slate-200 dark:border-white/10 pb-6">
                <div>
                    <div className="flex items-center gap-4 mb-2">
                        <Link to="/" className="text-sm font-mono text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-neon-blue transition-colors">
                            ← {t('dashboard.returnToHub')}
                        </Link>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-neon-blue dark:via-white dark:to-neon-purple tracking-tighter drop-shadow-sm dark:drop-shadow-neon-blue">
                        {t('app.title').split(' ')[0]}<br />{t('app.title').split(' ').slice(1).join(' ')}
                    </h1>
                    <p className="text-blue-600 dark:text-neon-green font-mono mt-2 tracking-widest text-sm uppercase">
                        {t('app.subtitle')}
                    </p>
                </div>
                <div className="flex items-center gap-4">
                    <Link to="/settings" className="p-2 text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-white transition-colors">
                        <span className="text-xl">⚙️</span>
                    </Link>
                    <div className="text-right hidden md:block">
                        <div className="text-xs text-slate-500 dark:text-slate-400 font-mono">{t('app.systemStatus')}</div>
                        <div className="text-green-600 dark:text-neon-green animate-pulse-slow">● {t('app.online')}</div>
                    </div>
                </div>
            </header>
            <main className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Map Section - Spans 8 columns */}
                <div className="lg:col-span-8 space-y-8">
                    <section className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-neon-blue dark:to-neon-purple rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
                        <div className="relative bg-white/80 dark:bg-card-bg backdrop-blur-xl rounded-2xl border border-slate-200 dark:border-white/10 p-1 overflow-hidden shadow-lg dark:shadow-none">
                            <div className="absolute top-4 left-4 z-[1000] bg-white/90 dark:bg-black/50 backdrop-blur px-3 py-1 rounded border border-slate-200 dark:border-white/10 text-xs font-mono text-blue-600 dark:text-neon-blue shadow-sm">
                                {t('dashboard.liveMapFeed')}
                            </div>
                            <WorldMap data={statuses} />
                        </div>
                    </section>
                </div>

                {/* Sidebar Section - Spans 4 columns */}
                <div className="lg:col-span-4 space-y-8">

                    {/* Economic Indicators */}
                    <section className="bg-white/80 dark:bg-card-bg backdrop-blur-md p-6 rounded-2xl border border-slate-200 dark:border-white/5 shadow-lg dark:shadow-glass hover:border-blue-400/30 dark:hover:border-neon-green/30 transition-colors duration-300">
                        <h2 className="text-xl font-bold mb-6 text-slate-800 dark:text-white flex items-center gap-2">
                            <span className="w-2 h-8 bg-blue-500 dark:bg-neon-green rounded-full shadow-sm dark:shadow-neon-green"></span>
                            {t('dashboard.marketData')}
                        </h2>
                        <div className="space-y-3">
                            {loading ? <p className="text-slate-500 animate-pulse">{t('dashboard.syncing')}</p> : economics.map((item, index) => (
                                <div key={index} className="group flex justify-between items-center p-4 bg-slate-100 dark:bg-white/5 rounded-xl hover:bg-slate-200 dark:hover:bg-white/10 transition-all duration-300 border border-transparent hover:border-blue-400/20 dark:hover:border-neon-green/20">
                                    <span className="text-slate-600 dark:text-slate-300 font-medium group-hover:text-slate-900 dark:group-hover:text-white transition-colors">{item.name}</span>
                                    <div className="text-right">
                                        <span className="font-mono text-xl text-slate-800 dark:text-white block tracking-tight">
                                            {item.unit === 'USD/bbl' || item.unit === 'USD/oz' ? '$' : ''}{item.value}
                                        </span>
                                        <span className={`text-xs font-bold ${item.changePercent >= 0 ? 'text-green-600 dark:text-neon-green' : 'text-red-600 dark:text-neon-red'}`}>
                                            {item.changePercent > 0 ? '▲' : '▼'} {Math.abs(item.changePercent)}%
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Leader Insights */}
                    <section className="bg-white/80 dark:bg-card-bg backdrop-blur-md p-6 rounded-2xl border border-slate-200 dark:border-white/5 shadow-lg dark:shadow-glass hover:border-purple-400/30 dark:hover:border-neon-purple/30 transition-colors duration-300">
                        <h2 className="text-xl font-bold mb-6 text-slate-800 dark:text-white flex items-center gap-2">
                            <span className="w-2 h-8 bg-purple-500 dark:bg-neon-purple rounded-full shadow-sm dark:shadow-neon-blue"></span>
                            {t('dashboard.strategicInsights')}
                        </h2>
                        <div className="space-y-4">
                            {loading ? <p className="text-slate-500 animate-pulse">{t('dashboard.decrypting')}</p> : insights.map((item, index) => (
                                <div key={index} className="relative p-5 bg-slate-100 dark:bg-white/5 rounded-xl border border-slate-200 dark:border-white/5 hover:border-purple-400/40 dark:hover:border-neon-purple/40 transition-all duration-300 group">
                                    <div className="absolute top-0 right-0 w-20 h-20 bg-purple-500/10 dark:bg-neon-purple/10 rounded-full blur-2xl -mr-10 -mt-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                    <div className="flex justify-between items-start mb-3 relative z-10">
                                        <div>
                                            <h3 className="font-bold text-lg text-slate-800 dark:text-white">{item.country}</h3>
                                            <span className="text-xs text-blue-600 dark:text-neon-blue font-mono uppercase tracking-wider">{item.leaderName}</span>
                                        </div>
                                        <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wide border ${item.focusArea === 'Economy' ? 'border-green-500 text-green-600 bg-green-100 dark:border-neon-green dark:text-neon-green dark:bg-neon-green/10' :
                                            item.focusArea === 'Defense' ? 'border-red-500 text-red-600 bg-red-100 dark:border-neon-red dark:text-neon-red dark:bg-neon-red/10' :
                                                'border-blue-500 text-blue-600 bg-blue-100 dark:border-neon-blue dark:text-neon-blue dark:bg-neon-blue/10'
                                            }`}>
                                            {item.focusArea}
                                        </span>
                                    </div>
                                    <p className="text-sm text-slate-600 dark:text-slate-300 italic leading-relaxed relative z-10 border-l-2 border-slate-300 dark:border-white/20 pl-3">
                                        "{item.visionQuote}"
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
}

export default Dashboard;
