import { ArrowRight, Play } from '@tfds/icons'
import { Badge, Grid, Typography } from '@tfds/react'
import Link from 'next/link'

import { getDictionary } from '@/lib/dictionaries'
import { Locale } from '@/lib/i18n'
import { posts } from '@/data/posts'
import { formatPostDate } from '@/lib/utils'
import { PageTransition } from '@/components/molecules'

export default async function BlogPage({
  params,
}: {
  params: Promise<{ lang: Locale }>
}) {
  const { lang } = await params
  const dict = await getDictionary(lang)

  return (
    <PageTransition lang={lang}>
      <section className="min-h-screen py-32">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <div className="mb-4 block font-mono text-xs tracking-widest [--tfds-color-text-primary:var(--tfds-color-action-primary)]">
              <Typography as="span">{dict.blog.eyebrow}</Typography>
            </div>
            <div className="mb-3">
              <Typography as="h1" variant="display-md" color="primary">
                {dict.blog.title}
              </Typography>
            </div>
            <Typography color="secondary">{dict.blog.subtitle}</Typography>
          </div>

          <Grid cols={{ base: 1, md: 3 }} gap="6">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/${lang}/blog/${post.slug}`}
                className="group border-border-subtle hover:border-border-default flex flex-col border p-6 transition-colors duration-200"
              >
                <div className="mb-4 flex flex-wrap gap-1.5">
                  {post.format === 'video' && post.video && (
                    <Badge variant="info" size="sm">
                      <Play className="mr-1 size-3" aria-hidden="true" />
                      {dict.blog.videoLabel} · {post.video.duration}
                    </Badge>
                  )}
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="info" size="sm">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="mb-2 transition-colors duration-200 group-hover:[--tfds-color-text-primary:var(--tfds-color-action-primary)]">
                  <Typography as="h2" variant="heading-md" color="primary">
                    {post.title}
                  </Typography>
                </div>
                <div className="mb-4 flex-1 text-sm leading-relaxed">
                  <Typography color="secondary">{post.excerpt}</Typography>
                </div>
                <div className="font-mono text-xs [--tfds-color-text-primary:var(--tfds-color-text-tertiary)]">
                  <Typography as="span">
                    {formatPostDate(post.date, lang)} · {post.readingTime}{' '}
                    {dict.blog.minRead}
                  </Typography>
                </div>
              </Link>
            ))}
          </Grid>

          <div className="mt-16">
            <Link
              href={`/${lang}`}
              className="text-text-secondary hover:text-action-primary inline-flex items-center gap-1.5 font-mono text-sm"
            >
              <ArrowRight className="h-4 w-4 rotate-180" aria-hidden="true" />
              {dict.blog.backHome}
            </Link>
          </div>
        </div>
      </section>
    </PageTransition>
  )
}
