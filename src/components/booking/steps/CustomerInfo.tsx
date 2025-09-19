'use client';

import { useState, useEffect } from 'react';
import { BookingData } from '../BookingWizard';

interface CustomerInfoProps {
  data: BookingData;
  onDataChange: (data: Partial<BookingData>) => void;
  onValidation: (isValid: boolean) => void;
}

const vehicleBrands = [
  'Honda', 'Yamaha', 'Suzuki', 'SYM', 'Piaggio', 'Kymco',
  'Peugeot', 'Xe đạp điện', 'Khác'
];

const UserIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const PhoneIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
);

const EmailIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const LocationIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const CarIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-6 6-6-6m12 0l-6-6-6 6" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8V2M12 8l6-6M12 8L6 2" />
  </svg>
);

const AlertIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export default function CustomerInfo({ data, onDataChange, onValidation }: CustomerInfoProps) {
  const [customerData, setCustomerData] = useState(data.customer);
  const [vehicleData, setVehicleData] = useState(data.vehicle);
  const [notes, setNotes] = useState(data.notes || '');
  const [urgency, setUrgency] = useState(data.urgency || 'normal');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Validate form
  useEffect(() => {
    const newErrors: { [key: string]: string } = {};

    // Required customer fields
    if (!customerData.name.trim()) {
      newErrors.name = 'Họ tên là bắt buộc';
    }

    if (!customerData.phone.trim()) {
      newErrors.phone = 'Số điện thoại là bắt buộc';
    } else if (!/^[0-9]{10,11}$/.test(customerData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Số điện thoại không hợp lệ';
    }

    if (customerData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerData.email)) {
      newErrors.email = 'Email không hợp lệ';
    }

    // Required vehicle fields
    if (!vehicleData.brand.trim()) {
      newErrors.brand = 'Hãng xe là bắt buộc';
    }

    if (!vehicleData.model.trim()) {
      newErrors.model = 'Dòng xe là bắt buộc';
    }

    setErrors(newErrors);

    const isValid = Object.keys(newErrors).length === 0;
    onValidation(isValid);

    if (isValid) {
      onDataChange({
        customer: customerData,
        vehicle: vehicleData,
        notes,
        urgency
      });
    }
  }, [customerData, vehicleData, notes, urgency, onDataChange, onValidation]);

  const handleCustomerChange = (field: keyof typeof customerData, value: string) => {
    setCustomerData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleVehicleChange = (field: keyof typeof vehicleData, value: string) => {
    setVehicleData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const formatPhoneNumber = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 10) {
      return numbers.replace(/(\d{4})(\d{3})(\d{3})/, '$1 $2 $3');
    }
    return numbers.replace(/(\d{4})(\d{3})(\d{4})/, '$1 $2 $3');
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Thông tin liên hệ và xe máy
        </h2>
        <p className="text-gray-600">
          Cung cấp thông tin để chúng tôi phục vụ bạn tốt nhất
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Customer Information */}
        <div className="space-y-6">
          <div className="flex items-center space-x-2 mb-4">
            <UserIcon />
            <h3 className="text-xl font-semibold text-gray-900">Thông tin khách hàng</h3>
          </div>

          <div className="space-y-4">
            {/* Name */}
            <div className="form-group">
              <label htmlFor="name" className="form-label">
                Họ và tên *
              </label>
              <input
                type="text"
                id="name"
                value={customerData.name}
                onChange={(e) => handleCustomerChange('name', e.target.value)}
                className={`form-input ${errors.name ? 'border-red-300' : ''}`}
                placeholder="Nhập họ và tên đầy đủ"
              />
              {errors.name && (
                <p className="form-error">{errors.name}</p>
              )}
            </div>

            {/* Phone */}
            <div className="form-group">
              <label htmlFor="phone" className="form-label">
                Số điện thoại *
              </label>
              <input
                type="tel"
                id="phone"
                value={customerData.phone}
                onChange={(e) => {
                  const formatted = formatPhoneNumber(e.target.value);
                  handleCustomerChange('phone', formatted);
                }}
                className={`form-input ${errors.phone ? 'border-red-300' : ''}`}
                placeholder="0901 234 567"
              />
              {errors.phone && (
                <p className="form-error">{errors.phone}</p>
              )}
            </div>

            {/* Email */}
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email (tùy chọn)
              </label>
              <input
                type="email"
                id="email"
                value={customerData.email}
                onChange={(e) => handleCustomerChange('email', e.target.value)}
                className={`form-input ${errors.email ? 'border-red-300' : ''}`}
                placeholder="email@example.com"
              />
              {errors.email && (
                <p className="form-error">{errors.email}</p>
              )}
              <p className="form-help">
                Email để nhận thông báo trạng thái sửa chữa
              </p>
            </div>

            {/* Address */}
            <div className="form-group">
              <label htmlFor="address" className="form-label">
                Địa chỉ (tùy chọn)
              </label>
              <input
                type="text"
                id="address"
                value={customerData.address}
                onChange={(e) => handleCustomerChange('address', e.target.value)}
                className="form-input"
                placeholder="Địa chỉ của bạn"
              />
              <p className="form-help">
                Để liên hệ khi cần thiết
              </p>
            </div>
          </div>

          {/* Quick Contact Options */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">Thông tin liên hệ</h4>
            <div className="space-y-2 text-sm text-blue-700">
              <div className="flex items-center space-x-2">
                <PhoneIcon />
                <span>SMS xác nhận sẽ được gửi đến số điện thoại</span>
              </div>
              <div className="flex items-center space-x-2">
                <EmailIcon />
                <span>Email thông báo tiến độ sửa chữa (nếu có)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Vehicle Information */}
        <div className="space-y-6">
          <div className="flex items-center space-x-2 mb-4">
            <CarIcon />
            <h3 className="text-xl font-semibold text-gray-900">Thông tin xe máy</h3>
          </div>

          <div className="space-y-4">
            {/* Brand */}
            <div className="form-group">
              <label htmlFor="brand" className="form-label">
                Hãng xe *
              </label>
              <select
                id="brand"
                value={vehicleData.brand}
                onChange={(e) => handleVehicleChange('brand', e.target.value)}
                className={`form-select ${errors.brand ? 'border-red-300' : ''}`}
              >
                <option value="">Chọn hãng xe</option>
                {vehicleBrands.map((brand) => (
                  <option key={brand} value={brand}>
                    {brand}
                  </option>
                ))}
              </select>
              {errors.brand && (
                <p className="form-error">{errors.brand}</p>
              )}
            </div>

            {/* Model */}
            <div className="form-group">
              <label htmlFor="model" className="form-label">
                Dòng xe *
              </label>
              <input
                type="text"
                id="model"
                value={vehicleData.model}
                onChange={(e) => handleVehicleChange('model', e.target.value)}
                className={`form-input ${errors.model ? 'border-red-300' : ''}`}
                placeholder="VD: Winner X, Exciter, Air Blade..."
              />
              {errors.model && (
                <p className="form-error">{errors.model}</p>
              )}
            </div>

            {/* Year */}
            <div className="form-group">
              <label htmlFor="year" className="form-label">
                Năm sản xuất
              </label>
              <select
                id="year"
                value={vehicleData.year}
                onChange={(e) => handleVehicleChange('year', e.target.value)}
                className="form-select"
              >
                <option value="">Chọn năm</option>
                {Array.from({ length: 25 }, (_, i) => new Date().getFullYear() - i).map((year) => (
                  <option key={year} value={year.toString()}>
                    {year}
                  </option>
                ))}
              </select>
            </div>

            {/* License Plate */}
            <div className="form-group">
              <label htmlFor="licensePlate" className="form-label">
                Biển số xe
              </label>
              <input
                type="text"
                id="licensePlate"
                value={vehicleData.licensePlate}
                onChange={(e) => handleVehicleChange('licensePlate', e.target.value.toUpperCase())}
                className="form-input"
                placeholder="VD: 59H1-12345"
              />
              <p className="form-help">
                Để xác định xe chính xác khi giao nhận
              </p>
            </div>

            {/* Mileage */}
            <div className="form-group">
              <label htmlFor="mileage" className="form-label">
                Số km đã đi
              </label>
              <input
                type="text"
                id="mileage"
                value={vehicleData.mileage}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, '');
                  handleVehicleChange('mileage', value ? parseInt(value).toLocaleString() : '');
                }}
                className="form-input"
                placeholder="VD: 15,000 km"
              />
              <p className="form-help">
                Để tư vấn dịch vụ phù hợp
              </p>
            </div>
          </div>

          {/* Vehicle Tips */}
          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="font-medium text-green-900 mb-2">Mẹo nhỏ</h4>
            <div className="space-y-1 text-sm text-green-700">
              <p>• Thông tin xe giúp thợ chuẩn bị phụ tùng phù hợp</p>
              <p>• Biển số xe để xác định xe khi giao nhận</p>
              <p>• Số km giúp tư vấn chu kỳ bảo dưỡng</p>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Information */}
      <div className="mt-8 space-y-6">
        {/* Notes */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Thông tin bổ sung
          </h3>

          <div className="form-group">
            <label htmlFor="notes" className="form-label">
              Mô tả tình trạng xe hoặc yêu cầu đặc biệt
            </label>
            <textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={4}
              className="form-textarea"
              placeholder="VD: Xe bị giật khi tăng tốc, muốn thay nhớt loại cao cấp, cần sửa gấp..."
            />
            <p className="form-help">
              Mô tả chi tiết giúp thợ chuẩn bị tốt hơn và báo giá chính xác
            </p>
          </div>
        </div>

        {/* Urgency */}
        <div>
          <label className="form-label">Mức độ ưu tiên</label>
          <div className="grid sm:grid-cols-2 gap-4">
            <label className={`relative flex items-start p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
              urgency === 'normal'
                ? 'border-primary-500 bg-primary-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}>
              <input
                type="radio"
                name="urgency"
                value="normal"
                checked={urgency === 'normal'}
                onChange={(e) => setUrgency(e.target.value as 'normal' | 'urgent')}
                className="form-radio text-primary-600 mt-1"
              />
              <div className="ml-3">
                <div className="font-medium text-gray-900">Bình thường</div>
                <div className="text-sm text-gray-600">
                  Sửa chữa theo lịch hẹn, không gấp
                </div>
              </div>
            </label>

            <label className={`relative flex items-start p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
              urgency === 'urgent'
                ? 'border-red-500 bg-red-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}>
              <input
                type="radio"
                name="urgency"
                value="urgent"
                checked={urgency === 'urgent'}
                onChange={(e) => setUrgency(e.target.value as 'normal' | 'urgent')}
                className="form-radio text-red-600 mt-1"
              />
              <div className="ml-3">
                <div className="font-medium text-gray-900">Khẩn cấp</div>
                <div className="text-sm text-gray-600">
                  Cần sửa gấp, ưu tiên xử lý
                </div>
                <div className="text-xs text-red-600 mt-1">
                  Có thể phát sinh phí ưu tiên
                </div>
              </div>
            </label>
          </div>
        </div>
      </div>

      {/* Data Protection Notice */}
      <div className="mt-8 p-4 bg-gray-50 border border-gray-200 rounded-lg">
        <div className="flex items-start space-x-2">
          <AlertIcon />
          <div className="text-sm text-gray-700">
            <strong>Bảo mật thông tin:</strong> Thông tin cá nhân của bạn được bảo mật tuyệt đối và chỉ sử dụng
            cho mục đích liên hệ, xác nhận lịch hẹn và cung cấp dịch vụ. Chúng tôi không chia sẻ
            thông tin với bên thứ ba.
          </div>
        </div>
      </div>
    </div>
  );
}