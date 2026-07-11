'use client'

import { Locale } from '@/lib/i18n'
import { cn } from '@/lib/utils'
import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'
import { Menu, X } from '@tfds/icons'
import { Button, buttonVariants } from '@tfds/components'
import Link from 'next/link'
import { Logo } from '@/components/atoms'
import {
  LanguageSelector,
  ThemeToggle,
  SoundToggle,
} from '@/components/molecules'
import { useAudio } from '@/context/AudioContext'
import { useActiveSection } from '@/hooks/useActiveSection'

interface HeaderDict {
  nav: {
    about: string
    experience: string
    projects: string
    skills: string
    blog: string
    contact: string
  }
}

type NavEntry =
  | { kind: 'scroll'; name: string; href: string; id: string }
  | { kind: 'link'; name: string; href: string }

export function Header({ lang, dict }: { lang: Locale; dict: HeaderDict }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const audio = useAudio()

  const navItems: NavEntry[] = [
    { kind: 'scroll', name: dict.nav.about, href: '#about', id: 'about' },
    {
      kind: 'scroll',
      name: dict.nav.experience,
      href: '#experience',
      id: 'experience',
    },
    {
      kind: 'scroll',
      name: dict.nav.projects,
      href: '#projects',
      id: 'projects',
    },
    { kind: 'scroll', name: dict.nav.skills, href: '#skills', id: 'skills' },
    { kind: 'link', name: dict.nav.blog, href: `/${lang}/blog` },
    {
      kind: 'scroll',
      name: dict.nav.contact,
      href: '#contact',
      id: 'contact',
    },
  ]

  const activeSection = useActiveSection(
    navItems
      .filter(
        (item): item is Extract<NavEntry, { kind: 'scroll' }> =>
          item.kind === 'scroll'
      )
      .map((item) => item.id)
  )

  const scrollToSection = (href: string) => {
    audio.play('buttonClick')
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const toggleMenu = () => {
    audio.play('uiExpand')
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="bg-bg-page/80 border-border-default fixed top-0 right-0 left-0 z-50 border-b backdrop-blur-md">
      <nav
        aria-label="Navegação principal"
        className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8"
      >
        <div className="flex h-14 items-center justify-between sm:h-16">
          <div className="flex-shrink-0">
            <Logo />
          </div>

          {/* Desktop Navigation - Centered */}
          <div className="hidden flex-1 justify-center lg:flex lg:items-center">
            <div className="flex items-baseline space-x-6">
              {navItems.map((item) => {
                if (item.kind === 'link') {
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => audio.play('buttonClick')}
                      className={cn(
                        buttonVariants({ variant: 'ghost', size: 'sm' })
                      )}
                    >
                      {item.name}
                    </Link>
                  )
                }

                const isActive = activeSection === item.id
                return (
                  <Button
                    key={item.id}
                    variant={isActive ? 'primary' : 'ghost'}
                    size="sm"
                    onClick={() => scrollToSection(item.href)}
                  >
                    {item.name}
                  </Button>
                )
              })}
            </div>
          </div>

          {/* Desktop right controls */}
          <div className="hidden gap-1 lg:flex lg:items-center">
            <SoundToggle />
            <ThemeToggle />
            <LanguageSelector currentLang={lang} />
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center gap-1 lg:hidden">
            <SoundToggle />
            <ThemeToggle />
            <LanguageSelector currentLang={lang} />
            <motion.button
              type="button"
              className="text-text-secondary hover:text-text-primary cursor-pointer p-2 focus:outline-none"
              onClick={toggleMenu}
              aria-label={isMenuOpen ? 'Fechar menu' : 'Abrir menu'}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            >
              <div className="relative h-6 w-6">
                <AnimatePresence mode="wait">
                  {!isMenuOpen ? (
                    <motion.div
                      key="hamburger"
                      initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
                      animate={{ opacity: 1, rotate: 0, scale: 1 }}
                      exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="absolute inset-0"
                    >
                      <Menu className="h-6 w-6" aria-hidden="true" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="close"
                      initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
                      animate={{ opacity: 1, rotate: 0, scale: 1 }}
                      exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="absolute inset-0"
                    >
                      <X className="h-6 w-6" aria-hidden="true" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              id="mobile-menu"
              className="lg:hidden"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              <div className="bg-bg-page border-border-default space-y-1 border-t px-2 pt-2 pb-3">
                {navItems.map((item, index) => {
                  if (item.kind === 'link') {
                    return (
                      <motion.div
                        key={item.href}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.3 }}
                        whileHover={{ x: 4 }}
                      >
                        <Link
                          href={item.href}
                          onClick={() => {
                            audio.play('buttonClick')
                            setIsMenuOpen(false)
                          }}
                          className={cn(
                            buttonVariants({ variant: 'ghost', size: 'sm' }),
                            'w-full justify-start'
                          )}
                        >
                          {item.name}
                        </Link>
                      </motion.div>
                    )
                  }

                  const isActive = activeSection === item.id
                  return (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.3 }}
                      whileHover={{ x: 4 }}
                    >
                      <Button
                        variant={isActive ? 'primary' : 'ghost'}
                        size="sm"
                        onClick={() => {
                          scrollToSection(item.href)
                          setIsMenuOpen(false)
                        }}
                        className="w-full justify-start"
                      >
                        {item.name}
                      </Button>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  )
}
