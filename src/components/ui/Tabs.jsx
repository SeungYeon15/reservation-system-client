/**
 * Tabs  — 범용 탭 컴포넌트
 *
 * @param {{ id: string, label: string }[]} tabs  - 탭 목록
 * @param {string}   activeId                     - 현재 활성 탭 id
 * @param {function} onChange                     - (id: string) => void
 *
 * @example
 * const TABS = [
 *   { id: 'info',    label: '공연 정보' },
 *   { id: 'cast',    label: '캐스팅' },
 *   { id: 'notice',  label: '관람 안내' },
 *   { id: 'reviews', label: '리뷰' },
 * ];
 *
 * <Tabs tabs={TABS} activeId={tab} onChange={setTab} />
 */
export default function Tabs({ tabs, activeId, onChange }) {
    return (
        <div
        style={{
            display: 'flex',
            borderBottom: '1px solid var(--border)',
            marginBottom: 28,
        }}
        >
        {tabs.map((t) => {
            const isActive = t.id === activeId;
            return (
            <button
                key={t.id}
                onClick={() => onChange(t.id)}
                style={{
                padding: '12px 20px',
                border: 'none',
                background: 'transparent',
                color: isActive ? 'var(--accent)' : 'var(--muted)',
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-base)',
                fontWeight: 500,
                cursor: 'pointer',
                borderBottom: `2px solid ${isActive ? 'var(--accent)' : 'transparent'}`,
                marginBottom: -1,
                transition: 'all var(--transition-fast)',
                whiteSpace: 'nowrap',
                }}
                onMouseEnter={(e) => {
                if (!isActive) e.currentTarget.style.color = 'var(--text)';
                }}
                onMouseLeave={(e) => {
                if (!isActive) e.currentTarget.style.color = 'var(--muted)';
                }}
            >
                {t.label}
            </button>
            );
        })}
        </div>
    );
}