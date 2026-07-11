'use client'

import { Button } from '@tfds/components'
import { Logo } from '@/components/atoms'
import { Typography } from '@tfds/components'
import Link from 'next/link'
import { FaWhatsapp } from 'react-icons/fa'
import { Github, Linkedin, Clock, Mail, MapPin } from '@tfds/icons'
import { useAudio } from '@/context/AudioContext'

interface FooterDict {
  nav: {
    experience: string
    projects: string
    skills: string
    contact: string
  }
  footer: {
    description: string
    navigation: string
    contactSection: string
    rights: string
  }
  contact: {
    info: {
      email: string
      location: string
      availability: string
    }
  }
}

export function Footer({ dict }: { dict: FooterDict }) {
  const currentYear = new Date().getFullYear()
  const audio = useAudio()

  const scrollToSection = (href: string) => {
    audio.play('buttonClick')
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const footerLinks = {
    navegacao: [
      { name: dict.nav.experience, href: '#experience' },
      { name: dict.nav.projects, href: '#projects' },
      { name: dict.nav.skills, href: '#skills' },
      { name: dict.nav.contact, href: '#contact' },
    ],
    social: [
      { name: 'LinkedIn', href: 'https://linkedin.com/in/othiagofelippe' },
      { name: 'GitHub', href: 'https://github.com/othiagofelippe' },
      { name: 'WhatsApp', href: 'https://wa.me/5521973494481' },
      { name: 'Email', href: 'mailto:contact@othiagofelippe.com' },
    ],
  }

  return (
    <footer className="bg-bg-default text-text-tertiary">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="mb-4">
              <Logo />
            </div>
            <Typography color="secondary" className="mb-6 max-w-md">
              {dict.footer.description}
            </Typography>
            <div className="flex space-x-4">
              <Button
                variant="ghost"
                size="icon"
                aria-label="LinkedIn"
                onClick={() => {
                  audio.play('buttonClick')
                  window.open(
                    'https://linkedin.com/in/othiagofelippe',
                    '_blank',
                    'noopener,noreferrer'
                  )
                }}
              >
                <Linkedin className="h-6 w-6" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                aria-label="GitHub"
                onClick={() => {
                  audio.play('buttonClick')
                  window.open(
                    'https://github.com/othiagofelippe',
                    '_blank',
                    'noopener,noreferrer'
                  )
                }}
              >
                <Github className="h-6 w-6" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                aria-label="WhatsApp"
                onClick={() => {
                  audio.play('buttonClick')
                  window.open(
                    'https://wa.me/5521973494481',
                    '_blank',
                    'noopener,noreferrer'
                  )
                }}
              >
                <FaWhatsapp className="h-6 w-6" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Email"
                onClick={() => {
                  audio.play('buttonClick')
                  window.open('mailto:contact@othiagofelippe.com')
                }}
              >
                <Mail className="h-6 w-6" />
              </Button>
            </div>
          </div>

          <div>
            <Typography
              as="h3"
              variant="body-lg"
              color="secondary"
              className="mb-4"
            >
              {dict.footer.navigation}
            </Typography>
            <ul className="space-y-3">
              {footerLinks.navegacao.map((link) => (
                <li key={link.href}>
                  <Button
                    onClick={() => scrollToSection(link.href)}
                    variant="ghost"
                    className="h-auto justify-start p-0"
                  >
                    {link.name}
                  </Button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <Typography
              as="h3"
              variant="body-lg"
              color="secondary"
              className="mb-4"
            >
              {dict.footer.contactSection}
            </Typography>
            <div className="text-text-secondary space-y-3">
              <div className="hover:text-text-primary flex items-start gap-2 transition-colors">
                <Mail className="mt-0.5 h-5 w-5 flex-shrink-0" />
                <Link
                  href="mailto:contact@othiagofelippe.com"
                  className="text-text-secondary cursor-pointer leading-relaxed break-all"
                >
                  {dict.contact.info.email}
                </Link>
              </div>
              <div className="hover:text-text-primary flex items-center gap-2 transition-colors">
                <MapPin className="h-5 w-5" />
                <Typography as="span">{dict.contact.info.location}</Typography>
              </div>
              <div className="hover:text-text-primary flex items-center gap-2 transition-colors">
                <Clock className="h-5 w-5" />
                <Typography as="span">
                  {dict.contact.info.availability}
                </Typography>
              </div>
            </div>
          </div>
        </div>

        <div className="border-border-default mt-12 border-t pt-8 text-center">
          <Typography as="p" variant="body-sm" color="disabled">
            © {currentYear} Thiago Felippe. {dict.footer.rights}
          </Typography>
        </div>
      </div>
    </footer>
  )
}
