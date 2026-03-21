"use client";

import { Button } from "@/components/atoms";
import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { HiOutlineArrowDownTray } from "react-icons/hi2";
import { useAudio } from "@/context/AudioContext";

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
    transition: { duration: 0.7, ease: "easeOut" },
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
  };

  const handleSocialClick = () => {
    audio.play("buttonClick");
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
              <h1 className="typography-display text-text-headline">
                Fala aí!{" "}
                <motion.span
                  aria-hidden="true"
                  style={{ display: "inline-block", transformOrigin: "70% 70%" }}
                  animate={{ rotate: [0, 14, -8, 14, -4, 10, 0] }}
                  transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 3, ease: "easeInOut" }}
                >
                  👋
                </motion.span>
              </h1>
              <h2 className="typography-h2 text-text-heading">
                {dict.hero.intro}{" "}
                <span className="text-accent-brand">{dict.hero.name}</span>
              </h2>
            </motion.div>

            <motion.p className="typography-h5 text-text-body flex flex-wrap items-baseline gap-x-2" variants={itemVariants}>
              {dict.hero.rolePre}{" "}
              <span className="relative inline-flex overflow-hidden" style={{ minWidth: "14ch" }}>
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.span
                    key={ROTATING_WORDS[wordIndex]}
                    className="text-accent-brand font-semibold inline-block"
                    initial={{ y: "100%", opacity: 0 }}
                    animate={{ y: "0%", opacity: 1 }}
                    exit={{ y: "-100%", opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                  >
                    {ROTATING_WORDS[wordIndex]}
                  </motion.span>
                </AnimatePresence>
              </span>
            </motion.p>

            <motion.p className="typography-body-lg text-text-body" variants={itemVariants}>
              {dict.hero.descriptionPre}{" "}
              <span className="relative inline-block">
                <span className="relative z-10 font-semibold text-text-headline">
                  {dict.hero.descriptionHighlight}
                </span>
                <motion.span
                  aria-hidden="true"
                  className="absolute bottom-0 left-0 h-[6px] w-full bg-accent-brand/30 rounded-full"
                  initial={{ scaleX: 0, originX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.6, ease: "easeOut", delay: 1.4 }}
                  style={{ transformOrigin: "left" }}
                />
              </span>{" "}
              {dict.hero.descriptionPost}
            </motion.p>

            <motion.div className="flex flex-row gap-4 items-start" variants={itemVariants}>
              <Button
                asChild
                variant="outline"
                size="lg"
                onClick={handleDownloadClick}
              >
                <a href={`/${getCVFileName()}`} download={getCVFileName()}>
                  <HiOutlineArrowDownTray />
                  {dict.hero.downloadCV}
                </a>
              </Button>
              <div className="flex gap-3">
                <Button
                  asChild
                  variant="ghost"
                  size="icon"
                  onClick={handleSocialClick}
                >
                  <a
                    href="https://linkedin.com/in/othiagofelippe"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Visitar perfil no LinkedIn"
                  >
                    <FaLinkedin size={20} aria-hidden="true" />
                  </a>
                </Button>
                <Button
                  asChild
                  variant="ghost"
                  size="icon"
                  onClick={handleSocialClick}
                >
                  <a
                    href="https://github.com/othiagofelippe"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Visitar perfil no GitHub"
                  >
                    <FaGithub size={20} aria-hidden="true" />
                  </a>
                </Button>
              </div>
            </motion.div>
          </motion.div>

          {/* Image */}
          <motion.div className="flex justify-center lg:justify-end" style={{ y: imageY }}>
            <motion.div
              className="w-80 h-80 sm:w-96 sm:h-96 rounded-3xl overflow-hidden border-4 sm:border-8 border-background-primary shadow-xl"
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
