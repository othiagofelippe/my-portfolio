import { Code2, Globe, LayoutDashboard, TrendingUp } from '@tfds/icons'

export const CARD_ICONS = [Code2, LayoutDashboard, TrendingUp, Globe]

export const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
}

export const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' as const },
  },
}
