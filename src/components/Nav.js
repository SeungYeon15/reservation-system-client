import React from 'react';
import { Link } from 'react-router-dom'; 
import { useAuth } from './UseAuth';
import './Nav.css';

const Nav = () => {
    const { user, logout } = useAuth(); // 현재 로그인한 사용자 정보 가져오기
    const handleLogout = (e) =>{
        e.preventDefault();
        logout(); // 로그아웃 함수 호출
    };

    return (
            <div className="navbar">
                <Link className='navbarMenu' to='/'>Home</Link>
                <Link className='navbarMenu' to='/about'>About</Link>
                {user ? (
                    <>
                    <Link className='navbarMenu' to='/' onClick={handleLogout}>Logout</Link>
                    </>
                ) : (
                    <Link className='navbarMenu' to='/login'>Login</Link>
                )}
            </div>
    );
};

export default Nav;