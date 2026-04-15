import { useMemo } from 'react';
import SeatButton from '../SeatButton';
import SeatLegend from '../SeatLegend';
import { generateSeats } from '../../../../constants/seatConfig';

function SecLabel({ children }) {
    return (
        <div style={{
        textAlign: 'center', fontSize: '0.68rem', fontWeight: 700,
        color: 'var(--muted)', letterSpacing: '0.1em', textTransform: 'uppercase',
        marginBottom: 6, marginTop: 10,
        }}>{children}</div>
    );
}

/**
 * IntimateLayout  — ④ 소극장 (인티메이트)
 */
export default function IntimateLayout({ selectedSeats, onToggle }) {
    const data = useMemo(() => {
        const makeRows = (rowChars, cols, type, prefix, withGap = false) =>
        rowChars.split('').map(r => {
            const seats = generateSeats(type, 1, cols).map(s => ({ ...s, row: r, id: `${prefix}-${r}${s.col}` }));
            if (withGap) {
            const mid = Math.floor(cols / 2);
            return { rowChar: r, seats: [...seats.slice(0, mid), 'gap', ...seats.slice(mid)] };
            }
            return { rowChar: r, seats };
        });

        return {
        premium:  makeRows('AB',       10, 'vip',      'int-p'),
        standard: makeRows('CDEFGH',   12, 'standard', 'int-s', true),
        rear:     makeRows('IJ',       10, 'economy',  'int-r'),
        };
    }, []);

    const renderRows = (rows) =>
        rows.map(({ rowChar, seats }) => (
        <div key={rowChar} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4, marginBottom: 4 }}>
            <span style={{ width: 16, fontSize: '0.6rem', color: 'var(--muted)', textAlign: 'center', flexShrink: 0 }}>{rowChar}</span>
            {seats.map((seat, i) =>
            seat === 'gap'
                ? <div key={i} style={{ width: 12 }} />
                : <SeatButton key={seat.id} seat={seat} isSelected={!!selectedSeats[seat.id]} onToggle={onToggle} />
            )}
        </div>
        ));

    return (
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
        {/* 무대 */}
        <div style={{
            width: '100%', padding: 16,
            background: 'linear-gradient(180deg, rgba(232,200,122,0.2) 0%, transparent 100%)',
            border: '1.5px solid rgba(232,200,122,0.4)', borderRadius: '10px 10px 0 0',
            textAlign: 'center', fontSize: '0.75rem', fontWeight: 700,
            letterSpacing: '0.2em', color: 'var(--accent)', marginBottom: 0,
        }}>🎭 STAGE</div>

        <SecLabel>프리미엄 (1~2열)</SecLabel>
        {renderRows(data.premium)}

        <div style={{ height: 8 }} />
        <SecLabel>일반석 (3~8열)</SecLabel>
        {renderRows(data.standard)}

        <div style={{ height: 8 }} />
        <SecLabel>후면석 (9~10열)</SecLabel>
        {renderRows(data.rear)}

        <SeatLegend types={['vip', 'standard', 'economy']} />
        </div>
    );
}