import PageLayout from '../../components/layout/PageLayout';
import DetailHero from '../../features/events/components/DetailHero';
import InfoTabs from '../../features/events/components/InfoTabs';
import PurchasePanel from '../../features/booking/components/PurchasePanel';
import { useBookingFlow } from '../../features/booking/hooks/useBookingFlow';
import { EVENTS } from '../../constants/eventConfig';

/**
 * EventDetailPage  — 공연 상세
 *
 * @param {function} onNavigate  - (pageId: string) => void
 */
export default function EventDetailPage({ onNavigate }) {
  // 실제 연동 시 URL params 로 id 받아서 API 호출
  const ev = EVENTS[0];

  const { selectedDate, setSelectedDate, qty, setQty, totalPrice } = useBookingFlow(85000);

  return (
    <PageLayout>
      {/* Hero */}
      <DetailHero ev={ev} onBack={() => onNavigate('list')} />

      {/* Body */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 340px',
          gap: 32,
          padding: '40px 48px',
        }}
      >
        {/* Left — 탭 컨텐츠 */}
        <div>
          <InfoTabs />
        </div>

        {/* Right — 예매 패널 */}
        <div>
          <PurchasePanel
            basePrice={85000}
            maxPriceNote="VIP석 기준 ₩150,000까지"
            selectedDate={selectedDate}
            onDateChange={setSelectedDate}
            qty={qty}
            onQtyChange={setQty}
            onSeatSelect={() => onNavigate('seat')}
            onWishlist={() => {}}
            onShare={() => {}}
          />
        </div>
      </div>
    </PageLayout>
  );
}