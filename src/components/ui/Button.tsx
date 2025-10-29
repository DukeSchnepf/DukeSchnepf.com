import { ButtonHTMLAttributes, forwardRef, ReactNode, useEffect, useRef } from 'react'
import { cn } from '@/utils/helpers'
import gsap from 'gsap'

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
    const localRef = useRef<HTMLButtonElement | null>(null)
    // Merge refs
    const setRefs = (node: HTMLButtonElement) => {
      localRef.current = node
      if (typeof ref === 'function') ref(node)
      else if (ref) (ref as React.MutableRefObject<HTMLButtonElement | null>).current = node
    }

    useEffect(() => {
      if (!localRef.current) return
      const el = localRef.current
      const toScale = gsap.quickTo(el, 'scale', { duration: 0.15, ease: 'power2.out' })
      const toY = gsap.quickTo(el, 'y', { duration: 0.15, ease: 'power2.out' })
      const toShadow = gsap.quickTo(el, 'boxShadow', { duration: 0.2, ease: 'power2.out' })

      const onEnter = () => {
        toScale(1.03)
        toY(-1)
        toShadow('0 8px 20px rgba(0,0,0,0.2)')
      }
      const onLeave = () => {
        toScale(1)
        toY(0)
        toShadow('none')
      }
      const onDown = () => {
        toScale(0.98)
        toY(0)
      }
      const onUp = () => {
        toScale(1.03)
        toY(-1)
      }

      el.addEventListener('pointerenter', onEnter)
      el.addEventListener('pointerleave', onLeave)
      el.addEventListener('pointerdown', onDown)
      el.addEventListener('pointerup', onUp)

      return () => {
        el.removeEventListener('pointerenter', onEnter)
        el.removeEventListener('pointerleave', onLeave)
        el.removeEventListener('pointerdown', onDown)
        el.removeEventListener('pointerup', onUp)
      }
    }, [])
    const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed'

    const variants = {
      primary: 'bg-primary-500 text-white hover:bg-primary-600 active:bg-primary-700',
      secondary:
        'bg-secondary-500 text-white hover:bg-secondary-600 active:bg-secondary-700',
      ghost:
        'bg-transparent text-primary-500 hover:bg-primary-50 active:bg-primary-100',
    }

    const sizes = {
      sm: 'px-3 py-1.5 text-sm rounded-md',
      md: 'px-4 py-2 text-base rounded-lg',
      lg: 'px-6 py-3 text-lg rounded-xl',
    }

    return (
      <button
        ref={setRefs}
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

