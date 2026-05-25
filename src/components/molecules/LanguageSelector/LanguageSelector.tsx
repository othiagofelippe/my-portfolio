"use client";

import { Locale, localeNames, locales } from "@/lib/i18n";
import { AnimatePresence, motion } from "motion/react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { ChevronDown, Globe } from "@tfds/icons";
import { useAudio } from "@/context/AudioContext";
import { typographyVariants } from "@tfds/components";
import { cn } from "@/lib/utils";

export function LanguageSelector({ currentLang }: { currentLang: Locale }) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const audio = useAudio();

  const flagEmojis: Record<Locale, string> = {
    pt: "🇧🇷",
    en: "🇺🇸",
    es: "🇪🇸",
  };

  const languages = locales.map((locale) => ({
    code: locale,
    name: locale.toUpperCase(),
    fullName: localeNames[locale],
    flag: flagEmojis[locale],
  }));

  const handleToggle = () => {
    setIsOpen(!isOpen);
    audio.play("uiExpand");
  };

  const handleLanguageChange = (locale: Locale) => {
    setIsOpen(false);
    audio.play("pageTransition");

    const newPathname = pathname.replace(/^\/[a-z]{2}/, `/${locale}`);
    router.push(newPathname);
  };

  const handleClose = () => {
    setIsOpen(false);
    audio.play("uiExpand");
  };

  const getCurrentLanguage = () => {
    return languages.find((lang) => lang.code === currentLang) || languages[0];
  };

  return (
    <div className="relative">
      <motion.button
        onClick={handleToggle}
        className={cn(typographyVariants({ variant: "body-sm" }), "px-3 py-2 font-medium text-text-secondary hover:text-text-primary flex items-center space-x-2 rounded-lg hover:bg-bg-default/30 cursor-pointer")}
        aria-label="Language selector"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        <Globe className="w-4 h-4" />
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={currentLang}
            initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
            transition={{ duration: 0.18, ease: "easeInOut" }}
          >
            {getCurrentLanguage().flag}
          </motion.span>
        </AnimatePresence>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className="w-4 h-4" />
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
              className="absolute right-0 mt-2 w-36 bg-bg-page rounded-lg shadow-lg border border-border-default z-20"
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <div className="py-1">
                {languages.map((language, index) => (
                  <motion.button
                    key={language.code}
                    onClick={() =>
                      handleLanguageChange(language.code as Locale)
                    }
                    className={cn(typographyVariants({ variant: "body-sm" }), `w-full text-left px-4 py-2 flex items-center justify-between cursor-pointer ${
                      currentLang === language.code
                        ? "bg-action-primary/10 text-action-primary border-l-2 border-action-primary"
                        : "text-text-secondary hover:bg-bg-default/30 hover:text-text-primary"
                    }`)}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: index * 0.05,
                      duration: 0.2,
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
