export interface Project {
  id: string
  title: string
  description: string
  longDescription: string
  image: string
  technologies: string[]
  githubUrl?: string
  liveUrl?: string
  category: 'web' | 'mobile' | 'desktop' | 'other'
}

export const projects: Project[] = [
  {
    id: '1',
    title: 'E-Commerce Platform',
    description: 'A full-stack e-commerce solution with modern UI and secure payments.',
    longDescription:
      'Built a complete e-commerce platform with user authentication, product management, shopping cart, and payment integration. Features include responsive design, real-time inventory updates, and admin dashboard.',
    image: '/images/project-1.jpg',
    technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    githubUrl: 'https://github.com/yourusername/ecommerce',
    liveUrl: 'https://yourproject.com',
    category: 'web',
  },
  {
    id: '2',
    title: 'Mobile Weather App',
    description: 'Beautiful weather application with location-based forecasts.',
    longDescription:
      'Developed a cross-platform mobile app using React Native. Features include current weather, 7-day forecast, location detection, and beautiful animations. Integrated with weather APIs.',
    image: '/images/project-2.jpg',
    technologies: ['React Native', 'JavaScript', 'Expo'],
    githubUrl: 'https://github.com/yourusername/weather',
    liveUrl: 'https://yourproject.com',
    category: 'mobile',
  },
  {
    id: '3',
    title: 'Task Management System',
    description: 'Collaborative task management with real-time updates.',
    longDescription:
      'Created a web-based task management system with real-time collaboration features. Includes drag-and-drop boards, notifications, file attachments, and team workspaces.',
    image: '/images/project-3.jpg',
    technologies: ['Vue.js', 'Python', 'PostgreSQL', 'WebSockets'],
    githubUrl: 'https://github.com/yourusername/tasks',
    liveUrl: 'https://yourproject.com',
    category: 'web',
  },
]

export const projectCategories = ['all', 'web', 'mobile', 'desktop', 'other'] as const

export type ProjectCategory = typeof projectCategories[number]

