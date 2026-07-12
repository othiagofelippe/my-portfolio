import { ArrowRight } from '@tfds/icons'
import { Badge, Typography } from '@tfds/react'
import Link from 'next/link'

import { posts } from '@/data/posts'
import { formatPostDate } from '@/lib/utils'

import { BlogDict } from './types'

export function Blog({ dict }: { dict: BlogDict }) {
  const lang = dict.lang ?? 'pt'

  return (
    <section id="blog" className="bg-bg-page py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <div className="mb-4 block font-mono text-xs tracking-widest [--tfds-color-text-primary:var(--tfds-color-action-primary)]">
            <Typography as="span">{dict.blog.eyebrow}</Typography>
          </div>
          <div className="mb-3">
            <Typography as="h2" variant="display-md" color="primary">
              {dict.blog.title}
            </Typography>
          </div>
          <Typography color="secondary">{dict.blog.subtitle}</Typography>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/${lang}/blog/${post.slug}`}
              className="group border-border-subtle hover:border-border-default flex flex-col border p-6 transition-colors duration-200"
            >
              <div className="mb-4 flex flex-wrap gap-1.5">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="info" size="sm">
                    {tag}
                  </Badge>
                ))}
              </div>
              <div className="group-hover:[--tfds-color-text-primary:var(--tfds-color-action-primary)] mb-2 transition-colors duration-200">
                <Typography as="h3" variant="heading-md" color="primary">
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
        </div>

        <div className="mt-10 text-center">
          <Link
            href={`/${lang}/blog`}
            className="text-action-primary inline-flex items-center gap-1.5 font-mono text-sm hover:underline"
          >
            {dict.blog.viewAll}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  )
}
