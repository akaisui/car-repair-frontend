'use client';

import { useState } from 'react';

const facilityAreas = [
  {
    id: 1,
    name: 'Khu vực tiếp nhận',
    description: 'Nơi khách hàng được tư vấn và tiếp nhận xe máy',
    features: [
      'Quầy tư vấn hiện đại',
      'Khu vực chờ có điều hòa',
      'Wifi miễn phí',
      'Nước uống complimentary',
    ],
    image: '/images/facility/reception.jpg',
    size: '50m²',
    equipment: 'Hệ thống quản lý khách hàng, máy in hóa đơn',
  },
  {
    id: 2,
    name: 'Khu sửa chữa chính',
    description: 'Khu vực chính cho các công việc sửa chữa và bảo dưỡng',
    features: [
      'Nâng xe chuyên dụng',
      'Hệ thống chiếu sáng LED',
      'Thông gió tự nhiên',
      'Sàn chống trượt',
    ],
    image: '/images/facility/main-workshop.jpg',
    size: '200m²',
    equipment: 'Bộ dụng cụ chuyên nghiệp, máy nén khí, cầu nâng',
  },
  {
    id: 3,
    name: 'Khu chẩn đoán điện',
    description: 'Chuyên dụng cho việc chẩn đoán và sửa chữa hệ thống điện',
    features: [
      'Thiết bị chẩn đoán ECU',
      'Máy test đa năng',
      'Môi trường chống tĩnh điện',
      'Bàn làm việc chuyên dụng',
    ],
    image: '/images/facility/electrical.jpg',
    size: '30m²',
    equipment: 'Máy chẩn đoán Bosch, oscilloscope, multimeter chuyên dụng',
  },
  {
    id: 4,
    name: 'Kho phụ tùng',
    description: 'Kho bảo quản phụ tùng chính hãng với hệ thống quản lý hiện đại',
    features: [
      'Hệ thống kệ tự động',
      'Kiểm soát nhiệt độ, độ ẩm',
      'Camera an ninh 24/7',
      'Phần mềm quản lý tồn kho',
    ],
    image: '/images/facility/warehouse.jpg',
    size: '80m²',
    equipment: 'Hệ thống RFID, máy đọc mã vạch, điều hòa không khí',
  },
  {
    id: 5,
    name: 'Khu rửa xe',
    description: 'Khu vực rửa xe và vệ sinh xe máy chuyên nghiệp',
    features: [
      'Hệ thống xử lý nước thải',
      'Máy rửa áp lực cao',
      'Khu vực sấy khô',
      'Sàn thoát nước tốt',
    ],
    image: '/images/facility/wash-area.jpg',
    size: '40m²',
    equipment: 'Máy rửa Karcher, hệ thống lọc nước, máy sấy công nghiệp',
  },
  {
    id: 6,
    name: 'Văn phòng quản lý',
    description: 'Khu vực làm việc của ban quản lý và lưu trữ hồ sơ',
    features: [
      'Hệ thống máy tính hiện đại',
      'Tủ đựng hồ sơ khách hàng',
      'Máy in, scan chuyên dụng',
      'Điều hòa và âm thanh',
    ],
    image: '/images/facility/office.jpg',
    size: '25m²',
    equipment: 'PC, máy in laser, tủ fireproof, camera giám sát',
  },
];

const equipmentList = [
  {
    category: 'Thiết bị chẩn đoán',
    items: [
      { name: 'Máy chẩn đoán Bosch KTS 350', description: 'Chẩn đoán lỗi ECU, ABS' },
      { name: 'Máy đo khí thải', description: 'Kiểm tra mức độ ô nhiễm' },
      { name: 'Thiết bị test đa năng Fluke', description: 'Đo điện áp, dòng điện, điện trở' },
      { name: 'Oscilloscope', description: 'Phân tích tín hiệu điện' },
    ],
  },
  {
    category: 'Dụng cụ sửa chữa',
    items: [
      { name: 'Bộ cờ lê từ 8-32mm', description: 'Công cụ cơ bản cho mọi công việc' },
      { name: 'Máy nén khí 500L', description: 'Cung cấp khí nén cho dụng cụ' },
      { name: 'Cầu nâng xe máy', description: 'Nâng xe để sửa chữa dễ dàng' },
      { name: 'Súng bắn ốc', description: 'Tháo lắp ốc vít nhanh chóng' },
    ],
  },
  {
    category: 'Thiết bị an toàn',
    items: [
      { name: 'Hệ thống báo cháy', description: 'Cảnh báo sớm khi có cháy nổ' },
      { name: 'Bình chữa cháy CO2', description: 'Dập tắt cháy điện hiệu quả' },
      { name: 'Camera an ninh 16 kênh', description: 'Giám sát 24/7 toàn bộ khu vực' },
      { name: 'Khóa từ cửa ra vào', description: 'Kiểm soát ra vào an toàn' },
    ],
  },
];

