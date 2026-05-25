"use client";

import { Button } from '@tfds/components';
import { Badge } from '@tfds/components';
import { Typography } from '@tfds/components';
import { Card, CardContent } from '@/components/molecules';
import { motion, useScroll, useSpring, useTransform } from 'motion/react';
import { useRef } from 'react';
import { Download } from '@tfds/icons';
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
    const link = document.createElement('a');
    link.href = `/${getCVFileName()}`;
    link.download = getCVFileName();
    link.click();
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
    <section id="experiencia" className="py-20 bg-bg-default/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Typography as="h2" variant="display-sm" color="primary" className="mb-4">
            {dict.experience.title}
          </Typography>
          <Typography color="secondary" className="max-w-2xl mx-auto">
            {dict.experience.subtitle}
          </Typography>
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
          <div className="absolute left-3 top-2 bottom-2 w-px bg-border-default/30" />

          {/* Linha animada pelo scroll */}
          <motion.div
            className="absolute left-3 top-2 w-px bg-action-primary origin-top"
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
                        className="absolute inline-flex h-full w-full rounded-full bg-action-primary/30"
                        animate={{ scale: [1, 1.6, 1], opacity: [0.6, 0, 0.6] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      />
                      <span className="relative inline-flex h-6 w-6 items-center justify-center rounded-full border-2 border-bg-page bg-action-primary">
                        <span className="h-2 w-2 rounded-full bg-white" />
                      </span>
                    </span>
                  ) : (
                    <span className="h-6 w-6 rounded-full border-2 border-bg-page bg-border-default flex items-center justify-center">
                      <span className="h-2 w-2 rounded-full bg-text-body/40" />
                    </span>
                  )}
                </div>

                {/* Card */}
                <motion.div
                  whileHover={{ y: -3, transition: { duration: 0.2 } }}
                >
                  <Card className="bg-bg-page border-border-default/10 shadow-sm hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="p-6">
                      {/* Header */}
                      <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                        <div>
                          <Typography as="h3" variant="heading-md" color="primary">
                            {experience.title}
                          </Typography>
                          <Typography as="h4" variant="body-lg" className="text-action-primary mt-0.5">
                            {experience.company}
                          </Typography>
                        </div>
                        <div className="flex flex-wrap gap-2 items-center">
                          <Badge variant="success" size="sm">
                            {experience.period}
                          </Badge>
                          {experience.current && (
                            <Badge variant="success" size="sm" className="gap-1.5">
                              <motion.span
                                className="w-1.5 h-1.5 rounded-full bg-feedback-success shrink-0"
                                animate={{ opacity: [1, 0.3, 1], scale: [1, 0.8, 1] }}
                                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                                aria-hidden="true"
                              />
                              {dict.experience.currentLabel}
                            </Badge>
                          )}
                        </div>
                      </div>

                      {/* Description */}
                      <Typography color="secondary" className="mb-4">
                        {experience.description}
                      </Typography>

                      {/* Skills */}
                      <div className="flex flex-wrap gap-2">
                        {experience.skills.map((skill) => (
                          <Badge key={skill} variant="default" size="sm">
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
          <Button size="lg" onClick={handleDownloadClick}>
            <Download />
            {dict.experience.downloadCV}
          </Button>
        </div>
      </div>
    </section>
  );
}
