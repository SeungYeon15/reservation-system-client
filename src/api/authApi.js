import api from '@/lib/axios';

export const authApi = {
    signUp: async (member) => {
        const response = await api.post('/api/members/signup', member);
        return response.data;
    },
    login: async (member) => {
        const response = await api.post('/api/members/login', member);
        return response.data;
    },
    logout: async () => {
        const response = await api.post('/api/members/logout');
        return response.data;
    }

}

