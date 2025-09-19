'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { serviceApi } from '@/lib/api/services';
import { Service } from '@/types';

const SearchIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const CloseIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const ServiceIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Service category emojis mapping
const categoryEmojis: { [key: string]: string } = {
  'Bảo dưỡng': '🛢️',
  'An toàn': '🛑',
  'Lốp xe': '⚖️',
  'Điện lạnh': '❄️',
  'Hộp số': '⚙️',
  'Phanh': '🔧',
  'Động cơ': '⚡',
  'Sửa chữa': '🔨',
  'Kiểm tra': '🔍',
  'Thay thế': '🔄'
};

const getServiceEmoji = (serviceName: string, category?: string): string => {
  // Try to match by category first
  if (category && categoryEmojis[category]) {
    return categoryEmojis[category];
  }

  // Then try to match by service name keywords
  const name = serviceName.toLowerCase();
  if (name.includes('nhớt') || name.includes('dầu')) return '🛢️';
  if (name.includes('phanh')) return '🛑';
  if (name.includes('lốp') || name.includes('bánh xe')) return '⚖️';
  if (name.includes('điều hòa') || name.includes('lạnh')) return '❄️';
  if (name.includes('hộp số')) return '⚙️';
  if (name.includes('lọc')) return '🌬️';
  if (name.includes('động cơ') || name.includes('máy')) return '⚡';
  if (name.includes('kiểm tra')) return '🔍';
  if (name.includes('thay')) return '🔄';

  return '🔧'; // Default emoji
};

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [services, setServices] = useState<Service[]>([]);
  const [filteredServices, setFilteredServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Load services when modal opens
  useEffect(() => {
    if (isOpen) {
      loadServices();
      if (searchInputRef.current) {
        setTimeout(() => searchInputRef.current?.focus(), 100);
      }
    }
  }, [isOpen]);

  const loadServices = async () => {
    try {
      setLoading(true);
      const response = await serviceApi.getServicesWithPricing({
        limit: 20,
        featured: true // Get featured/popular services first
      });

      if (response.success && response.data) {
        setServices(response.data);
        setFilteredServices(response.data);
      }
    } catch (error) {
      console.error('Failed to load services:', error);
      // Keep empty array as fallback
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredServices(services);
    } else {
      const filtered = services.filter(service =>
        service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.category?.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredServices(filtered);
    }
  }, [searchQuery, services]);

  const handleServiceClick = (serviceId: number) => {
    router.push(`/services?highlight=${serviceId}`);
    onClose();
  };

  const handleViewAllServices = () => {
    if (searchQuery.trim()) {
      router.push(`/services?search=${encodeURIComponent(searchQuery)}`);
    } else {
      router.push('/services');
    }
    onClose();
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleViewAllServices();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative flex min-h-full items-center justify-center p-4">
        <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl transform transition-all duration-300">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-primary-100 rounded-lg text-primary-600">
                <SearchIcon />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Tìm kiếm dịch vụ</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all duration-200"
            >
              <CloseIcon />
            </button>
          </div>

          {/* Search Input */}
          <form onSubmit={handleSearchSubmit} className="p-6 border-b border-gray-100">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <SearchIcon />
              </div>
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Nhập tên dịch vụ hoặc loại dịch vụ..."
                className="w-full pl-12 pr-4 py-4 text-lg border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600"
                >
                  <CloseIcon />
                </button>
              )}
            </div>
          </form>

          {/* Search Results */}
          <div className="max-h-96 overflow-y-auto">
            {loading ? (
            <div className="p-12 text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mb-4"></div>
              <p className="text-gray-500">Đang tải dịch vụ...</p>
            </div>
          ) : filteredServices.length > 0 ? (
              <div className="p-6 space-y-3">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold text-gray-700">
                    {searchQuery ? `Kết quả tìm kiếm (${filteredServices.length})` : 'Dịch vụ phổ biến'}
                  </h3>
                  <button
                    onClick={handleViewAllServices}
                    className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                  >
                    Xem tất cả →
                  </button>
                </div>

                {filteredServices.map((service) => {
                  const emoji = getServiceEmoji(service.name, service.category);
                  const price = service.price || service.min_price || 0;

                  return (
                    <button
                      key={service.id}
                      onClick={() => handleServiceClick(service.id)}
                      className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-primary-50 rounded-xl transition-all duration-200 group"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="text-2xl">{emoji}</div>
                        <div className="text-left">
                          <h4 className="font-medium text-gray-900 group-hover:text-primary-700">
                            {service.name}
                          </h4>
                          <p className="text-sm text-gray-500">{service.category || 'Dịch vụ'}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-primary-600">
                          {Math.round(price).toLocaleString()}₫
                        </p>
                        <p className="text-xs text-gray-400">Từ</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="p-12 text-center">
                <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <ServiceIcon />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Không tìm thấy dịch vụ
                </h3>
                <p className="text-gray-500 mb-6">
                  Không tìm thấy dịch vụ nào phù hợp với "{searchQuery}"
                </p>
                <button
                  onClick={handleViewAllServices}
                  className="px-6 py-3 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-colors duration-200"
                >
                  Xem tất cả dịch vụ
                </button>
              </div>
            )}
          </div>

          {/* Quick Actions */}
          {searchQuery === '' && (
            <div className="p-6 border-t border-gray-100 bg-gray-50">
              <p className="text-sm text-gray-600 mb-3">Gợi ý tìm kiếm:</p>
              <div className="flex flex-wrap gap-2">
                {['Thay nhớt', 'Kiểm tra phanh', 'Cân bằng lốp', 'Điều hòa', 'Hộp số'].map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => setSearchQuery(suggestion)}
                    className="px-3 py-1 bg-white text-gray-700 text-sm rounded-full border border-gray-200 hover:border-primary-300 hover:text-primary-600 transition-all duration-200"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}