'use client';

import { useState } from 'react';
import Image from 'next/image';

const teamMembers = [
  {
    id: 1,
    name: 'Nguyễn Văn Hậu',
    position: 'Chủ tiệm & Thợ trưởng',
    experience: '10 năm',
    speciality: 'Sửa chữa tổng quát, Điện',
    avatar: '/images/member/hau.jpg',
    description:
      'Người sáng lập tiệm với hơn 10 năm kinh nghiệm. Chuyên gia về hệ thống điện và sửa chữa tổng quát.',
    achievements: [
      'Chứng chỉ Kỹ thuật viên Honda',
      'Chứng chỉ Kỹ thuật viên Yamaha',
      '10+ năm kinh nghiệm',
      'Đã sửa hơn 1000 xe',
    ],
    quote: 'Chất lượng không phải là một hành động, mà là một thói quen.',
    social: {
      phone: '0901234567',
      email: 'owner@suaxemay.com',
    },
  },
  {
    id: 2,
    name: 'Nguyễn Văn Trung Kiên',
    position: 'Thợ chính - Động cơ',
    experience: '5 năm',
    speciality: 'Động cơ, Hộp số',
    avatar: '/images/member/kien.jpg',
    description:
      'Chuyên gia về động cơ và hộp số với khả năng chẩn đoán chính xác các hư hỏng phức tạp.',
    achievements: [
      'Chứng chỉ Suzuki Technical',
      'Chuyên gia động cơ 4 thì',
      'Đào tạo tại Nhật Bản',
      '1000+ động cơ đã sửa',
    ],
    quote: 'Mỗi động cơ đều có câu chuyện riêng, nhiệm vụ của tôi là lắng nghe.',
    social: {
      phone: '0901234568',
    },
  },
  {
    id: 3,
    name: 'Nguyễn Văn Khởi',
    position: 'Thợ chính - Phanh & Treo',
    experience: '8 năm',
    speciality: 'Phanh, Hệ thống treo',
    avatar: '/images/team/member-3.jpg',
    description: 'Chuyên về hệ thống phanh và treo, đảm bảo an toàn tuyệt đối cho khách hàng.',
    achievements: [
      'Chứng chỉ An toàn giao thông',
      'Chuyên gia phanh ABS',
      'Kỹ thuật viên Piaggio',
      'Thành viên Hiệp hội Thợ máy VN',
    ],
    quote: 'An toàn của khách hàng là ưu tiên hàng đầu trong mọi công việc.',
    social: {
      phone: '0901234569',
    },
  },
  {
    id: 4,
    name: 'Nguyễn Thị Hồng',
    position: 'Nhân viên tư vấn',
    experience: '4 năm',
    speciality: 'Tư vấn, Chăm sóc KH',
    avatar: '/images/team/member-6.jpg',
    description: 'Chuyên viên tư vấn và chăm sóc khách hàng với thái độ nhiệt tình, chu đáo.',
    achievements: [
      'Cử nhân Kinh doanh',
      'Chứng chỉ Dịch vụ khách hàng',
      'Giải thưởng Nhân viên xuất sắc',
      'Tỷ lệ hài lòng KH 98%',
    ],
    quote: 'Nụ cười và sự tận tâm là chìa khóa để chinh phục khách hàng.',
    social: {
      phone: '0901234572',
      email: 'tuvan@suaxemay.com',
    },
  },
];

const departments = [
  {
    name: 'Bộ phận Kỹ thuật',
    members: 3,
    description: 'Đội ngũ thợ giàu kinh nghiệm, chuyên môn cao',
    icon: '🔧',
  },
  {
    name: 'Bộ phận Tư vấn',
    members: 1,
    description: 'Hỗ trợ khách hàng và tư vấn dịch vụ',
    icon: '💬',
  },
  {
    name: 'Bộ phận Quản lý',
    members: 1,
    description: 'Điều hành và quản lý hoạt động tiệm',
    icon: '👔',
  },
];

const PhoneIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
    />
  </svg>
);

const EmailIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
    />
  </svg>
);

const AwardIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
    />
  </svg>
);

const QuoteIcon = () => (
  <svg className="w-6 h-6 text-primary-300" fill="currentColor" viewBox="0 0 24 24">
    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z" />
  </svg>
);

