import Button from '../../../components/ui/Button';
import DateSelector from './DateSelector';
import TicketCounter from './TicketCounter';
import { formatPrice } from '../../../utils/formatPrice';

/**
 * PurchasePanel  — 공연 상세 우측 고정 예매 패널
 *
 * @param {number}   basePrice       - 기본 가격 (₩ 단위)
 * @param {string}   [maxPriceNote]  - "VIP석 기준 ₩150,000까지"
 * @param {number}   selectedDate    - 날짜 인덱스
 * @param {function} onDateChange    - (index) => void
 * @param {number}   qty             - 인원 수
 * @param {function} onQtyChange     - (qty) => void
 * @param {function} onSeatSelect    - 좌석 선택하기 클릭
 * @param {function} onWishlist      - 찜하기
 * @param {function} onShare         - 공유
 */
export default function PurchasePanel({
    basePrice = 85000,
    maxPriceNote = 'VIP석 기준 ₩150,000까지',
    selectedDate,
    onDateChange,
    qty,
    onQtyChange,
    onSeatSelect,
    onWishlist,
    onShare,
    }) {
    const total = basePrice * qty;

    return (
        <div
        style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: 16,
            padding: 24,
            position: 'sticky',
            top: 72,
            height: 'fit-content',
        }}
        >
        {/* Price heading */}
        <div
            style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--text-2xl)',
            color: 'var(--accent)',
            marginBottom: 4,
            }}
        >
            {formatPrice(basePrice, { suffix: ' ~' })}
        </div>
        <div style={{ fontSize: 'var(--text-sm)', color: 'var(--muted)', marginBottom: 20 }}>
            {maxPriceNote}
        </div>

        <DateSelector selectedIndex={selectedDate} onChange={onDateChange} />
        <TicketCounter value={qty} onChange={onQtyChange} />

        {/* Divider */}
        <div style={{ height: 1, background: 'var(--border)', margin: '16px 0' }} />

        {/* Total */}
        <div
            style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '14px 0',
            borderTop: '1px solid var(--border)',
            borderBottom: '1px solid var(--border)',
            marginBottom: 16,
            fontSize: 'var(--text-base)',
            }}
        >
            <span>예상 금액</span>
            <span style={{ fontWeight: 700, fontSize: 'var(--text-md)', color: 'var(--accent)' }}>
            {formatPrice(total)}
            </span>
        </div>

        <Button variant="primary" fullWidth onClick={onSeatSelect} style={{ marginBottom: 12 }}>
            좌석 선택하기 →
        </Button>

        {/* Wishlist + Share */}
        <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
            <Button variant="outline" fullWidth size="sm" onClick={onWishlist}>♡ 찜하기</Button>
            <Button variant="outline" fullWidth size="sm" onClick={onShare}>📤 공유</Button>
        </div>

        {/* Notice */}
        <div
            style={{
            padding: 12,
            background: 'var(--surface2)',
            borderRadius: 'var(--r-sm)',
            fontSize: 'var(--text-xs)',
            color: 'var(--muted)',
            lineHeight: 1.7,
            }}
        >
            ⚠ 예매 후 취소 시 7일 이내 전액 환불
            <br />
            🎁 회원 포인트 적립 2% · 제휴카드 할인 가능
        </div>
        </div>
    );
}