
import { SEO } from '@/components/layout/SEO'
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Projects from '@/components/sections/Projects'
import TechArsenal from '@/components/sections/TechArsenal'
import Experience from '@/components/sections/Experience'
import Contact from '@/components/sections/Contact'


interface HomePageProps {
  showContent?: boolean;
}

export function HomePage({ showContent = true }: HomePageProps) {


  return (
    <>
      <SEO
        title="Home"
        description="Portfolio of a full stack developer showcasing projects and skills"
      />



      <div>
        <Hero showContent={showContent} />
        <About id="about" />
        <TechArsenal id="skills" />
        <Experience id="experience" />
        <Projects id="projects" />
        <Contact id="contact" />
      </div>
    </>
  )
}
