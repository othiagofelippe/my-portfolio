import { Hero } from "../components/Hero";
import { Services } from "../components/Services";
import { Projects } from "../components/Projects";
import { Experience } from "../components/Experience";
import { Skills } from "../components/Skills";
import { Contact } from "../components/Contact";
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
    <div className="min-h-screen">
      <Hero lang={lang} dict={dict} />
      <Services lang={lang} dict={dict} />
      <Experience lang={lang} dict={dict} />
      <Projects lang={lang} dict={dict} />
      <Skills lang={lang} dict={dict} />
      <Contact lang={lang} dict={dict} />
    </div>
  );
}
