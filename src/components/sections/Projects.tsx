import { useState, useEffect, useRef } from 'react'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Modal } from '@/components/ui/Modal'
import { projects, type Project, type ProjectCategory } from '@/config/projects.config'
import gsap from 'gsap'

export function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [filter, setFilter] = useState<ProjectCategory>('all')
  const [filteredProjects, setFilteredProjects] = useState(projects)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (filter === 'all') {
      setFilteredProjects(projects)
    } else {
      setFilteredProjects(projects.filter((p) => p.category === filter))
    }
  }, [filter])

  useEffect(() => {
    if (sectionRef.current) {
      gsap.fromTo(
        sectionRef.current.querySelectorAll('.project-card'),
        {
          opacity: 0,
          y: 50,
          scale: 0.95,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      )
    }
  }, [filteredProjects])

  const categories: ProjectCategory[] = ['all', 'web', 'mobile', 'desktop', 'other']

  return (
    <>
      <section id="projects" ref={sectionRef} className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">My Projects</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              A selection of projects I've worked on
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 capitalize ${
                  filter === category
                    ? 'bg-primary-500 text-white'
                    : 'bg-white/5 text-gray-400 hover:text-white'
                }`}
              >
                {category === 'all' ? 'All' : category}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <Card
                key={project.id}
                glass
                hover
                className="project-card cursor-pointer"
                onClick={() => setSelectedProject(project)}
              >
                <div
                  className="w-full h-48 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg mb-4 flex items-center justify-center"
                  style={{
                    background: `linear-gradient(135deg, ${project.image})`,
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
                background: `linear-gradient(135deg, ${selectedProject.image})`,
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

