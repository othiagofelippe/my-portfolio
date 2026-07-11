export interface HeroDict {
  hero: {
    intro: string
    name: string
    role: string
    rolePre: string
    roleHighlight: string
    descriptionPre: string
    descriptionHighlight: string
    descriptionPost: string
    downloadCV: string
    badge: {
      location: string
      availability: string
    }
    ctas: {
      viewProjects: string
    }
    stats: {
      years: { value: string; label: string }
      companies: { value: string; label: string }
      ds: { value: string; label: string }
    }
    socials: {
      github: string
      linkedin: string
      email: string
    }
  }
  lang?: string
}
