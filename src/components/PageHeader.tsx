export default function PageHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-10">
      <h1 className="text-3xl font-extrabold tracking-tight text-fg md:text-4xl">{title}</h1>
      {subtitle && <p className="mt-3 max-w-2xl text-lg text-fg-muted">{subtitle}</p>}
    </div>
  )
}
