import { ButtonHTMLAttributes, forwardRef, ReactNode } from 'react'
import { cn } from '@/utils/helpers'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
  children: ReactNode
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { variant = 'primary', size = 'md', isLoading, className, children, ...props },
    ref
  ) => {
    const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform'

    const variants = {
      primary:
        'bg-primary-500 text-white shadow-sm hover:shadow-lg hover:-translate-y-0.5 hover:bg-primary-600 active:bg-primary-700 focus-visible:ring-2 focus-visible:ring-primary-400/40',
      secondary:
        'bg-secondary-500 text-white shadow-sm hover:shadow-lg hover:-translate-y-0.5 hover:bg-secondary-600 active:bg-secondary-700 focus-visible:ring-2 focus-visible:ring-secondary-400/40',
      ghost:
        'bg-transparent text-primary-400 hover:text-white hover:bg-white/10 active:bg-white/20 focus-visible:ring-2 focus-visible:ring-primary-400/30',
    }

    const sizes = {
      sm: 'px-3 py-1.5 text-sm rounded-md',
      md: 'px-4 py-2 text-base rounded-lg',
      lg: 'px-6 py-3 text-lg rounded-xl',
    }

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading ? (
          <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
        ) : null}
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'

