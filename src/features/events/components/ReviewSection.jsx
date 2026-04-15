/**
 * ReviewSection
 *
 * @param {{ name, stars, date, text }[]} reviews
 */
export default function ReviewSection({ reviews = [] }) {
  return (
    <div>
      {reviews.map((r, i) => (
        <div
          key={i}
          style={{
            background: 'var(--surface2)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--r-md)',
            padding: 14,
            marginBottom: 10,
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 8,
            }}
          >
            <span style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>{r.name}</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ color: 'var(--accent)', fontSize: 'var(--text-xs)' }}>
                {'★'.repeat(r.stars)}{'☆'.repeat(5 - r.stars)}
              </span>
              <span style={{ fontSize: 'var(--text-xs)', color: 'var(--muted)' }}> · {r.date}</span>
            </div>
          </div>
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--muted)', lineHeight: 1.6 }}>
            {r.text}
          </p>
        </div>
      ))}
    </div>
  );
}