'use client';

import { useState, useEffect } from 'react';
import { BookingData } from '../BookingWizard';

const services = [
  {
    id: 'general-repair',
    name: 'Sửa chữa tổng quát',
    category: 'repair',
    price: 80000,
    duration: 45,
    description: 'Chẩn đoán và sửa chữa các hư hỏng thông thường',
    popular: true,
    icon: '🔧'
  },
  {
    id: 'oil-change',
    name: 'Thay nhớt bảo dưỡng',
    category: 'maintenance',
    price: 100000,
    duration: 30,
    description: 'Thay nhớt định kỳ và bảo dưỡng cơ bản',
    popular: true,
    icon: '🛢️'
  },
  {
    id: 'electrical',
    name: 'Sửa điện - Đánh lửa',
    category: 'electrical',
    price: 120000,
    duration: 60,
    description: 'Sửa chữa hệ thống điện và đánh lửa',
    popular: false,
    icon: '⚡'
  },
  {
    id: 'tire-service',
    name: 'Thay lốp - Vá lốp',
    category: 'tire',
    price: 40000,
    duration: 20,
    description: 'Thay lốp mới và vá lốp xe máy',
    popular: true,
    icon: '🛞'
  },
  {
    id: 'brake-service',
    name: 'Sửa phanh - Ly hợp',
    category: 'brake',
    price: 90000,
    duration: 40,
    description: 'Bảo dưỡng hệ thống phanh và ly hợp',
    popular: false,
    icon: '🔩'
  },
  {
    id: 'wash-service',
    name: 'Rửa xe - Vệ sinh',
    category: 'cleaning',
    price: 30000,
    duration: 25,
    description: 'Dịch vụ rửa xe chuyên nghiệp',
    popular: false,
    icon: '🧽'
  },
  {
    id: 'safety-check',
    name: 'Kiểm tra an toàn',
    category: 'maintenance',
    price: 50000,
    duration: 35,
    description: 'Kiểm tra toàn diện tình trạng xe',
    popular: false,
    icon: '🔍'
  },
  {
    id: 'full-maintenance',
    name: 'Bảo dưỡng định kỳ',
    category: 'maintenance',
    price: 200000,
    duration: 90,
    description: 'Gói bảo dưỡng toàn diện',
    popular: true,
    icon: '🛠️'
  }
];

const packages = [
  {
    id: 'basic-package',
    name: 'Gói Cơ Bản',
    services: ['oil-change', 'safety-check', 'wash-service'],
    originalPrice: 180000,
    discountPrice: 150000,
    duration: 60,
    description: 'Bảo dưỡng cơ bản cho xe',
    popular: false
  },
  {
    id: 'standard-package',
    name: 'Gói Tiêu Chuẩn',
    services: ['oil-change', 'safety-check', 'brake-service', 'wash-service'],
    originalPrice: 270000,
    discountPrice: 230000,
    duration: 95,
    description: 'Bảo dưỡng toàn diện',
    popular: true
  },
  {
    id: 'premium-package',
    name: 'Gói Cao Cấp',
    services: ['full-maintenance', 'electrical', 'brake-service', 'wash-service'],
    originalPrice: 440000,
    discountPrice: 380000,
    duration: 150,
    description: 'Chăm sóc xe như mới',
    popular: false
  }
];

interface ServiceSelectionProps {
  data: BookingData;
  onDataChange: (data: Partial<BookingData>) => void;
  onValidation: (isValid: boolean) => void;
}

const CheckIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

const PlusIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
  </svg>
);

const MinusIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
  </svg>
);

