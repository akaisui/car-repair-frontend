'use client';

import { useState, useEffect } from 'react';
import { Service, User } from '@/types';
import { serviceUtils } from '@/lib/api/services';
import { appointmentApi, AppointmentBookingData } from '@/lib/api/appointments';
import { useRouter } from 'next/navigation';

interface BookingFormProps {
  services: Service[];
  preSelectedService: Service | null;
  user?: User | null;
}

interface BookingData {
  service: Service | null;
  date: string;
  time: string;
  customerInfo: {
    fullName: string;
    phone: string;
    email: string;
  };
  vehicleInfo: {
    licensePlate: string;
    brand: string;
    model: string;
    year: string;
  };
  notes: string;
}

export default function BookingForm({ services, preSelectedService, user }: BookingFormProps) {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingData, setBookingData] = useState<BookingData>({
    service: preSelectedService,
    date: '',
    time: '',
    customerInfo: {
      fullName: user?.full_name || '',
      phone: user?.phone || '',
      email: user?.email || '',
    },
    vehicleInfo: {
      licensePlate: '',
      brand: '',
      model: '',
      year: '',
    },
    notes: '',
  });

  useEffect(() => {
    if (preSelectedService) {
      setBookingData(prev => ({ ...prev, service: preSelectedService }));
    }
  }, [preSelectedService]);

  const steps = [
    { number: 1, title: 'Chọn dịch vụ', description: 'Chọn dịch vụ bạn cần' },
    { number: 2, title: 'Chọn thời gian', description: 'Chọn ngày và giờ phù hợp' },
    { number: 3, title: 'Thông tin', description: 'Điền thông tin liên hệ' },
    { number: 4, title: 'Xác nhận', description: 'Xem lại và xác nhận' },
  ];

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const updateBookingData = (field: string, value: any) => {
    setBookingData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const updateNestedData = (section: string, field: string, value: any) => {
    setBookingData(prev => ({
      ...prev,
      [section]: {
        ...(prev[section as keyof BookingData] as any),
        [field]: value,
      },
    }));
  };

  const isStepValid = (step: number): boolean => {
    switch (step) {
      case 1:
        return bookingData.service !== null;
      case 2:
        return bookingData.date !== '' && bookingData.time !== '';
      case 3:
        return (
          bookingData.customerInfo.fullName !== '' &&
          bookingData.customerInfo.phone !== '' &&
          bookingData.vehicleInfo.licensePlate !== ''
        );
      case 4:
        return true;
      default:
        return false;
    }
  };

  const handleBookingSubmit = async () => {
    if (!bookingData.service) {
      alert('Vui lòng chọn dịch vụ');
      return;
    }

    setIsSubmitting(true);

    try {
      const bookingPayload: AppointmentBookingData = {
        service_id: bookingData.service.id!,
        appointment_date: bookingData.date,
        appointment_time: bookingData.time,
        customer_info: {
          full_name: bookingData.customerInfo.fullName,
          phone: bookingData.customerInfo.phone,
          email: bookingData.customerInfo.email || undefined,
        },
        vehicle_info: {
          license_plate: bookingData.vehicleInfo.licensePlate,
          brand: bookingData.vehicleInfo.brand || undefined,
          model: bookingData.vehicleInfo.model || undefined,
          year: bookingData.vehicleInfo.year || undefined,
        },
        notes: bookingData.notes || undefined,
      };

      const response = await appointmentApi.bookAppointment(bookingPayload);

      if (response.success) {
        // Success - redirect to appointments page with appointment info
        const appointmentCode = (response.data as any)?.appointment?.appointment_code || response.data?.appointment_code || 'N/A';

        // Show success message
        alert(`🎉 Đặt lịch thành công!

📋 Mã lịch hẹn: ${appointmentCode}
⏰ Thời gian: ${bookingData.date} ${bookingData.time}
🔧 Dịch vụ: ${bookingData.service.name}

📞 Chúng tôi sẽ liên hệ với bạn trong vòng 15 phút để xác nhận.

Bạn có thể theo dõi lịch hẹn trong mục "Lịch hẹn của tôi".`);

        // Redirect to appointments page with success flag and appointment code
        router.push(`/appointments?success=true&code=${appointmentCode}&new=true`);
      }
    } catch (error: any) {
      console.error('Booking failed:', error);

      let errorMessage = 'Có lỗi xảy ra khi đặt lịch. Vui lòng thử lại.';

      if (error.message) {
        if (error.message.includes('not available')) {
          errorMessage = 'Thời gian đã chọn không còn trống. Vui lòng chọn thời gian khác.';
        } else if (error.message.includes('working days')) {
          errorMessage = 'Chúng tôi chỉ nhận đặt lịch trong ngày làm việc.';
        } else if (error.message.includes('future dates')) {
          errorMessage = 'Vui lòng chọn thời gian trong tương lai.';
        } else {
          errorMessage = error.message;
        }
      }

      alert(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.number} className="flex items-center">
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm ${
                    currentStep >= step.number
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {step.number}
                </div>
                <div className="mt-2 text-center">
                  <div className="text-sm font-medium text-gray-900">{step.title}</div>
                  <div className="text-xs text-gray-500 hidden sm:block">{step.description}</div>
                </div>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`flex-1 h-0.5 mx-4 ${
                    currentStep > step.number ? 'bg-primary-600' : 'bg-gray-200'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Form Content */}
      <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
        {/* Step 1: Service Selection */}
        {currentStep === 1 && (
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-6">Chọn dịch vụ bạn cần</h3>

            {preSelectedService && (
              <div className="mb-4 p-4 bg-primary-50 border border-primary-200 rounded-lg">
                <p className="text-sm text-primary-700 mb-2">✨ Dịch vụ được chọn sẵn:</p>
                <p className="font-medium text-primary-900">{preSelectedService.name}</p>
              </div>
            )}

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service) => (
                <div
                  key={service.id}
                  onClick={() => updateBookingData('service', service)}
                  className={`
                    relative p-6 border-2 rounded-xl cursor-pointer
                    transition-all duration-300 ease-in-out
                    transform hover:scale-105 active:scale-95
                    focus:outline-none focus:ring-4
                    ${bookingData.service?.id === service.id
                      ? 'border-primary-500 bg-gradient-to-br from-primary-50 to-primary-100 shadow-lg ring-4 ring-primary-200'
                      : 'border-gray-200 bg-white hover:border-primary-300 hover:shadow-md hover:bg-gray-50 focus:ring-primary-200'
                    }
                  `}
                >
                  {/* Selected indicator */}
                  {bookingData.service?.id === service.id && (
                    <div className="absolute top-3 right-3">
                      <div className="w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center space-x-3 mb-3">
                    <span className="text-3xl">{serviceUtils.getServiceIcon(service)}</span>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-1">{service.name}</h4>
                      <div className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-700">
                        {serviceUtils.formatPrice(service)}
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {service.short_description || service.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Time Selection */}
        {currentStep === 2 && (
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-6">Chọn thời gian phù hợp</h3>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Date Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Chọn ngày
                </label>
                <input
                  type="date"
                  value={bookingData.date}
                  onChange={(e) => updateBookingData('date', e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>

              {/* Time Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Chọn giờ
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
                    '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
                    '16:00', '16:30', '17:00', '17:30'
                  ].map((time) => (
                    <button
                      key={time}
                      type="button"
                      onClick={() => updateBookingData('time', time)}
                      className={`
                        relative px-4 py-3 text-sm font-medium rounded-lg
                        border-2 transition-all duration-200 ease-in-out
                        transform hover:scale-105 active:scale-95
                        focus:outline-none focus:ring-3
                        ${bookingData.time === time
                          ? 'border-primary-500 bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg focus:ring-primary-300'
                          : 'border-gray-300 bg-white text-gray-700 hover:border-primary-400 hover:bg-primary-50 hover:text-primary-700 focus:ring-primary-200 shadow-sm hover:shadow-md'
                        }
                      `}
                    >
                      <span className="relative z-10">{time}</span>
                      {bookingData.time === time && (
                        <div className="absolute inset-0 bg-gradient-to-r from-primary-400 to-primary-500 rounded-md opacity-20"></div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {bookingData.service && (
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">Dịch vụ đã chọn:</h4>
                <div className="flex items-center justify-between">
                  <span>{bookingData.service.name}</span>
                  <span className="text-primary-600 font-medium">
                    {serviceUtils.formatPrice(bookingData.service)}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  Thời gian ước tính: {serviceUtils.formatDuration(bookingData.service.duration_minutes)}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Step 3: Customer Information */}
        {currentStep === 3 && (
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-6">Thông tin liên hệ</h3>

            <div className="space-y-6">
              {/* Customer Info */}
              <div>
                <h4 className="font-medium text-gray-900 mb-4">Thông tin khách hàng</h4>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Họ và tên *
                    </label>
                    <input
                      type="text"
                      value={bookingData.customerInfo.fullName}
                      onChange={(e) => updateNestedData('customerInfo', 'fullName', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      placeholder="Nhập họ và tên"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Số điện thoại *
                    </label>
                    <input
                      type="tel"
                      value={bookingData.customerInfo.phone}
                      onChange={(e) => updateNestedData('customerInfo', 'phone', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      placeholder="0901234567"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={bookingData.customerInfo.email}
                      onChange={(e) => updateNestedData('customerInfo', 'email', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      placeholder="email@example.com"
                    />
                  </div>
                </div>
              </div>

              {/* Vehicle Info */}
              <div>
                <h4 className="font-medium text-gray-900 mb-4">Thông tin xe máy</h4>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Biển số xe *
                    </label>
                    <input
                      type="text"
                      value={bookingData.vehicleInfo.licensePlate}
                      onChange={(e) => updateNestedData('vehicleInfo', 'licensePlate', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      placeholder="59A-12345"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Hãng xe
                    </label>
                    <input
                      type="text"
                      value={bookingData.vehicleInfo.brand}
                      onChange={(e) => updateNestedData('vehicleInfo', 'brand', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      placeholder="Honda, Yamaha, SYM..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Dòng xe
                    </label>
                    <input
                      type="text"
                      value={bookingData.vehicleInfo.model}
                      onChange={(e) => updateNestedData('vehicleInfo', 'model', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      placeholder="Wave, Exciter, Vision..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Năm sản xuất
                    </label>
                    <input
                      type="number"
                      value={bookingData.vehicleInfo.year}
                      onChange={(e) => updateNestedData('vehicleInfo', 'year', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      placeholder="2020"
                      min="1990"
                      max={new Date().getFullYear()}
                    />
                  </div>
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ghi chú (tùy chọn)
                </label>
                <textarea
                  value={bookingData.notes}
                  onChange={(e) => updateBookingData('notes', e.target.value)}
                  rows={3}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Mô tả chi tiết tình trạng xe hoặc yêu cầu đặc biệt..."
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Confirmation */}
        {currentStep === 4 && (
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-6">Xác nhận thông tin đặt lịch</h3>

            <div className="space-y-6">
              {/* Booking Summary */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h4 className="font-medium text-gray-900 mb-4">Tóm tắt đặt lịch</h4>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <h5 className="text-sm font-medium text-gray-700 mb-2">Dịch vụ</h5>
                    <p className="text-gray-900">{bookingData.service?.name}</p>
                    <p className="text-primary-600 font-medium">
                      {bookingData.service && serviceUtils.formatPrice(bookingData.service)}
                    </p>
                  </div>

                  <div>
                    <h5 className="text-sm font-medium text-gray-700 mb-2">Thời gian</h5>
                    <p className="text-gray-900">
                      {new Date(bookingData.date).toLocaleDateString('vi-VN', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                    <p className="text-gray-900">{bookingData.time}</p>
                  </div>

                  <div>
                    <h5 className="text-sm font-medium text-gray-700 mb-2">Khách hàng</h5>
                    <p className="text-gray-900">{bookingData.customerInfo.fullName}</p>
                    <p className="text-gray-900">{bookingData.customerInfo.phone}</p>
                    {bookingData.customerInfo.email && (
                      <p className="text-gray-900">{bookingData.customerInfo.email}</p>
                    )}
                  </div>

                  <div>
                    <h5 className="text-sm font-medium text-gray-700 mb-2">Xe máy</h5>
                    <p className="text-gray-900">{bookingData.vehicleInfo.licensePlate}</p>
                    <p className="text-gray-900">
                      {bookingData.vehicleInfo.brand} {bookingData.vehicleInfo.model} {bookingData.vehicleInfo.year}
                    </p>
                  </div>
                </div>

                {bookingData.notes && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <h5 className="text-sm font-medium text-gray-700 mb-2">Ghi chú</h5>
                    <p className="text-gray-900">{bookingData.notes}</p>
                  </div>
                )}
              </div>

              {/* Confirmation */}
              <div className="text-center">
                <button
                  type="button"
                  className={`
                    relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white
                    bg-gradient-to-r from-primary-600 to-primary-700
                    hover:from-primary-700 hover:to-primary-800
                    focus:outline-none focus:ring-4 focus:ring-primary-300
                    transform transition-all duration-200 ease-in-out
                    hover:scale-105 hover:shadow-xl
                    rounded-xl shadow-lg
                    ${isSubmitting ? 'opacity-80 cursor-not-allowed scale-100' : 'active:scale-95'}
                  `}
                  onClick={handleBookingSubmit}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-3"></div>
                      <span>Đang đặt lịch...</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Xác nhận đặt lịch</span>
                    </>
                  )}
                </button>
                <p className="text-sm text-gray-600 mt-3">
                  Bằng cách đặt lịch, bạn đồng ý với{' '}
                  <a href="#" className="text-primary-600 hover:underline">
                    điều khoản dịch vụ
                  </a>{' '}
                  của chúng tôi.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={prevStep}
            disabled={currentStep === 1}
            className={`
              inline-flex items-center px-6 py-3 text-base font-medium
              border-2 border-gray-300 text-gray-700 bg-white rounded-lg
              hover:bg-gray-50 hover:border-gray-400 hover:text-gray-800
              focus:outline-none focus:ring-4 focus:ring-gray-200
              transform transition-all duration-200 ease-in-out
              ${currentStep === 1
                ? 'opacity-50 cursor-not-allowed'
                : 'hover:scale-105 active:scale-95 shadow-md hover:shadow-lg'
              }
            `}
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Quay lại
          </button>

          {currentStep < 4 ? (
            <button
              type="button"
              onClick={nextStep}
              disabled={!isStepValid(currentStep)}
              className={`
                inline-flex items-center px-6 py-3 text-base font-medium text-white
                bg-gradient-to-r from-primary-600 to-primary-700
                hover:from-primary-700 hover:to-primary-800
                focus:outline-none focus:ring-4 focus:ring-primary-300
                transform transition-all duration-200 ease-in-out
                rounded-lg shadow-md
                ${!isStepValid(currentStep)
                  ? 'opacity-50 cursor-not-allowed'
                  : 'hover:scale-105 active:scale-95 hover:shadow-lg'
                }
              `}
            >
              Tiếp theo
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}