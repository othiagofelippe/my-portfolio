"use client";

import { Locale } from "@/lib/i18n";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { HiOutlineBars3, HiOutlineXMark } from "react-icons/hi2";
import { Button, Logo } from "@/components/atoms";
import { LanguageSelector, ThemeToggle, SoundToggle } from "@/components/molecules";
import { useAudio } from "@/context/AudioContext";
import { useActiveSection } from "@/hooks/useActiveSection";

interface HeaderDict {
  nav: {
    experience: string;
    projects: string;
    skills: string;
    contact: string;
  };
}

export function Header({ lang, dict }: { lang: Locale; dict: HeaderDict }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const audio = useAudio();

  const navItems = [
    { name: dict.nav.experience, href: "#experiencia", id: "experiencia" },
    { name: dict.nav.projects, href: '#projetos', id: "projetos" },
    { name: dict.nav.skills, href: "#habilidades", id: "habilidades" },
    { name: dict.nav.contact, href: "#contato", id: "contato" },
  ];

  const activeSection = useActiveSection(navItems.map((item) => item.id));

  const scrollToSection = (href: string) => {
    audio.play("buttonClick");
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const toggleMenu = () => {
    audio.play("uiExpand");
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-background-primary/80 backdrop-blur-md border-b border-border-primary z-50">
      <nav aria-label="Navegação principal" className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16">
          <div className="flex-shrink-0">
            <Logo />
          </div>

          {/* Desktop Navigation - Centered */}
          <div className="hidden lg:flex lg:items-center justify-center flex-1">
            <div className="flex items-baseline space-x-6">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <Button
                    key={item.id}
                    asChild
                    variant="ghost"
                    size="sm"
                    onClick={() => scrollToSection(item.href)}
                    className={`relative ${isActive ? "text-text-headline" : "text-text-body"}`}
                  >
                    <a href={item.href}>
                      {item.name}
                      <motion.span
                        className="absolute bottom-0 left-0 h-0.5 bg-accent-brand"
                        animate={{ width: isActive ? "100%" : "0%" }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                      />
                    </a>
                  </Button>
                );
              })}
            </div>
          </div>

          {/* Desktop right controls */}
          <div className="hidden lg:flex lg:items-center gap-1">
            <SoundToggle />
            <ThemeToggle />
            <LanguageSelector currentLang={lang} />
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center gap-1">
            <SoundToggle />
            <ThemeToggle />
            <LanguageSelector currentLang={lang} />
            <motion.button
              type="button"
              className="text-text-body hover:text-text-headline focus:outline-none p-2 cursor-pointer"
              onClick={toggleMenu}
              aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
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
                      <HiOutlineBars3 className="w-6 h-6" aria-hidden="true" />
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
                      <HiOutlineXMark className="w-6 h-6" aria-hidden="true" />
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
              id="mobile-menu"
              className="lg:hidden"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <div className="px-2 pt-2 pb-3 space-y-1 bg-background-primary border-t border-border-primary">
                {navItems.map((item, index) => {
                  const isActive = activeSection === item.id;
                  return (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.3 }}
                      whileHover={{ x: 4 }}
                    >
                      <Button
                        asChild
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          scrollToSection(item.href);
                          setIsMenuOpen(false);
                        }}
                        className={`relative w-full justify-start ${isActive ? "text-text-headline" : "text-text-body"}`}
                      >
                        <a href={item.href}>
                          {item.name}
                          <motion.span
                            className="absolute bottom-0 left-0 h-0.5 bg-accent-brand"
                            animate={{ width: isActive ? "100%" : "0%" }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                          />
                        </a>
                      </Button>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
