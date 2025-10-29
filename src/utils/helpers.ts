import { clsx, type ClassValue } from 'clsx'

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}

function getHeaderOffsetPx(): number {
  const nav = document.querySelector('nav') as HTMLElement | null
  return nav?.getBoundingClientRect().height ?? 0
}

export function smoothScrollTo(elementId: string) {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const id = elementId.replace('#', '')
  if (id === 'home') {
    if (prefersReducedMotion) {
      window.scrollTo(0, 0)
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
    history.pushState(null, '', '#home')
    return
  }

  const element = document.getElementById(id)
  if (!element) return

  const headerOffset = getHeaderOffsetPx()
  const elementTop = element.getBoundingClientRect().top + window.pageYOffset
  const targetY = Math.max(elementTop - headerOffset - 8, 0) // 8px breathing room

  if (prefersReducedMotion) {
    window.scrollTo(0, targetY)
  } else {
    window.scrollTo({ top: targetY, behavior: 'smooth' })
  }
  history.pushState(null, '', `#${id}`)
}

export function debounce<T extends (...args: any[]) => void>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null
      func(...args)
    }
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

