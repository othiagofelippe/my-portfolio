export interface VideoEmbedDict {
  playLabel: string
}

export interface VideoEmbedProps {
  youtubeId: string
  title: string
  duration: string
  dict: VideoEmbedDict
}
