'use client';

import { useState } from 'react';
import Link from 'next/link';
import { authApi } from '@/lib/api/auth';

export default function ForgotPasswordPage() {
  const [formData, setFormData] = useState({
    email: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await authApi.forgotPassword(formData.email);
      setSuccess(true);
    } catch (error: any) {
      setError(error.message || 'Có lỗi xảy ra. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    if (error) setError(null);
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
                Email đã được gửi!
              </h2>
              <p className="text-gray-600">
                Chúng tôi đã gửi link đặt lại mật khẩu đến email{' '}
                <span className="font-medium text-gray-900">{formData.email}</span>.
                Vui lòng kiểm tra hộp thư và làm theo hướng dẫn.
              </p>

              <div className="space-y-4">
                <Link
                  href="/login"
                  className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transform hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  Quay về đăng nhập
                </Link>

                <button
                  onClick={() => setSuccess(false)}
                  className="w-full flex justify-center py-3 px-4 border border-gray-200 text-sm font-medium rounded-xl text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-200 hover:shadow-md"
                >
                  Gửi lại email
                </button>
              </div>

              {/* Help text */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-500 mb-4">
                  Không nhận được email?
                </p>
                <div className="text-xs text-gray-400 space-y-1">
                  <p>• Kiểm tra thư mục spam/junk</p>
                  <p>• Đảm bảo email đúng chính xác</p>
                  <p>• Liên hệ hỗ trợ nếu vẫn không nhận được</p>
                </div>
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
                  Thành công!
                </h1>
                <p className="text-lg mb-8 text-white/90">
                  Email khôi phục đã được gửi thành công. Hãy kiểm tra hộp thư của bạn.
                </p>

                {/* Features */}
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="ml-3">Link có thời hạn 1 giờ</p>
                  </div>
                  <div className="flex items-center">
                    <div className="flex-shrink-0 w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="ml-3">Bảo mật tuyệt đối</p>
                  </div>
                  <div className="flex items-center">
                    <div className="flex-shrink-0 w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="ml-3">Hỗ trợ 24/7</p>
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
      {/* Left Side - Forgot Password Form */}
      <div className="flex-1 overflow-y-auto bg-gradient-to-br from-orange-50 via-white to-amber-50">
        <div className="min-h-full flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-md w-full space-y-8">
            {/* Logo & Welcome */}
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-amber-600 rounded-full blur-2xl opacity-30 animate-pulse"></div>
                  <div className="relative bg-gradient-to-br from-orange-600 to-amber-600 rounded-2xl p-4 shadow-2xl">
                    <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                    </svg>
                  </div>
                </div>
              </div>

              <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
                Quên mật khẩu?
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                Nhập email của bạn để nhận link đặt lại mật khẩu
              </p>
            </div>

            {/* Forgot Password Form */}
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

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <div className={`relative group ${focusedField === 'email' ? 'scale-[1.02]' : ''} transition-transform duration-200`}>
                  <div className={`absolute inset-0 bg-gradient-to-r ${focusedField === 'email' ? 'from-orange-600 to-amber-600' : 'from-gray-200 to-gray-200'} rounded-xl blur-sm opacity-25 group-hover:opacity-40 transition-opacity`}></div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className={`w-5 h-5 ${focusedField === 'email' ? 'text-orange-600' : 'text-gray-400'} transition-colors`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
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
                      className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 bg-white/80 backdrop-blur-sm"
                      placeholder="Nhập email của bạn"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transform hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {loading ? (
                    <div className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Đang gửi...
                    </div>
                  ) : (
                    <>
                      <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                        <svg className="h-5 w-5 text-white/70 group-hover:text-white/90 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                      </span>
                      Gửi link đặt lại
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* Back to login */}
            <div className="text-center">
              <p className="text-sm text-gray-600">
                Nhớ lại mật khẩu?{' '}
                <Link href="/login" className="font-medium text-orange-600 hover:text-orange-700 transition-colors">
                  Đăng nhập ngay
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Image/Illustration */}
      <div className="hidden lg:block lg:w-1/2 h-screen relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-600 via-orange-700 to-amber-600">
          <div className="absolute inset-0 bg-black/20"></div>

          {/* Animated Background Pattern */}
          <div className="absolute inset-0">
            <div className="absolute top-0 -left-4 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-blob"></div>
            <div className="absolute top-0 -right-4 w-72 h-72 bg-amber-300/10 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-20 w-72 h-72 bg-orange-300/10 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
          </div>

          {/* Content */}
          <div className="relative h-full flex flex-col justify-center items-center px-12 text-white">
            <div className="max-w-md">
              <h1 className="text-4xl font-bold mb-6">
                Khôi phục tài khoản
              </h1>
              <p className="text-lg mb-8 text-white/90">
                Đừng lo lắng! Việc quên mật khẩu xảy ra với tất cả mọi người. Chúng tôi sẽ giúp bạn lấy lại quyền truy cập một cách nhanh chóng và an toàn.
              </p>

              {/* Features */}
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="flex-shrink-0 w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="ml-3">Quy trình bảo mật cao</p>
                </div>
                <div className="flex items-center">
                  <div className="flex-shrink-0 w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="ml-3">Link có thời hạn an toàn</p>
                </div>
                <div className="flex items-center">
                  <div className="flex-shrink-0 w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="ml-3">Hỗ trợ 24/7</p>
                </div>
              </div>
            </div>

            {/* Bottom decoration */}
            <div className="absolute bottom-8 left-12 right-12">
              <div className="flex items-center justify-between text-white/60 text-sm">
                <p>© 2025 Sửa Xe Hồng Hậu</p>
                <div className="flex space-x-4">
                  <a href="#" className="hover:text-white transition-colors">Điều khoản</a>
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