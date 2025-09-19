'use client';

const values = [
  {
    id: 1,
    icon: '🏆',
    title: 'Uy tín',
    description:
      'Xây dựng niềm tin thông qua chất lượng dịch vụ và sự minh bạch trong mọi giao dịch.',
    details: [
      'Báo giá rõ ràng, không phát sinh',
      'Cam kết thời gian hoàn thành',
      'Sử dụng phụ tùng chính hãng',
      'Bảo hành theo cam kết',
    ],
    color: 'from-blue-500 to-blue-600',
  },
  {
    id: 2,
    icon: '⚡',
    title: 'Chất lượng',
    description:
      'Đặt chất lượng dịch vụ lên hàng đầu với đội ngũ thợ giàu kinh nghiệm và thiết bị hiện đại.',
    details: [
      'Thợ có chứng chỉ chuyên môn',
      'Thiết bị chẩn đoán hiện đại',
      'Quy trình làm việc chuẩn hóa',
      'Kiểm tra chất lượng nghiêm ngặt',
    ],
    color: 'from-green-500 to-green-600',
  },
  {
    id: 3,
    icon: '❤️',
    title: 'Tận tâm',
    description:
      'Phục vụ khách hàng với tất cả sự tận tâm, chu đáo như đối với người thân trong gia đình.',
    details: [
      'Tư vấn chi tiết, nhiệt tình',
      'Chăm sóc khách hàng sau bán hàng',
      'Hỗ trợ 24/7 khi khẩn cấp',
      'Lắng nghe và giải quyết khiếu nại',
    ],
    color: 'from-red-500 to-red-600',
  },
];

const principles = [
  {
    icon: '🔍',
    title: 'Minh bạch',
    description: 'Công khai quy trình, giá cả và chất lượng dịch vụ',
  },
  {
    icon: '🚀',
    title: 'Cải tiến',
    description: 'Không ngừng học hỏi và áp dụng công nghệ mới',
  },
  {
    icon: '🤝',
    title: 'Hợp tác',
    description: 'Xây dựng mối quan hệ lâu dài với khách hàng',
  },
  {
    icon: '🌱',
    title: 'Phát triển',
    description: 'Cam kết phát triển bền vững cùng cộng đồng',
  },
  {
    icon: '🎯',
    title: 'Chuyên nghiệp',
    description: 'Thái độ làm việc chuyên nghiệp trong mọi tình huống',
  },
  {
    icon: '💚',
    title: 'Trách nhiệm',
    description: 'Chịu trách nhiệm hoàn toàn về chất lượng dịch vụ',
  },
];

const CheckIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

const QuoteIcon = () => (
  <svg className="w-8 h-8 text-primary-200" fill="currentColor" viewBox="0 0 24 24">
    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z" />
  </svg>
);

