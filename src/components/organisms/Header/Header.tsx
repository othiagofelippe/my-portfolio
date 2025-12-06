"use client";

import { Locale } from "@/lib/i18n";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { HiOutlineBars3, HiOutlineXMark } from "react-icons/hi2";
import { Button } from "@/components/atoms";
import { Logo } from "@/components/atoms";
import { useAudio } from "@/context/AudioContext";

export function Header({ lang, dict }: { lang: Locale; dict: any }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const audio = useAudio();

  const navItems = [
    { name: dict.nav.experience, href: "#experiencia" },
    { name: dict.nav.projects, href: '#projetos' },
    { name: dict.nav.skills, href: "#habilidades" },
    { name: dict.nav.contact, href: "#contato" },
  ];

  const scrollToSection = (href: string) => {
    audio.play("buttonClick");
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
    audio.play("uiExpand");
    setIsMenuOpen(!isMenuOpen);
  };

  const handleContactClick = () => {
    audio.play("buttonClick");
    setTimeout(() => scrollToSectionSilent("#contato"), 100);
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-background-primary/80 backdrop-blur-md border-b border-border-primary z-50">
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
                  className="typography-body-sm text-text-body hover:text-text-headline px-3 py-2 transition-colors relative group cursor-pointer"
                >
                  {item.name}
                  <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-accent-brand group-hover:w-full group-hover:left-0 transition-all duration-300 ease-out"></span>
                </button>
              ))}
            </div>
          </div>

          {/* Right side controls */}
          <div className="hidden lg:flex lg:items-center">
            <Button
              onClick={handleContactClick}
              size="sm"
              className="typography-body-sm font-medium bg-accent-brand hover:bg-accent-brand/90 text-text-label transition-colors cursor-pointer"
            >
              {dict.nav.contactButton}
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center">
            <motion.button
              type="button"
              className="text-text-body hover:text-text-headline focus:outline-none p-2 cursor-pointer"
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
              <div className="px-2 pt-2 pb-3 space-y-1 bg-background-primary border-t border-border-primary">
                {navItems.map((item, index) => (
                  <motion.button
                  key={item.name}
                  onClick={() => {
                    scrollToSection(item.href);
                    audio.play("uiExpand");
                    setIsMenuOpen(false);
                  }}
                  className="typography-body text-text-body hover:text-text-headline block px-3 py-2 relative group w-full text-left cursor-pointer"
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
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: navItems.length * 0.1 + 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      onClick={() => {
                        audio.play("buttonClick");
                        setIsMenuOpen(false);
                        setTimeout(() => scrollToSectionSilent("#contato"), 300);
                      }}
                      className="typography-body font-medium w-full bg-accent-brand hover:bg-accent-brand/90 text-text-label transition-colors cursor-pointer"
                      size="default"
                    >
                      {dict.nav.contactButton}
                    </Button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
