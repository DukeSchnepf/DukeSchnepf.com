import { useRef, useEffect } from 'react';
import { MagneticButton } from '@/components/common/MagneticButton';
import { ArrowRight, Github, Linkedin, Mail } from 'lucide-react';
import ShatteredText from '@/components/effects/ShatteredText';
import gsap from 'gsap';

interface HeroProps {
  showContent?: boolean;
}

const Hero = ({ showContent = true }: HeroProps) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current) return;

    const ctx = gsap.context(() => {
      if (showContent) {
        gsap.fromTo(
          contentRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', delay: 0.2 }
        );
      } else {
        gsap.to(contentRef.current, { opacity: 0, y: 20, duration: 0.3 });
      }
    }, contentRef);

    return () => ctx.revert();
  }, [showContent]);

  useEffect(() => {
    if (!scrollIndicatorRef.current || !showContent) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        scrollIndicatorRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1, delay: 1 }
      );
    }, scrollIndicatorRef);

    return () => ctx.revert();
  }, [showContent]);

  return (
    <section id="home" className="relative h-screen w-full overflow-hidden pointer-events-none">
      <div className="absolute inset-0 z-0">
        {/* Starfield is now global in App.tsx */}
      </div>

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center pointer-events-none">
        <div
          ref={contentRef}
          style={{ opacity: 0 }}
          className="max-w-4xl pointer-events-auto"
        >
          <div className="mb-4">
            <ShatteredText
              text="Duke Schnepf"
              trigger={showContent}
              className="font-display text-3xl font-bold leading-tight tracking-tight text-white md:text-5xl lg:text-7xl"
            />
          </div>

          <p className="mx-auto mb-6 max-w-3xl text-lg text-text-secondary md:text-3xl font-light tracking-wide">
            Fullstack Solutions Architect
          </p>

          <h2 className="mb-4 font-display text-xl font-bold text-white md:text-4xl">
            Managing Complexity with <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-purple">Simplicity</span>
          </h2>

          <p className="mx-auto mb-8 max-w-2xl text-sm text-text-secondary md:text-lg leading-relaxed italic">
            Blending both for infinite possibilities.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:gap-6 sm:flex-row">
            {/* Discover More - Nebula Flow Style */}
            <MagneticButton>
              <a
                href="#projects"
                className="group relative flex items-center gap-3 overflow-hidden rounded-full px-8 py-4 transition-all hover:scale-105"
              >
                {/* Animated Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-r from-neon-blue via-neon-purple to-neon-cyan animate-nebula-flow opacity-90 transition-opacity group-hover:opacity-100" />

                {/* Starburst Glow Effect on Hover */}
                <div className="absolute inset-0 bg-white/20 blur-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                {/* Content */}
                <span className="relative z-10 font-bold text-white text-lg tracking-wide">Discover More</span>
                <ArrowRight className="relative z-10 h-5 w-5 text-white transition-transform duration-300 group-hover:translate-x-1 group-hover:rotate-[-45deg]" />
              </a>
            </MagneticButton>

            {/* Get Connected - Orbital Ring Style */}
            <MagneticButton>
              <a
                href="#contact"
                className="group relative flex items-center gap-3 overflow-hidden rounded-full bg-space-void/40 px-8 py-4 backdrop-blur-md transition-all hover:bg-space-void/60"
              >
                {/* Orbital Ring Container */}
                <div className="absolute inset-0 rounded-full p-[2px]">
                  <div className="absolute inset-0 rounded-full border border-white/20" />
                  {/* Rotating Comet */}
                  <div className="absolute inset-0 animate-orbital-spin">
                    <div className="h-full w-full rounded-full border-t-2 border-neon-purple shadow-[0_0_15px_rgba(192,132,252,0.8)]" />
                  </div>
                </div>

                {/* Inner Glow */}
                <div className="absolute inset-0 rounded-full bg-neon-purple/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                {/* Content */}
                <span className="relative z-10 font-medium text-white group-hover:text-neon-purple transition-colors duration-300">Get Connected</span>
                <Mail className="relative z-10 h-5 w-5 text-white transition-all duration-300 group-hover:text-neon-purple group-hover:scale-110" />
              </a>
            </MagneticButton>
          </div>

          <div className="mt-12 flex items-center justify-center gap-6">
            <MagneticButton>
              <a href="https://github.com/DukeSchnepf" target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-white transition-colors">
                <Github className="h-6 w-6" />
              </a>
            </MagneticButton>
            <MagneticButton>
              <a href="https://linkedin.com/in/DukeSchnepf" target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-white transition-colors">
                <Linkedin className="h-6 w-6" />
              </a>
            </MagneticButton>
            <MagneticButton>
              <a href="mailto:duke@example.com" className="text-text-secondary hover:text-white transition-colors">
                <Mail className="h-6 w-6" />
              </a>
            </MagneticButton>
          </div>
        </div>
      </div>

      {showContent && (
        <div
          ref={scrollIndicatorRef}
          style={{ opacity: 0 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-white/50"
        >
          <div className="h-10 w-6 rounded-full border-2 border-white/30 flex justify-center p-1">
            <div className="h-2 w-1 bg-white/50 rounded-full animate-scroll" />
          </div>
        </div>
      )}
    </section>
  );
};

export default Hero;
