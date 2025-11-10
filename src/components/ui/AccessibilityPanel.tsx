"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { usePathname, useRouter } from "next/navigation";
import { Locale } from "@/lib/i18n";
import {
  HiOutlineSpeakerWave,
  HiOutlineSpeakerXMark,
  HiOutlineAdjustmentsHorizontal,
  HiOutlineSun,
  HiOutlineMoon,
  HiOutlineXMark,
} from "react-icons/hi2";
import { Button } from "./button";
import { Switch } from "./switch";
import { ToggleGroup, ToggleGroupItem } from "./toggle-group";
import useSound from "use-sound";

interface AccessibilitySettings {
  soundEnabled: boolean;
  language: 'pt' | 'en' | 'es';
}

export function AccessibilityPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();
  const router = useRouter();
  const pathname = usePathname();
  const [playToggleSound] = useSound("/sounds/ui-expand.mp3", { volume: 0.4 });
  const [playClickSound] = useSound("/sounds/button-click.mp3", { volume: 0.3 });
  const [playThemeSound] = useSound("/sounds/theme-toggle.mp3", { volume: 0.5 });
  const [playLanguageSound] = useSound("/sounds/page-transition.mp3", { volume: 0.5 });

  const [settings, setSettings] = useState<AccessibilitySettings>({
    soundEnabled: true,
    language: 'pt',
  });

  const getCurrentLanguage = (): Locale => {
    const pathSegments = pathname.split('/');
    const langFromPath = pathSegments[1] as Locale;
    return ['pt', 'en', 'es'].includes(langFromPath) ? langFromPath : 'pt';
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleTogglePanel = () => {
    setIsOpen(!isOpen);
    playToggleSound();
  };

  const handleSettingChange = (key: keyof AccessibilitySettings, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));

    if (key === 'language') {
      handleLanguageChange(value as Locale);
    } else {
      playClickSound();
    }
  };

  const handleLanguageChange = (locale: Locale) => {
    playLanguageSound();

    const newPathname = pathname.replace(/^\/[a-z]{2}/, `/${locale}`);
    router.push(newPathname);
  };

  const handleThemeChange = (newTheme: 'light' | 'dark') => {
    setTheme(newTheme);
    playThemeSound();
  };


  const languageOptions = [
    { code: 'pt', name: 'Português', flag: '🇧🇷' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
  ];


  return (
    <>
      {/* Botão Flutuante */}
      <motion.div
        className="fixed right-6 bottom-24 z-50"
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1 }}
      >
        <motion.button
          onClick={handleTogglePanel}
          className="relative p-4 bg-accent-brand hover:bg-accent-brand-dark text-text-label rounded-full shadow-lg cursor-pointer group"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
          aria-label="Abrir painel de acessibilidade"
        >
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <HiOutlineAdjustmentsHorizontal className="w-6 h-6" />
          </motion.div>

        </motion.button>
      </motion.div>

      {/* Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
              onClick={handleTogglePanel}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            />

            {/* Panel Content */}
            <motion.div
              className="fixed right-4 sm:right-6 bottom-4 sm:bottom-32 w-[calc(100vw-2rem)] sm:w-80 max-w-sm max-h-[calc(100vh-8rem)] bg-background-primary dark:bg-background-tertiary rounded-2xl shadow-xl border border-border-primary z-50 overflow-hidden flex flex-col"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-3 sm:p-4 border-b border-border-primary flex-shrink-0">
                <h3 className="font-poppins text-base sm:text-lg font-semibold text-text-headline dark:text-text-headline-dark">
                  Acessibilidade
                </h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleTogglePanel}
                  className="h-7 w-7 sm:h-8 sm:w-8 text-black dark:text-white hover:bg-accent-brand/10 hover:text-accent-brand"
                >
                  <HiOutlineXMark className="w-3 h-3 sm:w-4 sm:h-4" />
                </Button>
              </div>

              {/* Content */}
              <div className="p-3 sm:p-4 space-y-4 sm:space-y-6 overflow-y-auto flex-1">
                {/* Tema */}
                <div className="space-y-2 sm:space-y-3">
                  <h4 className="font-roboto text-xs sm:text-sm font-medium text-text-heading dark:text-text-heading-dark">
                    Tema
                  </h4>
                  <ToggleGroup
                    type="single"
                    variant="outline"
                    value={mounted ? resolvedTheme || 'light' : 'light'}
                    onValueChange={(value) => {
                      if (value && mounted) {
                        handleThemeChange(value as 'light' | 'dark');
                      }
                    }}
                    className="grid w-full grid-cols-2"
                  >
                    <ToggleGroupItem
                      value="light"
                      className="text-xs sm:text-sm h-8 sm:h-9 !bg-white data-[state=on]:!bg-accent-brand data-[state=on]:!text-white data-[state=on]:!border-accent-brand"
                      disabled={!mounted}
                    >
                      <HiOutlineSun className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                      Claro
                    </ToggleGroupItem>
                    <ToggleGroupItem
                      value="dark"
                      className="text-xs sm:text-sm h-8 sm:h-9 !bg-white data-[state=on]:!bg-accent-brand data-[state=on]:!text-white data-[state=on]:!border-accent-brand"
                      disabled={!mounted}
                    >
                      <HiOutlineMoon className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                      Escuro
                    </ToggleGroupItem>
                  </ToggleGroup>
                </div>

                {/* Sons */}
                <div className="space-y-2 sm:space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {settings.soundEnabled ? (
                        <HiOutlineSpeakerWave className="w-4 h-4 text-text-heading dark:text-text-heading-dark" />
                      ) : (
                        <HiOutlineSpeakerXMark className="w-4 h-4 text-text-span dark:text-text-span-dark" />
                      )}
                      <h4 className="font-roboto text-xs sm:text-sm font-medium text-text-heading dark:text-text-heading-dark">
                        Efeitos Sonoros
                      </h4>
                    </div>
                    <Switch
                      checked={settings.soundEnabled}
                      onCheckedChange={(checked) => handleSettingChange('soundEnabled', checked)}
                      className="data-[state=checked]:!bg-accent-brand"
                    />
                  </div>
                </div>


                {/* Idioma */}
                <div className="space-y-2 sm:space-y-3">
                  <h4 className="font-roboto text-xs sm:text-sm font-medium text-text-heading dark:text-text-heading-dark">
                    Idioma
                  </h4>
                  <ToggleGroup
                    type="single"
                    variant="outline"
                    value={getCurrentLanguage()}
                    onValueChange={(value) => {
                      if (value) {
                        handleSettingChange('language', value);
                      }
                    }}
                    className="grid w-full grid-cols-3 gap-1"
                  >
                    {languageOptions.map((lang) => (
                      <ToggleGroupItem
                        key={lang.code}
                        value={lang.code}
                        className="text-xs sm:text-sm h-12 sm:h-14 flex flex-col gap-0.5 p-1 !bg-white data-[state=on]:!bg-accent-brand data-[state=on]:!text-white data-[state=on]:!border-accent-brand"
                      >
                        <span className="text-sm">{lang.flag}</span>
                        <span className="text-xs font-medium">{lang.code.toUpperCase()}</span>
                      </ToggleGroupItem>
                    ))}
                  </ToggleGroup>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
