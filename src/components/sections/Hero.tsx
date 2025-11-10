"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "motion/react";
import Image from "next/image";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { useAudio } from "@/context/AudioContext";

interface HeroDict {
  hero: {
    greeting: string;
    intro: string;
    name: string;
    role: string;
    description: string;
    skills: string[];
    downloadCV: string;
  };
}

export function Hero({ dict }: { dict: HeroDict & { lang?: string } }) {
  const audio = useAudio();

  const getCVFileName = () => {
    const lang = dict.lang || "pt";
    const fileNames = {
      pt: "CV-Thiago-Felippe-PT.pdf",
      en: "CV-Thiago-Felippe-EN.pdf",
      es: "CV-Thiago-Felippe-ES.pdf",
    };
    return fileNames[lang as keyof typeof fileNames] || fileNames.pt;
  };

  const handleDownloadClick = () => {
    audio.play("downloadCv");
  };

  const handleSocialClick = () => {
    audio.play("buttonClick");
  };
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background-primary to-background-secondary dark:from-background-primary-dark dark:to-background-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-20 md:pt-16 lg:pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h1 className="font-poppins text-4xl sm:text-5xl lg:text-6xl text-text-headline dark:text-text-headline-dark">
                {dict.hero.greeting}
              </h1>
              <h2 className="font-poppins text-2xl sm:text-3xl lg:text-4xl text-text-heading dark:text-text-heading-dark">
                {dict.hero.intro}{" "}
                <span className="text-accent-brand">{dict.hero.name}</span>
              </h2>
            </div>

            <p className="font-roboto text-xl sm:text-2xl font-medium text-text-body dark:text-text-body-dark leading-relaxed">
              {dict.hero.role}
            </p>

            <p className="font-roboto text-lg text-text-body dark:text-text-body-dark leading-relaxed">
              {dict.hero.description}
            </p>

            <div className="flex flex-wrap gap-3">
              {dict.hero.skills.map((skill: string, index: number) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="font-roboto text-sm font-medium bg-accent-brand/10 text-accent-brand border border-accent-brand/20 hover:bg-accent-brand/20 transition-colors"
                >
                  {skill}
                </Badge>
              ))}
            </div>

            <div className="flex flex-row gap-4 items-start">
              <Button
                asChild
                variant="ghost"
                size="lg"
                onClick={handleDownloadClick}
                className="font-roboto text-base font-medium border border-border-primary hover:bg-background-secondary/50 text-text-body dark:text-text-body-dark hover:text-text-headline dark:hover:text-text-headline-dark transition-colors cursor-pointer bg-transparent"
              >
                <a href={`/${getCVFileName()}`} download={getCVFileName()}>
                  {dict.hero.downloadCV}
                </a>
              </Button>
              <div className="flex gap-3">
                <Button
                  asChild
                  variant="ghost"
                  size="icon"
                  onClick={handleSocialClick}
                  className="p-3 border border-border-primary hover:bg-background-secondary/50 text-text-span dark:text-text-span-dark hover:text-accent-brand transition-all cursor-pointer bg-transparent"
                  title="LinkedIn"
                >
                  <a
                    href="https://linkedin.com/in/othiagofelippe"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaLinkedin size={20} />
                  </a>
                </Button>
                <Button
                  asChild
                  variant="ghost"
                  size="icon"
                  onClick={handleSocialClick}
                  className="p-3 border border-border-primary hover:bg-background-secondary/50 text-text-span dark:text-text-span-dark hover:text-text-headline dark:hover:text-text-headline-dark transition-all cursor-pointer bg-transparent"
                  title="GitHub"
                >
                  <a
                    href="https://github.com/othiagofelippe"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaGithub size={20} />
                  </a>
                </Button>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="flex justify-center lg:justify-end">
            <motion.div
              className="w-80 h-80 sm:w-96 sm:h-96 rounded-3xl overflow-hidden border-4 sm:border-8 border-background-primary dark:border-background-tertiary shadow-xl"
              initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, rotate: 2 }}
              transition={{
                duration: 0.8,
                ease: "easeOut",
                delay: 0.3,
              }}
              whileHover={{
                rotate: 0,
                scale: 1.05,
                transition: { duration: 0.3 },
              }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                animate={{
                  rotate: [2, -1, 2],
                }}
                transition={{
                  duration: 12,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              >
                <Image
                  src="https://github.com/othiagofelippe.png"
                  alt="Thiago Felippe"
                  width={384}
                  height={384}
                  className="w-full h-full object-cover cursor-pointer"
                  priority
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
