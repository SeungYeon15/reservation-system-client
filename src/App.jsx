import { useState } from 'react';
import Navbar from './components/layout/Navbar';
import AuthPage from './pages/auth/AuthPage';
import HomePage from './pages/home/HomePage';
import EventListPage from './pages/events/EventListPage';
import EventDetailPage from './pages/events/EventDetailPage';
import BookingPage from './pages/booking/BookingPage';

/**
 * App  — 루트 컴포넌트
 *
 * 현재는 useState 로 페이지 전환 관리.
 * 추후 react-router 도입 시 onNavigate → navigate(PATHS[id]) 로 교체.
 */
export default function App() {
  const [page, setPage] = useState('login');

  return (
    <>
      <Navbar currentPage={page} onNavigate={setPage} />

      {page === 'login' && <AuthPage onLogin={() => setPage('home')} />}
      {page === 'home' && <HomePage onNavigate={setPage} />}
      {page === 'list' && <EventListPage onNavigate={setPage} />}
      {page === 'detail' && <EventDetailPage onNavigate={setPage} />}
      {page === 'seat' && <BookingPage onNavigate={setPage} />}
    </>
  );
}