"use client";

import { Button } from '@/components/atoms';
import { Badge } from '@/components/atoms';
import { Card, CardContent } from '@/components/molecules';
import { motion, useScroll, useSpring, useTransform } from 'motion/react';
import { useRef } from 'react';
import { HiOutlineArrowDownTray } from 'react-icons/hi2';
import { useAudio } from '@/context/AudioContext';

interface Job {
  period: string;
  title: string;
  company: string;
  description: string;
  skills: string[];
}

interface ExperienceDict {
  experience: {
    title: string;
    subtitle: string;
    downloadCV: string;
    currentLabel: string;
    jobs: {
      heap: Job;
      divam: Job;
      ilia: Job;
    };
  };
  lang?: string;
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, x: -32 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

export function Experience({ dict }: { dict: ExperienceDict }) {
  const audio = useAudio();
  const timelineRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 80%", "end 60%"],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 20,
    restDelta: 0.001,
  });

  const lineHeight = useTransform(scaleY, [0, 1], ["0%", "100%"]);

  const getCVFileName = (): string => {
    const lang = dict.lang || 'pt';
    const fileNames: Record<string, string> = {
      pt: 'CV-Thiago-Felippe-PT.pdf',
      en: 'CV-Thiago-Felippe-EN.pdf',
      es: 'CV-Thiago-Felippe-ES.pdf',
    };
    return fileNames[lang] ?? fileNames.pt;
  };

  const handleDownloadClick = (): void => {
    audio.play('downloadCv');
  };

  const experiences = [
    {
      ...dict.experience.jobs.heap,
      current: false,
    },
    {
      ...dict.experience.jobs.divam,
      current: false,
    },
    {
      ...dict.experience.jobs.ilia,
      current: true,
    },
  ];

  return (
    <section id="experiencia" className="py-20 bg-background-secondary/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="typography-h2 text-text-headline mb-4">
            {dict.experience.title}
          </h2>
          <p className="typography-body text-text-body max-w-2xl mx-auto">
            {dict.experience.subtitle}
          </p>
        </div>

        <motion.div
          ref={timelineRef}
          className="relative"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {/* Trilho da linha (fundo estático) */}
          <div className="absolute left-3 top-2 bottom-2 w-px bg-border-primary/30" />

          {/* Linha animada pelo scroll */}
          <motion.div
            className="absolute left-3 top-2 w-px bg-accent-brand origin-top"
            style={{ height: lineHeight }}
          />

          <div className="space-y-10">
            {experiences.map((experience) => (
              <motion.div
                key={experience.company}
                className="relative pl-12"
                variants={cardVariants}
              >
                {/* Dot */}
                <div className="absolute left-0 top-6 flex items-center justify-center">
                  {experience.current ? (
                    <span className="relative flex h-6 w-6">
                      <motion.span
                        className="absolute inline-flex h-full w-full rounded-full bg-accent-brand/30"
                        animate={{ scale: [1, 1.6, 1], opacity: [0.6, 0, 0.6] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      />
                      <span className="relative inline-flex h-6 w-6 items-center justify-center rounded-full border-2 border-background-primary bg-accent-brand">
                        <span className="h-2 w-2 rounded-full bg-white" />
                      </span>
                    </span>
                  ) : (
                    <span className="h-6 w-6 rounded-full border-2 border-background-primary bg-border-primary flex items-center justify-center">
                      <span className="h-2 w-2 rounded-full bg-text-body/40" />
                    </span>
                  )}
                </div>

                {/* Card */}
                <motion.div
                  whileHover={{ y: -3, transition: { duration: 0.2 } }}
                >
                  <Card className="bg-background-primary border-border-primary/10 shadow-sm hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="p-6">
                      {/* Header */}
                      <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                        <div>
                          <h3 className="typography-h5 text-text-headline">
                            {experience.title}
                          </h3>
                          <h4 className="typography-body-lg text-accent-brand mt-0.5">
                            {experience.company}
                          </h4>
                        </div>
                        <div className="flex flex-wrap gap-2 items-center">
                          <Badge variant="success" size="sm">
                            {experience.period}
                          </Badge>
                          {experience.current && (
                            <Badge variant="current" size="sm">
                              {dict.experience.currentLabel}
                            </Badge>
                          )}
                        </div>
                      </div>

                      {/* Description */}
                      <p className="typography-body text-text-body mb-4">
                        {experience.description}
                      </p>

                      {/* Skills */}
                      <div className="flex flex-wrap gap-2">
                        {experience.skills.map((skill) => (
                          <Badge key={skill} variant="neutral" size="sm">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="text-center mt-16">
          <Button asChild size="lg" onClick={handleDownloadClick}>
            <a href={`/${getCVFileName()}`} download={getCVFileName()}>
              <HiOutlineArrowDownTray />
              {dict.experience.downloadCV}
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
