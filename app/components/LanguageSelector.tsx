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
    const audio = new Audio('/sounds/select-toggle.mp3');
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
        className="px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white text-sm font-medium transition-all duration-200 flex items-center space-x-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 hover:scale-105"
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
          
          <div className={`absolute right-0 mt-2 w-36 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-20 transform transition-all duration-200 ${
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
                      ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
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