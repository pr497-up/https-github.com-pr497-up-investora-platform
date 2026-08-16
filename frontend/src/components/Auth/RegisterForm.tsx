import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { register as registerUser } from '@/store/authSlice';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import toast from 'react-hot-toast';

const registerSchema = z
  .object({
    phone: z.string().min(9, 'Número de telefone inválido'),
    fullName: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres'),
    password: z.string().length(6, 'Senha deve ter 6 dígitos'),
    confirmPassword: z.string().length(6, 'Senha deve ter 6 dígitos'),
    referralCode: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Senhas não correspondem',
    path: ['confirmPassword'],
  });

type RegisterFormData = z.infer<typeof registerSchema>;

export const RegisterForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const result = await dispatch(
        registerUser({
          phone: data.phone,
          fullName: data.fullName,
          password: data.password,
          referralCode: data.referralCode,
        })
      );
      if (result.payload) {
        toast.success('Cadastro realizado com sucesso!');
        navigate('/dashboard');
      } else {
        toast.error('Falha no cadastro');
      }
    } catch (error) {
      toast.error('Erro ao fazer cadastro');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Nome Completo</label>
        <input
          {...register('fullName')}
          type="text"
          placeholder="João Silva"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
        {errors.fullName && <p className="text-danger text-sm mt-1">{errors.fullName.message}</p>}
      </div>

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

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Confirmar Senha</label>
        <div className="relative">
          <input
            {...register('confirmPassword')}
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="000000"
            maxLength={6}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-2.5 text-gray-600"
          >
            {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>
        {errors.confirmPassword && <p className="text-danger text-sm mt-1">{errors.confirmPassword.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Código de Convite (Opcional)</label>
        <input
          {...register('referralCode')}
          type="text"
          placeholder="REF123456789"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
        {errors.referralCode && <p className="text-danger text-sm mt-1">{errors.referralCode.message}</p>}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-primary text-white py-2 rounded-lg font-semibold hover:bg-secondary transition disabled:opacity-50"
      >
        {isSubmitting ? 'Registrando...' : 'Registrar'}
      </button>
    </form>
  );
};
