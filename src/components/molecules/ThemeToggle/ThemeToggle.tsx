"use client";

import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';
import { HiOutlineSun, HiOutlineMoon } from 'react-icons/hi2';
import { MdOutlineWaves } from 'react-icons/md';
import { motion, AnimatePresence } from 'motion/react';
import { useAudio } from '@/context/AudioContext';

type Theme = 'light' | 'dark' | 'ocean-sunset';

const THEME_CYCLE: Theme[] = ['light', 'dark', 'ocean-sunset'];

const NEXT_THEME_LABEL: Record<Theme, string> = {
  light: 'Switch to dark mode',
  dark: 'Switch to ocean sunset mode',
  'ocean-sunset': 'Switch to light mode',
};

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const audio = useAudio();

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentTheme = (resolvedTheme as Theme) ?? 'light';

  const cycleTheme = () => {
    audio.play('themeToggle');
    const currentIndex = THEME_CYCLE.indexOf(currentTheme);
    const nextTheme = THEME_CYCLE[(currentIndex + 1) % THEME_CYCLE.length];
    setTheme(nextTheme);
  };

  if (!mounted) {
    return <div className="p-2 w-9 h-9 rounded-lg" />;
  }

  return (
    <motion.button
      onClick={cycleTheme}
      className="p-2 rounded-lg text-text-body hover:text-accent-brand hover:bg-background-secondary/30 cursor-pointer"
      aria-label={NEXT_THEME_LABEL[currentTheme]}
      title={NEXT_THEME_LABEL[currentTheme]}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <div className="relative w-5 h-5">
        <AnimatePresence mode="wait">
          {currentTheme === 'light' && (
            <motion.div
              key="sun"
              initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
              transition={{ duration: 0.18, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <HiOutlineSun className="w-5 h-5 text-accent-brand" />
            </motion.div>
          )}
          {currentTheme === 'dark' && (
            <motion.div
              key="moon"
              initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
              transition={{ duration: 0.18, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <HiOutlineMoon className="w-5 h-5 text-accent-brand" />
            </motion.div>
          )}
          {currentTheme === 'ocean-sunset' && (
            <motion.div
              key="ocean"
              initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
              transition={{ duration: 0.18, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <MdOutlineWaves className="w-5 h-5 text-accent-brand" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.button>
  );
}
