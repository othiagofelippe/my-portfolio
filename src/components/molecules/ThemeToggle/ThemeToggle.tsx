'use client'

import { useTheme } from 'next-themes'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { buttonVariants } from '@tfds/react'
import { Sun, Moon, Waves } from '@tfds/icons'
import { useAudio } from '@/context/AudioContext'
import { cn } from '@/lib/utils'

type Theme = 'light' | 'dark' | 'ocean-sunset'

const THEME_CYCLE: Theme[] = ['light', 'dark', 'ocean-sunset']

const THEME_ICONS: Record<Theme, typeof Sun> = {
  light: Sun,
  dark: Moon,
  'ocean-sunset': Waves,
}

const NEXT_THEME_LABEL: Record<Theme, string> = {
  light: 'Switch to dark mode',
  dark: 'Switch to ocean sunset mode',
  'ocean-sunset': 'Switch to light mode',
}

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const audio = useAudio()

  useEffect(() => {
    setMounted(true)
  }, [])

  const currentTheme = (resolvedTheme as Theme) ?? 'light'
  const ThemeIcon = THEME_ICONS[currentTheme]

  const cycleTheme = () => {
    audio.play('themeToggle')
    const currentIndex = THEME_CYCLE.indexOf(currentTheme)
    const nextTheme = THEME_CYCLE[(currentIndex + 1) % THEME_CYCLE.length]
    setTheme(nextTheme)
  }

  if (!mounted) {
    return <div className="size-10" aria-hidden="true" />
  }

  return (
    <button
      type="button"
      onClick={cycleTheme}
      className={cn(buttonVariants({ variant: 'ghost', size: 'icon' }))}
      aria-label={NEXT_THEME_LABEL[currentTheme]}
      title={NEXT_THEME_LABEL[currentTheme]}
    >
      <div className="relative size-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentTheme}
            initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
            transition={{ duration: 0.18, ease: 'easeInOut' }}
            className="absolute inset-0"
          >
            <ThemeIcon aria-hidden="true" />
          </motion.div>
        </AnimatePresence>
      </div>
    </button>
  )
}
