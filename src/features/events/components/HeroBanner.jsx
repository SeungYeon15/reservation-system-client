import Button from '../../../components/ui/Button';

/**
 * HeroBanner  — 메인 홈 히어로 섹션
 *
 * @param {function} onBrowse     - "공연 둘러보기" 클릭
 * @param {function} onRecommend  - "이달의 추천" 클릭
 */
export default function HeroBanner({ onBrowse, onRecommend }) {
    return (
        <div
        style={{
            height: 520,
            background: 'linear-gradient(160deg, #1a1030 0%, #0e0e12 60%)',
            position: 'relative',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'flex-end',
            padding: '0 48px 52px',
            borderBottom: '1px solid var(--border)',
        }}
        >
        {/* Background text */}
        <div
            style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            fontFamily: 'var(--font-display)',
            fontSize: '16vw',
            fontWeight: 900,
            color: 'rgba(232,200,122,0.04)',
            whiteSpace: 'nowrap',
            userSelect: 'none',
            pointerEvents: 'none',
            }}
        >
            STAGE
        </div>

        {/* Content */}
        <div style={{ position: 'relative', maxWidth: 600 }}>
            {/* Badge */}
            <div
            style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                background: 'rgba(232,200,122,0.12)',
                border: '1px solid rgba(232,200,122,0.3)',
                borderRadius: 'var(--r-full)',
                padding: '5px 14px',
                fontSize: 'var(--text-sm)',
                color: 'var(--accent)',
                fontWeight: 600,
                marginBottom: 16,
                letterSpacing: '0.05em',
            }}
            >
            ✨ 이번 주 HOT 공연
            </div>

            <h1
            style={{
                fontFamily: 'var(--font-display)',
                fontSize: '3.2rem',
                lineHeight: 1.15,
                marginBottom: 16,
            }}
            >
            오늘 밤,
            <br />
            무대 위의 감동을
            <br />
            함께하세요
            </h1>

            <p style={{ color: 'var(--muted)', fontSize: 'var(--text-md)', marginBottom: 28 }}>
            클래식, 뮤지컬, 콘서트 — 최고의 공연을 한 자리에
            </p>

            <div style={{ display: 'flex', gap: 12 }}>
            <Button variant="primary" size="sm" onClick={onBrowse}>
                공연 둘러보기 →
            </Button>
            <Button variant="outline" size="sm" onClick={onRecommend}>
                이달의 추천
            </Button>
            </div>
        </div>
        </div>
    );
}