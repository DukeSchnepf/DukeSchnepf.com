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
        'rounded-2xl p-6 transition-all duration-300',
        glass && 'bg-white/5 backdrop-blur-lg border border-white/10',
        hover && 'hover:scale-105 hover:shadow-2xl',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

