export interface AboutCard {
  title: string
  description: string
}

export interface ParagraphSegment {
  text: string
  emphasis?: boolean
}

export interface AboutDict {
  about: {
    eyebrow: string
    title: string
    cards: {
      frontend: AboutCard
      designSystems: AboutCard
      performance: AboutCard
      fullCycle: AboutCard
    }
    paragraphs: ParagraphSegment[][]
    footer: {
      locationLabel: string
      location: string
      languagesLabel: string
      languages: { name: string; level: string }[]
      statusLabel: string
      status: string
    }
  }
}
