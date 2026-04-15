import { useState } from 'react';
import { useAuthForm } from '../../features/auth/hooks/useAuthForm';
import PageLayout from '../../components/layout/PageLayout';
import Button from '../../components/ui/Button';

/**
 * AuthPage  — 로그인 / 회원가입 탭 전환
 *
 * @param {function} onLogin  - 로그인 완료 후 호출 (navigate to home)
 */
export default function AuthPage({ onLogin }) {
    const [mode, setMode] = useState('login');
    const { form, error, loading, update, handleSubmit } = useAuthForm(mode, onLogin, () => setMode('login'));

    const isSignup = mode === 'signup';

    // 로그인: loginId + password
    // 회원가입: loginId + password + name + phoneNum + address + email
    const fields = [
        { label: '아이디',     key: 'loginId',   type: 'text',     ph: '아이디를 입력하세요' },
        { label: '비밀번호',   key: 'password',  type: 'password', ph: '••••••••' },
        ...(isSignup
        ? [
            { label: '이름',        key: 'name',     type: 'text',  ph: '홍길동' },
            { label: '휴대폰 번호', key: 'phoneNum', type: 'tel',   ph: '010-0000-0000' },
            { label: '주소',        key: 'address',  type: 'text',  ph: '서울시 강남구' },
            { label: '이메일',      key: 'email',    type: 'email', ph: 'example@email.com' },
            ]
        : []),
    ];

    return (
        <PageLayout
        style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            background: 'radial-gradient(ellipse 60% 60% at 50% 40%, #1a1230 0%, var(--bg) 70%)',
        }}
        >
        <div
            style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--r-xl)',
            padding: '44px 40px',
            width: 440,
            boxShadow: 'var(--shadow-modal)',
            }}
        >
            {/* Brand */}
            <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <h1 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-2xl)',
                color: 'var(--accent)',
            }}>
                STAGEPICK
            </h1>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--muted)', marginTop: 4 }}>
                지금 이 순간을 함께하세요
            </p>
            </div>

            {/* Mode toggle */}
            <div style={{
            display: 'flex',
            background: 'var(--surface2)',
            borderRadius: 'var(--r-md)',
            padding: 4,
            marginBottom: 28,
            }}>
            {['login', 'signup'].map((m) => (
                <button
                key={m}
                onClick={() => setMode(m)}
                style={{
                    flex: 1, padding: '9px', border: 'none',
                    background: mode === m ? 'var(--accent)' : 'transparent',
                    color: mode === m ? '#0e0e12' : 'var(--muted)',
                    borderRadius: 'var(--r-sm)',
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--text-base)',
                    fontWeight: 500, cursor: 'pointer',
                    transition: 'all var(--transition-base)',
                }}
                >
                {m === 'login' ? '로그인' : '회원가입'}
                </button>
            ))}
            </div>

            {/* Fields */}
            {fields.map((f) => (
            <div key={f.key} style={{ marginBottom: 16 }}>
                <label style={{
                display: 'block',
                fontSize: 'var(--text-xs)', fontWeight: 600,
                color: 'var(--muted)', letterSpacing: '0.06em',
                textTransform: 'uppercase', marginBottom: 7,
                }}>
                {f.label}
                </label>
                <input
                type={f.type}
                placeholder={f.ph}
                value={form[f.key] ?? ''}
                onChange={(e) => update(f.key, e.target.value)}
                style={{
                    width: '100%', padding: '12px 16px',
                    background: 'var(--surface2)',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--r-md)',
                    color: 'var(--text)', fontSize: 'var(--text-base)',
                    outline: 'none',
                    transition: 'border-color var(--transition-base)',
                }}
                onFocus={(e) => (e.target.style.borderColor = 'var(--accent)')}
                onBlur={(e)  => (e.target.style.borderColor = 'var(--border)')}
                />
            </div>
            ))}

            {/* 비밀번호 찾기 — 로그인 모드에서만 표시 */}
            {!isSignup && (
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16 }}>
                <span style={{ fontSize: 'var(--text-sm)', color: 'var(--muted)', cursor: 'pointer' }}>
                비밀번호 찾기
                </span>
            </div>
            )}

            {/* 에러 메시지 */}
            {error && (
            <p style={{
                fontSize: 'var(--text-sm)', color: 'var(--red)',
                textAlign: 'center', marginBottom: 8,
            }}>
                {error}
            </p>
            )}

            {/* 제출 버튼 — 하나만 존재 */}
            <Button
            variant="primary"
            fullWidth
            onClick={handleSubmit}
            disabled={loading}
            style={{ marginTop: 8, opacity: loading ? 0.7 : 1 }}
            >
            {loading ? '처리 중...' : isSignup ? '회원가입' : '로그인'}
            </Button>

            {/* Divider */}
            <div style={{
            display: 'flex', alignItems: 'center', gap: 12,
            margin: '22px 0', color: 'var(--muted)', fontSize: 'var(--text-sm)',
            }}>
            <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
            또는
            <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
            </div>

            {/* 소셜 로그인 */}
            <div style={{ display: 'flex', gap: 10 }}>
            {[['🟡', '카카오'], ['🟢', '네이버'], ['⬛', '구글']].map(([icon, label]) => (
                <button
                key={label}
                style={{
                    flex: 1, padding: 10,
                    background: 'var(--surface2)',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--r-md)',
                    color: 'var(--text)', fontFamily: 'var(--font-body)',
                    fontSize: 'var(--text-sm)', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    gap: 6, transition: 'background var(--transition-base)',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--border)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--surface2)')}
                >
                {icon} {label}
                </button>
            ))}
            </div>
        </div>
        </PageLayout>
    );
}