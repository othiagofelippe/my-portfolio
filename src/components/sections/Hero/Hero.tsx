'use client'

import { Button, VStack, Typography } from '@tfds/components'
import { Download, Github, Linkedin } from '@tfds/icons'
import { AnimatePresence, motion, useScroll, useTransform } from 'motion/react'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

import { useAudio } from '@/context/AudioContext'
import { getCVFileName } from '@/lib/utils'

import {
  containerVariants,
  itemVariants,
  ROTATING_WORDS,
  ROTATION_INTERVAL,
} from './constants'
import { HeroDict } from './types'

const MotionTypography = motion.create(Typography)
const MotionVStack = motion.create(VStack)

export function Hero({ dict }: { dict: HeroDict }) {
  const audio = useAudio()
  const [wordIndex, setWordIndex] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })
  const imageY = useTransform(scrollYProgress, [0, 1], [0, -60])

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % ROTATING_WORDS.length)
    }, ROTATION_INTERVAL)
    return () => clearInterval(interval)
  }, [])

  const handleDownloadClick = (): void => {
    const fileName = getCVFileName(dict.lang || 'pt')
    audio.play('downloadCv')
    const link = document.createElement('a')
    link.href = `/${fileName}`
    link.download = fileName
    link.click()
  }

  const handleExternalLink = (url: string): void => {
    audio.play('buttonClick')
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <section
      ref={sectionRef}
      className="from-background-primary to-background-secondary flex min-h-screen items-center justify-center bg-gradient-to-br"
    >
      <div className="mx-auto max-w-7xl px-4 py-12 pt-20 sm:px-6 md:pt-16 lg:px-8 lg:pt-12">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          {/* Text Content */}
          <MotionVStack
            gap="6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <MotionVStack gap="4" variants={itemVariants}>
              <Typography as="h1" variant="display-lg" color="primary">
                Fala aí!{' '}
                <motion.span
                  aria-hidden="true"
                  style={{
                    display: 'inline-block',
                    transformOrigin: '70% 70%',
                  }}
                  animate={{ rotate: [0, 14, -8, 14, -4, 10, 0] }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    repeatDelay: 3,
                    ease: 'easeInOut',
                  }}
                >
                  👋
                </motion.span>
              </Typography>
              <Typography as="h2" variant="display-sm" color="primary">
                {dict.hero.intro}{' '}
                <span className="text-action-primary">{dict.hero.name}</span>
              </Typography>
            </MotionVStack>

            <MotionTypography
              as="p"
              variant="heading-md"
              color="secondary"
              className="flex flex-wrap items-baseline gap-x-2"
              variants={itemVariants}
            >
              {dict.hero.rolePre}{' '}
              <span
                className="relative inline-flex overflow-hidden"
                style={{ minWidth: '14ch' }}
              >
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.span
                    key={ROTATING_WORDS[wordIndex]}
                    className="text-action-primary inline-block font-semibold"
                    initial={{ y: '100%', opacity: 0 }}
                    animate={{ y: '0%', opacity: 1 }}
                    exit={{ y: '-100%', opacity: 0 }}
                    transition={{ duration: 0.4, ease: 'easeInOut' }}
                  >
                    {ROTATING_WORDS[wordIndex]}
                  </motion.span>
                </AnimatePresence>
              </span>
            </MotionTypography>

            <MotionTypography
              variant="body-lg"
              color="secondary"
              variants={itemVariants}
            >
              {dict.hero.descriptionPre}{' '}
              <span className="relative inline-block">
                <span className="text-text-primary relative z-10 font-semibold">
                  {dict.hero.descriptionHighlight}
                </span>
                <motion.span
                  aria-hidden="true"
                  className="bg-action-primary/30 absolute bottom-0 left-0 h-[6px] w-full rounded-full"
                  initial={{ scaleX: 0, originX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.6, ease: 'easeOut', delay: 1.4 }}
                  style={{ transformOrigin: 'left' }}
                />
              </span>{' '}
              {dict.hero.descriptionPost}
            </MotionTypography>

            <motion.div
              className="flex flex-row items-center gap-4"
              variants={itemVariants}
            >
              <Button variant="outline" size="md" onClick={handleDownloadClick}>
                <Download />
                {dict.hero.downloadCV}
              </Button>
              <div className="flex gap-3">
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Visitar perfil no LinkedIn"
                  onClick={() =>
                    handleExternalLink('https://linkedin.com/in/othiagofelippe')
                  }
                >
                  <Linkedin className="h-5 w-5" aria-hidden="true" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Visitar perfil no GitHub"
                  onClick={() =>
                    handleExternalLink('https://github.com/othiagofelippe')
                  }
                >
                  <Github className="h-5 w-5" aria-hidden="true" />
                </Button>
              </div>
            </motion.div>
          </MotionVStack>

          {/* Image */}
          <motion.div
            className="flex justify-center lg:justify-end"
            style={{ y: imageY }}
          >
            <motion.div
              className="border-bg-page h-80 w-80 overflow-hidden rounded-3xl border-4 shadow-xl sm:h-96 sm:w-96 sm:border-8"
              initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, rotate: 2, y: [0, -10, 0] }}
              transition={{
                opacity: { duration: 0.8, ease: 'easeOut', delay: 0.6 },
                scale: { duration: 0.8, ease: 'easeOut', delay: 0.6 },
                rotate: { duration: 0.8, ease: 'easeOut', delay: 0.6 },
                y: {
                  duration: 4,
                  ease: 'easeInOut',
                  repeat: Infinity,
                  repeatType: 'reverse',
                  delay: 1.4,
                },
              }}
              whileHover={{
                rotate: 0,
                scale: 1.05,
                transition: { duration: 0.3 },
              }}
              whileTap={{ scale: 0.95 }}
            >
              <Image
                src="https://github.com/othiagofelippe.png"
                alt="Thiago Felippe"
                width={384}
                height={384}
                className="h-full w-full cursor-pointer object-cover"
                priority
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
