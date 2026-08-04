import type { ContentBlock } from '../types/content'
import CodeBlock from './CodeBlock'
import Callout from './Callout'

export default function ContentRenderer({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <div className="prose-content">
      {blocks.map((block, i) => {
        switch (block.type) {
          case 'p':
            return <p key={i}>{block.text}</p>
          case 'h3':
            return <h3 key={i}>{block.text}</h3>
          case 'ul':
            return (
              <ul key={i} className="list-disc">
                {block.items.map((item, j) => (
                  <li key={j}>{item}</li>
                ))}
              </ul>
            )
          case 'ol':
            return (
              <ol key={i} className="list-decimal">
                {block.items.map((item, j) => (
                  <li key={j}>{item}</li>
                ))}
              </ol>
            )
          case 'code':
            return <CodeBlock key={i} code={block.code} lang={block.lang} />
          case 'callout':
            return (
              <Callout key={i} variant={block.variant} title={block.title}>
                {block.text}
              </Callout>
            )
          case 'table':
            return (
              <div key={i} className="my-5 overflow-x-auto rounded-lg border border-border">
                <table className="w-full min-w-[500px] border-collapse text-sm">
                  <thead>
                    <tr className="bg-bg-elevated">
                      {block.headers.map((h, j) => (
                        <th key={j} className="border-b border-border px-4 py-2.5 text-left font-semibold text-fg">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {block.rows.map((row, j) => (
                      <tr key={j} className="border-b border-border last:border-b-0">
                        {row.map((cell, k) => (
                          <td key={k} className="px-4 py-2.5 align-top text-fg-muted">
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )
          case 'stats':
            return (
              <div key={i} className="my-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {block.items.map((s, j) => (
                  <div key={j} className="rounded-lg border border-border bg-bg-elevated p-3 text-center">
                    <div className="text-xl font-extrabold text-accent">{s.value}</div>
                    <div className="text-xs text-fg-muted">{s.label}</div>
                  </div>
                ))}
              </div>
            )
          default:
            return null
        }
      })}
    </div>
  )
}
