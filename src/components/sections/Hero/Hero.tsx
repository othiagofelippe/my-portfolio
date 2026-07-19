'use client'

import { cn } from '@/lib/utils'
import { Button, Grid, Typography, buttonVariants } from '@tfds/react'
import { ArrowRight, Github, Linkedin, Mail } from '@tfds/icons'
import { motion } from 'motion/react'

import { useAudio } from '@/context/AudioContext'
import { getCVFileName } from '@/lib/utils'

import { containerVariants, itemVariants } from './constants'
import { HeroDict } from './types'

export function Hero({ dict }: { dict: HeroDict }) {
  const audio = useAudio()
  const nameParts = dict.hero.name.split(' ')
  const firstName = nameParts.slice(0, -1).join(' ')
  const lastName = nameParts.at(-1)

  const handleViewProjectsClick = (): void => {
    audio.play('buttonClick')
    document
      .querySelector('#projects')
      ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const handleDownloadClick = (): void => {
    audio.play('downloadCv')
  }

  const handleExternalLink = (): void => {
    audio.play('buttonClick')
  }

  const fileName = getCVFileName(dict.lang || 'pt')

  const socials = [
    {
      icon: Github,
      href: 'https://github.com/othiagofelippe',
      label: dict.hero.socials.github,
    },
    {
      icon: Linkedin,
      href: 'https://linkedin.com/in/othiagofelippe',
      label: dict.hero.socials.linkedin,
    },
    {
      icon: Mail,
      href: 'mailto:contact@othiagofelippe.com',
      label: dict.hero.socials.email,
    },
  ]

  return (
    <section className="from-background-primary to-background-secondary flex min-h-screen items-center bg-gradient-to-br">
      <div className="mx-auto w-full max-w-6xl px-4 py-12 pt-28 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            className="mb-8 flex flex-wrap items-center gap-3 font-mono text-xs tracking-widest text-action-primary"
            variants={itemVariants}
          >
            <span className="h-px w-8 bg-action-primary" aria-hidden="true" />
            <span>{dict.hero.badge.location}</span>
            <motion.span
              className="h-2 w-2 rounded-full bg-action-primary"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              aria-hidden="true"
            />
            <span className="text-action-primary/60">
              {dict.hero.badge.availability}
            </span>
          </motion.div>

          <motion.div variants={itemVariants}>
            <div className="mb-4 flex items-center gap-2">
              <Typography as="p" variant="heading-md" color="secondary">
                {dict.hero.intro}
              </Typography>
              <motion.span
                aria-hidden="true"
                style={{ display: 'inline-block', transformOrigin: '70% 70%' }}
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
            </div>
            <div className="mb-6">
              <Typography as="h1" variant="display-lg" color="primary">
                {firstName}{' '}
                <span className="text-action-primary">{lastName}</span>
              </Typography>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="mb-10 max-w-xl">
            <div className="mb-4">
              <Typography variant="heading-md" color="secondary">
                {dict.hero.rolePre}{' '}
                <span className="font-semibold text-action-primary">
                  {dict.hero.roleHighlight}
                </span>
              </Typography>
            </div>
            <Typography variant="body-lg" color="secondary">
              {dict.hero.descriptionPre}{' '}
              <span className="font-semibold text-text-primary">
                {dict.hero.descriptionHighlight}
              </span>{' '}
              {dict.hero.descriptionPost}
            </Typography>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="mb-16 flex flex-wrap items-center gap-4"
          >
            <Button size="lg" onClick={handleViewProjectsClick}>
              {dict.hero.ctas.viewProjects}
              <ArrowRight />
            </Button>
            <a
              href={`/${fileName}`}
              download
              onClick={handleDownloadClick}
              className={cn(buttonVariants({ variant: 'outline', size: 'lg' }))}
            >
              {dict.hero.downloadCV}
            </a>
            <div className="flex gap-1">
              {socials.map((social) => (
                <a
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  onClick={handleExternalLink}
                  className={cn(
                    buttonVariants({ variant: 'ghost', size: 'icon' })
                  )}
                >
                  <social.icon className="h-5 w-5" aria-hidden="true" />
                </a>
              ))}
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Grid
              cols={3}
              gap="0"
              className="max-w-md border-t border-border-subtle pt-8"
            >
              {[
                dict.hero.stats.years,
                dict.hero.stats.companies,
                dict.hero.stats.ds,
              ].map((stat, index) => (
                <div
                  key={stat.label}
                  className={cn(
                    index > 0 && 'border-l border-border-subtle pl-6'
                  )}
                >
                  <div className="mb-1 [--tfds-color-text-primary:var(--tfds-color-action-primary)]">
                    <Typography as="p" variant="display-sm">
                      {stat.value}
                    </Typography>
                  </div>
                  <div className="text-xs [--tfds-color-text-primary:var(--tfds-color-text-tertiary)]">
                    <Typography as="p">{stat.label}</Typography>
                  </div>
                </div>
              ))}
            </Grid>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
