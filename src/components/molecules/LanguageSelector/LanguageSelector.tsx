'use client'

import { Locale, localeNames, locales } from '@/lib/i18n'
import { AnimatePresence, motion } from 'motion/react'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import { buttonVariants } from '@tfds/react'
import { ChevronDown, Globe } from '@tfds/icons'
import { useAudio } from '@/context/AudioContext'
import { cn } from '@/lib/utils'

const FLAG_EMOJIS: Record<Locale, string> = {
  pt: '🇧🇷',
  en: '🇺🇸',
  es: '🇪🇸',
}

interface LanguageSelectorProps {
  currentLang: Locale
}

export function LanguageSelector({ currentLang }: LanguageSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const audio = useAudio()

  const handleToggle = () => {
    setIsOpen(!isOpen)
    audio.play('uiExpand')
  }

  const handleLanguageChange = (locale: Locale) => {
    setIsOpen(false)
    audio.play('pageTransition')

    const newPathname = pathname.replace(/^\/[a-z]{2}/, `/${locale}`)
    router.push(newPathname)
  }

  const handleClose = () => {
    setIsOpen(false)
    audio.play('uiExpand')
  }

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape' && isOpen) {
      handleClose()
    }
  }

  return (
    <div className="relative" onKeyDown={handleKeyDown}>
      <button
        type="button"
        onClick={handleToggle}
        className={cn(
          buttonVariants({ variant: 'ghost', size: 'sm' }),
          'font-mono tracking-widest uppercase'
        )}
        aria-label="Language selector"
        aria-expanded={isOpen}
        aria-haspopup="menu"
      >
        <Globe aria-hidden="true" />
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={currentLang}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.18, ease: 'easeInOut' }}
          >
            {currentLang}
          </motion.span>
        </AnimatePresence>
        <motion.span
          className="inline-flex"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          aria-hidden="true"
        >
          <ChevronDown />
        </motion.span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-10"
              onClick={handleClose}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            />

            <motion.div
              role="menu"
              className="absolute right-0 z-20 mt-2 w-48 rounded-md border border-border-default bg-bg-page p-1 shadow-lg"
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
            >
              {locales.map((locale) => {
                const isActive = currentLang === locale
                return (
                  <button
                    key={locale}
                    type="button"
                    role="menuitem"
                    onClick={() => handleLanguageChange(locale)}
                    aria-current={isActive ? 'true' : undefined}
                    className={cn(
                      buttonVariants({ variant: 'ghost', size: 'sm' }),
                      'w-full justify-between',
                      isActive &&
                        'bg-action-primary-subtle text-action-primary hover:bg-action-primary-subtle'
                    )}
                  >
                    <span className="flex items-center gap-2">
                      <span aria-hidden="true">{FLAG_EMOJIS[locale]}</span>
                      {localeNames[locale]}
                    </span>
                    <span className="font-mono text-xs tracking-widest text-text-tertiary uppercase">
                      {locale}
                    </span>
                  </button>
                )
              })}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
