"use client";

import { useState, useEffect } from 'react';

export function LanguageSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('pt-br');

  const languages = [
    { code: 'pt-br', name: 'PT', fullName: 'Português' },
    { code: 'en', name: 'EN', fullName: 'English' },
    { code: 'es', name: 'ES', fullName: 'Español' }
  ];

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

  const handleLanguageChange = (languageCode: string) => {
    setCurrentLanguage(languageCode);
    setIsOpen(false);
    playChangeSound();
    // TODO: Implementar mudança de idioma
    console.log('Language changed to:', languageCode);
  };

  const handleClose = () => {
    setIsOpen(false);
    playToggleSound();
  };

  const getCurrentLanguage = () => {
    return languages.find(lang => lang.code === currentLanguage) || languages[0];
  };

  return (
    <div className="relative">
      <button
        onClick={handleToggle}
        className="px-3 py-2 text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 text-sm font-medium transition-all duration-200 flex items-center space-x-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 hover:scale-105"
        aria-label="Language selector"
      >
        <span>{getCurrentLanguage().name}</span>
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
                  onClick={() => handleLanguageChange(language.code)}
                  className={`w-full text-left px-4 py-2 text-sm transition-all duration-150 flex items-center justify-between hover:scale-[0.98] ${
                    currentLanguage === language.code
                      ? 'bg-cyan-50 dark:bg-cyan-900/20 text-cyan-700 dark:text-cyan-300'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'
                  }`}
                  style={{
                    transitionDelay: isOpen ? `${index * 30}ms` : '0ms'
                  }}
                >
                  <span className="transition-transform duration-150 hover:translate-x-1">{language.fullName}</span>
                  <span className="font-medium">{language.name}</span>
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
