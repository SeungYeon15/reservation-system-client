import { useMemo } from 'react';
import SeatButton from '../SeatButton';
import SeatLegend from '../SeatLegend';
import { generateSeats } from '../../../../constants/seatConfig';

function SecLabel({ children }) {
    return (
        <div style={{
        textAlign: 'center', fontSize: '0.68rem', fontWeight: 700,
        color: 'var(--muted)', letterSpacing: '0.1em', textTransform: 'uppercase',
        marginBottom: 6,
        }}>{children}</div>
    );
}

function SeatRows({ rows, selectedSeats, onToggle, justify = 'center' }) {
    return (
        <>
        {rows.map(({ rowChar, seats }) => (
            <div key={rowChar} style={{
            display: 'flex', alignItems: 'center',
            justifyContent: justify, gap: 3, marginBottom: 3,
            }}>
            <span style={{ width: 14, fontSize: '0.6rem', color: 'var(--muted)', textAlign: 'center', flexShrink: 0 }}>{rowChar}</span>
            {seats.map((seat, i) =>
                seat === 'gap'
                ? <div key={i} style={{ width: 10 }} />
                : <SeatButton key={seat.id} seat={seat} isSelected={!!selectedSeats[seat.id]} onToggle={onToggle} />
            )}
            </div>
        ))}
        </>
    );
}

/**
 * VineyardLayout  — ⑤ 콘서트홀 (빈야드 테라스)
 */
export default function VineyardLayout({ selectedSeats, onToggle }) {
    const data = useMemo(() => {
        const withGap = (seats, cols) => {
        const mid = Math.floor(cols / 2);
        return [...seats.slice(0, mid), 'gap', ...seats.slice(mid)];
        };

        const makeRows = (rowChars, baseCols, step, type, prefix) =>
        rowChars.split('').map((r, i) => {
            const n = baseCols + i * step;
            const seats = generateSeats(type, 1, n).map(s => ({ ...s, row: r, id: `${prefix}-${r}${s.col}` }));
            return { rowChar: r, seats: withGap(seats, n) };
        });

        // 사이드 (gap 없이)
        const makeSide = (rowChars, baseCols, step, type, prefix) =>
        rowChars.split('').map((r, i) => ({
            rowChar: r,
            seats: generateSeats(type, 1, baseCols + i * step).map(s => ({ ...s, row: r, id: `${prefix}-${r}${s.col}` })),
        }));

        // 발코니 (gap 2개)
        const makeBalcony = (rowChars, baseCols, step, type, prefix) =>
        rowChars.split('').map((r, i) => {
            const n = baseCols + i * step;
            const seats = generateSeats(type, 1, n).map(s => ({ ...s, row: r, id: `${prefix}-${r}${s.col}` }));
            const t1 = Math.floor(n / 3);
            const t2 = Math.floor((n * 2) / 3);
            return {
            rowChar: r,
            seats: [...seats.slice(0, t1), 'gap', ...seats.slice(t1, t2), 'gap', ...seats.slice(t2)],
            };
        });

        return {
        center:        makeRows('ABCDE', 16, 2,  'vip',      'vc'),
        centerUpper:   makeRows('FGH',   14, 2,  'premium',  'vcb'),
        rear:          makeRows('IJK',   18, 2,  'premium',  'vrr'),
        left:          makeSide('ABCDE',  6, 1,  'standard', 'vl'),
        right:         makeSide('ABCDE',  6, 1,  'standard', 'vr'),
        balcony:       makeBalcony('LMN', 24, 4, 'economy',  'vb'),
        };
    }, []);

    return (
        <>
        {/* 무대 */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
            <div style={{
            padding: '14px 40px',
            background: 'linear-gradient(180deg, rgba(232,200,122,0.18) 0%, transparent 100%)',
            border: '1.5px solid rgba(232,200,122,0.4)',
            borderRadius: '50% 50% 0 0 / 30px 30px 0 0',
            textAlign: 'center', fontSize: '0.72rem', fontWeight: 700,
            letterSpacing: '0.15em', color: 'var(--accent)',
            }}>🎻 STAGE (VINEYARD)</div>
        </div>

        {/* 테라스 3열 레이아웃 */}
        <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
            {/* 테라스 A (좌) */}
            <div style={{ flex: 1 }}>
            <SecLabel>테라스 A (좌)</SecLabel>
            <SeatRows rows={data.left} selectedSeats={selectedSeats} onToggle={onToggle} justify="flex-end" />
            </div>

            {/* 중앙 — 오케스트라 + 테라스 B + 테라스 C */}
            <div style={{ flex: 2 }}>
            <SecLabel>오케스트라 (정면)</SecLabel>
            <SeatRows rows={data.center} selectedSeats={selectedSeats} onToggle={onToggle} />

            <div style={{ height: 10 }} />
            <SecLabel>테라스 B (중앙 상단)</SecLabel>
            <SeatRows rows={data.centerUpper} selectedSeats={selectedSeats} onToggle={onToggle} />

            <div style={{ height: 10 }} />
            <SecLabel>테라스 C (후면)</SecLabel>
            <SeatRows rows={data.rear} selectedSeats={selectedSeats} onToggle={onToggle} />
            </div>

            {/* 테라스 D (우) */}
            <div style={{ flex: 1 }}>
            <SecLabel>테라스 D (우)</SecLabel>
            <SeatRows rows={data.right} selectedSeats={selectedSeats} onToggle={onToggle} justify="flex-start" />
            </div>
        </div>

        {/* 발코니 */}
        <div style={{ marginTop: 14 }}>
            <SecLabel>발코니 (E석 — 최상층)</SecLabel>
            <SeatRows rows={data.balcony} selectedSeats={selectedSeats} onToggle={onToggle} />
        </div>

        <SeatLegend types={['vip', 'premium', 'standard', 'economy']} />
        </>
    );
}