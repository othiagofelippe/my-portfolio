'use client'

import { FaWhatsapp } from 'react-icons/fa'
import { Linkedin, Github, Mail, Clock, MapPin } from '@tfds/icons'
import { Badge, Grid, Typography, buttonVariants } from '@tfds/react'
import { motion } from 'motion/react'
import { useAudio } from '@/context/AudioContext'
import { cn } from '@/lib/utils'

interface ContactDict {
  contact: {
    eyebrow: string
    title: string
    subtitle: string
    microCopy: string
    info: { email: string; location: string; availability: string }
    infoLabels: { email: string; location: string; availability: string }
    channels: {
      linkedin: { label: string }
      github: { label: string }
      whatsapp: { label: string }
      email: { label: string }
    }
  }
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' as const },
  },
}

export function Contact({ dict }: { dict: ContactDict }) {
  const audio = useAudio()

  const infoCards = [
    {
      icon: Mail,
      label: dict.contact.infoLabels.email,
      value: dict.contact.info.email,
      href: `mailto:${dict.contact.info.email}`,
    },
    {
      icon: MapPin,
      label: dict.contact.infoLabels.location,
      value: dict.contact.info.location,
      href: null,
    },
    {
      icon: Clock,
      label: dict.contact.infoLabels.availability,
      value: dict.contact.info.availability,
      href: null,
    },
  ]

  const channels = [
    {
      key: 'linkedin',
      label: dict.contact.channels.linkedin.label,
      icon: Linkedin,
      href: 'https://linkedin.com/in/othiagofelippe',
    },
    {
      key: 'github',
      label: dict.contact.channels.github.label,
      icon: Github,
      href: 'https://github.com/othiagofelippe',
    },
    {
      key: 'whatsapp',
      label: dict.contact.channels.whatsapp.label,
      icon: FaWhatsapp,
      href: 'https://wa.me/5521973494481',
    },
    {
      key: 'email',
      label: dict.contact.channels.email.label,
      icon: Mail,
      href: 'mailto:contact@othiagofelippe.com',
    },
  ]

  const handleChannelClick = (): void => {
    audio.play('buttonClick')
  }

  return (
    <section id="contact" className="bg-bg-page py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="bg-action-primary-subtle border-action-primary/20 rounded-2xl border p-8 sm:p-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          <motion.div variants={itemVariants} className="mb-10">
            <div className="mb-4 block font-mono text-xs tracking-widest [--tfds-color-text-primary:var(--tfds-color-action-primary)]">
              <Typography as="span">{dict.contact.eyebrow}</Typography>
            </div>
            <div className="mb-3">
              <Typography as="h2" variant="display-md" color="primary">
                {dict.contact.title}
              </Typography>
            </div>
            <div className="mb-5 max-w-xl">
              <Typography color="secondary">{dict.contact.subtitle}</Typography>
            </div>
            <Badge variant="info">{dict.contact.microCopy}</Badge>
          </motion.div>

          <motion.div variants={itemVariants} className="mb-10">
            <Grid cols={{ base: 1, sm: 3 }} gap="4">
              {infoCards.map((info) => (
                <div
                  key={info.label}
                  className="bg-bg-page border-border-subtle rounded-xl border p-4"
                >
                  <div className="mb-2 flex items-center gap-2">
                    <info.icon
                      className="text-action-primary h-4 w-4"
                      aria-hidden="true"
                    />
                    <div className="font-mono tracking-wide uppercase">
                      <Typography as="span" variant="body-sm" color="disabled">
                        {info.label}
                      </Typography>
                    </div>
                  </div>
                  {info.href ? (
                    <a
                      href={info.href}
                      className="text-text-primary hover:text-action-primary transition-colors"
                    >
                      <Typography as="span" color="primary">
                        {info.value}
                      </Typography>
                    </a>
                  ) : (
                    <Typography as="p" color="primary">
                      {info.value}
                    </Typography>
                  )}
                </div>
              ))}
            </Grid>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-wrap gap-3">
            {channels.map((channel) => (
              <a
                key={channel.key}
                href={channel.href}
                target={channel.href.startsWith('http') ? '_blank' : undefined}
                rel={
                  channel.href.startsWith('http')
                    ? 'noopener noreferrer'
                    : undefined
                }
                onClick={handleChannelClick}
                className={cn(
                  buttonVariants({
                    variant: channel.key === 'email' ? 'primary' : 'outline',
                    size: 'lg',
                  })
                )}
              >
                <channel.icon className="h-4 w-4" aria-hidden="true" />
                {channel.label}
              </a>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
