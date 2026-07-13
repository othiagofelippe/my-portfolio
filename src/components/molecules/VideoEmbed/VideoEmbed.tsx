'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { Play } from '@tfds/icons'
import { buttonVariants } from '@tfds/react'

import { cn } from '@/lib/utils'

import { ChapterList } from './ChapterList'
import { VideoEmbedProps } from './types'

const YOUTUBE_ORIGIN = 'https://www.youtube.com'

export function VideoEmbed({
  youtubeId,
  title,
  duration,
  chapters = [],
  dict,
}: VideoEmbedProps) {
  const [loaded, setLoaded] = useState(false)
  const [startAt, setStartAt] = useState(0)
  const [playerReady, setPlayerReady] = useState(false)
  const pendingSeekRef = useRef<number | null>(null)
  const iframeRef = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    if (!loaded) {
      return
    }

    function handleMessage(event: MessageEvent): void {
      if (event.origin !== YOUTUBE_ORIGIN) {
        return
      }

      let data: unknown
      try {
        data = JSON.parse(event.data)
      } catch {
        return
      }

      if (
        typeof data === 'object' &&
        data !== null &&
        'event' in data &&
        (data as { event: unknown }).event === 'onReady'
      ) {
        setPlayerReady(true)
      }
    }

    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [loaded])

  useEffect(() => {
    if (!playerReady || pendingSeekRef.current === null) {
      return
    }

    iframeRef.current?.contentWindow?.postMessage(
      JSON.stringify({
        event: 'command',
        func: 'seekTo',
        args: [pendingSeekRef.current, true],
      }),
      YOUTUBE_ORIGIN
    )
    pendingSeekRef.current = null
  }, [playerReady])

  function playFrom(seconds: number): void {
    if (!loaded) {
      setStartAt(seconds)
      setLoaded(true)
      return
    }

    if (playerReady) {
      iframeRef.current?.contentWindow?.postMessage(
        JSON.stringify({
          event: 'command',
          func: 'seekTo',
          args: [seconds, true],
        }),
        YOUTUBE_ORIGIN
      )
    } else {
      pendingSeekRef.current = seconds
    }
  }

  if (loaded) {
    const origin = typeof window !== 'undefined' ? window.location.origin : ''

    return (
      <div>
        <div className="bg-bg-muted aspect-video w-full overflow-hidden">
          <iframe
            ref={iframeRef}
            className="h-full w-full"
            src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&enablejsapi=1&start=${startAt}&origin=${origin}`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        {chapters.length > 0 && (
          <ChapterList
            chapters={chapters}
            title={dict.chaptersTitle}
            ariaPrefix={dict.chapterAriaPrefix}
            onSelect={playFrom}
          />
        )}
      </div>
    )
  }

  return (
    <div>
      <button
        type="button"
        onClick={() => playFrom(0)}
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
      {chapters.length > 0 && (
        <ChapterList
          chapters={chapters}
          title={dict.chaptersTitle}
          ariaPrefix={dict.chapterAriaPrefix}
          onSelect={playFrom}
        />
      )}
    </div>
  )
}
