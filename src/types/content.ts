export type ContentBlock =
  | { type: 'p'; text: string }
  | { type: 'h3'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'ol'; items: string[] }
  | { type: 'code'; lang?: string; code: string }
  | { type: 'callout'; variant: 'info' | 'warning' | 'danger' | 'tip'; title?: string; text: string }
  | { type: 'table'; headers: string[]; rows: string[][] }
  | { type: 'stats'; items: { label: string; value: string }[] }
