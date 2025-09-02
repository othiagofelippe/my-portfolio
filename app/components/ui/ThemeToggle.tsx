"use client";

import { useState } from 'react';
import { HiOutlineSun, HiOutlineMoon } from 'react-icons/hi2';

export function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const playSound = () => {
    const audio = new Audio('/sounds/slash.mp3');
    audio.volume = 0.3;
    audio.play().catch(() => {
      // Ignore audio play errors (user interaction required, etc.)
    });
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    playSound();
    // TODO: Implementar mudança de tema
    console.log('Theme changed to:', newTheme);
  };

  return (
    <button
      onClick={toggleTheme}
      className={`p-2 transition-all duration-300 rounded-lg hover:scale-110 ${
        theme === 'light' 
          ? 'text-yellow-500 hover:text-yellow-600 hover:bg-yellow-50' 
          : 'text-blue-400 hover:text-blue-300 hover:bg-blue-950'
      }`}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      <div className="relative w-5 h-5">
        <HiOutlineSun 
          className={`w-5 h-5 absolute inset-0 transition-all duration-500 transform text-yellow-500 ${
            theme === 'light' 
              ? 'opacity-100 rotate-0 scale-100' 
              : 'opacity-0 rotate-180 scale-75'
          }`} 
        />
        <HiOutlineMoon 
          className={`w-5 h-5 absolute inset-0 transition-all duration-500 transform text-blue-400 ${
            theme === 'dark' 
              ? 'opacity-100 rotate-0 scale-100' 
              : 'opacity-0 -rotate-180 scale-75'
          }`} 
        />
      </div>
    </button>
  );
}