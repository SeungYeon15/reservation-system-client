import { SEAT_LEGEND } from '../../../constants/seatConfig';

/**
 * SeatLegend  — 좌석 등급 범례
 *
 * @param {string[]} [types]  - 표시할 등급 목록 (기본: 전체)
 */
export default function SeatLegend({ types }) {
    const items = types
        ? SEAT_LEGEND.filter(item => types.includes(item.type) || item.type === 'taken' || item.type === 'selected')
        : SEAT_LEGEND;

    return (
        <div style={{
        display: 'flex', gap: 14, justifyContent: 'center',
        marginTop: 20, flexWrap: 'wrap',
        }}>
        {items.map(item => (
            <div key={item.type} style={{
            display: 'flex', alignItems: 'center', gap: 5,
            fontSize: 'var(--text-xs)', color: 'var(--muted)',
            }}>
            <div style={{
                width: 13, height: 13, borderRadius: 3, flexShrink: 0,
                background: item.color, border: item.border ?? 'none',
            }} />
            {item.label}
            </div>
        ))}
        </div>
    );
}