"use client";

import { AnimatePresence, motion, useSpring, useTransform, useMotionValue } from "motion/react";
import { useEffect, useState } from "react";
import { ChevronUp } from "@tfds/icons";
import { useAudio } from "@/context/AudioContext";

const BUTTON_SIZE = 56;
const RADIUS = 24;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const audio = useAudio();

  const rawProgress = useMotionValue(0);
  const smoothProgress = useSpring(rawProgress, { stiffness: 80, damping: 20, mass: 0.5 });
  const strokeDashoffset = useTransform(smoothProgress, (v) => CIRCUMFERENCE * (1 - v));

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      rawProgress.set(docHeight > 0 ? scrollTop / docHeight : 0);
      setIsVisible(scrollTop > 300);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [rawProgress]);

  const scrollToTop = () => {
    audio.play("uiExpand");
    window.scrollTo({ top: 0, behavior: "smooth" });
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
            className="relative bg-accent-brand hover:bg-accent-brand/90 text-text-label rounded-full shadow-lg cursor-pointer"
            style={{ width: BUTTON_SIZE, height: BUTTON_SIZE }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            aria-label="Voltar ao topo"
          >
            {/* Progress ring */}
            <svg
              className="absolute inset-0 -rotate-90"
              width={BUTTON_SIZE}
              height={BUTTON_SIZE}
              aria-hidden="true"
            >
              <circle
                cx={BUTTON_SIZE / 2}
                cy={BUTTON_SIZE / 2}
                r={RADIUS}
                fill="none"
                stroke="rgba(255,255,255,0.2)"
                strokeWidth={2.5}
              />
              <motion.circle
                cx={BUTTON_SIZE / 2}
                cy={BUTTON_SIZE / 2}
                r={RADIUS}
                fill="none"
                stroke="white"
                strokeWidth={2.5}
                strokeLinecap="round"
                strokeDasharray={CIRCUMFERENCE}
                strokeDashoffset={strokeDashoffset}
              />
            </svg>

            {/* Icon */}
            <span className="absolute inset-0 flex items-center justify-center">
              <ChevronUp className="w-5 h-5" />
            </span>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
