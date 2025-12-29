import { SEO } from '@/components/layout/SEO'
import { Card } from '@/components/common/Card'
import { experience } from '@/config/experience.config'
import { profile } from '@/config/profile.config'

export function ExperiencePage() {
  return (
    <>
      <SEO title="Experience" description={`${profile.name} — Professional experience`} image={profile.headshot} />
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Experience</h1>
        <div className="space-y-6">
          {experience.map((item) => (
            <Card key={`${item.company}-${item.role}`} glass>
              <div className="md:flex md:items-start md:justify-between">
                <div>
                  <h2 className="text-xl font-semibold">{item.role}</h2>
                  <div className="text-gray-400">{item.company}</div>
                </div>
                <div className="text-gray-400 mt-2 md:mt-0">{item.start} – {item.end}</div>
              </div>
              <ul className="list-disc list-inside mt-4 text-gray-300 space-y-1">
                {item.bullets.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </section>
    </>
  )
}


