import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import PageHeader from '../components/PageHeader'
import ContentRenderer from '../components/ContentRenderer'
import CodeBlock from '../components/CodeBlock'
import ExerciseAnswer from '../components/ExerciseAnswer'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { toggleExercise, resetProgress } from '../store/progressSlice'
import type { ContentBlock } from '../types/content'

interface ExerciseItem {
  id: string
  title: string
  difficulty?: 'easy' | 'medium' | 'hard'
  time?: string
  mitre?: string[]
  tools?: string[]
  risk?: 'low' | 'medium' | 'high'
  code?: string
  text: string
}

interface ExerciseSection {
  id: string
  title: string
  kind: 'defensive' | 'offensive' | 'bonus'
  intro?: string
  items: ExerciseItem[]
}

const riskStyle: Record<string, string> = {
  low: 'border-brand-green/40 bg-brand-green/10 text-brand-green',
  medium: 'border-brand-orange/40 bg-brand-orange/10 text-brand-orange',
  high: 'border-brand-red/40 bg-brand-red/10 text-brand-red',
}

const difficultyStyle: Record<string, string> = {
  easy: 'border-brand-green/40 bg-brand-green/10 text-brand-green',
  medium: 'border-brand-orange/40 bg-brand-orange/10 text-brand-orange',
  hard: 'border-brand-red/40 bg-brand-red/10 text-brand-red',
}

const kindStyle: Record<string, string> = {
  defensive: 'text-brand-cyan',
  offensive: 'text-brand-pink',
  bonus: 'text-brand-yellow',
}

function ExerciseCard({ item }: { item: ExerciseItem }) {
  const { t: tc } = useTranslation('common')
  const dispatch = useAppDispatch()
  const done = useAppSelector((s) => !!s.progress.completed[item.id])
  const [showCode, setShowCode] = useState(false)

  return (
    <div className={`rounded-lg border p-4 transition ${done ? 'border-brand-green/40 bg-brand-green/5' : 'border-border bg-bg-alt'}`}>
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          checked={done}
          onChange={() => dispatch(toggleExercise(item.id))}
          className="mt-1 h-4 w-4 shrink-0 cursor-pointer accent-current text-accent"
        />
        <div className="flex-1">
          <div className={`font-semibold ${done ? 'text-fg-muted line-through' : 'text-fg'}`}>{item.title}</div>
          <div className="mt-1.5 flex flex-wrap gap-1.5">
            {item.difficulty && (
              <span className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold ${difficultyStyle[item.difficulty]}`}>
                {tc(`labels.${item.difficulty}`)}
              </span>
            )}
            {item.risk && (
              <span className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold ${riskStyle[item.risk]}`}>
                {tc('labels.risk')}: {tc(`labels.${item.risk}`)}
              </span>
            )}
            {item.time && (
              <span className="rounded-full border border-border bg-bg-elevated px-2 py-0.5 text-[10px] font-medium text-fg-muted">
                ⏱ {item.time}
              </span>
            )}
            {item.mitre?.map((m) => (
              <span key={m} className="rounded-full border border-accent/40 bg-accent/10 px-2 py-0.5 text-[10px] font-mono font-semibold text-accent">
                {m}
              </span>
            ))}
            {item.tools?.map((tool) => (
              <span key={tool} className="rounded-full border border-border bg-bg-elevated px-2 py-0.5 text-[10px] font-medium text-fg-muted">
                {tool}
              </span>
            ))}
          </div>
          <p className="mt-2 text-sm leading-relaxed text-fg-muted">{item.text}</p>
          {item.code && (
            <div className="mt-2">
              <button
                onClick={() => setShowCode((v) => !v)}
                className="text-xs font-semibold text-accent hover:underline"
              >
                {showCode ? '▾' : '▸'} {showCode ? 'hide command' : 'show command'}
              </button>
              {showCode && <CodeBlock code={item.code} />}
            </div>
          )}
          <ExerciseAnswer exerciseId={item.id} title={item.title} text={item.text} mitre={item.mitre} tools={item.tools} />
        </div>
      </div>
    </div>
  )
}

export default function Exercises() {
  const { t } = useTranslation('exercises')
  const intro = t('intro', { returnObjects: true }) as ContentBlock[]
  const sections = t('sections', { returnObjects: true }) as ExerciseSection[]
  const toolSetupCode = t('toolSetup.code')
  const dispatch = useAppDispatch()
  const completed = useAppSelector((s) => s.progress.completed)
  const [kindFilter, setKindFilter] = useState<'all' | 'defensive' | 'offensive' | 'bonus'>('all')

  const allItems = useMemo(() => sections.flatMap((s) => s.items), [sections])
  const doneCount = allItems.filter((it) => completed[it.id]).length
  const total = allItems.length
  const pct = total ? Math.round((doneCount / total) * 100) : 0

  const visibleSections = kindFilter === 'all' ? sections : sections.filter((s) => s.kind === kindFilter)

  return (
    <div>
      <PageHeader title={t('title')} subtitle={t('subtitle')} />
      <ContentRenderer blocks={intro} />

      <div className="my-6 rounded-lg border border-border bg-bg-elevated p-3">
        <div className="text-xs font-semibold text-fg-muted">{t('toolSetup.title')}</div>
        <CodeBlock code={toolSetupCode} />
      </div>

      <div className="sticky top-16 z-20 mb-8 rounded-xl border border-border bg-bg-alt/95 p-4 backdrop-blur">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex-1">
            <div className="mb-1 flex items-center justify-between text-xs font-semibold text-fg-muted">
              <span>{doneCount} / {total}</span>
              <span>{pct}%</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-bg-elevated">
              <div className="h-full rounded-full bg-accent transition-all" style={{ width: `${pct}%` }} />
            </div>
          </div>
          <button
            onClick={() => dispatch(resetProgress())}
            className="rounded-lg border border-border px-3 py-1.5 text-xs font-semibold text-fg-muted hover:border-brand-red hover:text-brand-red"
          >
            ↺ reset
          </button>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {(['all', 'defensive', 'offensive', 'bonus'] as const).map((k) => (
            <button
              key={k}
              onClick={() => setKindFilter(k)}
              className={`rounded-full border px-3 py-1 text-xs font-semibold capitalize transition ${
                kindFilter === k ? 'border-accent bg-accent text-bg' : 'border-border bg-bg-elevated text-fg-muted hover:text-fg'
              }`}
            >
              {k}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-12">
        {visibleSections.map((section) => (
          <section key={section.id}>
            <h2 className={`mb-1 text-xl font-extrabold ${kindStyle[section.kind]}`}>{section.title}</h2>
            {section.intro && <p className="mb-4 text-sm text-fg-muted">{section.intro}</p>}
            <div className="mt-4 space-y-3">
              {section.items.map((item) => (
                <ExerciseCard key={item.id} item={item} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}
