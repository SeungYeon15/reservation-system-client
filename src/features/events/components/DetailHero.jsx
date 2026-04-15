import Breadcrumb from '../../../components/layout/Breadcrumb';

/**
 * DetailHero  — 공연 상세 상단 히어로
 *
 * @param {{ title, emoji, cat, venue, date, duration, rating, reviews }} ev
 * @param {function} onBack  - 목록으로 돌아가기
 */
export default function DetailHero({ ev, onBack }) {
    const meta = [
        `📅 ${ev.date}`,
        `📍 ${ev.venue}`,
        `⏱ ${ev.duration ?? '170분 (인터미션 20분)'}`,
        `★ ${ev.rating} (${ev.reviews?.toLocaleString()} 리뷰)`,
    ];

    return (
        <div
        style={{
            height: 380,
            background: 'linear-gradient(160deg, #0d1a2e 0%, #0e0e12 100%)',
            display: 'flex',
            alignItems: 'flex-end',
            padding: '0 48px 44px',
            position: 'relative',
            overflow: 'hidden',
            borderBottom: '1px solid var(--border)',
        }}
        >
        {/* bg icon */}
        <div
            style={{
            position: 'absolute',
            right: 80,
            top: '50%',
            transform: 'translateY(-50%)',
            fontSize: '10rem',
            opacity: 0.08,
            userSelect: 'none',
            pointerEvents: 'none',
            }}
        >
            {ev.emoji}
        </div>

        <div style={{ position: 'relative' }}>
            <Breadcrumb
            items={[
                { label: '목록', onClick: onBack },
                { label: ev.title },
            ]}
            />

            <h1
            style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-3xl)',
                marginBottom: 8,
            }}
            >
            {ev.title}
            </h1>

            <div
            style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 20,
                fontSize: 'var(--text-sm)',
                color: 'var(--muted)',
            }}
            >
            {meta.map((m, i) => (
                <span key={i}>{m}</span>
            ))}
            </div>
        </div>
        </div>
    );
}