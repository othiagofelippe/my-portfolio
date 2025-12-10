"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { HiOutlineChevronUp } from "react-icons/hi2";
import { useAudio } from "@/context/AudioContext";

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const audio = useAudio();

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    audio.play("uiExpand");
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed right-6 bottom-6 z-40"
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <motion.button
            onClick={scrollToTop}
            className="relative p-4 bg-accent-brand hover:bg-accent-brand/90 text-text-label rounded-full shadow-lg cursor-pointer group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            aria-label="Voltar ao topo"
          >
            <motion.div
              animate={{ rotate: [0, -2, 2, 0] }}
              transition={{ duration: 0.3 }}
            >
              <HiOutlineChevronUp className="w-6 h-6" />
            </motion.div>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
