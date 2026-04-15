import { SEAT_COLORS, SEAT_PRICES, SEAT_LABELS } from '../../../constants/seatConfig';

/**
 * SeatButton  — 개별 좌석 버튼
 */
export default function SeatButton({ seat, isSelected, onToggle }) {
    const { type, taken } = seat;

    const getBackground = () => {
        if (isSelected) return 'var(--accent)';
        if (taken)      return 'var(--surface2)';
        return SEAT_COLORS[type] ?? 'var(--surface2)';
    };

    const label = `${SEAT_LABELS[type] ?? type} ${seat.row}열 ${seat.col}번 · ₩${(SEAT_PRICES[type] ?? 0).toLocaleString()}`;

    return (
        <button
        onClick={() => onToggle(seat)}
        disabled={taken}
        title={taken ? '예매완료' : label}
        style={{
            width: 24, height: 20,
            borderRadius: '4px 4px 3px 3px',
            border: taken ? '1px solid var(--border)' : 'none',
            background: getBackground(),
            cursor: taken ? 'not-allowed' : 'pointer',
            opacity: taken ? 0.45 : 1,
            transform: isSelected ? 'scale(1.2)' : 'scale(1)',
            transition: 'transform 0.12s, opacity 0.12s',
            flexShrink: 0,
            position: 'relative',
            zIndex: isSelected ? 1 : 'auto',
        }}
        onMouseEnter={(e) => { if (!taken && !isSelected) e.currentTarget.style.transform = 'scale(1.2)'; }}
        onMouseLeave={(e) => { if (!isSelected) e.currentTarget.style.transform = 'scale(1)'; }}
        />
    );
}
