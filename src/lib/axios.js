import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:8080',
    withCredentials: true,
});


// 응답 인터셉터 — 401 시 로그인 페이지 이동
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            window.location.href = '/';
        }
        return Promise.reject(error);
    }
);

export default api