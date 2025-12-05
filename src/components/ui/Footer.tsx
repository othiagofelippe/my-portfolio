"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FaGithub, FaLinkedinIn, FaWhatsapp } from "react-icons/fa";
import {
  HiOutlineClock,
  HiOutlineEnvelope,
  HiOutlineMapPin,
} from "react-icons/hi2";
import { Logo } from "./Logo";
import { useAudio } from "@/context/AudioContext";

export function Footer({ dict }: { dict: any }) {
  const currentYear = new Date().getFullYear();
  const audio = useAudio();

  const scrollToSection = (href: string) => {
    audio.play("buttonClick");
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const footerLinks = {
    navegacao: [
      { name: dict.nav.experience, href: "#experiencia" },
      { name: dict.nav.projects, href: '#projetos' },
      { name: dict.nav.skills, href: "#habilidades" },
      { name: dict.nav.contact, href: "#contato" },
    ],
    social: [
      { name: "LinkedIn", href: "https://linkedin.com/in/othiagofelippe" },
      { name: "GitHub", href: "https://github.com/othiagofelippe" },
      { name: "WhatsApp", href: "https://wa.me/5521973494481" },
      { name: "Email", href: "mailto:contact@othiagofelippe.com" },
    ],
  };

  return (
    <footer className="bg-background-secondary text-text-label">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="mb-4">
              <Logo />
            </div>
            <p className="font-roboto text-text-body mb-6 max-w-md">
              {dict.footer.description}
            </p>
            <div className="flex space-x-4">
              <Button
                asChild
                variant="ghost"
                size="lg"
                className="text-text-span hover:text-accent-brand hover:bg-transparent transition-colors cursor-pointer p-2"
              >
                <Link
                  href="https://linkedin.com/in/othiagofelippe"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaLinkedinIn className="w-6 h-6" />
                </Link>
              </Button>
              <Button
                asChild
                variant="ghost"
                size="lg"
                className="text-text-span hover:text-text-headline hover:bg-transparent transition-colors cursor-pointer p-2"
              >
                <Link
                  href="https://github.com/othiagofelippe"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaGithub className="w-6 h-6" />
                </Link>
              </Button>
              <Button
                asChild
                variant="ghost"
                size="lg"
                className="text-text-span hover:text-white hover:bg-accent-green transition-colors cursor-pointer p-2 rounded-lg"
              >
                <Link
                  href="https://wa.me/5521973494481"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaWhatsapp className="w-6 h-6" />
                </Link>
              </Button>
              <Button
                asChild
                variant="ghost"
                size="lg"
                className="text-text-span hover:text-accent-red hover:bg-transparent transition-colors cursor-pointer p-2"
              >
                <Link href="mailto:contact@othiagofelippe.com">
                  <HiOutlineEnvelope className="w-6 h-6" />
                </Link>
              </Button>
            </div>
          </div>

          <div>
            <h3 className="font-poppins text-lg text-text-body mb-4">
              {dict.footer.navigation}
            </h3>
            <ul className="space-y-3">
              {footerLinks.navegacao.map((link, index) => (
                <li key={index}>
                  <Button
                    onClick={() => scrollToSection(link.href)}
                    variant="ghost"
                    size="lg"
                    className="font-roboto text-text-body hover:text-text-headline hover:bg-transparent transition-colors text-left cursor-pointer p-0 h-auto justify-start"
                  >
                    {link.name}
                  </Button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-poppins text-lg text-text-body mb-4">
              {dict.footer.contactSection}
            </h3>
            <div className="space-y-3 text-text-body">
              <div className="flex items-start gap-2 hover:text-text-headline transition-colors">
                <HiOutlineEnvelope className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <Link
                  href="mailto:contact@othiagofelippe.com"
                  className="font-roboto cursor-pointer break-all text-sm leading-relaxed"
                >
                  {dict.contact.info.email}
                </Link>
              </div>
              <div className="flex items-center gap-2 hover:text-text-headline transition-colors">
                <HiOutlineMapPin className="w-5 h-5" />
                <span className="font-roboto">
                  {dict.contact.info.location}
                </span>
              </div>
              <div className="flex items-center gap-2 hover:text-text-headline transition-colors">
                <HiOutlineClock className="w-5 h-5" />
                <span className="font-roboto">
                  {dict.contact.info.availability}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border-primary mt-12 pt-8 text-center">
          <p className="font-roboto text-text-span text-sm">
            © {currentYear} Thiago Felippe. {dict.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}
