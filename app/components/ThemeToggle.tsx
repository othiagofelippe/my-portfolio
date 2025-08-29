"use client";

import { useState } from 'react';
import { HiOutlineSun, HiOutlineMoon } from 'react-icons/hi2';

export function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    // TODO: Implementar mudança de tema
    console.log('Theme changed to:', newTheme);
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-all duration-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 hover:scale-110"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      <div className="relative w-5 h-5">
        <HiOutlineSun 
          className={`w-5 h-5 absolute inset-0 transition-all duration-500 transform ${
            theme === 'light' 
              ? 'opacity-100 rotate-0 scale-100' 
              : 'opacity-0 rotate-180 scale-75'
          }`} 
        />
        <HiOutlineMoon 
          className={`w-5 h-5 absolute inset-0 transition-all duration-500 transform ${
            theme === 'dark' 
              ? 'opacity-100 rotate-0 scale-100' 
              : 'opacity-0 -rotate-180 scale-75'
          }`} 
        />
      </div>
    </button>
  );
}