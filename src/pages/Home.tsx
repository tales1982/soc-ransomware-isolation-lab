import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

interface Stat { value: string; label: string }
interface Pillar { title: string; text: string }
interface WarStory { title: string; text: string }

export default function Home() {
  const { t } = useTranslation('home')
  const stats = t('stats', { returnObjects: true }) as Stat[]
  const pillars = t('pillars.items', { returnObjects: true }) as Pillar[]
  const warstories = t('warstories.items', { returnObjects: true }) as WarStory[]
  const storyParagraphs = t('story.paragraphs', { returnObjects: true }) as string[]

  return (
    <div>
      <div className="mb-4 inline-block rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
        {t('hero.eyebrow')}
      </div>
      <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-fg md:text-5xl">
        {t('hero.title')} <span className="text-accent">{t('hero.titleHighlight')}</span>
      </h1>
      <p className="mt-5 max-w-2xl text-lg leading-relaxed text-fg-muted">{t('hero.subtitle')}</p>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          to="/installation"
          className="rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-bg transition hover:opacity-90"
        >
          {t('hero.ctaPrimary')}
        </Link>
        <Link
          to="/technologies"
          className="rounded-lg border border-border px-5 py-2.5 text-sm font-semibold text-fg transition hover:border-accent hover:text-accent"
        >
          {t('hero.ctaSecondary')}
        </Link>
      </div>

      <div className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
        {stats.map((s, i) => (
          <div key={i} className="rounded-xl border border-border bg-bg-alt p-4 text-center">
            <div className="text-2xl font-extrabold text-accent md:text-3xl">{s.value}</div>
            <div className="mt-1 text-[11px] leading-tight text-fg-muted">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="mt-16">
        <h2 className="text-xl font-bold text-fg">{t('pillars.title')}</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {pillars.map((p, i) => (
            <div key={i} className="rounded-xl border border-border bg-bg-alt p-5">
              <div className="font-semibold text-accent">{p.title}</div>
              <p className="mt-2 text-sm leading-relaxed text-fg-muted">{p.text}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-16">
        <h2 className="text-xl font-bold text-fg">{t('story.title')}</h2>
        <div className="mt-4 space-y-4">
          {storyParagraphs.map((p, i) => (
            <p key={i} className="leading-relaxed text-fg-muted">
              {p}
            </p>
          ))}
        </div>
      </div>

      <div className="mt-16">
        <h2 className="text-xl font-bold text-fg">{t('warstories.title')}</h2>
        <p className="mt-1 text-sm text-fg-muted">{t('warstories.subtitle')}</p>
        <div className="mt-5 space-y-4">
          {warstories.map((w, i) => (
            <div key={i} className="rounded-xl border border-border bg-bg-alt p-5">
              <div className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-brand-pink" />
                <div>
                  <div className="font-semibold text-fg">{w.title}</div>
                  <p className="mt-1.5 text-sm leading-relaxed text-fg-muted">{w.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
