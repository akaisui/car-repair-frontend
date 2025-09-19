'use client';

import { useState } from 'react';

const certifications = [
  {
    id: 1,
    name: 'Giấy phép Kinh doanh',
    issuer: 'Sở Kế hoạch và Đầu tư TP.HCM',
    number: '0123456789',
    issueDate: '15/03/2013',
    validUntil: 'Vô thời hạn',
    description: 'Giấy phép kinh doanh hợp pháp cho hoạt động sửa chữa xe máy',
    category: 'legal',
    icon: '📋',
    verified: true,
  },
  {
    id: 2,
    name: 'Chứng nhận ISO 9001:2015',
    issuer: 'Bureau Veritas Vietnam',
    number: 'VN-ISO-2018-001',
    issueDate: '20/06/2018',
    validUntil: '20/06/2027',
    description: 'Chứng nhận hệ thống quản lý chất lượng quốc tế',
    category: 'quality',
    icon: '🏆',
    verified: true,
  },
  {
    id: 3,
    name: 'Đại lý ủy quyền Honda',
    issuer: 'Honda Việt Nam',
    number: 'HVN-DA-2019-089',
    issueDate: '10/01/2019',
    validUntil: '10/01/2026',
    description: 'Được ủy quyền sửa chữa và cung cấp phụ tùng chính hãng Honda',
    category: 'partner',
    icon: '🤝',
    verified: true,
  },
  {
    id: 4,
    name: 'Đại lý ủy quyền Yamaha',
    issuer: 'Yamaha Motor Việt Nam',
    number: 'YMV-SP-2020-156',
    issueDate: '05/04/2020',
    validUntil: '05/04/2025',
    description: 'Đối tác chính thức cung cấp dịch vụ và phụ tùng Yamaha',
    category: 'partner',
    icon: '🤝',
    verified: true,
  },
  {
    id: 5,
    name: 'Chứng chỉ An toàn Lao động',
    issuer: 'Sở Lao động - Thương binh và Xã hội',
    number: 'ATVSLĐ-2021-0789',
    issueDate: '12/07/2021',
    validUntil: '12/07/2024',
    description: 'Đảm bảo an toàn lao động cho nhân viên và khách hàng',
    category: 'safety',
    icon: '🛡️',
    verified: true,
  },
  {
    id: 6,
    name: 'Chứng nhận Castrol Professional',
    issuer: 'Castrol Vietnam',
    number: 'CP-VN-2022-445',
    issueDate: '18/09/2022',
    validUntil: '18/09/2025',
    description: 'Chuyên gia về dầu nhớt và bảo dưỡng động cơ',
    category: 'technical',
    icon: '🛢️',
    verified: true,
  },
  {
    id: 7,
    name: 'Chứng chỉ Môi trường',
    issuer: 'Sở Tài nguyên và Môi trường',
    number: 'MT-HCM-2023-234',
    issueDate: '03/02/2023',
    validUntil: '03/02/2028',
    description: 'Cam kết bảo vệ môi trường trong hoạt động kinh doanh',
    category: 'environment',
    icon: '🌱',
    verified: true,
  },
  {
    id: 8,
    name: 'Giải thưởng Dịch vụ Uy tín',
    issuer: 'Hiệp hội Thương mại TP.HCM',
    number: 'DVUT-2023-089',
    issueDate: '15/12/2023',
    validUntil: 'N/A',
    description: 'Được công nhận là doanh nghiệp dịch vụ uy tín năm 2023',
    category: 'award',
    icon: '🏅',
    verified: true,
  },
];

const categories = [
  { id: 'all', name: 'Tất cả', count: certifications.length },
  {
    id: 'legal',
    name: 'Pháp lý',
    count: certifications.filter((c) => c.category === 'legal').length,
  },
  {
    id: 'quality',
    name: 'Chất lượng',
    count: certifications.filter((c) => c.category === 'quality').length,
  },
  {
    id: 'partner',
    name: 'Đối tác',
    count: certifications.filter((c) => c.category === 'partner').length,
  },
  {
    id: 'technical',
    name: 'Kỹ thuật',
    count: certifications.filter((c) => c.category === 'technical').length,
  },
  {
    id: 'safety',
    name: 'An toàn',
    count: certifications.filter((c) => c.category === 'safety').length,
  },
  {
    id: 'environment',
    name: 'Môi trường',
    count: certifications.filter((c) => c.category === 'environment').length,
  },
  {
    id: 'award',
    name: 'Giải thưởng',
    count: certifications.filter((c) => c.category === 'award').length,
  },
];