const safetyStandards = [
  {
    icon: '🛡️',
    title: 'An toàn lao động',
    description: 'Đầy đủ trang thiết bị bảo hộ cá nhân cho nhân viên',
  },
  {
    icon: '🔥',
    title: 'Phòng cháy chữa cháy',
    description: 'Hệ thống PCCC đạt tiêu chuẩn, kiểm định định kỳ',
  },
  {
    icon: '🌱',
    title: 'Bảo vệ môi trường',
    description: 'Xử lý chất thải theo quy định, không gây ô nhiễm',
  },
  {
    icon: '📹',
    title: 'An ninh',
    description: 'Camera giám sát 24/7, bảo vệ tài sản khách hàng',
  },
];

const PlayIcon = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const EyeIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
    />
  </svg>
);

const MapIcon = () => (
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

export default function FacilityTour() {
  const [selectedArea, setSelectedArea] = useState(facilityAreas[0]);
  const [showVirtualTour, setShowVirtualTour] = useState(false);

  return (
    <section className="section bg-white p-6">
      <div className="container-7xl">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <span>🏢</span>
            <span>Cơ sở vật chất</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Khám Phá
            <span className="text-primary-600"> Cơ Sở Hiện Đại</span>
          </h2>

          <p className="text-lg text-gray-600 leading-relaxed">
            Tham quan cơ sở vật chất hiện đại với đầy đủ trang thiết bị chuyên nghiệp để phục vụ
            khách hàng tốt nhất.
          </p>
        </div>

        {/* Virtual Tour CTA */}
        <div className="bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl p-8 md:p-12 text-white text-center mb-16">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">Tour ảo 360° cơ sở tiệm</h3>
            <p className="text-primary-100 mb-8">
              Khám phá toàn bộ cơ sở của chúng tôi ngay từ nhà với công nghệ tour ảo 360°
            </p>
            <button
              onClick={() => setShowVirtualTour(true)}
              className="btn bg-white text-primary-600 hover:bg-gray-100 btn-lg flex items-center space-x-2 mx-auto"
            >
              <PlayIcon />
              <span>Bắt đầu tour ảo</span>
            </button>
          </div>
        </div>

        {/* Facility Areas */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {/* Area List */}
          <div className="lg:col-span-1 space-y-4">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Các khu vực chính</h3>
            {facilityAreas.map((area) => (
              <button
                key={area.id}
                onClick={() => setSelectedArea(area)}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${
                  selectedArea.id === area.id
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-gray-200 hover:border-primary-300 bg-white'
                }`}
              >
                <h4
                  className={`font-semibold mb-1 ${
                    selectedArea.id === area.id ? 'text-primary-700' : 'text-gray-900'
                  }`}
                >
                  {area.name}
                </h4>
                <p className="text-sm text-gray-600">{area.description}</p>
                <div className="text-xs text-gray-500 mt-2">Diện tích: {area.size}</div>
              </button>
            ))}
          </div>

          {/* Selected Area Details */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              {/* Area Image */}
              <div className="h-64 bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white relative">
                <div className="text-center">
                  <div className="text-6xl mb-4">🏭</div>
                  <h3 className="text-2xl font-bold">{selectedArea.name}</h3>
                  <p className="text-primary-100">{selectedArea.size}</p>
                </div>

                {/* View button */}
                <button className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full p-3 hover:bg-white/30 transition-colors duration-200">
                  <EyeIcon />
                </button>
              </div>

              {/* Area Info */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">{selectedArea.name}</h3>
                <p className="text-gray-600 mb-6">{selectedArea.description}</p>

                {/* Features */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Tính năng nổi bật:</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {selectedArea.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <span className="w-2 h-2 bg-success-500 rounded-full"></span>
                        <span className="text-sm text-gray-600">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Equipment */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Thiết bị chính:</h4>
                  <p className="text-sm text-gray-600">{selectedArea.equipment}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Equipment Details */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Trang thiết bị chuyên nghiệp
          </h3>

          <div className="grid lg:grid-cols-3 gap-8">
            {equipmentList.map((category, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6">
                <h4 className="font-bold text-gray-900 mb-4">{category.category}</h4>
                <div className="space-y-4">
                  {category.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="bg-white rounded-lg p-4 border border-gray-200">
                      <h5 className="font-semibold text-gray-900 mb-1">{item.name}</h5>
                      <p className="text-sm text-gray-600">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Safety Standards */}
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 md:p-12 mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Tiêu chuẩn an toàn</h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {safetyStandards.map((standard, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 text-center shadow-sm border border-gray-200"
              >
                <div className="text-4xl mb-4">{standard.icon}</div>
                <h4 className="font-semibold text-gray-900 mb-2">{standard.title}</h4>
                <p className="text-sm text-gray-600">{standard.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-xl">
            <h4 className="font-semibold text-blue-900 mb-2">Cam kết an toàn</h4>
            <p className="text-sm text-blue-800">
              Chúng tôi tuân thủ nghiêm ngặt các quy định về an toàn lao động, phòng cháy chữa cháy
              và bảo vệ môi trường. Cơ sở được kiểm định định kỳ bởi các cơ quan có thẩm quyền.
            </p>
          </div>
        </div>

        {/* Visit Information */}
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-gray-200">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Đến thăm cơ sở của chúng tôi</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Chúng tôi luôn chào đón khách hàng đến tham quan cơ sở và trực tiếp trải nghiệm chất
              lượng dịch vụ.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="text-center p-6 bg-primary-50 rounded-xl">
              <MapIcon />
              <h4 className="font-semibold text-gray-900 mt-3 mb-2">Địa chỉ</h4>
              <p className="text-sm text-gray-600">
                541 Trần Hưng Đạo
                <br />
                Phường Phú Lợi, TP Cần Thơ
              </p>
            </div>

            <div className="text-center p-6 bg-success-50 rounded-xl">
              <CalendarIcon />
              <h4 className="font-semibold text-gray-900 mt-3 mb-2">Giờ mở cửa</h4>
              <p className="text-sm text-gray-600">
                T2-T7: 7:00 - 19:00
                <br />
                CN: 8:00 - 17:00
              </p>
            </div>

            <div className="text-center p-6 bg-secondary-50 rounded-xl">
              <EyeIcon />
              <h4 className="font-semibold text-gray-900 mt-3 mb-2">Tham quan</h4>
              <p className="text-sm text-gray-600">
                Miễn phí tham quan
                <br />
                Không cần đặt lịch trước
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contact" className="btn btn-primary">
              Xem thông tin liên hệ
            </a>
            <a href="tel:0338037868" className="btn btn-outline">
              Gọi tư vấn: 033-803-7868
            </a>
            <button onClick={() => setShowVirtualTour(true)} className="btn btn-secondary">
              Tour ảo 360°
            </button>
          </div>
        </div>

        {/* Virtual Tour Modal */}
        {showVirtualTour && (
          <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h3 className="text-xl font-bold text-gray-900">
                  Tour ảo 360° - Tiệm Sửa Xe Hồng Hậu
                </h3>
                <button
                  onClick={() => setShowVirtualTour(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <div className="p-6">
                <div className="aspect-video bg-gradient-to-br from-primary-400 to-primary-600 rounded-lg flex items-center justify-center text-white">
                  <div className="text-center">
                    <PlayIcon />
                    <h4 className="text-xl font-bold mt-4 mb-2">Tour ảo 360°</h4>
                    <p className="text-primary-100">Tính năng đang được phát triển</p>
                    <p className="text-sm text-primary-200 mt-2">
                      Vui lòng liên hệ để được tham quan trực tiếp
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex justify-center">
                  <a href="tel:0901234567" className="btn btn-primary">
                    Đặt lịch tham quan: 0901 234 567
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
