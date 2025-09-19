'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { brand } from '@/styles/design-system';
import NotificationDropdown from './NotificationDropdown';
import SearchModal from '@/components/search/SearchModal';

// Icons for navigation (using SVG for better performance)
const MenuIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 6h16M4 12h16M4 18h16"
    />
  </svg>
);

const CloseIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const PhoneIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
    />
  </svg>
);

const CarIcon = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 14l9-5-9-5-9 5 9 5z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
    />
  </svg>
);

const SearchIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
    />
  </svg>
);

const UserIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
    />
  </svg>
);

const MapIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
    />
  </svg>
);

const CalendarIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
    />
  </svg>
);

const LoginIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
    />
  </svg>
);

const ChevronDownIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

const LogoutIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
    />
  </svg>
);

const DashboardIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
    />
  </svg>
);

const ProfileIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
    />
  </svg>
);

const AppointmentIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
    />
  </svg>
);

const HistoryIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const TrackingIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
    />
  </svg>
);

const RewardsIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

// Navigation menu items
const navigationItems = [
  { name: 'Trang chủ', href: '/' },
  { name: 'Dịch vụ', href: '/services' },
  { name: 'Đặt lịch', href: '/book-appointment' },
  { name: 'Về chúng tôi', href: '/about' },
  { name: 'Blog', href: '/blog' },
];

interface HeaderProps {
  isScrolled?: boolean;
  variant?: 'default' | 'transparent' | 'solid';
}

