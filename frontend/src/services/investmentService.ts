import api from './api';
import { Investment } from '@/types';

export const investmentService = {
  getInvestments: async (): Promise<Investment[]> => {
    const response = await api.get('/investments');
    return response.data;
  },

  createInvestment: async (planNumber: number, amount: number) => {
    const response = await api.post('/investments/create', {
      planNumber,
      amount,
    });
    return response.data;
  },
};
