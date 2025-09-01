"use client";

import { useState } from 'react';
import { Logo } from './Logo';
import { LanguageSelector } from './LanguageSelector';
import { ThemeToggle } from './ThemeToggle';
import { Locale } from '@/lib/i18n';

export function Header({ lang, dict }: { lang: Locale; dict: any }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: dict.nav.about, href: '#sobre' },
    { name: dict.nav.projects, href: '#projetos' },
    { name: dict.nav.skills, href: '#habilidades' },
    { name: dict.nav.contact, href: '#contato' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md border-b border-slate-300 dark:bg-slate-900/80 dark:border-slate-600 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Logo />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            <div className="flex items-baseline space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className="text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 px-3 py-2 text-sm font-medium transition-colors relative group"
                >
                  {item.name}
                  <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-blue-600 group-hover:w-full group-hover:left-0 transition-all duration-300 ease-out"></span>
                </button>
              ))}
            </div>
            <LanguageSelector currentLang={lang} />
            <ThemeToggle />
            <button
              onClick={() => scrollToSection('#contato')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              {dict.nav.contactButton}
            </button>
          </div>

          {/* Mobile menu button and theme toggle */}
          <div className="md:hidden flex items-center space-x-1">
            <LanguageSelector currentLang={lang} />
            <ThemeToggle />
            <button
              type="button"
              className="text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 focus:outline-none focus:text-slate-800 dark:focus:text-slate-200"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white dark:bg-slate-900 border-t border-slate-300 dark:border-slate-600">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => {
                    scrollToSection(item.href);
                    setIsMenuOpen(false);
                  }}
                  className="text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 block px-3 py-2 text-base font-medium transition-colors relative group w-full text-left"
                >
                  {item.name}
                  <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-blue-600 group-hover:w-full group-hover:left-0 transition-all duration-300 ease-out"></span>
                </button>
              ))}
              <div className="pt-2">
                <button
                  onClick={() => {
                    scrollToSection('#contato');
                    setIsMenuOpen(false);
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white block px-3 py-2 rounded-lg text-base font-medium transition-colors text-center w-full"
                >
                  {dict.nav.contactButton}
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}