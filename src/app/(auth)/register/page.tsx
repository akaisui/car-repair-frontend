'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';

export default function RegisterPage() {
  const { register, loading, error } = useAuth();
  const [formData, setFormData] = useState({
    phone: '',
    password: '',
    confirmPassword: '',
    full_name: '',
    email: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const validateForm = () => {
    const errors: Record<string, string> = {};

    // Full name validation
    if (!formData.full_name.trim()) {
      errors.full_name = 'Họ tên là bắt buộc';
    } else if (formData.full_name.trim().length < 2) {
      errors.full_name = 'Họ tên phải có ít nhất 2 ký tự';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      errors.email = 'Email là bắt buộc';
    } else if (!emailRegex.test(formData.email)) {
      errors.email = 'Email không hợp lệ';
    }

    // Phone validation
    const phoneRegex = /^[0-9]{10,11}$/;
    if (!formData.phone) {
      errors.phone = 'Số điện thoại là bắt buộc';
    } else if (!phoneRegex.test(formData.phone.replace(/\D/g, ''))) {
      errors.phone = 'Số điện thoại không hợp lệ (10-11 số)';
    }

    // Password validation
    if (!formData.password) {
      errors.password = 'Mật khẩu là bắt buộc';
    } else if (formData.password.length < 6) {
      errors.password = 'Mật khẩu phải có ít nhất 6 ký tự';
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      errors.confirmPassword = 'Vui lòng xác nhận mật khẩu';
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Mật khẩu xác nhận không khớp';
    }

    // Terms agreement
    if (!agreeToTerms) {
      errors.terms = 'Bạn phải đồng ý với điều khoản sử dụng';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      await register({
        phone: formData.phone,
        password: formData.password,
        full_name: formData.full_name,
        email: formData.email,
      });
    } catch (error) {
      // Error is handled by AuthContext
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear validation error for this field
    if (validationErrors[name]) {
      setValidationErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  return (
    <div className="h-screen flex">
      {/* Left Side - Register Form */}
      <div className="flex-1 overflow-y-auto bg-gradient-to-br from-emerald-50 via-white to-teal-50">
        <div className="min-h-full flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-md w-full space-y-6">
            {/* Logo & Welcome */}
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-full blur-2xl opacity-30 animate-pulse"></div>
                  <div className="relative bg-gradient-to-br from-emerald-600 to-teal-600 rounded-2xl p-4 shadow-2xl">
                    <svg
                      className="w-12 h-12 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Tạo tài khoản mới</h2>
              <p className="mt-2 text-sm text-gray-600">
                Đăng ký để sử dụng dịch vụ sửa xe chuyên nghiệp
              </p>
            </div>

            {/* Register Form */}
            <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
              {/* Error Message */}
              {error && (
                <div className="relative">
                  <div className="absolute inset-0 bg-red-500 rounded-xl opacity-10"></div>
                  <div className="relative bg-white border border-red-200 text-red-700 px-4 py-3 rounded-xl flex items-start">
                    <svg
                      className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <p className="text-sm">{error}</p>
                  </div>
                </div>
              )}

              <div className="space-y-4">
                {/* Full Name Field */}
                <div>
                  <label
                    htmlFor="full_name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Họ và tên *
                  </label>
                  <div
                    className={`relative group ${focusedField === 'full_name' ? 'scale-[1.02]' : ''} transition-transform duration-200`}
                  >
                    <div
                      className={`absolute inset-0 bg-gradient-to-r ${focusedField === 'full_name' ? 'from-emerald-600 to-teal-600' : 'from-gray-200 to-gray-200'} rounded-xl blur-sm opacity-25 group-hover:opacity-40 transition-opacity`}
                    ></div>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg
                          className={`w-5 h-5 ${focusedField === 'full_name' ? 'text-emerald-600' : 'text-gray-400'} transition-colors`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                      </div>
                      <input
                        id="full_name"
                        name="full_name"
                        type="text"
                        required
                        value={formData.full_name}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('full_name')}
                        onBlur={() => setFocusedField(null)}
                        className={`block w-full pl-10 pr-3 py-2.5 border rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 bg-white/80 backdrop-blur-sm ${
                          validationErrors.full_name
                            ? 'border-red-300 focus:ring-red-500'
                            : 'border-gray-200'
                        }`}
                        placeholder="Nhập họ và tên của bạn"
                      />
                    </div>
                  </div>
                  {validationErrors.full_name && (
                    <p className="text-red-600 text-sm mt-1 ml-1">{validationErrors.full_name}</p>
                  )}
                </div>

                {/* Email Field */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email *
                  </label>
                  <div
                    className={`relative group ${focusedField === 'email' ? 'scale-[1.02]' : ''} transition-transform duration-200`}
                  >
                    <div
                      className={`absolute inset-0 bg-gradient-to-r ${focusedField === 'email' ? 'from-emerald-600 to-teal-600' : 'from-gray-200 to-gray-200'} rounded-xl blur-sm opacity-25 group-hover:opacity-40 transition-opacity`}
                    ></div>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg
                          className={`w-5 h-5 ${focusedField === 'email' ? 'text-emerald-600' : 'text-gray-400'} transition-colors`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                          />
                        </svg>
                      </div>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('email')}
                        onBlur={() => setFocusedField(null)}
                        className={`block w-full pl-10 pr-3 py-2.5 border rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 bg-white/80 backdrop-blur-sm ${
                          validationErrors.email
                            ? 'border-red-300 focus:ring-red-500'
                            : 'border-gray-200'
                        }`}
                        placeholder="example@gmail.com"
                      />
                    </div>
                  </div>
                  {validationErrors.email && (
                    <p className="text-red-600 text-sm mt-1 ml-1">{validationErrors.email}</p>
                  )}
                </div>

                {/* Phone Field */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Số điện thoại *
                  </label>
                  <div
                    className={`relative group ${focusedField === 'phone' ? 'scale-[1.02]' : ''} transition-transform duration-200`}
                  >
                    <div
                      className={`absolute inset-0 bg-gradient-to-r ${focusedField === 'phone' ? 'from-emerald-600 to-teal-600' : 'from-gray-200 to-gray-200'} rounded-xl blur-sm opacity-25 group-hover:opacity-40 transition-opacity`}
                    ></div>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg
                          className={`w-5 h-5 ${focusedField === 'phone' ? 'text-emerald-600' : 'text-gray-400'} transition-colors`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                          />
                        </svg>
                      </div>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('phone')}
                        onBlur={() => setFocusedField(null)}
                        className={`block w-full pl-10 pr-3 py-2.5 border rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 bg-white/80 backdrop-blur-sm ${
                          validationErrors.phone
                            ? 'border-red-300 focus:ring-red-500'
                            : 'border-gray-200'
                        }`}
                        placeholder="0901234567"
                      />
                    </div>
                  </div>
                  {validationErrors.phone && (
                    <p className="text-red-600 text-sm mt-1 ml-1">{validationErrors.phone}</p>
                  )}
                </div>

                {/* Password Field */}
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Mật khẩu *
                  </label>
                  <div
                    className={`relative group ${focusedField === 'password' ? 'scale-[1.02]' : ''} transition-transform duration-200`}
                  >
                    <div
                      className={`absolute inset-0 bg-gradient-to-r ${focusedField === 'password' ? 'from-emerald-600 to-teal-600' : 'from-gray-200 to-gray-200'} rounded-xl blur-sm opacity-25 group-hover:opacity-40 transition-opacity`}
                    ></div>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg
                          className={`w-5 h-5 ${focusedField === 'password' ? 'text-emerald-600' : 'text-gray-400'} transition-colors`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                          />
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
                        className={`block w-full pl-10 pr-10 py-2.5 border rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 bg-white/80 backdrop-blur-sm ${
                          validationErrors.password
                            ? 'border-red-300 focus:ring-red-500'
                            : 'border-gray-200'
                        }`}
                        placeholder="Nhập mật khẩu"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      >
                        {showPassword ? (
                          <svg
                            className="w-5 h-5 text-gray-400 hover:text-gray-600 transition-colors"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                            />
                          </svg>
                        ) : (
                          <svg
                            className="w-5 h-5 text-gray-400 hover:text-gray-600 transition-colors"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            />
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
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Xác nhận mật khẩu *
                  </label>
                  <div
                    className={`relative group ${focusedField === 'confirmPassword' ? 'scale-[1.02]' : ''} transition-transform duration-200`}
                  >
                    <div
                      className={`absolute inset-0 bg-gradient-to-r ${focusedField === 'confirmPassword' ? 'from-emerald-600 to-teal-600' : 'from-gray-200 to-gray-200'} rounded-xl blur-sm opacity-25 group-hover:opacity-40 transition-opacity`}
                    ></div>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg
                          className={`w-5 h-5 ${focusedField === 'confirmPassword' ? 'text-emerald-600' : 'text-gray-400'} transition-colors`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
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
                        className={`block w-full pl-10 pr-10 py-2.5 border rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 bg-white/80 backdrop-blur-sm ${
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
                          <svg
                            className="w-5 h-5 text-gray-400 hover:text-gray-600 transition-colors"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                            />
                          </svg>
                        ) : (
                          <svg
                            className="w-5 h-5 text-gray-400 hover:text-gray-600 transition-colors"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            />
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>
                  {validationErrors.confirmPassword && (
                    <p className="text-red-600 text-sm mt-1 ml-1">
                      {validationErrors.confirmPassword}
                    </p>
                  )}
                </div>
              </div>

              {/* Terms Agreement */}
              <div>
                <label className="flex items-start">
                  <input
                    type="checkbox"
                    checked={agreeToTerms}
                    onChange={(e) => setAgreeToTerms(e.target.checked)}
                    className={`h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded mt-1 ${
                      validationErrors.terms ? 'border-red-300' : ''
                    }`}
                  />
                  <span className="ml-3 text-sm text-gray-600">
                    Tôi đồng ý với{' '}
                    <Link
                      href="/terms"
                      className="text-emerald-600 hover:text-emerald-700 font-medium transition-colors"
                    >
                      điều khoản sử dụng
                    </Link>{' '}
                    và{' '}
                    <Link
                      href="/privacy"
                      className="text-emerald-600 hover:text-emerald-700 font-medium transition-colors"
                    >
                      chính sách bảo mật
                    </Link>
                  </span>
                </label>
                {validationErrors.terms && (
                  <p className="text-red-600 text-sm mt-1 ml-1">{validationErrors.terms}</p>
                )}
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transform hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {loading ? (
                    <div className="flex items-center">
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Đang tạo tài khoản...
                    </div>
                  ) : (
                    <>
                      <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                        <svg
                          className="h-5 w-5 text-white/70 group-hover:text-white/90 transition-colors"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                          />
                        </svg>
                      </span>
                      Tạo tài khoản
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* Login link */}
            <div className="text-center">
              <p className="text-sm text-gray-600">
                Đã có tài khoản?{' '}
                <Link
                  href="/login"
                  className="font-medium text-emerald-600 hover:text-emerald-700 transition-colors"
                >
                  Đăng nhập ngay
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Image/Illustration */}
      <div className="hidden lg:block lg:w-1/2 h-screen relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-600">
          <div className="absolute inset-0 bg-black/20"></div>

          {/* Animated Background Pattern */}
          <div className="absolute inset-0">
            <div className="absolute top-0 -left-4 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-blob"></div>
            <div className="absolute top-0 -right-4 w-72 h-72 bg-teal-300/10 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-20 w-72 h-72 bg-emerald-300/10 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
          </div>

          {/* Content */}
          <div className="relative h-full flex flex-col justify-center items-center px-12 text-white">
            <div className="max-w-md">
              <h1 className="text-4xl font-bold mb-6">Gia nhập cộng đồng</h1>
              <p className="text-lg mb-8 text-white/90">
                Tạo tài khoản để trải nghiệm dịch vụ sửa xe chuyên nghiệp và nhiều ưu đãi hấp dẫn.
              </p>

              {/* Benefits */}
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="flex-shrink-0 w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <p className="ml-3">Đặt lịch hẹn nhanh chóng</p>
                </div>
                <div className="flex items-center">
                  <div className="flex-shrink-0 w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <p className="ml-3">Tích điểm và nhận ưu đãi</p>
                </div>
                <div className="flex items-center">
                  <div className="flex-shrink-0 w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <p className="ml-3">Quản lý xe và lịch sử bảo dưỡng</p>
                </div>
                <div className="flex items-center">
                  <div className="flex-shrink-0 w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <p className="ml-3">Hỗ trợ 24/7 khi cần thiết</p>
                </div>
              </div>
            </div>

            {/* Bottom decoration */}
            <div className="absolute bottom-8 left-12 right-12">
              <div className="flex items-center justify-between text-white/60 text-sm">
                <p>© 2025 Sửa Xe Hồng Hậu</p>
                <div className="flex space-x-4">
                  <a href="#" className="hover:text-white transition-colors">
                    Hỗ trợ
                  </a>
                  <a href="#" className="hover:text-white transition-colors">
                    Liên hệ
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
