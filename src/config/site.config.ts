export const siteConfig = {
  name: 'Your Name',
  title: 'Full Stack Developer',
  description: 'A modern portfolio showcasing my projects and skills',
  url: 'https://yourwebsite.com',
  email: 'your.email@example.com',
  location: 'Location',
  available: true,

  navigation: [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ],

  social: {
    github: 'https://github.com/yourusername',
    linkedin: 'https://linkedin.com/in/yourusername',
    twitter: 'https://twitter.com/yourusername',
    email: 'mailto:your.email@example.com',
  },

  resume: '/resume.pdf',
}

export type SiteConfig = typeof siteConfig

