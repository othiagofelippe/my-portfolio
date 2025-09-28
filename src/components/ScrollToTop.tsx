"use client";

import { useState, useEffect } from 'react';
import { HiOutlineChevronUp } from 'react-icons/hi2';
import { motion, AnimatePresence } from 'motion/react';
import useSound from 'use-sound';

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [playScrollSound] = useSound('/sounds/ui-expand.mp3', { volume: 0.4 });

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
    playScrollSound();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-accent-brand hover:bg-accent-brand-dark text-text-label p-4 rounded-full shadow-2xl z-[9999] cursor-pointer"
          aria-label="Voltar ao topo"
          initial={{ opacity: 0, scale: 0, y: 20 }}
          animate={{ 
            opacity: 1, 
            scale: 1, 
            y: 0,
            rotate: [0, -2, 2, 0]
          }}
          exit={{ opacity: 0, scale: 0, y: 20 }}
          transition={{ 
            type: "spring",
            stiffness: 300,
            damping: 20,
            rotate: { duration: 2, repeat: Infinity, repeatType: "reverse" }
          }}
          whileHover={{ 
            scale: 1.1, 
            rotate: 0,
            transition: { duration: 0.2 }
          }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div
            animate={{ y: [-1, 1, -1] }}
            transition={{
              duration: 2,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "reverse"
            }}
          >
            <HiOutlineChevronUp className="w-8 h-8" />
          </motion.div>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
