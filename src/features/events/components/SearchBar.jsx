/**
 * SearchBar
 *
 * @param {string}   value
 * @param {function} onChange  - (value: string) => void
 * @param {string}   [placeholder]
 */
export default function SearchBar({
    value,
    onChange,
    placeholder = '공연명, 아티스트, 장소 검색…',
    }) {
    return (
        <div
        style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--r-lg)',
            padding: '10px 16px',
            margin: '28px 48px',
            transition: 'border-color var(--transition-base)',
        }}
        onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--accent)')}
        onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--border)')}
        >
        <span style={{ color: 'var(--muted)', fontSize: '1rem', lineHeight: 1 }}>🔍</span>
        <input
            value={value}
            onChange={(e) => onChange?.(e.target.value)}
            placeholder={placeholder}
            style={{
            flex: 1,
            background: 'transparent',
            border: 'none',
            outline: 'none',
            color: 'var(--text)',
            fontSize: 'var(--text-base)',
            }}
        />
        {value && (
            <button
            onClick={() => onChange?.('')}
            style={{
                background: 'none',
                border: 'none',
                color: 'var(--muted)',
                cursor: 'pointer',
                fontSize: '1rem',
                lineHeight: 1,
                padding: 0,
            }}
            >
            ✕
            </button>
        )}
        </div>
    );
}