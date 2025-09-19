'use client';

import { useState, useEffect } from 'react';
import { serviceCategoryApi } from '@/lib/api/services';
import { ServiceCategory } from '@/types';

const FilterIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z"
    />
  </svg>
);

const SearchIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
    />
  </svg>
);

const ResetIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
    />
  </svg>
);

export interface FilterState {
  category: string;
  priceRange: string;
  duration: string;
  search: string;
}

interface ServiceFilterProps {
  onFilterChange: (filters: FilterState) => void;
}

// This will be replaced by API data

const priceRanges = [
  { id: 'all', name: 'Tất cả mức giá' },
  { id: 'under50', name: 'Dưới 50.000đ' },
  { id: '50-100', name: '50.000đ - 100.000đ' },
  { id: '100-200', name: '100.000đ - 200.000đ' },
  { id: 'over200', name: 'Trên 200.000đ' },
];

const durations = [
  { id: 'all', name: 'Tất cả thời gian' },
  { id: 'under30', name: 'Dưới 30 phút' },
  { id: '30-60', name: '30 - 60 phút' },
  { id: 'over60', name: 'Trên 60 phút' },
];

export default function ServiceFilter({ onFilterChange }: ServiceFilterProps) {
  const [categories, setCategories] = useState<(ServiceCategory & { service_count?: number })[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);

  const [filters, setFilters] = useState<FilterState>({
    category: 'all',
    priceRange: 'all',
    duration: 'all',
    search: '',
  });

  const [isExpanded, setIsExpanded] = useState(false);

  // Fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoadingCategories(true);
        const response = await serviceCategoryApi.getCategoriesWithServiceCount();
        if (response.data) {
          // Add "All" category at the beginning
          const categoriesWithAll = [
            { id: 0, name: 'Tất cả dịch vụ', slug: 'all', service_count: response.data.reduce((sum, cat) => sum + (cat.service_count || 0), 0), description: '', icon: '', sort_order: 0, is_active: true, created_at: '', updated_at: '' },
            ...response.data.filter(cat => cat.is_active)
          ];
          setCategories(categoriesWithAll);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
        // Fallback categories if API fails
        setCategories([
          { id: 0, name: 'Tất cả dịch vụ', slug: 'all', service_count: 0, description: '', icon: '', sort_order: 0, is_active: true, created_at: '', updated_at: '' },
        ]);
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    const newFilters = {
      ...filters,
      [key]: value,
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const resetFilters = () => {
    const resetState = {
      category: 'all',
      priceRange: 'all',
      duration: 'all',
      search: '',
    };
    setFilters(resetState);
    onFilterChange(resetState);
  };

  const activeFiltersCount = Object.values(filters).filter(
    (value) => value !== 'all' && value !== ''
  ).length;

  return (
    <div className="space-y-6">
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 shadow-sm"
        >
          <div className="flex items-center space-x-2">
            <FilterIcon />
            <span className="font-medium">Bộ lọc</span>
            {activeFiltersCount > 0 && (
              <span className="bg-primary-500 text-white text-xs px-2 py-1 rounded-full">
                {activeFiltersCount}
              </span>
            )}
          </div>
          <svg
            className={`w-5 h-5 transform transition-transform duration-200 ${
              isExpanded ? 'rotate-180' : ''
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      {/* Filter Content */}
      <div className={`space-y-6 ${isExpanded ? 'block' : 'hidden lg:block'}`}>
        {/* Search */}
        <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl p-6 border border-primary-200">
          <h3 className="font-bold text-lg text-gray-900 mb-4 flex items-center space-x-2">
            <div className="p-2 bg-white rounded-lg shadow-sm">
              <SearchIcon />
            </div>
            <span>Tìm kiếm dịch vụ</span>
          </h3>
          <div className="relative">
            <input
              type="text"
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              placeholder="Nhập tên dịch vụ cần tìm..."
              className="w-full pl-12 pr-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 text-gray-900 placeholder-gray-400"
            />
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
              <SearchIcon />
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <h3 className="font-bold text-lg text-gray-900 mb-4 flex items-center justify-between">
            <span>Danh mục dịch vụ</span>
            <span className="text-xs text-gray-500 font-normal">Chọn 1</span>
          </h3>
          {loadingCategories ? (
            <div className="text-center py-4">
              <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-primary-600"></div>
              <p className="text-sm text-gray-500 mt-2">Đang tải...</p>
            </div>
          ) : (
            <div className="space-y-2">
              {categories.map((category) => (
                <label
                  key={category.id}
                  className={`flex items-center justify-between p-3 rounded-lg hover:bg-primary-50 cursor-pointer transition-all duration-200 border-2 ${
                    filters.category === (category.id === 0 ? 'all' : category.id.toString())
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-transparent'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name="category"
                      value={category.id === 0 ? 'all' : category.id.toString()}
                      checked={filters.category === (category.id === 0 ? 'all' : category.id.toString())}
                      onChange={(e) => handleFilterChange('category', e.target.value)}
                      className="form-radio text-primary-600 focus:ring-primary-500"
                    />
                    <span className={`font-medium ${
                      filters.category === (category.id === 0 ? 'all' : category.id.toString())
                        ? 'text-primary-700'
                        : 'text-gray-700'
                    }`}>{category.name}</span>
                  </div>
                  <span className="px-2 py-1 bg-gray-100 rounded-full text-xs font-semibold text-gray-600">
                    {category.service_count || 0}
                  </span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Price Range */}
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <h3 className="font-bold text-lg text-gray-900 mb-4 flex items-center">
            <span>💰</span>
            <span className="ml-2">Khoảng giá</span>
          </h3>
          <div className="space-y-2">
            {priceRanges.map((range) => (
              <label
                key={range.id}
                className="flex items-center space-x-3 p-2 rounded-md hover:bg-gray-50 cursor-pointer"
              >
                <input
                  type="radio"
                  name="priceRange"
                  value={range.id}
                  checked={filters.priceRange === range.id}
                  onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                  className="form-radio text-primary-600 focus:ring-primary-500"
                />
                <span className="text-gray-700">{range.name}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Duration */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-4">Thời gian thực hiện</h3>
          <div className="space-y-2">
            {durations.map((duration) => (
              <label
                key={duration.id}
                className="flex items-center space-x-3 p-2 rounded-md hover:bg-gray-50 cursor-pointer"
              >
                <input
                  type="radio"
                  name="duration"
                  value={duration.id}
                  checked={filters.duration === duration.id}
                  onChange={(e) => handleFilterChange('duration', e.target.value)}
                  className="form-radio text-primary-600 focus:ring-primary-500"
                />
                <span className="text-gray-700">{duration.name}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Reset Filters */}
        {activeFiltersCount > 0 && (
          <button
            onClick={resetFilters}
            className="w-full flex items-center justify-center space-x-2 p-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors duration-200"
          >
            <ResetIcon />
            <span>Xóa bộ lọc ({activeFiltersCount})</span>
          </button>
        )}

        {/* Quick Filters */}
        <div className="bg-gradient-to-br from-secondary-50 to-primary-50 rounded-xl p-6 border border-secondary-200">
          <h3 className="font-bold text-lg text-gray-900 mb-4 flex items-center">
            <span>⚡</span>
            <span className="ml-2">Lọc nhanh phổ biến</span>
          </h3>
          <div className="grid grid-cols-1 gap-3">
            <button
              onClick={() => handleFilterChange('category', '1')}
              className="flex items-center justify-between p-3 bg-white hover:bg-primary-100 rounded-lg transition-all duration-200 border border-gray-200 hover:border-primary-300 group"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">🛠️</span>
                <span className="font-medium text-gray-700 group-hover:text-primary-700">Bảo dưỡng định kỳ</span>
              </div>
              <svg className="w-5 h-5 text-gray-400 group-hover:text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            <button
              onClick={() => {
                const newFilters = {
                  category: 'all',
                  priceRange: 'under50',
                  duration: filters.duration,
                  search: filters.search
                };
                setFilters(newFilters);
                onFilterChange(newFilters);
              }}
              className="flex items-center justify-between p-3 bg-white hover:bg-green-50 rounded-lg transition-all duration-200 border border-gray-200 hover:border-green-300 group"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">💰</span>
                <span className="font-medium text-gray-700 group-hover:text-green-700">Giá tốt (dưới 50k)</span>
              </div>
              <svg className="w-5 h-5 text-gray-400 group-hover:text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            <button
              onClick={() => {
                const newFilters = {
                  category: 'all',
                  priceRange: filters.priceRange,
                  duration: 'under30',
                  search: filters.search
                };
                setFilters(newFilters);
                onFilterChange(newFilters);
              }}
              className="flex items-center justify-between p-3 bg-white hover:bg-yellow-50 rounded-lg transition-all duration-200 border border-gray-200 hover:border-yellow-300 group"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">⚡</span>
                <span className="font-medium text-gray-700 group-hover:text-yellow-700">Nhanh chóng (&lt; 30p)</span>
              </div>
              <svg className="w-5 h-5 text-gray-400 group-hover:text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Contact Support */}
        <div className="bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg p-6 text-white">
          <h4 className="font-semibold mb-2">Cần tư vấn?</h4>
          <p className="text-sm text-primary-100 mb-4">
            Không chắc chắn dịch vụ nào phù hợp? Hãy gọi cho chúng tôi!
          </p>
          <a
            href="tel:0901234567"
            className="btn bg-white text-primary-600 hover:bg-gray-100 w-full"
          >
            Gọi tư vấn ngay
          </a>
        </div>
      </div>
    </div>
  );
}
