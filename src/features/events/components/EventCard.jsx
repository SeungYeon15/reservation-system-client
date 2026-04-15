import { useState } from 'react';
import Badge from '../../../components/ui/Badge';

/**
 * EventCard  — 홈·목록 공통 공연 카드
 *
 * @param {{ id, emoji, title, cat, venue, date, price, badge, rating, reviews }} ev
 * @param {function} onClick
 */
export default function EventCard({ ev, onClick }) {
    const [hovered, setHovered] = useState(false);

    return (
        <div
        onClick={onClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
            background: 'var(--surface)',
            border: `1px solid ${hovered ? 'var(--accent)' : 'var(--border)'}`,
            borderRadius: 'var(--r-lg)',
            overflow: 'hidden',
            cursor: 'pointer',
            transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
            transition: 'transform var(--transition-base), border-color var(--transition-base)',
            boxShadow: hovered ? 'var(--shadow-card)' : 'none',
        }}
        >
        {/* Thumbnail */}
        <div
            style={{
            height: 140,
            background: 'var(--surface2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '2.5rem',
            position: 'relative',
            }}
        >
            {ev.emoji}
            {ev.badge && (
            <div style={{ position: 'absolute', top: 10, right: 10 }}>
                <Badge type={ev.badge} />
            </div>
            )}
        </div>

        {/* Body */}
        <div style={{ padding: 14 }}>
            <h3 style={{ fontSize: 'var(--text-base)', fontWeight: 600, marginBottom: 4 }}>
            {ev.title}
            </h3>
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--muted)', marginBottom: 10, lineHeight: 1.6 }}>
            {ev.cat} · {ev.venue}
            <br />
            {ev.date}
            </div>

            {/* Footer */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 'var(--text-base)', fontWeight: 700, color: 'var(--accent)' }}>
                {ev.price}
            </span>
            <button
                onClick={(e) => { e.stopPropagation(); onClick?.(); }}
                style={{
                padding: '5px 12px',
                background: 'var(--accent)',
                border: 'none',
                borderRadius: 'var(--r-sm)',
                color: '#0e0e12',
                fontSize: 'var(--text-xs)',
                fontWeight: 700,
                cursor: 'pointer',
                }}
            >
                예매
            </button>
            </div>
        </div>
        </div>
    );
}