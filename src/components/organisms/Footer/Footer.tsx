import { Github, Linkedin, Mail } from '@tfds/icons'

interface FooterDict {
  footer: {
    rights: string
  }
}

const SOCIAL_LINKS = [
  {
    name: 'GitHub',
    href: 'https://github.com/othiagofelippe',
    icon: Github,
  },
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com/in/othiagofelippe',
    icon: Linkedin,
  },
  {
    name: 'Email',
    href: 'mailto:contact@othiagofelippe.com',
    icon: Mail,
  },
]

export function Footer({ dict }: { dict: FooterDict }) {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-border-default border-t">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 sm:px-6 md:flex-row lg:px-8">
        <span className="text-text-tertiary font-mono text-xs">
          {'<TF />'} — Thiago Felippe · © {currentYear} · {dict.footer.rights}
        </span>

        <div className="flex items-center gap-5">
          {SOCIAL_LINKS.map((social) => (
            <a
              key={social.name}
              href={social.href}
              target={social.href.startsWith('http') ? '_blank' : undefined}
              rel={
                social.href.startsWith('http')
                  ? 'noopener noreferrer'
                  : undefined
              }
              aria-label={social.name}
              className="text-text-tertiary hover:text-action-primary transition-colors duration-200"
            >
              <social.icon className="h-4 w-4" aria-hidden="true" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
