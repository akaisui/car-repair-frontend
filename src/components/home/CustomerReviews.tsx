'use client';

import { useState, useEffect } from 'react';

const reviews = [
  {
    id: 1,
    name: 'Nguyễn Văn A',
    location: 'Quận 1, TP.HCM',
    rating: 5,
    avatar: '/images/avatars/customer-1.jpg',
    review:
      'Dịch vụ rất chuyên nghiệp, thợ sửa nhanh và chính xác. Xe Honda Winner của tôi chạy êm hơn hẳn sau khi bảo dưỡng ở đây. Giá cả hợp lý, sẽ quay lại lần sau.',
    service: 'Bảo dưỡng định kỳ',
    date: '2 tuần trước',
    verified: true,
  },
  {
    id: 2,
    name: 'Trần Thị B',
    location: 'Quận 3, TP.HCM',
    rating: 5,
    avatar: '/images/avatars/customer-2.jpg',
    review:
      'Tiệm sửa rất uy tín, nhân viên tư vấn nhiệt tình. Xe Yamaha Sirius của tôi bị hỏng bugi, được sửa xong chỉ trong 30 phút. Rất hài lòng với chất lượng dịch vụ.',
    service: 'Sửa chữa điện',
    date: '1 tuần trước',
    verified: true,
  },
  {
    id: 3,
    name: 'Lê Văn C',
    location: 'Quận 7, TP.HCM',
    rating: 5,
    avatar: '/images/avatars/customer-3.jpg',
    review:
      'Thay nhớt cho xe Wave của tôi, dùng nhớt chính hãng Castrol. Anh thợ làm việc rất cẩn thận, kiểm tra kỹ từng bộ phận. Giá thành rẻ hơn so với nhiều nơi khác.',
    service: 'Thay nhớt',
    date: '3 ngày trước',
    verified: true,
  },
  {
    id: 4,
    name: 'Phạm Thị D',
    location: 'Quận 10, TP.HCM',
    rating: 5,
    avatar: '/images/avatars/customer-4.jpg',
    review:
      'Sửa phanh cho xe Air Blade, công việc được thực hiện rất nhanh chóng và chuyên nghiệp. Nhân viên giải thích rõ ràng về tình trạng xe và các bước sửa chữa.',
    service: 'Sửa phanh',
    date: '1 tháng trước',
    verified: true,
  },
  {
    id: 5,
    name: 'Võ Văn E',
    location: 'Quận Bình Thạnh, TP.HCM',
    rating: 5,
    avatar: '/images/avatars/customer-5.jpg',
    review:
      'Vá lốp xe máy, giá rẻ và làm rất chắc chắn. Đã 3 tháng rồi vẫn chưa bị thủng lại. Anh thợ làm việc tỉ mỉ, kiểm tra kỹ lưỡng trước khi giao xe.',
    service: 'Vá lốp',
    date: '3 tháng trước',
    verified: true,
  },
  {
    id: 6,
    name: 'Nguyễn Thị F',
    location: 'Quận Tân Bình, TP.HCM',
    rating: 5,
    avatar: '/images/avatars/customer-6.jpg',
    review:
      'Cảm ơn tiệm đã sửa xe SH của tôi. Dịch vụ tận tâm, giá cả minh bạch. Đặc biệt thích cách nhân viên tư vấn rất chân thành, không ép khách mua phụ tùng không cần thiết.',
    service: 'Sửa chữa tổng quát',
    date: '2 tháng trước',
    verified: true,
  },
];

