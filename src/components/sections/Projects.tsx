'use client'

import { useEffect, useState } from 'react'
import { Badge } from '@tfds/components'
import { Button } from '@tfds/components'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/molecules'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/organisms'
import { ExternalLink, Code2, ArrowRight } from '@tfds/icons'
import { Typography } from '@tfds/components'
import { useAudio } from '@/context/AudioContext'

interface Project {
  name: string
  description: string
  tags: string[]
  language: string | null
  formatted_date: string
  url: string
  demo: string | null
}

interface ProjectsDict {
  projects: {
    title: string
    subtitle: string
    loading: string
    error: string
    empty: string
    demo: string
    code: string
    viewAll: string
  }
}

export function Projects({ dict }: { dict: ProjectsDict }) {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const audio = useAudio()

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('/api/github/repos')
        if (!response.ok) {
          throw new Error('Failed to fetch projects')
        }
        const data = await response.json()
        setProjects(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  const sectionClassName = `py-20 bg-bg-default/30${!loading && !error && projects.length ? ' dark:bg-bg-default' : ''}`

  return (
    <section id="projects" className={sectionClassName}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {loading && (
          <>
            <div className="mb-16 text-center">
              <Typography
                as="h2"
                variant="display-sm"
                color="primary"
                align="center"
                className="mb-4"
              >
                {dict.projects.title}
              </Typography>
              <Typography
                color="secondary"
                align="center"
                className="mx-auto max-w-2xl"
              >
                {dict.projects.loading}
              </Typography>
            </div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="bg-bg-page border-border-default/10">
                  <CardHeader className="pb-4">
                    <div className="bg-bg-default/50 h-32 w-full motion-safe:animate-pulse rounded-lg"></div>
                    <div className="bg-bg-default/50 h-6 motion-safe:animate-pulse rounded"></div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-2">
                      <div className="bg-bg-default/50 h-4 motion-safe:animate-pulse rounded"></div>
                      <div className="bg-bg-default/50 h-4 w-3/4 motion-safe:animate-pulse rounded"></div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        )}

        {error && (
          <div className="text-center">
            <Typography
              as="h2"
              variant="display-sm"
              color="primary"
              align="center"
              className="mb-4"
            >
              {dict.projects.title}
            </Typography>
            <Typography className="text-feedback-error">
              {dict.projects.error}: {error}
            </Typography>
          </div>
        )}

        {!loading && !error && !projects.length && (
          <div className="text-center">
            <Typography
              as="h2"
              variant="display-sm"
              color="primary"
              align="center"
              className="mb-4"
            >
              {dict.projects.title}
            </Typography>
            <Typography color="secondary">{dict.projects.empty}</Typography>
          </div>
        )}

        {!loading && !error && projects.length > 0 && (
          <>
            <div className="mb-16 text-center">
              <Typography
                as="h2"
                variant="display-sm"
                color="primary"
                align="center"
                className="mb-4"
              >
                {dict.projects.title}
              </Typography>
              <Typography
                color="secondary"
                align="center"
                className="mx-auto max-w-2xl"
              >
                {dict.projects.subtitle}
              </Typography>
            </div>

            <div className="relative">
              <Carousel
                opts={{
                  align: 'start',
                  loop: false,
                }}
                className="w-full"
              >
                <CarouselContent>
                  {projects.map((project) => (
                    <CarouselItem
                      key={project.name}
                      className="pl-4 md:basis-1/2 lg:basis-1/3"
                    >
                      <Card className="bg-bg-page border-border-default/10 flex h-full flex-col transition-all duration-300 ease-out hover:shadow-xl">
                        <CardHeader className="pb-4">
                          <div className="mb-4 flex items-center justify-between">
                            <Typography
                              as="h3"
                              variant="heading-md"
                              color="primary"
                            >
                              {project.name}
                            </Typography>
                            <Badge variant="default">
                              {project.language || 'Projeto'}
                            </Badge>
                          </div>
                        </CardHeader>

                        <CardContent className="flex flex-1 flex-col pt-0">
                          <Typography
                            color="secondary"
                            className="mb-4 line-clamp-3 leading-relaxed"
                          >
                            {project.description}
                          </Typography>

                          <div className="mt-auto space-y-3">
                            <Typography
                              as="p"
                              variant="body-sm"
                              color="secondary"
                              className="flex items-center gap-2"
                            >
                              <span>📅 {project.formatted_date}</span>
                            </Typography>
                            <div className="flex min-h-[2rem] flex-wrap gap-2">
                              {project.tags.slice(0, 4).map((tag) => (
                                <Badge key={tag} variant="info">
                                  {tag}
                                </Badge>
                              ))}
                              {project.tags.length > 4 && (
                                <Badge variant="default">
                                  +{project.tags.length - 4}
                                </Badge>
                              )}
                            </div>
                          </div>
                        </CardContent>

                        <CardFooter className="pt-4">
                          <div className="flex w-full gap-3">
                            {project.demo && (
                              <Button
                                variant="outline"
                                size="sm"
                                className="flex-1"
                                onClick={() => {
                                  audio.play('buttonClick')
                                  window.open(
                                    project.demo ?? undefined,
                                    '_blank',
                                    'noopener,noreferrer'
                                  )
                                }}
                              >
                                <ExternalLink />
                                {dict.projects.demo}
                              </Button>
                            )}
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex-1"
                              onClick={() => {
                                audio.play('buttonClick')
                                window.open(
                                  project.url,
                                  '_blank',
                                  'noopener,noreferrer'
                                )
                              }}
                            >
                              <Code2 />
                              {dict.projects.code}
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

            <div className="mt-12 text-center">
              <Button
                size="lg"
                onClick={() => {
                  audio.play('buttonClick')
                  window.open(
                    'https://github.com/othiagofelippe?tab=repositories',
                    '_blank',
                    'noopener,noreferrer'
                  )
                }}
              >
                {dict.projects.viewAll}
                <ArrowRight />
              </Button>
            </div>
          </>
        )}
      </div>
    </section>
  )
}
