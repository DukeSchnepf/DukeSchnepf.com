# Personal Portfolio Website

A modern, responsive portfolio website built with React, TypeScript, Vite, and Three.js.

## Features

- 🎨 Modern UI with Tailwind CSS
- ⚛️ React 18 with TypeScript
- 🎭 GSAP animations with ScrollTrigger
- 🎥 Three.js 3D background scene
- 📱 Fully responsive design
- ♿ Accessibility features
- 🚀 Optimized performance with lazy loading
- 📧 Contact form with EmailJS integration

## Tech Stack

- **Framework:** React 18 + TypeScript
- **Build Tool:** Vite 5
- **Styling:** Tailwind CSS
- **3D Graphics:** Three.js + React Three Fiber
- **Animations:** GSAP + Framer Motion
- **Form Handling:** React Hook Form + Zod
- **Email Service:** EmailJS
- **State Management:** Zustand
- **Routing:** React Router DOM

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/personal-website.git
cd personal-website
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp .env.example .env
```

Edit `.env` and add your EmailJS credentials:
```
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

### Development

Run the development server:
```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build

Build for production:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## Project Structure

```
src/
├── assets/          # Images, fonts, videos
├── components/      
│   ├── layout/     # Navigation, Footer
│   ├── sections/   # Hero, About, Projects, Contact
│   └── ui/         # Reusable UI components
├── config/         # Site configuration
├── features/
│   ├── animations/ # GSAP configurations
│   └── three-scene/# Three.js components
├── hooks/          # Custom React hooks
├── pages/          # Page components
├── services/       # API services
├── styles/         # Global styles
├── types/          # TypeScript type definitions
└── utils/          # Helper functions
```

## Customization

### Update Personal Information

Edit `src/config/site.config.ts` to update:
- Name and title
- Bio and description
- Social media links
- Navigation menu

### Add Projects

Edit `src/config/projects.config.ts` to add your projects:
```typescript
export const projects: Project[] = [
  {
    id: '1',
    title: 'Your Project',
    description: 'Project description',
    // ... more fields
  }
]
```

### Customize Theme

Edit `src/config/theme.config.ts` and `tailwind.config.js` to change colors, spacing, and fonts.

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the repository on [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy!

The site will automatically deploy on every push to the main branch.

### Other Platforms

This site can be deployed to any static hosting service:
- Netlify
- GitHub Pages
- AWS S3 + CloudFront
- Firebase Hosting

## Performance

The site is optimized for performance with:
- Code splitting and lazy loading
- Image optimization
- Three.js performance monitoring
- Bundle size optimization

Run Lighthouse audit to check performance scores.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT License - feel free to use this project for your own portfolio!

## Contact

For questions or suggestions, open an issue or contact via email.

