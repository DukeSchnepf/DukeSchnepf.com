import type { HTMLAttributes } from 'react'
import { cn } from '@/utils/cn'

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'primary' | 'secondary' | 'outline'
}

export function Badge({ children, variant = 'primary', className, ...props }: BadgeProps) {
  const variants = {
    primary: 'bg-primary-500/20 text-primary-300 border-primary-500/50',
    secondary: 'bg-secondary-500/20 text-secondary-300 border-secondary-500/50',
    outline: 'bg-transparent text-gray-300 border-gray-600',
  }

  return (
    <span
      className={cn(
        'inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}

