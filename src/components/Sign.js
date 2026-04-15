import React, { useState } from 'react';
import axios from 'axios';
function Sign(props) {
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/members/signup', member);
            console.log(response.data); 
            alert(response.data);
            // 회원가입 성공 시 로그인 페이지로 이동
        } catch (error) {
            console.error('회원가입 실패:', error);
            alert('회원가입에 실패했습니다. 다시 시도해주세요.');
        }
    };
    return (
        <div>
            <h2>회원가입</h2>
                <input name="loginId" placeholder="아이디" onChange={handleChange} />
                <input name="password" type="password" placeholder="비밀번호" onChange={handleChange} />
                <input name="name" placeholder="이름" onChange={handleChange} />
                <input name="phoneNum" placeholder="전화번호" onChange={handleChange} />
                <input name="address" placeholder="주소" onChange={handleChange} />
                <input name="email" placeholder="이메일" onChange={handleChange} />
                <button onClick={handleSubmit}>가입하기</button>
        </div>
    );
}

export default Sign;