import ProsceniumLayout from './theaters/ProsceniumLayout';
import ThrustLayout     from './theaters/ThrustLayout';
import ArenaLayout      from './theaters/ArenaLayout';
import IntimateLayout   from './theaters/IntimateLayout';
import VineyardLayout   from './theaters/VineyardLayout';
import { THEATER_CONFIGS } from '../../../constants/seatConfig';

// TODO: [DYNAMIC_LAYOUT] 극장 타입별 Layout 파일 하드코딩 제거 필요
// → DynamicLayout.jsx 단일 컴포넌트로 대체
// → layoutConfig prop으로 DB layout_config JSON 받아서 자동 렌더링
// → 참고: layout_config JSON 설계 필요 (stage/sections/sideSections)

const LAYOUTS = {
    proscenium: ProsceniumLayout,
    thrust:     ThrustLayout,
    arena:      ArenaLayout,
    intimate:   IntimateLayout,
    vineyard:   VineyardLayout,
};

/**
 * SeatMap  — 극장 타입별 좌석 배치 렌더러
 *
 * @param {string}  theaterType   - 'proscenium' | 'thrust' | 'arena' | 'intimate' | 'vineyard'
 * @param {object}  selectedSeats - { [seatId]: SeatInfo }
 * @param {function} onToggle     - (seat) => void
 */
export default function SeatMap({ theaterType = 'proscenium', selectedSeats = {}, onToggle }) {
    const Layout = LAYOUTS[theaterType] ?? ProsceniumLayout;
    const config = THEATER_CONFIGS[theaterType] ?? THEATER_CONFIGS.proscenium;

    return (
        <div style={{
        background: 'var(--surface)', border: '1px solid var(--border)',
        borderRadius: 16, padding: 28, overflowX: 'auto',
        }}>
        {/* 극장 정보 띠 */}
        <div style={{
            display: 'flex', gap: 24, flexWrap: 'wrap',
            background: 'var(--surface2)', border: '1px solid var(--border)',
            borderRadius: 10, padding: '12px 20px',
            fontSize: 'var(--text-sm)', marginBottom: 24,
        }}>
            {[
            ['극장 유형', config.type],
            ['총 좌석',   config.capacity],
            ['구역',      config.zones],
            ['특징',      config.feature],
            ].map(([label, value]) => (
            <div key={label} style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <span style={{ fontSize: 'var(--text-xs)', color: 'var(--muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                {label}
                </span>
                <span style={{ fontWeight: 600 }}>{value}</span>
            </div>
            ))}
        </div>

        {/* 레이아웃 */}
        <Layout selectedSeats={selectedSeats} onToggle={onToggle} />
        </div>
    );
}