import { ReactNode, useEffect, useRef, useCallback } from 'react'
import gsap from 'gsap'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
  title?: string
}

export function Modal({ isOpen, onClose, children, title }: ModalProps) {
  const backdropRef = useRef<HTMLDivElement>(null)
  const modalRef = useRef<HTMLDivElement>(null)
  const isAnimatingRef = useRef(false)
  const shouldRenderRef = useRef(isOpen)

  useEffect(() => {
    if (isOpen) {
      shouldRenderRef.current = true
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [onClose])

  // Handle animations
  useEffect(() => {
    const backdrop = backdropRef.current
    const modal = modalRef.current

    if (!backdrop || !modal) return

    if (isOpen) {
      // Enter animation
      isAnimatingRef.current = true
      gsap.set(backdrop, { opacity: 0 })
      gsap.set(modal, { opacity: 0, scale: 0.95, y: 20 })

      gsap.to(backdrop, {
        opacity: 1,
        duration: 0.2,
        ease: 'power2.out',
      })

      gsap.to(modal, {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.3,
        ease: 'power2.out',
        onComplete: () => {
          isAnimatingRef.current = false
        },
      })
    }
  }, [isOpen])

  const handleClose = useCallback(() => {
    const backdrop = backdropRef.current
    const modal = modalRef.current

    if (!backdrop || !modal || isAnimatingRef.current) return

    isAnimatingRef.current = true

    gsap.to(modal, {
      opacity: 0,
      scale: 0.95,
      y: 20,
      duration: 0.2,
      ease: 'power2.in',
    })

    gsap.to(backdrop, {
      opacity: 0,
      duration: 0.2,
      ease: 'power2.in',
      onComplete: () => {
        isAnimatingRef.current = false
        shouldRenderRef.current = false
        onClose()
      },
    })
  }, [onClose])

  // Don't render if closed and not animating
  if (!isOpen && !shouldRenderRef.current) {
    return null
  }

  return (
    <>
      <div
        ref={backdropRef}
        onClick={handleClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
        style={{ opacity: 0 }}
      />
      <div
        ref={modalRef}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{ opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-gray-900 rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-auto border border-white/10">
          {title && (
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">{title}</h2>
              <button
                onClick={handleClose}
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Close modal"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          )}
          {children}
        </div>
      </div>
    </>
  )
}
