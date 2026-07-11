import { getDictionary } from '@/lib/dictionaries'
import { Locale } from '@/lib/i18n'
import { generateMetadata as genMetadata } from '@/lib/metadata'
import {
  generatePersonSchema,
  generateProfilePageSchema,
} from '@/lib/structured-data'
import { Analytics } from '@vercel/analytics/react'
import { MotionConfig } from 'motion/react'
import { Poppins, Roboto } from 'next/font/google'
import { Footer, Header, ScrollToTop } from '../../components'
import '../globals.css'
import { ThemeProvider } from '../providers/ThemeProvider'
import { AudioProvider } from '@/context/AudioContext'

const poppins = Poppins({
  variable: '--font-poppins',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
})

const roboto = Roboto({
  variable: '--font-roboto',
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  display: 'swap',
})

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  const dict = await getDictionary(lang as Locale)
  return genMetadata(lang as Locale, dict)
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  const dict = await getDictionary(lang as Locale)

  const personSchema = generatePersonSchema(lang as Locale, dict)
  const profilePageSchema = generateProfilePageSchema(lang as Locale)

  return (
    <html lang={lang} className="scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(profilePageSchema),
          }}
        />
      </head>
      <body className={`${poppins.variable} ${roboto.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          themes={['light', 'dark', 'ocean-sunset']}
        >
          <MotionConfig reducedMotion="user">
            <AudioProvider>
              <Header lang={lang as Locale} dict={dict} />
              {children}
              <Footer dict={dict} />
              <ScrollToTop />
            </AudioProvider>
          </MotionConfig>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
