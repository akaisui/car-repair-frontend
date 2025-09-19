'use client';

import { useState } from 'react';

const timeline = [
  {
    year: '2015',
    title: 'Học nghề',
    description:
      'Bắt đầu lên TP Hồ Chí Minh học nghề sửa chữa xe máy, trong giai đoạn này đã tìm hiểu và nắm vững các kỹ thuật sửa chữa xe máy.',
    image: '/images/timeline/2013.jpg',
    achievement: 'Học được các kỹ thuật sửa chữa xe máy',
  },
  {
    year: '2018',
    title: 'Tiếp tục học nghề',
    description:
      'Chuyển đến TP Sóc Trăng tiếp tục học nghề, bên cạnh đó còn nâng cao các kỹ năng khác.',
    image: '/images/timeline/2015.jpg',
    achievement: 'Nâng cao các kỹ năng khác',
  },
  {
    year: '2020',
    title: 'Mở một tiệm sửa chữa xe máy nhỏ',
    description: 'Mở một tiệm sửa chữa xe máy nhỏ với 2 thợ, tuy vất quả nhưng có thêm kinh nghiệm',
    image: '/images/timeline/2018.jpg',
    achievement: 'Đạt mốc 100 khách hàng thường xuyên',
  },
  {
    year: '2022',
    title: 'Mở rộng đội ngũ',
    description: 'Mở rộng đội ngũ thợ với 5 thợ chuyên nghiệp',
    image: '/images/timeline/2020.jpg',
    achievement: 'Hơn 1000 lượt đặt lịch online/tháng',
  },
  {
    year: '2025',
    title: 'Hiện tại',
    description:
      'Tư vấn và hỗ trợ khách hàng với đội ngũ 15 thợ giàu kinh nghiệm và phục vụ hơn 2000 khách hàng.',
    image: '/images/timeline/2023.jpg',
    achievement: '2000+ khách hàng tin tưởng',
  },
];

const milestones = [
  {
    year: '2015',
    event: 'Bắt đầu học nghề',
    details: 'Lên TP.HCM học nghề sửa xe máy',
  },
  {
    year: '2018',
    event: 'Nâng cao tay nghề',
    details: 'Chuyển đến Sóc Trăng, học nâng cao kỹ năng và tích lũy kinh nghiệm',
  },
  {
    year: '2020',
    event: 'Mở tiệm đầu tiên',
    details: 'Mở một tiệm sửa xe máy nhỏ với 2 thợ',
  },
  {
    year: '2021',
    event: 'Đạt mốc 100 khách hàng',
    details: 'Được 100 khách hàng thường xuyên tin tưởng',
  },
  {
    year: '2022',
    event: 'Mở rộng đội ngũ',
    details: 'Tăng lên 5 thợ chuyên nghiệp, phục vụ nhiều khách hơn',
  },
  {
    year: '2023',
    event: '1000 lượt đặt lịch/tháng',
    details: 'Đạt hơn 1000 lượt đặt lịch online mỗi tháng',
  },
  {
    year: '2025',
    event: '2000+ khách hàng',
    details: 'Vận hành cùng 15 thợ, phục vụ hơn 2000 khách hàng thường xuyên',
  },
];

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

const AwardIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
    />
  </svg>
);

