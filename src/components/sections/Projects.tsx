import { ExternalLink, Github } from '@tfds/icons'
import { Typography } from '@tfds/components'
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
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <Typography
            as="span"
            className="text-action-primary mb-4 block font-mono text-xs tracking-widest"
          >
            {dict.projects.eyebrow}
          </Typography>
          <Typography
            as="h2"
            variant="display-md"
            color="primary"
            className="mb-3"
          >
            {dict.projects.title}
          </Typography>
          <Typography color="secondary">{dict.projects.subtitle}</Typography>
        </div>

        <div>
          {projects.map((project) => (
            <div
              key={project.name}
              className="group border-border-subtle hover:bg-bg-default/20 border-t py-8 transition-colors duration-300"
            >
              <div className="grid items-start gap-6 md:grid-cols-[60px_1fr_auto]">
                <Typography
                  as="span"
                  variant="display-sm"
                  className="text-text-disabled hidden md:block"
                >
                  {project.number}
                </Typography>

                <div>
                  <div className="mb-2 flex items-center gap-3">
                    <Typography
                      as="h3"
                      className="text-text-primary group-hover:text-action-primary font-mono text-base font-bold transition-colors duration-300"
                    >
                      {project.name}
                    </Typography>
                    <Typography
                      as="span"
                      className="text-text-tertiary font-mono text-xs"
                    >
                      {project.year}
                    </Typography>
                  </div>

                  <Typography
                    color="secondary"
                    className="mb-4 max-w-xl text-sm leading-relaxed"
                  >
                    {project.description[lang]}
                  </Typography>

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
