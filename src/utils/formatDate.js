/**
 * Date 객체 또는 ISO 문자열을 한국어 날짜 형식으로 포맷
 * @param {Date | string} date
 * @param {{ includeDay?: boolean, includeTime?: boolean }} options
 * @returns {string}
 *
 * @example
 * formatDate('2025-04-05')                          // "2025.04.05"
 * formatDate('2025-04-05', { includeDay: true })    // "2025.04.05 (토)"
 * formatDate('2025-04-05T19:00', { includeTime: true }) // "2025.04.05 19:00"
 */
export function formatDate(date, { includeDay = false, includeTime = false } = {}) {
    const d = date instanceof Date ? date : new Date(date);

    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');

    let result = `${yyyy}.${mm}.${dd}`;

    if (includeDay) {
        const days = ['일', '월', '화', '수', '목', '금', '토'];
        result += ` (${days[d.getDay()]})`;
    }

    if (includeTime) {
        const hh = String(d.getHours()).padStart(2, '0');
        const min = String(d.getMinutes()).padStart(2, '0');
        result += ` ${hh}:${min}`;
    }

    return result;
}

/**
 * 두 날짜 사이의 기간을 "YYYY.MM.DD ~ YYYY.MM.DD" 형식으로 포맷
 * @param {Date | string} start
 * @param {Date | string} end
 * @returns {string}
 */
export function formatDateRange(start, end) {
    return `${formatDate(start)} ~ ${formatDate(end)}`;
}