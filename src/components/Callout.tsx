import type { ReactNode } from 'react'

const variantStyles = {
  info: 'border-brand-cyan/40 bg-brand-cyan/10 text-fg',
  warning: 'border-brand-orange/40 bg-brand-orange/10 text-fg',
  danger: 'border-brand-red/40 bg-brand-red/10 text-fg',
  tip: 'border-brand-green/40 bg-brand-green/10 text-fg',
}

const variantIcon: Record<string, string> = {
  info: 'i',
  warning: '!',
  danger: '!!',
  tip: '✓',
}

const variantIconStyles = {
  info: 'bg-brand-cyan text-bg',
  warning: 'bg-brand-orange text-bg',
  danger: 'bg-brand-red text-bg',
  tip: 'bg-brand-green text-bg',
}

export default function Callout({
  variant,
  title,
  children,
}: {
  variant: 'info' | 'warning' | 'danger' | 'tip'
  title?: string
  children: ReactNode
}) {
  return (
    <div className={`my-5 flex gap-3 rounded-lg border px-4 py-3.5 ${variantStyles[variant]}`}>
      <div
        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] font-bold ${variantIconStyles[variant]}`}
      >
        {variantIcon[variant]}
      </div>
      <div className="text-sm leading-relaxed">
        {title && <div className="mb-1 font-semibold text-fg">{title}</div>}
        <div className="text-fg-muted">{children}</div>
      </div>
    </div>
  )
}
