import React, { useEffect, useState } from 'react';
import { investmentService } from '@/services/investmentService';
import { Investment } from '@/types';
import { Navbar } from '@/components/Navbar';
import { Plus, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const PLANS = [
  { planNumber: 1, name: 'Foort Start', amount: 6500, dailyIncome: 217, returnAmount: 13000 },
  { planNumber: 2, name: 'Foort Growth', amount: 15000, dailyIncome: 500, returnAmount: 30000 },
  { planNumber: 3, name: 'Foort Premium', amount: 35000, dailyIncome: 1167, returnAmount: 70000 },
  { planNumber: 4, name: 'Foort Business', amount: 65000, dailyIncome: 2167, returnAmount: 130000 },
  { planNumber: 5, name: 'Foort Elite', amount: 103000, dailyIncome: 3434, returnAmount: 206000 },
];

export const InvestmentsPage: React.FC = () => {
  const [investments, setInvestments] = useState<Investment[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState<number | null>(null);

  useEffect(() => {
    const fetchInvestments = async () => {
      try {
        const data = await investmentService.getInvestments();
        setInvestments(data);
      } catch (error) {
        toast.error('Erro ao carregar investimentos');
      } finally {
        setLoading(false);
      }
    };

    fetchInvestments();
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
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Planos de Investimento</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          {PLANS.map((plan) => (
            <div key={plan.planNumber} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
              <h3 className="text-lg font-bold text-gray-900 mb-2">{plan.name}</h3>
              <p className="text-gray-600 text-sm mb-4">
                <TrendingUp className="inline w-4 h-4 mr-1" />
                Retorno: {(plan.returnAmount / plan.amount) * 100}%
              </p>
              <div className="space-y-2 mb-4">
                <p className="text-sm text-gray-600">
                  <strong>Investimento:</strong> {plan.amount.toLocaleString('pt-AO')} Kz
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Renda Diária:</strong> {plan.dailyIncome.toLocaleString('pt-AO')} Kz
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Retorno Total:</strong> {plan.returnAmount.toLocaleString('pt-AO')} Kz
                </p>
              </div>
              <button className="w-full bg-primary text-white py-2 rounded-lg font-semibold hover:bg-secondary transition flex items-center justify-center gap-2">
                <Plus className="w-4 h-4" />
                Investir
              </button>
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-4">Meus Investimentos</h2>
        {investments.length > 0 ? (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Plano</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Investimento</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Renda Diária</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Total Ganho</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {investments.map((inv) => (
                  <tr key={inv.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">Plano {inv.planNumber}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{inv.investmentAmount.toLocaleString('pt-AO')} Kz</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{inv.dailyIncome.toLocaleString('pt-AO')} Kz</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        inv.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {inv.status === 'active' ? 'Ativo' : 'Finalizado'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-green-600">{inv.totalEarned.toLocaleString('pt-AO')} Kz</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="bg-gray-50 rounded-lg p-8 text-center">
            <p className="text-gray-600 mb-4">Você ainda não tem investimentos</p>
            <p className="text-gray-500 text-sm">Escolha um plano acima para começar a investir</p>
          </div>
        )}
      </div>
    </>
  );
};
