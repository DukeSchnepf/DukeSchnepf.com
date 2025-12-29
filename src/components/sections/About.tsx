import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { profile } from '@/config/profile.config';

gsap.registerPlugin(ScrollTrigger);

function About({ id }: { id?: string }) {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
      }
    });

    tl.from('.about-text', {
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2
    });

  }, { scope: containerRef });

  return (
    <section id={id} ref={containerRef} className="h-screen py-20 bg-space-void text-white relative overflow-hidden flex flex-col justify-center">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-neon-purple/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-neon-blue/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="about-image relative group max-w-md mx-auto md:max-w-full">
            <div className="absolute -inset-4 bg-gradient-to-r from-neon-blue to-neon-purple rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-500" />
            <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-space-light aspect-square">
              <img
                src={profile.headshot}
                alt={profile.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="about-content space-y-6 lg:space-y-4">
            <h2 className="font-display text-4xl md:text-5xl font-bold">
              About <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-purple">Me</span>
            </h2>

            <p className="about-text text-lg text-text-secondary leading-relaxed">
              {profile.philosophy}
            </p>

            <p className="about-text text-lg text-text-secondary leading-relaxed">
              {profile.overview}
            </p>

            <div className="pt-6 lg:pt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-space-light border border-white/5">
                  <h4 className="text-3xl font-bold text-neon-cyan mb-1">3+</h4>
                  <p className="text-sm text-text-muted">Years Experience</p>
                </div>
                <div className="p-4 rounded-xl bg-space-light border border-white/5">
                  <h4 className="text-3xl font-bold text-neon-purple mb-1">20+</h4>
                  <p className="text-sm text-text-muted">Projects Completed</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
