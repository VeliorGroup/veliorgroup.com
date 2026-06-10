// Server component: renders a JSON-LD <script> block.
// "<" is escaped to < so payload content can never close the script tag
// (script-tag breakout), regardless of what ends up in the data object.
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
