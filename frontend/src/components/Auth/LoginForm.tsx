import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { login } from '@/store/authSlice';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';

const loginSchema = z.object({
  phone: z.string().min(9, 'Número de telefone inválido'),
  password: z.string().length(6, 'Senha deve ter 6 dígitos'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export const LoginForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const result = await dispatch(login(data));
      if (result.payload) {
        toast.success('Login realizado com sucesso!');
        navigate('/dashboard');
      } else {
        toast.error('Falha no login');
      }
    } catch (error) {
      toast.error('Erro ao fazer login');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Número de Telefone</label>
        <input
          {...register('phone')}
          type="tel"
          placeholder="955748798"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
        {errors.phone && <p className="text-danger text-sm mt-1">{errors.phone.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Senha (6 dígitos)</label>
        <div className="relative">
          <input
            {...register('password')}
            type={showPassword ? 'text' : 'password'}
            placeholder="000000"
            maxLength={6}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-2.5 text-gray-600"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>
        {errors.password && <p className="text-danger text-sm mt-1">{errors.password.message}</p>}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-primary text-white py-2 rounded-lg font-semibold hover:bg-secondary transition disabled:opacity-50"
      >
        {isSubmitting ? 'Entrando...' : 'Entrar'}
      </button>
    </form>
  );
};
