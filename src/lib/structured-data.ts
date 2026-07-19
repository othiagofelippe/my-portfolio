import { Locale } from './i18n'

interface Dictionary {
  hero: {
    name: string
  }
  contact: {
    info: {
      email: string
      location: string
    }
  }
}

export function generatePersonSchema(lang: Locale, dict: Dictionary) {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || 'https://othiagofelippe.com'

  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: dict.hero.name,
    jobTitle: 'Front-End Developer',
    description:
      lang === 'pt'
        ? 'Desenvolvedor Front-End Pleno especializado em React, Next.js e React Native'
        : lang === 'en'
          ? 'Mid-Level Front-End Developer specializing in React, Next.js and React Native'
          : 'Desarrollador Front-End Pleno especializado en React, Next.js y React Native',
    url: `${baseUrl}/${lang}`,
    image: 'https://github.com/othiagofelippe.png',
    email: dict.contact.info.email,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Rio de Janeiro',
      addressRegion: 'RJ',
      addressCountry: 'BR',
    },
    knowsAbout: [
      'React',
      'Next.js',
      'TypeScript',
      'React Native',
      'JavaScript',
      'Web Development',
      'Front-End Development',
    ],
    sameAs: [
      'https://linkedin.com/in/othiagofelippe',
      'https://github.com/othiagofelippe',
    ],
  }
}

export function generateProfilePageSchema(lang: Locale) {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || 'https://othiagofelippe.com'

  return {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    dateCreated: '2024-09-05',
    dateModified: new Date().toISOString().split('T')[0],
    mainEntity: {
      '@type': 'Person',
      name: 'Thiago Felippe',
      alternateName: 'Thiago Felippe',
      identifier: `${baseUrl}/${lang}`,
      description:
        lang === 'pt'
          ? 'Desenvolvedor Front-End Pleno com foco em React e Next.js'
          : lang === 'en'
            ? 'Mid-Level Front-End Developer focused on React and Next.js'
            : 'Desarrollador Front-End Pleno enfocado en React y Next.js',
      image: 'https://github.com/othiagofelippe.png',
    },
  }
}
