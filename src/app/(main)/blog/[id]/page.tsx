'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import BlogSidebar from '@/components/blog/BlogSidebar';

const blogPosts = [
  {
    id: 1,
    title: '10 Cách Bảo Dưỡng Xe Máy Hiệu Quả Tại Nhà',
    content: `
      <p>Bảo dưỡng xe máy định kỳ là việc rất quan trọng để đảm bảo xe hoạt động bền bỉ và an toàn. Dưới đây là 10 cách bảo dưỡng xe máy hiệu quả mà bạn có thể thực hiện tại nhà.</p>

      <h3>1. Kiểm tra và thay nhớt định kỳ</h3>
      <p>Nhớt máy là "máu" của động cơ, cần được thay định kỳ theo khuyến cáo của nhà sản xuất. Thông thường, xe máy cần thay nhớt sau mỗi 2000-3000km hoặc 3-4 tháng một lần.</p>

      <h3>2. Kiểm tra áp suất lốp</h3>
      <p>Áp suất lốp không đúng sẽ ảnh hưởng đến khả năng vận hành và tiêu thụ nhiên liệu. Kiểm tra áp suất lốp hàng tuần và bơm đúng áp suất theo quy định.</p>

      <h3>3. Làm sạch bộ lọc gió</h3>
      <p>Bộ lọc gió bẩn sẽ làm giảm hiệu suất động cơ và tăng tiêu thụ xăng. Vệ sinh bộ lọc gió 2-3 tuần một lần bằng khí nén hoặc nước sạch.</p>

      <h3>4. Kiểm tra hệ thống phanh</h3>
      <p>Phanh là hệ thống an toàn quan trọng nhất. Kiểm tra độ dày má phanh, mức dầu phanh và độ căng dây phanh tay thường xuyên.</p>

      <h3>5. Bảo dưỡng xích xe</h3>
      <p>Xích xe cần được bôi trơn và căng chỉnh đúng độ. Xích quá chùng hoặc quá căng đều ảnh hưởng đến vận hành và tuổi thọ của xe.</p>

      <h3>6. Kiểm tra hệ thống điện</h3>
      <p>Kiểm tra đèn pha, đèn hậu, đèn xi nhan và còi xe thường xuyên. Vệ sinh cực ắc quy và kiểm tra mức nước ắc quy định kỳ.</p>

      <h3>7. Vệ sinh xe máy</h3>
      <p>Rửa xe định kỳ không chỉ giữ xe sạch đẹp mà còn giúp phát hiện sớm các vấn đề như rỉ sét, nứt vỡ hoặc hỏng hóc.</p>

      <h3>8. Kiểm tra bugi</h3>
      <p>Bugi bẩn hoặc hỏng sẽ làm xe khó nổ và tăng tiêu thụ xăng. Vệ sinh hoặc thay bugi khi cần thiết.</p>

      <h3>9. Bảo quản xe đúng cách</h3>
      <p>Để xe ở nơi khô ráo, thoáng mát và có mái che. Tránh để xe ngoài trời quá lâu dưới nắng mưa.</p>

      <h3>10. Sử dụng phụ tùng chính hãng</h3>
      <p>Khi cần thay thế, hãy sử dụng phụ tùng chính hãng để đảm bảo chất lượng và độ bền của xe.</p>

      <h3>Kết luận</h3>
      <p>Bảo dưỡng xe máy định kỳ không chỉ giúp xe hoạt động tốt mà còn tiết kiệm chi phí sửa chữa lớn trong tương lai. Hãy thực hiện những mẹo trên thường xuyên để xe máy của bạn luôn trong tình trạng tốt nhất.</p>
    `,
    category: 'maintenance',
    categoryName: 'Bảo dưỡng',
    author: 'Thầy Minh',
    date: '2024-01-15',
    readTime: '5 phút đọc',
    tags: ['bảo dưỡng', 'xe máy', 'tự làm'],
    views: 1250,
    likes: 89,
  },
  {
    id: 2,
    title: 'Dấu Hiệu Nhận Biết Xe Máy Cần Thay Nhớt',
    content: `
      <p>Nhớt máy đóng vai trò quan trọng trong việc bôi trơn và bảo vệ động cơ xe máy. Việc thay nhớt đúng thời điểm sẽ giúp động cơ hoạt động trơn tru và kéo dài tuổi thọ.</p>

      <h3>Các dấu hiệu cần thay nhớt</h3>

      <h4>1. Màu sắc nhớt thay đổi</h4>
      <p>Nhớt mới thường có màu vàng trong hoặc hổ phách. Khi nhớt chuyển sang màu đen đặc, có nghĩa là nhớt đã bẩn và cần được thay.</p>

      <h4>2. Độ nhớt thay đổi</h4>
      <p>Nhớt cũ sẽ trở nên đặc hơn hoặc loãng hơn bình thường. Bạn có thể kiểm tra bằng cách chấm nhớt vào ngón tay và cảm nhận độ nhớt.</p>

      <h4>3. Tiếng động cơ khác thường</h4>
      <p>Khi nhớt hết tác dụng bôi trơn, động cơ sẽ phát ra tiếng kêu lạ, đặc biệt là khi khởi động máy lạnh.</p>

      <h4>4. Đã đến chu kỳ thay nhớt</h4>
      <p>Theo khuyến cáo của nhà sản xuất, xe máy thường cần thay nhớt sau 2000-3000km hoặc 3-4 tháng.</p>

      <h3>Cách kiểm tra nhớt máy</h3>
      <p>Để kiểm tra nhớt máy chính xác, bạn cần làm theo các bước sau:</p>
      <ul>
        <li>Đỗ xe trên mặt phẳng</li>
        <li>Tắt máy và chờ khoảng 5-10 phút</li>
        <li>Rút que thăm dầu và lau sạch</li>
        <li>Cắm lại que thăm và rút ra kiểm tra</li>
      </ul>

      <h3>Lựa chọn loại nhớt phù hợp</h3>
      <p>Việc chọn đúng loại nhớt rất quan trọng. Hãy tham khảo sách hướng dẫn sử dụng xe hoặc tư vấn với thợ có kinh nghiệm.</p>
    `,
    category: 'maintenance',
    categoryName: 'Bảo dưỡng',
    author: 'Thầy Hùng',
    date: '2024-01-12',
    readTime: '3 phút đọc',
    tags: ['nhớt máy', 'động cơ', 'bảo dưỡng'],
    views: 980,
    likes: 65,
  },
];

