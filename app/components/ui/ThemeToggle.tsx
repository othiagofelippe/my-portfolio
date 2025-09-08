"use client";

import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';
import { HiOutlineSun, HiOutlineMoon } from 'react-icons/hi2';

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
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
    <button
      onClick={toggleTheme}
      className="p-2 transition-all duration-300 rounded-lg hover:scale-110 text-text-body dark:text-text-body-dark hover:text-accent-brand hover:bg-background-secondary/30 dark:hover:bg-background-secondary/30"
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      <div className="relative w-5 h-5">
        <HiOutlineSun 
          className={`w-5 h-5 absolute inset-0 transition-all duration-500 transform text-accent-brand ${
            !isDark 
              ? 'opacity-100 rotate-0 scale-100' 
              : 'opacity-0 rotate-180 scale-75'
          }`} 
        />
        <HiOutlineMoon 
          className={`w-5 h-5 absolute inset-0 transition-all duration-500 transform text-accent-brand ${
            isDark 
              ? 'opacity-100 rotate-0 scale-100' 
              : 'opacity-0 -rotate-180 scale-75'
          }`} 
        />
      </div>
    </button>
  );
}