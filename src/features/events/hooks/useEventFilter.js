import { useState, useMemo } from 'react';
import { EVENTS, SORT_OPTIONS } from '../../../constants/eventConfig';

/**
 * useEventFilter
 *
 * 공연 목록 필터 상태 + 정렬 로직
 *
 * @returns {{
 *   search: string, setSearch,
 *   genre: string, setGenre,
 *   checked: object, toggleCheck,
 *   price: { min: string, max: string }, setPrice,
 *   sort: string, setSort,
 *   filtered: Event[],
 *   sortOptions: string[],
 * }}
 */
export function useEventFilter() {
  const [search, setSearch] = useState('');
  const [genre, setGenre] = useState('전체');
  const [checked, setChecked] = useState({});
  const [price, setPrice] = useState({ min: '', max: '' });
  const [sort, setSort] = useState(SORT_OPTIONS[0]);

  const toggleCheck = (key) =>
    setChecked((prev) => ({ ...prev, [key]: !prev[key] }));

  const filtered = useMemo(() => {
    let list = [...EVENTS];

    // 검색어
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter(
        (ev) =>
          ev.title.toLowerCase().includes(q) ||
          ev.venue.toLowerCase().includes(q) ||
          ev.cat.toLowerCase().includes(q),
      );
    }

    // 장르 칩
    if (genre !== '전체') {
      list = list.filter((ev) => ev.cat === genre);
    }

    // 정렬
    if (sort === '인기순') list.sort((a, b) => b.reviews - a.reviews);
    if (sort === '평점높은순') list.sort((a, b) => b.rating - a.rating);
    if (sort === '가격낮은순') {
      list.sort((a, b) => {
        const pa = parseInt(a.price.replace(/[^\d]/g, ''), 10);
        const pb = parseInt(b.price.replace(/[^\d]/g, ''), 10);
        return pa - pb;
      });
    }

    return list;
  }, [search, genre, checked, price, sort]);

  return {
    search, setSearch,
    genre, setGenre,
    checked, toggleCheck,
    price, setPrice,
    sort, setSort,
    filtered,
    sortOptions: SORT_OPTIONS,
  };
}