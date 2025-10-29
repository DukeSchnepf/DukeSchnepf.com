import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
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

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  })

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
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">Get In Touch</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Have a project in mind? Let's work together to bring your ideas to life.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Info */}
          <Card glass>
            <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Email</h4>
                <a href={siteConfig.social.email} className="text-primary-500 hover:text-primary-400">
                  {siteConfig.email}
                </a>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Location</h4>
                <p className="text-gray-300">{siteConfig.location}</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Availability</h4>
                <p className="text-gray-300">
                  {siteConfig.available ? 'Available for work' : 'Not currently available'}
                </p>
              </div>
            </div>
          </Card>

          {/* Contact Form */}
          <Card glass>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Honeypot field */}
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
                  rows={5}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-gray-400 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all duration-200"
                  placeholder="Your message..."
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
                <p className="text-green-500 text-center">
                  Message sent successfully! I'll get back to you soon.
                </p>
              )}
              {submitStatus === 'error' && (
                <p className="text-red-500 text-center">
                  Failed to send message. Please try again or contact me via email.
                </p>
              )}
            </form>
          </Card>
        </div>
      </div>
    </section>
  )
}

