export const siteConfig = {
  name: 'Duke Schnepf',
  title: 'Entrepreneurial Tech Professional & Community Builder',
  description: 'Professional profile, experience, and projects',
  url: 'https://yourwebsite.com',
  email: 'Dukeschnepf@gmail.com',
  location: 'Sequim/Fall City, Washington',
  available: true,

  navigation: [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ],

  social: {
    github: 'https://github.com/yourusername',
    linkedin: 'https://www.linkedin.com/in/duke-schnepf-48a13b133/',
    twitter: 'https://twitter.com/yourusername',
    email: 'mailto:Dukeschnepf@gmail.com',
  },

  resume: '/Duke-Schnepf-Resume.pdf',
}

export type SiteConfig = typeof siteConfig

