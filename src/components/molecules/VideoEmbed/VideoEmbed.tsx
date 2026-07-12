'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Play } from '@tfds/icons'
import { buttonVariants } from '@tfds/react'

import { cn } from '@/lib/utils'

import { VideoEmbedProps } from './types'

export function VideoEmbed({
  youtubeId,
  title,
  duration,
  dict,
}: VideoEmbedProps) {
  const [loaded, setLoaded] = useState(false)

  if (loaded) {
    return (
      <div className="bg-bg-muted aspect-video w-full overflow-hidden">
        <iframe
          className="h-full w-full"
          src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&enablejsapi=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    )
  }

  return (
    <button
      type="button"
      onClick={() => setLoaded(true)}
      aria-label={`${dict.playLabel}: ${title} (${duration})`}
      className="border-border-subtle relative aspect-video w-full overflow-hidden border"
    >
      <Image
        src={`https://i.ytimg.com/vi/${youtubeId}/maxresdefault.jpg`}
        alt=""
        fill
        className="object-cover"
        sizes="(min-width: 768px) 768px, 100vw"
      />
      <div className="bg-bg-page/50 hover:bg-bg-page/30 absolute inset-0 flex items-center justify-center transition-colors duration-200">
        <div
          className={cn(
            buttonVariants({ variant: 'primary', size: 'icon' }),
            'size-16 rounded-full'
          )}
        >
          <Play className="ml-1 size-6" aria-hidden="true" />
        </div>
      </div>
    </button>
  )
}
