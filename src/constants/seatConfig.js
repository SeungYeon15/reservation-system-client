// TODO: 공연마다 가격이 다를 수 있으므로 하드코딩 제거 필요
// → 공연 상세 API 응답에서 가격, 극장 정보 받아오도록 수정
// → seat 테이블에 base_price 컬럼 추가 후 연동

// TODO: [DYNAMIC_LAYOUT] THEATER_CONFIGS 하드코딩 제거 필요
// → DB venue 테이블의 theater_type, layout_config 컬럼으로 대체
// → fetchVenueById(venueId) API 연동 후 THEATER_LIST 동적 생성

/** 좌석 등급별 가격 */
export const SEAT_PRICES = {
    vip: 150000,
    premium: 120000,
    standard: 85000,
    economy: 60000,
    box: 180000,
};

/** 좌석 등급 표시 라벨 */
export const SEAT_LABELS = {
    vip: 'VIP',
    premium: 'R',
    standard: 'S',
    economy: 'A',
    box: '박스',
};

/** 좌석 등급별 색상 */
export const SEAT_COLORS = {
    vip: '#7c3aed',
    premium: '#1d4ed8',
    standard: '#15803d',
    economy: '#b45309',
    box: '#be185d',
};

/** 극장 타입별 설정 */
export const THEATER_CONFIGS = {
    proscenium: {
        key: 'proscenium',
        name: '오페라극장',
        icon: '🏛',
        type: '프로시니엄 (Proscenium)',
        capacity: '2,300석',
        zones: 'VIP · R · S · A · 박스석',
        feature: '액자형 무대, 발코니 2층',
    },
    thrust: {
        key: 'thrust',
        name: '블랙박스씨어터',
        icon: '🎪',
        type: '돌출무대 (Thrust Stage)',
        capacity: '320석',
        zones: '프론트 · 사이드 · 리어',
        feature: '무대가 객석으로 돌출, 3면 관람',
    },
    arena: {
        key: 'arena',
        name: '아레나공연장',
        icon: '🏟',
        type: '360° 아레나 (In-the-Round)',
        capacity: '8,000석',
        zones: '플로어 · 로어볼 · 어퍼볼',
        feature: '중앙 무대, 전방위 관람',
    },
    intimate: {
        key: 'intimate',
        name: '소극장',
        icon: '🎬',
        type: '인티메이트 소극장',
        capacity: '120석',
        zones: '프리미엄 · 일반 · 후면',
        feature: '배우와 가까운 소규모 공간',
    },
    vineyard: {
        key: 'vineyard',
        name: '콘서트홀',
        icon: '🎻',
        type: '빈야드 (Vineyard / Terrace)',
        capacity: '1,800석',
        zones: '오케스트라 · 테라스 A~E',
        feature: '무대 3면 둘러싸는 테라스 블록',
    },
};

export const THEATER_LIST = Object.values(THEATER_CONFIGS);

/** 좌석 배치 생성 헬퍼 */
export function generateSeats(type, rows, cols, takenRatio = 0.25) {
    const seats = [];
    for (let r = 0; r < rows; r++) {
        const rowChar = String.fromCharCode(65 + r);
        for (let c = 1; c <= cols; c++) {
            seats.push({
                id: `${type}-${rowChar}${c}`,
                type,
                row: rowChar,
                col: c,
                taken: Math.random() < takenRatio,
            });
        }
    }
    return seats;
}

/** 범례 아이템 */
export const SEAT_LEGEND = [
    { type: 'vip', color: '#7c3aed', label: 'VIP  ₩150,000' },
    { type: 'premium', color: '#1d4ed8', label: 'R    ₩120,000' },
    { type: 'standard', color: '#15803d', label: 'S    ₩85,000' },
    { type: 'economy', color: '#b45309', label: 'A    ₩60,000' },
    { type: 'box', color: '#be185d', label: '박스 ₩180,000' },
    { type: 'taken', color: 'var(--surface2)', label: '예매완료', border: '1px solid var(--border)' },
    { type: 'selected', color: 'var(--accent)', label: '선택됨' },
];