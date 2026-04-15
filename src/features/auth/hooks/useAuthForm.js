import { useState } from 'react';
import { authApi } from '@api/authApi';

/**
 * 로그인 / 회원가입 폼 상태 및 API 호출을 담당하는 커스텀 훅
 * @param {'login' | 'signup'} mode
 * @param {function} onLogin - 로그인 성공 시 호출
 * @param {function} onSignupSuccess - 회원가입 성공 시 호출
 */
export function useAuthForm(mode, onLogin, onSignupSuccess) {
    const [form, setForm] = useState({
        loginId: '',
        password: '',
        name: '',
        phoneNum: '',
        address: '',
        email: '',
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const update = (key, val) => {
        setError('');
        setForm((prev) => ({ ...prev, [key]: val }));
    };

    // 유효성 검사
    const validate = () => {
        if (!form.loginId) {
            setError('아이디를 입력해주세요.');
            return false;
        }
        if (!form.password) {
            setError('비밀번호를 입력해주세요.');
            return false;
        }
        if (mode === 'signup') {
            if (!form.name) {
                setError('이름을 입력해주세요.');
                return false;
            }
            if (!form.phoneNum) {
                setError('휴대폰 번호를 입력해주세요.');
                return false;
            }
            if (!form.address) {
                setError('주소를 입력해주세요.');
                return false;
            }
            if (!form.email) {
                setError('이메일을 입력해주세요.');
                return false;
            }
        }
        return true;
    };

    const handleSubmit = async () => {
        if (!validate()) return;
        setLoading(true);
        setError('');
        try {
            if (mode === 'signup') {
                await authApi.signUp({
                    loginId: form.loginId,
                    password: form.password,
                    name: form.name,
                    phoneNum: form.phoneNum,
                    address: form.address,
                    email: form.email,
                });
                onSignupSuccess?.(); // 회원가입 성공 후 로그인 모드로 전환
            } else {
                await handleLogin();
            }
        } catch (err) {
            setError(err.response?.data?.message ?? '요청 처리 중 오류가 발생했습니다.');
        } finally {
            setLoading(false);
        }
    };

    // 로그인 공통 처리
    const handleLogin = async () => {
        const data = await authApi.login({
            loginId: form.loginId,
            password: form.password,
        });


        console.log('응답 데이터:', data);
        console.log('status 값:', data.status);
        if (data.status === 'success') {
            // console.log('onLogin 호출 직전');
            onLogin();
            // console.log('onLogin 호출 완료');
        }
    };

    return { form, error, loading, update, handleSubmit };
}