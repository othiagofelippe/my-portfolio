"use client";

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { useAudio } from '@/context/AudioContext';

export function Experience({ dict }: { dict: any & { lang?: string } }) {
  const audio = useAudio();
  
  const getCVFileName = () => {
    const lang = dict.lang || 'pt';
    const fileNames = {
      'pt': 'CV-Thiago-Felippe-PT.pdf',
      'en': 'CV-Thiago-Felippe-EN.pdf', 
      'es': 'CV-Thiago-Felippe-ES.pdf'
    };
    return fileNames[lang as keyof typeof fileNames] || fileNames.pt;
  };
  
  const handleDownloadClick = () => {
    audio.play('downloadCv');
  };
  const experiences = [
    {
      period: dict.experience.jobs.heap.period,
      title: dict.experience.jobs.heap.title,
      company: dict.experience.jobs.heap.company,
      description: dict.experience.jobs.heap.description,
      skills: dict.experience.jobs.heap.skills
    },
    {
      period: dict.experience.jobs.divam.period,
      title: dict.experience.jobs.divam.title,
      company: dict.experience.jobs.divam.company,
      description: dict.experience.jobs.divam.description,
      skills: dict.experience.jobs.divam.skills
    }
  ];

  return (
    <section id="experiencia" className="py-20 bg-background-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="typography-h2 text-text-headline mb-4">
            {dict.experience.title}
          </h2>
          <p className="typography-body text-text-body max-w-2xl mx-auto">
            {dict.experience.subtitle}
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border-primary md:left-1/2 md:transform md:-translate-x-px"></div>

            {experiences.map((experience, index) => (
              <div key={index} className="relative flex items-center mb-12 last:mb-0">
                {/* Timeline dot */}
                <div className="absolute left-6 w-4 h-4 bg-accent-brand rounded-full border-4 border-background-primary md:left-1/2 md:transform md:-translate-x-2"></div>

                {/* Content */}
                <div className={`ml-16 md:w-5/12 ${index % 2 === 0 ? 'md:ml-0 md:pr-8 md:text-right' : 'md:ml-auto md:pl-8'}`}>
                  <Card className="bg-background-primary border-border-primary/10 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-out">
                    <CardContent className="p-6">
                      <div className="mb-2">
                        <Badge
                          variant="secondary"
                          className="typography-body-sm font-medium bg-accent-green/90 text-white border border-accent-green hover:bg-accent-green transition-colors"
                        >
                          {experience.period}
                        </Badge>
                      </div>

                      <h3 className="typography-h5 text-text-headline mb-1">
                        {experience.title}
                      </h3>

                      <h4 className="typography-body-lg text-accent-brand mb-3">
                        {experience.company}
                      </h4>

                      <p className="typography-body text-text-body mb-4">
                        {experience.description}
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {experience.skills.map((skill: any, skillIndex: number) => (
                          <Badge
                            key={skillIndex}
                            variant="outline"
                            className="typography-body-sm bg-background-secondary/50 text-text-span border-border-primary/20 hover:bg-background-secondary/70 transition-colors"
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-16">
          <Button
            asChild
            size="lg"
            onClick={handleDownloadClick}
            className="typography-body font-medium bg-accent-brand hover:bg-accent-brand-dark text-text-label transition-colors cursor-pointer"
          >
            <a href={`/${getCVFileName()}`} download={getCVFileName()}>
              {dict.experience.downloadCV}
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
