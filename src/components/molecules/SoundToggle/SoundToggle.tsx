'use client'

import { useAudio } from '@/context/AudioContext'
import { cn } from '@/lib/utils'
import { motion, AnimatePresence } from 'motion/react'
import { buttonVariants } from '@tfds/components'
import { Volume2, VolumeX } from '@tfds/icons'

export function SoundToggle() {
  const { muted, toggleMute, play } = useAudio()

  const handleToggle = () => {
    if (muted) {
      toggleMute()
      setTimeout(() => play('buttonClick'), 50)
    } else {
      play('buttonClick')
      setTimeout(toggleMute, 100)
    }
  }

  return (
    <button
      type="button"
      onClick={handleToggle}
      className={cn(buttonVariants({ variant: 'ghost', size: 'icon' }))}
      aria-label={muted ? 'Enable sound effects' : 'Disable sound effects'}
      title={muted ? 'Enable sound effects' : 'Disable sound effects'}
    >
      <div className="relative size-4">
        <AnimatePresence mode="wait">
          {muted ? (
            <motion.div
              key="muted"
              initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
              transition={{ duration: 0.18, ease: 'easeInOut' }}
              className="absolute inset-0"
            >
              <VolumeX aria-hidden="true" />
            </motion.div>
          ) : (
            <motion.div
              key="unmuted"
              initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
              transition={{ duration: 0.18, ease: 'easeInOut' }}
              className="absolute inset-0"
            >
              <Volume2 aria-hidden="true" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </button>
  )
}
