/**
 * TicketCounter  — 인원 수 조절
 *
 * @param {number}   value    - 현재 수량
 * @param {function} onChange - (qty: number) => void
 * @param {number}   [min]    - 최솟값 (기본 1)
 * @param {number}   [max]    - 최댓값 (기본 10)
 */
export default function TicketCounter({ value, onChange, min = 1, max = 10 }) {
    const decrement = () => { if (value > min) onChange(value - 1); };
    const increment = () => { if (value < max) onChange(value + 1); };

    const btnStyle = {
        width: 28, height: 28,
        borderRadius: 'var(--r-sm)',
        border: '1px solid var(--border)',
        background: 'var(--surface)',
        color: 'var(--text)',
        fontSize: '1rem',
        cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'border-color var(--transition-fast)',
        flexShrink: 0,
    };

    return (
        <div
        style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'var(--surface2)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--r-sm)',
            padding: '8px 14px',
            marginBottom: 16,
        }}
        >
        <span style={{ fontSize: 'var(--text-base)', color: 'var(--muted)' }}>인원 수</span>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <button
            onClick={decrement}
            disabled={value <= min}
            style={{ ...btnStyle, opacity: value <= min ? 0.4 : 1, cursor: value <= min ? 'not-allowed' : 'pointer' }}
            onMouseEnter={(e) => { if (value > min) e.currentTarget.style.borderColor = 'var(--accent)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; }}
            >
            −
            </button>

            <span style={{ fontWeight: 700, minWidth: 16, textAlign: 'center', fontSize: 'var(--text-md)' }}>
            {value}
            </span>

            <button
            onClick={increment}
            disabled={value >= max}
            style={{ ...btnStyle, opacity: value >= max ? 0.4 : 1, cursor: value >= max ? 'not-allowed' : 'pointer' }}
            onMouseEnter={(e) => { if (value < max) e.currentTarget.style.borderColor = 'var(--accent)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; }}
            >
            +
            </button>
        </div>
        </div>
    );
}