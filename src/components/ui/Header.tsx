"use client";

import { Locale } from "@/src/lib/i18n";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { HiOutlineBars3, HiOutlineXMark } from "react-icons/hi2";
import useSound from "use-sound";
import { LanguageSelector } from "./LanguageSelector";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";

export function Header({ lang, dict }: { lang: Locale; dict: any }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [playMenuToggle] = useSound("/sounds/ui-expand.mp3", { volume: 0.4 });
  const [playButtonClick] = useSound("/sounds/button-click.mp3", {
    volume: 0.5,
  });

  const navItems = [
    { name: dict.nav.experience, href: "#experiencia" },
    // { name: dict.nav.projects, href: '#projetos' },
    { name: dict.nav.skills, href: "#habilidades" },
    { name: dict.nav.contact, href: "#contato" },
  ];

  const scrollToSection = (href: string) => {
    playButtonClick();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const scrollToSectionSilent = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const toggleMenu = () => {
    playMenuToggle();
    setIsMenuOpen(!isMenuOpen);
  };

  const handleContactClick = () => {
    playButtonClick();
    setTimeout(() => scrollToSectionSilent("#contato"), 100);
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
                  className="font-roboto text-sm font-normal text-text-body dark:text-text-body-dark hover:text-text-headline dark:hover:text-text-headline-dark px-3 py-2 transition-colors relative group cursor-pointer"
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
              onClick={handleContactClick}
              className="font-roboto text-sm font-medium bg-accent-brand hover:bg-accent-brand-dark text-text-label px-4 py-2 rounded-lg transition-colors cursor-pointer"
            >
              {dict.nav.contactButton}
            </button>
          </div>

          {/* Mobile menu button and theme toggle */}
          <div className="lg:hidden flex items-center space-x-1 sm:space-x-2">
            <LanguageSelector currentLang={lang} />
            <ThemeToggle />
            <motion.button
              type="button"
              className="text-text-body dark:text-text-body-dark hover:text-text-headline dark:hover:text-text-headline-dark focus:outline-none p-2 cursor-pointer"
              onClick={toggleMenu}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <div className="relative w-6 h-6">
                <AnimatePresence mode="wait">
                  {!isMenuOpen ? (
                    <motion.div
                      key="hamburger"
                      initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
                      animate={{ opacity: 1, rotate: 0, scale: 1 }}
                      exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="absolute inset-0"
                    >
                      <HiOutlineBars3 className="w-6 h-6" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="close"
                      initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
                      animate={{ opacity: 1, rotate: 0, scale: 1 }}
                      exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="absolute inset-0"
                    >
                      <HiOutlineXMark className="w-6 h-6" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="lg:hidden"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <div className="px-2 pt-2 pb-3 space-y-1 bg-background-primary dark:bg-background-primary-dark border-t border-border-primary">
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.name}
                    onClick={() => {
                      scrollToSection(item.href);
                      playMenuToggle();
                      setIsMenuOpen(false);
                    }}
                    className="font-roboto text-base font-normal text-text-body dark:text-text-body-dark hover:text-text-headline dark:hover:text-text-headline-dark block px-3 py-2 relative group w-full text-left cursor-pointer"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: index * 0.1,
                      duration: 0.3,
                    }}
                    whileHover={{ scale: 1.02, x: 4 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {item.name}
                    <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-accent-brand group-hover:w-full group-hover:left-0 transition-all duration-300 ease-out"></span>
                  </motion.button>
                ))}
                <div className="pt-2">
                  <motion.button
                    onClick={() => {
                      playButtonClick();
                      setIsMenuOpen(false);
                      setTimeout(() => scrollToSectionSilent("#contato"), 300);
                    }}
                    className="font-roboto text-base font-medium bg-accent-brand hover:bg-accent-brand-dark text-text-label block px-3 py-2 rounded-lg text-center w-full cursor-pointer"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: navItems.length * 0.1 + 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {dict.nav.contactButton}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
