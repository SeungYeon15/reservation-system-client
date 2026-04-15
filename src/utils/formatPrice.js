/**
 * 숫자를 한국 원화 형식으로 포맷
 * @param {number} amount
 * @param {{ suffix?: string }} options
 * @returns {string}  예) ₩85,000 / ₩85,000~
 *
 * @example
 * formatPrice(85000)          // "₩85,000"
 * formatPrice(85000, { suffix: '~' })  // "₩85,000~"
 */
export function formatPrice(amount, { suffix = '' } = {}) {
    return `₩${amount.toLocaleString('ko-KR')}${suffix}`;
}