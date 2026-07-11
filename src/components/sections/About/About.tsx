'use client'

import { Typography } from '@tfds/components'
import { MapPin } from '@tfds/icons'
import { motion } from 'motion/react'

import { CARD_ICONS, containerVariants, itemVariants } from './constants'
import { AboutDict } from './types'

export function About({ dict }: { dict: AboutDict }) {
  const cards = [
    dict.about.cards.frontend,
    dict.about.cards.designSystems,
    dict.about.cards.performance,
    dict.about.cards.fullCycle,
  ]

  return (
    <section
      id="about"
      className="bg-bg-page border-border-subtle border-t py-20"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-start gap-16 md:grid-cols-[1fr_1.5fr]">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            <motion.div variants={itemVariants}>
              <Typography
                as="span"
                className="text-action-primary mb-4 block font-mono text-xs tracking-widest"
              >
                {dict.about.eyebrow}
              </Typography>
              <Typography
                as="h2"
                variant="display-md"
                color="primary"
                className="mb-10"
              >
                {dict.about.title}
              </Typography>
            </motion.div>

            <div className="space-y-3">
              {cards.map((card, index) => {
                const Icon = CARD_ICONS[index]
                return (
                  <motion.div
                    key={card.title}
                    variants={itemVariants}
                    className="border-border-subtle hover:border-border-default flex items-start gap-3 border p-4 transition-colors duration-200"
                  >
                    <Icon
                      className="text-action-primary mt-0.5 h-4 w-4 shrink-0"
                      aria-hidden="true"
                    />
                    <div>
                      <Typography
                        as="p"
                        color="primary"
                        className="mb-0.5 text-sm leading-tight font-medium"
                      >
                        {card.title}
                      </Typography>
                      <Typography
                        as="p"
                        className="text-text-tertiary text-xs leading-snug"
                      >
                        {card.description}
                      </Typography>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            <motion.div variants={itemVariants} className="space-y-6">
              {dict.about.paragraphs.map((paragraph) => (
                <Typography
                  key={paragraph[0].text}
                  as="p"
                  color="secondary"
                  className="leading-relaxed"
                >
                  {paragraph.map((segment) => (
                    <span
                      key={segment.text}
                      className={
                        segment.emphasis
                          ? 'text-text-primary font-semibold'
                          : undefined
                      }
                    >
                      {segment.text}
                    </span>
                  ))}
                </Typography>
              ))}
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="border-border-subtle mt-10 flex flex-wrap gap-8 border-t pt-8"
            >
              <div>
                <Typography
                  as="p"
                  color="disabled"
                  className="mb-2 font-mono text-xs tracking-widest"
                >
                  {dict.about.footer.locationLabel}
                </Typography>
                <Typography
                  as="p"
                  color="secondary"
                  className="flex items-center gap-1.5 text-sm"
                >
                  <MapPin
                    className="text-action-primary h-3.5 w-3.5"
                    aria-hidden="true"
                  />
                  {dict.about.footer.location}
                </Typography>
              </div>

              <div>
                <Typography
                  as="p"
                  color="disabled"
                  className="mb-2 font-mono text-xs tracking-widest"
                >
                  {dict.about.footer.languagesLabel}
                </Typography>
                <div className="flex gap-4 text-sm">
                  {dict.about.footer.languages.map((language) => (
                    <Typography key={language.name} as="span" color="secondary">
                      {language.name}{' '}
                      <span className="text-text-disabled text-xs">
                        {language.level}
                      </span>
                    </Typography>
                  ))}
                </div>
              </div>

              <div>
                <Typography
                  as="p"
                  color="disabled"
                  className="mb-2 font-mono text-xs tracking-widest"
                >
                  {dict.about.footer.statusLabel}
                </Typography>
                <span className="text-action-primary flex items-center gap-1.5 text-sm">
                  <motion.span
                    className="bg-action-primary h-1.5 w-1.5 rounded-full"
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                    aria-hidden="true"
                  />
                  {dict.about.footer.status}
                </span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
