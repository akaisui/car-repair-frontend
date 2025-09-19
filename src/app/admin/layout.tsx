'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!loading && (!user || (user.role !== 'admin' && user.role !== 'staff'))) {
      router.push('/');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center">
        <div className="relative">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200"></div>
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent absolute top-0"></div>
        </div>
      </div>
    );
  }

  if (!user || (user.role !== 'admin' && user.role !== 'staff')) {
    return null;
  }

  const menuItems = [
    { href: '/admin', icon: '🏠', label: 'Tổng Quan' },
    { href: '/admin/appointments', icon: '📅', label: 'Lịch Hẹn' },
    { href: '/admin/services', icon: '🔧', label: 'Dịch Vụ' },
    { href: '/admin/customers', icon: '👥', label: 'Khách Hàng' },
    { href: '/admin/reports', icon: '📊', label: 'Báo Cáo' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Admin Navigation */}
      <nav className="bg-white/80 backdrop-blur-sm shadow-lg border-b border-gray-200/50 relative z-50">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
          <div className="flex justify-between items-center h-16 sm:h-20">
            <div className="flex items-center">
              <div className="flex items-center space-x-3">
                <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-2 sm:p-3 rounded-xl shadow-lg">
                  <span className="text-white text-xl sm:text-2xl">🔧</span>
                </div>
                <div>
                  <h1 className="text-lg sm:text-xl lg:text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
                    Admin Panel
                  </h1>
                  <p className="text-xs sm:text-sm text-gray-600 font-medium">
                    Sửa Xe Hồng Hậu
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2 sm:space-x-4">
              {/* Back to Homepage Button */}
              <a
                href="/"
                className="inline-flex items-center px-3 sm:px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <span className="hidden sm:inline">Trang Chủ</span>
              </a>

              {/* Desktop User Info */}
              <div className="hidden md:flex items-center space-x-3">
                <span className="text-sm text-gray-600">
                  Xin chào, <span className="font-semibold">{user.full_name}</span>
                </span>
                <span className={`px-3 py-1 text-xs font-medium rounded-full shadow-sm ${
                  user.role === 'admin'
                    ? 'bg-gradient-to-r from-red-100 to-red-200 text-red-800'
                    : 'bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800'
                }`}>
                  {user.role === 'admin' ? 'Admin' : 'Nhân viên'}
                </span>
              </div>

              {/* Mobile Hamburger Button */}
              <div className="md:hidden">
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="inline-flex items-center justify-center p-2 rounded-xl text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {isMobileMenuOpen ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    )}
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-sm shadow-xl border-t border-gray-200/50 z-40">
            <div className="max-w-7xl mx-auto px-3 py-4">
              {/* Mobile User Info */}
              <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-200">
                <div>
                  <p className="text-sm font-semibold text-gray-900">{user.full_name}</p>
                  <p className="text-xs text-gray-600">
                    {user.role === 'admin' ? 'Quản trị viên' : 'Nhân viên'}
                  </p>
                </div>
                <span className={`px-3 py-1 text-xs font-medium rounded-full shadow-sm ${
                  user.role === 'admin'
                    ? 'bg-gradient-to-r from-red-100 to-red-200 text-red-800'
                    : 'bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800'
                }`}>
                  {user.role === 'admin' ? 'Admin' : 'Staff'}
                </span>
              </div>

              {/* Mobile Menu Items */}
              <div className="space-y-2">
                {menuItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                      pathname === item.href
                        ? 'bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-600 shadow-sm border border-blue-200/50'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
                    }`}
                  >
                    <span className="text-lg">{item.icon}</span>
                    <span className="font-medium">{item.label}</span>
                    {pathname === item.href && (
                      <div className="ml-auto w-2 h-2 bg-blue-500 rounded-full"></div>
                    )}
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Desktop Admin Menu */}
      <div className="hidden md:block bg-white/60 backdrop-blur-sm border-b border-gray-200/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
          <nav className="flex space-x-1 sm:space-x-2">
            {menuItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`whitespace-nowrap border-b-3 py-3 sm:py-4 px-3 sm:px-4 text-xs sm:text-sm font-medium rounded-t-lg transition-all duration-200 ${
                  pathname === item.href
                    ? 'border-blue-500 text-blue-600 bg-blue-50/50'
                    : 'border-transparent text-gray-600 hover:text-blue-600 hover:bg-blue-50/30 hover:border-blue-300'
                }`}
              >
                <span className="flex items-center space-x-2">
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </span>
              </a>
            ))}
          </nav>
        </div>
      </div>

      {/* Mobile Menu Backdrop */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-30"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Main Content */}
      <main>
        {children}
      </main>
    </div>
  );
}