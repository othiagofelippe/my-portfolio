"use client";

import { FaLinkedinIn, FaGithub, FaWhatsapp } from "react-icons/fa";
import { HiOutlineEnvelope, HiOutlineClock, HiOutlineMapPin } from "react-icons/hi2";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAudio } from "@/context/AudioContext";

export function Contact({ dict }: { dict: any }) {
  const audio = useAudio();

  const contactChannels = [
    {
      key: "linkedin",
      label: dict.contact.socialSection.channels.linkedin.label,
      description: dict.contact.socialSection.channels.linkedin.description,
      icon: <FaLinkedinIn className="w-5 h-5" />,
      href: "https://linkedin.com/in/othiagofelippe",
      accent: "text-accent-brand bg-accent-brand/10 group-hover:bg-accent-brand/20",
    },
    {
      key: "github",
      label: dict.contact.socialSection.channels.github.label,
      description: dict.contact.socialSection.channels.github.description,
      icon: <FaGithub className="w-5 h-5" />,
      href: "https://github.com/othiagofelippe",
      accent: "text-text-headline dark:text-text-headline-dark bg-background-secondary/50 group-hover:bg-accent-brand/15 group-hover:text-accent-brand",
    },
    {
      key: "whatsapp",
      label: dict.contact.socialSection.channels.whatsapp.label,
      description: dict.contact.socialSection.channels.whatsapp.description,
      icon: <FaWhatsapp className="w-5 h-5" />,
      href: "https://wa.me/5521973494481",
      accent: "text-accent-green bg-accent-green/10 group-hover:bg-accent-green/20",
    },
    {
      key: "email",
      label: dict.contact.socialSection.channels.email.label,
      description: dict.contact.socialSection.channels.email.description,
      icon: <HiOutlineEnvelope className="w-5 h-5" />,
      href: "mailto:contact@othiagofelippe.com",
      accent: "text-accent-red bg-accent-red/10 group-hover:bg-accent-red/20",
    },
  ];

  const handleChannelClick = () => {
    audio.play("buttonClick");
  };

  return (
    <section id="contato" className="py-20 bg-background-primary dark:bg-background-primary-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-poppins text-3xl sm:text-4xl text-text-headline dark:text-text-headline-dark mb-4">
            {dict.contact.title}
          </h2>
          <p className="font-roboto text-lg text-text-body dark:text-text-body-dark max-w-2xl mx-auto">
            {dict.contact.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <Card className="bg-background-secondary/20 dark:bg-background-tertiary border-border-primary/10">
            <CardHeader>
              <CardTitle className="font-poppins text-2xl text-text-headline dark:text-text-headline-dark">
                {dict.contact.socialSection.quickResponse.title}
              </CardTitle>
              <p className="font-roboto text-text-body dark:text-text-body-dark">
                {dict.contact.socialSection.quickResponse.description}
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-brand/15 text-accent-brand">
                  <HiOutlineEnvelope className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-roboto text-sm text-text-span dark:text-text-span-dark uppercase tracking-wide">
                    {dict.contact.infoLabels.email}
                  </p>
                  <a
                    href={`mailto:${dict.contact.info.email}`}
                    className="font-roboto text-base text-text-headline dark:text-text-headline-dark hover:text-accent-brand transition-colors"
                  >
                    {dict.contact.info.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-brand/15 text-accent-brand">
                  <HiOutlineMapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-roboto text-sm text-text-span dark:text-text-span-dark uppercase tracking-wide">
                    {dict.contact.infoLabels.location}
                  </p>
                  <p className="font-roboto text-base text-text-headline dark:text-text-headline-dark">
                    {dict.contact.info.location}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-brand/15 text-accent-brand">
                  <HiOutlineClock className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-roboto text-sm text-text-span dark:text-text-span-dark uppercase tracking-wide">
                    {dict.contact.infoLabels.availability}
                  </p>
                  <p className="font-roboto text-base text-text-headline dark:text-text-headline-dark">
                    {dict.contact.info.availability}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-background-secondary/20 dark:bg-background-tertiary border-border-primary/10">
            <CardHeader>
              <CardTitle className="font-poppins text-2xl text-text-headline dark:text-text-headline-dark">
                {dict.contact.socialSection.title}
              </CardTitle>
              <p className="font-roboto text-text-body dark:text-text-body-dark">
                {dict.contact.socialSection.subtitle}
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4">
                {contactChannels.map((channel) => (
                  <a
                    key={channel.key}
                    href={channel.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={handleChannelClick}
                    className="group flex items-center gap-5 rounded-2xl border border-border-primary/15 bg-background-secondary/40 dark:bg-background-secondary/40 px-6 py-5 transition-all hover:-translate-y-0.5 hover:border-accent-brand/40 hover:bg-background-secondary/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-brand/60"
                  >
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-full ${channel.accent}`}
                    >
                      {channel.icon}
                    </div>
                    <div className="flex flex-col items-start gap-1">
                      <span className="font-roboto text-base font-medium text-text-headline dark:text-text-headline-dark group-hover:text-accent-brand">
                        {channel.label}
                      </span>
                      <span className="font-roboto text-sm text-text-body dark:text-text-body-dark">
                        {channel.description}
                      </span>
                    </div>
                  </a>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
