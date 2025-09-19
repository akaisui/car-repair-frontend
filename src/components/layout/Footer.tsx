'use client';

import { useState } from 'react';
import Link from 'next/link';
import { brand } from '@/styles/design-system';

// Icons for footer
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

const EmailIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
    />
  </svg>
);

const LocationIcon = () => (
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

const ClockIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const FacebookIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const ZaloIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.568 8.16c-.169-.224-.448-.336-.784-.336-.224 0-.448.056-.672.168-.336.168-.56.448-.672.784-.056.168-.084.364-.084.588 0 .56.224 1.064.616 1.456.392.392.896.616 1.456.616.224 0 .42-.028.588-.084.336-.112.616-.336.784-.672.112-.224.168-.448.168-.672 0-.336-.112-.615-.336-.784-.168-.112-.392-.168-.616-.168-.168 0-.336.028-.448.084zm-3.92 1.904c-.168-.056-.364-.084-.588-.084-.56 0-1.064.224-1.456.616-.392.392-.616.896-.616 1.456 0 .224.028.42.084.588.112.336.336.616.672.784.224.112.448.168.672.168.336 0 .615-.112.784-.336.112-.168.168-.392.168-.616 0-.168-.028-.336-.084-.448-.056-.168-.224-.336-.392-.448-.392-.392-.896-.616-1.456-.616z" />
  </svg>
);

const YoutubeIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

const ArrowUpIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M5 10l7-7m0 0l7 7m-7-7v18"
    />
  </svg>
);

// Operating hours data
const operatingHours = [
  { day: 'Thứ 2 - Thứ 6', time: '8:00 - 18:00' },
  { day: 'Thứ 7', time: '8:00 - 17:00' },
  { day: 'Chủ nhật', time: '9:00 - 16:00' },
  { day: 'Ngày lễ', time: 'Liên hệ trước' },
];

// Quick links data
const quickLinks = [
  { name: 'Trang chủ', href: '/' },
  { name: 'Dịch vụ sửa chữa', href: '/services' },
  { name: 'Bảng giá', href: '/pricing' },
  { name: 'Đặt lịch hẹn', href: '/book-appointment' },
  { name: 'Tra cứu lịch hẹn', href: '/track-appointment' },
  { name: 'Về chúng tôi', href: '/about' },
];

const serviceLinks = [
  { name: 'Sửa chữa cơ bản', href: '/services/basic-repair' },
  { name: 'Bảo dưỡng định kỳ', href: '/services/maintenance' },
  { name: 'Đại tu động cơ', href: '/services/engine-overhaul' },
  { name: 'Sửa chữa điện', href: '/services/electrical' },
  { name: 'Thay nhớt', href: '/services/oil-change' },
  { name: 'Cứu hộ 24/7', href: '/services/emergency' },
];

const supportLinks = [
  { name: 'Liên hệ', href: '/contact' },
  { name: 'Câu hỏi thường gặp', href: '/faq' },
  { name: 'Chính sách bảo hành', href: '/warranty' },
  { name: 'Chính sách bảo mật', href: '/privacy' },
  { name: 'Điều khoản sử dụng', href: '/terms' },
  { name: 'Khiếu nại', href: '/complaints' },
];

interface FooterProps {
  showBackToTop?: boolean;
}

