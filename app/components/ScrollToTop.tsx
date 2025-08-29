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
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-50 group"
          aria-label="Voltar ao topo"
        >
          <HiOutlineChevronUp className="w-6 h-6 group-hover:animate-bounce" />
        </button>
      )}
    </>
  );
}
