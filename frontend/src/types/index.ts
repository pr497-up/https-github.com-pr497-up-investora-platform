export interface User {
  id: string;
  phone: string;
  fullName: string;
  referralCode: string;
  balance: number;
  isAdmin: boolean;
  createdAt: string;
}

export interface Investment {
  id: string;
  userId: string;
  planNumber: number;
  investmentAmount: number;
  dailyIncome: number;
  activationDate: string;
  completionDate?: string;
  status: 'active' | 'completed' | 'cancelled';
  totalEarned: number;
}

export interface Transaction {
  id: string;
  userId: string;
  type: 'deposit' | 'withdrawal' | 'commission' | 'daily_income';
  amount: number;
  fee: number;
  netAmount: number;
  status: 'pending' | 'approved' | 'rejected' | 'completed';
  proofImageUrl?: string;
  bankName?: string;
  iban?: string;
  accountHolder?: string;
  createdAt: string;
}

export interface Plan {
  planNumber: number;
  name: string;
  amount: number;
  dailyIncome: number;
  returnAmount: number;
}

export interface DashboardData {
  balance: number;
  activeInvestments: number;
  dailyIncome: number;
  totalInvested: number;
  totalEarned: number;
}
