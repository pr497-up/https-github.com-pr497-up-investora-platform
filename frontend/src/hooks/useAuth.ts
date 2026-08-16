import { useEffect, useState } from 'react';
import { useAppSelector } from './useAppDispatch';

export const useAuth = () => {
  const { user, token, loading } = useAppSelector((state) => state.auth);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setIsAuthenticated(!!token && !!user);
  }, [token, user]);

  return {
    user,
    token,
    loading,
    isAuthenticated,
  };
};
