import { gsap } from 'gsap'

export const animationPresets = {
  fadeIn: (targets: string | Element, options = {}) => {
    return gsap.from(targets, {
      opacity: 0,
      duration: 0.6,
      ease: 'power2.out',
      ...options,
    })
  },

  slideUp: (targets: string | Element, options = {}) => {
    return gsap.from(targets, {
      y: 50,
      opacity: 0,
      duration: 0.6,
      ease: 'power2.out',
      ...options,
    })
  },

  slideDown: (targets: string | Element, options = {}) => {
    return gsap.from(targets, {
      y: -50,
      opacity: 0,
      duration: 0.6,
      ease: 'power2.out',
      ...options,
    })
  },

  slideLeft: (targets: string | Element, options = {}) => {
    return gsap.from(targets, {
      x: 100,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
      ...options,
    })
  },

  slideRight: (targets: string | Element, options = {}) => {
    return gsap.from(targets, {
      x: -100,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
      ...options,
    })
  },

  stagger: (targets: string | Element, options = {}) => {
    return gsap.from(targets, {
      opacity: 0,
      y: 30,
      duration: 0.5,
      ease: 'power2.out',
      stagger: 0.1,
      ...options,
    })
  },

  scaleIn: (targets: string | Element, options = {}) => {
    return gsap.from(targets, {
      scale: 0.8,
      opacity: 0,
      duration: 0.4,
      ease: 'back.out(1.7)',
      ...options,
    })
  },

  rotateIn: (targets: string | Element, options = {}) => {
    return gsap.from(targets, {
      rotation: 180,
      scale: 0,
      opacity: 0,
      duration: 0.8,
      ease: 'back.out(1.7)',
      ...options,
    })
  },

  flipIn: (targets: string | Element, options = {}) => {
    return gsap.from(targets, {
      rotationY: 90,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out',
      transformOrigin: 'center center',
      ...options,
    })
  },

  bounceIn: (targets: string | Element, options = {}) => {
    return gsap.from(targets, {
      y: -100,
      opacity: 0,
      duration: 1,
      ease: 'bounce.out',
      ...options,
    })
  },

  revealFromLeft: (targets: string | Element, options = {}) => {
    return gsap.from(targets, {
      clipPath: 'inset(0 100% 0 0)',
      duration: 1,
      ease: 'power3.out',
      ...options,
    })
  },

  textReveal: (targets: string | Element, options = {}) => {
    return gsap.from(targets, {
      opacity: 0,
      y: 20,
      duration: 0.6,
      ease: 'power2.out',
      stagger: {
        each: 0.03,
        from: 'start',
      },
      ...options,
    })
  },
}

export const scrollAnimations = {
  fadeInOnScroll: (targets: string | Element) => {
    return gsap.to(targets, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: targets,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse',
      },
    })
  },

  parallax: (targets: string | Element, speed = 0.5) => {
    return gsap.to(targets, {
      y: (i, target) => {
        const element = target as HTMLElement
        return -element.offsetHeight * speed
      },
      ease: 'none',
      scrollTrigger: {
        trigger: targets,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    })
  },

  scaleOnScroll: (targets: string | Element) => {
    return gsap.fromTo(
      targets,
      { scale: 0.8, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: targets,
          start: 'top 85%',
          end: 'top 60%',
          toggleActions: 'play none none reverse',
        },
      }
    )
  },

  slideInOnScroll: (targets: string | Element, direction: 'left' | 'right' = 'left') => {
    const xValue = direction === 'left' ? -100 : 100
    return gsap.fromTo(
      targets,
      { x: xValue, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: targets,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      }
    )
  },
}

export const hoverAnimations = {
  magneticButton: (button: HTMLElement, strength = 0.3) => {
    const handleMouseMove = (e: MouseEvent) => {
      const { left, top, width, height } = button.getBoundingClientRect()
      const centerX = left + width / 2
      const centerY = top + height / 2
      const deltaX = (e.clientX - centerX) * strength
      const deltaY = (e.clientY - centerY) * strength

      gsap.to(button, {
        x: deltaX,
        y: deltaY,
        duration: 0.3,
        ease: 'power2.out',
      })
    }

    const handleMouseLeave = () => {
      gsap.to(button, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'elastic.out(1, 0.3)',
      })
    }

    button.addEventListener('mousemove', handleMouseMove)
    button.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      button.removeEventListener('mousemove', handleMouseMove)
      button.removeEventListener('mouseleave', handleMouseLeave)
    }
  },

  glowOnHover: (target: string | Element) => {
    const element = typeof target === 'string' ? document.querySelector(target) : target
    if (!element) return

    element.addEventListener('mouseenter', () => {
      gsap.to(element, {
        boxShadow: '0 0 20px rgba(99, 102, 241, 0.5)',
        scale: 1.05,
        duration: 0.3,
      })
    })

    element.addEventListener('mouseleave', () => {
      gsap.to(element, {
        boxShadow: '0 0 0px rgba(99, 102, 241, 0)',
        scale: 1,
        duration: 0.3,
      })
    })
  },
}

