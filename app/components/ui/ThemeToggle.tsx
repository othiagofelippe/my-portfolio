"use client";

import { useState, useEffect } from 'react';
import { HiOutlineSun, HiOutlineMoon } from 'react-icons/hi2';

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Check current theme
    const htmlElement = document.documentElement;
    const currentIsDark = htmlElement.classList.contains('dark');
    setIsDark(currentIsDark);
  }, []);

  const toggleTheme = () => {
    const htmlElement = document.documentElement;
    const newIsDark = !isDark;
    
    console.log('Toggle clicked:', { currentIsDark: isDark, newIsDark });
    console.log('Before - html classes:', htmlElement.classList.toString());
    
    if (newIsDark) {
      htmlElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      htmlElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
    
    console.log('After - html classes:', htmlElement.classList.toString());
    setIsDark(newIsDark);
  };

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