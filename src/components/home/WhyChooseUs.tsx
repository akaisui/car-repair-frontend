'use client';

import { useState } from 'react';

const reasons = [
  {
    id: 1,
    icon: '🏆',
    title: 'Kinh nghiệm lâu năm',
    description:
      'Hơn 10 năm kinh nghiệm trong ngành sửa chữa xe máy với đội ngũ thợ giàu kinh nghiệm.',
    details: [
      'Đội ngũ thợ có chứng chỉ chuyên môn',
      'Kinh nghiệm sửa chữa đa dạng loại xe',
      'Luôn cập nhật công nghệ mới nhất',
      'Đào tạo thường xuyên cho nhân viên',
    ],
    color: 'from-blue-500 to-blue-600',
  },
  {
    id: 2,
    icon: '⚡',
    title: 'Nhanh chóng - Chính xác',
    description: 'Chẩn đoán nhanh, sửa chữa chính xác với thời gian hoàn thành ngắn nhất.',
    details: [
      'Thiết bị chẩn đoán hiện đại',
      'Quy trình làm việc tối ưu',
      'Thời gian chờ đợi tối thiểu',
      'Báo giá minh bạch từ đầu',
    ],
    color: 'from-green-500 to-green-600',
  },
  {
    id: 3,
    icon: '🔧',
    title: 'Phụ tùng chính hãng',
    description: 'Cam kết 100% sử dụng phụ tùng chính hãng với nguồn gốc rõ ràng.',
    details: [
      'Đại lý chính thức các hãng xe',
      'Phụ tùng có tem chống hàng giả',
      'Bảo hành phụ tùng theo quy định',
      'Giá cả cạnh tranh so với thị trường',
    ],
    color: 'from-purple-500 to-purple-600',
  },
  {
    id: 4,
    icon: '💰',
    title: 'Giá cả hợp lý',
    description: 'Bảng giá minh bạch, cạnh tranh với chất lượng dịch vụ tốt nhất.',
    details: [
      'Báo giá chi tiết trước khi sửa',
      'Không phát sinh chi phí ẩn',
      'Nhiều gói dịch vụ ưu đãi',
      'Chương trình khuyến mãi thường xuyên',
    ],
    color: 'from-orange-500 to-orange-600',
  },
  {
    id: 5,
    icon: '🛡️',
    title: 'Bảo hành dài hạn',
    description: 'Bảo hành dịch vụ lên đến 6 tháng với cam kết chất lượng.',
    details: [
      'Bảo hành dịch vụ 3-6 tháng',
      'Bảo hành phụ tùng theo hãng',
      'Hỗ trợ sau bán hàng tận tình',
      'Kiểm tra định kỳ miễn phí',
    ],
    color: 'from-red-500 to-red-600',
  },
  {
    id: 6,
    icon: '🏪',
    title: 'Cơ sở vật chất hiện đại',
    description: 'Tiệm được trang bị đầy đủ thiết bị hiện đại, không gian sạch sẽ.',
    details: [
      'Khu vực chờ điều hòa, wifi miễn phí',
      'Thiết bị sửa chữa hiện đại',
      'Không gian làm việc sạch sẽ',
      'Camera an ninh đảm bảo an toàn',
    ],
    color: 'from-teal-500 to-teal-600',
  },
];

const CheckIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

export default function WhyChooseUs() {
  const [activeReason, setActiveReason] = useState<number | null>(null);

  return (
    <section className="section bg-white p-6">
      <div className="container-7xl">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <span>⭐</span>
            <span>Tại sao chọn chúng tôi</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            6 Lý Do Bạn Nên
            <span className="text-primary-600"> Tin Tưởng Chúng Tôi</span>
          </h2>

          <p className="text-lg text-gray-600 leading-relaxed">
            Với hơn 10 năm kinh nghiệm và cam kết mang đến dịch vụ tốt nhất, chúng tôi tự tin là sự
            lựa chọn đúng đắn cho xe máy của bạn.
          </p>
        </div>

        {/* Reasons Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {reasons.map((reason, index) => (
            <div
              key={reason.id}
              className={`group relative bg-white rounded-xl border-2 border-gray-100 hover:border-primary-200 transition-all duration-300 overflow-hidden ${
                activeReason === reason.id ? 'ring-2 ring-primary-500 border-primary-300' : ''
              }`}
              onMouseEnter={() => setActiveReason(reason.id)}
              onMouseLeave={() => setActiveReason(null)}
            >
              {/* Card Header */}
              <div className="p-6 pb-4">
                <div
                  className={`w-16 h-16 rounded-xl bg-gradient-to-br ${reason.color} text-white flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  {reason.icon}
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors duration-200">
                  {reason.title}
                </h3>

                <p className="text-gray-600 leading-relaxed">{reason.description}</p>
              </div>

              {/* Expandable Details */}
              <div
                className={`transition-all duration-300 overflow-hidden ${
                  activeReason === reason.id ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-6 pb-6">
                  <div className="border-t border-gray-100 pt-4">
                    <h4 className="text-sm font-semibold text-gray-900 mb-3">Chi tiết:</h4>
                    <div className="space-y-2">
                      {reason.details.map((detail, detailIndex) => (
                        <div key={detailIndex} className="flex items-center space-x-2">
                          <div className="flex-shrink-0 w-4 h-4 bg-success-100 text-success-600 rounded-full flex items-center justify-center">
                            <CheckIcon />
                          </div>
                          <span className="text-sm text-gray-600">{detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Hover Effect Border */}
              <div
                className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${reason.color} transition-all duration-300 ${
                  activeReason === reason.id ? 'w-full' : 'w-0'
                }`}
              />
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl p-8 md:p-12 text-white relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-4 right-4 w-32 h-32 border-2 border-white/30 rounded-full" />
            <div className="absolute bottom-4 left-4 w-24 h-24 border-2 border-white/30 rounded-full" />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 border border-white/20 rounded-full" />
          </div>

          <div className="relative z-10 text-center max-w-4xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Sẵn sàng trải nghiệm dịch vụ chất lượng?
            </h3>

            <p className="text-lg text-white/90 mb-8 leading-relaxed">
              Đặt lịch hẹn ngay hôm nay để nhận được sự chăm sóc tốt nhất cho xe máy của bạn. Chúng
              tôi cam kết mang đến trải nghiệm dịch vụ vượt trội.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <a
                href="/book-appointment"
                className="btn bg-white text-primary-600 hover:bg-gray-100 font-semibold"
              >
                Đặt lịch ngay
              </a>
              <a
                href="tel:0901234567"
                className="btn border-2 border-white text-white hover:bg-white hover:text-primary-600"
              >
                Gọi tư vấn: 0901 234 567
              </a>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold">2000+</div>
                <div className="text-sm text-white/80">Khách hàng tin tưởng</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">10+</div>
                <div className="text-sm text-white/80">Năm kinh nghiệm</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">98%</div>
                <div className="text-sm text-white/80">Khách hàng hài lòng</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">6 tháng</div>
                <div className="text-sm text-white/80">Bảo hành dịch vụ</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
