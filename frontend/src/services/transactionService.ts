import api from './api';
import { Transaction } from '@/types';

export const transactionService = {
  getTransactions: async (): Promise<Transaction[]> => {
    const response = await api.get('/transactions');
    return response.data;
  },

  requestWithdrawal: async (amount: number, bankName: string, iban: string, accountHolder: string) => {
    const response = await api.post('/transactions/withdrawal', {
      amount,
      bankName,
      iban,
      accountHolder,
    });
    return response.data;
  },
};
