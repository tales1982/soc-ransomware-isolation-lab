import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader'

interface CoreItem {
  id: string
  name: string
  tagline: string
  description: string
  hasDeepDive?: boolean
  deepDiveLabel?: string
}
interface SupportItem { name: string; description: string }

export default function Technologies() {
  const { t } = useTranslation('tech')
  const core = t('core.items', { returnObjects: true }) as CoreItem[]
  const supporting = t('supporting.items', { returnObjects: true }) as SupportItem[]

  return (
    <div>
      <PageHeader title={t('title')} subtitle={t('subtitle')} />

      <section className="mb-14">
        <h2 className="mb-5 text-2xl font-extrabold text-fg">{t('core.title')}</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {core.map((item) => (
            <div key={item.id} className="flex flex-col rounded-xl border border-border bg-bg-alt p-5">
              <div className="text-lg font-extrabold text-fg">{item.name}</div>
              <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-accent">{item.tagline}</div>
              <p className="flex-1 text-sm leading-relaxed text-fg-muted">{item.description}</p>
              {item.hasDeepDive && (
                <Link
                  to={`/${item.id}`}
                  className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-accent hover:underline"
                >
                  {item.deepDiveLabel || t('core.title')} →
                </Link>
              )}
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-5 text-2xl font-extrabold text-fg">{t('supporting.title')}</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {supporting.map((item, i) => (
            <div key={i} className="rounded-lg border border-border bg-bg-elevated p-4">
              <div className="font-semibold text-fg">{item.name}</div>
              <p className="mt-1 text-sm leading-relaxed text-fg-muted">{item.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
