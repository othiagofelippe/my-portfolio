import { getDictionary } from "@/lib/dictionaries";
import { Locale } from "@/lib/i18n";
import {
  Contact,
  Education,
  Experience,
  Hero,
  Projects,
  Services,
  Skills,
} from "../../components/sections";
import { PageTransition } from "../../components/molecules";

export default async function Home({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <PageTransition lang={lang}>
      <div className="min-h-screen">
        <Hero dict={{ ...dict, lang }} />
        <Services dict={dict} />
        <Experience dict={{ ...dict, lang }} />
        <Education dict={dict} />
        <Projects dict={dict} />
        <Skills dict={dict} />
        <Contact dict={dict} />
      </div>
    </PageTransition>
  );
}
