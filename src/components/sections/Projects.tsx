import { ExternalLink, Github } from '@tfds/icons'
import { Typography } from '@tfds/react'
import { projects } from '@/data/projects'
import { Locale } from '@/lib/i18n'

interface ProjectsDict {
  projects: {
    eyebrow: string
    title: string
    subtitle: string
    demo: string
    code: string
  }
  lang?: string
}

export function Projects({ dict }: { dict: ProjectsDict }) {
  const lang = (dict.lang ?? 'pt') as Locale

  return (
    <section id="projects" className="bg-bg-default/30 py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <div className="mb-4 block font-mono text-xs tracking-widest [--tfds-color-text-primary:var(--tfds-color-action-primary)]">
            <Typography as="span">{dict.projects.eyebrow}</Typography>
          </div>
          <div className="mb-3">
            <Typography as="h2" variant="display-md" color="primary">
              {dict.projects.title}
            </Typography>
          </div>
          <Typography color="secondary">{dict.projects.subtitle}</Typography>
        </div>

        <div>
          {projects.map((project) => (
            <div
              key={project.name}
              className="group border-border-subtle hover:bg-bg-default/20 border-t py-8 transition-colors duration-300"
            >
              <div className="grid items-start gap-6 md:grid-cols-[60px_1fr_auto]">
                <div className="hidden [--tfds-color-text-primary:var(--tfds-color-text-disabled)] md:block">
                  <Typography as="span" variant="display-sm">
                    {project.number}
                  </Typography>
                </div>

                <div>
                  <div className="mb-2 flex items-center gap-3">
                    <div className="group-hover:[--tfds-color-text-primary:var(--tfds-color-action-primary)] font-mono text-base font-bold transition-colors duration-300">
                      <Typography as="h3">{project.name}</Typography>
                    </div>
                    <div className="font-mono text-xs [--tfds-color-text-primary:var(--tfds-color-text-tertiary)]">
                      <Typography as="span">{project.year}</Typography>
                    </div>
                  </div>

                  <div className="mb-4 max-w-xl text-sm leading-relaxed">
                    <Typography color="secondary">
                      {project.description[lang]}
                    </Typography>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="border-border-subtle text-text-tertiary border px-2 py-0.5 font-mono text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-1 flex items-center gap-3">
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={dict.projects.demo}
                      aria-label={`${dict.projects.demo}: ${project.name}`}
                      className="text-text-tertiary hover:text-action-primary transition-colors duration-200"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  )}
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={dict.projects.code}
                    aria-label={`${dict.projects.code}: ${project.name}`}
                    className="text-text-tertiary hover:text-action-primary transition-colors duration-200"
                  >
                    <Github className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          ))}
          <div className="border-border-subtle border-t" />
        </div>
      </div>
    </section>
  )
}
