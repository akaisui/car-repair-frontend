'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { serviceApi, serviceUtils } from '@/lib/api/services';
import { Service } from '@/types';

// Mock pricing plans - will be replaced with dynamic data based on services
const staticPricingPlans = [
  {
    id: 'basic',
    name: 'Gói Cơ Bản',
    description: 'Phù hợp cho bảo dưỡng thường xuyên',
    price: 150000,
    duration: '30-45 phút',
    popular: false,
    services: ['Thay nhớt máy', 'Kiểm tra phanh', 'Kiểm tra lốp', 'Vệ sinh cơ bản', 'Kiểm tra đèn'],
    warranty: '3 tháng',
    savings: 0,
  },
  {
    id: 'standard',
    name: 'Gói Tiêu Chuẩn',
    description: 'Bảo dưỡng toàn diện nhất',
    price: 280000,
    duration: '60-90 phút',
    popular: true,
    services: [
      'Thay nhớt + lọc nhớt',
      'Kiểm tra & bảo dưỡng phanh',
      'Kiểm tra hệ thống điện',
      'Vệ sinh buồng đốt',
      'Cân bằng lốp',
      'Kiểm tra xích & nhông',
      'Vệ sinh toàn bộ xe',
    ],
    warranty: '6 tháng',
    savings: 50000,
  },
  {
    id: 'premium',
    name: 'Gói Cao Cấp',
    description: 'Chăm sóc xe như mới',
    price: 450000,
    duration: '90-120 phút',
    popular: false,
    services: [
      'Tất cả dịch vụ gói Tiêu Chuẩn',
      'Thay bugi chính hãng',
      'Vệ sinh kim phun',
      'Kiểm tra & sửa hệ thống điện',
      'Đánh bóng sơn xe',
      'Bảo dưỡng ly hợp',
      'Test toàn diện 50 điểm',
    ],
    warranty: '12 tháng',
    savings: 100000,
  },
];

// This will be replaced by API data

const CheckIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
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

const ShieldIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const StarIcon = () => (
  <svg className="w-4 h-4 fill-current text-yellow-400" viewBox="0 0 24 24">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

function formatPrice(price: number) {
  return price.toLocaleString('vi-VN') + 'đ';
}

interface PricingCardProps {
  plan: (typeof staticPricingPlans)[0];
}

function PricingCard({ plan }: PricingCardProps) {
  return (
    <div
      className={`relative bg-white rounded-2xl border-2 transition-all duration-300 hover:shadow-xl ${
        plan.popular
          ? 'border-primary-500 shadow-lg scale-105'
          : 'border-gray-200 hover:border-primary-300'
      }`}
    >
      {/* Popular Badge */}
      {plan.popular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <div className="bg-primary-500 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center space-x-1">
            <StarIcon />
            <span>Phổ biến nhất</span>
          </div>
        </div>
      )}

      <div className="p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
          <p className="text-gray-600 mb-4">{plan.description}</p>

          <div className="mb-4">
            <span className="text-4xl font-bold text-primary-600">{formatPrice(plan.price)}</span>
            {plan.savings > 0 && (
              <div className="text-sm text-success-600 mt-1">
                Tiết kiệm {formatPrice(plan.savings)}
              </div>
            )}
          </div>

          <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center space-x-1">
              <ClockIcon />
              <span>{plan.duration}</span>
            </div>
            <div className="flex items-center space-x-1">
              <ShieldIcon />
              <span>BH: {plan.warranty}</span>
            </div>
          </div>
        </div>

        {/* Services List */}
        <div className="space-y-3 mb-8">
          {plan.services.map((service, index) => (
            <div key={index} className="flex items-center space-x-3">
              <div className="flex-shrink-0 w-5 h-5 bg-success-100 text-success-600 rounded-full flex items-center justify-center">
                <CheckIcon />
              </div>
              <span className="text-gray-700">{service}</span>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="space-y-3">
          <Link
            href="/book-appointment"
            className={`w-full btn ${plan.popular ? 'btn-primary' : 'btn-outline'} btn-lg`}
          >
            Đặt lịch ngay
          </Link>

          <Link href={`/services/package/${plan.id}`} className="w-full btn btn-ghost text-center">
            Xem chi tiết
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function PricingSection() {
  const [activeTab, setActiveTab] = useState<'packages' | 'individual'>('packages');
  const [individualServices, setIndividualServices] = useState<Service[]>([]);
  const [loadingServices, setLoadingServices] = useState(false);

  // Fetch individual services for pricing
  useEffect(() => {
    if (activeTab === 'individual') {
      const fetchIndividualServices = async () => {
        try {
          setLoadingServices(true);
          const response = await serviceApi.getServicesWithPricing({
            limit: 20, // Get top services
          });
          if (response.data) {
            setIndividualServices(response.data);
          }
        } catch (error) {
          console.error('Error fetching individual services:', error);
        } finally {
          setLoadingServices(false);
        }
      };

      fetchIndividualServices();
    }
  }, [activeTab]);

  return (
    <section className="section bg-white p-6">
      <div className="container-7xl">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 bg-success-100 text-success-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <span>💰</span>
            <span>Bảng giá dịch vụ</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Giá Cả
            <span className="text-primary-600"> Minh Bạch & Hợp Lý</span>
          </h2>

          <p className="text-lg text-gray-600 leading-relaxed">
            Chúng tôi cam kết cung cấp dịch vụ chất lượng cao với mức giá cạnh tranh. Không có chi
            phí ẩn, báo giá rõ ràng từ đầu.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-12">
          <div className="bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setActiveTab('packages')}
              className={`px-6 py-3 rounded-md font-medium transition-all duration-200 ${
                activeTab === 'packages'
                  ? 'bg-white text-primary-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Gói dịch vụ
            </button>
            <button
              onClick={() => setActiveTab('individual')}
              className={`px-6 py-3 rounded-md font-medium transition-all duration-200 ${
                activeTab === 'individual'
                  ? 'bg-white text-primary-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Dịch vụ lẻ
            </button>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'packages' ? (
          <div>
            {/* Pricing Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {staticPricingPlans.map((plan) => (
                <PricingCard key={plan.id} plan={plan} />
              ))}
            </div>

            {/* Benefits Section */}
            <div className="bg-gray-50 rounded-2xl p-8 md:p-12">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Tại sao chọn gói dịch vụ?</h3>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">💰</span>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Tiết kiệm chi phí</h4>
                  <p className="text-sm text-gray-600">Tiết kiệm 15-25% so với làm dịch vụ lẻ</p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-success-100 text-success-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🛡️</span>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Bảo hành dài hạn</h4>
                  <p className="text-sm text-gray-600">Bảo hành lên đến 12 tháng cho gói cao cấp</p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-secondary-100 text-secondary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">⭐</span>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Dịch vụ toàn diện</h4>
                  <p className="text-sm text-gray-600">Kiểm tra và bảo dưỡng đầy đủ mọi bộ phận</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>
            {/* Individual Services */}
            {loadingServices ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
                <p className="mt-2 text-gray-600">Đang tải dịch vụ...</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                {individualServices.map((service) => (
                  <div
                    key={service.id}
                    className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-200"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex-1">
                        <div className="text-2xl mb-2">{serviceUtils.getServiceIcon(service)}</div>
                        <h4 className="font-semibold text-gray-900">{service.name}</h4>
                        {service.short_description && (
                          <p className="text-sm text-gray-500 mt-1">{service.short_description}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-lg font-bold text-primary-600">
                        {serviceUtils.formatPrice(service)}
                      </span>
                      <span className="text-sm text-gray-500">
                        {serviceUtils.formatDuration(service.duration_minutes)}
                      </span>
                    </div>
                    <div className="flex space-x-2">
                      <Link
                        href="/book-appointment"
                        className="flex-1 px-3 py-2 bg-primary-500 text-white text-sm font-medium rounded-md hover:bg-primary-600 transition-colors text-center"
                      >
                        Đặt lịch
                      </Link>
                      <Link
                        href={`/services/${service.slug}`}
                        className="px-3 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-50 transition-colors"
                      >
                        Chi tiết
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Individual Services Note */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-yellow-800 mb-1">Lưu ý về dịch vụ lẻ</h4>
                  <p className="text-sm text-yellow-700">
                    Giá trên chỉ mang tính chất tham khảo. Giá cuối cùng sẽ được báo sau khi kiểm
                    tra tình trạng thực tế của xe. Chúng tôi cam kết báo giá minh bạch trước khi
                    thực hiện.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl p-8 md:p-12 text-white">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Cần tư vấn về gói dịch vụ phù hợp?
            </h3>
            <p className="text-lg text-primary-100 mb-8 max-w-2xl mx-auto">
              Đội ngũ chuyên viên của chúng tôi sẽ tư vấn miễn phí để bạn chọn được gói dịch vụ phù
              hợp với nhu cầu và ngân sách.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:0901234567" className="btn bg-white text-primary-600 hover:bg-gray-100">
                Gọi tư vấn: 0901 234 567
              </a>
              <Link
                href="/contact"
                className="btn border-2 border-white text-white hover:bg-white hover:text-primary-600"
              >
                Nhắn tin tư vấn
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
