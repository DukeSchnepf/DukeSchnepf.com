import { useEffect, useRef, useState } from 'react'

interface UseIntersectionObserverProps {
  threshold?: number
  root?: Element | null
  rootMargin?: string
  freezeOnceVisible?: boolean
}

export function useIntersectionObserver({
  threshold = 0,
  root = null,
  rootMargin = '0%',
  freezeOnceVisible = false,
}: UseIntersectionObserverProps = {}) {
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null)
  const elementRef = useRef<HTMLElement>(null)

  const frozen = entry?.isIntersecting && freezeOnceVisible

  useEffect(() => {
    const element = elementRef.current
    if (!element || frozen) return

    const observerParams = { threshold, root, rootMargin }
    const observer = new IntersectionObserver(
      ([entry]) => setEntry(entry),
      observerParams
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [elementRef.current, threshold, root, rootMargin, frozen])

  return { elementRef, entry }
}

