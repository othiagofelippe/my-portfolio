"use client";

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function Logo() {
  const pathname = usePathname();
  const currentLang = pathname.split('/')[1] || 'pt';
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = resolvedTheme === 'dark' || theme === 'dark';
  const logoSrc = isDark ? "/logo-light.svg" : "/logo-dark.svg";

  if (!mounted) {
    return (
      <Link
        href={`/${currentLang}`}
        className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
      >
        <div className="w-8 h-8" />
        <span className="text-xl font-bold text-text-headline dark:text-text-headline-dark">
          Thiago Felippe
        </span>
      </Link>
    );
  }

  return (
    <Link
      href={`/${currentLang}`}
      className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
    >
      {/* Logo SVG */}
      <Image
        src={logoSrc}
        alt="Thiago Felippe Logo"
        width={32}
        height={32}
        className="w-8 h-8"
        key={isDark ? 'dark' : 'light'}
      />

      {/* Logo Text */}
      <span className="text-xl font-bold text-text-headline dark:text-text-headline-dark">
        Thiago Felippe
      </span>
    </Link>
  );
}
