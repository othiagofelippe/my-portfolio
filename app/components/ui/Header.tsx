"use client";

import { useState } from 'react';
import { HiOutlineBars3, HiOutlineXMark } from 'react-icons/hi2';
import { Logo } from './Logo';
import { LanguageSelector } from './LanguageSelector';
import { ThemeToggle } from './ThemeToggle';
import { Locale } from '@/lib/i18n';

export function Header({ lang, dict }: { lang: Locale; dict: any }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: dict.nav.experience, href: '#experiencia' },
    // { name: dict.nav.projects, href: '#projetos' },
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
    <header className="fixed top-0 left-0 right-0 bg-background-primary/80 backdrop-blur-md border-b border-border-primary dark:bg-background-primary-dark/80 z-50">
      <nav className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16">
          <div className="flex-shrink-0">
            <Logo />
          </div>

          {/* Desktop Navigation - Centered */}
          <div className="hidden lg:flex lg:items-center justify-center flex-1">
            <div className="flex items-baseline space-x-6">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className="font-roboto text-sm font-normal text-text-body dark:text-text-body-dark hover:text-text-headline dark:hover:text-text-headline-dark px-3 py-2 transition-colors relative group"
                >
                  {item.name}
                  <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-accent-brand group-hover:w-full group-hover:left-0 transition-all duration-300 ease-out"></span>
                </button>
              ))}
            </div>
          </div>

          {/* Right side controls */}
          <div className="hidden lg:flex lg:items-center lg:space-x-4">
            <LanguageSelector currentLang={lang} />
            <ThemeToggle />
            <button
              onClick={() => scrollToSection('#contato')}
              className="font-roboto text-sm font-medium bg-accent-brand hover:bg-accent-brand-dark text-text-label px-4 py-2 rounded-lg transition-colors"
            >
              {dict.nav.contactButton}
            </button>
          </div>

          {/* Mobile menu button and theme toggle */}
          <div className="lg:hidden flex items-center space-x-1 sm:space-x-2">
            <LanguageSelector currentLang={lang} />
            <ThemeToggle />
            <button
              type="button"
              className="text-text-body dark:text-text-body-dark hover:text-text-headline dark:hover:text-text-headline-dark focus:outline-none p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <div className="relative w-6 h-6">
                <HiOutlineBars3 
                  className={`w-6 h-6 absolute inset-0 transition-all duration-500 transform ${
                    !isMenuOpen 
                      ? 'opacity-100 rotate-0 scale-100' 
                      : 'opacity-0 rotate-180 scale-75'
                  }`} 
                />
                <HiOutlineXMark 
                  className={`w-6 h-6 absolute inset-0 transition-all duration-500 transform ${
                    isMenuOpen 
                      ? 'opacity-100 rotate-0 scale-100' 
                      : 'opacity-0 -rotate-180 scale-75'
                  }`} 
                />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-background-primary dark:bg-background-primary-dark border-t border-border-primary">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => {
                    scrollToSection(item.href);
                    setIsMenuOpen(false);
                  }}
                  className="font-roboto text-base font-normal text-text-body dark:text-text-body-dark hover:text-text-headline dark:hover:text-text-headline-dark block px-3 py-2 transition-colors relative group w-full text-left"
                >
                  {item.name}
                  <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-accent-brand group-hover:w-full group-hover:left-0 transition-all duration-300 ease-out"></span>
                </button>
              ))}
              <div className="pt-2">
                <button
                  onClick={() => {
                    scrollToSection('#contato');
                    setIsMenuOpen(false);
                  }}
                  className="font-roboto text-base font-medium bg-accent-brand hover:bg-accent-brand-dark text-text-label block px-3 py-2 rounded-lg transition-colors text-center w-full"
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