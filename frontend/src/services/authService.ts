import api from './api';
import { User } from '@/types';

export const authService = {
  register: async (phone: string, fullName: string, password: string, referralCode?: string) => {
    const response = await api.post('/auth/register', {
      phone,
      fullName,
      password,
      referralCode,
    });
    return response.data;
  },

  login: async (phone: string, password: string) => {
    const response = await api.post('/auth/login', {
      phone,
      password,
    });
    return response.data;
  },

  logout: async () => {
    await api.post('/auth/logout');
  },

  getProfile: async (): Promise<User> => {
    const response = await api.get('/users/profile');
    return response.data;
  },
};
