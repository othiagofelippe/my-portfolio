"use client";

import Link from 'next/link';
import { HiOutlineEnvelope, HiOutlineMapPin, HiOutlineClock } from 'react-icons/hi2';
import { FaLinkedinIn, FaGithub, FaWhatsapp } from 'react-icons/fa';
import { Logo } from './Logo';
import { Locale } from '@/lib/i18n';

export function Footer({ lang, dict }: { lang: Locale; dict: any }) {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const footerLinks = {
    navegacao: [
      { name: dict.nav.about, href: '#sobre' },
      { name: dict.nav.projects, href: '#projetos' },
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
    <footer className="bg-slate-900 dark:bg-slate-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="mb-4">
              <Logo />
            </div>
            <p className="text-slate-400 mb-6 max-w-md">
              {dict.footer.description}
            </p>
            <div className="flex space-x-4">
              <Link
                href="https://linkedin.com/in/othiagofelippe"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-blue-400 transition-colors"
              >
                <FaLinkedinIn className="w-6 h-6" />
              </Link>
              <Link
                href="https://github.com/othiagofelippe"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-white transition-colors"
              >
                <FaGithub className="w-6 h-6" />
              </Link>
              <Link
                href="https://wa.me/5521973494481"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-green-400 transition-colors"
              >
                <FaWhatsapp className="w-6 h-6" />
              </Link>
              <Link
                href="mailto:contact@othiagofelippe.com"
                className="text-slate-400 hover:text-red-400 transition-colors"
              >
                <HiOutlineEnvelope className="w-6 h-6" />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">{dict.footer.navigation}</h3>
            <ul className="space-y-3">
              {footerLinks.navegacao.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-slate-400 hover:text-white transition-colors text-left"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">{dict.footer.contactSection}</h3>
            <div className="space-y-3 text-slate-400">
              <div className="flex items-center gap-2 hover:text-white transition-colors">
                <HiOutlineEnvelope className="w-5 h-5" />
                <Link href="mailto:contact@othiagofelippe.com">
                  {dict.contact.info.email}
                </Link>
              </div>
              <div className="flex items-center gap-2 hover:text-white transition-colors">
                <HiOutlineMapPin className="w-5 h-5" />
                <span>{dict.contact.info.location}</span>
              </div>
              <div className="flex items-center gap-2 hover:text-white transition-colors">
                <HiOutlineClock className="w-5 h-5" />
                <span>{dict.contact.info.availability}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-slate-400 text-sm">
            © {currentYear} Thiago Felippe. {dict.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}
