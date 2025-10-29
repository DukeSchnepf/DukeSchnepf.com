import emailjs from '@emailjs/browser'

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

export interface ContactFormData {
  name: string
  email: string
  message: string
}

export async function sendEmail(data: ContactFormData): Promise<void> {
  if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
    throw new Error('EmailJS configuration is missing. Please check your environment variables.')
  }

  try {
    await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      {
        from_name: data.name,
        from_email: data.email,
        message: data.message,
      },
      PUBLIC_KEY
    )
  } catch (error) {
    console.error('Email service error:', error)
    throw new Error('Failed to send email. Please try again later.')
  }
}

