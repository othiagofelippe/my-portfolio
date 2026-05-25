"use client";

import { FaWhatsapp } from "react-icons/fa";
import { Linkedin, Github, Mail, Clock, MapPin } from "@tfds/icons";
import { Typography } from "@tfds/components";
import { Card, CardContent, CardHeader } from "@/components/molecules";
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
      icon: <Linkedin className="w-5 h-5" />,
      href: "https://linkedin.com/in/othiagofelippe",
      accent: "text-action-primary bg-action-primary/10 group-hover:bg-action-primary/20",
    },
    {
      key: "github",
      label: dict.contact.socialSection.channels.github.label,
      description: dict.contact.socialSection.channels.github.description,
      icon: <Github className="w-5 h-5" />,
      href: "https://github.com/othiagofelippe",
      accent: "text-text-primary bg-bg-default/50 group-hover:bg-action-primary/15 group-hover:text-action-primary",
    },
    {
      key: "whatsapp",
      label: dict.contact.socialSection.channels.whatsapp.label,
      description: dict.contact.socialSection.channels.whatsapp.description,
      icon: <FaWhatsapp className="w-5 h-5" />,
      href: "https://wa.me/5521973494481",
      accent: "text-white bg-feedback-success/90 group-hover:bg-feedback-success",
    },
    {
      key: "email",
      label: dict.contact.socialSection.channels.email.label,
      description: dict.contact.socialSection.channels.email.description,
      icon: <Mail className="w-5 h-5" />,
      href: "mailto:contact@othiagofelippe.com",
      accent: "text-feedback-error bg-feedback-error/10 group-hover:bg-feedback-error/20",
    },
  ];

  const handleChannelClick = () => {
    audio.play("buttonClick");
  };

  return (
    <section id="contato" className="py-20 bg-bg-page">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Typography as="h2" variant="display-sm" color="primary" className="mb-4">
            {dict.contact.title}
          </Typography>
          <Typography color="secondary" className="max-w-2xl mx-auto">
            {dict.contact.subtitle}
          </Typography>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <motion.div variants={cardVariants}>
            <Card className="bg-bg-default/20 border-border-default/10 h-full">
              <CardHeader>
                <Typography as="h3" variant="heading-lg" color="primary">
                  {dict.contact.socialSection.quickResponse.title}
                </Typography>
                <Typography color="secondary">
                  {dict.contact.socialSection.quickResponse.description}
                </Typography>
              </CardHeader>
              <motion.div
                variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } } }}
              >
                <CardContent className="space-y-6">
                  <motion.div variants={infoItemVariants} className="flex items-start gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-action-primary/15 text-action-primary">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <Typography as="p" variant="body-sm" color="disabled" className="uppercase tracking-wide">
                        {dict.contact.infoLabels.email}
                      </Typography>
                      <a
                        href={`mailto:${dict.contact.info.email}`}
                        className="text-text-primary hover:text-action-primary transition-colors"
                      >
                        <Typography as="span" color="primary">{dict.contact.info.email}</Typography>
                      </a>
                    </div>
                  </motion.div>

                  <motion.div variants={infoItemVariants} className="flex items-start gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-action-primary/15 text-action-primary">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <Typography as="p" variant="body-sm" color="disabled" className="uppercase tracking-wide">
                        {dict.contact.infoLabels.location}
                      </Typography>
                      <Typography as="p" color="primary">
                        {dict.contact.info.location}
                      </Typography>
                    </div>
                  </motion.div>

                  <motion.div variants={infoItemVariants} className="flex items-start gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-action-primary/15 text-action-primary">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <Typography as="p" variant="body-sm" color="disabled" className="uppercase tracking-wide">
                        {dict.contact.infoLabels.availability}
                      </Typography>
                      <Typography as="p" color="primary">
                        {dict.contact.info.availability}
                      </Typography>
                    </div>
                  </motion.div>
                </CardContent>
              </motion.div>
            </Card>
          </motion.div>

          <motion.div variants={cardVariants}>
            <Card className="bg-bg-default/20 border-border-default/10 h-full">
              <CardHeader>
                <Typography as="h3" variant="heading-lg" color="primary">
                  {dict.contact.socialSection.title}
                </Typography>
                <Typography color="secondary">
                  {dict.contact.socialSection.subtitle}
                </Typography>
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
                      className="group flex items-center gap-5 rounded-2xl border border-border-default/15 bg-bg-default/40 px-6 py-5 transition-colors hover:border-action-primary/40 hover:bg-bg-default/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-action-primary/60"
                    >
                      <div
                        className={`flex h-12 w-12 items-center justify-center rounded-full ${channel.accent}`}
                      >
                        {channel.icon}
                      </div>
                      <div className="flex flex-col items-start gap-1">
                        <Typography as="span" color="primary" className="font-medium group-hover:text-action-primary">
                          {channel.label}
                        </Typography>
                        <Typography as="span" variant="body-sm" color="secondary">
                          {channel.description}
                        </Typography>
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
