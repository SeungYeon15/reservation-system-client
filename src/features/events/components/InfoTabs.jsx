import { useState } from 'react';
import Tabs from '../../../components/ui/Tabs';
import ReviewSection from './ReviewSection';
import { EVENT_REVIEWS } from '../../../constants/eventConfig';

const DETAIL_TABS = [
    { id: 'info',   label: '공연 정보' },
    { id: 'cast',   label: '캐스팅' },
    { id: 'notice', label: '관람 안내' },
    { id: 'reviews',label: '리뷰' },
];

function InfoBlock({ title, children }) {
    return (
        <div
        style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--r-lg)',
            padding: 20,
            marginBottom: 20,
        }}
        >
        <h3 style={{ fontSize: 'var(--text-base)', fontWeight: 700, marginBottom: 12 }}>{title}</h3>
        {children}
        </div>
    );
    }

    function InfoRow({ label, value }) {
    return (
        <div
        style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '8px 0',
            borderBottom: '1px solid var(--border)',
            fontSize: 'var(--text-base)',
        }}
        >
        <span style={{ color: 'var(--muted)' }}>{label}</span>
        <span>{value}</span>
        </div>
    );
    }

    /**
     * InfoTabs  — 공연 상세 탭 (공연정보 / 캐스팅 / 관람안내 / 리뷰)
     */
    export default function InfoTabs() {
    const [activeTab, setActiveTab] = useState('info');

    return (
        <div>
        <Tabs tabs={DETAIL_TABS} activeId={activeTab} onChange={setActiveTab} />

        {activeTab === 'info' && (
            <>
            <InfoBlock title="공연 정보">
                {[
                ['장르', '뮤지컬'],
                ['공연 기간', '2025.04.05 ~ 2025.06.30'],
                ['공연 시간', '170분 (인터미션 20분 포함)'],
                ['공연 장소', '예술의전당 오페라극장 (서울)'],
                ['관람 연령', '만 7세 이상'],
                ].map(([k, v]) => (
                <InfoRow key={k} label={k} value={v} />
                ))}
            </InfoBlock>

            <InfoBlock title="공연 일정">
                <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                {[
                    ['화–금', '19:30'],
                    ['토', '14:00 / 19:00'],
                    ['일', '14:00'],
                    ['월', '휴관'],
                ].map(([day, time]) => (
                    <div key={day} style={{ display: 'flex', gap: 14, paddingBottom: 18, position: 'relative' }}>
                    <div
                        style={{
                        width: 16, height: 16, borderRadius: '50%',
                        background: 'var(--surface2)', border: '2px solid var(--accent)',
                        flexShrink: 0, marginTop: 2,
                        }}
                    />
                    <div style={{ fontSize: 'var(--text-sm)' }}>
                        <div style={{ fontWeight: 500 }}>{day}</div>
                        <div style={{ color: 'var(--muted)', fontSize: 'var(--text-xs)' }}>{time}</div>
                    </div>
                    </div>
                ))}
                </div>
            </InfoBlock>
            </>
        )}

        {activeTab === 'cast' && (
            <InfoBlock title="캐스팅">
            {[
                ['장발장', '박효신 · 조승우'],
                ['에포닌', '아이비 · 박지연'],
                ['코제트', '정선아 · 강희선'],
                ['자베르', '민영기 · 김준현'],
            ].map(([role, actor]) => (
                <InfoRow key={role} label={role} value={actor} />
            ))}
            </InfoBlock>
        )}

        {activeTab === 'notice' && (
            <InfoBlock title="관람 안내">
            <ul style={{ listStyle: 'none', fontSize: 'var(--text-base)', color: 'var(--muted)', lineHeight: 2 }}>
                {[
                '공연 시작 후 10분 이내 입장 가능',
                '음식물 반입 금지 (물 허용)',
                '사진 및 동영상 촬영 불가',
                '만 7세 미만 입장 불가',
                '공연 중 휴대폰 전원 OFF',
                ].map((notice, i) => (
                <li key={i}>• {notice}</li>
                ))}
            </ul>
            </InfoBlock>
        )}

        {activeTab === 'reviews' && <ReviewSection reviews={EVENT_REVIEWS} />}
        </div>
    );
}