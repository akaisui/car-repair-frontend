'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { brand } from '@/styles/design-system';
import { serviceApi } from '@/lib/api/services';
import { Service } from '@/types';

const heroImages = ['/images/hero/hero1.png', '/images/hero/hero2.png', '/images/hero/hero3.png'];

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

const CheckIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

const StarIcon = () => (
  <svg className="w-5 h-5 fill-current text-yellow-400" viewBox="0 0 24 24">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

export default function HeroSection() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [featuredServices, setFeaturedServices] = useState<Service[]>([]);
  const [servicesLoading, setServicesLoading] = useState(true);

  // Auto-rotate hero images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  // Load featured services
  useEffect(() => {
    const loadFeaturedServices = async () => {
      try {
        setServicesLoading(true);
        const response = await serviceApi.getFeaturedServices(3);
        if (response.success && response.data) {
          setFeaturedServices(response.data);
        }
      } catch (error) {
        console.error('Failed to load featured services:', error);
      } finally {
        setServicesLoading(false);
      }
    };

    loadFeaturedServices();
  }, []);

  const highlights = [
    'Thợ sửa chữa có kinh nghiệm 10+ năm',
    'Cam kết sử dụng phụ tùng chính hãng',
    'Bảo hành dịch vụ lên đến 6 tháng',
    'Giá cả cạnh tranh, minh bạch',
  ];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="relative w-full h-full">
          {heroImages.map((image, index) => (
            <div
              key={image}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentImageIndex ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <Image
                src={image}
                alt={`Hero image ${index + 1}`}
                fill
                className="object-cover"
                priority={index === 0}
              />
              <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/50 to-black/40"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute inset-0 z-10">
        <div className="absolute top-20 left-10 w-20 h-20 bg-primary-500/20 rounded-full blur-xl animate-pulse" />
        <div
          className="absolute bottom-40 right-16 w-32 h-32 bg-secondary-500/20 rounded-full blur-2xl animate-pulse"
          style={{ animationDelay: '2s' }}
        />
        <div
          className="absolute top-1/2 left-1/4 w-16 h-16 bg-white/10 rounded-full blur-lg animate-bounce"
          style={{ animationDelay: '1s' }}
        />
      </div>

      {/* Content */}
      <div className="relative z-20 max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen py-8 md:py-12">
          {/* Left Column - Main Content */}
          <div className="text-white space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2">
              <div className="flex space-x-1">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} />
                ))}
              </div>
              <span className="text-sm font-medium">Được tin tưởng bởi 2000+ khách hàng</span>
            </div>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                <span className="block">{brand.name}</span>
                <span className="block text-secondary-400 text-3xl md:text-4xl lg:text-5xl mt-2">
                  {brand.tagline}
                </span>
              </h1>

              <p className="text-xl md:text-2xl text-white/90 leading-relaxed max-w-2xl">
                Chuyên sửa chữa và bảo dưỡng xe máy với đội ngũ thợ giàu kinh nghiệm. Cam kết chất
                lượng, giá cả hợp lý.
              </p>
            </div>

            {/* Highlights */}
            <div className="grid sm:grid-cols-2 gap-3">
              {highlights.map((highlight, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-success-500 rounded-full flex items-center justify-center">
                    <CheckIcon />
                  </div>
                  <span className="text-white/90 font-medium">{highlight}</span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/book-appointment"
                className="group relative overflow-hidden text-white font-bold py-4 px-8 rounded-3xl transform transition-all duration-700 ease-out hover:scale-110 hover:rotate-1 flex items-center justify-center space-x-3 min-w-52 shadow-2xl hover:shadow-orange-500/60"
                style={{
                  background:
                    'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(251, 146, 60, 0.2) 25%, rgba(234, 88, 12, 0.25) 50%, rgba(220, 38, 38, 0.2) 75%, rgba(255, 255, 255, 0.1) 100%)',
                  boxShadow:
                    '0 20px 40px rgba(251, 146, 60, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.5), inset 0 -1px 0 rgba(0, 0, 0, 0.1)',
                  backdropFilter: 'blur(20px) saturate(1.5)',
                  border: '2px solid rgba(255, 255, 255, 0.4)',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                }}
              >
                {/* Liquid shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>

                {/* Floating bubbles */}
                <div
                  className="absolute top-2 left-4 w-2 h-2 bg-white/40 rounded-full animate-bounce"
                  style={{ animationDelay: '0s', animationDuration: '2s' }}
                ></div>
                <div
                  className="absolute top-3 right-6 w-1 h-1 bg-white/50 rounded-full animate-bounce"
                  style={{ animationDelay: '0.5s', animationDuration: '1.5s' }}
                ></div>
                <div
                  className="absolute bottom-2 left-8 w-1.5 h-1.5 bg-white/30 rounded-full animate-bounce"
                  style={{ animationDelay: '1s', animationDuration: '2.5s' }}
                ></div>

                {/* Morphing background */}
                <div className="absolute inset-0 bg-gradient-to-br from-orange-300/20 via-red-400/20 to-pink-400/20 opacity-0 group-hover:opacity-100 transition-all duration-700 rounded-3xl transform group-hover:scale-110"></div>

                <span className="relative z-10 text-lg font-bold drop-shadow-lg">
                  📅 ĐẶT LỊCH NGAY
                </span>
              </Link>

              <a
                href={`tel:${brand.contact.phone}`}
                className="group relative overflow-hidden text-white font-bold py-4 px-8 rounded-3xl transform transition-all duration-700 ease-out hover:scale-110 hover:rotate-1 flex items-center justify-center space-x-3 min-w-52 shadow-2xl hover:shadow-green-500/60"
                style={{
                  background:
                    'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(34, 197, 94, 0.2) 25%, rgba(22, 163, 74, 0.25) 50%, rgba(5, 150, 105, 0.2) 75%, rgba(255, 255, 255, 0.1) 100%)',
                  boxShadow:
                    '0 20px 40px rgba(34, 197, 94, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.5), inset 0 -1px 0 rgba(0, 0, 0, 0.1)',
                  backdropFilter: 'blur(20px) saturate(1.5)',
                  border: '2px solid rgba(255, 255, 255, 0.4)',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                }}
              >
                {/* Liquid shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>

                {/* Floating bubbles */}
                <div
                  className="absolute top-2 right-4 w-2 h-2 bg-white/40 rounded-full animate-bounce"
                  style={{ animationDelay: '0.3s', animationDuration: '2.2s' }}
                ></div>
                <div
                  className="absolute top-4 left-6 w-1 h-1 bg-white/50 rounded-full animate-bounce"
                  style={{ animationDelay: '0.8s', animationDuration: '1.8s' }}
                ></div>
                <div
                  className="absolute bottom-3 right-8 w-1.5 h-1.5 bg-white/30 rounded-full animate-bounce"
                  style={{ animationDelay: '1.2s', animationDuration: '2.3s' }}
                ></div>

                {/* Morphing background */}
                <div className="absolute inset-0 bg-gradient-to-br from-green-300/20 via-emerald-400/20 to-teal-400/20 opacity-0 group-hover:opacity-100 transition-all duration-700 rounded-3xl transform group-hover:scale-110"></div>

                <span className="relative z-10 text-lg font-bold drop-shadow-lg">
                  📞 GỌI NGAY: {brand.contact.phone}
                </span>
              </a>
            </div>

            {/* Quick Info */}
            <div className="flex flex-wrap gap-6 pt-4 border-t border-white/20">
              <div className="text-center">
                <div className="text-2xl font-bold text-secondary-400">10+</div>
                <div className="text-sm text-white/80">Năm kinh nghiệm</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-secondary-400">2000+</div>
                <div className="text-sm text-white/80">Khách hàng tin tưởng</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-secondary-400">24/7</div>
                <div className="text-sm text-white/80">Hỗ trợ khẩn cấp</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-secondary-400">6 tháng</div>
                <div className="text-sm text-white/80">Bảo hành</div>
              </div>
            </div>
          </div>

          {/* Right Column - Service Preview */}
          <div className="hidden lg:block">
            <div className="glass rounded-2xl p-8 space-y-6">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-white mb-2">Dịch vụ nổi bật</h3>
                <p className="text-white/80">Những dịch vụ được khách hàng tin tưởng nhất</p>
              </div>

              <div className="space-y-4">
                {servicesLoading
                  ? // Loading skeleton
                    [1, 2, 3].map((index) => (
                      <div
                        key={index}
                        className="animate-pulse bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-white/20 rounded-lg"></div>
                          <div className="flex-1">
                            <div className="h-4 bg-white/20 rounded w-3/4 mb-2"></div>
                            <div className="h-3 bg-white/20 rounded w-1/2"></div>
                          </div>
                        </div>
                      </div>
                    ))
                  : featuredServices.map((service, index) => {
                      // Get service emoji based on name
                      const getServiceEmoji = (name: string) => {
                        const lowerName = name.toLowerCase();
                        if (lowerName.includes('nhớt') || lowerName.includes('dầu')) return '🛢️';
                        if (lowerName.includes('phanh')) return '🛑';
                        if (lowerName.includes('lốp')) return '🛞';
                        if (lowerName.includes('điện') || lowerName.includes('đánh lửa'))
                          return '⚡';
                        if (lowerName.includes('điều hòa')) return '❄️';
                        if (lowerName.includes('hộp số')) return '⚙️';
                        return '🔧';
                      };

                      const price = service.price || service.min_price || 0;

                      return (
                        <div
                          key={service.id}
                          className="relative bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20"
                        >
                          {service.is_featured && (
                            <div className="absolute -top-2 -right-2 bg-secondary-500 text-white text-xs px-2 py-1 rounded-full">
                              Phổ biến
                            </div>
                          )}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <span className="text-2xl">{getServiceEmoji(service.name)}</span>
                              <div>
                                <div className="font-semibold text-white">{service.name}</div>
                                <div className="text-sm text-white/70">
                                  Từ {Math.round(price).toLocaleString()}₫
                                </div>
                              </div>
                            </div>
                            <Link
                              href={`/book-appointment?service=${service.slug || service.id}`}
                              className="btn btn-sm btn-primary text-white hover:bg-primary-600 transition-colors"
                            >
                              Đặt lịch
                            </Link>
                          </div>
                        </div>
                      );
                    })}
              </div>

              <div className="pt-4 border-t border-white/20 text-center">
                <Link
                  href="/services"
                  className="text-secondary-400 hover:text-secondary-300 font-medium"
                >
                  Xem tất cả dịch vụ →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Image Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30">
        <div className="flex space-x-2">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentImageIndex
                  ? 'bg-secondary-500 scale-125'
                  : 'bg-white/50 hover:bg-white/70'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-8 right-8 z-30 hidden md:block">
        <div className="flex flex-col items-center space-y-2 text-white/70">
          <span className="text-sm font-medium transform rotate-90 origin-center">Cuộn xuống</span>
          <div className="w-px h-8 bg-white/50 animate-pulse" />
          <svg
            className="w-4 h-4 animate-bounce"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
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
