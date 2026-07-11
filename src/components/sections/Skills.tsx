'use client'

import { Badge } from '@tfds/components'
import { Typography } from '@tfds/components'
import { Card, CardContent } from '@/components/molecules'
import { motion } from 'motion/react'
import { Settings2, Smartphone, Server } from '@tfds/icons'

interface SkillsDict {
  skills: {
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
      icon: <Smartphone className="h-6 w-6" />,
      skills: dict.skills.categories.frontend.skills,
    },
    {
      title: dict.skills.categories.backend.title,
      icon: <Server className="h-6 w-6" />,
      skills: dict.skills.categories.backend.skills,
    },
    {
      title: dict.skills.categories.tools.title,
      icon: <Settings2 className="h-6 w-6" />,
      skills: dict.skills.categories.tools.skills,
    },
  ]

  return (
    <section id="skills" className="bg-bg-default/30 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <Typography
            as="h2"
            variant="display-sm"
            color="primary"
            align="center"
            className="mb-4"
          >
            {dict.skills.title}
          </Typography>
          <Typography
            color="secondary"
            align="center"
            className="mx-auto max-w-2xl"
          >
            {dict.skills.subtitle}
          </Typography>
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
                    <div className="text-action-primary">{category.icon}</div>
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
                        <Badge variant="info">{skill}</Badge>
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