const StarIcon = ({ filled }: { filled: boolean }) => (
  <svg
    className={`w-4 h-4 ${filled ? 'fill-current text-yellow-400' : 'text-gray-300'}`}
    viewBox="0 0 24 24"
  >
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

const VerifiedIcon = () => (
  <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
  </svg>
);

const QuoteIcon = () => (
  <svg className="w-8 h-8 text-primary-200" fill="currentColor" viewBox="0 0 24 24">
    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z" />
  </svg>
);

interface ReviewCardProps {
  review: (typeof reviews)[0];
  isActive: boolean;
}

function ReviewCard({ review, isActive }: ReviewCardProps) {
  return (
    <div
      className={`bg-white rounded-xl p-6 shadow-lg border border-gray-100 transition-all duration-300 ${
        isActive ? 'scale-105 shadow-xl' : ''
      }`}
    >
      {/* Quote Icon */}
      <div className="relative">
        <QuoteIcon />
      </div>

      {/* Review Content */}
      <div className="mt-4 mb-6">
        <p className="text-gray-700 leading-relaxed text-sm md:text-base">"{review.review}"</p>
      </div>

      {/* Service & Date */}
      <div className="flex items-center justify-between mb-4">
        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-700">
          {review.service}
        </span>
        <span className="text-xs text-gray-500">{review.date}</span>
      </div>

      {/* Rating */}
      <div className="flex items-center space-x-1 mb-4">
        {[...Array(5)].map((_, index) => (
          <StarIcon key={index} filled={index < review.rating} />
        ))}
        <span className="text-sm text-gray-600 ml-2">({review.rating}/5)</span>
      </div>

      {/* Customer Info */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
            {review.name.charAt(0)}
          </div>
          <div>
            <div className="flex items-center space-x-1">
              <h4 className="font-semibold text-gray-900 text-sm">{review.name}</h4>
              {review.verified && <VerifiedIcon />}
            </div>
            <p className="text-xs text-gray-500">{review.location}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CustomerReviews() {
  const [activeReview, setActiveReview] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-rotate reviews
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setActiveReview((prev) => (prev + 1) % reviews.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToReview = (index: number) => {
    setActiveReview(index);
    setIsAutoPlaying(false);
    // Resume auto-play after 10 seconds
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const visibleReviews = [
    reviews[activeReview],
    reviews[(activeReview + 1) % reviews.length],
    reviews[(activeReview + 2) % reviews.length],
  ];

  return (
    <section className="section bg-gradient-to-br p-6 from-gray-50 to-white">
      <div className="container-7xl">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 bg-success-100 text-success-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <span>💬</span>
            <span>Khách hàng nói gì về chúng tôi</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Đánh Giá Từ
            <span className="text-primary-600"> Khách Hàng Thực</span>
          </h2>

          <p className="text-lg text-gray-600 leading-relaxed">
            Hơn 2000 khách hàng đã tin tưởng và hài lòng với dịch vụ của chúng tôi. Hãy xem những
            chia sẻ chân thực từ họ.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {visibleReviews.map((review, index) => (
            <ReviewCard key={review.id} review={review} isActive={index === 0} />
          ))}
        </div>

        {/* Navigation Dots */}
        <div className="flex justify-center space-x-2 mb-12">
          {reviews.map((_, index) => (
            <button
              key={index}
              onClick={() => goToReview(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === activeReview
                  ? 'bg-primary-600 scale-125'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to review ${index + 1}`}
            />
          ))}
        </div>

        {/* Overall Rating Summary */}
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Tổng quan đánh giá
              </h3>

              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="text-4xl font-bold text-primary-600">4.9</div>
                  <div>
                    <div className="flex space-x-1 mb-1">
                      {[...Array(5)].map((_, index) => (
                        <StarIcon key={index} filled={index < 5} />
                      ))}
                    </div>
                    <p className="text-sm text-gray-600">Dựa trên 2000+ đánh giá</p>
                  </div>
                </div>

                <div className="space-y-2">
                  {[
                    { stars: 5, percentage: 85 },
                    { stars: 4, percentage: 12 },
                    { stars: 3, percentage: 2 },
                    { stars: 2, percentage: 1 },
                    { stars: 1, percentage: 0 },
                  ].map(({ stars, percentage }) => (
                    <div key={stars} className="flex items-center space-x-3">
                      <span className="text-sm text-gray-600 w-8">{stars} ⭐</span>
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-yellow-400 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <span className="text-sm text-gray-600 w-12">{percentage}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="text-center p-6 bg-primary-50 rounded-lg">
                <div className="text-2xl font-bold text-primary-600 mb-1">98%</div>
                <div className="text-sm text-gray-600">Khách hàng hài lòng</div>
              </div>
              <div className="text-center p-6 bg-success-50 rounded-lg">
                <div className="text-2xl font-bold text-success-600 mb-1">95%</div>
                <div className="text-sm text-gray-600">Quay lại lần 2</div>
              </div>
              <div className="text-center p-6 bg-secondary-50 rounded-lg">
                <div className="text-2xl font-bold text-secondary-600 mb-1">4.8</div>
                <div className="text-sm text-gray-600">Đánh giá Google</div>
              </div>
              <div className="text-center p-6 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600 mb-1">100%</div>
                <div className="text-sm text-gray-600">Đánh giá 5 sao Facebook</div>
              </div>
            </div>
          </div>

          <div className="text-center mt-8 pt-8 border-t border-gray-200">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">
              Bạn cũng muốn chia sẻ trải nghiệm?
            </h4>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/book-appointment" className="btn btn-primary">
                Đặt lịch trải nghiệm
              </a>
              <a
                href="https://www.google.com/search?q=tiệm+sửa+xe+máy+abc"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline"
              >
                Đánh giá trên Google
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
