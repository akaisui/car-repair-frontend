'use client';

import { useState } from 'react';
import Link from 'next/link';

const categories = [
  { id: 'all', name: 'Tất cả', count: 24 },
  { id: 'maintenance', name: 'Bảo dưỡng', count: 8 },
  { id: 'repair', name: 'Sửa chữa', count: 6 },
  { id: 'tips', name: 'Mẹo hay', count: 5 },
  { id: 'parts', name: 'Phụ tùng', count: 3 },
  { id: 'safety', name: 'An toàn', count: 2 }
];

const blogPosts = [
  {
    id: 1,
    title: '10 Cách Bảo Dưỡng Xe Máy Hiệu Quả Tại Nhà',
    excerpt: 'Những mẹo bảo dưỡng đơn giản mà hiệu quả để giữ xe máy luôn trong tình trạng tốt nhất.',
    category: 'maintenance',
    categoryName: 'Bảo dưỡng',
    author: 'Thầy Minh',
    date: '2024-01-15',
    readTime: '5 phút đọc',
    image: '/images/blog/maintenance-tips.jpg',
    tags: ['bảo dưỡng', 'xe máy', 'tự làm'],
    featured: true
  },
  {
    id: 2,
    title: 'Dấu Hiệu Nhận Biết Xe Máy Cần Thay Nhớt',
    excerpt: 'Cách nhận biết khi nào cần thay nhớt để đảm bảo động cơ xe máy hoạt động trơn tru.',
    category: 'maintenance',
    categoryName: 'Bảo dưỡng',
    author: 'Thầy Hùng',
    date: '2024-01-12',
    readTime: '3 phút đọc',
    image: '/images/blog/oil-change.jpg',
    tags: ['nhớt máy', 'động cơ', 'bảo dưỡng']
  },
  {
    id: 3,
    title: 'Cách Sửa Xe Máy Không Nổ - Nguyên Nhân & Giải Pháp',
    excerpt: 'Phân tích các nguyên nhân phổ biến khiến xe máy không nổ và cách khắc phục hiệu quả.',
    category: 'repair',
    categoryName: 'Sửa chữa',
    author: 'Thầy Nam',
    date: '2024-01-10',
    readTime: '7 phút đọc',
    image: '/images/blog/engine-repair.jpg',
    tags: ['sửa chữa', 'động cơ', 'không nổ']
  },
  {
    id: 4,
    title: 'Mẹo Tiết Kiệm Xăng Cho Xe Máy Trong Mùa Cao Điểm',
    excerpt: 'Những mẹo hay giúp bạn tiết kiệm xăng hiệu quả khi di chuyển trong thành phố.',
    category: 'tips',
    categoryName: 'Mẹo hay',
    author: 'Thầy Tùng',
    date: '2024-01-08',
    readTime: '4 phút đọc',
    image: '/images/blog/fuel-saving.jpg',
    tags: ['tiết kiệm xăng', 'mẹo hay', 'kinh tế']
  },
  {
    id: 5,
    title: 'Hướng Dẫn Chọn Mua Phụ Tùng Xe Máy Chính Hãng',
    excerpt: 'Cách nhận biết và lựa chọn phụ tùng chính hãng đảm bảo chất lượng và độ bền.',
    category: 'parts',
    categoryName: 'Phụ tùng',
    author: 'Thầy Minh',
    date: '2024-01-05',
    readTime: '6 phút đọc',
    image: '/images/blog/genuine-parts.jpg',
    tags: ['phụ tùng', 'chính hãng', 'chọn mua']
  },
  {
    id: 6,
    title: 'An Toàn Giao Thông: Kiểm Tra Phanh Xe Máy',
    excerpt: 'Tầm quan trọng của hệ thống phanh và cách kiểm tra để đảm bảo an toàn khi lái xe.',
    category: 'safety',
    categoryName: 'An toàn',
    author: 'Thầy Hùng',
    date: '2024-01-03',
    readTime: '5 phút đọc',
    image: '/images/blog/brake-safety.jpg',
    tags: ['an toàn', 'phanh xe', 'kiểm tra']
  }
];

const SearchIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const CalendarIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const ClockIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const UserIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

export default function BlogList() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = activeCategory === 'all' || post.category === activeCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const featuredPost = blogPosts.find(post => post.featured);

  return (
    <div className="space-y-8">
      {/* Search & Filter */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        {/* Search */}
        <div className="relative mb-6">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <SearchIcon />
          </div>
          <input
            type="text"
            placeholder="Tìm kiếm bài viết..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-3">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                activeCategory === category.id
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-primary-100 hover:text-primary-700'
              }`}
            >
              {category.name} ({category.count})
            </button>
          ))}
        </div>
      </div>

      {/* Featured Post */}
      {featuredPost && activeCategory === 'all' && !searchQuery && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2">
              <div className="h-64 md:h-full bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
                <div className="text-center text-primary-600">
                  <div className="text-6xl mb-4">📰</div>
                  <p className="font-semibold">Bài viết nổi bật</p>
                </div>
              </div>
            </div>
            <div className="md:w-1/2 p-6 md:p-8">
              <div className="mb-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                  ⭐ Nổi bật
                </span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                <Link href={`/blog/${featuredPost.id}`} className="hover:text-primary-600 transition-colors duration-200">
                  {featuredPost.title}
                </Link>
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {featuredPost.excerpt}
              </p>
              <div className="flex items-center space-x-4 text-sm text-gray-500 mb-6">
                <div className="flex items-center space-x-1">
                  <UserIcon />
                  <span>{featuredPost.author}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <CalendarIcon />
                  <span>{new Date(featuredPost.date).toLocaleDateString('vi-VN')}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <ClockIcon />
                  <span>{featuredPost.readTime}</span>
                </div>
              </div>
              <Link
                href={`/blog/${featuredPost.id}`}
                className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-700 font-medium transition-colors duration-200"
              >
                <span>Đọc tiếp</span>
                <ArrowRightIcon />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Blog Posts Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {filteredPosts.map((post) => (
          <article key={post.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200 group">
            {/* Image */}
            <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
              <div className="text-center text-gray-500">
                <div className="text-4xl mb-2">📄</div>
                <p className="text-sm">Hình ảnh bài viết</p>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Category */}
              <div className="mb-3">
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                  {post.categoryName}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-lg font-bold text-gray-900 mb-3 leading-tight">
                <Link href={`/blog/${post.id}`} className="hover:text-primary-600 transition-colors duration-200">
                  {post.title}
                </Link>
              </h3>

              {/* Excerpt */}
              <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                {post.excerpt}
              </p>

              {/* Meta */}
              <div className="flex items-center justify-between text-xs text-gray-500">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-1">
                    <UserIcon />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <CalendarIcon />
                    <span>{new Date(post.date).toLocaleDateString('vi-VN')}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  <ClockIcon />
                  <span>{post.readTime}</span>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-4">
                {post.tags.slice(0, 3).map((tag, index) => (
                  <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* No Results */}
      {filteredPosts.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Không tìm thấy bài viết</h3>
          <p className="text-gray-600">Thử tìm kiếm với từ khóa khác hoặc chọn danh mục khác.</p>
        </div>
      )}

      {/* Pagination */}
      {filteredPosts.length > 0 && (
        <div className="flex justify-center">
          <div className="flex items-center space-x-2">
            <button className="px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200">
              Trang trước
            </button>
            <button className="px-4 py-2 text-sm font-medium text-white bg-primary-500 rounded-lg">
              1
            </button>
            <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200">
              2
            </button>
            <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200">
              3
            </button>
            <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200">
              Trang sau
            </button>
          </div>
        </div>
      )}
    </div>
  );
}