import React from 'react';
import { RegisterForm } from '@/components/Auth/RegisterForm';
import { Link } from 'react-router-dom';
import { TrendingUp } from 'lucide-react';
import { Header } from '@/components/Header';

export const RegisterPage: React.FC = () => {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-primary to-secondary flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-lg shadow-xl p-8">
            <div className="flex items-center justify-center gap-2 mb-8">
              <TrendingUp className="w-8 h-8 text-primary" />
              <h1 className="text-3xl font-bold text-primary">INVESTORA</h1>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-2">Criar Conta</h2>
            <p className="text-gray-600 mb-6">Comece a investir agora</p>

            <RegisterForm />

            <p className="text-center text-gray-600 mt-6">
              Já tem conta?{' '}
              <Link to="/login" className="text-primary font-semibold hover:underline">
                Entrar
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
