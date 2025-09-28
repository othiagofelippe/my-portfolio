import { getDictionary } from "@/src/lib/dictionaries";
import { Locale } from "@/src/lib/i18n";
import {
  Contact,
  Education,
  Experience,
  Hero,
  Services,
  Skills,
} from "../../components/sections";
import { PageTransition } from "../../components/ui/PageTransition";

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
        {/* <Projects /> */}
        <Skills dict={dict} />
        <Contact dict={dict} />
      </div>
    </PageTransition>
  );
}
