'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { serviceApi, serviceUtils } from '@/lib/api/services';
import { Service } from '@/types';
import { FilterState } from './ServiceFilter';
import { useAuth } from '@/contexts/AuthContext';

// This will be replaced by API data

const StarIcon = ({ filled }: { filled: boolean }) => (
  <svg
    className={`w-4 h-4 ${filled ? 'fill-current text-yellow-400' : 'text-gray-300'}`}
    viewBox="0 0 24 24"
  >
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
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

const UserIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
    />
  </svg>
);

const ArrowRightIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M17 8l4 4m0 0l-4 4m4-4H3"
    />
  </svg>
);

const CheckIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

interface ServiceCardProps {
  service: Service;
  isHighlighted?: boolean;
}

function ServiceCard({ service, isHighlighted = false }: ServiceCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const router = useRouter();
  const { user } = useAuth();

  const handleBookingClick = () => {
    if (!user) {
      // Chưa đăng nhập -> redirect đến login với returnUrl
      router.push(`/login?returnUrl=/book-appointment?service=${service.slug || service.id}`);
    } else {
      // Đã đăng nhập -> đến trang đặt lịch với service được chọn
      router.push(`/book-appointment?service=${service.slug || service.id}`);
    }
  };

  return (
    <div
      data-service-id={service.id}
      className={`bg-white rounded-xl shadow-lg hover:shadow-2xl border border-gray-100 transition-all duration-300 overflow-hidden group transform hover:-translate-y-1 ${
        isHighlighted ? 'ring-4 ring-primary-500 ring-opacity-50 shadow-2xl border-primary-200' : ''
      }`}
    >
      {/* Service Image */}
      <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
        {service.image_url ? (
          <img
            src={`images/service/${service.image_url}`}
            alt={service.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-6xl opacity-50">{serviceUtils.getServiceIcon(service)}</span>
          </div>
        )}

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
              {serviceUtils.formatPrice(service)}
            </span>
          </div>
        </div>

        {/* Service Info Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center space-x-2 bg-gray-50 rounded-lg p-2">
            <ClockIcon />
            <div className="text-xs">
              <span className="text-gray-500 block">Thời gian</span>
              <span className="font-semibold text-gray-900">{serviceUtils.formatDuration(service.duration_minutes)}</span>
            </div>
          </div>
          <div className="flex items-center space-x-2 bg-gray-50 rounded-lg p-2">
            <ShieldIcon />
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
            isExpanded ? 'max-h-48' : 'max-h-0'
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
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex-1 bg-primary-600 text-white px-4 py-2.5 rounded-lg font-medium hover:bg-primary-700 transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            Xem chi tiết
          </button>
          <button
            onClick={handleBookingClick}
            className="bg-gradient-to-r from-secondary-500 to-secondary-600 text-white px-5 py-2.5 rounded-lg font-medium hover:from-secondary-600 hover:to-secondary-700 transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Đặt lịch
          </button>
        </div>
      </div>
    </div>
  );
}

interface ServicesGridProps {
  filters?: FilterState;
  highlightServiceId?: number | null;
}

export default function ServicesGrid({ filters, highlightServiceId }: ServicesGridProps) {
  const [services, setServices] = useState<Service[]>([]);
  const [filteredServices, setFilteredServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Fetch services from API
  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        const response = await serviceApi.getServicesWithPricing({
          limit: 50, // Get more services
        });
        if (response.data) {
          setServices(response.data);
        }
      } catch (err: any) {
        setError(err.message || 'Failed to load services');
        console.error('Error fetching services:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  // Apply filters
  useEffect(() => {
    if (!filters) {
      setFilteredServices(services);
      return;
    }

    let result = [...services];

    // Filter by category
    if (filters.category && filters.category !== 'all') {
      result = result.filter(service =>
        service.category_id === parseInt(filters.category)
      );
    }

    // Filter by price range
    if (filters.priceRange && filters.priceRange !== 'all') {
      result = result.filter(service => {
        const servicePrice = service.price || service.min_price || 0;
        switch (filters.priceRange) {
          case 'under50':
            return servicePrice < 50000;
          case '50-100':
            return servicePrice >= 50000 && servicePrice <= 100000;
          case '100-200':
            return servicePrice > 100000 && servicePrice <= 200000;
          case 'over200':
            return servicePrice > 200000;
          default:
            return true;
        }
      });
    }

    // Filter by duration
    if (filters.duration && filters.duration !== 'all') {
      result = result.filter(service => {
        const duration = service.duration_minutes || 0;
        switch (filters.duration) {
          case 'under30':
            return duration < 30;
          case '30-60':
            return duration >= 30 && duration <= 60;
          case 'over60':
            return duration > 60;
          default:
            return true;
        }
      });
    }

    // Filter by search
    if (filters.search && filters.search.trim() !== '') {
      const searchTerm = filters.search.toLowerCase();
      result = result.filter(service =>
        service.name.toLowerCase().includes(searchTerm) ||
        (service.description && service.description.toLowerCase().includes(searchTerm)) ||
        (service.short_description && service.short_description.toLowerCase().includes(searchTerm))
      );
    }

    setFilteredServices(result);
  }, [filters, services]);

  const sortOptions = [
    { value: 'featured', label: 'Phổ biến nhất' },
    { value: 'price-low', label: 'Giá thấp đến cao' },
    { value: 'price-high', label: 'Giá cao đến thấp' },
    { value: 'name', label: 'Tên A-Z' },
    { value: 'duration', label: 'Thời gian ngắn nhất' },
  ];

  const sortedServices = [...filteredServices].sort((a, b) => {
    switch (sortBy) {
      case 'featured':
        return (b.is_featured ? 1 : 0) - (a.is_featured ? 1 : 0);
      case 'price-low':
        const priceA = a.price || a.min_price || 0;
        const priceB = b.price || b.min_price || 0;
        return priceA - priceB;
      case 'price-high':
        const maxPriceA = a.price || a.max_price || 0;
        const maxPriceB = b.price || b.max_price || 0;
        return maxPriceB - maxPriceA;
      case 'name':
        return a.name.localeCompare(b.name, 'vi');
      case 'duration':
        return (a.duration_minutes || 999) - (b.duration_minutes || 999);
      default:
        return 0;
    }
  });

  // Show loading state
  if (loading) {
    return (
      <div className="space-y-6">
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
          <p className="mt-2 text-gray-600">Đang tải dịch vụ...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="space-y-6">
        <div className="text-center py-12">
          <div className="text-red-500 mb-2">❌</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Không thể tải dịch vụ</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
          >
            Thử lại
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Tất cả dịch vụ</h2>
          <p className="text-gray-600">Tìm thấy {filteredServices.length} dịch vụ</p>
        </div>

        <div className="flex items-center space-x-4">
          {/* Sort Dropdown */}
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Sắp xếp:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="form-select text-sm border-gray-300 rounded-md"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* View Toggle */}
          <div className="flex items-center border border-gray-300 rounded-md">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 ${viewMode === 'grid' ? 'bg-primary-500 text-white' : 'text-gray-500'}`}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 3h7v7H3V3zm0 11h7v7H3v-7zm11-11h7v7h-7V3zm0 11h7v7h-7v-7z" />
              </svg>
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 ${viewMode === 'list' ? 'bg-primary-500 text-white' : 'text-gray-500'}`}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div
        className={`grid gap-6 ${
          viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'
        }`}
      >
        {sortedServices.map((service) => (
          <ServiceCard
            key={service.id}
            service={service}
            isHighlighted={highlightServiceId === service.id}
          />
        ))}
      </div>

      {/* Load More */}
      <div className="text-center pt-8">
        <button className="btn btn-outline">Xem thêm dịch vụ</button>
      </div>

      {/* Bottom CTA */}
      <div className="bg-primary-50 rounded-xl p-8 mt-12">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Không tìm thấy dịch vụ phù hợp?</h3>
          <p className="text-gray-600 mb-6">
            Liên hệ với chúng tôi để được tư vấn chi tiết về nhu cầu của bạn
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="btn btn-primary">
              Liên hệ tư vấn
            </Link>
            <a href="tel:0901234567" className="btn btn-outline">
              Gọi ngay: 0901 234 567
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
