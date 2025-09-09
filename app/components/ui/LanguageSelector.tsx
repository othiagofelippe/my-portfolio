"use client";

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Locale, locales, localeNames } from '@/lib/i18n';
import { HiOutlineGlobeAlt, HiOutlineChevronDown } from 'react-icons/hi2';
import { motion, AnimatePresence } from 'motion/react';
import useSound from 'use-sound';

export function LanguageSelector({ currentLang }: { currentLang: Locale }) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  
  const [playToggleSound] = useSound('/sounds/ui-expand.mp3', { volume: 0.4 });
  const [playChangeSound] = useSound('/sounds/page-transition.mp3', { volume: 0.5 });

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
      <motion.button
        onClick={handleToggle}
        className="px-3 py-2 text-text-body dark:text-text-body-dark hover:text-text-headline dark:hover:text-text-headline-dark text-sm font-medium flex items-center space-x-2 rounded-lg hover:bg-background-secondary/30 dark:hover:bg-background-secondary/30"
        aria-label="Language selector"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        <HiOutlineGlobeAlt className="w-4 h-4" />
        <AnimatePresence mode="wait">
          <motion.span
            key={currentLang}
            initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {getCurrentLanguage().flag}
          </motion.span>
        </AnimatePresence>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <HiOutlineChevronDown className="w-4 h-4" />
        </motion.div>
      </motion.button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay para fechar ao clicar fora */}
            <motion.div
              className="fixed inset-0 z-10"
              onClick={handleClose}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            />

            <motion.div 
              className="absolute right-0 mt-2 w-36 bg-background-primary dark:bg-background-tertiary rounded-lg shadow-lg border border-border-primary z-20"
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <div className="py-1">
                {languages.map((language, index) => (
                  <motion.button
                    key={language.code}
                    onClick={() => handleLanguageChange(language.code as Locale)}
                    className={`w-full text-left px-4 py-2 text-sm flex items-center justify-between ${
                      currentLang === language.code
                        ? 'bg-accent-brand/10 text-accent-brand border-l-2 border-accent-brand'
                        : 'text-text-body dark:text-text-body-dark hover:bg-background-secondary/30 dark:hover:bg-background-secondary/30 hover:text-text-headline dark:hover:text-text-headline-dark'
                    }`}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ 
                      delay: index * 0.05,
                      duration: 0.2 
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="flex items-center space-x-2">
                      <span>{language.flag}</span>
                      <span>{language.fullName}</span>
                    </span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
