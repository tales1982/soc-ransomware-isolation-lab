import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import type { ContentBlock } from '../types/content'
import PageHeader from '../components/PageHeader'
import ContentRenderer from '../components/ContentRenderer'

interface Step { title: string; text: string }
interface Cve {
  id: string
  package: string
  severity: 'critical' | 'high' | 'medium' | 'low'
  status: 'fixed' | 'mitigated' | 'accepted'
  summary: string
}

const severityDot: Record<string, string> = {
  critical: 'bg-brand-red',
  high: 'bg-brand-orange',
  medium: 'bg-brand-yellow',
  low: 'bg-brand-green',
}

const statusStyle: Record<string, string> = {
  fixed: 'border-brand-green/40 bg-brand-green/10 text-brand-green',
  mitigated: 'border-brand-orange/40 bg-brand-orange/10 text-brand-orange',
  accepted: 'border-brand-cyan/40 bg-brand-cyan/10 text-brand-cyan',
}

export default function Vulnerabilities() {
  const { t } = useTranslation('cve')
  const { t: tc } = useTranslation('common')
  const intro = t('intro', { returnObjects: true }) as ContentBlock[]
  const steps = t('methodology.steps', { returnObjects: true }) as Step[]
  const cves = t('cves', { returnObjects: true }) as Cve[]
  const [filter, setFilter] = useState<'all' | 'fixed' | 'mitigated' | 'accepted'>('all')

  const filtered = filter === 'all' ? cves : cves.filter((c) => c.status === filter)
  const counts = {
    all: cves.length,
    fixed: cves.filter((c) => c.status === 'fixed').length,
    mitigated: cves.filter((c) => c.status === 'mitigated').length,
    accepted: cves.filter((c) => c.status === 'accepted').length,
  }

  return (
    <div>
      <PageHeader title={t('title')} subtitle={t('subtitle')} />

      <ContentRenderer blocks={intro} />

      <section className="mb-14 mt-10">
        <h2 className="mb-5 text-2xl font-extrabold text-fg">{t('methodology.title')}</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {steps.map((s) => (
            <div key={s.title} className="rounded-lg border border-border bg-bg-alt p-4">
              <div className="font-semibold text-accent">{s.title}</div>
              <p className="mt-1.5 text-sm leading-relaxed text-fg-muted">{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-2xl font-extrabold text-fg">{t('table.title')}</h2>
          <div className="flex flex-wrap gap-2 text-xs font-semibold">
            {(['all', 'fixed', 'mitigated', 'accepted'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`rounded-full border px-3 py-1.5 transition ${
                  filter === f
                    ? 'border-accent bg-accent text-bg'
                    : 'border-border bg-bg-elevated text-fg-muted hover:text-fg'
                }`}
              >
                {f === 'all' ? 'All' : tc(`labels.${f}`)} ({counts[f]})
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          {filtered.map((cve) => (
            <div key={cve.id} className="rounded-lg border border-border bg-bg-alt p-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-sm font-bold text-fg">{cve.id}</span>
                <span className="rounded-md bg-bg-elevated px-2 py-0.5 text-xs text-fg-muted">{cve.package}</span>
                <span className="flex items-center gap-1.5 text-xs text-fg-muted">
                  <span className={`h-2 w-2 rounded-full ${severityDot[cve.severity]}`} />
                  {tc(`labels.${cve.severity}`)}
                </span>
                <span className={`ml-auto rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${statusStyle[cve.status]}`}>
                  {tc(`labels.${cve.status}`)}
                </span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-fg-muted">{cve.summary}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
