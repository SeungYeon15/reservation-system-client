import { useMemo } from 'react';
import SeatButton from '../SeatButton';
import SeatLegend from '../SeatLegend';
import { generateSeats } from '../../../../constants/seatConfig';

function SecLabel({ children, style: s }) {
    return (
        <div style={{
        textAlign: 'center', fontSize: '0.68rem', fontWeight: 700,
        color: 'var(--muted)', letterSpacing: '0.1em', textTransform: 'uppercase',
        marginBottom: 4, ...s,
        }}>{children}</div>
    );
}

function ArenaBand({ rows, selectedSeats, onToggle }) {
    return (
        <>
        {rows.map(({ rowChar, seats }) => (
            <div key={rowChar} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 3, marginBottom: 3 }}>
            <span style={{ width: 16, fontSize: '0.6rem', color: 'var(--muted)', textAlign: 'center', flexShrink: 0 }}>{rowChar}</span>
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
 * ArenaLayout  — ③ 아레나 (360° 원형)
 */
export default function ArenaLayout({ selectedSeats, onToggle }) {
    const data = useMemo(() => {
        const makeBand = (rowChars, colCounts, type, prefix) =>
        rowChars.split('').map((r, idx) => {
            const n = colCounts[idx] ?? colCounts[0];
            const seats = generateSeats(type, 1, n).map(s => ({ ...s, row: r, id: `${prefix}-${r}${s.col}` }));
            return { rowChar: r, seats: ['gap', ...seats, 'gap'] };
        });

        return {
        upper:  makeBand('ABCD', [30, 34, 38, 40], 'economy',  'arU'),
        lower:  makeBand('EFGH', [18, 22, 26, 28], 'standard', 'arL'),
        lower2: makeBand('IJKL', [28, 26, 22, 18], 'standard', 'arL2'),
        upper2: makeBand('MNOP', [40, 38, 34, 30], 'economy',  'arU2'),
        sideL:  'QRS'.split('').map((r, i) => ({
            rowChar: r,
            seats: generateSeats('premium', 1, 8 + i * 2).map(s => ({ ...s, row: r, id: `arSL-${r}${s.col}` })),
        })),
        sideR:  'QRS'.split('').map((r, i) => ({
            rowChar: r,
            seats: generateSeats('premium', 1, 8 + i * 2).map(s => ({ ...s, row: r, id: `arSR-${r}${s.col}` })),
        })),
        };
    }, []);

    return (
        <>
        <SecLabel>어퍼 볼 (UPPER BOWL)</SecLabel>
        <ArenaBand rows={data.upper}  selectedSeats={selectedSeats} onToggle={onToggle} />

        <div style={{ height: 8 }} />
        <SecLabel>로어 볼 (LOWER BOWL)</SecLabel>
        <ArenaBand rows={data.lower}  selectedSeats={selectedSeats} onToggle={onToggle} />

        {/* 중앙 무대 */}
        <div style={{ display: 'flex', justifyContent: 'center', margin: '8px 0' }}>
            <div style={{
            background: 'rgba(232,200,122,0.12)',
            border: '1.5px dashed rgba(232,200,122,0.5)',
            borderRadius: '50%', width: 180, height: 72,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '0.7rem', fontWeight: 700, color: 'var(--accent)', letterSpacing: '0.12em',
            }}>STAGE</div>
        </div>

        <SecLabel>로어 볼 (LOWER BOWL) — 반대편</SecLabel>
        <ArenaBand rows={data.lower2} selectedSeats={selectedSeats} onToggle={onToggle} />

        <div style={{ height: 8 }} />
        <SecLabel>어퍼 볼 (UPPER BOWL) — 반대편</SecLabel>
        <ArenaBand rows={data.upper2} selectedSeats={selectedSeats} onToggle={onToggle} />

        {/* 사이드 윙 */}
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', marginTop: 8 }}>
            <div>
            <SecLabel>사이드 W</SecLabel>
            {data.sideL.map(({ rowChar, seats }) => (
                <div key={rowChar} style={{ display: 'flex', alignItems: 'center', gap: 3, marginBottom: 3, justifyContent: 'flex-end' }}>
                <span style={{ width: 14, fontSize: '0.6rem', color: 'var(--muted)' }}>{rowChar}</span>
                {seats.map(seat => <SeatButton key={seat.id} seat={seat} isSelected={!!selectedSeats[seat.id]} onToggle={onToggle} />)}
                </div>
            ))}
            </div>
            <div style={{ width: 200 }} />
            <div>
            <SecLabel>사이드 E</SecLabel>
            {data.sideR.map(({ rowChar, seats }) => (
                <div key={rowChar} style={{ display: 'flex', alignItems: 'center', gap: 3, marginBottom: 3 }}>
                {seats.map(seat => <SeatButton key={seat.id} seat={seat} isSelected={!!selectedSeats[seat.id]} onToggle={onToggle} />)}
                <span style={{ width: 14, fontSize: '0.6rem', color: 'var(--muted)' }}>{rowChar}</span>
                </div>
            ))}
            </div>
        </div>

        <SeatLegend types={['vip', 'premium', 'standard', 'economy']} />
        </>
    );
}