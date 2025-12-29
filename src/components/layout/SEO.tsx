import { useEffect } from 'react'

interface SEOProps {
  title?: string
  description?: string
  url?: string
  image?: string
}

export function SEO({ title, description, url, image }: SEOProps) {
  useEffect(() => {
    document.title = title ? `${title} | Portfolio` : 'Portfolio'

    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute('content', description || '')
    } else {
      const meta = document.createElement('meta')
      meta.name = 'description'
      meta.content = description || ''
      document.head.appendChild(meta)
    }

    // Update Open Graph tags
    const ogTitle = document.querySelector('meta[property="og:title"]')
    if (ogTitle) {
      ogTitle.setAttribute('content', title || 'Portfolio')
    } else {
      const meta = document.createElement('meta')
      meta.setAttribute('property', 'og:title')
      meta.content = title || 'Portfolio'
      document.head.appendChild(meta)
    }

    const ogDescription = document.querySelector('meta[property="og:description"]')
    if (ogDescription) {
      ogDescription.setAttribute('content', description || '')
    } else {
      const meta = document.createElement('meta')
      meta.setAttribute('property', 'og:description')
      meta.content = description || ''
      document.head.appendChild(meta)
    }

    if (url) {
      const ogUrl = document.querySelector('meta[property="og:url"]')
      if (ogUrl) {
        ogUrl.setAttribute('content', url)
      } else {
        const meta = document.createElement('meta')
        meta.setAttribute('property', 'og:url')
        meta.content = url
        document.head.appendChild(meta)
      }
    }

    if (image) {
      const ogImage = document.querySelector('meta[property="og:image"]')
      if (ogImage) {
        ogImage.setAttribute('content', image)
      } else {
        const meta = document.createElement('meta')
        meta.setAttribute('property', 'og:image')
        meta.content = image
        document.head.appendChild(meta)
      }
    }
  }, [title, description, url, image])

  return null
}

