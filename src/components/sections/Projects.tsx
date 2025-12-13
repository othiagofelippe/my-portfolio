"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/components/atoms";
import { Button } from "@/components/atoms";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/molecules";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/organisms";
import { HiOutlineArrowTopRightOnSquare, HiOutlineCodeBracket, HiOutlineArrowRight } from "react-icons/hi2";
import { useAudio } from "@/context/AudioContext";

interface Project {
  name: string;
  description: string;
  tags: string[];
  language: string | null;
  formatted_date: string;
  url: string;
  demo: string | null;
}

export function Projects({ dict }: { dict: any }) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const audio = useAudio();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("/api/github/repos");
        if (!response.ok) {
          throw new Error("Failed to fetch projects");
        }
        const data = await response.json();
        setProjects(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return (
      <section
        id="projetos"
        className="py-20 bg-background-secondary/30"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="typography-h2 text-text-headline mb-4">
              {dict.projects.title}
            </h2>
            <p className="typography-body text-text-body max-w-2xl mx-auto">
              {dict.projects.loading}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <Card
                key={i}
                className="bg-background-primary border-border-primary/10"
              >
                <CardHeader className="pb-4">
                  <div className="w-full h-32 bg-background-secondary/50 rounded-lg animate-pulse"></div>
                  <div className="h-6 bg-background-secondary/50 rounded animate-pulse"></div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-2">
                    <div className="h-4 bg-background-secondary/50 rounded animate-pulse"></div>
                    <div className="h-4 bg-background-secondary/50 rounded animate-pulse w-3/4"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section
        id="projetos"
        className="py-20 bg-background-secondary/30"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="typography-h2 text-text-headline mb-4">
              {dict.projects.title}
            </h2>
            <p className="typography-body text-accent-red">
              {dict.projects.error}: {error}
            </p>
          </div>
        </div>
      </section>
    );
  }

  if (!projects.length) {
    return (
      <section
        id="projetos"
        className="py-20 bg-background-secondary/30"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="typography-h2 text-text-headline mb-4">
            {dict.projects.title}
          </h2>
          <p className="typography-body text-text-body">
            {dict.projects.empty}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section
      id="projetos"
      className="py-20 bg-background-secondary/30 dark:bg-background-secondary"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="typography-h2 text-text-headline mb-4">
            {dict.projects.title}
          </h2>
          <p className="typography-body text-text-body max-w-2xl mx-auto">
            {dict.projects.subtitle}
          </p>
        </div>

        <div className="relative">
          <Carousel
            opts={{
              align: "start",
              loop: false,
            }}
            className="w-full"
          >
            <CarouselContent>
              {projects.map((project, index) => (
                <CarouselItem
                  key={index}
                  className="pl-4 md:basis-1/2 lg:basis-1/3"
                >
                  <Card className="h-full bg-background-primary border-border-primary/10 hover:shadow-xl transition-all duration-300 ease-out flex flex-col">
                    <CardHeader className="pb-4">
                      <div className="flex items-center justify-between mb-4">
                        <CardTitle className="typography-h5 text-text-headline">
                          {project.name}
                        </CardTitle>
                        <Badge variant="neutral">
                          {project.language || "Projeto"}
                        </Badge>
                      </div>
                    </CardHeader>

                    <CardContent className="pt-0 flex-1 flex flex-col">
                      <p className="typography-body text-text-body mb-4 leading-relaxed line-clamp-3">
                        {project.description}
                      </p>

                      <div className="space-y-3 mt-auto">
                        <div className="flex items-center gap-2 text-text-body typography-body-sm">
                          <span>📅 {project.formatted_date}</span>
                        </div>
                        <div className="flex flex-wrap gap-2 min-h-[2rem]">
                          {project.tags.slice(0, 4).map((tag, tagIndex) => (
                            <Badge
                              key={tagIndex}
                              variant="brand"
                            >
                              {tag}
                            </Badge>
                          ))}
                          {project.tags.length > 4 && (
                            <Badge variant="neutral">
                              +{project.tags.length - 4}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </CardContent>

                    <CardFooter className="pt-4">
                      <div className="flex gap-3 w-full">
                        {project.demo && (
                        <Button
                          asChild
                          variant="outline"
                          size="sm"
                          className="flex-1"
                          onClick={() => audio.play("buttonClick")}
                        >
                          <a
                            href={project.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <HiOutlineArrowTopRightOnSquare />
                            {dict.projects.demo}
                          </a>
                        </Button>
                      )}
                        <Button
                          asChild
                          variant="outline"
                          size="sm"
                          className="flex-1"
                          onClick={() => audio.play("buttonClick")}
                        >
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <HiOutlineCodeBracket />
                          {dict.projects.code}
                        </a>
                      </Button>
                    </div>
                  </CardFooter>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden xl:flex" />
            <CarouselNext className="hidden xl:flex" />
          </Carousel>
        </div>

        <div className="text-center mt-12">
          <Button
            asChild
            size="lg"
            onClick={() => audio.play("buttonClick")}
          >
            <a
              href="https://github.com/othiagofelippe?tab=repositories"
              target="_blank"
              rel="noopener noreferrer"
            >
              {dict.projects.viewAll}
              <HiOutlineArrowRight />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
