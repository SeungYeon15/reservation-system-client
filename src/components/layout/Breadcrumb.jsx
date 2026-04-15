/**
 * Breadcrumb
 * @param {{ label: string, onClick?: function }[]} items
 *
 * @example
 * <Breadcrumb items={[
 *   { label: '목록', onClick: () => setPage('list') },
 *   { label: '레 미제라블', onClick: () => setPage('detail') },
 *   { label: '좌석 선택' },   // 마지막 항목은 onClick 없이 → 강조 표시
 * ]} />
 */
export default function Breadcrumb({ items = [] }) {
    return (
        <div
        style={{
            display: 'flex',
            gap: 8,
            alignItems: 'center',
            fontSize: 'var(--text-sm)',
            color: 'var(--muted)',
            marginBottom: 16,
        }}
        >
        {items.map((item, idx) => {
            const isLast = idx === items.length - 1;
            return (
            <span key={idx} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span
                onClick={item.onClick}
                style={{
                    color: isLast ? 'var(--text)' : 'var(--muted)',
                    cursor: item.onClick ? 'pointer' : 'default',
                    transition: 'color var(--transition-fast)',
                }}
                onMouseEnter={(e) => {
                    if (item.onClick) e.currentTarget.style.color = 'var(--accent)';
                }}
                onMouseLeave={(e) => {
                    if (item.onClick) e.currentTarget.style.color = isLast ? 'var(--text)' : 'var(--muted)';
                }}
                >
                {item.label}
                </span>
                {!isLast && <span style={{ color: 'var(--border)' }}>/</span>}
            </span>
            );
        })}
        </div>
    );
}