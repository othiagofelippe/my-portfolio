import {
  Hero,
  Services,
  Experience,
  Education,
  Skills,
  Contact
} from "../components/sections";
import { PageTransition } from "../components/ui/PageTransition";
import { Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";

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
        <Experience dict={dict} />
        <Education dict={dict} />
        {/* <Projects /> */}
        <Skills dict={dict} />
        <Contact dict={dict} />
      </div>
    </PageTransition>
  );
}
