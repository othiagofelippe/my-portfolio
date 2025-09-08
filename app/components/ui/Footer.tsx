"use client";

import Link from 'next/link';
import { HiOutlineEnvelope, HiOutlineMapPin, HiOutlineClock } from 'react-icons/hi2';
import { FaLinkedinIn, FaGithub, FaWhatsapp } from 'react-icons/fa';
import { Logo } from './Logo';

export function Footer({ dict }: { dict: any }) {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const footerLinks = {
    navegacao: [
      { name: dict.nav.experience, href: '#experiencia' },
      // { name: dict.nav.projects, href: '#projetos' },
      { name: dict.nav.skills, href: '#habilidades' },
      { name: dict.nav.contact, href: '#contato' }
    ],
    social: [
      { name: 'LinkedIn', href: 'https://linkedin.com/in/othiagofelippe' },
      { name: 'GitHub', href: 'https://github.com/othiagofelippe' },
      { name: 'WhatsApp', href: 'https://wa.me/5521973494481' },
      { name: 'Email', href: 'mailto:contact@othiagofelippe.com' }
    ]
  };

  return (
    <footer className="bg-background-secondary dark:bg-background-tertiary text-text-label">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="mb-4">
              <Logo />
            </div>
            <p className="font-roboto text-text-body dark:text-text-body-dark mb-6 max-w-md">
              {dict.footer.description}
            </p>
            <div className="flex space-x-4">
              <Link
                href="https://linkedin.com/in/othiagofelippe"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-span dark:text-text-span-dark hover:text-accent-brand transition-colors"
              >
                <FaLinkedinIn className="w-6 h-6" />
              </Link>
              <Link
                href="https://github.com/othiagofelippe"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-span dark:text-text-span-dark hover:text-text-headline dark:hover:text-text-heading transition-colors"
              >
                <FaGithub className="w-6 h-6" />
              </Link>
              <Link
                href="https://wa.me/5521973494481"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-span dark:text-text-span-dark hover:text-accent-green transition-colors"
              >
                <FaWhatsapp className="w-6 h-6" />
              </Link>
              <Link
                href="mailto:contact@othiagofelippe.com"
                className="text-text-span dark:text-text-span-dark hover:text-accent-red transition-colors"
              >
                <HiOutlineEnvelope className="w-6 h-6" />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-poppins text-lg text-text-body dark:text-text-body-dark mb-4">{dict.footer.navigation}</h3>
            <ul className="space-y-3">
              {footerLinks.navegacao.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="font-roboto text-text-body dark:text-text-body-dark hover:text-text-headline transition-colors text-left"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-poppins text-lg text-text-body dark:text-text-body-dark mb-4">{dict.footer.contactSection}</h3>
            <div className="space-y-3 text-text-body dark:text-text-body-dark">
              <div className="flex items-center gap-2 hover:text-text-headline transition-colors">
                <HiOutlineEnvelope className="w-5 h-5" />
                <Link href="mailto:contact@othiagofelippe.com" className="font-roboto">
                  {dict.contact.info.email}
                </Link>
              </div>
              <div className="flex items-center gap-2 hover:text-text-headline transition-colors">
                <HiOutlineMapPin className="w-5 h-5" />
                <span className="font-roboto">{dict.contact.info.location}</span>
              </div>
              <div className="flex items-center gap-2 hover:text-text-headline transition-colors">
                <HiOutlineClock className="w-5 h-5" />
                <span className="font-roboto">{dict.contact.info.availability}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border-primary mt-12 pt-8 text-center">
          <p className="font-roboto text-text-span dark:text-text-span-dark text-sm">
            © {currentYear} Thiago Felippe. {dict.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}
