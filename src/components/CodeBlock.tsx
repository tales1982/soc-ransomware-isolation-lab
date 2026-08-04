import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function CodeBlock({ code, lang }: { code: string; lang?: string }) {
  const { t } = useTranslation('common')
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      // clipboard unavailable, ignore
    }
  }

  return (
    <div className="group relative my-4 overflow-hidden rounded-lg border border-border bg-bg-elevated">
      {lang && (
        <div className="border-b border-border px-4 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-fg-muted">
          {lang}
        </div>
      )}
      <button
        onClick={handleCopy}
        className="absolute right-2 top-2 rounded-md border border-border bg-bg px-2 py-1 text-[11px] font-medium text-fg-muted opacity-0 transition group-hover:opacity-100 hover:text-accent"
      >
        {copied ? t('actions.copied') : t('actions.copy')}
      </button>
      <pre className="overflow-x-auto p-4 text-[13px] leading-relaxed">
        <code className="text-fg">{code}</code>
      </pre>
    </div>
  )
}
