# GSAP Animation System - Usage Examples

This document provides practical examples of using the enhanced GSAP animation system in your React components.

---

## Table of Contents

1. [Basic Setup](#basic-setup)
2. [Timeline Animations](#timeline-animations)
3. [Scroll-Driven Animations](#scroll-driven-animations)
4. [Text Animations](#text-animations)
5. [Advanced Patterns](#advanced-patterns)

---

## Basic Setup

### Import Methods

```typescript
// Method 1: Import specific utilities
import { createHeroTimeline, fadeInOnScroll } from '@/features/animations/gsap'

// Method 2: Import from animation presets (includes new utilities)
import { createHeroTimeline, fadeInOnScroll } from '@/features/animations/animation.presets'

// Method 3: Import from specific modules
import { createHeroTimeline } from '@/features/animations/gsap/timelines'
import { fadeInOnScroll } from '@/features/animations/gsap/scroll'
import { animateCharReveal } from '@/features/animations/gsap/text'
```

---

## Timeline Animations

### Example 1: Hero Section Entrance

```tsx
import { useEffect, useRef } from 'react'
import { createHeroTimeline } from '@/features/animations/gsap'

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const tl = createHeroTimeline({
      delay: 0.5,
      onComplete: () => console.log('Hero animation complete!'),
    })

    return () => {
      tl.kill() // Cleanup on unmount
    }
  }, [])

  return (
    <div ref={heroRef} className="hero">
      <h1 className="hero-title">Welcome to My Portfolio</h1>
      <p className="hero-subtitle">Full-Stack Developer & Designer</p>
      <button className="hero-cta">View My Work</button>
    </div>
  )
}
```

### Example 2: Card Grid Reveal

```tsx
import { useEffect } from 'react'
import { createCardRevealTimeline } from '@/features/animations/gsap'

const ProjectGrid = ({ projects }) => {
  useEffect(() => {
    const tl = createCardRevealTimeline('.project-card', {
      delay: 0.3,
    })

    return () => tl.kill()
  }, [projects])

  return (
    <div className="grid grid-cols-3 gap-6">
      {projects.map((project) => (
        <div key={project.id} className="project-card">
          {/* Card content */}
        </div>
      ))}
    </div>
  )
}
```

### Example 3: Timeline Orchestration

```tsx
import { useEffect } from 'react'
import {
  TimelineOrchestrator,
  createHeroTimeline,
  createCardRevealTimeline,
} from '@/features/animations/gsap'

const HomePage = () => {
  useEffect(() => {
    const orchestrator = new TimelineOrchestrator()

    // Create and register multiple timelines
    const heroTl = createHeroTimeline({ paused: true })
    const projectsTl = createCardRevealTimeline('.project-card', { paused: true })

    orchestrator.register('hero', heroTl)
    orchestrator.register('projects', projectsTl)

    // Play in sequence
    orchestrator.play('hero')

    setTimeout(() => {
      orchestrator.play('projects')
    }, 1500)

    return () => {
      orchestrator.clear() // Cleanup all timelines
    }
  }, [])

  return (
    <>
      <section className="hero">{/* Hero content */}</section>
      <section className="projects">{/* Projects content */}</section>
    </>
  )
}
```

---

## Scroll-Driven Animations

### Example 4: Fade In On Scroll

```tsx
import { useEffect } from 'react'
import { fadeInOnScroll } from '@/features/animations/gsap'

const About = () => {
  useEffect(() => {
    const animation = fadeInOnScroll('.about-content', {
      start: 'top 80%',
      end: 'bottom 20%',
      onEnter: () => console.log('About section entered'),
    })

    return () => animation.kill()
  }, [])

  return (
    <section className="about">
      <div className="about-content">
        <h2>About Me</h2>
        <p>I'm a passionate developer...</p>
      </div>
    </section>
  )
}
```

### Example 5: Staggered List Animation

```tsx
import { useEffect } from 'react'
import { staggerOnScroll } from '@/features/animations/gsap'

const SkillsList = ({ skills }) => {
  useEffect(() => {
    const animation = staggerOnScroll('.skill-item', {
      staggerAmount: 0.2,
      start: 'top 85%',
    })

    return () => animation.kill()
  }, [skills])

  return (
    <ul className="skills-list">
      {skills.map((skill) => (
        <li key={skill.id} className="skill-item">
          {skill.name}
        </li>
      ))}
    </ul>
  )
}
```

### Example 6: Parallax Effect

```tsx
import { useEffect } from 'react'
import { parallaxOnScroll } from '@/features/animations/gsap'

const ParallaxSection = () => {
  useEffect(() => {
    // Slower elements move less, creating depth
    const bgAnimation = parallaxOnScroll('.parallax-bg', 0.5)
    const mgAnimation = parallaxOnScroll('.parallax-mg', 0.3)
    const fgAnimation = parallaxOnScroll('.parallax-fg', 0.1)

    return () => {
      bgAnimation?.kill()
      mgAnimation?.kill()
      fgAnimation?.kill()
    }
  }, [])

  return (
    <section className="parallax-container">
      <div className="parallax-bg">Background Layer</div>
      <div className="parallax-mg">Middle Layer</div>
      <div className="parallax-fg">Foreground Layer</div>
    </section>
  )
}
```

### Example 7: Pinned Section

```tsx
import { useEffect } from 'react'
import { pinSection } from '@/features/animations/gsap'

const PinnedContent = () => {
  useEffect(() => {
    const scrollTrigger = pinSection('.pinned-section', {
      start: 'top top',
      end: '+=500', // Pin for 500px of scroll
    })

    return () => scrollTrigger.kill()
  }, [])

  return (
    <section className="pinned-section">
      <h2>This section stays pinned while you scroll</h2>
    </section>
  )
}
```

### Example 8: Horizontal Scroll Gallery

```tsx
import { useEffect } from 'react'
import { horizontalScroll } from '@/features/animations/gsap'

const Gallery = ({ images }) => {
  useEffect(() => {
    const animation = horizontalScroll('.gallery-container', '.gallery-track')

    return () => animation?.kill()
  }, [images])

  return (
    <section className="gallery-container overflow-hidden">
      <div className="gallery-track flex gap-6">
        {images.map((img) => (
          <img key={img.id} src={img.url} className="gallery-item" />
        ))}
      </div>
    </section>
  )
}
```

### Example 9: Scroll Progress Bar

```tsx
import { useEffect } from 'react'
import { createScrollProgress } from '@/features/animations/gsap'

const ScrollProgressBar = () => {
  useEffect(() => {
    const animation = createScrollProgress('.progress-bar')

    return () => animation.kill()
  }, [])

  return (
    <div
      className="progress-bar fixed top-0 left-0 h-1 bg-blue-500 origin-left"
      style={{ scaleX: 0 }}
    />
  )
}
```

---

## Text Animations

### Example 10: Character Reveal

```tsx
import { useEffect, useRef } from 'react'
import { animateCharReveal } from '@/features/animations/gsap'

const AnimatedHeading = ({ children }) => {
  const headingRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    if (!headingRef.current) return

    const animation = animateCharReveal(headingRef.current, {
      scrollTrigger: true,
      stagger: 0.03,
      ease: 'back.out(1.7)',
      start: 'top 85%',
    })

    return () => animation.kill()
  }, [children])

  return <h1 ref={headingRef}>{children}</h1>
}
```

### Example 11: Typing Effect

```tsx
import { useEffect, useRef } from 'react'
import { animateTyping, addTypingCursorStyles } from '@/features/animations/gsap'

const TypewriterText = ({ text }) => {
  const textRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    addTypingCursorStyles() // Add cursor animation CSS

    if (!textRef.current) return

    const tl = animateTyping(textRef.current, {
      cursor: true,
      stagger: 0.05,
      delay: 0.5,
    })

    return () => tl?.kill()
  }, [text])

  return <p ref={textRef}>{text}</p>
}
```

### Example 12: Text Scramble Effect

```tsx
import { useEffect, useRef } from 'react'
import { animateScramble } from '@/features/animations/gsap'

const ScrambleText = ({ children }) => {
  const textRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    if (!textRef.current) return

    const animation = animateScramble(textRef.current, {
      duration: 2,
      scrollTrigger: true,
      start: 'top 80%',
    })

    return () => animation?.kill()
  }, [children])

  return <h2 ref={textRef}>{children}</h2>
}
```

### Example 13: Glitch Effect on Hover

```tsx
import { useRef } from 'react'
import { animateGlitch } from '@/features/animations/gsap'

const GlitchButton = ({ children, onClick }) => {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const glitchTimelineRef = useRef<gsap.core.Timeline | null>(null)

  const handleMouseEnter = () => {
    if (!buttonRef.current) return
    glitchTimelineRef.current = animateGlitch(buttonRef.current, {
      delay: 0,
    })
  }

  const handleMouseLeave = () => {
    glitchTimelineRef.current?.kill()
  }

  return (
    <button
      ref={buttonRef}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </button>
  )
}
```

---

## Advanced Patterns

### Example 14: Combined Animations with useGSAP Hook

```tsx
import { useEffect, useRef } from 'react'
import { useGSAP } from '@/hooks/useGSAP'
import {
  fadeInOnScroll,
  animateCharReveal,
  createCardRevealTimeline,
} from '@/features/animations/gsap'

const ComplexSection = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const context = useGSAP({ scope: sectionRef.current })

  useEffect(() => {
    if (!context) return

    // All animations will be scoped to this section
    animateCharReveal('.section-title', {
      scrollTrigger: true,
      stagger: 0.02,
    })

    fadeInOnScroll('.section-content')

    createCardRevealTimeline('.card')

    // Cleanup handled by context
  }, [context])

  return (
    <section ref={sectionRef}>
      <h2 className="section-title">Featured Work</h2>
      <div className="section-content">
        <div className="card">Card 1</div>
        <div className="card">Card 2</div>
        <div className="card">Card 3</div>
      </div>
    </section>
  )
}
```

### Example 15: Responsive Animations

```tsx
import { useEffect, useRef } from 'react'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { fadeInOnScroll, slideInOnScroll } from '@/features/animations/gsap'

const ResponsiveSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isDesktop = useMediaQuery('(min-width: 768px)')

  useEffect(() => {
    if (!sectionRef.current) return

    // Different animations based on screen size
    const animation = isDesktop
      ? slideInOnScroll(sectionRef.current, 'left', {
          start: 'top 80%',
        })
      : fadeInOnScroll(sectionRef.current, {
          start: 'top 90%',
        })

    return () => animation?.kill()
  }, [isDesktop])

  return (
    <div ref={sectionRef}>
      <h2>Responsive Animation</h2>
      <p>Different animation on mobile vs desktop</p>
    </div>
  )
}
```

### Example 16: Reusable Animation Hook

```tsx
import { useEffect, useRef } from 'react'
import { fadeInOnScroll } from '@/features/animations/gsap'

// Custom hook for fade-in animation
const useFadeInAnimation = (delay = 0) => {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!ref.current) return

    const animation = fadeInOnScroll(ref.current, {
      start: 'top 80%',
      delay,
    })

    return () => animation.kill()
  }, [delay])

  return ref
}

// Usage
const AnimatedComponent = () => {
  const titleRef = useFadeInAnimation(0)
  const contentRef = useFadeInAnimation(0.2)

  return (
    <>
      <h2 ref={titleRef}>Title</h2>
      <p ref={contentRef}>Content</p>
    </>
  )
}
```

### Example 17: Performance Monitoring

```tsx
import { useEffect } from 'react'
import { batchScrollAnimations, refreshScrollTriggers } from '@/features/animations/gsap'

const PerformantList = ({ items }) => {
  useEffect(() => {
    // Batch animations for better performance
    batchScrollAnimations('.list-item', 'fadeIn', {
      start: 'top 85%',
    })

    // Refresh after DOM changes
    return () => {
      refreshScrollTriggers()
    }
  }, [items])

  return (
    <ul>
      {items.map((item) => (
        <li key={item.id} className="list-item">
          {item.name}
        </li>
      ))}
    </ul>
  )
}
```

---

## Best Practices

### 1. Always Cleanup

```tsx
useEffect(() => {
  const animation = fadeInOnScroll('.element')

  return () => {
    animation.kill() // Always kill animations on unmount
  }
}, [])
```

### 2. Use Refs for Elements

```tsx
const elementRef = useRef<HTMLDivElement>(null)

useEffect(() => {
  if (!elementRef.current) return

  const animation = fadeInOnScroll(elementRef.current)

  return () => animation.kill()
}, [])
```

### 3. Scope Animations with useGSAP

```tsx
const context = useGSAP({ scope: containerRef.current })

useEffect(() => {
  if (!context) return

  // Animations scoped to container
  fadeInOnScroll('.child-element')

  // Cleanup handled automatically by context
}, [context])
```

### 4. Batch Similar Animations

```tsx
// ✅ Good: Batch for performance
batchScrollAnimations('.item', 'fadeIn')

// ❌ Avoid: Individual ScrollTriggers
items.forEach((item) => {
  fadeInOnScroll(item)
})
```

### 5. Respect Motion Preferences

```tsx
useEffect(() => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (prefersReducedMotion) {
    // Skip or simplify animations
    return
  }

  const animation = fadeInOnScroll('.element')
  return () => animation.kill()
}, [])
```

---

## Common Patterns

### Entrance Animation on Mount

```tsx
useEffect(() => {
  const tl = createHeroTimeline({ delay: 0.5 })
  return () => tl.kill()
}, [])
```

### Scroll-Triggered Animation

```tsx
useEffect(() => {
  const animation = fadeInOnScroll('.element', {
    start: 'top 80%',
    onEnter: () => console.log('Entered!'),
  })
  return () => animation.kill()
}, [])
```

### Hover Animations

```tsx
const handleMouseEnter = () => {
  gsap.to(ref.current, { scale: 1.1, duration: 0.3 })
}

const handleMouseLeave = () => {
  gsap.to(ref.current, { scale: 1, duration: 0.3 })
}
```

---

## Troubleshooting

### Animation Not Working

1. Check element exists: Use refs and check `if (!ref.current) return`
2. Check timing: Add `delay` or verify ScrollTrigger `start`/`end`
3. Check cleanup: Ensure animations are killed on unmount

### Scroll Animation Not Triggering

1. Verify `start` and `end` positions
2. Add `markers: true` to debug
3. Call `refreshScrollTriggers()` after DOM changes

### Performance Issues

1. Use `batchScrollAnimations()` for multiple elements
2. Avoid animating on every scroll event
3. Use `scrub: true` for smooth scroll-linked animations
4. Check for animation conflicts

---

## Next Steps

- Integrate these animations into Hero, About, and Projects sections
- Create reusable animation components
- Build animation presets for your brand
- Combine with Three.js for 3D + DOM animations

For more details, see `STEP_5_SUMMARY.md`.

