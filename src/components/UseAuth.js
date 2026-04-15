import { useState, useEffect, createContext, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const checkAuth = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/members/check', {
                credentials: 'include' // 쿠키 포함 요청
            });

            if (response.ok) {
                const data = await response.json(); 
                console.log('인증 체크 데이터:', data);

                if (data.loggedIn === "true") {
                    setUser(data.username); 
                } else {
                    setUser(null);
                }
            }

        } catch (error) {
            console.error('Error checking authentication:', error);
            setUser(null);
        }
    };

    useEffect(() => { 
        checkAuth();
    }, []);

    //로그인
    const login = async (member) => {
        try {
            const response = await fetch('http://localhost:8080/api/members/login',{
                method: 'POST',
                headers:{
                    'Content-Type' : 'application/json',
                },
                body: JSON.stringify(member),
                credentials: 'include'
            });
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText || '로그인 실패');
        }
            const data = await response.json();
            console.log('서버 응답 데이터:', data);
            await checkAuth(); // 로그인 후 상태 갱신
        } catch (error) {
            console.error('Error logging in:', error.message);
            throw error;
        }
    };

    //로그아웃
    const logout = async () => {
        try {
            await fetch('http://localhost:8080/api/members/logout', {
                method: 'POST',
                credentials: 'include'
            });
            setUser(null); // 로그아웃 후 사용자 정보 초기화
            await checkAuth(); // 로그아웃 후 상태 갱신
        } catch (error) {
            console.error('Error logging out:', error);
            throw error;
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
