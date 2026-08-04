import type { ContentBlock } from '../types/content'
import ContentRenderer from './ContentRenderer'

export default function DeepDiveSection({
  id,
  title,
  blocks,
}: {
  id: string
  title: string
  blocks: ContentBlock[]
}) {
  return (
    <section id={id} className="scroll-mt-20 border-t border-border pt-10 first:border-t-0 first:pt-0">
      <h2 className="mb-2 text-2xl font-extrabold tracking-tight text-fg">{title}</h2>
      <ContentRenderer blocks={blocks} />
    </section>
  )
}
