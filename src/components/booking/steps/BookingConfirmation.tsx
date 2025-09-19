'use client';

import { useState, useEffect } from 'react';
import { BookingData } from '../BookingWizard';

interface BookingConfirmationProps {
  data: BookingData;
  onDataChange: (data: Partial<BookingData>) => void;
  onValidation: (isValid: boolean) => void;
}

const CheckIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

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

const ClockIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const UserIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
    />
  </svg>
);

const CarIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 14l-6 6-6-6m12 0l-6-6-6 6"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 8V2M12 8l6-6M12 8L6 2"
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

const MessageIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
    />
  </svg>
);

const PrintIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
    />
  </svg>
);

const DownloadIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
    />
  </svg>
);

export default function BookingConfirmation({
  data,
  onDataChange,
  onValidation,
}: BookingConfirmationProps) {
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [bookingCode, setBookingCode] = useState('');

  // Validate terms acceptance
  useEffect(() => {
    onValidation(isTermsAccepted);
  }, [isTermsAccepted, onValidation]);

  const generateBookingCode = () => {
    const prefix = 'BK';
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.random().toString(36).substr(2, 4).toUpperCase();
    return `${prefix}${timestamp}${random}`;
  };

  const handleSubmit = async () => {
    if (!isTermsAccepted) return;

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const code = generateBookingCode();
      setBookingCode(code);
      setIsSubmitted(true);

      // Here you would normally send data to your backend
      console.log('Booking data:', data);
    } catch (error) {
      console.error('Booking submission failed:', error);
      // Handle error
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDateTime = (date: string, time: string) => {
    const dateObj = new Date(date);
    const formattedDate = dateObj.toLocaleDateString('vi-VN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    return `${formattedDate} lúc ${time}`;
  };

  const formatPrice = (price: number) => {
    return price.toLocaleString('vi-VN') + 'đ';
  };

  if (isSubmitted) {
    return (
      <div className="p-8">
        {/* Success State */}
        <div className="text-center max-w-2xl mx-auto">
          {/* Success Icon */}
          <div className="w-20 h-20 bg-success-100 text-success-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckIcon />
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-4">Đặt lịch thành công!</h2>

          <p className="text-lg text-gray-600 mb-8">
            Cảm ơn bạn đã tin tưởng dịch vụ của chúng tôi. Lịch hẹn đã được xác nhận.
          </p>

          {/* Booking Code */}
          <div className="bg-primary-50 border border-primary-200 rounded-xl p-6 mb-8">
            <h3 className="font-semibold text-primary-900 mb-2">Mã đặt lịch của bạn:</h3>
            <div className="text-3xl font-bold text-primary-600 tracking-wider">{bookingCode}</div>
            <p className="text-sm text-primary-700 mt-2">Vui lòng lưu mã này để tra cứu lịch hẹn</p>
          </div>

          {/* Quick Summary */}
          <div className="bg-gray-50 rounded-xl p-6 mb-8 text-left">
            <h4 className="font-semibold text-gray-900 mb-4">Thông tin lịch hẹn:</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <CalendarIcon />
                <span className="text-gray-700">
                  {formatDateTime(data.selectedDate, data.selectedTime)}
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <UserIcon />
                <span className="text-gray-700">{data.customer.name}</span>
              </div>
              <div className="flex items-center space-x-3">
                <PhoneIcon />
                <span className="text-gray-700">{data.customer.phone}</span>
              </div>
              <div className="flex items-center space-x-3">
                <CarIcon />
                <span className="text-gray-700">
                  {data.vehicle.brand} {data.vehicle.model}
                  {data.vehicle.year && ` (${data.vehicle.year})`}
                </span>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="space-y-4 mb-8">
            <h4 className="font-semibold text-gray-900">Các bước tiếp theo:</h4>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div className="flex items-start space-x-2 p-3 bg-blue-50 rounded-lg">
                <MessageIcon />
                <div className="text-left">
                  <div className="font-medium text-blue-900">SMS xác nhận</div>
                  <div className="text-blue-700">Nhận SMS trong 5 phút</div>
                </div>
              </div>
              <div className="flex items-start space-x-2 p-3 bg-green-50 rounded-lg">
                <PhoneIcon />
                <div className="text-left">
                  <div className="font-medium text-green-900">Gọi xác nhận</div>
                  <div className="text-green-700">Nhân viên gọi trong 30 phút</div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => window.print()}
                className="btn btn-outline flex items-center space-x-2"
              >
                <PrintIcon />
                <span>In lịch hẹn</span>
              </button>
              <button
                onClick={() => {
                  const bookingData = {
                    code: bookingCode,
                    date: formatDateTime(data.selectedDate, data.selectedTime),
                    customer: data.customer.name,
                    phone: data.customer.phone,
                    vehicle: `${data.vehicle.brand} ${data.vehicle.model}`,
                    services: data.selectedServices.map((s) => s.name).join(', '),
                    total: formatPrice(data.total),
                  };

                  const blob = new Blob([JSON.stringify(bookingData, null, 2)], {
                    type: 'application/json',
                  });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = `lich-hen-${bookingCode}.json`;
                  a.click();
                  URL.revokeObjectURL(url);
                }}
                className="btn btn-primary flex items-center space-x-2"
              >
                <DownloadIcon />
                <span>Tải thông tin</span>
              </button>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <a href="/" className="btn btn-outline">
                Về trang chủ
              </a>
            </div>
          </div>

          {/* Support Info */}
          <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <h4 className="font-medium text-yellow-900 mb-2">Cần hỗ trợ?</h4>
            <p className="text-sm text-yellow-800 mb-3">
              Nếu có thắc mắc hoặc cần thay đổi lịch hẹn, vui lòng liên hệ:
            </p>
            <div className="flex flex-col sm:flex-row gap-2 justify-center">
              <a
                href="tel:0901234567"
                className="btn btn-sm bg-yellow-600 hover:bg-yellow-700 text-white"
              >
                Gọi: 0901 234 567
              </a>
              <a href="https://zalo.me/0901234567" className="btn btn-sm btn-outline">
                Chat Zalo
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Xác nhận thông tin đặt lịch</h2>
        <p className="text-gray-600">Vui lòng kiểm tra lại thông tin trước khi xác nhận</p>
      </div>

      <div className="max-w-4xl mx-auto space-y-8">
        {/* Services Summary */}
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Dịch vụ đã chọn</h3>
          <div className="space-y-3">
            {data.selectedServices.map((service, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0"
              >
                <div>
                  <span className="font-medium text-gray-900">{service.name}</span>
                  {service.category === 'package' && (
                    <span className="ml-2 text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded-full">
                      Gói dịch vụ
                    </span>
                  )}
                </div>
                <span className="font-medium text-gray-900">
                  {service.price > 0 ? formatPrice(service.price) : 'Bao gồm'}
                </span>
              </div>
            ))}
          </div>

          {/* Pricing Summary */}
          <div className="mt-6 pt-4 border-t border-gray-200 space-y-2">
            <div className="flex justify-between text-gray-600">
              <span>Tạm tính:</span>
              <span>{formatPrice(data.subtotal)}</span>
            </div>
            {data.discount > 0 && (
              <div className="flex justify-between text-success-600">
                <span>Giảm giá:</span>
                <span>-{formatPrice(data.discount)}</span>
              </div>
            )}
            <div className="flex justify-between text-lg font-bold text-gray-900 pt-2 border-t border-gray-200">
              <span>Tổng cộng:</span>
              <span className="text-primary-600">{formatPrice(data.total)}</span>
            </div>
          </div>

          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <div className="flex items-center space-x-2 text-blue-700">
              <ClockIcon />
              <span className="text-sm">
                <strong>Thời gian dự kiến:</strong> {data.estimatedDuration} phút
              </span>
            </div>
          </div>
        </div>

        {/* DateTime Summary */}
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Thời gian hẹn</h3>
          <div className="flex items-center space-x-4">
            <CalendarIcon />
            <div>
              <div className="font-medium text-gray-900">
                {formatDateTime(data.selectedDate, data.selectedTime)}
              </div>
              <div className="text-sm text-gray-600">
                Thời gian dự kiến hoàn thành:{' '}
                {(() => {
                  const [hour, minute] = data.selectedTime.split(':').map(Number);
                  const endTime = new Date();
                  endTime.setHours(hour, minute + data.estimatedDuration);
                  return endTime.toLocaleTimeString('vi-VN', {
                    hour: '2-digit',
                    minute: '2-digit',
                  });
                })()}
              </div>
            </div>
          </div>

          {data.urgency === 'urgent' && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <div className="text-sm text-red-700">
                <strong>Lưu ý:</strong> Đây là lịch hẹn khẩn cấp. Có thể phát sinh phí ưu tiên
                20.000đ.
              </div>
            </div>
          )}
        </div>

        {/* Customer Info Summary */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Thông tin khách hàng</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <UserIcon />
                <div>
                  <div className="font-medium text-gray-900">{data.customer.name}</div>
                  <div className="text-sm text-gray-600">Họ và tên</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <PhoneIcon />
                <div>
                  <div className="font-medium text-gray-900">{data.customer.phone}</div>
                  <div className="text-sm text-gray-600">Số điện thoại</div>
                </div>
              </div>
              {data.customer.email && (
                <div className="flex items-center space-x-3">
                  <MessageIcon />
                  <div>
                    <div className="font-medium text-gray-900">{data.customer.email}</div>
                    <div className="text-sm text-gray-600">Email</div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Thông tin xe máy</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <CarIcon />
                <div>
                  <div className="font-medium text-gray-900">
                    {data.vehicle.brand} {data.vehicle.model}
                    {data.vehicle.year && ` (${data.vehicle.year})`}
                  </div>
                  <div className="text-sm text-gray-600">Hãng và dòng xe</div>
                </div>
              </div>
              {data.vehicle.licensePlate && (
                <div className="text-sm">
                  <span className="text-gray-600">Biển số: </span>
                  <span className="font-medium text-gray-900">{data.vehicle.licensePlate}</span>
                </div>
              )}
              {data.vehicle.mileage && (
                <div className="text-sm">
                  <span className="text-gray-600">Số km: </span>
                  <span className="font-medium text-gray-900">{data.vehicle.mileage} km</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Additional Notes */}
        {data.notes && (
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Ghi chú</h3>
            <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">{data.notes}</p>
          </div>
        )}

        {/* Terms and Conditions */}
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Điều khoản và chính sách</h3>

          <div className="space-y-4 text-sm text-gray-700 mb-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Chính sách đặt lịch:</h4>
              <ul className="space-y-1 ml-4 list-disc">
                <li>Lịch hẹn được xác nhận sau khi nhận SMS/gọi điện xác nhận</li>
                <li>Có thể hủy/đổi lịch trước 2 giờ mà không mất phí</li>
                <li>Đến muộn quá 15 phút có thể bị hủy lịch</li>
                <li>Báo giá cuối cùng sau khi kiểm tra xe thực tế</li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 mb-2">Chính sách bảo hành:</h4>
              <ul className="space-y-1 ml-4 list-disc">
                <li>Bảo hành dịch vụ theo quy định từng loại</li>
                <li>Bảo hành phụ tùng chính hãng theo nhà sản xuất</li>
                <li>Không bảo hành do lỗi sử dụng của khách hàng</li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 mb-2">Bảo mật thông tin:</h4>
              <ul className="space-y-1 ml-4 list-disc">
                <li>Thông tin cá nhân được bảo mật tuyệt đối</li>
                <li>Chỉ sử dụng cho mục đích liên hệ và cung cấp dịch vụ</li>
                <li>Không chia sẻ với bên thứ ba</li>
              </ul>
            </div>
          </div>

          <label className="flex items-start space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={isTermsAccepted}
              onChange={(e) => setIsTermsAccepted(e.target.checked)}
              className="form-checkbox text-primary-600 mt-1"
            />
            <span className="text-sm text-gray-700">
              Tôi đã đọc và đồng ý với{' '}
              <a
                href="/terms"
                className="text-primary-600 hover:text-primary-700 underline"
                target="_blank"
              >
                điều khoản dịch vụ
              </a>{' '}
              và{' '}
              <a
                href="/privacy"
                className="text-primary-600 hover:text-primary-700 underline"
                target="_blank"
              >
                chính sách bảo mật
              </a>{' '}
              của Tiệm Sửa Xe Hồng Hậu.
            </span>
          </label>
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            onClick={handleSubmit}
            disabled={!isTermsAccepted || isSubmitting}
            className={`btn btn-primary btn-lg px-8 ${
              !isTermsAccepted || isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                Đang xử lý...
              </>
            ) : (
              <>
                <CheckIcon />
                <span className="ml-2">Xác nhận đặt lịch</span>
              </>
            )}
          </button>

          {!isTermsAccepted && (
            <p className="text-sm text-red-600 mt-2">
              Vui lòng đồng ý với điều khoản dịch vụ để tiếp tục
            </p>
          )}
        </div>

        {/* Contact Support */}
        <div className="text-center pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-600 mb-2">Cần hỗ trợ trong quá trình đặt lịch?</p>
          <a href="tel:0901234567" className="text-primary-600 hover:text-primary-700 font-medium">
            Gọi ngay: 0901 234 567
          </a>
        </div>
      </div>
    </div>
  );
}
