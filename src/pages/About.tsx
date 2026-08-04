import { useTranslation } from 'react-i18next'
import PageHeader from '../components/PageHeader'

interface RoadmapWeek { week: string; focus: string }
interface PitchPart { part: string; text: string }

export default function About() {
  const { t } = useTranslation('about')
  const projectParagraphs = t('project.paragraphs', { returnObjects: true }) as string[]
  const roadmap = t('approach.roadmap', { returnObjects: true }) as RoadmapWeek[]
  const pitch = t('approach.pitch', { returnObjects: true }) as PitchPart[]

  return (
    <div>
      <PageHeader title={t('title')} />

      <section className="mb-14 rounded-xl border border-border bg-bg-alt p-6">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-accent/15 text-2xl font-extrabold text-accent">
            {(t('me.name') as string).charAt(0)}
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-fg">{t('me.name')}</h2>
            <p className="text-sm text-fg-muted">{t('me.tagline')}</p>
          </div>
        </div>
        <p className="mt-4 text-sm italic leading-relaxed text-fg-muted">{t('me.bioPlaceholder')}</p>
        <p className="mt-2 text-sm italic leading-relaxed text-fg-muted">{t('me.contactNote')}</p>
        <p className="mt-4 text-xs text-fg-muted/70">{t('me.editHint')}</p>
      </section>

      <section className="mb-14">
        <h2 className="mb-4 text-2xl font-extrabold text-fg">{t('project.title')}</h2>
        <div className="space-y-4">
          {projectParagraphs.map((p) => (
            <p key={p.slice(0, 24)} className="leading-relaxed text-fg-muted">
              {p}
            </p>
          ))}
        </div>
      </section>

      <section className="mb-14">
        <h2 className="mb-2 text-2xl font-extrabold text-fg">{t('approach.title')}</h2>
        <p className="mb-5 text-fg-muted">{t('approach.intro')}</p>
        <div className="relative space-y-0 border-l-2 border-border pl-6">
          {roadmap.map((w) => (
            <div key={w.week} className="relative pb-5 last:pb-0">
              <div className="absolute -left-[27px] h-3 w-3 rounded-full border-2 border-accent bg-bg" />
              <div className="text-xs font-bold uppercase tracking-wide text-accent">{w.week}</div>
              <div className="text-sm text-fg-muted">{w.focus}</div>
            </div>
          ))}
        </div>
        <p className="mt-6 text-sm italic text-fg-muted">{t('approach.rhythm')}</p>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-extrabold text-fg">{t('approach.pitchTitle')}</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {pitch.map((p) => (
            <div key={p.part} className="rounded-lg border border-border bg-bg-alt p-4">
              <div className="font-semibold text-accent">{p.part}</div>
              <p className="mt-1.5 text-sm leading-relaxed text-fg-muted">{p.text}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
