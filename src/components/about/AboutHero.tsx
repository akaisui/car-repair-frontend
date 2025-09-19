'use client';

import Link from 'next/link';
import { brand } from '@/styles/design-system';

const ArrowDownIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 14l-7 7m0 0l-7-7m7 7V3"
    />
  </svg>
);

const StarIcon = () => (
  <svg className="w-5 h-5 fill-current text-yellow-400" viewBox="0 0 24 24">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

const ShieldIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
    />
  </svg>
);

export default function AboutHero() {
  const scrollToContent = () => {
    const element = document.getElementById('about-content');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative bg-gradient-to-br from-primary-600 px-10 via-primary-700 to-primary-800 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0 bg-repeat"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.3'%3E%3Ccircle cx='5' cy='5' r='1'/%3E%3Ccircle cx='15' cy='5' r='1'/%3E%3Ccircle cx='25' cy='5' r='1'/%3E%3Ccircle cx='35' cy='5' r='1'/%3E%3Ccircle cx='5' cy='15' r='1'/%3E%3Ccircle cx='15' cy='15' r='1'/%3E%3Ccircle cx='25' cy='15' r='1'/%3E%3Ccircle cx='35' cy='15' r='1'/%3E%3Ccircle cx='5' cy='25' r='1'/%3E%3Ccircle cx='15' cy='25' r='1'/%3E%3Ccircle cx='25' cy='25' r='1'/%3E%3Ccircle cx='35' cy='25' r='1'/%3E%3Ccircle cx='5' cy='35' r='1'/%3E%3Ccircle cx='15' cy='35' r='1'/%3E%3Ccircle cx='25' cy='35' r='1'/%3E%3Ccircle cx='35' cy='35' r='1'/%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-20 h-20 bg-white/5 rounded-full blur-xl animate-pulse"></div>
        <div
          className="absolute bottom-20 right-10 w-32 h-32 bg-secondary-500/20 rounded-full blur-2xl animate-pulse"
          style={{ animationDelay: '2s' }}
        ></div>
        <div
          className="absolute top-1/2 left-1/4 w-16 h-16 bg-white/10 rounded-full blur-lg animate-bounce"
          style={{ animationDelay: '1s' }}
        ></div>
      </div>

      <div className="container-7xl relative z-10 h-full">
        <div className="flex flex-col justify-center min-h-[70vh] lg:min-h-[80vh] py-12 lg:pb-20 lg:pt-10">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Column - Content */}
            <div className="space-y-6 lg:space-y-8">
              {/* Badge */}
              <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2">
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon key={i} />
                  ))}
                </div>
                <span className="text-sm font-medium">2000+ khách hàng tin tưởng</span>
              </div>

              {/* Main Content */}
              <div className="space-y-4 lg:space-y-6">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                  <span className="block">Về</span>
                  <span className="block text-secondary-400">{brand.name}</span>
                </h1>

                <p className="text-lg md:text-xl text-white/90 leading-relaxed">
                  Hơn 10 năm kinh nghiệm trong ngành sửa chữa xe máy. Chúng tôi cam kết mang đến
                  dịch vụ chất lượng cao với đội ngũ thợ chuyên nghiệp và trang thiết bị hiện đại.
                </p>
              </div>

              {/* Quick Features - Mobile Optimized */}
              <div className="grid grid-cols-2 gap-3 lg:gap-4">
                {[
                  { icon: <ShieldIcon />, text: 'Bảo hành 6 tháng' },
                  { icon: '⚡', text: 'Sửa trong ngày' },
                  { icon: '🏆', text: '10+ năm kinh nghiệm' },
                  { icon: '👨‍🔧', text: 'Thợ chuyên nghiệp' },
                ].map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2 lg:space-x-3">
                    <div className="flex-shrink-0 w-6 h-6 lg:w-8 lg:h-8 bg-success-500/20 rounded-full flex items-center justify-center text-success-400">
                      {typeof feature.icon === 'string' ? feature.icon : feature.icon}
                    </div>
                    <span className="text-sm lg:text-base text-white/90 font-medium">
                      {feature.text}
                    </span>
                  </div>
                ))}
              </div>

              {/* CTA Buttons - Mobile Optimized */}
              <div className="flex flex-col sm:flex-row gap-3 lg:gap-4 pt-2 lg:pt-4">
                <button
                  onClick={scrollToContent}
                  className="flex-1 sm:flex-none btn btn-secondary btn-lg flex items-center justify-center space-x-2 font-semibold"
                >
                  <span>Tìm hiểu thêm</span>
                  <ArrowDownIcon />
                </button>

                <Link
                  href="/book-appointment"
                  className="flex-1 sm:flex-none btn btn-outline btn-lg flex items-center justify-center space-x-2 text-white border-white hover:bg-white hover:text-primary-600 font-semibold"
                >
                  <span>Đặt lịch ngay</span>
                </Link>
              </div>
            </div>

            {/* Right Column - Stats Card */}
            <div className="lg:block">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 lg:p-8 border border-white/20">
                <div className="text-center space-y-6">
                  <h3 className="text-xl lg:text-2xl font-bold">Thành tích của chúng tôi</h3>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 gap-4 lg:gap-6">
                    {[
                      { number: '10+', label: 'Năm kinh nghiệm', icon: '🏆' },
                      { number: '2000+', label: 'Khách hàng', icon: '👥' },
                      { number: '15', label: 'Thợ giàu KN', icon: '🔧' },
                      { number: '24/7', label: 'Hỗ trợ', icon: '⏰' },
                    ].map((stat, index) => (
                      <div key={index} className="text-center p-4 bg-white/5 rounded-xl">
                        <div className="text-2xl mb-2">{stat.icon}</div>
                        <div className="text-xl lg:text-2xl font-bold text-secondary-400">
                          {stat.number}
                        </div>
                        <div className="text-xs lg:text-sm text-white/80">{stat.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Rating */}
                  <div className="text-center pt-4 border-t border-white/20">
                    <div className="flex justify-center space-x-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon key={i} />
                      ))}
                    </div>
                    <p className="text-sm text-white/80">4.9/5 từ 500+ đánh giá</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator - Hidden on mobile */}
      <div className="hidden lg:block absolute bottom-6 left-1/2 transform -translate-x-1/2 animate-bounce">
        <button
          onClick={scrollToContent}
          className="flex flex-col items-center space-y-1 text-white/70 hover:text-white transition-colors duration-200"
        >
          <span className="text-xs font-medium">Tìm hiểu thêm</span>
          <ArrowDownIcon />
        </button>
      </div>
    </section>
  );
}
