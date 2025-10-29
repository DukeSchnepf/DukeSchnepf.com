import { HTMLAttributes, ReactNode, useEffect, useRef, forwardRef } from 'react'
import { cn } from '@/utils/helpers'
import gsap from 'gsap'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  glass?: boolean
  hover?: boolean
  animatedBorder?: boolean
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ children, glass = false, hover = false, animatedBorder = false, className, ...props }, forwardedRef) => {
    const cardRef = useRef<HTMLDivElement>(null)
    const borderRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
      const card = cardRef.current
      if (!card || !hover) return

      const handleMouseEnter = (e: MouseEvent) => {
        gsap.to(card, {
          scale: 1.02,
          y: -5,
          duration: 0.4,
          ease: 'power2.out',
        })

        if (glass) {
          gsap.to(card, {
            boxShadow: '0 20px 40px rgba(99, 102, 241, 0.2)',
            duration: 0.4,
          })
        }
      }

      const handleMouseMove = (e: MouseEvent) => {
        if (!animatedBorder) return
        const rect = card.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top

        if (borderRef.current) {
          gsap.to(borderRef.current, {
            background: `radial-gradient(circle at ${x}px ${y}px, rgba(99, 102, 241, 0.6), transparent 50%)`,
            duration: 0.3,
          })
        }
      }

      const handleMouseLeave = () => {
        gsap.to(card, {
          scale: 1,
          y: 0,
          duration: 0.4,
          ease: 'power2.out',
        })

        if (glass) {
          gsap.to(card, {
            boxShadow: '0 0 0 rgba(99, 102, 241, 0)',
            duration: 0.4,
          })
        }

        if (borderRef.current) {
          gsap.to(borderRef.current, {
            background: 'transparent',
            duration: 0.3,
          })
        }
      }

      card.addEventListener('mouseenter', handleMouseEnter)
      card.addEventListener('mousemove', handleMouseMove)
      card.addEventListener('mouseleave', handleMouseLeave)

      return () => {
        card.removeEventListener('mouseenter', handleMouseEnter)
        card.removeEventListener('mousemove', handleMouseMove)
        card.removeEventListener('mouseleave', handleMouseLeave)
      }
    }, [hover, glass, animatedBorder])

    return (
      <div
        ref={(node) => {
          cardRef.current = node
          if (typeof forwardedRef === 'function') {
            forwardedRef(node)
          } else if (forwardedRef) {
            forwardedRef.current = node
          }
        }}
        className={cn(
          'rounded-2xl p-6 transition-colors duration-300 relative overflow-hidden',
          glass && 'bg-white/5 backdrop-blur-lg border border-white/10',
          className
        )}
        {...props}
      >
        {animatedBorder && (
          <div
            ref={borderRef}
            className="absolute inset-0 pointer-events-none rounded-2xl opacity-50"
            style={{ zIndex: 0 }}
          />
        )}
        <div className="relative z-10">{children}</div>
      </div>
    )
  }
)

Card.displayName = 'Card'

