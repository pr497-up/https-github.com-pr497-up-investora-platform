import React, { useEffect, useState } from 'react';
import { userService } from '@/services/userService';
import { DashboardData } from '@/types';
import { StatCard } from '@/components/StatCard';
import { TrendingUp, DollarSign, Wallet, Gift, Zap } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import toast from 'react-hot-toast';

export const DashboardPage: React.FC = () => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const dashboardData = await userService.getDashboard();
        setData(dashboardData);
      } catch (error) {
        toast.error('Erro ao carregar dashboard');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="flex items-center justify-center h-screen">Carregando...</div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <StatCard
            title="Saldo Disponível"
            value={`${data?.balance.toFixed(2)} Kz`}
            icon={<Wallet className="w-6 h-6" />}
            color="primary"
          />
          <StatCard
            title="Investimentos Ativos"
            value={data?.activeInvestments || 0}
            icon={<TrendingUp className="w-6 h-6" />}
            color="success"
          />
          <StatCard
            title="Renda Diária"
            value={`${data?.dailyIncome.toFixed(2)} Kz`}
            icon={<Zap className="w-6 h-6" />}
            color="warning"
          />
          <StatCard
            title="Total Investido"
            value={`${data?.totalInvested.toFixed(2)} Kz`}
            icon={<DollarSign className="w-6 h-6" />}
            color="primary"
          />
          <StatCard
            title="Total Ganho"
            value={`${data?.totalEarned.toFixed(2)} Kz`}
            icon={<Gift className="w-6 h-6" />}
            color="success"
          />
        </div>

        <div className="bg-blue-50 border-l-4 border-primary p-4 rounded-lg">
          <p className="text-gray-700">
            Bem-vindo à INVESTORA. A INVESTORA é uma plataforma digital criada para oferecer uma experiência de investimento
            simples, segura e eficiente.
          </p>
        </div>
      </div>
    </>
  );
};
