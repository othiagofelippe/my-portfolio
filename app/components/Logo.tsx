"use client";

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export function Logo() {
  const pathname = usePathname();
  const currentLang = pathname.split('/')[1] || 'pt';
  
  return (
    <Link href={`/${currentLang}`} className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
      {/* Logo SVG */}
      <Image
        src="/logo-light.svg"
        alt="Thiago Felippe Logo"
        width={32}
        height={32}
        className="w-8 h-8"
      />
      
      {/* Logo Text */}
      <span className="text-xl font-bold text-gray-900 dark:text-white">
        Thiago Felippe
      </span>
    </Link>
  );
}