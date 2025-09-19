'use client';

import { useState, useEffect, useCallback } from 'react';
import ServiceSelection from './steps/ServiceSelection';
import DateTimeSelection from './steps/DateTimeSelection';
import CustomerInfo from './steps/CustomerInfo';
import BookingConfirmation from './steps/BookingConfirmation';

export interface BookingData {
  // Service Selection
  selectedServices: Array<{
    id: string;
    name: string;
    price: number;
    duration: number;
    category: string;
  }>;

  // Date & Time
  selectedDate: string;
  selectedTime: string;
  estimatedDuration: number;

  // Customer Info
  customer: {
    name: string;
    phone: string;
    email: string;
    address: string;
  };

  // Vehicle Info
  vehicle: {
    brand: string;
    model: string;
    year: string;
    licensePlate: string;
    mileage: string;
  };

  // Additional Info
  notes: string;
  urgency: 'normal' | 'urgent';

  // Pricing
  subtotal: number;
  discount: number;
  total: number;
}

const steps = [
  {
    id: 1,
    title: 'Chọn dịch vụ',
    description: 'Lựa chọn dịch vụ cần thiết',
  },
  {
    id: 2,
    title: 'Chọn ngày giờ',
    description: 'Đặt lịch phù hợp',
  },
  {
    id: 3,
    title: 'Thông tin',
    description: 'Điền thông tin cá nhân',
  },
  {
    id: 4,
    title: 'Xác nhận',
    description: 'Hoàn tất đặt lịch',
  },
];

const CheckIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

export default function BookingWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [bookingData, setBookingData] = useState<BookingData>({
    selectedServices: [],
    selectedDate: '',
    selectedTime: '',
    estimatedDuration: 0,
    customer: {
      name: '',
      phone: '',
      email: '',
      address: '',
    },
    vehicle: {
      brand: '',
      model: '',
      year: '',
      licensePlate: '',
      mileage: '',
    },
    notes: '',
    urgency: 'normal',
    subtotal: 0,
    discount: 0,
    total: 0,
  });

  const [isStepValid, setIsStepValid] = useState(false);

  // Update pricing when services change
  useEffect(() => {
    const subtotal = bookingData.selectedServices.reduce((sum, service) => sum + service.price, 0);
    const discount = subtotal > 200000 ? subtotal * 0.1 : 0; // 10% discount for orders > 200k
    const total = subtotal - discount;

    setBookingData((prev) => ({
      ...prev,
      subtotal,
      discount,
      total,
      estimatedDuration: prev.selectedServices.reduce((sum, service) => sum + service.duration, 0),
    }));
  }, [bookingData.selectedServices]);

  const handleStepData = useCallback((stepData: Partial<BookingData>) => {
    setBookingData((prev) => ({
      ...prev,
      ...stepData,
    }));
  }, []);

  const handleNext = () => {
    if (isStepValid && currentStep < 4) {
      setCurrentStep(currentStep + 1);
      setIsStepValid(false);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setIsStepValid(true);
    }
  };

  const handleStepValidation = useCallback((isValid: boolean) => {
    setIsStepValid(isValid);
  }, []);

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <ServiceSelection
            data={bookingData}
            onDataChange={handleStepData}
            onValidation={handleStepValidation}
          />
        );
      case 2:
        return (
          <DateTimeSelection
            data={bookingData}
            onDataChange={handleStepData}
            onValidation={handleStepValidation}
          />
        );
      case 3:
        return (
          <CustomerInfo
            data={bookingData}
            onDataChange={handleStepData}
            onValidation={handleStepValidation}
          />
        );
      case 4:
        return (
          <BookingConfirmation
            data={bookingData}
            onDataChange={handleStepData}
            onValidation={handleStepValidation}
          />
        );
      default:
        return null;
    }
  };

  return (
    <section className="section p-6">
      <div className="container-7xl">
        {/* Progress Steps */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                {/* Step Circle */}
                <div className="flex flex-col items-center">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                      currentStep > step.id
                        ? 'bg-success-500 text-white'
                        : currentStep === step.id
                          ? 'bg-primary-500 text-white ring-4 ring-primary-100'
                          : 'bg-gray-200 text-gray-500'
                    }`}
                  >
                    {currentStep > step.id ? <CheckIcon /> : step.id}
                  </div>

                  <div className="mt-3 text-center">
                    <div
                      className={`font-medium text-sm ${
                        currentStep >= step.id ? 'text-gray-900' : 'text-gray-500'
                      }`}
                    >
                      {step.title}
                    </div>
                    <div className="text-xs text-gray-500 mt-1 max-w-24">{step.description}</div>
                  </div>
                </div>

                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div
                    className={`flex-1 h-px mx-4 transition-colors duration-300 ${
                      currentStep > step.id ? 'bg-success-500' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
            {renderStepContent()}
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mt-8">
            <button
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className={`btn btn-outline ${
                currentStep === 1 ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              ← Quay lại
            </button>

            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <span>
                Bước {currentStep} / {steps.length}
              </span>
            </div>

            {currentStep < 4 ? (
              <button
                onClick={handleNext}
                disabled={!isStepValid}
                className={`btn btn-primary ${!isStepValid ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                Tiếp tục →
              </button>
            ) : (
              <div className="w-24" /> // Spacer for alignment
            )}
          </div>
        </div>

        {/* Booking Summary Sidebar - Only show on steps 2-4 */}
        {currentStep > 1 && bookingData.selectedServices.length > 0 && (
          <div className="fixed right-6 top-1/2 transform -translate-y-1/2 w-80 bg-white rounded-xl shadow-lg border border-gray-200 p-6 hidden xl:block">
            <h3 className="font-bold text-gray-900 mb-4">Tóm tắt đặt lịch</h3>

            {/* Selected Services */}
            <div className="space-y-3 mb-4">
              <h4 className="text-sm font-semibold text-gray-700">Dịch vụ đã chọn:</h4>
              {bookingData.selectedServices.map((service, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <span className="text-gray-600">{service.name}</span>
                  <span className="font-medium">{service.price.toLocaleString()}đ</span>
                </div>
              ))}
            </div>

            {/* Date & Time */}
            {bookingData.selectedDate && (
              <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                <div className="text-sm font-semibold text-gray-700 mb-1">Thời gian:</div>
                <div className="text-sm text-gray-600">
                  {new Date(bookingData.selectedDate).toLocaleDateString('vi-VN')}
                </div>
                <div className="text-sm text-gray-600">{bookingData.selectedTime}</div>
              </div>
            )}

            {/* Pricing */}
            <div className="border-t border-gray-200 pt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span>Tạm tính:</span>
                <span>{bookingData.subtotal.toLocaleString()}đ</span>
              </div>
              {bookingData.discount > 0 && (
                <div className="flex justify-between text-sm text-success-600">
                  <span>Giảm giá:</span>
                  <span>-{bookingData.discount.toLocaleString()}đ</span>
                </div>
              )}
              <div className="flex justify-between font-bold text-lg border-t border-gray-200 pt-2">
                <span>Tổng cộng:</span>
                <span className="text-primary-600">{bookingData.total.toLocaleString()}đ</span>
              </div>
            </div>

            {/* Estimated Duration */}
            <div className="mt-4 p-3 bg-primary-50 rounded-lg">
              <div className="text-sm text-primary-700">
                <strong>Thời gian dự kiến:</strong> {bookingData.estimatedDuration} phút
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