export default function Footer({ showBackToTop = true }: FooterProps) {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setEmail('');
    setIsSubmitting(false);
    alert('Cảm ơn bạn đã đăng ký nhận tin khuyến mãi!');
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="bg-gray-900 text-white p-6">
      {/* Main Footer Content */}
      <div className="container-7xl py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <div className="relative">
                {/* Main Logo Container - Same as header */}
                <div className="relative p-3 rounded-2xl bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 text-white shadow-2xl">
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

                  {/* Glow Effect */}
                  <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-br from-primary-400 to-primary-600 opacity-50 blur-sm -z-10"></div>
                </div>

                {/* Badge */}
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-secondary-400 to-secondary-500 rounded-full border-2 border-white shadow-lg">
                  <div className="w-full h-full bg-secondary-500 rounded-full animate-pulse"></div>
                </div>
              </div>

              <div className="space-y-1">
                <h3 className="text-2xl font-black tracking-tight bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
                  {brand.name}
                </h3>
                <p className="text-xs font-semibold text-gray-400">{brand.tagline}</p>
              </div>
            </div>

            <p className="text-gray-300 mb-6 leading-relaxed">
              {brand.description}. Chúng tôi cam kết mang lại dịch vụ tốt nhất với đội ngũ thợ giàu
              kinh nghiệm và trang thiết bị hiện đại.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <PhoneIcon />
                <a
                  href={`tel:${brand.contact.phone}`}
                  className="hover:text-primary-400 transition-colors duration-200"
                >
                  {brand.contact.phone}
                </a>
              </div>

              <div className="flex items-center space-x-3">
                <EmailIcon />
                <a
                  href={`mailto:${brand.contact.email}`}
                  className="hover:text-primary-400 transition-colors duration-200"
                >
                  {brand.contact.email}
                </a>
              </div>

              <div className="flex items-start space-x-3">
                <LocationIcon />
                <span className="text-gray-300">{brand.contact.address}</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4 mt-6">
              <a
                href={brand.social.facebook}
                className="p-2 bg-gray-800 rounded-lg hover:bg-primary-600 transition-colors duration-200"
              >
                <FacebookIcon />
              </a>
              <a
                href={`https://zalo.me/${brand.social.zalo}`}
                className="p-2 bg-gray-800 rounded-lg hover:bg-primary-600 transition-colors duration-200"
              >
                <ZaloIcon />
              </a>
              <a
                href="#"
                className="p-2 bg-gray-800 rounded-lg hover:bg-primary-600 transition-colors duration-200"
              >
                <YoutubeIcon />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Liên kết nhanh</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-primary-400 transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Dịch vụ</h4>
            <ul className="space-y-2">
              {serviceLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-primary-400 transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Operating Hours & Newsletter */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Giờ làm việc</h4>
            <div className="space-y-2 mb-6">
              {operatingHours.map((hours, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <ClockIcon />
                  <div className="flex-1">
                    <span className="text-gray-300 text-sm">{hours.day}:</span>
                    <span className="text-white font-medium ml-2">{hours.time}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Newsletter Subscription */}
            <div className="mt-8">
              <h5 className="text-md font-semibold mb-3">Nhận tin khuyến mãi</h5>
              <p className="text-gray-400 text-sm mb-4">
                Đăng ký để nhận thông tin khuyến mãi và tips bảo dưỡng xe
              </p>
              <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email của bạn"
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  required
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Đang gửi...' : 'Đăng ký'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Support Links */}
      <div className="border-t border-gray-800">
        <div className="container-7xl py-6">
          <div className="flex flex-wrap justify-center gap-6">
            {supportLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-gray-400 hover:text-primary-400 text-sm transition-colors duration-200"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800">
        <div className="container-7xl py-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <p className="text-gray-400 text-sm">
                © {new Date().getFullYear()} {brand.name}. Tất cả quyền được bảo lưu.
              </p>
              <p className="text-gray-500 text-xs mt-1">
                Giấy phép kinh doanh số: 0123456789 do Sở KH&ĐT TP Cần Thơ cấp
              </p>
            </div>

            <div className="flex items-center space-x-4">
              <span className="text-gray-400 text-sm">Phương thức thanh toán:</span>
              <div className="flex space-x-2">
                <div className="w-8 h-5 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">
                  VN
                </div>
                <div className="w-8 h-5 bg-pink-500 rounded text-white text-xs flex items-center justify-center font-bold">
                  MM
                </div>
                <div className="w-8 h-5 bg-green-600 rounded text-white text-xs flex items-center justify-center font-bold">
                  $
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 p-3 bg-primary-600 hover:bg-primary-700 text-white rounded-full shadow-lg transition-all duration-200 hover:scale-110 z-40"
          aria-label="Back to top"
        >
          <ArrowUpIcon />
        </button>
      )}
    </footer>
  );
}

// Minimal footer for certain pages
export function MinimalFooter() {
  return (
    <footer className="bg-gray-900 text-white py-6">
      <div className="container-7xl">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-2">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-400 to-primary-600 rounded-lg blur opacity-40"></div>
              <div className="relative bg-gradient-to-br from-primary-500 to-primary-600 p-1.5 rounded-lg shadow-md">
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M10.363 11.363a2 2 0 012.828 0l.707.707a2 2 0 010 2.828l-2.828 2.829a2 2 0 01-2.829 0l-.707-.707a2 2 0 010-2.829l2.829-2.828z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M12.707 6.293a2 2 0 012.828 0l.708.707a2 2 0 010 2.829l-2.829 2.828a2 2 0 01-2.828 0l-.707-.707a2 2 0 010-2.829l2.828-2.828z"
                  />
                </svg>
              </div>
            </div>
            <span className="font-semibold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              {brand.name}
            </span>
          </div>

          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} {brand.name}. Tất cả quyền được bảo lưu.
          </p>

          <div className="flex space-x-4">
            <Link href="/privacy" className="text-gray-400 hover:text-primary-400 text-sm">
              Bảo mật
            </Link>
            <Link href="/terms" className="text-gray-400 hover:text-primary-400 text-sm">
              Điều khoản
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
