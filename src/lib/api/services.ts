import apiClient from './index';
import { ApiResponse, Service, ServiceCategory, PaginatedResponse } from '@/types';

export interface ServiceSearchFilters {
  category_id?: number;
  price_min?: number;
  price_max?: number;
  duration_min?: number;
  duration_max?: number;
  is_featured?: boolean;
  search?: string;
}

/**
 * Service API functions
 */
export const serviceApi = {
  /**
   * Get featured services
   */
  getFeaturedServices: async (limit?: number): Promise<ApiResponse<Service[]>> => {
    const params = limit ? { limit } : {};
    return apiClient.get<ApiResponse<Service[]>>('/services/featured', params);
  },

  /**
   * Get all services with pagination
   */
  getServices: async (params?: {
    page?: number;
    limit?: number;
    category_id?: number;
    is_active?: boolean;
    is_featured?: boolean;
  }): Promise<ApiResponse<Service[]>> => {
    return apiClient.get<ApiResponse<Service[]>>('/services', params);
  },

  /**
   * Get active services (public endpoint)
   */
  getActiveServices: async (params?: {
    page?: number;
    limit?: number;
  }): Promise<ApiResponse<Service[]>> => {
    return apiClient.get<ApiResponse<Service[]>>('/services/active', params);
  },

  /**
   * Search services
   */
  searchServices: async (
    filters: ServiceSearchFilters,
    params?: { page?: number; limit?: number }
  ): Promise<ApiResponse<Service[]>> => {
    return apiClient.get<ApiResponse<Service[]>>('/services/search', { ...filters, ...params });
  },

  /**
   * Get service by ID
   */
  getServiceById: async (id: number): Promise<ApiResponse<Service>> => {
    return apiClient.get<ApiResponse<Service>>(`/services/${id}`);
  },

  /**
   * Get service by slug
   */
  getServiceBySlug: async (slug: string): Promise<ApiResponse<Service>> => {
    return apiClient.get<ApiResponse<Service>>(`/services/slug/${slug}`);
  },

  /**
   * Get services by classification
   */
  getServicesByClassification: async (
    classification: 'basic' | 'advanced' | 'special'
  ): Promise<ApiResponse<Service[]>> => {
    return apiClient.get<ApiResponse<Service[]>>(`/services/classification/${classification}`);
  },

  /**
   * Get services by category
   */
  getServicesByCategory: async (
    categoryId: number,
    params?: { page?: number; limit?: number }
  ): Promise<ApiResponse<Service[]>> => {
    return apiClient.get<ApiResponse<Service[]>>(`/services/category/${categoryId}`, params);
  },

  /**
   * Get popular services
   */
  getPopularServices: async (limit?: number): Promise<ApiResponse<Service[]>> => {
    const params = limit ? { limit } : {};
    return apiClient.get<ApiResponse<Service[]>>('/services/popular', params);
  },

  /**
   * Get services with pricing
   */
  getServicesWithPricing: async (params?: {
    page?: number;
    limit?: number;
    category_id?: number;
  }): Promise<ApiResponse<Service[]>> => {
    return apiClient.get<ApiResponse<Service[]>>('/services/with-pricing', params);
  },

  /**
   * Get service statistics
   */
  getServiceStatistics: async (): Promise<ApiResponse<{
    total: number;
    active: number;
    featured: number;
    by_category: Array<{ category_name: string; count: number }>;
  }>> => {
    return apiClient.get<ApiResponse<any>>('/services/statistics');
  },
};

/**
 * Service Category API functions
 */
export const serviceCategoryApi = {
  /**
   * Get active service categories
   */
  getActiveCategories: async (): Promise<ApiResponse<ServiceCategory[]>> => {
    return apiClient.get<ApiResponse<ServiceCategory[]>>('/services/categories/active');
  },

  /**
   * Get categories with service count
   */
  getCategoriesWithServiceCount: async (): Promise<ApiResponse<(ServiceCategory & { service_count: number })[]>> => {
    return apiClient.get<ApiResponse<any>>('/services/categories/with-count');
  },

  /**
   * Get all service categories with pagination
   */
  getServiceCategories: async (params?: {
    page?: number;
    limit?: number;
    is_active?: boolean;
  }): Promise<PaginatedResponse<ServiceCategory>> => {
    return apiClient.get<PaginatedResponse<ServiceCategory>>('/services/categories', params);
  },

  /**
   * Get service category by ID
   */
  getCategoryById: async (id: number): Promise<ApiResponse<ServiceCategory>> => {
    return apiClient.get<ApiResponse<ServiceCategory>>(`/services/categories/${id}`);
  },

  /**
   * Get service category by slug
   */
  getCategoryBySlug: async (slug: string): Promise<ApiResponse<ServiceCategory>> => {
    return apiClient.get<ApiResponse<ServiceCategory>>(`/services/categories/slug/${slug}`);
  },
};

/**
 * Utility functions for services
 */
export const serviceUtils = {
  /**
   * Format price display
   */
  formatPrice: (service: Service): string => {
    const formatAmount = (amount: number): string => {
      return Math.round(amount).toLocaleString('vi-VN');
    };

    if (service.price) {
      return `${formatAmount(service.price)}đ`;
    }
    if (service.min_price && service.max_price) {
      return `${formatAmount(service.min_price)}đ - ${formatAmount(service.max_price)}đ`;
    }
    if (service.min_price) {
      return `Từ ${formatAmount(service.min_price)}đ`;
    }
    return 'Liên hệ';
  },

  /**
   * Format duration
   */
  formatDuration: (minutes?: number): string => {
    if (!minutes) return 'Liên hệ';

    if (minutes < 60) {
      return `${minutes} phút`;
    }

    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    if (remainingMinutes === 0) {
      return `${hours} giờ`;
    }

    return `${hours}h${remainingMinutes}m`;
  },

  /**
   * Get service icon based on name or category
   */
  getServiceIcon: (service: Service): string => {
    const name = service.name.toLowerCase();

    if (name.includes('nhớt') || name.includes('bảo dưỡng')) return '🛢️';
    if (name.includes('lốp') || name.includes('vá')) return '🛞';
    if (name.includes('điện') || name.includes('đánh lửa')) return '⚡';
    if (name.includes('phanh') || name.includes('ly hợp')) return '🔩';
    if (name.includes('rửa') || name.includes('vệ sinh')) return '🧽';
    if (name.includes('cứu hộ')) return '🚨';
    if (name.includes('đại tu') || name.includes('sơn')) return '🔧';

    return '🔧'; // Default icon
  },

  /**
   * Get default image URL if service doesn't have one
   */
  getImageUrl: (service: Service): string => {
    return service.image_url || '';
    //     if (service.image_url) {
    //       return service.image_url.startsWith('http')
    //         ? service.image_url
    //         : `${process.env.NEXT_PUBLIC_API_URL || 'https://car-repair-backend-trim4.sevalla.app'}${service.image_url}`;
    //     }

    //     // Return a default image based on service type
    //     const name = service.name.toLowerCase();
    //     if (name.includes('nhớt')) return '/images/services/oil-change.jpg';
    //     if (name.includes('lốp')) return '/images/services/tire-service.jpg';
    //     if (name.includes('điện')) return '/images/services/electrical.jpg';
    //     if (name.includes('phanh')) return '/images/services/brake-service.jpg';
    //     if (name.includes('rửa')) return '/images/services/wash-service.jpg';

    //     return '/images/services/general-repair.jpg';
  },
};
