/**
 * 장르 필터 옵션
 */
export const GENRE_OPTIONS = ['전체', '뮤지컬', '클래식', '콘서트', '발레', '연극', '오페라'];

/**
 * 지역 필터 옵션
 */
export const REGION_OPTIONS = ['서울', '경기', '부산', '대구', '인천'];

/**
 * 상태 필터 옵션
 */
export const STATUS_OPTIONS = ['예매중', '공연중', '마감임박'];

/**
 * 정렬 옵션
 */
export const SORT_OPTIONS = ['인기순', '날짜순', '가격낮은순', '평점높은순'];

/**
 * 뱃지 타입별 스타일
 */
export const BADGE_STYLES = {
    HOT: { background: 'var(--red)', color: 'white' },
    NEW: { background: 'var(--green)', color: '#0e0e12' },
    FEW: { background: 'var(--accent)', color: '#0e0e12' },
};

/**
 * 공연 목 데이터
 * @type {{
 *   id: number, emoji: string, title: string, cat: string,
 *   venue: string, date: string, price: string,
 *   badge: string|null, rating: number, reviews: number
 * }[]}
 */
export const EVENTS = [
    {
        id: 1,
        emoji: '🎭',
        title: '레 미제라블',
        cat: '뮤지컬',
        venue: '예술의전당',
        date: '2025.04.05~06.30',
        price: '₩85,000~',
        badge: 'HOT',
        rating: 4.8,
        reviews: 1240,
    },
    {
        id: 2,
        emoji: '🎻',
        title: '베를린 필하모닉',
        cat: '클래식',
        venue: '롯데콘서트홀',
        date: '2025.04.12~04.14',
        price: '₩50,000~',
        badge: 'NEW',
        rating: 4.9,
        reviews: 340,
    },
    {
        id: 3,
        emoji: '🎸',
        title: '아이유 콘서트',
        cat: '콘서트',
        venue: '올림픽공원',
        date: '2025.05.03~05.04',
        price: '₩99,000~',
        badge: 'FEW',
        rating: 5.0,
        reviews: 8721,
    },
    {
        id: 4,
        emoji: '🩰',
        title: '백조의 호수',
        cat: '발레',
        venue: '국립극장',
        date: '2025.04.20~04.22',
        price: '₩40,000~',
        badge: null,
        rating: 4.7,
        reviews: 620,
    },
    {
        id: 5,
        emoji: '🎶',
        title: 'BTS 위버스콘',
        cat: '콘서트',
        venue: '잠실주경기장',
        date: '2025.06.14~06.15',
        price: '₩132,000~',
        badge: 'HOT',
        rating: 4.9,
        reviews: 15040,
    },
    {
        id: 6,
        emoji: '🎪',
        title: '시카고',
        cat: '뮤지컬',
        venue: '블루스퀘어',
        date: '2025.04.08~07.31',
        price: '₩60,000~',
        badge: 'NEW',
        rating: 4.6,
        reviews: 880,
    },
];

/**
 * 공연 상세 - 공연 날짜/회차 목업
 */
export const EVENT_DATES = [
    { label: '4월 5일 (토)', time: '19:00' },
    { label: '4월 6일 (일)', time: '14:00' },
    { label: '4월 10일 (목)', time: '19:30' },
    { label: '4월 12일 (토)', time: '14:00' },
];

/**
 * 공연 상세 - 리뷰 목업
 */
export const EVENT_REVIEWS = [
    {
        name: '김민지',
        stars: 5,
        date: '2025.03.15',
        text: '압도적인 무대와 배우들의 열연에 감동받았습니다. 앙코르 공연을 꼭 봐야 할 것 같아요!',
    },
    {
        name: '이서준',
        stars: 5,
        date: '2025.03.12',
        text: '뮤지컬 레미제라블은 볼 때마다 새로운 감동이 있어요. 특히 이번 캐스팅은 역대급!',
    },
    {
        name: '박준혁',
        stars: 4,
        date: '2025.03.18',
        text: '뮤지컬 입문자에게도 강력 추천! 스토리가 워낙 탄탄하고 음악이 귀에 쏙쏙 들어옵니다.',
    },
];