const VerifiedIcon = () => (
  <svg className="w-5 h-5 text-success-500" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
  </svg>
);

const CalendarIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
    />
  </svg>
);

const DocumentIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
    />
  </svg>
);

const EyeIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

export default function CertificationsSection() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedCert, setSelectedCert] = useState<number | null>(null);

  const filteredCertifications =
    selectedCategory === 'all'
      ? certifications
      : certifications.filter((cert) => cert.category === selectedCategory);

  const getCategoryColor = (category: string) => {
    const colors = {
      legal: 'from-blue-500 to-blue-600',
      quality: 'from-green-500 to-green-600',
      partner: 'from-purple-500 to-purple-600',
      technical: 'from-orange-500 to-orange-600',
      safety: 'from-red-500 to-red-600',
      environment: 'from-teal-500 to-teal-600',
      award: 'from-yellow-500 to-yellow-600',
    };
    return colors[category as keyof typeof colors] || 'from-gray-500 to-gray-600';
  };

  const isExpired = (validUntil: string) => {
    if (validUntil === 'Vô thời hạn' || validUntil === 'N/A') return false;
    const [day, month, year] = validUntil.split('/');
    const expiryDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    return expiryDate < new Date();
  };

  return (
    <section className="section bg-gray-50 p-6">
      <div className="container-7xl">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 bg-success-100 text-success-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <span>🏅</span>
            <span>Chứng chỉ & Giấy phép</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Được Chứng Nhận
            <span className="text-primary-600"> Chất Lượng & Uy Tín</span>
          </h2>

          <p className="text-lg text-gray-600 leading-relaxed">
            Chúng tôi tự hào sở hữu đầy đủ các chứng chỉ, giấy phép cần thiết và được công nhận bởi
            các tổ chức uy tín.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                selectedCategory === category.id
                  ? 'bg-primary-500 text-white shadow-md'
                  : 'bg-white text-gray-600 hover:bg-primary-50 hover:text-primary-600 border border-gray-200'
              }`}
            >
              {category.name} ({category.count})
            </button>
          ))}
        </div>

        {/* Certifications Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {filteredCertifications.map((cert) => (
            <div
              key={cert.id}
              className={`bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group cursor-pointer ${
                selectedCert === cert.id ? 'ring-2 ring-primary-500 shadow-lg' : ''
              }`}
              onClick={() => setSelectedCert(selectedCert === cert.id ? null : cert.id)}
            >
              {/* Header */}
              <div
                className={`bg-gradient-to-r ${getCategoryColor(cert.category)} p-6 text-white relative`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="text-3xl">{cert.icon}</div>
                    <div>
                      <h3 className="font-bold text-lg leading-tight">{cert.name}</h3>
                      <p className="text-white/80 text-sm">{cert.issuer}</p>
                    </div>
                  </div>

                  {cert.verified && (
                    <div className="bg-white/20 backdrop-blur-sm rounded-full p-2">
                      <VerifiedIcon />
                    </div>
                  )}
                </div>

                {/* Status Badge */}
                <div className="absolute top-4 right-4">
                  {isExpired(cert.validUntil) ? (
                    <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                      Hết hạn
                    </span>
                  ) : (
                    <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                      Còn hiệu lực
                    </span>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <p className="text-gray-600 text-sm leading-relaxed mb-4">{cert.description}</p>

                {/* Certificate Details */}
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2 text-gray-500">
                    <DocumentIcon />
                    <span>Số: {cert.number}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-500">
                    <CalendarIcon />
                    <span>Cấp: {cert.issueDate}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-500">
                    <CalendarIcon />
                    <span>Hết hạn: {cert.validUntil}</span>
                  </div>
                </div>

                {/* Expandable Details */}
                <div
                  className={`transition-all duration-300 overflow-hidden ${
                    selectedCert === cert.id ? 'max-h-48 opacity-100 mt-4' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="border-t border-gray-200 pt-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Thông tin chi tiết:</h4>
                    <div className="bg-gray-50 rounded-lg p-3 text-sm text-gray-600">
                      <p>
                        Chứng chỉ này xác nhận rằng {cert.issuer.toLowerCase()} đã đánh giá và công
                        nhận tiệm sửa xe Hồng Hậu đạt các tiêu chuẩn cần thiết về{' '}
                        {cert.name.toLowerCase()}.
                      </p>
                    </div>

                    <button className="mt-3 flex items-center space-x-2 text-primary-600 hover:text-primary-700 text-sm font-medium">
                      <EyeIcon />
                      <span>Xem bản gốc</span>
                    </button>
                  </div>
                </div>

                {/* Click indicator */}
                <div className="text-center mt-4 pt-4 border-t border-gray-100">
                  <span className="text-xs text-gray-400">
                    {selectedCert === cert.id ? 'Nhấn để thu gọn' : 'Nhấn để xem chi tiết'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Certification Stats */}
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-gray-200">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Thống kê chứng chỉ</h3>
            <p className="text-gray-600">Tổng quan về các chứng chỉ và giấy phép của chúng tôi</p>
          </div>

          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <div className="text-center p-6 bg-blue-50 rounded-xl">
              <div className="text-3xl font-bold text-blue-600 mb-2">{certifications.length}</div>
              <div className="text-sm text-blue-700">Tổng số chứng chỉ</div>
            </div>

            <div className="text-center p-6 bg-green-50 rounded-xl">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {certifications.filter((c) => !isExpired(c.validUntil)).length}
              </div>
              <div className="text-sm text-green-700">Còn hiệu lực</div>
            </div>

            <div className="text-center p-6 bg-purple-50 rounded-xl">
              <div className="text-3xl font-bold text-purple-600 mb-2">
                {certifications.filter((c) => c.category === 'partner').length}
              </div>
              <div className="text-sm text-purple-700">Đối tác chính thức</div>
            </div>

            <div className="text-center p-6 bg-yellow-50 rounded-xl">
              <div className="text-3xl font-bold text-yellow-600 mb-2">
                {certifications.filter((c) => c.category === 'award').length}
              </div>
              <div className="text-sm text-yellow-700">Giải thưởng</div>
            </div>
          </div>

          {/* Why Certifications Matter */}
          <div className="border-t border-gray-200 pt-8">
            <h4 className="text-xl font-bold text-gray-900 mb-6 text-center">
              Tại sao chứng chỉ quan trọng?
            </h4>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🛡️</span>
                </div>
                <h5 className="font-semibold text-gray-900 mb-2">Đảm bảo chất lượng</h5>
                <p className="text-sm text-gray-600">
                  Chứng chỉ xác nhận chúng tôi đáp ứng các tiêu chuẩn chất lượng cao nhất
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-success-100 text-success-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🤝</span>
                </div>
                <h5 className="font-semibold text-gray-900 mb-2">Tin cậy của khách hàng</h5>
                <p className="text-sm text-gray-600">
                  Khách hàng có thể yên tâm về tính hợp pháp và uy tín của dịch vụ
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-secondary-100 text-secondary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">⚡</span>
                </div>
                <h5 className="font-semibold text-gray-900 mb-2">Cải tiến liên tục</h5>
                <p className="text-sm text-gray-600">
                  Chúng tôi cam kết duy trì và nâng cao các tiêu chuẩn chứng chỉ
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Verification Notice */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <div className="flex items-start space-x-4">
            <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <VerifiedIcon />
            </div>
            <div>
              <h4 className="font-semibold text-blue-900 mb-2">Xác minh chứng chỉ</h4>
              <p className="text-sm text-blue-800 mb-4">
                Tất cả chứng chỉ và giấy phép được hiển thị đều là thật và có thể được xác minh.
                Khách hàng có thể yêu cầu xem bản gốc khi đến tiệm.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="tel:0901234567"
                  className="btn btn-sm bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Liên hệ xác minh
                </a>
                <button className="btn btn-sm btn-outline border-blue-300 text-blue-700 hover:bg-blue-50">
                  Tải xuống danh sách chứng chỉ
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
