'use client';

import { useState } from 'react';
import { brand } from '@/styles/design-system';

const LocationIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
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

const EmailIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
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

const SendIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
    />
  </svg>
);

const FacebookIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const ZaloIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.568 8.16c-.169-.171-.442-.171-.611 0l-1.946 1.946c-.169.169-.169.442 0 .611l1.946 1.946c.169.169.442.169.611 0s.169-.442 0-.611L15.621 10.1l1.947-1.946c.169-.169.169-.442 0-.611z" />
  </svg>
);

interface ContactFormData {
  name: string;
  phone: string;
  email: string;
  service: string;
  message: string;
}

export default function ContactSection() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    phone: '',
    email: '',
    service: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setSubmitted(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: '',
        phone: '',
        email: '',
        service: '',
        message: '',
      });
    }, 3000);
  };

  const contactInfo = [
    {
      icon: LocationIcon,
      title: 'Địa chỉ',
      content: brand.contact.address,
      action: {
        text: 'Xem bản đồ',
        href: 'https://maps.google.com',
      },
    },
    {
      icon: PhoneIcon,
      title: 'Điện thoại',
      content: brand.contact.phone,
      action: {
        text: 'Gọi ngay',
        href: `tel:${brand.contact.phone}`,
      },
    },
    {
      icon: EmailIcon,
      title: 'Email',
      content: brand.contact.email,
      action: {
        text: 'Gửi email',
        href: `mailto:${brand.contact.email}`,
      },
    },
    {
      icon: ClockIcon,
      title: 'Giờ làm việc',
      content: 'T2-T7: 7:00 - 19:00\nCN: 8:00 - 17:00',
      action: {
        text: 'Đặt lịch hẹn',
        href: '/book-appointment',
      },
    },
  ];

  const serviceOptions = [
    'Sửa chữa tổng quát',
    'Thay nhớt bảo dưỡng',
    'Sửa điện - Đánh lửa',
    'Thay lốp - Vá lốp',
    'Sửa phanh - Ly hợp',
    'Rửa xe - Vệ sinh',
    'Tư vấn khác',
  ];

  return (
    <section className="section bg-white p-6">
      <div className="container-7xl">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <span>📞</span>
            <span>Liên hệ với chúng tôi</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Sẵn Sàng Hỗ Trợ
            <span className="text-primary-600"> 24/7</span>
          </h2>

          <p className="text-lg text-gray-600 leading-relaxed">
            Hãy liên hệ với chúng tôi để được tư vấn miễn phí về xe máy của bạn. Chúng tôi cam kết
            phản hồi nhanh chóng và chuyên nghiệp.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Thông tin liên hệ</h3>

              <div className="grid sm:grid-cols-2 gap-6">
                {contactInfo.map((info, index) => {
                  const IconComponent = info.icon;
                  return (
                    <div
                      key={index}
                      className="group bg-gray-50 rounded-lg p-6 hover:bg-primary-50 transition-colors duration-200"
                    >
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0 w-12 h-12 bg-primary-500 text-white rounded-lg flex items-center justify-center group-hover:bg-primary-600 transition-colors duration-200">
                          <IconComponent />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 mb-1">{info.title}</h4>
                          <p className="text-gray-600 text-sm mb-3 whitespace-pre-line">
                            {info.content}
                          </p>
                          <a
                            href={info.action.href}
                            className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                          >
                            {info.action.text} →
                          </a>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Social Media & Quick Actions */}
            <div className="bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl p-8 text-white">
              <h4 className="text-xl font-bold mb-4">Kết nối với chúng tôi</h4>
              <p className="text-white/90 mb-6">
                Theo dõi fanpage và chat Zalo để nhận được thông tin khuyến mãi mới nhất
              </p>

              <div className="space-y-4">
                <a
                  href={brand.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 bg-white/10 hover:bg-white/20 rounded-lg p-4 transition-colors duration-200"
                >
                  <FacebookIcon />
                  <div>
                    <div className="font-medium">Facebook Fanpage</div>
                    <div className="text-sm text-white/80">Theo dõi để nhận tin khuyến mãi</div>
                  </div>
                </a>

                <a
                  href={`https://zalo.me/${brand.social.zalo}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 bg-white/10 hover:bg-white/20 rounded-lg p-4 transition-colors duration-200"
                >
                  <ZaloIcon />
                  <div>
                    <div className="font-medium">Chat Zalo</div>
                    <div className="text-sm text-white/80">Phản hồi trong 5 phút</div>
                  </div>
                </a>
              </div>

              <div className="mt-6 pt-6 border-t border-white/20">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold">&lt; 5 phút</div>
                    <div className="text-sm text-white/80">Thời gian phản hồi</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">24/7</div>
                    <div className="text-sm text-white/80">Hỗ trợ khẩn cấp</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-gray-50 rounded-xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Gửi tin nhắn cho chúng tôi</h3>

            {submitted ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-success-100 text-success-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">Cảm ơn bạn!</h4>
                <p className="text-gray-600">
                  Chúng tôi đã nhận được tin nhắn và sẽ phản hồi trong vòng 30 phút.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                      Họ và tên *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200"
                      required
                      placeholder="Nhập họ và tên"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                      Số điện thoại *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200"
                      required
                      placeholder="Nhập số điện thoại"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200"
                      placeholder="Nhập email (tùy chọn)"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="service" className="block text-sm font-medium text-gray-700">
                      Dịch vụ cần hỗ trợ
                    </label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200 bg-white"
                    >
                      <option value="">Chọn dịch vụ</option>
                      {serviceOptions.map((service) => (
                        <option key={service} value={service}>
                          {service}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                    Tin nhắn *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200 resize-none"
                    required
                    placeholder="Mô tả chi tiết về tình trạng xe hoặc dịch vụ bạn cần..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary-500 hover:bg-primary-600 disabled:bg-primary-400 text-white font-semibold py-3 px-6 rounded-lg flex items-center justify-center space-x-2 transition-colors duration-200"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Đang gửi...</span>
                    </>
                  ) : (
                    <>
                      <SendIcon />
                      <span>Gửi tin nhắn</span>
                    </>
                  )}
                </button>

                <p className="text-xs text-gray-500 text-center">
                  Bằng cách gửi tin nhắn, bạn đồng ý với{' '}
                  <a href="/privacy" className="text-primary-600 hover:text-primary-700">
                    chính sách bảo mật
                  </a>{' '}
                  của chúng tôi.
                </p>
              </form>
            )}
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-16">
          <div className="bg-gray-100 rounded-xl overflow-hidden shadow-lg">
            <div className="p-6 bg-white border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-primary-100 text-primary-600 rounded-lg">
                  <LocationIcon />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Vị trí cửa hàng</h3>
                  <p className="text-sm text-gray-600">{brand.contact.address}</p>
                </div>
              </div>
            </div>
            <div className="relative h-64 md:h-96">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d62945.56413855739!2d105.9238976!3d9.5868415!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31a052741a666a83%3A0xb7c6274858d83667!2zU-G7rWEgWGUgSOG7k25nIEjhuq11!5e0!3m2!1sen!2s!4v1757946966297!5m2!1sen!2s"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Vị trí Sửa Xe Hồng Hậu"
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
