"use client";

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { useAudio } from '@/context/AudioContext';

export function Logo() {
  const pathname = usePathname();
  const currentLang = pathname.split('/')[1] || 'pt';
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const audio = useAudio();

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = resolvedTheme === 'dark' || theme === 'dark';
  const logoSrc = isDark ? "/logo-light.svg" : "/logo-dark.svg";

  if (!mounted) {
    return (
      <Link
        href={`/${currentLang}`}
        className="flex items-center space-x-2 sm:space-x-3 hover:opacity-80 transition-opacity"
        onClick={() => audio.play('buttonClick')}
      >
        <div className="w-6 h-6 sm:w-8 sm:h-8" />
        <span className="text-base sm:text-lg md:text-xl font-bold text-text-headline">
          <span className="hidden sm:inline">Thiago Felippe</span>
          <span className="sm:hidden">T. Felippe</span>
        </span>
      </Link>
    );
  }

  return (
    <Link
      href={`/${currentLang}`}
      className="flex items-center space-x-2 sm:space-x-3 hover:opacity-80 transition-opacity"
      onClick={() => audio.play('buttonClick')}
    >
      {/* Logo SVG */}
      <Image
        src={logoSrc}
        alt="Thiago Felippe Logo"
        width={32}
        height={32}
        className="w-6 h-6 sm:w-8 sm:h-8"
        key={isDark ? 'dark' : 'light'}
      />

      {/* Logo Text */}
      <span className="text-base sm:text-lg md:text-xl font-bold text-text-headline">
        <span className="hidden sm:inline">Thiago Felippe</span>
        <span className="sm:hidden">T. Felippe</span>
      </span>
    </Link>
  );
}
