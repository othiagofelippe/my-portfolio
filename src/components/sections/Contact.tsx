"use client";

import { FaLinkedinIn, FaGithub, FaWhatsapp } from "react-icons/fa";
import { HiOutlineEnvelope, HiOutlineClock, HiOutlineMapPin } from "react-icons/hi2";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/molecules";
import { motion } from "motion/react";
import { useAudio } from "@/context/AudioContext";

interface ContactDict {
  contact: {
    title: string;
    subtitle: string;
    info: { email: string; location: string; availability: string };
    infoLabels: { email: string; location: string; availability: string };
    socialSection: {
      title: string;
      subtitle: string;
      quickResponse: { title: string; description: string };
      channels: {
        linkedin: { label: string; description: string };
        github: { label: string; description: string };
        whatsapp: { label: string; description: string };
        email: { label: string; description: string };
      };
    };
  };
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

const channelVariants = {
  hidden: { opacity: 0, x: -16 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: "easeOut" as const },
  },
};

const infoItemVariants = {
  hidden: { opacity: 0, x: -16 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: "easeOut" as const },
  },
};

export function Contact({ dict }: { dict: ContactDict }) {
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
      accent: "text-text-headline bg-background-secondary/50 group-hover:bg-accent-brand/15 group-hover:text-accent-brand",
    },
    {
      key: "whatsapp",
      label: dict.contact.socialSection.channels.whatsapp.label,
      description: dict.contact.socialSection.channels.whatsapp.description,
      icon: <FaWhatsapp className="w-5 h-5" />,
      href: "https://wa.me/5521973494481",
      accent: "text-white bg-accent-green/90 group-hover:bg-accent-green",
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
    <section id="contato" className="py-20 bg-background-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="typography-h2 text-text-headline mb-4">
            {dict.contact.title}
          </h2>
          <p className="typography-body text-text-body max-w-2xl mx-auto">
            {dict.contact.subtitle}
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <motion.div variants={cardVariants}>
            <Card className="bg-background-secondary/20 border-border-primary/10 h-full">
              <CardHeader>
                <CardTitle className="typography-h4 text-text-headline">
                  {dict.contact.socialSection.quickResponse.title}
                </CardTitle>
                <p className="typography-body text-text-body">
                  {dict.contact.socialSection.quickResponse.description}
                </p>
              </CardHeader>
              <motion.div
                variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } } }}
              >
                <CardContent className="space-y-6">
                  <motion.div variants={infoItemVariants} className="flex items-start gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-brand/15 text-accent-brand">
                      <HiOutlineEnvelope className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="typography-body-sm text-text-span uppercase tracking-wide">
                        {dict.contact.infoLabels.email}
                      </p>
                      <a
                        href={`mailto:${dict.contact.info.email}`}
                        className="typography-body text-text-headline hover:text-accent-brand transition-colors"
                      >
                        {dict.contact.info.email}
                      </a>
                    </div>
                  </motion.div>

                  <motion.div variants={infoItemVariants} className="flex items-start gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-brand/15 text-accent-brand">
                      <HiOutlineMapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="typography-body-sm text-text-span uppercase tracking-wide">
                        {dict.contact.infoLabels.location}
                      </p>
                      <p className="typography-body text-text-headline">
                        {dict.contact.info.location}
                      </p>
                    </div>
                  </motion.div>

                  <motion.div variants={infoItemVariants} className="flex items-start gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-brand/15 text-accent-brand">
                      <HiOutlineClock className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="typography-body-sm text-text-span uppercase tracking-wide">
                        {dict.contact.infoLabels.availability}
                      </p>
                      <p className="typography-body text-text-headline">
                        {dict.contact.info.availability}
                      </p>
                    </div>
                  </motion.div>
                </CardContent>
              </motion.div>
            </Card>
          </motion.div>

          <motion.div variants={cardVariants}>
            <Card className="bg-background-secondary/20 border-border-primary/10 h-full">
              <CardHeader>
                <CardTitle className="typography-h4 text-text-headline">
                  {dict.contact.socialSection.title}
                </CardTitle>
                <p className="typography-body text-text-body">
                  {dict.contact.socialSection.subtitle}
                </p>
              </CardHeader>
              <CardContent>
                <motion.div
                  className="grid grid-cols-1 gap-4"
                  variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } } }}
                >
                  {contactChannels.map((channel) => (
                    <motion.a
                      key={channel.key}
                      href={channel.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={handleChannelClick}
                      variants={channelVariants}
                      whileHover={{ x: 4, transition: { duration: 0.2 } }}
                      className="group flex items-center gap-5 rounded-2xl border border-border-primary/15 bg-background-secondary/40 px-6 py-5 transition-colors hover:border-accent-brand/40 hover:bg-background-secondary/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-brand/60"
                    >
                      <div
                        className={`flex h-12 w-12 items-center justify-center rounded-full ${channel.accent}`}
                      >
                        {channel.icon}
                      </div>
                      <div className="flex flex-col items-start gap-1">
                        <span className="typography-body font-medium text-text-headline group-hover:text-accent-brand">
                          {channel.label}
                        </span>
                        <span className="typography-body-sm text-text-body">
                          {channel.description}
                        </span>
                      </div>
                    </motion.a>
                  ))}
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
