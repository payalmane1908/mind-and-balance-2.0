import { createContext, useContext, useEffect, useState } from 'react';
import { authService } from '../utils/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (!token) {
      setLoading(false);
      return;
    }
    authService.getProfile()
      .then((res) => {
        if (res && res.data) {
          setUser(res.data);
        }
      })
      .catch((err) => {
        console.error('Failed to get profile:', err);
        if (typeof window !== 'undefined') {
          localStorage.removeItem('token');
        }
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, []);

  const login = async (email, password) => {
    try {
      const res = await authService.login({ email, password });
      if (res && res.data) {
        const { token, user: userPayload } = res.data;
        if (typeof window !== 'undefined' && token) {
          localStorage.setItem('token', token);
        }
        setUser(userPayload);
        return userPayload;
      }
      throw new Error('Invalid response from server');
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const signup = async (name, email, password) => {
    try {
      const res = await authService.signup({ name, email, password });
      if (res && res.data) {
        const { token, user: userPayload } = res.data;
        if (typeof window !== 'undefined' && token) {
          localStorage.setItem('token', token);
        }
        setUser(userPayload);
        return userPayload;
      }
      throw new Error('Invalid response from server');
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    }
  };

  const logout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
    }
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}


