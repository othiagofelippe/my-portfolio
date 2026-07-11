'use client'

import { FaWhatsapp } from 'react-icons/fa'
import { Linkedin, Github, Mail, Clock, MapPin } from '@tfds/icons'
import { Badge, Typography } from '@tfds/components'
import { motion } from 'motion/react'
import { useAudio } from '@/context/AudioContext'

interface ContactDict {
  contact: {
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
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="bg-action-primary-subtle border-action-primary/20 rounded-2xl border p-8 sm:p-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          <motion.div variants={itemVariants} className="mb-10 text-center">
            <Typography
              as="h2"
              variant="display-md"
              color="primary"
              align="center"
              className="mb-3"
            >
              {dict.contact.title}
            </Typography>
            <Typography
              color="secondary"
              align="center"
              className="mx-auto mb-5 max-w-xl"
            >
              {dict.contact.subtitle}
            </Typography>
            <Badge variant="info">{dict.contact.microCopy}</Badge>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-3"
          >
            {infoCards.map((info) => (
              <div
                key={info.label}
                className="bg-bg-page border-border-subtle rounded-xl border p-4 text-center"
              >
                <info.icon
                  className="text-action-primary mx-auto mb-2 h-5 w-5"
                  aria-hidden="true"
                />
                <Typography
                  as="p"
                  variant="body-sm"
                  color="disabled"
                  className="mb-1 tracking-wide uppercase"
                >
                  {info.label}
                </Typography>
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
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 gap-3 sm:grid-cols-4"
          >
            {channels.map((channel) => (
              <a
                key={channel.key}
                href={channel.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleChannelClick}
                className="group border-border-default bg-bg-page hover:border-action-primary hover:text-action-primary focus-visible:ring-action-primary/60 flex flex-col items-center gap-2 rounded-xl border px-4 py-5 text-center transition-colors focus-visible:ring-2 focus-visible:outline-none"
              >
                <channel.icon className="h-5 w-5" aria-hidden="true" />
                <Typography as="span" variant="body-sm" color="primary">
                  {channel.label}
                </Typography>
              </a>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
