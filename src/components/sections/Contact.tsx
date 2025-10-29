import { useLayoutEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Card } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { siteConfig } from '@/config/site.config'
import { sendEmail } from '@/services/api/emailService'

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  honeypot: z.string().optional(),
})

type ContactFormData = z.infer<typeof contactSchema>

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const sectionRef = useRef<HTMLElement>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  })

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.contact-header', {
        opacity: 0,
        y: 28,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.contact-header',
          start: 'top 85%',
        },
      })

      ScrollTrigger.batch('.contact-reveal', {
        start: 'top 85%',
        onEnter: (batch) =>
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out',
            stagger: 0.15,
          }),
        onLeaveBack: (batch) =>
          gsap.to(batch, {
            opacity: 0,
            y: 20,
            overwrite: true,
          }),
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const onSubmit = async (data: ContactFormData) => {
    if (data.honeypot) {
      // Spam detected - honeypot field filled
      return
    }

    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      await sendEmail({
        name: data.name,
        email: data.email,
        message: data.message,
      })
      setSubmitStatus('success')
      reset()
    } catch (error) {
      console.error('Form submission error:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" ref={sectionRef} className="relative py-24 px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-x-0 bottom-0 -z-10 mx-auto h-[520px] max-w-5xl rounded-[3rem] bg-gradient-to-t from-secondary-500/10 via-white/5 to-transparent blur-3xl" />

      <div className="max-w-4xl mx-auto space-y-12">
        <div className="contact-header text-center space-y-4">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.3em] text-gray-300">
            Let&apos;s Collaborate
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold text-white">Get In Touch</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Have a project in mind? Drop a note and I&apos;ll share how we can turn bold ideas into
            shipped outcomes.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <Card className="contact-reveal translate-y-8 opacity-0 border border-white/10 bg-white/5 backdrop-blur">
            <h3 className="text-2xl font-semibold text-white mb-6">Contact Information</h3>
            <div className="space-y-5 text-left">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-secondary-200 mb-2">Email</p>
                <a
                  href={siteConfig.social.email}
                  className="text-lg font-semibold text-white hover:text-primary-200 transition"
                >
                  {siteConfig.email}
                </a>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-secondary-200 mb-2">Location</p>
                <p className="text-gray-300">{siteConfig.location}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-secondary-200 mb-2">Availability</p>
                <p className="text-gray-300">
                  {siteConfig.available ? 'Currently open to new collaborations' : 'Currently booked, reach out for future slots'}
                </p>
              </div>
            </div>
          </Card>

          <Card className="contact-reveal translate-y-8 opacity-0 border border-white/10 bg-white/5 backdrop-blur">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <input
                type="text"
                {...register('honeypot')}
                style={{ display: 'none' }}
                tabIndex={-1}
                autoComplete="off"
              />

              <Input label="Name" {...register('name')} error={errors.name?.message} />
              <Input
                label="Email"
                type="email"
                {...register('email')}
                error={errors.email?.message}
              />
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  {...register('message')}
                  rows={6}
                  className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-gray-400 outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-500/30"
                  placeholder="Tell me about your project, timeline, or team..."
                />
                {errors.message && (
                  <p className="mt-1 text-sm text-red-500">{errors.message.message}</p>
                )}
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                isLoading={isSubmitting}
                className="w-full"
              >
                Send Message
              </Button>

              {submitStatus === 'success' && (
                <p className="rounded-lg border border-green-500/40 bg-green-500/10 px-4 py-3 text-center text-sm text-green-300">
                  Message received! I&apos;ll get back to you shortly.
                </p>
              )}
              {submitStatus === 'error' && (
                <p className="rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-3 text-center text-sm text-red-300">
                  There was a hiccup sending your note. Please retry or email me directly.
                </p>
              )}
            </form>
          </Card>
        </div>
      </div>
    </section>
  )
}

