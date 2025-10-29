import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { useScrollPosition } from '@/hooks/useScrollPosition'
import { siteConfig } from '@/config/site.config'
import { smoothScrollTo } from '@/utils/helpers'
import { Button } from '@/components/ui/Button'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const lastScroll = useScrollPosition()
  const isMobile = useMediaQuery('(max-width: 768px)')
  const progressRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const currentScroll = window.pageYOffset
    setIsVisible(currentScroll < lastScroll || currentScroll < 100)
  }, [lastScroll])

  const handleNavClick = (href: string) => {
    const sectionId = href.replace('#', '')
    smoothScrollTo(sectionId)
    setIsMenuOpen(false)
  }

  useEffect(() => {
    if (isMenuOpen) {
      gsap.from('.mobile-menu', {
        x: 300,
        opacity: 0,
        duration: 0.3,
        ease: 'power2.out',
      })
    }
  }, [isMenuOpen])

  useEffect(() => {
    if (!progressRef.current) return

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        start: 0,
        end: () => document.documentElement.scrollHeight - window.innerHeight,
        onUpdate: (self) => {
          gsap.to(progressRef.current, {
            width: `${Math.min(100, Math.max(0, self.progress * 100))}%`,
            duration: 0.2,
            ease: 'power1.out',
            overwrite: 'auto',
          })
        },
      })
    })

    return () => ctx.revert()
  }, [])

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

            {/* Desktop Navigation */}
            {!isMobile && (
              <div className="hidden md:flex md:items-center md:space-x-4">
                {siteConfig.navigation.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => handleNavClick(item.href)}
                    className="px-3 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors"
                  >
                    {item.name}
                  </button>
                ))}
                <Link to="/experience" className="px-3 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors">Experience</Link>
                <Link to="/skills" className="px-3 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors">Skills</Link>
                <Link to="/resume" className="px-3 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors">Resume</Link>
                <Button
                  onClick={() => handleNavClick('#contact')}
                  variant="primary"
                  size="sm"
                >
                  Contact
                </Button>
              </div>
            )}

            {/* Mobile Menu Button */}
            {isMobile && (
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden text-white p-2"
                aria-label="Toggle menu"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {isMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobile && (
          <div
            className={`mobile-menu md:hidden absolute top-full left-0 right-0 backdrop-blur-lg bg-black/50 border-b border-white/10 ${
              isMenuOpen ? 'block' : 'hidden'
            }`}
          >
            <div className="px-4 py-4 space-y-2">
              {siteConfig.navigation.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.href)}
                  className="block w-full text-left px-3 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                >
                  {item.name}
                </button>
              ))}
              <Link to="/experience" className="block px-3 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors" onClick={() => setIsMenuOpen(false)}>Experience</Link>
              <Link to="/skills" className="block px-3 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors" onClick={() => setIsMenuOpen(false)}>Skills</Link>
              <Link to="/resume" className="block px-3 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors" onClick={() => setIsMenuOpen(false)}>Resume</Link>
              <Button
                onClick={() => handleNavClick('#contact')}
                variant="primary"
                size="sm"
                className="w-full"
              >
                Contact
              </Button>
            </div>
          </div>
        )}
        <div className="absolute inset-x-0 bottom-0 h-1 bg-white/5 overflow-hidden">
          <div
            ref={progressRef}
            className="h-full w-0 bg-gradient-to-r from-primary-500 via-secondary-500 to-primary-500"
          />
        </div>
      </div>
    </nav>
  )
}

