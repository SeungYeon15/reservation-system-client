/**
 * Chip  — 선택 가능한 필터 칩
 * @param {string}   label
 * @param {boolean}  active
 * @param {function} onClick
 */
export default function Chip({ label, active = false, onClick, style: extraStyle = {} }) {
    return (
        <button
            onClick={onClick}
            style={{
                padding: '6px 16px',
                borderRadius: 'var(--r-full)',
                border: `1px solid ${active ? 'var(--accent)' : 'var(--border)'}`,
                background: active ? 'var(--accent)' : 'transparent',
                color: active ? '#0e0e12' : 'var(--muted)',
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-sm)',
                fontWeight: 500,
                cursor: 'pointer',
                transition: 'all var(--transition-base)',
                whiteSpace: 'nowrap',
                ...extraStyle,
            }}
            onMouseEnter={(e) => {
                if (active) return;
                e.currentTarget.style.borderColor = 'var(--accent)';
                e.currentTarget.style.color = 'var(--text)';
            }}
            onMouseLeave={(e) => {
                if (active) return;
                e.currentTarget.style.borderColor = 'var(--border)';
                e.currentTarget.style.color = 'var(--muted)';
            }}
            >
            {label}
        </button>
    );
}