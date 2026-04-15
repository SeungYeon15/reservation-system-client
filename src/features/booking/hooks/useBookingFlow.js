import { useState } from 'react';

/**
 * useBookingFlow
 *
 * 공연 상세 → 좌석 선택 흐름의 상태를 관리
 *
 * @returns {{
 *   selectedDate: number,
 *   setSelectedDate: function,
 *   qty: number,
 *   setQty: function,
 *   totalPrice: number,
 * }}
 */
export function useBookingFlow(basePrice = 85000) {
    const [selectedDate, setSelectedDate] = useState(0);
    const [qty, setQty] = useState(2);

    const totalPrice = basePrice * qty;

    return {
        selectedDate,
        setSelectedDate,
        qty,
        setQty,
        totalPrice,
    };
}