import { useMemo } from 'react';
import SeatButton from '../SeatButton';
import SeatLegend from '../SeatLegend';
import { generateSeats } from '../../../../constants/seatConfig';

function SecLabel({ children }) {
    return (
        <div style={{
        textAlign: 'center', fontSize: '0.68rem', fontWeight: 700,
        color: 'var(--muted)', letterSpacing: '0.1em',
        textTransform: 'uppercase', marginBottom: 6,
        }}>{children}</div>
    );
}

function SeatBlock({ sections, selectedSeats, onToggle }) {
    return (
        <>
        {sections.map(({ label, rows }) => (
            <div key={label} style={{ marginBottom: 8 }}>
            <SecLabel>{label}</SecLabel>
            {rows.map(({ rowChar, seats }) => (
                <div key={rowChar} style={{
                display: 'flex', alignItems: 'center',
                justifyContent: 'center', gap: 4, marginBottom: 4,
                }}>
                <span style={{ width: 18, fontSize: '0.6rem', color: 'var(--muted)', textAlign: 'center', flexShrink: 0 }}>
                    {rowChar}
                </span>
                {seats.map((seat, i) =>
                    seat === 'gap'
                    ? <div key={i} style={{ width: 12, flexShrink: 0 }} />
                    : <SeatButton key={seat.id} seat={seat} isSelected={!!selectedSeats[seat.id]} onToggle={onToggle} />
                )}
                </div>
            ))}
            </div>
        ))}
        </>
    );
}

/**
 * ThrustLayout  — ② 블랙박스씨어터 (돌출무대 · 3면 관람)
 */
export default function ThrustLayout({ selectedSeats, onToggle }) {
    const data = useMemo(() => {
        const makeRows = (configs, prefix) =>
        configs.map(({ r, n, type }) => {
            const seats = generateSeats(type, 1, n).map(s => ({
            ...s, row: r, id: `${prefix}-${type}-${r}${s.col}`,
            }));
            const mid = Math.floor(n / 2);
            return { rowChar: r, seats: [...seats.slice(0, mid), 'gap', ...seats.slice(mid)] };
        });

        const front = makeRows([
        { r: 'A', n: 12, type: 'vip'      },
        { r: 'B', n: 14, type: 'vip'      },
        { r: 'C', n: 14, type: 'premium'  },
        { r: 'D', n: 16, type: 'premium'  },
        { r: 'E', n: 16, type: 'standard' },
        ], 'thf');

        const rear = makeRows([
        { r: 'F', n: 18, type: 'standard' },
        { r: 'G', n: 20, type: 'economy'  },
        { r: 'H', n: 20, type: 'economy'  },
        ], 'thr');

        const makeSide = (prefix, type) =>
        'ABCDE'.split('').map((r, i) => ({
            rowChar: r,
            seats: generateSeats(type, 1, 3 + i).map(s => ({
            ...s, row: r, id: `${prefix}-${r}${s.col}`,
            })),
        }));

        return {
        frontSections: [{ label: '프론트 (정면)', rows: front }],
        rearSections:  [{ label: '리어',          rows: rear  }],
        sideL: makeSide('thl', 'premium'),
        sideR: makeSide('thR', 'premium'),
        };
    }, []);

    // 사이드 섹션 라벨(SecLabel) 높이 + marginBottom 만큼 보정
    const SIDE_TOP_OFFSET = 26;

    return (
        <>
        {/* 무대 — 전체 너비 기준 중앙 정렬 */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{
                width: 200, padding: 10,
                background: 'linear-gradient(180deg, rgba(232,200,122,0.18) 0%, transparent 100%)',
                border: '1.5px solid rgba(232,200,122,0.4)',
                borderRadius: '10px 10px 0 0',
                textAlign: 'center', fontSize: '0.68rem', fontWeight: 700,
                letterSpacing: '0.15em', color: 'var(--accent)',
            }}>
                BACK STAGE
            </div>
            <div style={{
                width: 160, padding: '14px 10px',
                background: 'rgba(232,200,122,0.08)',
                border: '1.5px solid rgba(232,200,122,0.5)',
                borderTop: 'none',
                textAlign: 'center', fontSize: '0.68rem', fontWeight: 700,
                letterSpacing: '0.1em', color: 'var(--accent)',
            }}>
                THRUST<br />STAGE
            </div>
            </div>
        </div>

        {/* 3면 좌석 */}
        <div style={{
            display: 'flex', gap: 12,
            justifyContent: 'center',
            alignItems: 'flex-start',
        }}>

            {/* 사이드 L */}
            <div style={{ paddingTop: SIDE_TOP_OFFSET }}>
            <SecLabel>사이드 L</SecLabel>
            {data.sideL.map(({ rowChar, seats }) => (
                <div key={rowChar} style={{
                display: 'flex', alignItems: 'center',
                gap: 3, marginBottom: 4, justifyContent: 'flex-end',
                }}>
                <span style={{ width: 14, fontSize: '0.6rem', color: 'var(--muted)', textAlign: 'center' }}>
                    {rowChar}
                </span>
                {seats.map(seat => (
                    <SeatButton
                    key={seat.id} seat={seat}
                    isSelected={!!selectedSeats[seat.id]}
                    onToggle={onToggle}
                    />
                ))}
                </div>
            ))}
            </div>

            {/* 프론트 + 리어 */}
            <div style={{ flexShrink: 0, maxWidth: 540 }}>
            <SeatBlock sections={data.frontSections} selectedSeats={selectedSeats} onToggle={onToggle} />
            <div style={{ height: 10 }} />
            <SeatBlock sections={data.rearSections}  selectedSeats={selectedSeats} onToggle={onToggle} />
            </div>

            {/* 사이드 R */}
            <div style={{ paddingTop: SIDE_TOP_OFFSET }}>
            <SecLabel>사이드 R</SecLabel>
            {data.sideR.map(({ rowChar, seats }) => (
                <div key={rowChar} style={{
                display: 'flex', alignItems: 'center',
                gap: 3, marginBottom: 4,
                }}>
                {seats.map(seat => (
                    <SeatButton
                    key={seat.id} seat={seat}
                    isSelected={!!selectedSeats[seat.id]}
                    onToggle={onToggle}
                    />
                ))}
                <span style={{ width: 14, fontSize: '0.6rem', color: 'var(--muted)', textAlign: 'center' }}>
                    {rowChar}
                </span>
                </div>
            ))}
            </div>

        </div>

        <SeatLegend types={['vip', 'premium', 'standard', 'economy']} />
        </>
    );
}