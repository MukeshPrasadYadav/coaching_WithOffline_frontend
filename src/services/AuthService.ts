// src/services/AuthService.ts
import type { Role } from '../store/auth.store';
import { api } from '../api/Client';


const AuthService = {
    login: async (payload: { email: string; password: string }) => {
        const response = await api.post('/auth/signin', payload);
        return response.data;
    },

    signup: async (payload: { name:string;  email: string; password: string,role: Role }) => {
        const response = await api.post('/auth/signup', payload);
        return response.data;
    },

    refreshToken : async () => {
        const response = await api.post('/auth/refresh');
        return response.data;
    },

    getCurrentUser: async () => {
        const response = await api.get('/auth/get/me');
        return response.data.data;
    },
    logout: async () => {
        const response = await api.post('/auth/signout');
        return response.data;
    }

}

export default AuthService;