'use client'

import { Badge } from '@tfds/react'
import { Typography } from '@tfds/react'
import { Card, CardContent } from '@/components/molecules'
import { motion } from 'motion/react'

interface SkillsDict {
  skills: {
    eyebrow: string
    title: string
    subtitle: string
    categories: {
      frontend: { title: string; skills: string[] }
      backend: { title: string; skills: string[] }
      tools: { title: string; skills: string[] }
    }
  }
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' as const },
  },
}

const badgeContainerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.04, delayChildren: 0.2 },
  },
}

const badgeVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.25, ease: 'easeOut' as const },
  },
}

export function Skills({ dict }: { dict: SkillsDict }) {
  const skillCategories = [
    {
      title: dict.skills.categories.frontend.title,
      skills: dict.skills.categories.frontend.skills,
      dotClassName: 'bg-feedback-success',
      badgeVariant: 'success' as const,
    },
    {
      title: dict.skills.categories.backend.title,
      skills: dict.skills.categories.backend.skills,
      dotClassName: 'bg-feedback-warning',
      badgeVariant: 'warning' as const,
    },
    {
      title: dict.skills.categories.tools.title,
      skills: dict.skills.categories.tools.skills,
      dotClassName: 'bg-action-primary',
      badgeVariant: 'info' as const,
    },
  ]

  return (
    <section id="skills" className="bg-bg-default/30 py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <div className="mb-4 block font-mono text-xs tracking-widest [--tfds-color-text-primary:var(--tfds-color-action-primary)]">
            <Typography as="span">{dict.skills.eyebrow}</Typography>
          </div>
          <div className="mb-3">
            <Typography as="h2" variant="display-md" color="primary">
              {dict.skills.title}
            </Typography>
          </div>
          <Typography color="secondary">{dict.skills.subtitle}</Typography>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 gap-8 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {skillCategories.map((category) => (
            <motion.div
              key={category.title}
              variants={cardVariants}
              whileHover={{ y: -3, transition: { duration: 0.2 } }}
            >
              <Card className="bg-bg-page border-border-default/10 h-full shadow-sm transition-shadow duration-300 hover:shadow-lg">
                <CardContent className="p-6">
                  <div className="mb-6 flex items-center gap-3">
                    <span
                      className={`h-2.5 w-2.5 rounded-full ${category.dotClassName}`}
                      aria-hidden="true"
                    />
                    <Typography as="h3" variant="heading-md" color="primary">
                      {category.title}
                    </Typography>
                  </div>

                  <motion.div
                    className="flex flex-wrap gap-3"
                    variants={badgeContainerVariants}
                  >
                    {category.skills.map((skill) => (
                      <motion.div
                        key={skill}
                        variants={badgeVariants}
                        whileHover={{
                          scale: 1.05,
                          transition: { duration: 0.15 },
                        }}
                      >
                        <Badge variant={category.badgeVariant}>{skill}</Badge>
                      </motion.div>
                    ))}
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
