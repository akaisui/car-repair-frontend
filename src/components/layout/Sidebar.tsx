'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { brand } from '@/styles/design-system';

// Icons for sidebar navigation
const HomeIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>
);

const ServiceIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const PriceIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const AboutIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const BlogIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
  </svg>
);

const ContactIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const CalendarIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const PhoneIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
);

const CloseIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const CarIcon = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-6 6-6-6m12 0l-6-6-6 6" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8V2M12 8l6-6M12 8L6 2" />
  </svg>
);

// Navigation menu items
const navigationItems = [
  { name: 'Trang chủ', href: '/', icon: HomeIcon },
  { name: 'Dịch vụ', href: '/services', icon: ServiceIcon },
  { name: 'Bảng giá', href: '/pricing', icon: PriceIcon },
  { name: 'Về chúng tôi', href: '/about', icon: AboutIcon },
  { name: 'Blog', href: '/blog', icon: BlogIcon },
  { name: 'Liên hệ', href: '/contact', icon: ContactIcon },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  variant?: 'default' | 'admin';
}

export default function Sidebar({ isOpen, onClose, variant = 'default' }: SidebarProps) {
  const pathname = usePathname();

  // Close sidebar when route changes
  useEffect(() => {
    onClose();
  }, [pathname, onClose]);

  // Prevent body scroll when sidebar is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Handle ESC key to close sidebar
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscKey);
    return () => document.removeEventListener('keydown', handleEscKey);
  }, [isOpen, onClose]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black transition-opacity duration-300 z-40 lg:hidden ${
          isOpen ? 'opacity-50 visible' : 'opacity-0 invisible'
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-80 bg-white shadow-xl transform transition-transform duration-300 ease-in-out z-50 lg:relative lg:translate-x-0 lg:shadow-md ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 lg:justify-center">
          <Link href="/" className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-primary-500 text-white">
              <CarIcon />
            </div>
            <div className="lg:hidden xl:block">
              <h2 className="text-xl font-bold text-primary-600">
                {brand.name}
              </h2>
              <p className="text-xs text-gray-500">
                {brand.tagline}
              </p>
            </div>
          </Link>

          <button
            onClick={onClose}
            className="p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors duration-200 lg:hidden"
            aria-label="Close sidebar"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {navigationItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center space-x-3 px-3 py-3 rounded-lg font-medium transition-all duration-200 group ${
                  isActive
                    ? 'bg-primary-50 text-primary-700 border-r-2 border-primary-500'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-primary-600'
                }`}
              >
                <Icon />
                <span className="lg:hidden xl:block">{item.name}</span>

                {/* Active indicator */}
                {isActive && (
                  <div className="w-2 h-2 rounded-full bg-primary-500 ml-auto lg:hidden xl:block" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Quick Actions */}
        <div className="p-4 border-t border-gray-200 space-y-3">
          {/* Book Appointment */}
          <Link
            href="/book-appointment"
            className="flex items-center space-x-3 w-full px-4 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-medium transition-colors duration-200"
          >
            <CalendarIcon />
            <span className="lg:hidden xl:block">Đặt lịch hẹn</span>
          </Link>

          {/* Emergency Contact */}
          <a
            href={`tel:${brand.contact.phone}`}
            className="flex items-center space-x-3 w-full px-4 py-3 border border-primary-500 text-primary-600 hover:bg-primary-50 rounded-lg font-medium transition-colors duration-200"
          >
            <PhoneIcon />
            <span className="lg:hidden xl:block">Gọi ngay</span>
          </a>
        </div>

        {/* Contact Info */}
        <div className="p-4 bg-gray-50 border-t border-gray-200 lg:hidden xl:block">
          <div className="text-center">
            <p className="text-sm font-medium text-gray-900 mb-1">
              Giờ làm việc
            </p>
            <p className="text-xs text-gray-600 mb-2">
              T2-T7: 7:00 - 19:00
            </p>
            <p className="text-xs text-gray-600">
              CN: 8:00 - 17:00
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

// Desktop Sidebar Component for admin layouts
export function DesktopSidebar({ variant = 'default' }: { variant?: 'default' | 'admin' }) {
  const pathname = usePathname();

  return (
    <div className="hidden lg:flex lg:flex-shrink-0">
      <div className="flex flex-col w-20 xl:w-80">
        <div className="flex flex-col flex-grow bg-white border-r border-gray-200 overflow-y-auto">
          {/* Logo */}
          <div className="flex items-center justify-center flex-shrink-0 px-4 py-6 xl:justify-start">
            <Link href="/" className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-primary-500 text-white">
                <CarIcon />
              </div>
              <div className="hidden xl:block">
                <h2 className="text-xl font-bold text-primary-600">
                  {brand.name}
                </h2>
                <p className="text-xs text-gray-500">
                  {brand.tagline}
                </p>
              </div>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-2 py-4 space-y-1">
            {navigationItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`group flex items-center px-2 py-3 text-sm font-medium rounded-md transition-all duration-200 ${
                    isActive
                      ? 'bg-primary-50 text-primary-700 border-r-2 border-primary-500'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-primary-600'
                  }`}
                  title={item.name}
                >
                  <Icon />
                  <span className="ml-3 hidden xl:block">{item.name}</span>

                  {/* Active indicator for collapsed sidebar */}
                  {isActive && (
                    <div className="w-2 h-2 rounded-full bg-primary-500 ml-auto xl:hidden" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Quick Actions */}
          <div className="flex-shrink-0 p-2 space-y-2">
            <Link
              href="/book-appointment"
              className="group flex items-center px-2 py-3 text-sm font-medium bg-primary-500 hover:bg-primary-600 text-white rounded-md transition-colors duration-200"
              title="Đặt lịch hẹn"
            >
              <CalendarIcon />
              <span className="ml-3 hidden xl:block">Đặt lịch hẹn</span>
            </Link>

            <a
              href={`tel:${brand.contact.phone}`}
              className="group flex items-center px-2 py-3 text-sm font-medium border border-primary-500 text-primary-600 hover:bg-primary-50 rounded-md transition-colors duration-200"
              title="Gọi ngay"
            >
              <PhoneIcon />
              <span className="ml-3 hidden xl:block">Gọi ngay</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

// Hook for sidebar state management
export function useSidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const openSidebar = () => setIsOpen(true);
  const closeSidebar = () => setIsOpen(false);
  const toggleSidebar = () => setIsOpen(!isOpen);

  return {
    isOpen,
    openSidebar,
    closeSidebar,
    toggleSidebar,
  };
}