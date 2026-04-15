import { useState } from 'react';
import { SEAT_PRICES } from '../../../constants/seatConfig';

/**
 * useSeatSelection
 *
 * 좌석 선택 / 해제 / 초기화 / 합계 계산
 *
 * @returns {{
 *   selectedSeats: { [id]: SeatInfo },
 *   toggleSeat: (seat) => void,
 *   clearSeats: () => void,
 *   total: number,
 *   count: number,
 * }}
 */
export function useSeatSelection() {
  const [selectedSeats, setSelectedSeats] = useState({});

  const toggleSeat = (seat) => {
    if (seat.taken) return;

    setSelectedSeats((prev) => {
      const next = { ...prev };
      if (next[seat.id]) {
        delete next[seat.id];
      } else {
        next[seat.id] = {
          ...seat,
          price: SEAT_PRICES[seat.type],
        };
      }
      return next;
    });
  };

  const clearSeats = () => setSelectedSeats({});

  const list = Object.values(selectedSeats);
  const total = list.reduce((sum, s) => sum + s.price, 0);
  const count = list.length;

  return {
    selectedSeats,
    toggleSeat,
    clearSeats,
    total,
    count,
  };
}