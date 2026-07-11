'use client'

import { Button } from '@tfds/components'
import { Badge } from '@tfds/components'
import { Typography } from '@tfds/components'
import { Card, CardContent, CardHeader } from '@/components/molecules'
import { motion, useScroll, useSpring, useTransform } from 'motion/react'
import { useRef } from 'react'
import { Download, FileText, GraduationCap } from '@tfds/icons'
import { useAudio } from '@/context/AudioContext'
import { getCVFileName } from '@/lib/utils'

interface Job {
  period: string
  title: string
  company: string
  description: string
  skills: string[]
}

interface ExperienceDict {
  experience: {
    eyebrow: string
    title: string
    subtitle: string
    downloadCV: string
    currentLabel: string
    jobs: {
      heap: Job
      divam: Job
      ilia: Job
    }
    formation: {
      title: string
      course: string
      institution: string
      location: string
      period: string
      type: string
    }
    certification: {
      title: string
      name: string
      institution: string
      date: string
      technologiesLabel: string
      technologies: string[]
    }
  }
  lang?: string
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, x: -32 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: 'easeOut' as const },
  },
}

export function Experience({ dict }: { dict: ExperienceDict }) {
  const audio = useAudio()
  const timelineRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 80%', 'end 60%'],
  })

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 20,
    restDelta: 0.001,
  })

  const lineHeight = useTransform(scaleY, [0, 1], ['0%', '100%'])

  const handleDownloadClick = (): void => {
    const fileName = getCVFileName(dict.lang || 'pt')
    audio.play('downloadCv')
    const link = document.createElement('a')
    link.href = `/${fileName}`
    link.download = fileName
    link.click()
  }

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
  ]

  return (
    <section id="experience" className="bg-bg-default/30 py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <Typography
            as="span"
            className="text-action-primary mb-4 block font-mono text-xs tracking-widest"
          >
            {dict.experience.eyebrow}
          </Typography>
          <Typography
            as="h2"
            variant="display-md"
            color="primary"
            className="mb-3"
          >
            {dict.experience.title}
          </Typography>
          <Typography color="secondary">{dict.experience.subtitle}</Typography>
        </div>

        <motion.div
          ref={timelineRef}
          className="relative"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {/* Trilho da linha (fundo estático) */}
          <div className="bg-border-default/30 absolute top-2 bottom-2 left-3 w-px" />

          {/* Linha animada pelo scroll */}
          <motion.div
            className="bg-action-primary absolute top-2 left-3 w-px origin-top"
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
                <div className="absolute top-6 left-0 flex items-center justify-center">
                  {experience.current ? (
                    <span className="relative flex h-6 w-6">
                      <motion.span
                        className="bg-action-primary/30 absolute inline-flex h-full w-full rounded-full"
                        animate={{ scale: [1, 1.6, 1], opacity: [0.6, 0, 0.6] }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: 'easeInOut',
                        }}
                      />
                      <span className="border-bg-page bg-action-primary relative inline-flex h-6 w-6 items-center justify-center rounded-full border-2">
                        <span className="h-2 w-2 rounded-full bg-white" />
                      </span>
                    </span>
                  ) : (
                    <span className="border-bg-page bg-border-default flex h-6 w-6 items-center justify-center rounded-full border-2">
                      <span className="bg-text-body/40 h-2 w-2 rounded-full" />
                    </span>
                  )}
                </div>

                {/* Card */}
                <motion.div
                  whileHover={{ y: -3, transition: { duration: 0.2 } }}
                >
                  <Card className="bg-bg-page border-border-default/10 shadow-sm transition-shadow duration-300 hover:shadow-lg">
                    <CardContent className="p-6">
                      {/* Header */}
                      <div className="mb-3 flex flex-wrap items-start justify-between gap-2">
                        <div>
                          <Typography
                            as="h3"
                            variant="heading-md"
                            color="primary"
                          >
                            {experience.title}
                          </Typography>
                          <Typography
                            as="h4"
                            variant="body-lg"
                            className="text-action-primary mt-0.5"
                          >
                            {experience.company}
                          </Typography>
                        </div>
                        <div className="flex flex-wrap items-center gap-2">
                          <Badge variant="success" size="sm">
                            {experience.period}
                          </Badge>
                          {experience.current && (
                            <Badge
                              variant="success"
                              size="sm"
                              className="gap-1.5"
                            >
                              <motion.span
                                className="bg-feedback-success h-1.5 w-1.5 shrink-0 rounded-full"
                                animate={{
                                  opacity: [1, 0.3, 1],
                                  scale: [1, 0.8, 1],
                                }}
                                transition={{
                                  duration: 1.8,
                                  repeat: Infinity,
                                  ease: 'easeInOut',
                                }}
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

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2">
          <Card className="bg-bg-page border-border-default/10 shadow-sm">
            <CardHeader className="pb-4">
              <Typography
                as="h3"
                variant="heading-md"
                color="primary"
                className="flex items-center gap-3"
              >
                <GraduationCap className="text-action-primary h-6 w-6" />
                {dict.experience.formation.title}
              </Typography>
            </CardHeader>
            <CardContent>
              <Typography
                as="h4"
                variant="body-lg"
                color="primary"
                className="mb-2"
              >
                {dict.experience.formation.course}
              </Typography>
              <div className="space-y-1">
                <Typography as="p" color="secondary" className="font-medium">
                  {dict.experience.formation.institution}
                </Typography>
                <Typography as="p" color="secondary">
                  {dict.experience.formation.location}
                </Typography>
                <Typography
                  as="p"
                  color="secondary"
                  className="flex items-center gap-4"
                >
                  <span>{dict.experience.formation.period}</span>
                  <Badge variant="default">
                    {dict.experience.formation.type}
                  </Badge>
                </Typography>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-bg-page border-border-default/10 shadow-sm">
            <CardHeader className="pb-4">
              <Typography
                as="h3"
                variant="heading-md"
                color="primary"
                className="flex items-center gap-3"
              >
                <FileText className="text-action-primary h-6 w-6" />
                {dict.experience.certification.title}
              </Typography>
            </CardHeader>
            <CardContent>
              <Typography
                as="h4"
                variant="body-lg"
                color="primary"
                className="mb-2"
              >
                {dict.experience.certification.name}
              </Typography>
              <div className="mb-4 space-y-1">
                <Typography as="p" color="secondary" className="font-medium">
                  {dict.experience.certification.institution}
                </Typography>
                <Typography as="p" color="secondary">
                  {dict.experience.certification.date}
                </Typography>
              </div>
              <Typography
                as="p"
                variant="body-sm"
                color="primary"
                className="mb-3 font-medium"
              >
                {dict.experience.certification.technologiesLabel}:
              </Typography>
              <div className="flex flex-wrap gap-2">
                {dict.experience.certification.technologies.map((tech) => (
                  <Badge key={tech} variant="success">
                    {tech}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-16 text-center">
          <Button size="lg" onClick={handleDownloadClick}>
            <Download />
            {dict.experience.downloadCV}
          </Button>
        </div>
      </div>
    </section>
  )
}