const relatedPosts = [
  {
    id: 3,
    title: 'Cách Sửa Xe Máy Không Nổ - Nguyên Nhân & Giải Pháp',
    category: 'Sửa chữa',
    readTime: '7 phút đọc',
  },
  {
    id: 4,
    title: 'Mẹo Tiết Kiệm Xăng Cho Xe Máy Trong Mùa Cao Điểm',
    category: 'Mẹo hay',
    readTime: '4 phút đọc',
  },
  {
    id: 5,
    title: 'Hướng Dẫn Chọn Mua Phụ Tùng Xe Máy Chính Hãng',
    category: 'Phụ tùng',
    readTime: '6 phút đọc',
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

const UserIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
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

const HeartIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
    />
  </svg>
);

const ShareIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
    />
  </svg>
);

const ArrowLeftIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
  </svg>
);

export default function BlogDetailPage() {
  const params = useParams();
  const postId = parseInt(params.id as string);
  const post = blogPosts.find((p) => p.id === postId);

  if (!post) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">📄</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Bài viết không tồn tại</h1>
          <p className="text-gray-600 mb-6">Bài viết bạn đang tìm không tồn tại hoặc đã bị xóa.</p>
          <Link href="/blog" className="btn btn-primary">
            Quay lại Blog
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <section className="bg-white border-b border-gray-200">
        <div className="container-7xl py-8">
          {/* Breadcrumb */}
          <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-6">
            <Link href="/" className="hover:text-primary-600 transition-colors duration-200">
              Trang chủ
            </Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-primary-600 transition-colors duration-200">
              Blog
            </Link>
            <span>/</span>
            <span className="text-gray-900">{post.title}</span>
          </nav>

          {/* Back Button */}
          <Link
            href="/blog"
            className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-700 transition-colors duration-200 mb-6"
          >
            <ArrowLeftIcon />
            <span>Quay lại Blog</span>
          </Link>

          {/* Category */}
          <div className="mb-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800">
              {post.categoryName}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
            {post.title}
          </h1>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-6">
            <div className="flex items-center space-x-2">
              <UserIcon />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center space-x-2">
              <CalendarIcon />
              <span>{new Date(post.date).toLocaleDateString('vi-VN')}</span>
            </div>
            <div className="flex items-center space-x-2">
              <ClockIcon />
              <span>{post.readTime}</span>
            </div>
            <div className="flex items-center space-x-2">
              <EyeIcon />
              <span>{post.views} lượt xem</span>
            </div>
          </div>

          {/* Social Actions */}
          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-2 px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg transition-colors duration-200">
              <HeartIcon />
              <span>{post.likes}</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors duration-200">
              <ShareIcon />
              <span>Chia sẻ</span>
            </button>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section">
        <div className="container-7xl">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3">
              <article className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
                {/* Featured Image */}
                <div className="h-64 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl mb-8 flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <div className="text-6xl mb-4">📄</div>
                    <p>Hình ảnh bài viết</p>
                  </div>
                </div>

                {/* Content */}
                <div className="prose prose-lg max-w-none">
                  <div
                    dangerouslySetInnerHTML={{ __html: post.content }}
                    className="leading-relaxed"
                  />
                </div>

                {/* Tags */}
                <div className="border-t border-gray-200 pt-6 mt-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Thẻ</h3>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-primary-100 hover:text-primary-700 transition-colors duration-200 cursor-pointer"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Author Bio */}
                <div className="border-t border-gray-200 pt-6 mt-8">
                  <div className="flex items-start space-x-4">
                    <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
                      <span className="text-2xl">👨‍🔧</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{post.author}</h3>
                      <p className="text-gray-600 mb-2">
                        Thợ sửa xe máy với hơn 10 năm kinh nghiệm
                      </p>
                      <p className="text-sm text-gray-500">
                        Chuyên gia về bảo dưỡng và sửa chữa xe máy các loại. Chia sẻ kiến thức và
                        kinh nghiệm thực tế để giúp mọi người hiểu rõ hơn về xe máy của mình.
                      </p>
                    </div>
                  </div>
                </div>
              </article>

              {/* Related Posts */}
              <div className="mt-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Bài viết liên quan</h2>
                <div className="grid md:grid-cols-3 gap-6">
                  {relatedPosts.map((relatedPost) => (
                    <article
                      key={relatedPost.id}
                      className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200"
                    >
                      <div className="h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg mb-4 flex items-center justify-center">
                        <span className="text-2xl">📄</span>
                      </div>
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-800 mb-2">
                        {relatedPost.category}
                      </span>
                      <h3 className="font-semibold text-gray-900 mb-2 leading-tight">
                        <Link
                          href={`/blog/${relatedPost.id}`}
                          className="hover:text-primary-600 transition-colors duration-200"
                        >
                          {relatedPost.title}
                        </Link>
                      </h3>
                      <div className="flex items-center space-x-1 text-xs text-gray-500">
                        <ClockIcon />
                        <span>{relatedPost.readTime}</span>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <BlogSidebar />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
