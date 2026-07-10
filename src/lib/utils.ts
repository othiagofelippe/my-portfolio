import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}

const CV_FILE_NAMES: Record<string, string> = {
  pt: 'CV-Thiago-Felippe-PT.pdf',
  en: 'CV-Thiago-Felippe-EN.pdf',
  es: 'CV-Thiago-Felippe-ES.pdf',
}

export function getCVFileName(lang: string): string {
  return CV_FILE_NAMES[lang] ?? CV_FILE_NAMES.pt
}
