"use client";

import { Button, Logo } from "@/components/atoms";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";
import { Github, Linkedin, Clock, Mail, MapPin } from "@tfds/icons";
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
    <footer className="bg-bg-default text-text-tertiary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="mb-4">
              <Logo />
            </div>
            <p className="typography-body text-text-secondary mb-6 max-w-md">
              {dict.footer.description}
            </p>
            <div className="flex space-x-4">
              <Button
                variant="ghost"
                size="icon"
                aria-label="LinkedIn"
                onClick={() => { audio.play("buttonClick"); window.open("https://linkedin.com/in/othiagofelippe", "_blank", "noopener,noreferrer"); }}
              >
                <Linkedin className="w-6 h-6" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                aria-label="GitHub"
                onClick={() => { audio.play("buttonClick"); window.open("https://github.com/othiagofelippe", "_blank", "noopener,noreferrer"); }}
              >
                <Github className="w-6 h-6" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                aria-label="WhatsApp"
                onClick={() => { audio.play("buttonClick"); window.open("https://wa.me/5521973494481", "_blank", "noopener,noreferrer"); }}
              >
                <FaWhatsapp className="w-6 h-6" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Email"
                onClick={() => { audio.play("buttonClick"); window.open("mailto:contact@othiagofelippe.com"); }}
              >
                <Mail className="w-6 h-6" />
              </Button>
            </div>
          </div>

          <div>
            <h3 className="typography-body-lg text-text-secondary mb-4">
              {dict.footer.navigation}
            </h3>
            <ul className="space-y-3">
              {footerLinks.navegacao.map((link, index) => (
                <li key={index}>
                  <Button
                    onClick={() => scrollToSection(link.href)}
                    variant="ghost"
                    className="p-0 h-auto justify-start"
                  >
                    {link.name}
                  </Button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="typography-body-lg text-text-secondary mb-4">
              {dict.footer.contactSection}
            </h3>
            <div className="space-y-3 text-text-secondary">
              <div className="flex items-start gap-2 hover:text-text-primary transition-colors">
                <Mail className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <Link
                  href="mailto:contact@othiagofelippe.com"
                  className="typography-body-sm cursor-pointer break-all leading-relaxed"
                >
                  {dict.contact.info.email}
                </Link>
              </div>
              <div className="flex items-center gap-2 hover:text-text-primary transition-colors">
                <MapPin className="w-5 h-5" />
                <span className="typography-body">
                  {dict.contact.info.location}
                </span>
              </div>
              <div className="flex items-center gap-2 hover:text-text-primary transition-colors">
                <Clock className="w-5 h-5" />
                <span className="typography-body">
                  {dict.contact.info.availability}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border-default mt-12 pt-8 text-center">
          <p className="typography-body-sm text-text-disabled">
            © {currentYear} Thiago Felippe. {dict.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}
