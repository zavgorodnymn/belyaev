import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const useAuthActions = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { login: authLogin, logout: authLogout } = useAuth();
  const navigate = useNavigate();

  const login = async (credentials) => {
    try {
      setLoading(true);
      setError(null);
      await authLogin(credentials);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      setError(null);
      await authLogout();
      navigate('/login');
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    login,
    logout,
    loading,
    error
  };
}; 