import { Metadata } from 'next'
import { Locale } from './i18n'

interface DictionaryMetadata {
  metadata: {
    title: string
    description: string
    keywords: string
    author: string
    twitterHandle: string
  }
  hero: {
    name: string
  }
}

export function generateMetadata(
  lang: Locale,
  dict: DictionaryMetadata
): Metadata {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || 'https://othiagofelippe.com'

  const localeMap: Record<Locale, string> = {
    pt: 'pt_BR',
    en: 'en_US',
    es: 'es_ES',
  }

  return {
    metadataBase: new URL(baseUrl),
    title: {
      default: dict.metadata.title,
      template: `%s | ${dict.hero.name}`,
    },
    description: dict.metadata.description,
    keywords: dict.metadata.keywords.split(', '),
    authors: [{ name: dict.metadata.author }],
    creator: dict.metadata.author,
    publisher: dict.metadata.author,
    openGraph: {
      type: 'website',
      locale: localeMap[lang],
      url: `${baseUrl}/${lang}`,
      title: dict.metadata.title,
      description: dict.metadata.description,
      siteName: dict.hero.name,
      images: [
        {
          url: `/og-image-${lang}.png`,
          width: 1200,
          height: 630,
          alt: `${dict.hero.name} - Portfolio`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: dict.metadata.title,
      description: dict.metadata.description,
      creator: dict.metadata.twitterHandle,
      images: [`/og-image-${lang}.png`],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical: `${baseUrl}/${lang}`,
      languages: {
        'pt-BR': `${baseUrl}/pt`,
        'en-US': `${baseUrl}/en`,
        'es-ES': `${baseUrl}/es`,
      },
    },
  }
}
