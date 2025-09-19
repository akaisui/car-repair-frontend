// Authentication API endpoints

import apiClient from './index';
import { LoginRequest, RegisterRequest, AuthResponse, User, ApiResponse } from '@/types';

export const authApi = {
  /**
   * User login
   */
  login: async (credentials: LoginRequest): Promise<AuthResponse> => {
    const response = await apiClient.post<ApiResponse<AuthResponse>>('/auth/login', credentials);

    if (response.success && response.data) {
      // Store tokens
      apiClient.setToken(response.data.token);
      if (typeof window !== 'undefined') {
        localStorage.setItem('refresh_token', response.data.refreshToken);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      return response.data;
    }

    throw new Error(response.message || 'Login failed');
  },

  /**
   * User registration
   */
  register: async (userData: RegisterRequest): Promise<AuthResponse> => {
    const response = await apiClient.post<ApiResponse<AuthResponse>>('/auth/register', userData);

    if (response.success && response.data) {
      // Store tokens
      apiClient.setToken(response.data.token);
      if (typeof window !== 'undefined') {
        localStorage.setItem('refresh_token', response.data.refreshToken);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      return response.data;
    }

    throw new Error(response.message || 'Registration failed');
  },

  /**
   * Refresh access token
   */
  refreshToken: async (): Promise<{ token: string; user: User }> => {
    const refreshToken =
      typeof window !== 'undefined' ? localStorage.getItem('refresh_token') : null;

    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    const response = await apiClient.post<ApiResponse<{ token: string; user: User }>>(
      '/auth/refresh',
      { refreshToken }
    );

    if (response.success && response.data) {
      // Update token
      apiClient.setToken(response.data.token);
      if (typeof window !== 'undefined') {
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      return response.data;
    }

    throw new Error(response.message || 'Token refresh failed');
  },

  /**
   * Get user profile
   */
  getProfile: async (): Promise<User> => {
    const response = await apiClient.get<ApiResponse<User>>('/auth/profile');

    if (response.success && response.data) {
      return response.data;
    }

    throw new Error(response.message || 'Failed to get profile');
  },

  /**
   * Update user profile
   */
  updateProfile: async (profileData: Partial<User>): Promise<User> => {
    const response = await apiClient.put<ApiResponse<User>>('/auth/profile', profileData);

    if (response.success && response.data) {
      // Update stored user data
      if (typeof window !== 'undefined') {
        localStorage.setItem('user', JSON.stringify(response.data));
      }
      return response.data;
    }

    throw new Error(response.message || 'Failed to update profile');
  },

  /**
   * Change password
   */
  changePassword: async (passwordData: {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  }): Promise<void> => {
    const response = await apiClient.post<ApiResponse<null>>('/auth/change-password', passwordData);

    if (!response.success) {
      throw new Error(response.message || 'Failed to change password');
    }
  },

  /**
   * Forgot password
   */
  forgotPassword: async (email: string): Promise<void> => {
    const response = await apiClient.post<ApiResponse<null>>('/auth/forgot-password', { email });

    if (!response.success) {
      throw new Error(response.message || 'Failed to send reset email');
    }
  },

  /**
   * Reset password
   */
  resetPassword: async (resetData: {
    token: string;
    newPassword: string;
    confirmPassword: string;
  }): Promise<void> => {
    const response = await apiClient.post<ApiResponse<null>>('/auth/reset-password', resetData);

    if (!response.success) {
      throw new Error(response.message || 'Failed to reset password');
    }
  },

  /**
   * Logout
   */
  logout: async (): Promise<void> => {
    try {
      await apiClient.post<ApiResponse<null>>('/auth/logout');
    } catch (error) {
      // Continue with logout even if API call fails
      console.warn('Logout API call failed:', error);
    } finally {
      // Clear local storage
      apiClient.clearToken();
      if (typeof window !== 'undefined') {
        localStorage.removeItem('user');
      }
    }
  },

  /**
   * Check if user is authenticated
   */
  isAuthenticated: (): boolean => {
    if (typeof window === 'undefined') return false;

    const token = localStorage.getItem('auth_token');
    const user = localStorage.getItem('user');

    return !!(token && user);
  },

  /**
   * Get stored user data
   */
  getStoredUser: (): User | null => {
    if (typeof window === 'undefined') return null;

    try {
      const userData = localStorage.getItem('user');
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error('Error parsing stored user data:', error);
      return null;
    }
  },

  /**
   * Get stored token
   */
  getStoredToken: (): string | null => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('auth_token');
  },
};
