"use client";

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Locale, locales, localeNames } from '@/lib/i18n';
import { HiOutlineGlobeAlt } from 'react-icons/hi2';

export function LanguageSelector({ currentLang }: { currentLang: Locale }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const flagEmojis: Record<Locale, string> = {
    pt: '🇧🇷',
    en: '🇺🇸', 
    es: '🇪🇸'
  };

  const languages = locales.map(locale => ({
    code: locale,
    name: locale.toUpperCase(),
    fullName: localeNames[locale],
    flag: flagEmojis[locale]
  }));

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      const timeout = setTimeout(() => setIsVisible(false), 200);
      return () => clearTimeout(timeout);
    }
  }, [isOpen]);

  const playToggleSound = () => {
    const audio = new Audio('/sounds/mouse-click.mp3');
    audio.volume = 0.3;
    audio.play().catch(() => {
      // Ignore audio play errors
    });
  };

  const playChangeSound = () => {
    const audio = new Audio('/sounds/select-change.mp3');
    audio.volume = 0.3;
    audio.play().catch(() => {
      // Ignore audio play errors
    });
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
    playToggleSound();
  };

  const handleLanguageChange = (locale: Locale) => {
    setIsOpen(false);
    playChangeSound();
    
    // Replace current locale in pathname with new locale
    const newPathname = pathname.replace(/^\/[a-z]{2}/, `/${locale}`);
    router.push(newPathname);
  };

  const handleClose = () => {
    setIsOpen(false);
    playToggleSound();
  };

  const getCurrentLanguage = () => {
    return languages.find(lang => lang.code === currentLang) || languages[0];
  };

  return (
    <div className="relative">
      <button
        onClick={handleToggle}
        className="px-3 py-2 text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 text-sm font-medium transition-all duration-200 flex items-center space-x-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 hover:scale-105"
        aria-label="Language selector"
      >
        <HiOutlineGlobeAlt className="w-4 h-4" />
        <span>{getCurrentLanguage().flag}</span>
        <svg
          className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isVisible && (
        <>
          {/* Overlay para fechar ao clicar fora */}
          <div
            className="fixed inset-0 z-10"
            onClick={handleClose}
          />

          <div className={`absolute right-0 mt-2 w-36 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-300 dark:border-slate-600 z-20 transform transition-all duration-200 ${
            isOpen
              ? 'opacity-100 scale-100 translate-y-0'
              : 'opacity-0 scale-95 -translate-y-2'
          }`}>
            <div className="py-1">
              {languages.map((language, index) => (
                <button
                  key={language.code}
                  onClick={() => handleLanguageChange(language.code as Locale)}
                  className={`w-full text-left px-4 py-2 text-sm transition-all duration-150 flex items-center justify-between hover:scale-[0.98] ${
                    currentLang === language.code
                      ? 'bg-cyan-50 dark:bg-cyan-900/20 text-cyan-700 dark:text-cyan-300'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'
                  }`}
                  style={{
                    transitionDelay: isOpen ? `${index * 30}ms` : '0ms'
                  }}
                >
                  <span className="transition-transform duration-150 hover:translate-x-1 flex items-center space-x-2">
                    <span>{language.flag}</span>
                    <span>{language.fullName}</span>
                  </span>
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
