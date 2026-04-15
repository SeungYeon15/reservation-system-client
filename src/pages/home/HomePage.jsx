import PageLayout from '../../components/layout/PageLayout';
import HeroBanner from '../../features/events/components/HeroBanner';
import SearchBar from '../../features/events/components/SearchBar';
import FilterChips from '../../features/events/components/FilterChips';
import EventGrid from '../../features/events/components/EventGrid';
import { useEventFilter } from '../../features/events/hooks/useEventFilter.js';
import { EVENTS } from '../../constants/eventConfig';

/**
 * HomePage
 *
 * @param {function} onNavigate  - (pageId: string) => void
 */
export default function HomePage({ onNavigate }) {
    const { search, setSearch, genre, setGenre, filtered } = useEventFilter();

    /* 홈에선 최대 4개씩 2개 섹션으로 노출 */
    const hotEvents  = EVENTS.filter((e) => e.badge === 'HOT').slice(0, 4);
    const thisMonth  = EVENTS.slice(0, 4);

    return (
        <PageLayout>
        <HeroBanner
            onBrowse={() => onNavigate('list')}
            onRecommend={() => {}}
        />

        <SearchBar value={search} onChange={setSearch} />

        <FilterChips active={genre} onChange={setGenre} />

        {/* Hot section */}
        <section style={{ padding: '0 48px', marginBottom: 48 }}>
            <SectionHeader title="🔥 지금 인기 공연" onMore={() => onNavigate('list')} />
            <EventGrid
            events={genre === '전체' ? hotEvents : filtered.slice(0, 4)}
            onSelect={() => onNavigate('detail')}
            cols={4}
            />
        </section>

        {/* This month section */}
        <section style={{ padding: '0 48px', marginBottom: 48 }}>
            <SectionHeader title="📅 이번 달 공연" onMore={() => onNavigate('list')} />
            <EventGrid
            events={thisMonth}
            onSelect={() => onNavigate('detail')}
            cols={4}
            />
        </section>
        </PageLayout>
    );
    }

    function SectionHeader({ title, onMore }) {
    return (
        <div
        style={{
            display: 'flex',
            alignItems: 'baseline',
            justifyContent: 'space-between',
            marginBottom: 20,
        }}
        >
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-xl)' }}>
            {title}
        </h2>
        <span
            onClick={onMore}
            style={{
            fontSize: 'var(--text-sm)',
            color: 'var(--accent)',
            cursor: 'pointer',
            }}
        >
            전체보기 →
        </span>
        </div>
    );
}