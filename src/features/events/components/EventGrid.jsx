import EventCard from './EventCard';

/**
 * EventGrid  — 카드 그리드
 *
 * @param {{ id, ... }[]} events   - 공연 목록
 * @param {function}      onSelect - (ev) => void  카드 클릭 시
 * @param {number}        cols     - 컬럼 수 (기본 4)
 */
export default function EventGrid({ events = [], onSelect, cols = 4 }) {
    if (events.length === 0) {
        return (
        <div
            style={{
            textAlign: 'center',
            padding: '80px 0',
            color: 'var(--muted)',
            fontSize: 'var(--text-base)',
            }}
        >
            조건에 맞는 공연이 없습니다.
        </div>
        );
    }

    return (
        <div
        style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${cols}, 1fr)`,
            gap: 16,
        }}
        >
        {events.map((ev) => (
            <EventCard key={ev.id} ev={ev} onClick={() => onSelect?.(ev)} />
        ))}
        </div>
    );
}