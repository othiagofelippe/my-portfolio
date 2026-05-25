"use client";

import { Button } from "@tfds/components";
import { Typography } from "@tfds/components";
import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Github, Linkedin, Download } from "@tfds/icons";
import { useAudio } from "@/context/AudioContext";

const MotionTypography = motion.create(Typography);

const ROTATING_WORDS = ["Design Systems", "React & Next.js", "React Native", "TypeScript"];
const ROTATION_INTERVAL = 2800;

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.18, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" as const },
  },
};

interface HeroDict {
  hero: {
    greeting: string;
    intro: string;
    name: string;
    role: string;
    rolePre: string;
    description: string;
    descriptionPre: string;
    descriptionHighlight: string;
    descriptionPost: string;
    downloadCV: string;
  };
}

export function Hero({ dict }: { dict: HeroDict & { lang?: string } }) {
  const audio = useAudio();
  const [wordIndex, setWordIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], [0, -60]);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % ROTATING_WORDS.length);
    }, ROTATION_INTERVAL);
    return () => clearInterval(interval);
  }, []);

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
    const link = document.createElement("a");
    link.href = `/${getCVFileName()}`;
    link.download = getCVFileName();
    link.click();
  };

  const handleExternalLink = (url: string) => {
    audio.play("buttonClick");
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <section ref={sectionRef} className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background-primary to-background-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-20 md:pt-16 lg:pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            className="space-y-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div className="space-y-4" variants={itemVariants}>
              <Typography as="h1" variant="display-lg" color="primary">
                Fala aí!{" "}
                <motion.span
                  aria-hidden="true"
                  style={{ display: "inline-block", transformOrigin: "70% 70%" }}
                  animate={{ rotate: [0, 14, -8, 14, -4, 10, 0] }}
                  transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 3, ease: "easeInOut" }}
                >
                  👋
                </motion.span>
              </Typography>
              <Typography as="h2" variant="display-sm" color="primary">
                {dict.hero.intro}{" "}
                <span className="text-action-primary">{dict.hero.name}</span>
              </Typography>
            </motion.div>

            <MotionTypography as="p" variant="heading-md" color="secondary" className="flex flex-wrap items-baseline gap-x-2" variants={itemVariants}>
              {dict.hero.rolePre}{" "}
              <span className="relative inline-flex overflow-hidden" style={{ minWidth: "14ch" }}>
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.span
                    key={ROTATING_WORDS[wordIndex]}
                    className="text-action-primary font-semibold inline-block"
                    initial={{ y: "100%", opacity: 0 }}
                    animate={{ y: "0%", opacity: 1 }}
                    exit={{ y: "-100%", opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                  >
                    {ROTATING_WORDS[wordIndex]}
                  </motion.span>
                </AnimatePresence>
              </span>
            </MotionTypography>

            <MotionTypography variant="body-lg" color="secondary" variants={itemVariants}>
              {dict.hero.descriptionPre}{" "}
              <span className="relative inline-block">
                <span className="relative z-10 font-semibold text-text-primary">
                  {dict.hero.descriptionHighlight}
                </span>
                <motion.span
                  aria-hidden="true"
                  className="absolute bottom-0 left-0 h-[6px] w-full bg-action-primary/30 rounded-full"
                  initial={{ scaleX: 0, originX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.6, ease: "easeOut", delay: 1.4 }}
                  style={{ transformOrigin: "left" }}
                />
              </span>{" "}
              {dict.hero.descriptionPost}
            </MotionTypography>

            <motion.div className="flex flex-row gap-4 items-center" variants={itemVariants}>
              <Button
                variant="outline"
                size="md"
                onClick={handleDownloadClick}
              >
                <Download />
                {dict.hero.downloadCV}
              </Button>
              <div className="flex gap-3">
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Visitar perfil no LinkedIn"
                  onClick={() => handleExternalLink("https://linkedin.com/in/othiagofelippe")}
                >
                  <Linkedin className="w-5 h-5" aria-hidden="true" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Visitar perfil no GitHub"
                  onClick={() => handleExternalLink("https://github.com/othiagofelippe")}
                >
                  <Github className="w-5 h-5" aria-hidden="true" />
                </Button>
              </div>
            </motion.div>
          </motion.div>

          {/* Image */}
          <motion.div className="flex justify-center lg:justify-end" style={{ y: imageY }}>
            <motion.div
              className="w-80 h-80 sm:w-96 sm:h-96 rounded-3xl overflow-hidden border-4 sm:border-8 border-bg-page shadow-xl"
              initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, rotate: 2, y: [0, -10, 0] }}
              transition={{
                opacity: { duration: 0.8, ease: "easeOut", delay: 0.6 },
                scale: { duration: 0.8, ease: "easeOut", delay: 0.6 },
                rotate: { duration: 0.8, ease: "easeOut", delay: 0.6 },
                y: { duration: 4, ease: "easeInOut", repeat: Infinity, repeatType: "reverse", delay: 1.4 },
              }}
              whileHover={{
                rotate: 0,
                scale: 1.05,
                transition: { duration: 0.3 },
              }}
              whileTap={{ scale: 0.95 }}
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
    </section>
  );
}
