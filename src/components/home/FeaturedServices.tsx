'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { serviceApi, serviceUtils } from '@/lib/api/services';
import { ApiError, Service } from '@/types';

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

const ClockIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const CheckIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

export default function FeaturedServices() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hoveredService, setHoveredService] = useState<number | null>(null);
  const [expandedServices, setExpandedServices] = useState<Set<number>>(new Set());

  // Default features for services that don't have detailed descriptions
  const getDefaultFeatures = (service: Service): string[] => {
    const name = service.name.toLowerCase();

    if (name.includes('nhớt')) {
      return ['Nhớt chính hãng', 'Kiểm tra lọc gió', 'Vệ sinh buồng đốt'];
    }
    if (name.includes('lốp')) {
      return ['Lốp chính hãng', 'Vá lốp không săm', 'Cân bằng lốp'];
    }
    if (name.includes('điện')) {
      return ['Kiểm tra hệ thống điện', 'Thay bugi', 'Sửa máy phát điện'];
    }
    if (name.includes('phanh')) {
      return ['Thay má phanh', 'Bảo dưỡng ly hợp', 'Kiểm tra dầu phanh'];
    }
    if (name.includes('rửa')) {
      return ['Rửa xe máy chuyên nghiệp', 'Vệ sinh nội thất', 'Đánh bóng sơn'];
    }
    if (name.includes('cứu hộ')) {
      return ['Có mặt nhanh chóng', 'Hỗ trợ 24/7', 'Phục vụ tận nơi'];
    }
    if (name.includes('đại tu')) {
      return ['Kiểm tra toàn diện', 'Thay thế linh kiện mới', 'Bảo hành dài hạn'];
    }
    if (name.includes('bảo dưỡng')) {
      return ['Bảo dưỡng định kỳ', 'Kiểm tra chi tiết', 'Tư vấn chuyên nghiệp'];
    }

    return ['Dịch vụ chuyên nghiệp', 'Chất lượng cao', 'Giá cả hợp lý'];
  };

  useEffect(() => {
    const fetchFeaturedServices = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await serviceApi.getFeaturedServices(6);
        setServices(response.data || []);
      } catch (err) {
        const apiError = err as ApiError;
        setError(apiError.message || 'Không thể tải dữ liệu dịch vụ');
        console.error('Failed to fetch featured services:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedServices();
  }, []);

  if (loading) {
    return (
      <section className="section bg-gray-50 p-5">
        <div className="container-7xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center space-x-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <span>🔥</span>
              <span>Dịch vụ nổi bật</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Dịch Vụ Sửa Chữa Xe Máy
              <span className="text-primary-600"> Chuyên Nghiệp</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md overflow-hidden animate-pulse"
              >
                <div className="h-48 bg-gray-300"></div>
                <div className="p-6">
                  <div className="h-6 bg-gray-300 rounded mb-3"></div>
                  <div className="h-4 bg-gray-300 rounded mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded mb-4"></div>
                  <div className="space-y-2 mb-6">
                    <div className="h-3 bg-gray-300 rounded"></div>
                    <div className="h-3 bg-gray-300 rounded"></div>
                    <div className="h-3 bg-gray-300 rounded"></div>
                  </div>
                  <div className="flex space-x-2">
                    <div className="flex-1 h-10 bg-gray-300 rounded"></div>
                    <div className="h-10 w-10 bg-gray-300 rounded"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="section bg-gray-50 p-5">
        <div className="container-7xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center space-x-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <span>🔥</span>
              <span>Dịch vụ nổi bật</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Dịch Vụ Sửa Chữa Xe Máy
              <span className="text-primary-600"> Chuyên Nghiệp</span>
            </h2>
          </div>

          <div className="text-center py-12">
            <div className="text-red-500 text-lg mb-4">⚠️ {error}</div>
            <button onClick={() => window.location.reload()} className="btn btn-primary">
              Thử lại
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section bg-gray-50 p-5">
      <div className="container-7xl">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <span>🔥</span>
            <span>Dịch vụ nổi bật</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Dịch Vụ Sửa Chữa Xe Máy
            <span className="text-primary-600"> Chuyên Nghiệp</span>
          </h2>

          <p className="text-lg text-gray-600 leading-relaxed">
            Chúng tôi cung cấp đầy đủ các dịch vụ sửa chữa và bảo dưỡng xe máy với chất lượng cao,
            giá cả hợp lý và thời gian nhanh chóng.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {services.map((service) => {
            const features = getDefaultFeatures(service);
            const icon = serviceUtils.getServiceIcon(service);
            const price = serviceUtils.formatPrice(service);
            const duration = serviceUtils.formatDuration(service.duration_minutes);
            const imageUrl = serviceUtils.getImageUrl(service);

            return (
              <div
                key={service.id}
                className="bg-white rounded-xl shadow-lg hover:shadow-2xl border border-gray-100 transition-all duration-300 overflow-hidden group transform hover:-translate-y-1"
              >
                {/* Service Image */}
                <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                  {imageUrl ? (
                    <img
                      src={`/images/service/${imageUrl}`}
                      alt={service.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      onError={(e) => {
                        // Fallback to icon if image fails to load
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.nextElementSibling?.classList.remove('hidden');
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-6xl opacity-50">{icon}</span>
                    </div>
                  )}

                  {/* Fallback Icon */}
                  <div
                    className={`w-full h-full flex items-center justify-center ${imageUrl ? 'hidden' : ''}`}
                  >
                    <span className="text-6xl opacity-50">{icon}</span>
                  </div>

                  {/* Featured Badge */}
                  {service.is_featured && (
                    <div className="absolute top-4 right-4 bg-secondary-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                      Phổ biến
                    </div>
                  )}
                </div>

                {/* Card Content */}
                <div className="relative p-6 pb-4">
                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors duration-200 mb-2">
                    {service.name}
                  </h3>

                  {/* Short Description */}
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {service.short_description || service.description || 'Dịch vụ chuyên nghiệp với đội ngũ kỹ thuật viên giàu kinh nghiệm'}
                  </p>

                  {/* Price Badge */}
                  <div className="bg-gradient-to-r from-primary-50 to-primary-100 border border-primary-200 rounded-lg p-3 mb-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">Giá dịch vụ:</span>
                      <span className="text-xl font-bold text-primary-600">
                        {price}
                      </span>
                    </div>
                  </div>

                  {/* Service Info Grid */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex items-center space-x-2 bg-gray-50 rounded-lg p-2">
                      <ClockIcon />
                      <div className="text-xs">
                        <span className="text-gray-500 block">Thời gian</span>
                        <span className="font-semibold text-gray-900">{duration}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 bg-gray-50 rounded-lg p-2">
                      <div className="w-4 h-4 flex items-center justify-center">
                        <CheckIcon />
                      </div>
                      <div className="text-xs">
                        <span className="text-gray-500 block">Bảo hành</span>
                        <span className="font-semibold text-gray-900">6 tháng</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Expandable Features */}
                {service.description && (
                  <div
                    className={`transition-all duration-300 overflow-hidden ${
                      expandedServices.has(service.id) ? 'max-h-48' : 'max-h-0'
                    }`}
                  >
                    <div className="px-6 pb-4">
                      <div className="border-t border-gray-100 pt-4">
                        <h4 className="text-sm font-semibold text-gray-900 mb-3">Mô tả chi tiết:</h4>
                        <div className="text-sm text-gray-600">{service.description}</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Card Footer */}
                <div className="px-6 pb-6">
                  <div className="flex gap-3">
                    <button
                      onClick={() => {
                        const newExpanded = new Set(expandedServices);
                        if (expandedServices.has(service.id)) {
                          newExpanded.delete(service.id);
                        } else {
                          newExpanded.add(service.id);
                        }
                        setExpandedServices(newExpanded);
                      }}
                      className="flex-1 bg-primary-600 text-white px-4 py-2.5 rounded-lg font-medium hover:bg-primary-700 transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      Xem chi tiết
                    </button>
                    <Link
                      href={`/book-appointment?service=${service.slug || service.id}`}
                      className="bg-gradient-to-r from-secondary-500 to-secondary-600 text-white px-5 py-2.5 rounded-lg font-medium hover:from-secondary-600 hover:to-secondary-700 transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg flex items-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      Đặt lịch
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Section */}
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Không tìm thấy dịch vụ bạn cần?
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Chúng tôi cung cấp nhiều dịch vụ khác ngoài những dịch vụ nổi bật trên. Liên hệ với
                chúng tôi để được tư vấn chi tiết về nhu cầu của bạn.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/services" className="btn btn-primary">
                  Xem tất cả dịch vụ
                </Link>
                <Link href="/contact" className="btn btn-outline">
                  Liên hệ tư vấn
                </Link>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center">
                  <span className="text-xl">📞</span>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Gọi ngay để được hỗ trợ</div>
                  <div className="text-primary-600 font-medium">038 803 7868</div>
                </div>
              </div>

              <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                <div className="w-12 h-12 bg-success-100 text-success-600 rounded-full flex items-center justify-center">
                  <span className="text-xl">💬</span>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Chat qua Zalo</div>
                  <div className="text-success-600 font-medium">Phản hồi trong 5 phút</div>
                </div>
              </div>

              <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                <div className="w-12 h-12 bg-secondary-100 text-secondary-600 rounded-full flex items-center justify-center">
                  <span className="text-xl">🏪</span>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Ghé thăm tiệm</div>
                  <div className="text-secondary-600 font-medium">
                    541 Trần Hưng Đạo, Phường Phú Lợi, TP Cần Thơ
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
