import { SEO } from '@/components/SEO'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { profile } from '@/config/profile.config'
import { education } from '@/config/education.config'
import { skills } from '@/config/skills.config'

export function AboutPage() {
  return (
    <>
      <SEO title="About" description={profile.overview} image={profile.headshot} />
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-3 gap-10 items-start">
          <Card glass>
            <div className="flex flex-col items-center text-center">
              <img
                src={profile.headshot}
                alt="Portrait of Duke Schnepf"
                className="w-40 h-40 rounded-full object-cover mb-4"
              />
              <h1 className="text-3xl font-bold">{profile.name}</h1>
              <p className="text-gray-400">{profile.title}</p>
              <div className="mt-4 text-gray-300 text-sm space-y-1">
                <div>{profile.location}</div>
                <div>
                  <a href={`mailto:${profile.email}`} className="underline">{profile.email}</a>
                </div>
                <div>
                  <a href={profile.linkedin} className="underline" target="_blank" rel="noreferrer">LinkedIn</a>
                </div>
              </div>
            </div>
          </Card>

          <div className="lg:col-span-2 space-y-8">
            <Card glass>
              <h2 className="text-2xl font-bold mb-3">Professional Overview</h2>
              <p className="text-gray-300">{profile.overview}</p>
            </Card>

            <Card glass>
              <h2 className="text-2xl font-bold mb-3">Professional Philosophy</h2>
              <p className="text-gray-300">{profile.philosophy}</p>
            </Card>

            <Card glass>
              <h2 className="text-2xl font-bold mb-4">Education</h2>
              <div className="space-y-4">
                {education.map((e) => (
                  <div key={e.school} className="border-b border-white/10 pb-4 last:border-0">
                    <div className="font-semibold">{e.school}</div>
                    <div className="text-gray-400 text-sm">{e.credential} • {e.start} – {e.end}</div>
                    {e.details && <p className="text-gray-300 mt-2">{e.details}</p>}
                  </div>
                ))}
              </div>
            </Card>

            <Card glass>
              <h2 className="text-2xl font-bold mb-4">Core Skills</h2>
              <div className="flex flex-wrap gap-2">
                {skills.technical.map((s) => (
                  <Badge key={s} variant="primary">{s}</Badge>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </section>
    </>
  )
}


