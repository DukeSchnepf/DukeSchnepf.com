import { highlights } from '@/config/highlights.config'
import { Card } from '@/components/ui/Card'

export function Highlights() {
  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4">
        {highlights.map((h) => (
          <Card key={h.label} glass>
            <div className="text-center">
              <div className="text-3xl font-extrabold text-white">{h.value}</div>
              <div className="text-gray-400 text-sm mt-1">{h.label}</div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  )
}


