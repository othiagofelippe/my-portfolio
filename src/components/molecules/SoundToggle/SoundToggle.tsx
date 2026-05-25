"use client";

import { useAudio } from "@/context/AudioContext";
import { motion, AnimatePresence } from "motion/react";
import { Volume2, VolumeX } from "@tfds/icons";

export function SoundToggle() {
  const { muted, toggleMute, play } = useAudio();

  const handleToggle = () => {
    if (muted) {
      toggleMute();
      setTimeout(() => play("buttonClick"), 50);
    } else {
      play("buttonClick");
      setTimeout(toggleMute, 100);
    }
  };

  return (
    <motion.button
      onClick={handleToggle}
      className="p-2 rounded-lg text-text-secondary hover:text-action-primary hover:bg-bg-default/30 cursor-pointer"
      aria-label={muted ? "Enable sound effects" : "Disable sound effects"}
      title={muted ? "Enable sound effects" : "Disable sound effects"}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <div className="relative w-5 h-5">
        <AnimatePresence mode="wait">
          {muted ? (
            <motion.div
              key="muted"
              initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
              transition={{ duration: 0.18, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <VolumeX className="w-5 h-5" />
            </motion.div>
          ) : (
            <motion.div
              key="unmuted"
              initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
              transition={{ duration: 0.18, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <Volume2 className="w-5 h-5" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.button>
  );
}