export default function Header({ isScrolled = false, variant = 'default' }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const pathname = usePathname();
  const { user, logout } = useAuth();

  // Handle scroll for sticky header
  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsUserMenuOpen(false);
    setIsSearchModalOpen(false);
  }, [pathname]);

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (isUserMenuOpen && !target.closest('.user-menu-container')) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isUserMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const headerClasses = `
    fixed top-0 left-0 right-0 z-50 transition-all duration-300
    ${
      variant === 'transparent' && !isSticky
        ? 'bg-transparent backdrop-blur-sm'
        : 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100/50'
    }
    ${isSticky ? 'py-3' : 'py-4'}
  `;

  const logoClasses = `
    text-2xl font-bold transition-colors duration-200
    ${variant === 'transparent' && !isSticky ? 'text-white' : 'text-primary-600'}
  `;

  const navLinkClasses = (isActive: boolean) => `
    relative px-3 py-2 rounded-md text-sm font-medium transition-all duration-200
    ${
      variant === 'transparent' && !isSticky
        ? isActive
          ? 'text-white bg-white/20'
          : 'text-white/90 hover:text-white hover:bg-white/10'
        : isActive
          ? 'text-primary-600 bg-primary-50'
          : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
    }
  `;

  const mobileNavLinkClasses = (isActive: boolean) => `
    block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200
    ${
      isActive
        ? 'text-primary-600 bg-primary-50'
        : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
    }
  `;

  return (
    <>
      <header className={headerClasses}>
        <div className="container-7xl px-4">
          <div className="flex items-center justify-between h-18">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-4 group">
              <div className="relative">
                {/* Main Logo Container */}
                <div className="relative p-3 rounded-2xl bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 text-white shadow-2xl group-hover:shadow-primary-500/25 group-hover:scale-110 transition-all duration-500">
                  <CarIcon />

                  {/* Animated Background */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 via-transparent to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  {/* Glow Effect */}
                  <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-br from-primary-400 to-primary-600 opacity-0 group-hover:opacity-50 blur-sm transition-all duration-500 -z-10"></div>
                </div>

                {/* Badge */}
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-secondary-400 to-secondary-500 rounded-full border-2 border-white shadow-lg">
                  <div className="w-full h-full bg-secondary-500 rounded-full animate-pulse"></div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute -top-2 -left-2 w-3 h-3 bg-primary-300/30 rounded-full animate-ping"></div>
                <div
                  className="absolute -bottom-2 -right-2 w-2 h-2 bg-secondary-400/40 rounded-full animate-pulse"
                  style={{ animationDelay: '1s' }}
                ></div>
              </div>

              <div className="space-y-1">
                <h1
                  className={`${logoClasses} text-2xl font-black tracking-tight bg-gradient-to-r from-primary-600 via-primary-700 to-primary-800 bg-clip-text text-transparent group-hover:from-primary-500 group-hover:via-primary-600 group-hover:to-primary-700 transition-all duration-300`}
                >
                  {brand.name}
                </h1>
                <div className="flex items-center space-x-2">
                  <p
                    className={`text-xs font-semibold ${variant === 'transparent' && !isSticky ? 'text-white/90' : 'text-primary-600/80'}`}
                  >
                    {brand.tagline}
                  </p>
                  <div className="flex space-x-1">
                    <div className="w-1 h-1 bg-secondary-500 rounded-full animate-bounce"></div>
                    <div
                      className="w-1 h-1 bg-secondary-500 rounded-full animate-bounce"
                      style={{ animationDelay: '0.1s' }}
                    ></div>
                    <div
                      className="w-1 h-1 bg-secondary-500 rounded-full animate-bounce"
                      style={{ animationDelay: '0.2s' }}
                    ></div>
                  </div>
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-2">
              <div className="flex items-center space-x-1 bg-gray-50/80 backdrop-blur-sm rounded-full p-1">
                {navigationItems.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`
                        relative px-4 py-2.5 rounded-full text-sm font-semibold transition-all duration-300
                        ${
                          isActive
                            ? 'text-white bg-primary-500 shadow-lg'
                            : 'text-gray-700 hover:text-primary-600 hover:bg-white/70'
                        }
                      `}
                    >
                      {item.name}
                      {isActive && (
                        <div className="absolute inset-0 rounded-full bg-primary-600/20 animate-pulse"></div>
                      )}
                    </Link>
                  );
                })}
              </div>
            </nav>

            {/* Contact Info & CTA */}
            <div className="hidden lg:flex items-center space-x-3">
              {/* Phone Number */}
              <a
                href={`tel:${brand.contact.phone}`}
                className="group flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-gray-50/80 backdrop-blur-sm text-gray-700 hover:text-primary-600 hover:bg-white/90 transition-all duration-300 border border-gray-200/50"
              >
                <div className="p-1.5 rounded-lg bg-primary-100 text-primary-600 group-hover:bg-primary-500 group-hover:text-white transition-all duration-300">
                  <PhoneIcon />
                </div>
                <div>
                  <div className="text-xs text-gray-500 font-medium">Hotline</div>
                  <div className="text-sm font-bold">{brand.contact.phone}</div>
                </div>
              </a>

              {/* Google Maps */}
              <a
                href="https://www.google.com/maps/place/S%E1%BB%ADa+Xe+H%E1%BB%93ng+H%E1%BA%ADu/@9.5868415,105.9238976,13z/data=!4m14!1m7!3m6!1s0x31a052741a666a83:0xb7c6274858d83667!2zU-G7rWEgWGUgSOG7k25nIEjhuq11!8m2!3d9.5867593!4d105.9651832!16s%2Fg%2F11wfpk6gwk!3m5!1s0x31a052741a666a83:0xb7c6274858d83667!8m2!3d9.5867593!4d105.9651832!16s%2Fg%2F11wfpk6gwk?entry=ttu&g_ep=EgoyMDI1MDkxMC4wIKXMDSoASAFQAw%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                className="group p-3 rounded-xl bg-gray-50/80 backdrop-blur-sm text-gray-700 hover:text-red-600 hover:bg-red-50/80 transition-all duration-300 border border-gray-200/50 hover:border-red-200"
                title="Xem địa chỉ trên Google Maps"
              >
                <MapIcon />
              </a>

              {/* Quick Search */}
              <button
                onClick={() => setIsSearchModalOpen(true)}
                className="p-3 rounded-xl bg-gray-50/80 backdrop-blur-sm text-gray-700 hover:text-primary-600 hover:bg-white/90 transition-all duration-300 border border-gray-200/50"
                title="Tìm kiếm dịch vụ"
              >
                <SearchIcon />
              </button>

              {/* Book Appointment Button */}
              <Link
                href="/book-appointment"
                className="group relative overflow-hidden px-6 py-2.5 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex items-center space-x-2">
                  <CalendarIcon />
                  <span>Đặt lịch</span>
                </div>
              </Link>

              {/* Desktop Notifications - Only show for authenticated users */}
              {user && (
                <div className="hidden lg:block">
                  <NotificationDropdown />
                </div>
              )}

              {/* Auth Button */}
              {user ? (
                <div className="relative user-menu-container">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="group flex items-center space-x-2 px-3 py-2.5 rounded-xl bg-gray-50/80 backdrop-blur-sm text-gray-700 hover:text-primary-600 hover:bg-white/90 transition-all duration-300 border border-gray-200/50"
                  >
                    <div className="p-1.5 rounded-lg bg-primary-100 text-primary-600 group-hover:bg-primary-500 group-hover:text-white transition-all duration-300">
                      <UserIcon />
                    </div>
                    <div className="hidden xl:block">
                      <div className="text-xs text-gray-500 font-medium">Xin chào</div>
                      <div className="text-sm font-bold truncate max-w-24">{user.full_name}</div>
                    </div>
                    <div className="xl:hidden">
                      <div className="text-sm font-bold">{user.full_name.split(' ').slice(-1)[0]}</div>
                    </div>
                    <ChevronDownIcon />
                  </button>

                  {/* User Dropdown Menu */}
                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50">
                      <div className="px-4 py-2 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-900">{user.full_name}</p>
                        <p className="text-xs text-gray-500">{user.phone}</p>
                      </div>
                      <Link
                        href="/profile"
                        className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        <ProfileIcon />
                        <span>Hồ sơ cá nhân</span>
                      </Link>
                      <Link
                        href="/appointments"
                        className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        <AppointmentIcon />
                        <span>Lịch hẹn của tôi</span>
                      </Link>
                      <Link
                        href="/history"
                        className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        <HistoryIcon />
                        <span>Lịch sử dịch vụ</span>
                      </Link>
                      <Link
                        href="/tracking"
                        className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        <TrackingIcon />
                        <span>Theo dõi xe</span>
                      </Link>
                      <Link
                        href="/rewards"
                        className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        <RewardsIcon />
                        <span>Tích điểm & Ưu đãi</span>
                      </Link>
                      {/* Admin Menu - Only show for admin/staff */}
                      {(user.role === 'admin' || user.role === 'staff') && (
                        <>
                          <div className="border-t border-gray-100"></div>
                          <Link
                            href="/admin"
                            className="flex items-center space-x-3 px-4 py-2 text-sm text-red-700 hover:bg-red-50"
                          >
                            <DashboardIcon />
                            <span>Quản trị Admin</span>
                          </Link>
                        </>
                      )}
                      <div className="border-t border-gray-100 mt-1">
                        <button
                          onClick={() => {
                            logout();
                            setIsUserMenuOpen(false);
                          }}
                          className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 w-full text-left"
                        >
                          <LogoutIcon />
                          <span>Đăng xuất</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href="/login"
                  className="group flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-gray-50/80 backdrop-blur-sm text-gray-700 hover:text-primary-600 hover:bg-white/90 transition-all duration-300 border border-gray-200/50"
                >
                  <div className="p-1.5 rounded-lg bg-primary-100 text-primary-600 group-hover:bg-primary-500 group-hover:text-white transition-all duration-300">
                    <LoginIcon />
                  </div>
                  <span className="font-medium">Đăng nhập</span>
                </Link>
              )}
            </div>

            {/* Mobile actions - Notifications + Menu */}
            <div className="lg:hidden flex items-center gap-2">
              {/* Mobile Notifications - Only show for authenticated users */}
              {user && <NotificationDropdown />}

              {/* Mobile menu button */}
              <button
                onClick={toggleMobileMenu}
                className="relative p-3 rounded-xl bg-gray-50/80 backdrop-blur-sm text-gray-700 hover:text-primary-600 hover:bg-white/90 transition-all duration-300 border border-gray-200/50"
                aria-label="Toggle mobile menu"
              >
                <div
                  className={`transition-transform duration-300 ${isMobileMenuOpen ? 'rotate-180' : ''}`}
                >
                  {isMobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
                </div>
              </button>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          <div
            className={`
            lg:hidden transition-all duration-300 ease-in-out
            ${isMobileMenuOpen ? 'max-h-96 opacity-100 pb-4' : 'max-h-0 opacity-0 overflow-hidden'}
          `}
          >
            <nav className="py-4 space-y-1 bg-white border-t border-gray-100 overflow-y-auto max-h-80">
              {navigationItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link key={item.name} href={item.href} className={mobileNavLinkClasses(isActive)}>
                    {item.name}
                  </Link>
                );
              })}

              {/* Mobile Contact & CTA */}
              <div className="pt-4 border-t border-gray-100 space-y-2">
                <a
                  href={`tel:${brand.contact.phone}`}
                  className="flex items-center space-x-3 px-3 py-2 text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-md transition-colors duration-200"
                >
                  <PhoneIcon />
                  <span>{brand.contact.phone}</span>
                </a>

                <a
                  href="https://www.google.com/maps/place/S%E1%BB%ADa+Xe+H%E1%BB%93ng+H%E1%BA%ADu/@9.5868415,105.9238976,13z/data=!4m14!1m7!3m6!1s0x31a052741a666a83:0xb7c6274858d83667!2zU-G7rWEgWGUgSOG7k25nIEjhuq11!8m2!3d9.5867593!4d105.9651832!16s%2Fg%2F11wfpk6gwk!3m5!1s0x31a052741a666a83:0xb7c6274858d83667!8m2!3d9.5867593!4d105.9651832!16s%2Fg%2F11wfpk6gwk?entry=ttu&g_ep=EgoyMDI1MDkxMC4wIKXMDSoASAFQAw%3D%3D"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 px-3 py-2 text-base font-medium text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors duration-200"
                >
                  <MapIcon />
                  <span>Xem địa chỉ trên Maps</span>
                </a>

                <button
                  onClick={() => setIsSearchModalOpen(true)}
                  className="flex items-center space-x-3 px-3 py-2 text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-md transition-colors duration-200"
                >
                  <SearchIcon />
                  <span>Tìm kiếm dịch vụ</span>
                </button>

                <Link
                  href="/book-appointment"
                  className="flex items-center justify-center space-x-2 px-3 py-3 mt-3 text-base font-semibold text-center text-white bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 rounded-lg transition-all duration-200 shadow-md"
                >
                  <CalendarIcon />
                  <span>Đặt lịch hẹn ngay</span>
                </Link>

                {/* Mobile Auth Button */}
                {user ? (
                  <div className="pt-2 border-t border-gray-100 mt-3 space-y-2">
                    <div className="px-3 py-2 bg-gray-50 rounded-md">
                      <p className="text-sm font-medium text-gray-900">
                        Xin chào, {user.full_name}
                      </p>
                      <p className="text-xs text-gray-500">{user.phone}</p>
                    </div>
                    <Link
                      href="/profile"
                      className="flex items-center space-x-3 px-3 py-2 text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-md transition-colors duration-200"
                    >
                      <ProfileIcon />
                      <span>Hồ sơ cá nhân</span>
                    </Link>
                    <Link
                      href="/appointments"
                      className="flex items-center space-x-3 px-3 py-2 text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-md transition-colors duration-200"
                    >
                      <AppointmentIcon />
                      <span>Lịch hẹn của tôi</span>
                    </Link>
                    <Link
                      href="/history"
                      className="flex items-center space-x-3 px-3 py-2 text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-md transition-colors duration-200"
                    >
                      <HistoryIcon />
                      <span>Lịch sử dịch vụ</span>
                    </Link>
                    <Link
                      href="/tracking"
                      className="flex items-center space-x-3 px-3 py-2 text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-md transition-colors duration-200"
                    >
                      <TrackingIcon />
                      <span>Theo dõi xe</span>
                    </Link>
                    <Link
                      href="/rewards"
                      className="flex items-center space-x-3 px-3 py-2 text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-md transition-colors duration-200"
                    >
                      <RewardsIcon />
                      <span>Tích điểm & Ưu đãi</span>
                    </Link>
                    {/* Admin Menu - Mobile - Only show for admin/staff */}
                    {(user.role === 'admin' || user.role === 'staff') && (
                      <>
                        <div className="border-t border-gray-200 my-2"></div>
                        <Link
                          href="/admin"
                          className="flex items-center space-x-3 px-3 py-2 text-base font-medium text-red-700 hover:bg-red-50 rounded-md transition-colors duration-200"
                        >
                          <DashboardIcon />
                          <span>Quản trị Admin</span>
                        </Link>
                      </>
                    )}
                    <div className="border-t border-gray-200 mt-2 pt-2">
                      <button
                        onClick={() => {
                          logout();
                          setIsMobileMenuOpen(false);
                        }}
                        className="flex items-center space-x-3 px-3 py-3 text-base font-bold text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors duration-200 w-full text-left border-2 border-red-200"
                      >
                        <LogoutIcon />
                        <span>🚪 ĐĂNG XUẤT</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <Link
                    href="/login"
                    className="flex items-center justify-center space-x-2 px-3 py-3 mt-3 text-base font-semibold text-center text-primary-600 bg-primary-50 hover:bg-primary-100 rounded-lg transition-all duration-200"
                  >
                    <LoginIcon />
                    <span>Đăng nhập</span>
                  </Link>
                )}
              </div>
            </nav>
          </div>
        </div>
      </header>

      {/* Spacer to prevent content from being hidden behind fixed header */}
      <div className={`${isSticky ? 'h-20' : 'h-24'} transition-all duration-300`} />

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
      />
    </>
  );
}

// Sub-component for notification bar (optional)
export function NotificationBar() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-primary-600 text-white text-center py-2 px-4 relative">
      <p className="text-sm">
        🎉 <strong>Khuyến mãi đặc biệt:</strong> Giảm 20% cho khách hàng đặt lịch online.
        <Link href="/book-appointment" className="underline ml-1 hover:text-primary-200">
          Đặt lịch ngay!
        </Link>
      </p>
      <button
        onClick={() => setIsVisible(false)}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-primary-200 transition-colors duration-200"
        aria-label="Close notification"
      >
        ✕
      </button>
    </div>
  );
}

// Header variant for specific pages
export function TransparentHeader() {
  return <Header variant="transparent" />;
}

export function SolidHeader() {
  return <Header variant="solid" />;
}
