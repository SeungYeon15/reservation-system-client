import { useState } from 'react';
import PageLayout from '../../components/layout/PageLayout';
import Breadcrumb from '../../components/layout/Breadcrumb';
import SeatMap from '../../features/seat/components/SeatMap';
import SeatSummaryPanel from '../../features/seat/components/SeatSummaryPanel';
import { useSeatSelection } from '../../features/seat/hooks/useSeatSelection';
import { THEATER_LIST } from '../../constants/seatConfig';
import { EVENTS } from '../../constants/eventConfig';

export default function BookingPage({ onNavigate }) {
    const ev = EVENTS[0];
    const scheduleInfo = '2025.04.05 (토) 19:00 · 예술의전당 오페라극장 · 인원 2명';

    const [theaterType, setTheaterType] = useState('proscenium');
    const { selectedSeats, toggleSeat, clearSeats, total, count } = useSeatSelection();

    // 극장 탭 전환 시 선택 초기화
    const handleTheaterChange = (key) => {
        clearSeats();
        setTheaterType(key);
    };

    const handleBook = () => {
        if (count === 0) return;
        alert(`총 ${count}석 · ₩${total.toLocaleString()} 결제 진행`);
    };

    return (
        <PageLayout>
        <div style={{ padding: '32px 48px' }}>

            <Breadcrumb items={[
            { label: '목록',   onClick: () => onNavigate('list')   },
            { label: ev.title, onClick: () => onNavigate('detail') },
            { label: '좌석 선택' },
            ]} />

            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)', marginBottom: 6 }}>
            좌석 선택
            </h2>
            <p style={{ fontSize: 'var(--text-base)', color: 'var(--muted)', marginBottom: 20 }}>
            {scheduleInfo}
            </p>

            {/* 극장 타입 탭 */}
            <div style={{
            display: 'flex', gap: 6, marginBottom: 24,
            overflowX: 'auto', paddingBottom: 4,
            }}>
            {THEATER_LIST.map(th => {
                const isActive = theaterType === th.key;
                return (
                <button
                    key={th.key}
                    onClick={() => handleTheaterChange(th.key)}
                    style={{
                    display: 'flex', flexDirection: 'column', alignItems: 'center',
                    gap: 4, padding: '12px 20px', borderRadius: 'var(--r-lg)',
                    border: `1.5px solid ${isActive ? 'var(--accent)' : 'var(--border)'}`,
                    background: isActive ? 'rgba(232,200,122,0.08)' : 'transparent',
                    color: isActive ? 'var(--text)' : 'var(--muted)',
                    cursor: 'pointer', whiteSpace: 'nowrap',
                    transition: 'all var(--transition-base)', minWidth: 130,
                    }}
                    onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.background = 'var(--surface2)'; }}
                    onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.background = 'transparent'; }}
                >
                    <span style={{ fontSize: '1.6rem' }}>{th.icon}</span>
                    <span style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>{th.name}</span>
                    <span style={{ fontSize: 'var(--text-xs)', color: isActive ? 'var(--accent)' : 'var(--muted)' }}>
                    {th.capacity}
                    </span>
                </button>
                );
            })}
            </div>

            {/* 본문 */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 28, alignItems: 'start' }}>
            <SeatMap
                theaterType={theaterType}
                selectedSeats={selectedSeats}
                onToggle={toggleSeat}
            />

            <div style={{ position: 'sticky', top: 72 }}>
                <SeatSummaryPanel
                selectedSeats={selectedSeats}
                onBook={handleBook}
                onBack={() => onNavigate('detail')}
                />
                {count > 0 && (
                <button
                    onClick={clearSeats}
                    style={{
                    width: '100%', marginTop: 8, padding: 9,
                    background: 'transparent', border: 'none',
                    color: 'var(--muted)', fontSize: 'var(--text-sm)', cursor: 'pointer',
                    transition: 'color var(--transition-fast)',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--red)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--muted)')}
                >
                    선택 초기화
                </button>
                )}
            </div>
            </div>

        </div>
        </PageLayout>
    );
}