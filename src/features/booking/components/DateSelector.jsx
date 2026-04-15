import { EVENT_DATES } from '../../../constants/eventConfig';

/**
 * DateSelector  — 날짜 / 회차 선택 UI
 *
 * @param {number}   selectedIndex  - 선택된 날짜 인덱스
 * @param {function} onChange       - (index: number) => void
 * @param {{ label: string, time: string }[]} [dates] - 커스텀 날짜 목록 (기본: EVENT_DATES)
 */
export default function DateSelector({ selectedIndex, onChange, dates = EVENT_DATES }) {
    return (
        <div>
        <div
            style={{
            fontSize: 'var(--text-sm)',
            color: 'var(--muted)',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            marginBottom: 8,
            }}
        >
            날짜 선택
        </div>

        <div
            style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 8,
            marginBottom: 16,
            }}
        >
            {dates.map((d, i) => {
            const isSelected = selectedIndex === i;
            return (
                <div
                key={i}
                onClick={() => onChange?.(i)}
                style={{
                    padding: 10,
                    borderRadius: 'var(--r-sm)',
                    cursor: 'pointer',
                    textAlign: 'center',
                    fontSize: 'var(--text-sm)',
                    background: isSelected ? 'rgba(232,200,122,0.08)' : 'var(--surface2)',
                    border: `1px solid ${isSelected ? 'var(--accent)' : 'var(--border)'}`,
                    color: isSelected ? 'var(--accent)' : 'var(--text)',
                    transition: 'all var(--transition-fast)',
                    userSelect: 'none',
                }}
                onMouseEnter={(e) => {
                    if (!isSelected) e.currentTarget.style.borderColor = 'var(--accent)';
                }}
                onMouseLeave={(e) => {
                    if (!isSelected) e.currentTarget.style.borderColor = 'var(--border)';
                }}
                >
                {d.label}
                <br />
                <small style={{ color: 'var(--muted)', fontSize: 'var(--text-xs)' }}>{d.time}</small>
                </div>
            );
            })}
        </div>
        </div>
    );
}