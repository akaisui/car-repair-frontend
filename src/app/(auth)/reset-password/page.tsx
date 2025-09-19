'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { authApi } from '@/lib/api/auth';

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [token, setToken] = useState<string | null>(null);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  useEffect(() => {
    const resetToken = searchParams.get('token');
    if (!resetToken) {
      setError('Token đặt lại mật khẩu không hợp lệ');
    } else {
      setToken(resetToken);
    }
  }, [searchParams]);

  const validateForm = () => {
    const errors: Record<string, string> = {};

    // Password validation
    if (!formData.password) {
      errors.password = 'Mật khẩu mới là bắt buộc';
    } else if (formData.password.length < 6) {
      errors.password = 'Mật khẩu phải có ít nhất 6 ký tự';
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      errors.confirmPassword = 'Vui lòng xác nhận mật khẩu';
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Mật khẩu xác nhận không khớp';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token) {
      setError('Token đặt lại mật khẩu không hợp lệ');
      return;
    }

    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);
      setError(null);

      await authApi.resetPassword({
        token,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
      });

      setSuccess(true);
    } catch (error: any) {
      setError(error.message || 'Có lỗi xảy ra, vui lòng thử lại');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));

    // Clear validation error for this field
    if (validationErrors[name]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  if (success) {
    return (
      <div className="h-screen flex">
        {/* Left Side - Success Message */}
        <div className="flex-1 overflow-y-auto bg-gradient-to-br from-green-50 via-white to-emerald-50">
          <div className="min-h-full flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
            <div className="max-w-md w-full text-center space-y-8">
              {/* Success Icon */}
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full blur-2xl opacity-30 animate-pulse"></div>
                  <div className="relative bg-gradient-to-br from-green-600 to-emerald-600 rounded-2xl p-4 shadow-2xl">
                    <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
              </div>

              <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
                Thành công!
              </h2>
              <p className="text-gray-600">
                Mật khẩu của bạn đã được cập nhật thành công. Bạn có thể đăng nhập bằng mật khẩu mới ngay bây giờ.
              </p>

              <div className="space-y-4">
                <Link
                  href="/login"
                  className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transform hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  Đăng nhập ngay
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Image/Illustration */}
        <div className="hidden lg:block lg:w-1/2 h-screen relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-green-600 via-green-700 to-emerald-600">
            <div className="absolute inset-0 bg-black/20"></div>

            {/* Animated Background Pattern */}
            <div className="absolute inset-0">
              <div className="absolute top-0 -left-4 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-blob"></div>
              <div className="absolute top-0 -right-4 w-72 h-72 bg-emerald-300/10 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
              <div className="absolute -bottom-8 left-20 w-72 h-72 bg-green-300/10 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
            </div>

            {/* Content */}
            <div className="relative h-full flex flex-col justify-center items-center px-12 text-white">
              <div className="max-w-md">
                <h1 className="text-4xl font-bold mb-6">
                  Hoàn tất!
                </h1>
                <p className="text-lg mb-8 text-white/90">
                  Mật khẩu đã được đặt lại thành công. Bạn có thể đăng nhập và tiếp tục sử dụng dịch vụ.
                </p>

                {/* Features */}
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="ml-3">Tài khoản đã được bảo mật</p>
                  </div>
                  <div className="flex items-center">
                    <div className="flex-shrink-0 w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="ml-3">Mật khẩu mới đã có hiệu lực</p>
                  </div>
                  <div className="flex items-center">
                    <div className="flex-shrink-0 w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="ml-3">Sẵn sàng đăng nhập</p>
                  </div>
                </div>
              </div>

              {/* Bottom decoration */}
              <div className="absolute bottom-8 left-12 right-12">
                <div className="flex items-center justify-between text-white/60 text-sm">
                  <p>© 2025 Sửa Xe Hồng Hậu</p>
                  <div className="flex space-x-4">
                    <a href="#" className="hover:text-white transition-colors">Hỗ trợ</a>
                    <a href="#" className="hover:text-white transition-colors">Liên hệ</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!token) {
    return (
      <div className="h-screen flex">
        {/* Left Side - Error Message */}
        <div className="flex-1 overflow-y-auto bg-gradient-to-br from-red-50 via-white to-rose-50">
          <div className="min-h-full flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
            <div className="max-w-md w-full text-center space-y-8">
              {/* Error Icon */}
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-rose-600 rounded-full blur-2xl opacity-30 animate-pulse"></div>
                  <div className="relative bg-gradient-to-br from-red-600 to-rose-600 rounded-2xl p-4 shadow-2xl">
                    <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                  </div>
                </div>
              </div>

              <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
                Link không hợp lệ
              </h2>
              <p className="text-gray-600">
                Liên kết đặt lại mật khẩu không hợp lệ hoặc đã hết hạn.
                Vui lòng yêu cầu một liên kết mới.
              </p>

              <div className="space-y-4">
                <Link
                  href="/forgot-password"
                  className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transform hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  Yêu cầu link mới
                </Link>

                <Link
                  href="/login"
                  className="w-full flex justify-center py-3 px-4 border border-gray-200 text-sm font-medium rounded-xl text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-200 hover:shadow-md"
                >
                  Quay về đăng nhập
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Image/Illustration */}
        <div className="hidden lg:block lg:w-1/2 h-screen relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-red-600 via-red-700 to-rose-600">
            <div className="absolute inset-0 bg-black/20"></div>

            {/* Animated Background Pattern */}
            <div className="absolute inset-0">
              <div className="absolute top-0 -left-4 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-blob"></div>
              <div className="absolute top-0 -right-4 w-72 h-72 bg-rose-300/10 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
              <div className="absolute -bottom-8 left-20 w-72 h-72 bg-red-300/10 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
            </div>

            {/* Content */}
            <div className="relative h-full flex flex-col justify-center items-center px-12 text-white">
              <div className="max-w-md">
                <h1 className="text-4xl font-bold mb-6">
                  Oops! Có vấn đề
                </h1>
                <p className="text-lg mb-8 text-white/90">
                  Link này đã hết hạn hoặc không hợp lệ. Đừng lo lắng, bạn có thể yêu cầu một link mới.
                </p>

                {/* Help */}
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <p className="ml-3">Link có thời hạn 1 giờ</p>
                  </div>
                  <div className="flex items-center">
                    <div className="flex-shrink-0 w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <p className="ml-3">Chỉ sử dụng được một lần</p>
                  </div>
                  <div className="flex items-center">
                    <div className="flex-shrink-0 w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <p className="ml-3">Yêu cầu link mới miễn phí</p>
                  </div>
                </div>
              </div>

              {/* Bottom decoration */}
              <div className="absolute bottom-8 left-12 right-12">
                <div className="flex items-center justify-between text-white/60 text-sm">
                  <p>© 2025 Sửa Xe Hồng Hậu</p>
                  <div className="flex space-x-4">
                    <a href="#" className="hover:text-white transition-colors">Hỗ trợ</a>
                    <a href="#" className="hover:text-white transition-colors">Liên hệ</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex">
      {/* Left Side - Reset Password Form */}
      <div className="flex-1 overflow-y-auto bg-gradient-to-br from-purple-50 via-white to-indigo-50">
        <div className="min-h-full flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-md w-full space-y-8">
            {/* Logo & Welcome */}
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full blur-2xl opacity-30 animate-pulse"></div>
                  <div className="relative bg-gradient-to-br from-purple-600 to-indigo-600 rounded-2xl p-4 shadow-2xl">
                    <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                </div>
              </div>

              <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
                Đặt lại mật khẩu
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                Nhập mật khẩu mới cho tài khoản của bạn
              </p>
            </div>

            {/* Reset Password Form */}
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              {/* Error Message */}
              {error && (
                <div className="relative">
                  <div className="absolute inset-0 bg-red-500 rounded-xl opacity-10"></div>
                  <div className="relative bg-white border border-red-200 text-red-700 px-4 py-3 rounded-xl flex items-start">
                    <svg className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    <p className="text-sm">{error}</p>
                  </div>
                </div>
              )}

              <div className="space-y-5">
                {/* Password Field */}
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                    Mật khẩu mới *
                  </label>
                  <div className={`relative group ${focusedField === 'password' ? 'scale-[1.02]' : ''} transition-transform duration-200`}>
                    <div className={`absolute inset-0 bg-gradient-to-r ${focusedField === 'password' ? 'from-purple-600 to-indigo-600' : 'from-gray-200 to-gray-200'} rounded-xl blur-sm opacity-25 group-hover:opacity-40 transition-opacity`}></div>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className={`w-5 h-5 ${focusedField === 'password' ? 'text-purple-600' : 'text-gray-400'} transition-colors`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                      </div>
                      <input
                        id="password"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        required
                        value={formData.password}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('password')}
                        onBlur={() => setFocusedField(null)}
                        className={`block w-full pl-10 pr-10 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white/80 backdrop-blur-sm ${
                          validationErrors.password
                            ? 'border-red-300 focus:ring-red-500'
                            : 'border-gray-200'
                        }`}
                        placeholder="Nhập mật khẩu mới"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      >
                        {showPassword ? (
                          <svg className="w-5 h-5 text-gray-400 hover:text-gray-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                              d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                          </svg>
                        ) : (
                          <svg className="w-5 h-5 text-gray-400 hover:text-gray-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>
                  {validationErrors.password && (
                    <p className="text-red-600 text-sm mt-1 ml-1">{validationErrors.password}</p>
                  )}
                </div>

                {/* Confirm Password Field */}
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                    Xác nhận mật khẩu *
                  </label>
                  <div className={`relative group ${focusedField === 'confirmPassword' ? 'scale-[1.02]' : ''} transition-transform duration-200`}>
                    <div className={`absolute inset-0 bg-gradient-to-r ${focusedField === 'confirmPassword' ? 'from-purple-600 to-indigo-600' : 'from-gray-200 to-gray-200'} rounded-xl blur-sm opacity-25 group-hover:opacity-40 transition-opacity`}></div>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className={`w-5 h-5 ${focusedField === 'confirmPassword' ? 'text-purple-600' : 'text-gray-400'} transition-colors`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showConfirmPassword ? 'text' : 'password'}
                        required
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('confirmPassword')}
                        onBlur={() => setFocusedField(null)}
                        className={`block w-full pl-10 pr-10 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white/80 backdrop-blur-sm ${
                          validationErrors.confirmPassword
                            ? 'border-red-300 focus:ring-red-500'
                            : 'border-gray-200'
                        }`}
                        placeholder="Nhập lại mật khẩu"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      >
                        {showConfirmPassword ? (
                          <svg className="w-5 h-5 text-gray-400 hover:text-gray-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                              d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                          </svg>
                        ) : (
                          <svg className="w-5 h-5 text-gray-400 hover:text-gray-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>
                  {validationErrors.confirmPassword && (
                    <p className="text-red-600 text-sm mt-1 ml-1">{validationErrors.confirmPassword}</p>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transform hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {loading ? (
                    <div className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Đang cập nhật...
                    </div>
                  ) : (
                    <>
                      <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                        <svg className="h-5 w-5 text-white/70 group-hover:text-white/90 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                      </span>
                      Đặt lại mật khẩu
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* Back to login */}
            <div className="text-center">
              <p className="text-sm text-gray-600">
                Nhớ lại mật khẩu?{' '}
                <Link href="/login" className="font-medium text-purple-600 hover:text-purple-700 transition-colors">
                  Đăng nhập ngay
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Image/Illustration */}
      <div className="hidden lg:block lg:w-1/2 h-screen relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-600">
          <div className="absolute inset-0 bg-black/20"></div>

          {/* Animated Background Pattern */}
          <div className="absolute inset-0">
            <div className="absolute top-0 -left-4 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-blob"></div>
            <div className="absolute top-0 -right-4 w-72 h-72 bg-indigo-300/10 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-20 w-72 h-72 bg-purple-300/10 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
          </div>

          {/* Content */}
          <div className="relative h-full flex flex-col justify-center items-center px-12 text-white">
            <div className="max-w-md">
              <h1 className="text-4xl font-bold mb-6">
                Tạo mật khẩu mới
              </h1>
              <p className="text-lg mb-8 text-white/90">
                Tạo một mật khẩu mạnh và an toàn cho tài khoản của bạn. Hãy chọn mật khẩu dễ nhớ nhưng khó đoán.
              </p>

              {/* Tips */}
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="flex-shrink-0 w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="ml-3">Ít nhất 6 ký tự</p>
                </div>
                <div className="flex items-center">
                  <div className="flex-shrink-0 w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="ml-3">Kết hợp chữ và số</p>
                </div>
                <div className="flex items-center">
                  <div className="flex-shrink-0 w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="ml-3">Tránh thông tin cá nhân</p>
                </div>
              </div>
            </div>

            {/* Bottom decoration */}
            <div className="absolute bottom-8 left-12 right-12">
              <div className="flex items-center justify-between text-white/60 text-sm">
                <p>© 2025 Sửa Xe Hồng Hậu</p>
                <div className="flex space-x-4">
                  <a href="#" className="hover:text-white transition-colors">Hỗ trợ</a>
                  <a href="#" className="hover:text-white transition-colors">Bảo mật</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}