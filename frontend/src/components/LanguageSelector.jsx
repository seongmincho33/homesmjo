import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSelector = () => {
    const { i18n } = useTranslation();

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };

    return (
        <div className="flex items-center gap-2 bg-white/50 dark:bg-black/20 backdrop-blur-sm p-1 rounded-lg border border-slate-200 dark:border-white/10">
            <button
                onClick={() => changeLanguage('ko')}
                className={`px-2 py-1 text-xs font-bold rounded transition-colors ${i18n.language === 'ko'
                        ? 'bg-blue-600 text-white dark:bg-neon-blue dark:text-black'
                        : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                    }`}
            >
                KO
            </button>
            <div className="w-px h-3 bg-slate-300 dark:bg-white/20"></div>
            <button
                onClick={() => changeLanguage('en')}
                className={`px-2 py-1 text-xs font-bold rounded transition-colors ${i18n.language === 'en'
                        ? 'bg-blue-600 text-white dark:bg-neon-blue dark:text-black'
                        : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                    }`}
            >
                EN
            </button>
        </div>
    );
};

export default LanguageSelector;
