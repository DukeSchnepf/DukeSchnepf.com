import { SEO } from '@/components/SEO'
import { profile } from '@/config/profile.config'

export function ResumePage() {
  return (
    <>
      <SEO title="Resume" description={`${profile.name} — Resume`} image={profile.headshot} />
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto print:py-0">
        <div className="mb-6 text-center">
          <h1 className="text-4xl font-bold">{profile.name}</h1>
          <p className="text-gray-400">{profile.title}</p>
          <div className="text-gray-400 text-sm mt-2">
            <span>{profile.location}</span> ·{' '}
            <a href={`mailto:${profile.email}`} className="underline">{profile.email}</a> ·{' '}
            <a href={profile.linkedin} className="underline" target="_blank" rel="noreferrer">LinkedIn</a>
          </div>
          <div className="mt-4">
            <a href={profile.resumeUrl} download className="inline-block px-4 py-2 rounded-lg bg-primary-500 text-white hover:bg-primary-600">
              Download PDF
            </a>
          </div>
        </div>
        <div className="bg-white/5 rounded-xl p-6">
          <p className="text-gray-300">
            Printable resume is available as PDF. Use the download button above or press Ctrl/Cmd+P to print.
          </p>
        </div>
      </section>
      <style>{`@media print { body { background: #fff; } .print\:py-0 { padding-top: 0; padding-bottom: 0; } }`}</style>
    </>
  )
}


