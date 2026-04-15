import { GENRE_OPTIONS, REGION_OPTIONS, STATUS_OPTIONS } from '../../../constants/eventConfig';

/**
 * FilterSidebar  — 장르 / 지역 / 상태 / 가격 필터
 *
 * @param {{ [key: string]: boolean }} checked  - 체크 상태 맵
 * @param {function} onToggle                   - (key: string) => void
 * @param {{ min: string, max: string }} price  - 가격 범위
 * @param {function} onPriceChange              - ({ min, max }) => void
 */
export default function FilterSidebar({ checked = {}, onToggle, price = { min: '', max: '' }, onPriceChange }) {
    const groups = [
        { title: '장르', items: GENRE_OPTIONS.filter((g) => g !== '전체') },
        { title: '지역', items: REGION_OPTIONS },
        { title: '상태', items: STATUS_OPTIONS },
    ];

    return (
        <aside
        style={{
            background: 'var(--surface)',
            borderRight: '1px solid var(--border)',
            padding: '28px 20px',
            overflowY: 'auto',
            height: '100%',
        }}
        >
        {groups.map((group) => (
            <div key={group.title}>
            <h3
                style={{
                fontSize: '0.7rem',
                fontWeight: 700,
                color: 'var(--muted)',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                marginBottom: 12,
                marginTop: 24,
                }}
            >
                {group.title}
            </h3>

            {group.items.map((item) => {
                const isChecked = !!checked[item];
                return (
                <div
                    key={item}
                    onClick={() => onToggle?.(item)}
                    style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 9,
                    padding: '7px 4px',
                    cursor: 'pointer',
                    borderRadius: 'var(--r-sm)',
                    fontSize: 'var(--text-base)',
                    color: isChecked ? 'var(--text)' : 'var(--muted)',
                    transition: 'color var(--transition-fast)',
                    userSelect: 'none',
                    }}
                    onMouseEnter={(e) => {
                    if (!isChecked) e.currentTarget.style.color = 'var(--text)';
                    }}
                    onMouseLeave={(e) => {
                    if (!isChecked) e.currentTarget.style.color = 'var(--muted)';
                    }}
                >
                    {/* Checkbox */}
                    <div
                    style={{
                        width: 16,
                        height: 16,
                        border: `1.5px solid ${isChecked ? 'var(--accent)' : 'var(--border)'}`,
                        borderRadius: 4,
                        flexShrink: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.65rem',
                        background: isChecked ? 'var(--accent)' : 'transparent',
                        color: '#0e0e12',
                        transition: 'all var(--transition-fast)',
                    }}
                    >
                    {isChecked && '✓'}
                    </div>
                    {item}
                </div>
                );
            })}
            </div>
        ))}

        {/* Price range */}
        <h3
            style={{
            fontSize: '0.7rem',
            fontWeight: 700,
            color: 'var(--muted)',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            marginBottom: 12,
            marginTop: 24,
            }}
        >
            가격대
        </h3>
        <div style={{ display: 'flex', gap: 8 }}>
            {['min', 'max'].map((key) => (
            <input
                key={key}
                placeholder={key === 'min' ? '최소' : '최대'}
                value={price[key]}
                onChange={(e) => onPriceChange?.({ ...price, [key]: e.target.value })}
                style={{
                flex: 1,
                padding: '8px 10px',
                background: 'var(--surface2)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--r-sm)',
                color: 'var(--text)',
                fontSize: 'var(--text-sm)',
                outline: 'none',
                }}
                onFocus={(e) => (e.target.style.borderColor = 'var(--accent)')}
                onBlur={(e) => (e.target.style.borderColor = 'var(--border)')}
            />
            ))}
        </div>
        </aside>
    );
}