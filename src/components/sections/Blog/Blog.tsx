import { ArrowRight } from '@tfds/icons'
import { Badge, Typography } from '@tfds/components'
import Link from 'next/link'

import { posts } from '@/data/posts'
import { formatPostDate } from '@/lib/utils'

import { BlogDict } from './types'

export function Blog({ dict }: { dict: BlogDict }) {
  const lang = dict.lang ?? 'pt'

  return (
    <section id="blog" className="bg-bg-page py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <Typography
            as="span"
            className="text-action-primary mb-4 block font-mono text-xs tracking-widest"
          >
            {dict.blog.eyebrow}
          </Typography>
          <Typography
            as="h2"
            variant="display-md"
            color="primary"
            className="mb-3"
          >
            {dict.blog.title}
          </Typography>
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
              <Typography
                as="h3"
                variant="heading-md"
                color="primary"
                className="group-hover:text-action-primary mb-2 transition-colors duration-200"
              >
                {post.title}
              </Typography>
              <Typography
                color="secondary"
                className="mb-4 flex-1 text-sm leading-relaxed"
              >
                {post.excerpt}
              </Typography>
              <Typography
                as="span"
                className="text-text-tertiary font-mono text-xs"
              >
                {formatPostDate(post.date, lang)} · {post.readingTime}{' '}
                {dict.blog.minRead}
              </Typography>
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
