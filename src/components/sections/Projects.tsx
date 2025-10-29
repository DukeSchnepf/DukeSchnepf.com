import { useState, useEffect, useRef, useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Modal } from '@/components/ui/Modal'
import { projects, type Project, type ProjectCategory } from '@/config/projects.config'

export function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [filter, setFilter] = useState<ProjectCategory>('all')
  const [filteredProjects, setFilteredProjects] = useState(projects)
  const sectionRef = useRef<HTMLElement>(null)
  const filterRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (filter === 'all') {
      setFilteredProjects(projects)
    } else {
      setFilteredProjects(projects.filter((p) => p.category === filter))
    }
  }, [filter])

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.projects-header', {
        y: 32,
        opacity: 0,
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.projects-header',
          start: 'top 85%',
        },
      })

      ScrollTrigger.batch('.project-card', {
        start: 'top 85%',
        invalidateOnRefresh: true,
        onEnter: (batch) =>
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            ease: 'power2.out',
            stagger: 0.12,
          }),
        onLeaveBack: (batch) =>
          gsap.set(batch, {
            opacity: 0,
            y: 56,
            scale: 0.96,
          }),
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>('.project-card')
      if (cards.length === 0) return

      gsap.fromTo(
        cards,
        {
          opacity: 0,
          y: 40,
          scale: 0.96,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          ease: 'power3.out',
          stagger: 0.08,
          overwrite: 'auto',
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [filteredProjects])

  useEffect(() => {
    if (!filterRef.current) return

    const activeButton = filterRef.current.querySelector<HTMLButtonElement>(
      `[data-filter="${filter}"]`
    )
    const indicator = filterRef.current.querySelector<HTMLSpanElement>('.filter-indicator')

    if (!activeButton || !indicator) return

    const { offsetLeft, offsetWidth, offsetTop, offsetHeight } = activeButton
    gsap.to(indicator, {
      x: offsetLeft,
      y: offsetTop,
      width: offsetWidth,
      height: offsetHeight,
      duration: 0.4,
      ease: 'power3.out',
    })
  }, [filter])

  const categories: ProjectCategory[] = ['all', 'web', 'mobile', 'desktop', 'other']

  return (
    <>
      <section id="projects" ref={sectionRef} className="relative py-24 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 -z-10">
          <div className="mx-auto h-full max-w-6xl rounded-[3rem] bg-gradient-to-t from-primary-500/10 via-white/5 to-transparent blur-3xl" />
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="projects-header text-center space-y-4 mb-16">
            <p className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.3em] text-gray-300">
              Selected Work
            </p>
            <h2 className="text-4xl sm:text-5xl font-bold text-white">Projects & Live Operations</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Hands-on ownership of launches, campaigns, and product iterations that blend product
              strategy with community-driven creativity.
            </p>
          </div>

          <div ref={filterRef} className="relative mb-12 flex flex-wrap justify-center gap-3">
            <span className="filter-indicator pointer-events-none absolute inset-y-0 left-0 w-0 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 opacity-25" />
            {categories.map((category) => (
              <button
                key={category}
                data-filter={category}
                onClick={() => setFilter(category)}
                className={`relative z-10 px-5 py-2.5 rounded-full text-sm font-medium capitalize transition-colors duration-200 ${
                  filter === category
                    ? 'text-white drop-shadow-[0_0_12px_rgba(14,165,233,0.35)]'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                {category === 'all' ? 'All Projects' : category}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <Card
                key={project.id}
                glass
                hover
                className="project-card cursor-pointer translate-y-10 scale-[0.97] opacity-0 border-white/10 bg-white/5 backdrop-blur"
                onClick={() => setSelectedProject(project)}
              >
                <div
                  className="w-full h-48 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg mb-4 flex items-center justify-center"
                  style={{
                    backgroundImage: `url(${project.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                />
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <Badge key={tech} variant="outline" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Project Modal */}
      <Modal
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        title={selectedProject?.title}
      >
        {selectedProject && (
          <div className="space-y-4">
            <div
              className="w-full h-64 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg"
              style={{
                backgroundImage: `url(${selectedProject.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
            <p className="text-gray-300">{selectedProject.longDescription}</p>

            <div>
              <h4 className="font-semibold mb-2">Technologies Used:</h4>
              <div className="flex flex-wrap gap-2">
                {selectedProject.technologies.map((tech) => (
                  <Badge key={tech} variant="primary">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              {selectedProject.liveUrl && (
                <a
                  href={selectedProject.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
                >
                  Live Demo
                </a>
              )}
              {selectedProject.githubUrl && (
                <a
                  href={selectedProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-secondary-500 text-white rounded-lg hover:bg-secondary-600 transition-colors"
                >
                  View Code
                </a>
              )}
            </div>
          </div>
        )}
      </Modal>
    </>
  )
}

