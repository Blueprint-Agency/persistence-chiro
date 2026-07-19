/**
 * Structured data. Next's docs are explicit that JSON-LD goes in a native <script>, not
 * next/script. The `<` escape prevents a string inside the payload from closing the tag.
 */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  )
}
