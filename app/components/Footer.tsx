import Link from 'next/link';
import { HiOutlineEnvelope, HiOutlineMapPin, HiOutlineClock } from 'react-icons/hi2';
import { FaLinkedinIn, FaGithub, FaWhatsapp } from 'react-icons/fa';
import { Logo } from './Logo';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    navegacao: [
      { name: 'Sobre', href: '#sobre' },
      { name: 'Projetos', href: '#projetos' },
      { name: 'Habilidades', href: '#habilidades' },
      { name: 'Contato', href: '#contato' }
    ],
    social: [
      { name: 'LinkedIn', href: 'https://linkedin.com/in/othiagofelippe' },
      { name: 'GitHub', href: 'https://github.com/othiagofelippe' },
      { name: 'WhatsApp', href: 'https://wa.me/5521973494481' },
      { name: 'Email', href: 'mailto:contact@othiagofelippe.com' }
    ]
  };

  return (
    <footer className="bg-gray-900 dark:bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="mb-4">
              <Logo />
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              Desenvolvedor Front-End com 3+ anos de experiência em React,
              Next.js e React Native. Foco em criar aplicações web e mobile
              funcionais, com código organizado e boa performance.
            </p>
            <div className="flex space-x-4">
              <Link
                href="https://linkedin.com/in/othiagofelippe"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-400 transition-colors"
              >
                <FaLinkedinIn className="w-6 h-6" />
              </Link>
              <Link
                href="https://github.com/othiagofelippe"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <FaGithub className="w-6 h-6" />
              </Link>
              <Link
                href="https://wa.me/5521973494481"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-green-400 transition-colors"
              >
                <FaWhatsapp className="w-6 h-6" />
              </Link>
              <Link
                href="mailto:contact@othiagofelippe.com"
                className="text-gray-400 hover:text-red-400 transition-colors"
              >
                <HiOutlineEnvelope className="w-6 h-6" />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Navegação</h3>
            <ul className="space-y-3">
              {footerLinks.navegacao.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contato</h3>
            <div className="space-y-3 text-gray-400">
              <div className="flex items-center gap-2 hover:text-white transition-colors">
                <HiOutlineEnvelope className="w-5 h-5" />
                <Link href="mailto:contact@othiagofelippe.com">
                  contact@othiagofelippe.com
                </Link>
              </div>
              <div className="flex items-center gap-2 hover:text-white transition-colors">
                <HiOutlineMapPin className="w-5 h-5" />
                <span>Rio de Janeiro, Brasil</span>
              </div>
              <div className="flex items-center gap-2 hover:text-white transition-colors">
                <HiOutlineClock className="w-5 h-5" />
                <span>Disponível para projetos</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © {currentYear} Thiago Felippe. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
