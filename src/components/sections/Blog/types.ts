import { Locale } from '@/lib/i18n'

export interface BlogDict {
  blog: {
    eyebrow: string
    title: string
    subtitle: string
    viewAll: string
    minRead: string
    videoLabel: string
  }
  lang?: Locale
}
