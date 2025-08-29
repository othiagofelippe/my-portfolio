import { Hero } from "./components/Hero";
import { Services } from "./components/Services";
import { Projects } from "./components/Projects";
import { Experience } from "./components/Experience";
import { Skills } from "./components/Skills";
import { Contact } from "./components/Contact";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <Services />
      <Projects />
      <Experience />
      <Skills />
      <Contact />
    </div>
  );
}
