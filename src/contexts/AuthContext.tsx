'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { authApi } from '@/lib/api/auth';
import { User, AuthContextType, LoginRequest, RegisterRequest } from '@/types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Initialize auth state from localStorage
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const storedToken = authApi.getStoredToken();
        const storedUser = authApi.getStoredUser();

        if (storedToken && storedUser) {
          setToken(storedToken);
          setUser(storedUser);

          // Verify token is still valid by fetching fresh user data
          try {
            const currentUser = await authApi.getProfile();
            setUser(currentUser);
          } catch (error) {
            // Token is invalid, clear auth state
            await logout();
          }
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        await logout();
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (phone: string, password: string): Promise<void> => {
    try {
      setLoading(true);
      setError(null);

      const credentials: LoginRequest = { phone, password };
      const authResponse = await authApi.login(credentials);

      setUser(authResponse.user);
      setToken(authResponse.token);

      // Redirect based on user role
      if (authResponse.user.role === 'admin' || authResponse.user.role === 'staff') {
        router.push('/admin');
      } else {
        router.push('/');
      }
    } catch (error: any) {
      const errorMessage = error.message || 'Đăng nhập thất bại';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData: RegisterRequest): Promise<void> => {
    try {
      setLoading(true);
      setError(null);

      const authResponse = await authApi.register(userData);

      setUser(authResponse.user);
      setToken(authResponse.token);

      // Redirect to home after successful registration
      router.push('/');
    } catch (error: any) {
      const errorMessage = error.message || 'Đăng ký thất bại';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await authApi.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setUser(null);
      setToken(null);
      setError(null);
      router.push('/');
    }
  };

  const updateProfile = async (profileData: Partial<User>): Promise<void> => {
    try {
      setLoading(true);
      setError(null);

      const updatedUser = await authApi.updateProfile(profileData);
      setUser(updatedUser);
    } catch (error: any) {
      const errorMessage = error.message || 'Cập nhật thông tin thất bại';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const contextValue: AuthContextType = {
    user,
    token,
    login,
    register,
    logout,
    updateProfile,
    loading,
    error,
  };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
