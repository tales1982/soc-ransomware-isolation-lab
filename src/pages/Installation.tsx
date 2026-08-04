import { useTranslation } from 'react-i18next'
import PageHeader from '../components/PageHeader'

interface Spec { label: string; value: string }
interface Step { title: string; text: string }
interface Phase { phase: string; title: string; note: string }

export default function Installation() {
  const { t } = useTranslation('install')
  const specs = t('hardware.specs', { returnObjects: true }) as Spec[]
  const partitioningItems = t('hardware.partitioning.items', { returnObjects: true }) as string[]
  const networkItems = t('network.items', { returnObjects: true }) as string[]
  const archRows = t('architecture.table.rows', { returnObjects: true }) as string[][]
  const archHeaders = t('architecture.table.headers', { returnObjects: true }) as string[]
  const steps = t('order.steps', { returnObjects: true }) as Step[]
  const phases = t('phases.items', { returnObjects: true }) as Phase[]

  return (
    <div>
      <PageHeader title={t('title')} subtitle={t('subtitle')} />

      <section className="mb-14">
        <h2 className="mb-2 text-2xl font-extrabold text-fg">{t('hardware.title')}</h2>
        <p className="mb-5 text-fg-muted">{t('hardware.intro')}</p>
        <div className="grid gap-3 sm:grid-cols-2">
          {specs.map((s, i) => (
            <div key={i} className="rounded-lg border border-border bg-bg-alt p-4">
              <div className="text-xs font-semibold uppercase tracking-wide text-accent">{s.label}</div>
              <div className="mt-1 text-sm text-fg-muted">{s.value}</div>
            </div>
          ))}
        </div>
        <div className="mt-6 rounded-lg border border-border bg-bg-elevated p-4">
          <div className="mb-2 text-sm font-semibold text-fg">{t('hardware.partitioning.title')}</div>
          <ul className="space-y-1 text-sm text-fg-muted">
            {partitioningItems.map((it, i) => (
              <li key={i}>· {it}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mb-14">
        <h2 className="mb-4 text-2xl font-extrabold text-fg">{t('network.title')}</h2>
        <ul className="space-y-2 text-sm text-fg-muted">
          {networkItems.map((it, i) => (
            <li key={i} className="flex gap-2">
              <span className="text-accent">▹</span> {it}
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-14">
        <h2 className="mb-2 text-2xl font-extrabold text-fg">{t('architecture.title')}</h2>
        <p className="mb-5 text-fg-muted">{t('architecture.intro')}</p>
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full min-w-[700px] border-collapse text-sm">
            <thead>
              <tr className="bg-bg-elevated">
                {archHeaders.map((h, i) => (
                  <th key={i} className="border-b border-border px-4 py-2.5 text-left font-semibold text-fg">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {archRows.map((row, i) => (
                <tr key={i} className="border-b border-border last:border-b-0">
                  {row.map((cell, j) => (
                    <td key={j} className={`px-4 py-2.5 align-top ${j === 0 ? 'font-mono text-xs font-semibold text-accent' : 'text-fg-muted'}`}>
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-14">
        <h2 className="mb-2 text-2xl font-extrabold text-fg">{t('order.title')}</h2>
        <p className="mb-5 text-fg-muted">{t('order.intro')}</p>
        <div className="space-y-4">
          {steps.map((s, i) => (
            <div key={i} className="rounded-lg border border-border bg-bg-alt p-4">
              <div className="font-semibold text-fg">{s.title}</div>
              <p className="mt-1.5 text-sm leading-relaxed text-fg-muted">{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-2 text-2xl font-extrabold text-fg">{t('phases.title')}</h2>
        <p className="mb-5 text-fg-muted">{t('phases.intro')}</p>
        <div className="relative space-y-0 border-l-2 border-border pl-6">
          {phases.map((p, i) => (
            <div key={i} className="relative pb-6 last:pb-0">
              <div className="absolute -left-[31px] flex h-6 w-6 items-center justify-center rounded-full border-2 border-accent bg-bg text-[10px] font-bold text-accent">
                {p.phase}
              </div>
              <div className="font-semibold text-fg">{p.title}</div>
              <p className="mt-1 text-sm leading-relaxed text-fg-muted">{p.note}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