export default function CompanyStory() {
  const [activeTimeline, setActiveTimeline] = useState(0);

  return (
    <section className="section bg-white p-6">
      <div className="container-7xl">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <span>📖</span>
            <span>Câu chuyện của chúng tôi</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Hành Trình
            <span className="text-primary-600"> 10 Năm Phát Triển</span>
          </h2>

          <p className="text-lg text-gray-600 leading-relaxed">
            Từ một gian hàng nhỏ với tình yêu xe máy, chúng tôi đã phát triển thành một trong những
            tiệm sửa xe uy tín nhất khu vực.
          </p>
        </div>

        {/* Timeline */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Dòng thời gian phát triển
          </h3>

          {/* Desktop Timeline */}
          <div className="hidden lg:block">
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gray-200"></div>

              <div className="space-y-12">
                {timeline.map((item, index) => (
                  <div
                    key={index}
                    className={`flex items-center ${index % 2 === 0 ? '' : 'flex-row-reverse'}`}
                  >
                    <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8'}`}>
                      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
                        <div className="flex items-center space-x-2 mb-3">
                          <CalendarIcon />
                          <span className="text-2xl font-bold text-primary-600">{item.year}</span>
                        </div>
                        <h4 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h4>
                        <p className="text-gray-600 mb-4 leading-relaxed">{item.description}</p>
                        <div className="flex items-center space-x-2 text-success-600">
                          <AwardIcon />
                          <span className="text-sm font-medium">{item.achievement}</span>
                        </div>
                      </div>
                    </div>

                    {/* Timeline Node */}
                    <div className="relative z-10 flex items-center justify-center w-12 h-12 bg-primary-500 text-white rounded-full border-4 border-white shadow-lg">
                      <span className="text-sm font-bold">{item.year.slice(-2)}</span>
                    </div>

                    <div className="w-1/2"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile Timeline */}
          <div className="lg:hidden space-y-6">
            {timeline.map((item, index) => (
              <div
                key={index}
                className={`bg-white border border-gray-200 rounded-xl p-6 shadow-sm cursor-pointer transition-all duration-200 ${
                  activeTimeline === index ? 'ring-2 ring-primary-500 shadow-lg' : 'hover:shadow-md'
                }`}
                onClick={() => setActiveTimeline(index)}
              >
                <div className="flex items-center space-x-2 mb-3">
                  <CalendarIcon />
                  <span className="text-2xl font-bold text-primary-600">{item.year}</span>
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h4>
                <p className="text-gray-600 mb-4 leading-relaxed">{item.description}</p>
                <div className="flex items-center space-x-2 text-success-600">
                  <AwardIcon />
                  <span className="text-sm font-medium">{item.achievement}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Key Milestones */}
        <div className="bg-gray-50 rounded-2xl p-6 md:p-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Những cột mốc quan trọng
          </h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {milestones.map((milestone, index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200"
              >
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center font-bold text-sm">
                    {milestone.year.slice(-2)}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{milestone.event}</h4>
                    <p className="text-sm text-gray-600">{milestone.year}</p>
                  </div>
                </div>
                <p className="text-gray-600 text-sm">{milestone.details}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Founder Story */}
        <div className="mt-16 grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900">Câu chuyện người sáng lập</h3>

            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                <strong className="text-gray-900">Anh Nguyễn Văn Hậu</strong>, người sáng lập tiệm,
                bắt đầu với niềm đam mê xe máy từ khi còn nhỏ. Sau khi học xong lớp 9, anh quyết
                định nghỉ học và theo đuổi ước mơ mở một tiệm sửa xe máy chuyên nghiệp.
              </p>

              <p>
                "Tôi muốn tạo ra một nơi mà khách hàng có thể hoàn toàn tin tưởng gửi gắm chiếc xe
                của mình. Một nơi mà chất lượng dịch vụ luôn được đặt lên hàng đầu, và khách hàng
                được đối xử như người thân trong gia đình."
              </p>

              <p>
                Với triết lý "Uy tín - Chất lượng - Tận tâm", tiệm đã không ngừng phát triển và trở
                thành địa chỉ tin cậy của hàng nghìn khách hàng tại Cần Thơ.
              </p>
            </div>

            <div className="bg-primary-50 border border-primary-200 rounded-lg p-6">
              <h4 className="font-semibold text-primary-900 mb-2">Triết lý kinh doanh</h4>
              <div className="space-y-2 text-sm text-primary-800">
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-primary-500 rounded-full"></span>
                  <span>Chất lượng dịch vụ là ưu tiên số 1</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-primary-500 rounded-full"></span>
                  <span>Đối xử với khách hàng như người thân</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-primary-500 rounded-full"></span>
                  <span>Minh bạch trong giá cả và dịch vụ</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-primary-500 rounded-full"></span>
                  <span>Không ngừng học hỏi và cải tiến</span>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            {/* Founder Image Placeholder */}
            <div className="bg-gradient-to-br from-primary-100 to-primary-200 rounded-2xl h-96 flex items-center justify-center">
              <div className="text-center text-primary-600">
                <div className="w-24 h-24 bg-primary-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-3xl">👨‍🔧</span>
                </div>
                <p className="font-semibold">Anh Nguyễn Văn Hậu</p>
                <p className="text-sm">Người sáng lập & Chủ tiệm</p>
              </div>
            </div>

            {/* Quote */}
            <div className="absolute -bottom-6 left-6 right-6 bg-white rounded-xl p-6 shadow-lg border border-gray-200">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z" />
                  </svg>
                </div>
                <div>
                  <p className="text-gray-700 text-sm italic">
                    "Thành công của tiệm không chỉ đo bằng doanh thu, mà còn bằng nụ cười hài lòng
                    của khách hàng khi nhận lại chiếc xe."
                  </p>
                  <p className="text-xs text-gray-500 mt-2">- Nguyễn Văn Hậu, Chủ tiệm</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
