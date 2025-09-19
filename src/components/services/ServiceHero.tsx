'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { serviceApi } from '@/lib/api/services';
import { brand } from '@/styles/design-system';

const ArrowRightIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M17 8l4 4m0 0l-4 4m4-4H3"
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

export default function ServiceHero() {
  const [stats, setStats] = useState({
    total: 15,
    active: 12,
    featured: 5,
    avgDuration: 30
  });
  const [loading, setLoading] = useState(true);

  // Fetch service statistics
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await serviceApi.getServiceStatistics();
        if (response.data) {
          setStats({
            total: response.data.active || 15,
            active: response.data.active || 12,
            featured: response.data.featured || 5,
            avgDuration: 30 // This would need to be calculated from services
          });
        }
      } catch (error) {
        console.error('Error fetching service statistics:', error);
        // Keep default values on error
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const highlights = [
    {
      icon: '⚡',
      title: 'Nhanh chóng',
      description: 'Thời gian sửa chữa tối ưu',
    },
    {
      icon: '🔧',
      title: 'Chuyên nghiệp',
      description: 'Đội ngũ thợ giàu kinh nghiệm',
    },
    {
      icon: '💰',
      title: 'Giá cả hợp lý',
      description: 'Báo giá minh bạch, cạnh tranh',
    },
    {
      icon: '🛡️',
      title: 'Bảo hành',
      description: 'Cam kết chất lượng dài hạn',
    },
  ];

  return (
    <section className="relative bg-gradient-to-br p-6 from-primary-600 via-primary-700 to-primary-800 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 border-2 border-white/30 rounded-full" />
        <div className="absolute bottom-20 right-20 w-24 h-24 border-2 border-white/30 rounded-full" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 border border-white/20 rounded-full" />
      </div>

      <div className="relative z-10 container-7xl py-10 md:pt-2 md:pb-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="space-y-8">
            {/* Main Heading */}
            <div className="space-y-4">
              <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-md border border-white/30 rounded-full px-4 py-2">
                <span className="text-secondary-400">🔧</span>
                <span className="text-sm font-medium">Dịch vụ toàn diện</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                <span className="block">Dịch Vụ</span>
                <span className="block text-secondary-400">Sửa Chữa Xe Máy</span>
              </h1>

              <p className="text-xl text-white/90 leading-relaxed max-w-2xl">
                Từ bảo dưỡng định kỳ đến sửa chữa phức tạp, chúng tôi cung cấp đầy đủ các dịch vụ
                với chất lượng cao và giá cả hợp lý.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/book-appointment"
                className="btn btn-secondary btn-lg flex items-center justify-center space-x-2"
              >
                <CalendarIcon />
                <span>Đặt lịch ngay</span>
              </Link>

              <a
                href={`tel:${brand.contact.phone}`}
                className="btn border-white text-white hover:bg-white hover:text-primary-600 btn-lg flex items-center justify-center space-x-2"
              >
                <PhoneIcon />
                <span>Tư vấn: {brand.contact.phone}</span>
              </a>
            </div>

            {/* Quick Stats */}
            <div className="flex flex-wrap gap-6 pt-4 border-t border-white/20">
              {loading ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span className="text-sm text-white/80">Đang tải thống kê...</span>
                </div>
              ) : (
                <>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-secondary-400">{stats.active}+</div>
                    <div className="text-sm text-white/80">Dịch vụ</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-secondary-400">{stats.avgDuration} phút</div>
                    <div className="text-sm text-white/80">Thời gian trung bình</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-secondary-400">98%</div>
                    <div className="text-sm text-white/80">Khách hàng hài lòng</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-secondary-400">6 tháng</div>
                    <div className="text-sm text-white/80">Bảo hành</div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Right Column - Service Highlights */}
          <div className="space-y-6">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-6 text-center">
                Tại sao chọn dịch vụ của chúng tôi?
              </h3>

              <div className="grid grid-cols-2 gap-4">
                {highlights.map((highlight, index) => (
                  <div
                    key={index}
                    className="text-center p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors duration-200"
                  >
                    <div className="text-3xl mb-2">{highlight.icon}</div>
                    <h4 className="font-semibold text-white mb-1">{highlight.title}</h4>
                    <p className="text-sm text-white/80">{highlight.description}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-white/20 text-center">
                <p className="text-white/90 mb-4">Cần tư vấn về dịch vụ phù hợp với xe của bạn?</p>
                <Link
                  href="/contact"
                  className="inline-flex items-center space-x-2 text-secondary-400 hover:text-secondary-300 font-medium"
                >
                  <span>Liên hệ tư vấn miễn phí</span>
                  <ArrowRightIcon />
                </Link>
              </div>
            </div>

            {/* Emergency Contact */}
            {/* <div className="bg-secondary-500 rounded-xl p-6 text-center">
              <h4 className="text-xl font-bold text-white mb-2">Cần hỗ trợ khẩn cấp?</h4>
              <p className="text-secondary-100 mb-4">Xe hỏng giữa đường? Gọi ngay hotline 24/7</p>
              <a
                href="tel:0901234567"
                className="btn bg-white text-secondary-600 hover:bg-gray-100 font-semibold"
              >
                Gọi ngay: 0901 234 567
              </a>
            </div> */}
          </div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/70 animate-bounce">
        <div className="flex flex-col items-center space-y-2">
          <span className="text-sm">Xem dịch vụ</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
