import api from './api';
import { DashboardData, User } from '@/types';

export const userService = {
  getDashboard: async (): Promise<DashboardData> => {
    const response = await api.get('/users/dashboard');
    return response.data;
  },

  getReferrals: async () => {
    const response = await api.get('/users/referrals');
    return response.data;
  },

  getProfile: async (): Promise<User> => {
    const response = await api.get('/users/profile');
    return response.data;
  },
};
