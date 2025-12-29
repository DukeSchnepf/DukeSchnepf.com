import { useState, useRef, useCallback } from 'react';
import { TiltCard } from '@/components/common/TiltCard';
import { ExternalLink, Github, ChevronLeft, ChevronRight } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import gsap from 'gsap';

function Projects({ id }: { id?: string }) {
  const containerRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLHeadingElement>(null);
  const pastCarouselRef = useRef<HTMLDivElement>(null);
  const currentCarouselRef = useRef<HTMLDivElement>(null);

  const [pastIndex, setPastIndex] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPastAnimating, setIsPastAnimating] = useState(false);
  const [isCurrentAnimating, setIsCurrentAnimating] = useState(false);

  const pastProjects = [
    {
      title: "Past Project 1",
      desc: "A placeholder for a past project description. This was a stepping stone.",
      tags: ["Legacy Tech", "Prototype"],
      github: "#",
      demo: "#",
      color: "from-neon-blue to-neon-cyan"
    },
    {
      title: "Past Project 2",
      desc: "Another past project that taught me valuable lessons.",
      tags: ["Old Framework", "Experiment"],
      github: "#",
      demo: "#",
      color: "from-blue-500 to-teal-400"
    }
  ];

  const currentProjects = [
    {
      title: "Current Project 1",
      desc: "A placeholder for a current project description. Cutting edge stuff.",
      tags: ["Modern Tech", "In Progress"],
      github: "#",
      demo: "#",
      color: "from-neon-purple to-neon-pink"
    },
    {
      title: "Current Project 2",
      desc: "Another current project pushing the boundaries of what's possible.",
      tags: ["Next Gen", "AI Integration"],
      github: "#",
      demo: "#",
      color: "from-purple-600 to-pink-500"
    }
  ];

  // Header animation
  useScrollReveal(headerRef, undefined, {
    animation: 'slideUp',
    once: true,
  });

  // Carousel transition animation
  const animateCarousel = useCallback((
    ref: React.RefObject<HTMLDivElement | null>,
    direction: number,
    onMidpoint: () => void,
    onComplete: () => void
  ) => {
    const el = ref.current;
    if (!el) {
      onMidpoint();
      onComplete();
      return;
    }

    // Exit animation
    gsap.to(el, {
      opacity: 0,
      x: -20 * direction,
      duration: 0.15,
      ease: 'power2.in',
      onComplete: () => {
        onMidpoint();

        // Set initial position for enter
        gsap.set(el, { x: 20 * direction, opacity: 0 });

        // Enter animation
        gsap.to(el, {
          opacity: 1,
          x: 0,
          duration: 0.15,
          ease: 'power2.out',
          onComplete,
        });
      },
    });
  }, []);

  const nextPast = useCallback(() => {
    if (isPastAnimating) return;
    setIsPastAnimating(true);
    animateCarousel(
      pastCarouselRef,
      1,
      () => setPastIndex((prev) => (prev + 1) % pastProjects.length),
      () => setIsPastAnimating(false)
    );
  }, [isPastAnimating, animateCarousel, pastProjects.length]);

  const prevPast = useCallback(() => {
    if (isPastAnimating) return;
    setIsPastAnimating(true);
    animateCarousel(
      pastCarouselRef,
      -1,
      () => setPastIndex((prev) => (prev - 1 + pastProjects.length) % pastProjects.length),
      () => setIsPastAnimating(false)
    );
  }, [isPastAnimating, animateCarousel, pastProjects.length]);

  const nextCurrent = useCallback(() => {
    if (isCurrentAnimating) return;
    setIsCurrentAnimating(true);
    animateCarousel(
      currentCarouselRef,
      1,
      () => setCurrentIndex((prev) => (prev + 1) % currentProjects.length),
      () => setIsCurrentAnimating(false)
    );
  }, [isCurrentAnimating, animateCarousel, currentProjects.length]);

  const prevCurrent = useCallback(() => {
    if (isCurrentAnimating) return;
    setIsCurrentAnimating(true);
    animateCarousel(
      currentCarouselRef,
      -1,
      () => setCurrentIndex((prev) => (prev - 1 + currentProjects.length) % currentProjects.length),
      () => setIsCurrentAnimating(false)
    );
  }, [isCurrentAnimating, animateCarousel, currentProjects.length]);

  const ProjectCard = ({ project }: { project: typeof pastProjects[0] }) => (
    <TiltCard className="h-full w-full">
      <div className={`h-full p-1 rounded-2xl bg-gradient-to-br ${project.color} opacity-80 hover:opacity-100 transition-opacity`}>
        <div className="h-full bg-space-light rounded-xl p-6 flex flex-col">
          <div className="mb-4">
            <h3 className="font-display text-2xl font-bold mb-2 text-white">
              {project.title}
            </h3>
            <p className="text-text-secondary text-sm mb-4 leading-relaxed line-clamp-3">
              {project.desc}
            </p>
            <div className="flex flex-wrap gap-2 mb-6">
              {project.tags.map((tag, i) => (
                <span key={i} className="text-xs font-mono px-2 py-1 rounded bg-space-accent text-neon-cyan border border-neon-cyan/20">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="flex gap-4 mt-auto pt-4 border-t border-white/10">
            <a href={project.github} className="flex items-center gap-2 text-sm font-bold text-white hover:text-neon-blue transition-colors">
              <Github size={18} /> Code
            </a>
            <a href={project.demo} className="flex items-center gap-2 text-sm font-bold text-white hover:text-neon-purple transition-colors">
              <ExternalLink size={18} /> Live Demo
            </a>
          </div>
        </div>
      </div>
    </TiltCard>
  );

  return (
    <section id={id} ref={containerRef} className="min-h-screen py-12 md:py-20 bg-space-void text-white relative overflow-hidden flex flex-col justify-center">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-neon-blue/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-neon-purple/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      <div className="container mx-auto px-4">
        <h2
          ref={headerRef}
          className="font-display text-4xl md:text-5xl font-bold mb-16 text-center"
        >
          Past and <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-purple">Current</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto items-center">
          {/* Past Projects Carousel */}
          <div className="flex flex-col items-center gap-4">
            <h3 className="text-2xl font-bold text-neon-blue mb-2">Past</h3>
            <div className="flex items-center gap-4 w-full">
              <button
                onClick={prevPast}
                disabled={isPastAnimating}
                className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors disabled:opacity-50"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <div className="flex-1 h-[400px]">
                <div
                  ref={pastCarouselRef}
                  className="h-full"
                >
                  <ProjectCard project={pastProjects[pastIndex]} />
                </div>
              </div>
              <button
                onClick={nextPast}
                disabled={isPastAnimating}
                className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors disabled:opacity-50"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Current Projects Carousel */}
          <div className="flex flex-col items-center gap-4">
            <h3 className="text-2xl font-bold text-neon-purple mb-2">Current</h3>
            <div className="flex items-center gap-4 w-full">
              <button
                onClick={prevCurrent}
                disabled={isCurrentAnimating}
                className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors disabled:opacity-50"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <div className="flex-1 h-[400px]">
                <div
                  ref={currentCarouselRef}
                  className="h-full"
                >
                  <ProjectCard project={currentProjects[currentIndex]} />
                </div>
              </div>
              <button
                onClick={nextCurrent}
                disabled={isCurrentAnimating}
                className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors disabled:opacity-50"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Projects;
