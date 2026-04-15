import SeatButton from '../SeatButton';
import SeatLegend from '../SeatLegend';
import { generateSeats } from '../../../../constants/seatConfig';

const BOX_SEATS = 'ABCDE'.split('').map(r => ({
    id: `box-${r}`, type: 'box', row: r, col: 1,
    taken: Math.random() < 0.25,
}));

const SECTIONS = [
    { label: 'VIP석 (1~3열)',  rows: 'ABC',    cols: 24, type: 'vip'      },
    { label: 'R석 (4~8열)',    rows: 'DEFGH',  cols: 28, type: 'premium'  },
    { label: 'S석 (9~14열)',   rows: 'IJKLMN', cols: 32, type: 'standard' },
    { label: 'A석 (15~18열)',  rows: 'OPQR',   cols: 30, type: 'economy'  },
].map(sec => ({
    ...sec,
    rowData: sec.rows.split('').map(r => {
        const seats = generateSeats(sec.type, 1, sec.cols).map(s => ({
            ...s,
            row: r,
            id: `pro-${sec.type}-${r}${s.col}`,
        }));
        const mid = Math.floor(sec.cols / 2);
        return [...seats.slice(0, mid), 'gap', ...seats.slice(mid)];
    }),
}));

/** 좌석 행 렌더러 */
function SeatRow({ rowChar, seats, selectedSeats, onToggle }) {
    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4, marginBottom: 4 }}>
            <span style={{ width: 18, fontSize: '0.6rem', color: 'var(--muted)', textAlign: 'center', flexShrink: 0 }}>
                {rowChar}
            </span>
            {seats.map((seat, i) =>
                seat === 'gap'
                    ? <div key={i} style={{ width: 12, flexShrink: 0 }} />
                    : <SeatButton key={seat.id} seat={seat} isSelected={!!selectedSeats[seat.id]} onToggle={onToggle} />
            )}
        </div>
    );
}

/** 섹션 라벨 */
function SecLabel({ children }) {
    return (
        <div style={{
            textAlign: 'center', fontSize: '0.68rem', fontWeight: 700,
            color: 'var(--muted)', letterSpacing: '0.1em', textTransform: 'uppercase',
            marginBottom: 6,
        }}>
            {children}
        </div>
    );
}

/**
 * ProsceniumLayout  — ① 오페라극장 (프로시니엄)
 * 박스석(좌/우) + 메인홀(VIP·R·S·A)
 */
export default function ProsceniumLayout({ selectedSeats, onToggle }) {
    return (
        <>
            {/* 무대 */}
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 8 }}>
                <div style={{
                    width: '80%', padding: 12,
                    background: 'linear-gradient(180deg, rgba(232,200,122,0.18) 0%, transparent 100%)',
                    border: '1.5px solid rgba(232,200,122,0.4)', borderRadius: '10px 10px 0 0',
                    textAlign: 'center', fontSize: '0.75rem', fontWeight: 700,
                    letterSpacing: '0.2em', color: 'var(--accent)',
                }}>
                    🎭 STAGE (PROSCENIUM)
                </div>
            </div>

            {/* 박스석 + 메인홀 */}
            <div style={{ display: 'flex', gap: 16, marginBottom: 6 }}>
                {/* 박스 L */}
                <div style={{ width: 48 }}>
                    <SecLabel>박스L</SecLabel>
                    {BOX_SEATS.map(seat => (
                        <div key={seat.id} style={{ marginBottom: 4, display: 'flex', justifyContent: 'center' }}>
                            <SeatButton
                                seat={{ ...seat, id: `boxL-${seat.row}` }}
                                isSelected={!!selectedSeats[`boxL-${seat.row}`]}
                                onToggle={onToggle}
                            />
                        </div>
                    ))}
                </div>

                {/* 메인홀 */}
                <div style={{ flex: 1 }}>
                    {SECTIONS.map(sec => (
                        <div key={sec.label} style={{ marginBottom: 8 }}>
                            <SecLabel>{sec.label}</SecLabel>
                            {sec.rowData.map((rowSeats, i) => {
                                const rowChar = sec.rows[i];
                                return (
                                    <SeatRow
                                        key={rowChar}
                                        rowChar={rowChar}
                                        seats={rowSeats}
                                        selectedSeats={selectedSeats}
                                        onToggle={onToggle}
                                    />
                                );
                            })}
                        </div>
                    ))}
                </div>

                {/* 박스 R */}
                <div style={{ width: 48 }}>
                    <SecLabel>박스R</SecLabel>
                    {BOX_SEATS.map(seat => (
                        <div key={seat.id} style={{ marginBottom: 4, display: 'flex', justifyContent: 'center' }}>
                            <SeatButton
                                seat={{ ...seat, id: `boxR-${seat.row}` }}
                                isSelected={!!selectedSeats[`boxR-${seat.row}`]}
                                onToggle={onToggle}
                            />
                        </div>
                    ))}
                </div>
            </div>

            <SeatLegend types={['box', 'vip', 'premium', 'standard', 'economy']} />
        </>
    );
}