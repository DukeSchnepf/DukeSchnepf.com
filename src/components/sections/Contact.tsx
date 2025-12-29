import { useRef } from 'react';
import { MagneticButton } from '@/components/common/MagneticButton';
import { Mail, Github, Linkedin, Twitter, Send } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

function Contact({ id }: { id?: string }) {
  const containerRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  // Header animations
  useScrollReveal(headerRef, '.reveal-header', {
    animation: 'slideUp',
    stagger: 0.1,
    once: true,
  });

  // Contact info animation
  useScrollReveal(infoRef, undefined, {
    animation: 'slideRight',
    delay: 0.2,
    once: true,
  });

  // Form animation
  useScrollReveal(formRef, undefined, {
    animation: 'slideLeft',
    delay: 0.3,
    once: true,
  });

  return (
    <section id={id} ref={containerRef} className="min-h-screen py-12 md:py-20 bg-space-void text-white relative overflow-hidden">
      {/* Footer Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-neon-blue/5 to-transparent pointer-events-none" />

      <div className="container mx-auto px-4 max-w-4xl relative z-10">
        <div ref={headerRef} className="text-center mb-16">
          <h2 className="reveal-header font-display text-4xl md:text-5xl font-bold mb-6">
            Let's <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-purple">Connect</span>
          </h2>
          <p className="reveal-header text-xl text-text-secondary max-w-2xl mx-auto">
            Interested in collaborating on AI projects or just want to say hi?
            I'm always open to new opportunities and interesting conversations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div
            ref={infoRef}
            className="space-y-8"
          >
            <h3 className="font-display text-2xl font-bold text-neon-cyan">Get in Touch</h3>

            <div className="space-y-6">
              <MagneticButton className="w-full">
                <a href="mailto:hello@duke.dev" className="flex items-center gap-4 p-4 rounded-xl bg-space-light border border-white/5 hover:border-neon-blue/50 transition-colors group w-full">
                  <div className="p-3 rounded-lg bg-space-accent group-hover:text-neon-blue transition-colors">
                    <Mail size={24} />
                  </div>
                  <div className="text-left">
                    <div className="text-sm text-text-muted">Email</div>
                    <div className="font-mono text-lg text-white">hello@duke.dev</div>
                  </div>
                </a>
              </MagneticButton>

              <div className="flex gap-4">
                {[
                  { icon: <Github size={24} />, href: "#", label: "GitHub" },
                  { icon: <Linkedin size={24} />, href: "#", label: "LinkedIn" },
                  { icon: <Twitter size={24} />, href: "#", label: "Twitter" }
                ].map((social, index) => (
                  <MagneticButton key={index}>
                    <a
                      href={social.href}
                      className="flex p-4 rounded-xl bg-space-light border border-white/5 hover:border-neon-purple/50 hover:text-neon-purple transition-all"
                      aria-label={social.label}
                    >
                      {social.icon}
                    </a>
                  </MagneticButton>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <form
            ref={formRef}
            className="space-y-4"
          >
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-text-secondary mb-1">Name</label>
              <input
                type="text"
                id="name"
                className="w-full px-4 py-3 rounded-lg bg-space-light border border-white/10 focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan outline-none transition-colors text-white"
                placeholder="Your Name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-text-secondary mb-1">Email</label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-3 rounded-lg bg-space-light border border-white/10 focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan outline-none transition-colors text-white"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-text-secondary mb-1">Message</label>
              <textarea
                id="message"
                rows={4}
                className="w-full px-4 py-3 rounded-lg bg-space-light border border-white/10 focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan outline-none transition-colors resize-none text-white"
                placeholder="Tell me about your project..."
              />
            </div>

            <MagneticButton className="w-full">
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-neon-blue to-neon-purple p-4 font-bold text-white hover:opacity-90 transition-opacity"
              >
                <Send size={18} /> Send Message
              </button>
            </MagneticButton>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Contact;
