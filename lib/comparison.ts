/**
 * Shape of the side-by-side table rendered by `ComparisonTable` (components/service.tsx).
 * Lives in lib rather than beside the component so the content files can type against it
 * without importing a React module.
 */

/**
 * One column of a comparison. A bare string is the service pages' original shape; the object
 * form lets a condition page link a column to the sibling page that covers it in full, which
 * is how the neck and headache tables carry their internal links.
 */
export type ComparisonColumn = string | { label: string; href?: string }

/**
 * A comparison row. `{ a, b }` is the two-column service shape and stays valid so the service
 * data in three locales did not have to be rewritten; `{ cells }` takes one string per column.
 */
export type ComparisonRow =
  | { label: string; a: string; b: string }
  | { label: string; cells: readonly string[] }

export type ComparisonData = {
  heading: string
  intro: string
  columns: readonly ComparisonColumn[]
  rows: readonly ComparisonRow[]
  note: string
}