export default function ValuesSection() {
  return (
    <section className="section bg-gray-50 p-6">
      <div className="container-7xl">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <span>💎</span>
            <span>Giá trị cốt lõi</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Những Giá Trị
            <span className="text-primary-600"> Chúng Tôi Theo Đuổi</span>
          </h2>

          <p className="text-lg text-gray-600 leading-relaxed">
            Ba giá trị cốt lõi định hướng mọi hoạt động của chúng tôi, tạo nên sự khác biệt trong
            cách phục vụ khách hàng.
          </p>
        </div>

        {/* Core Values */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {values.map((value, index) => (
            <div
              key={value.id}
              className="group bg-white rounded-2xl p-8 shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300 relative overflow-hidden"
            >
              {/* Background Gradient */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${value.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
              ></div>

              {/* Content */}
              <div className="relative z-10">
                {/* Icon */}
                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${value.color} text-white flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  {value.icon}
                </div>

                {/* Title & Description */}
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-primary-600 transition-colors duration-200">
                  {value.title}
                </h3>

                <p className="text-gray-600 mb-6 leading-relaxed">{value.description}</p>

                {/* Details */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900 text-sm">Cam kết cụ thể:</h4>
                  {value.details.map((detail, detailIndex) => (
                    <div key={detailIndex} className="flex items-center space-x-3">
                      <div className="flex-shrink-0 w-4 h-4 bg-success-100 text-success-600 rounded-full flex items-center justify-center">
                        <CheckIcon />
                      </div>
                      <span className="text-sm text-gray-600">{detail}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Hover Effect Border */}
              <div
                className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${value.color} transition-all duration-300 w-0 group-hover:w-full`}
              ></div>
            </div>
          ))}
        </div>

        {/* Principles Grid */}
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-gray-200">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Nguyên tắc hoạt động</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Những nguyên tắc này hướng dẫn chúng tôi trong mọi quyết định và hành động hàng ngày.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {principles.map((principle, index) => (
              <div
                key={index}
                className="flex items-start space-x-4 p-6 bg-gray-50 rounded-xl hover:bg-primary-50 transition-colors duration-200 group"
              >
                <div className="text-2xl">{principle.icon}</div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors duration-200">
                    {principle.title}
                  </h4>
                  <p className="text-sm text-gray-600">{principle.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="mt-16 grid lg:grid-cols-2 gap-8">
          {/* Mission */}
          <div className="bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl p-8 text-white relative overflow-hidden">
            <div className="relative z-10">
              <QuoteIcon />
              <h3 className="text-2xl font-bold mb-4 mt-4">Sứ mệnh</h3>
              <p className="text-primary-100 leading-relaxed mb-6">
                Mang đến dịch vụ sửa chữa xe máy chất lượng cao, giá cả hợp lý, giúp mọi người có
                thể yên tâm di chuyển hàng ngày. Chúng tôi cam kết xây dựng niềm tin thông qua sự
                minh bạch, chuyên nghiệp và tận tâm trong mọi dịch vụ.
              </p>
              <div className="text-sm text-primary-200">
                "Để mọi chuyến đi trở nên an toàn và yên tâm"
              </div>
            </div>

            {/* Background decoration */}
            <div className="absolute top-4 right-4 w-20 h-20 border-2 border-white/20 rounded-full">
              <img
                src="https://cl-wpml.careerlink.vn/cam-nang-viec-lam/wp-content/uploads/2023/10/27161901/business-concept-with-team-close-up.jpg"
                alt=""
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div className="absolute bottom-4 left-4 w-16 h-16 border border-white/10 rounded-full"></div>
          </div>

          {/* Vision */}
          <div className="bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-2xl p-8 text-white relative overflow-hidden">
            <div className="relative z-10">
              <QuoteIcon />
              <h3 className="text-2xl font-bold mb-4 mt-4">Tầm nhìn</h3>
              <p className="text-secondary-100 leading-relaxed mb-6">
                Trở thành tiệm sửa xe máy hàng đầu tại TP.HCM, được biết đến với chất lượng dịch vụ
                xuất sắc và sự đổi mới không ngừng. Chúng tôi hướng tới việc mở rộng mạng lưới và
                ứng dụng công nghệ để phục vụ khách hàng tốt hơn.
              </p>
              <div className="text-sm text-secondary-200">
                "Định hướng tương lai với công nghệ và chất lượng"
              </div>
            </div>

            {/* Background decoration */}
            <div className="absolute top-4 right-4 w-20 h-20 border-2 border-white/20 rounded-full">
              <img
                src="https://www.vietnamworks.com/hrinsider/wp-content/uploads/2020/03/1903.24.1.jpg"
                alt=""
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div className="absolute bottom-4 left-4 w-16 h-16 border border-white/10 rounded-full"></div>
          </div>
        </div>

        {/* Culture Section */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-8">Văn hóa doanh nghiệp</h3>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                icon: '🎯',
                title: 'Mục tiêu chung',
                description: 'Cùng nhau hướng tới sự hoàn thiện',
              },
              {
                icon: '🤗',
                title: 'Môi trường thân thiện',
                description: 'Nơi làm việc tích cực và hỗ trợ lẫn nhau',
              },
              {
                icon: '📚',
                title: 'Học hỏi liên tục',
                description: 'Không ngừng nâng cao kỹ năng và kiến thức',
              },
              {
                icon: '🏅',
                title: 'Ghi nhận thành tích',
                description: 'Đánh giá và khen thưởng xứng đang',
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-md transition-shadow duration-200"
              >
                <div className="text-3xl mb-3">{item.icon}</div>
                <h4 className="font-semibold text-gray-900 mb-2">{item.title}</h4>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
