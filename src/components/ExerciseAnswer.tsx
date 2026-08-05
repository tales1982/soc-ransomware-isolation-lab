import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useAppSelector } from '../hooks/redux'
import { getVisitorId } from '../hooks/useVisitorId'
import { supabase, type ExerciseFeedback } from '../lib/supabase'
import { evaluateExerciseAnswer } from '../lib/gemini'

const MIN_CHARS = 20

const scoreColor: Record<ExerciseFeedback['scoreLabel'], string> = {
  Excellent: 'border-brand-green/40 bg-brand-green/10 text-brand-green',
  Good: 'border-brand-cyan/40 bg-brand-cyan/10 text-brand-cyan',
  'Needs Work': 'border-brand-orange/40 bg-brand-orange/10 text-brand-orange',
  Incomplete: 'border-brand-red/40 bg-brand-red/10 text-brand-red',
}

interface ExerciseAnswerProps {
  exerciseId: string
  title: string
  text: string
  mitre?: string[]
  tools?: string[]
}

export default function ExerciseAnswer({ exerciseId, title, text, mitre, tools }: ExerciseAnswerProps) {
  const { t } = useTranslation('common')
  const lang = useAppSelector((s) => s.ui.lang)

  const [open, setOpen] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const [answer, setAnswer] = useState('')
  const [feedback, setFeedback] = useState<ExerciseFeedback | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!open || loaded) return
    let cancelled = false
    ;(async () => {
      const visitorId = getVisitorId()
      const { data } = await supabase
        .from('soc_lab_exercise_submissions')
        .select('submission, ai_feedback')
        .eq('visitor_id', visitorId)
        .eq('exercise_id', exerciseId)
        .maybeSingle()
      if (cancelled) return
      if (data) {
        setAnswer(data.submission)
        if (data.ai_feedback) setFeedback(data.ai_feedback as ExerciseFeedback)
      }
      setLoaded(true)
    })()
    return () => { cancelled = true }
  }, [open, loaded, exerciseId])

  async function handleSubmit() {
    setLoading(true)
    setError(null)
    try {
      const fb = await evaluateExerciseAnswer(answer, { title, text, mitre, tools }, lang)
      setFeedback(fb)
      const visitorId = getVisitorId()
      await supabase.from('soc_lab_exercise_submissions').upsert(
        {
          visitor_id: visitorId,
          exercise_id: exerciseId,
          submission: answer,
          ai_feedback: fb,
          score: fb.score,
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'visitor_id,exercise_id' },
      )
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err)
      setError(msg.includes('VITE_GEMINI_API_KEY') ? t('answer.apiKeyMissing') : t('answer.error', { message: msg }))
    } finally {
      setLoading(false)
    }
  }

  const canSubmit = answer.trim().length >= MIN_CHARS && !loading

  return (
    <div className="mt-2 border-t border-border/60 pt-2">
      <button
        onClick={() => setOpen((v) => !v)}
        className="text-xs font-semibold text-accent hover:underline"
      >
        {open ? '▾' : '▸'} {t('answer.cta')}
      </button>

      {open && (
        <div className="mt-2 space-y-2">
          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder={t('answer.placeholder')}
            rows={4}
            className="w-full rounded-lg border border-border bg-bg p-3 text-sm text-fg placeholder:text-fg-muted focus:border-accent focus:outline-none"
          />
          <div className="flex items-center justify-between gap-3">
            <span className="text-[11px] text-fg-muted">
              {answer.trim().length < MIN_CHARS
                ? t('answer.minChars', { count: answer.trim().length, min: MIN_CHARS })
                : ' '}
            </span>
            <button
              onClick={handleSubmit}
              disabled={!canSubmit}
              className="shrink-0 rounded-lg bg-accent px-3 py-1.5 text-xs font-semibold text-bg transition disabled:cursor-not-allowed disabled:opacity-40"
            >
              {loading ? t('answer.submitting') : feedback ? t('answer.resubmit') : t('answer.submit')}
            </button>
          </div>

          {error && (
            <div className="rounded-lg border border-brand-red/40 bg-brand-red/10 p-3 text-xs text-brand-red">
              {error}
            </div>
          )}

          {feedback && (
            <div className="space-y-3 rounded-lg border border-border bg-bg-elevated p-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-fg-muted">{t('answer.feedbackTitle')}</span>
                <span className={`rounded-full border px-2.5 py-0.5 text-[11px] font-bold ${scoreColor[feedback.scoreLabel]}`}>
                  {feedback.score}/10 — {t(`answer.scoreLabels.${feedback.scoreLabel}`)}
                </span>
              </div>

              {feedback.strengths.length > 0 && (
                <div>
                  <div className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-brand-green">{t('answer.strengths')}</div>
                  <ul className="space-y-0.5 text-xs text-fg-muted">
                    {feedback.strengths.map((s) => <li key={s.slice(0, 24)}>• {s}</li>)}
                  </ul>
                </div>
              )}

              {feedback.improvements.length > 0 && (
                <div>
                  <div className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-brand-orange">{t('answer.improvements')}</div>
                  <ul className="space-y-0.5 text-xs text-fg-muted">
                    {feedback.improvements.map((s) => <li key={s.slice(0, 24)}>• {s}</li>)}
                  </ul>
                </div>
              )}

              {feedback.missedConcepts.length > 0 && (
                <div>
                  <div className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-fg-muted">{t('answer.missedConcepts')}</div>
                  <div className="flex flex-wrap gap-1.5">
                    {feedback.missedConcepts.map((c) => (
                      <span key={c.slice(0, 24)} className="rounded border border-border bg-bg px-2 py-0.5 text-[10px] text-fg-muted">{c}</span>
                    ))}
                  </div>
                </div>
              )}

              <div className="border-t border-border pt-2 text-xs text-fg-muted">
                <span className="mr-1 font-semibold text-fg">{t('answer.summary')}:</span>
                {feedback.summary}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