export default function ServiceSelection({ data, onDataChange, onValidation }: ServiceSelectionProps) {
  const [selectedTab, setSelectedTab] = useState<'services' | 'packages'>('services');
  const [selectedServices, setSelectedServices] = useState<string[]>(
    data.selectedServices.map(s => s.id)
  );
  const [selectedPackage, setSelectedPackage] = useState<string>('');

  // Validate selection
  useEffect(() => {
    const isValid = selectedServices.length > 0 || selectedPackage !== '';
    onValidation(isValid);

    // Update booking data
    if (selectedPackage) {
      const pkg = packages.find(p => p.id === selectedPackage);
      if (pkg) {
        const packageServices = pkg.services.map(serviceId => {
          const service = services.find(s => s.id === serviceId);
          return service ? {
            id: service.id,
            name: service.name,
            price: 0, // Price included in package
            duration: service.duration,
            category: service.category
          } : null;
        }).filter(Boolean) as BookingData['selectedServices'];

        // Add package as a service
        packageServices.unshift({
          id: pkg.id,
          name: pkg.name,
          price: pkg.discountPrice,
          duration: pkg.duration,
          category: 'package'
        });

        onDataChange({ selectedServices: packageServices });
      }
    } else {
      const selectedServiceObjects = selectedServices.map(serviceId => {
        const service = services.find(s => s.id === serviceId);
        return service ? {
          id: service.id,
          name: service.name,
          price: service.price,
          duration: service.duration,
          category: service.category
        } : null;
      }).filter(Boolean) as BookingData['selectedServices'];

      onDataChange({ selectedServices: selectedServiceObjects });
    }
  }, [selectedServices, selectedPackage, onDataChange, onValidation]);

  const handleServiceToggle = (serviceId: string) => {
    if (selectedPackage) {
      setSelectedPackage('');
    }

    setSelectedServices(prev =>
      prev.includes(serviceId)
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const handlePackageSelect = (packageId: string) => {
    setSelectedPackage(packageId);
    setSelectedServices([]);
  };

  const getTotalPrice = () => {
    if (selectedPackage) {
      const pkg = packages.find(p => p.id === selectedPackage);
      return pkg ? pkg.discountPrice : 0;
    }
    return selectedServices.reduce((total, serviceId) => {
      const service = services.find(s => s.id === serviceId);
      return total + (service ? service.price : 0);
    }, 0);
  };

  const getTotalDuration = () => {
    if (selectedPackage) {
      const pkg = packages.find(p => p.id === selectedPackage);
      return pkg ? pkg.duration : 0;
    }
    return selectedServices.reduce((total, serviceId) => {
      const service = services.find(s => s.id === serviceId);
      return total + (service ? service.duration : 0);
    }, 0);
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Chọn dịch vụ cần thiết
        </h2>
        <p className="text-gray-600">
          Lựa chọn dịch vụ phù hợp với nhu cầu của bạn
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex justify-center mb-8">
        <div className="bg-gray-100 rounded-lg p-1 inline-flex">
          <button
            onClick={() => setSelectedTab('services')}
            className={`px-6 py-3 rounded-md font-medium transition-all duration-200 ${
              selectedTab === 'services'
                ? 'bg-white text-primary-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Dịch vụ lẻ
          </button>
          <button
            onClick={() => setSelectedTab('packages')}
            className={`px-6 py-3 rounded-md font-medium transition-all duration-200 ${
              selectedTab === 'packages'
                ? 'bg-white text-primary-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Gói dịch vụ
          </button>
        </div>
      </div>

      {/* Content */}
      {selectedTab === 'services' ? (
        <div>
          {/* Services Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {services.map((service) => {
              const isSelected = selectedServices.includes(service.id);
              return (
                <div
                  key={service.id}
                  className={`relative border-2 rounded-xl p-6 cursor-pointer transition-all duration-200 ${
                    isSelected
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-gray-200 hover:border-primary-300 bg-white'
                  }`}
                  onClick={() => handleServiceToggle(service.id)}
                >
                  {/* Popular Badge */}
                  {service.popular && (
                    <div className="absolute -top-2 -right-2 bg-secondary-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                      Phổ biến
                    </div>
                  )}

                  {/* Selection Indicator */}
                  <div className={`absolute top-4 right-4 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                    isSelected
                      ? 'bg-primary-500 border-primary-500 text-white'
                      : 'border-gray-300'
                  }`}>
                    {isSelected && <CheckIcon />}
                  </div>

                  {/* Service Content */}
                  <div className="mb-4">
                    <div className="text-3xl mb-3">{service.icon}</div>
                    <h3 className="font-bold text-gray-900 mb-2">{service.name}</h3>
                    <p className="text-sm text-gray-600 mb-3">{service.description}</p>

                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-primary-600">
                        {service.price.toLocaleString()}đ
                      </span>
                      <span className="text-sm text-gray-500">
                        {service.duration} phút
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick Service Add */}
          <div className="bg-gray-50 rounded-xl p-6">
            <h4 className="font-semibold text-gray-900 mb-4">Dịch vụ thường được chọn cùng:</h4>
            <div className="flex flex-wrap gap-2">
              {[
                { services: ['oil-change', 'wash-service'], name: 'Thay nhớt + Rửa xe' },
                { services: ['general-repair', 'safety-check'], name: 'Sửa chữa + Kiểm tra' },
                { services: ['brake-service', 'tire-service'], name: 'Phanh + Lốp' }
              ].map((combo, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setSelectedServices(prev => {
                      const newServices = [...prev];
                      combo.services.forEach(serviceId => {
                        if (!newServices.includes(serviceId)) {
                          newServices.push(serviceId);
                        }
                      });
                      return newServices;
                    });
                  }}
                  className="btn btn-outline btn-sm"
                >
                  <PlusIcon />
                  <span className="ml-1">{combo.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div>
          {/* Packages Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {packages.map((pkg) => {
              const isSelected = selectedPackage === pkg.id;
              return (
                <div
                  key={pkg.id}
                  className={`relative border-2 rounded-xl p-6 cursor-pointer transition-all duration-200 ${
                    isSelected
                      ? 'border-primary-500 bg-primary-50 scale-105'
                      : 'border-gray-200 hover:border-primary-300 bg-white'
                  } ${pkg.popular ? 'ring-2 ring-secondary-200' : ''}`}
                  onClick={() => handlePackageSelect(pkg.id)}
                >
                  {/* Popular Badge */}
                  {pkg.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-secondary-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                      Phổ biến nhất
                    </div>
                  )}

                  {/* Selection Indicator */}
                  <div className={`absolute top-4 right-4 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                    isSelected
                      ? 'bg-primary-500 border-primary-500 text-white'
                      : 'border-gray-300'
                  }`}>
                    {isSelected && <CheckIcon />}
                  </div>

                  {/* Package Content */}
                  <div className="mt-4">
                    <h3 className="font-bold text-xl text-gray-900 mb-2">{pkg.name}</h3>
                    <p className="text-sm text-gray-600 mb-4">{pkg.description}</p>

                    {/* Pricing */}
                    <div className="mb-4">
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl font-bold text-primary-600">
                          {pkg.discountPrice.toLocaleString()}đ
                        </span>
                        <span className="text-sm text-gray-500 line-through">
                          {pkg.originalPrice.toLocaleString()}đ
                        </span>
                      </div>
                      <div className="text-sm text-success-600">
                        Tiết kiệm {(pkg.originalPrice - pkg.discountPrice).toLocaleString()}đ
                      </div>
                    </div>

                    {/* Included Services */}
                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold text-gray-700">Bao gồm:</h4>
                      {pkg.services.map((serviceId) => {
                        const service = services.find(s => s.id === serviceId);
                        return service ? (
                          <div key={serviceId} className="flex items-center space-x-2 text-sm text-gray-600">
                            <CheckIcon />
                            <span>{service.name}</span>
                          </div>
                        ) : null;
                      })}
                    </div>

                    <div className="mt-4 text-sm text-gray-500">
                      Thời gian: {pkg.duration} phút
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Package Benefits */}
          <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl p-6">
            <h4 className="font-semibold text-primary-900 mb-4">Ưu điểm của gói dịch vụ:</h4>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-2 text-primary-800">
                <CheckIcon />
                <span className="text-sm">Tiết kiệm 15-25% chi phí</span>
              </div>
              <div className="flex items-center space-x-2 text-primary-800">
                <CheckIcon />
                <span className="text-sm">Bảo hành dài hạn hơn</span>
              </div>
              <div className="flex items-center space-x-2 text-primary-800">
                <CheckIcon />
                <span className="text-sm">Chăm sóc toàn diện</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Summary */}
      {(selectedServices.length > 0 || selectedPackage) && (
        <div className="mt-8 p-6 bg-gray-50 rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-gray-900">
                {selectedPackage ? 'Gói đã chọn' : 'Dịch vụ đã chọn'}
              </h4>
              <p className="text-sm text-gray-600">
                Thời gian dự kiến: {getTotalDuration()} phút
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-primary-600">
                {getTotalPrice().toLocaleString()}đ
              </div>
              {selectedServices.length > 1 && !selectedPackage && (
                <div className="text-sm text-success-600">
                  Combo tiết kiệm!
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}