'use client';

const popularPosts = [
  {
    id: 1,
    title: '10 Cách Bảo Dưỡng Xe Máy Hiệu Quả',
    date: '2024-01-15',
    views: 1250
  },
  {
    id: 2,
    title: 'Dấu Hiệu Xe Máy Cần Thay Nhớt',
    date: '2024-01-12',
    views: 980
  },
  {
    id: 3,
    title: 'Cách Sửa Xe Máy Không Nổ',
    date: '2024-01-10',
    views: 875
  },
  {
    id: 4,
    title: 'Mẹo Tiết Kiệm Xăng Hiệu Quả',
    date: '2024-01-08',
    views: 756
  }
];

const recentPosts = [
  {
    id: 5,
    title: 'Hướng Dẫn Chọn Mua Phụ Tùng Chính Hãng',
    date: '2024-01-05'
  },
  {
    id: 6,
    title: 'An Toàn Giao Thông: Kiểm Tra Phanh',
    date: '2024-01-03'
  },
  {
    id: 7,
    title: 'Bảo Dưỡng Xe Máy Mùa Mưa',
    date: '2024-01-01'
  },
  {
    id: 8,
    title: 'Cách Khởi Động Xe Máy Đúng Cách',
    date: '2023-12-28'
  }
];

const categories = [
  { name: 'Bảo dưỡng', count: 12, color: 'bg-blue-100 text-blue-800' },
  { name: 'Sửa chữa', count: 8, color: 'bg-red-100 text-red-800' },
  { name: 'Mẹo hay', count: 6, color: 'bg-green-100 text-green-800' },
  { name: 'Phụ tùng', count: 4, color: 'bg-yellow-100 text-yellow-800' },
  { name: 'An toàn', count: 3, color: 'bg-purple-100 text-purple-800' },
  { name: 'Kinh nghiệm', count: 2, color: 'bg-pink-100 text-pink-800' }
];

const tags = [
  'bảo dưỡng', 'sửa chữa', 'xe máy', 'nhớt máy', 'động cơ', 'phanh xe',
  'tiết kiệm xăng', 'an toàn', 'phụ tùng', 'mẹo hay', 'kinh nghiệm',
  'Honda', 'Yamaha', 'Suzuki', 'tự làm'
];

const CalendarIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const EyeIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);

const PhoneIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
);

const MailIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

export default function BlogSidebar() {
  return (
    <div className="space-y-6">
      {/* Newsletter Subscription */}
      <div className="bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl p-6 text-white">
        <h3 className="text-lg font-bold mb-2">📬 Đăng ký nhận tin</h3>
        <p className="text-primary-100 text-sm mb-4">
          Nhận thông báo khi có bài viết mới và những mẹo hay về xe máy.
        </p>
        <div className="space-y-3">
          <input
            type="email"
            placeholder="Email của bạn"
            className="w-full px-4 py-2 bg-white/20 backdrop-blur-sm text-white placeholder-primary-200 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50"
          />
          <button className="w-full px-4 py-2 bg-white text-primary-600 font-medium rounded-lg hover:bg-primary-50 transition-colors duration-200">
            Đăng ký
          </button>
        </div>
      </div>

      {/* Popular Posts */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-bold text-gray-900 mb-4">🔥 Bài viết phổ biến</h3>
        <div className="space-y-4">
          {popularPosts.map((post, index) => (
            <div key={post.id} className="flex items-start space-x-3 group">
              <div className="flex-shrink-0 w-8 h-8 bg-primary-100 text-primary-600 rounded-lg flex items-center justify-center font-bold text-sm">
                {index + 1}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-gray-900 group-hover:text-primary-600 transition-colors duration-200 cursor-pointer">
                  {post.title}
                </h4>
                <div className="flex items-center space-x-3 mt-1 text-xs text-gray-500">
                  <div className="flex items-center space-x-1">
                    <CalendarIcon />
                    <span>{new Date(post.date).toLocaleDateString('vi-VN')}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <EyeIcon />
                    <span>{post.views}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Posts */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-bold text-gray-900 mb-4">📝 Bài viết mới nhất</h3>
        <div className="space-y-3">
          {recentPosts.map((post) => (
            <div key={post.id} className="group">
              <h4 className="text-sm font-medium text-gray-900 group-hover:text-primary-600 transition-colors duration-200 cursor-pointer mb-1">
                {post.title}
              </h4>
              <div className="flex items-center space-x-1 text-xs text-gray-500">
                <CalendarIcon />
                <span>{new Date(post.date).toLocaleDateString('vi-VN')}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-bold text-gray-900 mb-4">📁 Danh mục</h3>
        <div className="space-y-2">
          {categories.map((category, index) => (
            <div key={index} className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors duration-200 cursor-pointer group">
              <span className="text-sm font-medium text-gray-700 group-hover:text-primary-600 transition-colors duration-200">
                {category.name}
              </span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${category.color}`}>
                {category.count}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Tags */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-bold text-gray-900 mb-4">🏷️ Thẻ</h3>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full hover:bg-primary-100 hover:text-primary-700 transition-colors duration-200 cursor-pointer"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Contact CTA */}
      <div className="bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-xl p-6 text-white">
        <h3 className="text-lg font-bold mb-2">🛠️ Cần hỗ trợ?</h3>
        <p className="text-secondary-100 text-sm mb-4">
          Đội ngũ chuyên gia của chúng tôi sẵn sàng tư vấn và hỗ trợ bạn.
        </p>
        <div className="space-y-3">
          <a
            href="tel:+84123456789"
            className="flex items-center space-x-2 text-sm text-secondary-100 hover:text-white transition-colors duration-200"
          >
            <PhoneIcon />
            <span>0123 456 789</span>
          </a>
          <a
            href="mailto:info@example.com"
            className="flex items-center space-x-2 text-sm text-secondary-100 hover:text-white transition-colors duration-200"
          >
            <MailIcon />
            <span>info@tiemsuaxemaybac.com</span>
          </a>
          <button className="w-full px-4 py-2 bg-white text-secondary-600 font-medium rounded-lg hover:bg-secondary-50 transition-colors duration-200 mt-4">
            Liên hệ ngay
          </button>
        </div>
      </div>
    </div>
  );
}