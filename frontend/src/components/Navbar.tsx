import React from 'react';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAuth } from '@/hooks/useAuth';
import { logout } from '@/store/authSlice';
import { Menu, LogOut, User, Home, TrendingUp } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

export const Navbar: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    await dispatch(logout());
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2 font-bold text-primary text-xl">
            <TrendingUp className="w-6 h-6" />
            INVESTORA
          </Link>

          {isAuthenticated && (
            <>
              {/* Desktop Menu */}
              <div className="hidden md:flex gap-6 items-center">
                <Link to="/dashboard" className="text-gray-600 hover:text-primary transition">
                  <Home className="w-5 h-5" />
                </Link>
                <Link to="/investments" className="text-gray-600 hover:text-primary transition">
                  Investimentos
                </Link>
                <Link to="/transactions" className="text-gray-600 hover:text-primary transition">
                  Transações
                </Link>
                <Link to="/profile" className="text-gray-600 hover:text-primary transition">
                  {user?.fullName}
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 bg-danger text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                >
                  <LogOut className="w-4 h-4" />
                  Sair
                </button>
              </div>

              {/* Mobile Menu */}
              <div className="md:hidden relative">
                <button
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="text-gray-600 hover:text-primary"
                >
                  <Menu className="w-6 h-6" />
                </button>
                {menuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg p-4 z-50">
                    <Link to="/dashboard" className="block py-2 text-gray-600 hover:text-primary">
                      Dashboard
                    </Link>
                    <Link to="/investments" className="block py-2 text-gray-600 hover:text-primary">
                      Investimentos
                    </Link>
                    <Link to="/transactions" className="block py-2 text-gray-600 hover:text-primary">
                      Transações
                    </Link>
                    <Link to="/profile" className="block py-2 text-gray-600 hover:text-primary">
                      Perfil
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left py-2 text-danger hover:text-red-600 font-semibold"
                    >
                      Sair
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};
