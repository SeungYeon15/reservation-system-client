import Button from '../../../components/ui/Button';
import { SEAT_LABELS, SEAT_PRICES } from '../../../constants/seatConfig';
import { formatPrice } from '../../../utils/formatPrice';

/**
 * SeatSummaryPanel  — 선택 좌석 목록 + 금액 합계 패널
 *
 * @param {{ [seatId]: { id, type, row, col, price } }} selectedSeats
 * @param {function} onBook    - 결제하기 클릭
 * @param {function} onBack    - 뒤로 클릭
 */
export default function SeatSummaryPanel({ selectedSeats = {}, onBook, onBack }) {
  const list  = Object.values(selectedSeats);
  const total = list.reduce((sum, s) => sum + s.price, 0);
  const canBook = list.length > 0;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* Selected seats */}
      <div
        style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--r-lg)',
          padding: 18,
        }}
      >
        <h4
          style={{
            fontSize: 'var(--text-sm)',
            color: 'var(--muted)',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            marginBottom: 12,
          }}
        >
          선택한 좌석
        </h4>

        {list.length === 0 ? (
          <div
            style={{
              fontSize: 'var(--text-sm)',
              color: 'var(--muted)',
              textAlign: 'center',
              padding: 16,
            }}
          >
            좌석을 클릭하여 선택하세요
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {list.map((s) => (
              <div
                key={s.id}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontSize: 'var(--text-sm)',
                  padding: '8px 10px',
                  background: 'var(--surface2)',
                  borderRadius: 'var(--r-sm)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span
                    style={{
                      padding: '2px 8px',
                      borderRadius: 4,
                      fontSize: 'var(--text-xs)',
                      fontWeight: 700,
                      background: 'var(--accent)',
                      color: '#0e0e12',
                    }}
                  >
                    {SEAT_LABELS[s.type]}
                  </span>
                  <span>{s.row}열 {s.col}번</span>
                </div>
                <span style={{ fontWeight: 600, color: 'var(--accent)' }}>
                  {formatPrice(s.price)}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Price summary */}
      <div
        style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--r-lg)',
          padding: 18,
        }}
      >
        <h4
          style={{
            fontSize: 'var(--text-sm)',
            color: 'var(--muted)',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            marginBottom: 12,
          }}
        >
          금액 요약
        </h4>

        {[
          ['선택 좌석', `${list.length}석`],
          ['좌석 요금', formatPrice(total)],
          ['예매 수수료', '₩0'],
        ].map(([label, value]) => (
          <div
            key={label}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: 'var(--text-sm)',
              padding: '5px 0',
              color: 'var(--muted)',
            }}
          >
            <span>{label}</span>
            <span>{value}</span>
          </div>
        ))}

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            borderTop: '1px solid var(--border)',
            marginTop: 8,
            paddingTop: 12,
            fontWeight: 700,
            color: 'var(--text)',
            fontSize: 'var(--text-md)',
          }}
        >
          <span>합계</span>
          <span>{formatPrice(total)}</span>
        </div>
      </div>

      <Button variant="primary" fullWidth disabled={!canBook} onClick={onBook}>
        결제하기
      </Button>

      <Button variant="outline" fullWidth onClick={onBack}>
        ← 뒤로
      </Button>
    </div>
  );
}