export default function TeamSection() {
  const [selectedMember, setSelectedMember] = useState<number | null>(null);
  const [imageErrors, setImageErrors] = useState<Set<number>>(new Set());

  return (
    <section className="section bg-white p-6">
      <div className="container-7xl">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <span>👥</span>
            <span>Đội ngũ của chúng tôi</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Gặp Gỡ
            <span className="text-primary-600"> Đội Ngũ Chuyên Nghiệp</span>
          </h2>

          <p className="text-lg text-gray-600 leading-relaxed">
            Đội ngũ thợ giàu kinh nghiệm và nhiệt huyết, luôn sẵn sàng mang đến dịch vụ tốt nhất cho
            xe máy của bạn.
          </p>
        </div>

        {/* Department Overview */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {departments.map((dept, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-xl p-6 text-center hover:bg-primary-50 transition-colors duration-200"
            >
              <div className="text-4xl mb-4">{dept.icon}</div>
              <h3 className="font-bold text-gray-900 mb-2">{dept.name}</h3>
              <p className="text-gray-600 text-sm mb-3">{dept.description}</p>
              <div className="text-2xl font-bold text-primary-600">{dept.members}</div>
              <div className="text-xs text-gray-500">thành viên</div>
            </div>
          ))}
        </div>

        {/* Team Members Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className={`bg-white rounded-2xl p-6 shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300 cursor-pointer ${
                selectedMember === member.id ? 'ring-2 ring-primary-500 shadow-lg' : ''
              }`}
              onClick={() => setSelectedMember(selectedMember === member.id ? null : member.id)}
            >
              {/* Avatar */}
              <div className="relative mb-6">
                {imageErrors.has(member.id) ? (
                  // Fallback avatar with initials
                  <div className="w-24 h-24 rounded-full mx-auto bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white text-2xl font-bold border-4 border-white shadow-lg">
                    {member.name.split(' ').pop()?.charAt(0)}
                  </div>
                ) : (
                  // Actual image avatar
                  <div className="w-24 h-24 rounded-full mx-auto overflow-hidden bg-gray-100 border-4 border-white shadow-lg relative">
                    <Image
                      src={member.avatar}
                      alt={`${member.name} - ${member.position}`}
                      fill
                      className="object-cover"
                      sizes="96px"
                      onError={() => {
                        setImageErrors((prev) => new Set([...prev, member.id]));
                      }}
                    />
                  </div>
                )}
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-white border-2 border-gray-200 rounded-full px-3 py-1">
                  <span className="text-xs font-medium text-gray-600">{member.experience}</span>
                </div>
              </div>

              {/* Basic Info */}
              <div className="text-center mb-4">
                <h3 className="text-lg font-bold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-primary-600 font-medium text-sm mb-2">{member.position}</p>
                <p className="text-gray-600 text-sm">{member.speciality}</p>
              </div>

              {/* Description */}
              <p className="text-gray-600 text-sm text-center mb-4 leading-relaxed">
                {member.description}
              </p>

              {/* Expandable Details */}
              <div
                className={`transition-all duration-300 overflow-hidden ${
                  selectedMember === member.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="border-t border-gray-200 pt-4 space-y-4">
                  {/* Achievements */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2 text-sm flex items-center space-x-2">
                      <AwardIcon />
                      <span>Thành tựu</span>
                    </h4>
                    <div className="space-y-1">
                      {member.achievements.map((achievement, index) => (
                        <div
                          key={index}
                          className="text-xs text-gray-600 flex items-center space-x-2"
                        >
                          <span className="w-1 h-1 bg-primary-500 rounded-full"></span>
                          <span>{achievement}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Quote */}
                  <div className="bg-primary-50 rounded-lg p-3">
                    <QuoteIcon />
                    <p className="text-sm text-primary-800 italic mt-2">"{member.quote}"</p>
                  </div>

                  {/* Contact */}
                  <div className="flex justify-center space-x-4">
                    {member.social.phone && (
                      <a
                        href={`tel:${member.social.phone}`}
                        className="flex items-center space-x-1 text-xs text-gray-600 hover:text-primary-600 transition-colors duration-200"
                      >
                        <PhoneIcon />
                        <span>Gọi</span>
                      </a>
                    )}
                    {member.social.email && (
                      <a
                        href={`mailto:${member.social.email}`}
                        className="flex items-center space-x-1 text-xs text-gray-600 hover:text-primary-600 transition-colors duration-200"
                      >
                        <EmailIcon />
                        <span>Email</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* Click indicator */}
              <div className="text-center mt-4">
                <span className="text-xs text-gray-400">
                  {selectedMember === member.id ? 'Nhấn để thu gọn' : 'Nhấn để xem thêm'}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Team Stats */}
        <div className="bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl p-8 md:p-12 text-white">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-4">Đội ngũ theo số liệu</h3>
            <p className="text-primary-100 max-w-2xl mx-auto">
              Những con số ấn tượng về đội ngũ nhân viên của chúng tôi
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-secondary-400 mb-2">15</div>
              <div className="text-sm text-primary-100">Nhân viên</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-secondary-400 mb-2">96</div>
              <div className="text-sm text-primary-100">Năm kinh nghiệm tổng</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-secondary-400 mb-2">25+</div>
              <div className="text-sm text-primary-100">Chứng chỉ chuyên môn</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-secondary-400 mb-2">100%</div>
              <div className="text-sm text-primary-100">Tỷ lệ giữ chân nhân viên</div>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-white/20 text-center">
            <h4 className="font-semibold mb-4">Môi trường làm việc</h4>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center justify-center space-x-2">
                <span>🎯</span>
                <span>Đào tạo thường xuyên</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <span>🤝</span>
                <span>Làm việc nhóm hiệu quả</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <span>🏆</span>
                <span>Khen thưởng xứng đáng</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recruitment */}
        <div className="mt-16 bg-gray-50 rounded-2xl p-8 md:p-12 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Tham gia đội ngũ của chúng tôi</h3>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Chúng tôi luôn tìm kiếm những tài năng mới để gia nhập đội ngũ. Nếu bạn có đam mê với xe
            máy và muốn phát triển sự nghiệp, hãy liên hệ với chúng tôi.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {[
              {
                title: 'Thợ sửa chữa',
                requirements: 'Có kinh nghiệm 2+ năm',
                benefits: 'Lương 12-20 triệu + thưởng',
              },
              {
                title: 'Nhân viên tư vấn',
                requirements: 'Giao tiếp tốt, nhiệt tình',
                benefits: 'Lương 8-15 triệu + hoa hồng',
              },
              {
                title: 'Thực tập sinh',
                requirements: 'Đang học nghề hoặc mới tốt nghiệp',
                benefits: 'Đào tạo miễn phí + hỗ trợ',
              },
            ].map((job, index) => (
              <div key={index} className="bg-white p-6 rounded-xl border border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-2">{job.title}</h4>
                <p className="text-sm text-gray-600 mb-2">{job.requirements}</p>
                <p className="text-sm text-primary-600 font-medium">{job.benefits}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:0338037868" className="btn btn-primary">
              Gọi tuyển dụng: 033-803-7868
            </a>
            <a href="mailto:suaxehonghau@gmail.com" className="btn btn-outline">
              Gửi CV qua email
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
