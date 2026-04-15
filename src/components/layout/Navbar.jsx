/**
 * Navbar
 * @param {string}   currentPage  - 현재 활성 페이지 id
 * @param {function} onNavigate   - (pageId: string) => void
 *
 * 탭 목록:
 *   'login' | 'home' | 'list' | 'detail' | 'seat'
 *
 * 실제 프로젝트에서 react-router 를 붙이면
 * onNavigate → navigate(PATHS[id]) 로 교체하면 됩니다.
 */

const TABS = [
    { id: 'login',  label: 'login' },
    { id: 'home',   label: 'home' },
    { id: 'list',   label: 'list' },
    { id: 'detail', label: 'detail' },
    { id: 'seat',   label: 'seat' },
];

export default function Navbar({ currentPage, onNavigate }) {
    return (
        <nav
        style={{
            position: 'fixed',
            top: 0, left: 0, right: 0,
            zIndex: 1000,
            height: 56,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 24px',
            background: 'rgba(14,14,18,0.92)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            borderBottom: '1px solid var(--border)',
        }}
        >
        {/* Logo */}
        <div
            onClick={() => onNavigate('home')}
            style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.3rem',
            color: 'var(--accent)',
            letterSpacing: '0.04em',
            cursor: 'pointer',
            userSelect: 'none',
            }}
        >
            🎭 STAGEPICK
        </div>

        {/* Page tabs */}
        <div
            style={{
            display: 'flex',
            gap: 4,
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--r-full)',
            padding: 4,
            }}
        >
            {TABS.map((t) => {
            const isActive = currentPage === t.id;
            return (
                <button
                key={t.id}
                onClick={() => onNavigate(t.id)}
                style={{
                    padding: '6px 14px',
                    borderRadius: 'var(--r-full)',
                    border: 'none',
                    background: isActive ? 'var(--accent)' : 'transparent',
                    color: isActive ? '#0e0e12' : 'var(--muted)',
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--text-sm)',
                    fontWeight: 500,
                    cursor: 'pointer',
                    transition: 'all var(--transition-base)',
                    whiteSpace: 'nowrap',
                }}
                onMouseEnter={(e) => {
                    if (!isActive) {
                    e.currentTarget.style.color = 'var(--text)';
                    e.currentTarget.style.background = 'var(--surface2)';
                    }
                }}
                onMouseLeave={(e) => {
                    if (!isActive) {
                    e.currentTarget.style.color = 'var(--muted)';
                    e.currentTarget.style.background = 'transparent';
                    }
                }}
                >
                {t.label}
                </button>
            );
            })}
        </div>

        {/* Right slot */}
        <div style={{ fontSize: 'var(--text-sm)', color: 'var(--muted)' }}>
            React UI
        </div>
        </nav>
    );
}