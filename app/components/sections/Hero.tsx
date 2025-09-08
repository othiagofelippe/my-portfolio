"use client";

import Image from 'next/image';
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import useSound from 'use-sound';

interface HeroDict {
  hero: {
    greeting: string;
    intro: string;
    name: string;
    role: string;
    description: string;
    skills: string[];
    downloadCV: string;
  };
}

export function Hero({ dict }: { dict: HeroDict }) {
  const [playDownloadSound] = useSound('/sounds/download-cv.mp3', { volume: 0.5 });
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background-primary to-background-secondary dark:from-background-primary-dark dark:to-background-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-20 md:pt-16 lg:pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h1 className="font-poppins text-4xl sm:text-5xl lg:text-6xl text-text-headline dark:text-text-headline-dark">
                {dict.hero.greeting}
              </h1>
              <h2 className="font-poppins text-2xl sm:text-3xl lg:text-4xl text-text-heading dark:text-text-heading-dark">
                {dict.hero.intro}{" "}
                <span className="text-accent-brand">
                  {dict.hero.name}
                </span>
              </h2>
            </div>

            <p className="font-roboto text-xl sm:text-2xl font-medium text-text-body dark:text-text-body-dark leading-relaxed">
              {dict.hero.role}
            </p>
            
            <p className="font-roboto text-lg text-text-body dark:text-text-body-dark leading-relaxed">
              {dict.hero.description}
            </p>

            <div className="flex flex-wrap gap-3">
              {dict.hero.skills.map((skill: string, index: number) => (
                <span
                  key={index}
                  className="font-roboto text-sm font-medium bg-accent-brand/10 text-accent-brand px-4 py-2 rounded-full border border-accent-brand/20"
                >
                  {skill}
                </span>
              ))}
            </div>

            <div className="flex flex-row gap-4 items-start">
              <a 
                href="/CV-Thiago-Felippe.pdf" 
                download="CV-Thiago-Felippe.pdf"
                onClick={playDownloadSound}
                className="font-roboto text-base font-medium border border-border-primary hover:bg-background-secondary/50 text-text-body dark:text-text-body-dark hover:text-text-headline dark:hover:text-text-headline-dark px-8 py-3 rounded-lg transition-colors inline-block text-center"
              >
                {dict.hero.downloadCV}
              </a>
              <div className="flex gap-3">
                <a 
                  href="https://linkedin.com/in/thiagofelippe" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-3 rounded-lg border border-border-primary hover:bg-background-secondary/50 text-text-span dark:text-text-span-dark hover:text-accent-brand transition-all"
                  title="LinkedIn"
                >
                  <FaLinkedin size={20} />
                </a>
                <a 
                  href="https://github.com/othiagofelippe" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-3 rounded-lg border border-border-primary hover:bg-background-secondary/50 text-text-span dark:text-text-span-dark hover:text-text-headline dark:hover:text-text-headline-dark transition-all"
                  title="GitHub"
                >
                  <FaGithub size={20} />
                </a>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="flex justify-center lg:justify-end">
            <div className="w-96 h-96 rounded-3xl overflow-hidden border-8 border-background-primary dark:border-background-tertiary shadow-xl transform rotate-2 hover:rotate-0 transition-transform duration-300 cursor-pointer">
              <Image
                src="https://github.com/othiagofelippe.png"
                alt="Thiago Felippe"
                width={384}
                height={384}
                className="w-full h-full object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
