import PageLayout from '../../components/layout/PageLayout';
import FilterSidebar from '../../features/events/components/FilterSidebar';
import EventGrid from '../../features/events/components/EventGrid';
import { useEventFilter } from '../../features/events/hooks/useEventFilter.js';

/**
 * EventListPage  — 공연 목록 (필터 사이드바 + 그리드)
 *
 * @param {function} onNavigate  - (pageId: string) => void
 */
export default function EventListPage({ onNavigate }) {
  const {
    checked, toggleCheck,
    price, setPrice,
    sort, setSort,
    filtered,
    sortOptions,
  } = useEventFilter();

  return (
    <PageLayout style={{ paddingTop: 56 }}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '260px 1fr',
          minHeight: 'calc(100vh - 56px)',
        }}
      >
        {/* Sidebar */}
        <FilterSidebar
          checked={checked}
          onToggle={toggleCheck}
          price={price}
          onPriceChange={setPrice}
        />

        {/* Main */}
        <div style={{ padding: '28px 32px' }}>
          {/* Top bar */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 24,
            }}
          >
            <div>
              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'var(--text-xl)',
                }}
              >
                전체 공연
              </h2>
              <div style={{ fontSize: 'var(--text-sm)', color: 'var(--muted)', marginTop: 3 }}>
                총 {filtered.length}개
              </div>
            </div>

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              style={{
                padding: '8px 14px',
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--r-sm)',
                color: 'var(--text)',
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-sm)',
                outline: 'none',
                cursor: 'pointer',
              }}
            >
              {sortOptions.map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
          </div>

          <EventGrid
            events={filtered}
            onSelect={() => onNavigate('detail')}
            cols={3}
          />
        </div>
      </div>
    </PageLayout>
  );
}