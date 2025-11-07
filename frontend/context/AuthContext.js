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
      .then((res) => setUser(res.data))
      .catch(() => {
        localStorage.removeItem('token');
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, []);

  const login = async (email, password) => {
    const res = await authService.login({ email, password });
    const { token, user: userPayload } = res.data;
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', token);
    }
    setUser(userPayload);
    return userPayload;
  };

  const signup = async (name, email, password) => {
    const res = await authService.signup({ name, email, password });
    const { token, user: userPayload } = res.data;
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', token);
    }
    setUser(userPayload);
    return userPayload;
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


