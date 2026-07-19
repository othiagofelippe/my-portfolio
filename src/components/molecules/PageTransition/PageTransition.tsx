'use client'

import { motion, AnimatePresence } from 'motion/react'
import { ReactNode } from 'react'

interface PageTransitionProps {
  children: ReactNode
  lang: string
}

export function PageTransition({ children, lang }: PageTransitionProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={lang}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{
          duration: 0.3,
          ease: 'easeInOut',
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
