import { ArrowRight } from '@tfds/icons'
import { Badge, Typography } from '@tfds/react'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { getDictionary } from '@/lib/dictionaries'
import { Locale } from '@/lib/i18n'
import { posts } from '@/data/posts'
import { formatPostDate } from '@/lib/utils'
import { PageTransition } from '@/components/molecules'

export function generateStaticParams(): { slug: string }[] {
  return posts.map((post) => ({ slug: post.slug }))
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ lang: Locale; slug: string }>
}) {
  const { lang, slug } = await params
  const dict = await getDictionary(lang)
  const post = posts.find((item) => item.slug === slug)

  if (!post) {
    notFound()
  }

  return (
    <PageTransition lang={lang}>
      <article className="min-h-screen py-32">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Link
            href={`/${lang}/blog`}
            className="text-text-secondary hover:text-action-primary mb-10 inline-flex items-center gap-1.5 font-mono text-sm"
          >
            <ArrowRight className="h-4 w-4 rotate-180" aria-hidden="true" />
            {dict.blog.backToBlog}
          </Link>

          <div className="mb-4 flex flex-wrap gap-1.5">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="info" size="sm">
                {tag}
              </Badge>
            ))}
          </div>

          <div className="mb-4">
            <Typography as="h1" variant="display-md" color="primary">
              {post.title}
            </Typography>
          </div>

          <div className="mb-12 font-mono text-xs [--tfds-color-text-primary:var(--tfds-color-text-tertiary)]">
            <Typography as="p">
              {formatPostDate(post.date, lang)} · {post.readingTime}{' '}
              {dict.blog.minRead}
            </Typography>
          </div>

          <div className="space-y-6">
            {post.content.map((block) =>
              block.type === 'heading' ? (
                <div key={block.text} className="pt-4">
                  <Typography as="h2" variant="heading-lg" color="primary">
                    {block.text}
                  </Typography>
                </div>
              ) : (
                <div key={block.text} className="leading-relaxed">
                  <Typography as="p" color="secondary">
                    {block.text}
                  </Typography>
                </div>
              )
            )}
          </div>
        </div>
      </article>
    </PageTransition>
  )
}
