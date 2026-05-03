'use client'

import { Button, Logo } from '@/components/atoms'
import {
  LanguageSelector,
  SoundToggle,
  ThemeToggle,
} from '@/components/molecules'
import { useAudio } from '@/context/AudioContext'
import { useActiveSection } from '@/hooks/useActiveSection'
import { Locale } from '@/lib/i18n'
import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'
import { HiOutlineBars3, HiOutlineXMark } from 'react-icons/hi2'

interface HeaderDict {
  nav: {
    about: string
    experience: string
    projects: string
    skills: string
    contact: string
  }
}

export function Header({ lang, dict }: { lang: Locale; dict: HeaderDict }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const audio = useAudio()

  const navItems = [
    { name: dict.nav.about, href: '#sobre', id: 'sobre' },
    { name: dict.nav.experience, href: '#experiencia', id: 'experiencia' },
    { name: dict.nav.projects, href: '#projetos', id: 'projetos' },
    { name: dict.nav.skills, href: '#habilidades', id: 'habilidades' },
    { name: dict.nav.contact, href: '#contato', id: 'contato' },
  ]

  const activeSection = useActiveSection(navItems.map((item) => item.id))

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
    <header className="bg-background-primary/80 border-border-primary fixed top-0 right-0 left-0 z-50 border-b backdrop-blur-md">
      <nav
        aria-label="Navegação principal"
        className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8"
      >
        <div className="flex h-14 items-center justify-between sm:h-16">
          <div className="flex-shrink-0">
            <Logo />
          </div>

          {/* Desktop Navigation - Centered */}
          <div className="hidden flex-1 justify-center lg:flex lg:items-center">
            <div className="flex items-baseline space-x-6">
              {navItems.map((item) => {
                const isActive = activeSection === item.id
                return (
                  <Button
                    key={item.id}
                    asChild
                    variant="ghost"
                    size="sm"
                    onClick={() => scrollToSection(item.href)}
                    className={`relative font-semibold ${isActive ? 'text-text-headline' : 'text-text-body'}`}
                  >
                    <a href={item.href}>
                      {item.name}
                      <motion.span
                        className="bg-accent-brand absolute bottom-0 left-0 h-0.5"
                        animate={{ width: isActive ? '100%' : '0%' }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                      />
                    </a>
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
              className="text-text-body hover:text-text-headline cursor-pointer p-2 focus:outline-none"
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
                      <HiOutlineBars3 className="h-6 w-6" aria-hidden="true" />
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
                      <HiOutlineXMark className="h-6 w-6" aria-hidden="true" />
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
              <div className="bg-background-primary border-border-primary space-y-1 border-t px-2 pt-2 pb-3">
                {navItems.map((item, index) => {
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
                        asChild
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setIsMenuOpen(false)
                          setTimeout(() => scrollToSection(item.href), 300)
                        }}
                        className={`relative w-full justify-start ${isActive ? 'text-text-headline font-semibold' : 'text-text-body font-normal'}`}
                      >
                        <a href={item.href}>
                          {item.name}
                          <motion.span
                            className="bg-accent-brand absolute bottom-0 left-0 h-0.5"
                            animate={{ width: isActive ? '100%' : '0%' }}
                            transition={{ duration: 0.3, ease: 'easeOut' }}
                          />
                        </a>
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
