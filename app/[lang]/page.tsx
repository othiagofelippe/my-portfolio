import {
  Hero,
  Services,
  Experience,
  Education,
  Projects,
  Skills,
  Contact
} from "../components/sections";
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
      <Hero dict={dict} />
      <Services dict={dict} />
      <Experience dict={dict} />
      <Education dict={dict} />
      {/* <Projects /> */}
      <Skills dict={dict} />
      <Contact dict={dict} />
    </div>
  );
}
