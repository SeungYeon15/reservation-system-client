import React, { useState } from 'react';
import { useAuth } from './UseAuth';
import axios from 'axios';

const Login = () => {
    const { login } = useAuth();
    const [member, setMember] = useState({
        loginId: '',
        name: '',
        phoneNum: '',
        address: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setMember({...member, [e.target.name]: e.target.value });// 입력값 업데이트
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try{
            await login(member); // useAuth의 login 함수를 호출하여 로그인 시도
            alert('로그인 성공!');
            // 페이지 이동 처리 예정
        } catch (error) {
            console.error('Error occurred while logging in:', error);
            alert('로그인 중 오류가 발생했습니다.');
        }
    };

    return (
        <div>
            <h2>로그인</h2>
            <input name="loginId" type="text" placeholder="아이디" onChange={handleChange} />
            <input name="password" type="password" placeholder="비밀번호" onChange={handleChange} />
            <button onClick={handleLogin}>로그인</button>
        </div>
    );
};

export default Login;