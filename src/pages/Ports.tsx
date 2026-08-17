import { useTranslation } from 'react-i18next'
import type { ContentBlock } from '../types/content'
import PageHeader from '../components/PageHeader'
import ContentRenderer from '../components/ContentRenderer'
import DeepDiveSection from '../components/DeepDiveSection'

interface Section {
  id: string
  title: string
  blocks: ContentBlock[]
}

export default function Ports() {
  const { t } = useTranslation('ports')
  const intro = t('intro', { returnObjects: true }) as ContentBlock[]
  const sections = t('sections', { returnObjects: true }) as Section[]

  return (
    <div>
      <PageHeader title={t('title')} subtitle={t('subtitle')} />

      <ContentRenderer blocks={intro} />

      <nav className="my-10 flex flex-wrap gap-2 rounded-xl border border-border bg-bg-alt p-4">
        {sections.map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            className="rounded-full border border-border bg-bg-elevated px-3 py-1.5 text-xs font-medium text-fg-muted transition hover:border-accent hover:text-accent"
          >
            {s.title}
          </a>
        ))}
      </nav>

      <div className="space-y-12">
        {sections.map((s) => (
          <DeepDiveSection key={s.id} id={s.id} title={s.title} blocks={s.blocks} />
        ))}
      </div>
    </div>
  )
}
