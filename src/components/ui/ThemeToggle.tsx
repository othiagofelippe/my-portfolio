"use client";

import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';
import { HiOutlineSun, HiOutlineMoon } from 'react-icons/hi2';
import { motion, AnimatePresence } from 'motion/react';
import { useAudio } from '@/context/AudioContext';

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const audio = useAudio();

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    audio.play('themeToggle');
    const newTheme = resolvedTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  };

  const isDark = resolvedTheme === 'dark';

  if (!mounted) {
    return (
      <div className="p-2 w-9 h-9 rounded-lg">
        <div className="w-5 h-5"></div>
      </div>
    );
  }

  return (
    <motion.button
      onClick={toggleTheme}
      className="p-2 rounded-lg text-text-body dark:text-text-body-dark hover:text-accent-brand hover:bg-background-secondary/30 dark:hover:bg-background-secondary/30 cursor-pointer"
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <div className="relative w-5 h-5">
        <AnimatePresence mode="wait">
          {!isDark ? (
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
          ) : (
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
        </AnimatePresence>
      </div>
    </motion.button>
  );
}
