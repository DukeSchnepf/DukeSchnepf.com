import { SEO } from '@/components/layout/SEO'
import { Card } from '@/components/common/Card'
import { Badge } from '@/components/common/Badge'
import { skills } from '@/config/skills.config'
import { profile } from '@/config/profile.config'

export function SkillsPage() {
  return (
    <>
      <SEO title="Skills" description={`${profile.name} — Technical skills and competencies`} image={profile.headshot} />
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-10 text-center">Skills</h1>
        <div className="grid lg:grid-cols-3 gap-8">
          <Card glass>
            <h2 className="text-2xl font-semibold mb-4">Technical</h2>
            <div className="flex flex-wrap gap-2">
              {skills.technical.map((s) => (
                <Badge key={s} variant="primary">{s}</Badge>
              ))}
            </div>
          </Card>
          <Card glass>
            <h2 className="text-2xl font-semibold mb-4">Competencies</h2>
            <ul className="list-disc list-inside text-gray-300 space-y-1">
              {skills.competencies.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </Card>
          <Card glass>
            <h2 className="text-2xl font-semibold mb-4">Languages</h2>
            <ul className="text-gray-300 space-y-1">
              {skills.languages.map((l) => (
                <li key={l.name}>{l.name} — {l.level}</li>
              ))}
            </ul>
          </Card>
        </div>
      </section>
    </>
  )
}


