'use client';

import Link from 'next/link';

const ArrowRightIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M17 8l4 4m0 0l-4 4m4-4H3"
    />
  </svg>
);

const CalendarIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
    />
  </svg>
);

const CheckIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

export default function BookingHero() {
  const benefits = [
    'Đặt lịch 24/7 trực tuyến',
    'Xác nhận ngay lập tức',
    'Chọn thời gian linh hoạt',
    'Tư vấn miễn phí trước khi sửa',
  ];

  const steps = [
    { number: 1, title: 'Chọn dịch vụ', description: 'Lựa chọn dịch vụ phù hợp' },
    { number: 2, title: 'Chọn ngày giờ', description: 'Đặt lịch thuận tiện' },
    { number: 3, title: 'Điền thông tin', description: 'Cung cấp thông tin xe' },
    { number: 4, title: 'Xác nhận', description: 'Hoàn tất đặt lịch' },
  ];

  return (
    <section className="relative p-6 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 border border-white/30 rounded-full" />
        <div className="absolute bottom-20 right-20 w-32 h-32 border-2 border-white/20 rounded-full" />
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white/10 rounded-full blur-sm" />
        <div className="absolute bottom-1/3 left-2/3 w-24 h-24 bg-white/5 rounded-full blur-lg" />
      </div>

      <div className="relative z-10 container-7xl pt-6 pb-10 md:pt-6 md:pb-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="space-y-8">
            {/* Breadcrumb */}
            {/* <nav className="flex items-center space-x-2 text-sm text-white/80">
              <Link href="/" className="hover:text-white transition-colors duration-200">
                Trang chủ
              </Link>
              <ArrowRightIcon />
              <span className="text-white font-medium">Đặt lịch hẹn</span>
            </nav> */}

            {/* Main Heading */}
            <div className="space-y-6">
              <div className="inline-flex items-center space-x-3 bg-white/20 backdrop-blur-md border border-white/30 rounded-full px-4 py-2">
                <CalendarIcon />
                <span className="font-medium">Đặt lịch trực tuyến</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                <span className="block">Đặt Lịch Hẹn</span>
                <span className="block text-secondary-400">Nhanh Chóng & Dễ Dàng</span>
              </h1>

              <p className="text-xl text-white/90 leading-relaxed max-w-xl">
                Đặt lịch sửa chữa xe máy chỉ trong vài phút. Chọn thời gian phù hợp và nhận xác nhận
                ngay lập tức.
              </p>
            </div>

            {/* Benefits */}
            <div className="grid sm:grid-cols-2 gap-3">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-success-500 rounded-full flex items-center justify-center">
                    <CheckIcon />
                  </div>
                  <span className="text-white/90 font-medium">{benefit}</span>
                </div>
              ))}
            </div>

            {/* Quick Stats */}
            <div className="flex flex-wrap gap-6 pt-6 border-t border-white/20">
              <div className="text-center">
                <div className="text-2xl font-bold text-secondary-400">&lt; 2 phút</div>
                <div className="text-sm text-white/80">Thời gian đặt lịch</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-secondary-400">24/7</div>
                <div className="text-sm text-white/80">Đặt lịch online</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-secondary-400">100%</div>
                <div className="text-sm text-white/80">Xác nhận tức thì</div>
              </div>
            </div>
          </div>

          {/* Right Column - Process Steps */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-center mb-8">Quy trình đặt lịch đơn giản</h3>

            <div className="space-y-6">
              {steps.map((step, index) => (
                <div key={step.number} className="flex items-start space-x-4">
                  {/* Step Number */}
                  <div className="flex-shrink-0 w-10 h-10 bg-secondary-500 text-white rounded-full flex items-center justify-center font-bold">
                    {step.number}
                  </div>

                  {/* Step Content */}
                  <div className="flex-1">
                    <h4 className="font-semibold text-white mb-1">{step.title}</h4>
                    <p className="text-sm text-white/80">{step.description}</p>
                  </div>

                  {/* Connector Line */}
                  {index < steps.length - 1 && (
                    <div className="absolute left-[52px] mt-10 w-px h-6 bg-white/20" />
                  )}
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-white/20 text-center">
              <p className="text-white/90 mb-4">Cần hỗ trợ trong quá trình đặt lịch?</p>
              <a
                href="tel:0901234567"
                className="inline-flex items-center space-x-2 text-secondary-400 hover:text-secondary-300 font-medium"
              >
                <span>Gọi hotline: 0901 234 567</span>
                <ArrowRightIcon />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-white/70 animate-bounce">
        <div className="flex flex-col items-center space-y-2">
          <span className="text-sm">Bắt đầu đặt lịch</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
