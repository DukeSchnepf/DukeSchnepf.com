import { HTMLAttributes, ReactNode, useRef } from 'react'
import { cn } from '@/utils/helpers'
import gsap from 'gsap'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  glass?: boolean
  hover?: boolean
  tilt?: boolean
}

export function Card({ children, glass = false, hover = false, tilt = false, className, ...props }: CardProps) {
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (!tilt || !cardRef.current) return
    const el = cardRef.current
    const rect = el.getBoundingClientRect()
    const relX = e.clientX - rect.left
    const relY = e.clientY - rect.top
    const percentX = (relX / rect.width) * 2 - 1 // -1 to 1
    const percentY = (relY / rect.height) * 2 - 1
    const rotateY = percentX * 8
    const rotateX = -percentY * 8
    gsap.to(el, { rotateX, rotateY, duration: 0.2, ease: 'power2.out', transformPerspective: 800, transformOrigin: 'center' })
  }

  const handleMouseLeave: React.MouseEventHandler<HTMLDivElement> = () => {
    if (!tilt || !cardRef.current) return
    gsap.to(cardRef.current, { rotateX: 0, rotateY: 0, duration: 0.3, ease: 'power2.out' })
  }

  return (
    <div
      ref={cardRef}
      className={cn(
        'rounded-2xl p-6 transition-all duration-300 will-change-transform',
        glass && 'bg-white/5 backdrop-blur-lg border border-white/10',
        hover && 'hover:scale-[1.03] hover:shadow-2xl',
        className
      )}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {children}
    </div>
  )
}

