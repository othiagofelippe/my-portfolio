import { Chapter } from '@/data/posts'

export interface VideoEmbedDict {
  playLabel: string
  chaptersTitle: string
  chapterAriaPrefix: string
}

export interface VideoEmbedProps {
  youtubeId: string
  title: string
  duration: string
  chapters?: Chapter[]
  dict: VideoEmbedDict
}

export interface ChapterListProps {
  chapters: Chapter[]
  title: string
  ariaPrefix: string
  onSelect: (start: number) => void
}
