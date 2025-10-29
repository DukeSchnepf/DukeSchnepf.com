import { HTMLAttributes, ReactNode, useRef } from 'react'
import { cn } from '@/utils/helpers'
import gsap from 'gsap'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  glass?: boolean
  hover?: boolean
}

export function Card({ children, glass = false, hover = false, className, ...props }: CardProps) {
  const cardRef = useRef<HTMLDivElement>(null)

  const onEnter = () => {
    if (!hover || !cardRef.current) return
    gsap.to(cardRef.current, { scale: 1.03, y: -2, boxShadow: '0 20px 40px rgba(0,0,0,0.25)', duration: 0.2, ease: 'power2.out' })
  }

  const onLeave = () => {
    if (!hover || !cardRef.current) return
    gsap.to(cardRef.current, { scale: 1, y: 0, boxShadow: 'none', duration: 0.25, ease: 'power2.out' })
  }

  return (
    <div
      ref={cardRef}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className={cn(
        'rounded-2xl p-6 transition-all duration-300',
        glass && 'bg-white/5 backdrop-blur-lg border border-white/10',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

