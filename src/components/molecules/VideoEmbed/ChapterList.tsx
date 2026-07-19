import { Typography } from '@tfds/react'

import { ChapterListProps } from './types'

function formatTimestamp(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
}

export function ChapterList({
  chapters,
  title,
  ariaPrefix,
  onSelect,
}: ChapterListProps) {
  return (
    <nav aria-label={title} className="mt-4">
      <Typography as="p" variant="body-sm" color="secondary">
        {title}
      </Typography>
      <ul className="mt-2 divide-y border-t border-border-subtle">
        {chapters.map((chapter) => (
          <li key={chapter.start}>
            <button
              type="button"
              onClick={() => onSelect(chapter.start)}
              aria-label={`${ariaPrefix}: ${chapter.title} (${formatTimestamp(chapter.start)})`}
              className="flex w-full items-center justify-between gap-4 py-2 text-left transition-colors duration-200 hover:bg-bg-muted"
            >
              <Typography as="span" color="secondary">
                {chapter.title}
              </Typography>
              <span className="font-mono text-xs [--tfds-color-text-primary:var(--tfds-color-text-tertiary)]">
                <Typography as="span">
                  {formatTimestamp(chapter.start)}
                </Typography>
              </span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}
