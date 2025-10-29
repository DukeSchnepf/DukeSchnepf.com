import { HTMLAttributes, ReactNode } from 'react'
import { cn } from '@/utils/helpers'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  glass?: boolean
  hover?: boolean
}

export function Card({ children, glass = false, hover = false, className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-2xl p-6 transition-all duration-300 will-change-transform',
        glass && 'bg-white/5 backdrop-blur-lg border border-white/10 shadow-lg shadow-black/10',
        hover && 'hover:translate-y-[-2px] hover:shadow-2xl hover:shadow-black/20',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

