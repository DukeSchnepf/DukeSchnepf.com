import { useEffect, useRef } from 'react'
import gsap from 'gsap'

interface UseGSAPProps {
  scope?: string
  dependencies?: any[]
}

export function useGSAP({ scope = '', dependencies = [] }: UseGSAPProps = {}) {
  const contextRef = useRef<gsap.Context | null>(null)

  useEffect(() => {
    const context = scope
      ? gsap.context(() => {}, scope)
      : gsap.context(() => {})

    contextRef.current = context

    return () => {
      context.revert()
    }
  }, dependencies)

  return contextRef.current
}

