import { getDictionary } from '@/lib/dictionaries'
import { Locale } from '@/lib/i18n'
import {
  About,
  Blog,
  Contact,
  Experience,
  Hero,
  Projects,
  Skills,
} from '../../components/sections'
import { PageTransition } from '../../components/molecules'

export default async function Home({
  params,
}: {
  params: Promise<{ lang: Locale }>
}) {
  const { lang } = await params
  const dict = await getDictionary(lang)

  return (
    <PageTransition lang={lang}>
      <div className="min-h-screen">
        <Hero dict={{ ...dict, lang }} />
        <About dict={dict} />
        <Experience dict={{ ...dict, lang }} />
        <Projects dict={{ ...dict, lang }} />
        <Skills dict={dict} />
        <Blog dict={{ ...dict, lang }} />
        <Contact dict={dict} />
      </div>
    </PageTransition>
  )
}
