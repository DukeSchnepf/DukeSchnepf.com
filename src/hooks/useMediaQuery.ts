import { useEffect, useState } from 'react'

export function useMediaQuery(query: string): boolean {
  // Initialize from current match to avoid initial flash/mismatch
  const [matches, setMatches] = useState<boolean>(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia === 'undefined') {
      return false
    }
    return window.matchMedia(query).matches
  })

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia === 'undefined') {
      return
    }

    const mediaQueryList = window.matchMedia(query)
    // Set on mount in case query string changed
    setMatches(mediaQueryList.matches)

    const handleChange = (event: MediaQueryListEvent) => setMatches(event.matches)

    if (typeof mediaQueryList.addEventListener === 'function') {
      mediaQueryList.addEventListener('change', handleChange)
      return () => mediaQueryList.removeEventListener('change', handleChange)
    } else {
      // Safari < 14 fallback
      mediaQueryList.addListener(handleChange)
      return () => {
        mediaQueryList.removeListener(handleChange)
      }
    }
  }, [query])

  return matches
}

