"use client";

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { useAudio } from '@/context/AudioContext';
import { Typography } from '@tfds/react';

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
  const isOcean = resolvedTheme === 'ocean-sunset' || theme === 'ocean-sunset';
  const logoSrc = (isDark || isOcean) ? "/logo-light.svg" : "/logo-dark.svg";

  if (!mounted) {
    return (
      <Link
        href={`/${currentLang}`}
        className="flex items-center space-x-2 sm:space-x-3 hover:opacity-80 transition-opacity"
        onClick={() => audio.play('buttonClick')}
      >
        <div className="w-6 h-6 sm:w-8 sm:h-8" />
        <div className="[--tfds-font-weight-semibold:var(--tfds-font-weight-bold)]">
          <Typography as="span" variant="heading-md" color="primary">
            <span className="hidden sm:inline">Thiago Felippe</span>
            <span className="sm:hidden">T. Felippe</span>
          </Typography>
        </div>
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
        key={(isDark || isOcean) ? 'light' : 'dark'}
      />

      {/* Logo Text */}
      <span className="typography-h5 !font-bold text-text-primary">
        <span className="hidden sm:inline">Thiago Felippe</span>
        <span className="sm:hidden">T. Felippe</span>
      </span>
    </Link>
  );
}
