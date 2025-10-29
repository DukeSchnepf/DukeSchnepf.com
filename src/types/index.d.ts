export interface SiteConfig {
  name: string
  title: string
  description: string
  url: string
}

export interface Project {
  id: string
  title: string
  description: string
  longDescription: string
  image: string
  technologies: string[]
  githubUrl?: string
  liveUrl?: string
  category: string
}

export interface ContactFormData {
  name: string
  email: string
  message: string
  honeypot?: string
}

