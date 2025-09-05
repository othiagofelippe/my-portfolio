"use client";

import { useState, useEffect } from 'react';
import { HiOutlineChevronUp } from 'react-icons/hi2';

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  // Controla a visibilidade do botão baseado na posição do scroll
  useEffect(() => {
    const toggleVisibility = () => {
      // Mostra o botão quando o usuário rolar 300px
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-8 right-8 bg-accent-brand hover:bg-accent-brand-dark text-text-label p-4 rounded-full shadow-2xl transition-all duration-300 z-[9999] group ${
        isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-50 pointer-events-none'
      }`}
      aria-label="Voltar ao topo"
    >
      <HiOutlineChevronUp className="w-8 h-8 group-hover:animate-bounce" />
    </button>
  );
}
