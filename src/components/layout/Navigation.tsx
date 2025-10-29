import { useState, useEffect, useRef } from 'react'
import { useScrollPosition } from '@/hooks/useScrollPosition'
import { siteConfig } from '@/config/site.config'
import { smoothScrollTo } from '@/utils/helpers'
import { Button } from '@/components/ui/Button'
import gsap from 'gsap'

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const lastScroll = useScrollPosition()
  const menuContainerRef = useRef<HTMLDivElement | null>(null)
  const menuBackdropRef = useRef<HTMLDivElement | null>(null)
  const tlRef = useRef<gsap.core.Timeline | null>(null)
  const toggleButtonRef = useRef<HTMLButtonElement | null>(null)
  const previouslyFocusedRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const currentScroll = window.pageYOffset
    setIsVisible(currentScroll < lastScroll || currentScroll < 100)
  }, [lastScroll])

  const handleNavClick = (href: string) => {
    const sectionId = href.replace('#', '')
    smoothScrollTo(sectionId)
    setIsMenuOpen(false)
  }

  // Build GSAP timeline once
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!menuContainerRef.current || !menuBackdropRef.current) return

      const items = menuContainerRef.current
        ? (menuContainerRef.current.querySelectorAll('[data-menu-item]') as NodeListOf<Element>)
        : ([] as Element[])

      tlRef.current = gsap
        .timeline({ paused: true })
        .fromTo(
          menuBackdropRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.25, ease: 'power2.out' },
          0
        )
        .fromTo(
          items,
          { y: 12, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.3, stagger: 0.05, ease: 'power2.out' },
          0.05
        )
    })

    // Ensure hidden initially
    gsap.set(menuBackdropRef.current, { opacity: 0 })
    const initialItems = menuContainerRef.current
      ? (menuContainerRef.current.querySelectorAll('[data-menu-item]') as NodeListOf<Element>)
      : ([] as Element[])
    gsap.set(initialItems, { opacity: 0, y: 12 })

    return () => ctx.revert()
  }, [])

  // Play / reverse on open change and manage accessibility
  useEffect(() => {
    const menuEl = menuContainerRef.current
    if (!tlRef.current || !menuEl) return

    if (isMenuOpen) {
      previouslyFocusedRef.current = (document.activeElement as HTMLElement) || null
      menuEl.setAttribute('aria-hidden', 'false')
      tlRef.current.play()
      // Move focus to first focusable item
      const focusables = menuEl.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )
      if (focusables.length > 0) {
        focusables[0].focus()
      }
    } else {
      tlRef.current.reverse()
      tlRef.current.eventCallback('onReverseComplete', () => {
        menuEl.setAttribute('aria-hidden', 'true')
        // Return focus to toggle button
        toggleButtonRef.current?.focus()
      })
    }
  }, [isMenuOpen])

  // Close on Escape, click outside, and trap focus when open
  useEffect(() => {
    if (!isMenuOpen) return

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMenuOpen(false)
        return
      }
      if (e.key === 'Tab') {
        const menuEl = menuContainerRef.current
        if (!menuEl) return
        const focusables = Array.from(
          menuEl.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
          )
        )
        if (focusables.length === 0) return
        const first = focusables[0]
        const last = focusables[focusables.length - 1]
        const active = document.activeElement as HTMLElement
        if (!e.shiftKey && active === last) {
          e.preventDefault()
          first.focus()
        } else if (e.shiftKey && active === first) {
          e.preventDefault()
          last.focus()
        }
      }
    }

    const onPointerDown = (e: MouseEvent) => {
      const menuEl = menuContainerRef.current
      if (!menuEl) return
      if (!menuEl.contains(e.target as Node)) {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('mousedown', onPointerDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('mousedown', onPointerDown)
    }
  }, [isMenuOpen])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="relative">
        <div className="absolute inset-0 backdrop-blur-md bg-black/30 border-b border-white/10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <button
                onClick={() => handleNavClick('#home')}
                className="text-xl font-bold text-white hover:text-primary-500 transition-colors"
              >
                {siteConfig.name}
              </button>
            </div>
            {/* Menu Toggle Button - visible on all viewports */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white p-2 rounded-md hover:bg-white/10 transition-colors"
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
              aria-controls="site-menu"
              ref={toggleButtonRef}
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Animated Menu (all viewports) */}
        <div
          id="site-menu"
          ref={menuContainerRef}
          className={`absolute top-full left-0 right-0 ${
            isMenuOpen ? '' : 'pointer-events-none'
          }`}
          aria-hidden={!isMenuOpen}
          role="menu"
        >
          <div ref={menuBackdropRef} className="backdrop-blur-lg bg-black/50 border-b border-white/10">
            <div className="px-4 py-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
              {siteConfig.navigation.map((item) => (
                <button
                  key={item.name}
                  data-menu-item
                  onClick={() => handleNavClick(item.href)}
                  className="text-left px-3 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                  role="menuitem"
                  tabIndex={isMenuOpen ? 0 : -1}
                >
                  {item.name}
                </button>
              ))}
              <div data-menu-item role="none">
                <Button
                  onClick={() => handleNavClick('#contact')}
                  variant="primary"
                  size="sm"
                  className="w-full"
                  tabIndex={isMenuOpen ? 0 : -1}
                >
                  Contact
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

