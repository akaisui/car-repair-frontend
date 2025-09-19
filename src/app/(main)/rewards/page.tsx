'use client';

import Link from 'next/link';

// import RewardsPage from '@/components/dashboard/RewardsPage';

export default function DashboardRewardsPage() {
  // return <RewardsPage />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 flex items-center justify-center">
      <div className="text-center p-8">
        {/* Icon */}
        <div className="mb-6">
          <div className="w-20 h-20 mx-auto bg-gradient-to-br from-purple-100 to-pink-200 rounded-full flex items-center justify-center">
            <span className="text-4xl">🎁</span>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Hệ thống điểm thưởng đang được phát triển
        </h1>

        {/* Description */}
        <p className="text-lg text-gray-600 mb-6 max-w-md mx-auto">
          Chúng tôi đang xây dựng chương trình khách hàng thân thiết với nhiều ưu đãi hấp dẫn.
          Hãy chờ đón nhé!
        </p>

        {/* Progress Animation */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-1">
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
          <p className="text-sm text-gray-500 mt-2">Đang phát triển...</p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            🏠 Về trang chủ
          </Link>
          <Link
            href="/services"
            className="px-6 py-3 bg-white text-gray-700 font-semibold rounded-lg border border-gray-300 hover:bg-gray-50 transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg"
          >
            🔧 Sử dụng dịch vụ
          </Link>
        </div>

        {/* Rewards Preview */}
        <div className="mt-12 p-6 bg-white rounded-xl shadow-lg border border-gray-100 max-w-sm mx-auto">
          <h3 className="font-bold text-gray-900 mb-4 flex items-center">
            <span className="mr-2">🏆</span>
            Phần thưởng sắp có
          </h3>
          <div className="space-y-3 text-left">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-yellow-500 rounded-full mr-3 animate-pulse"></div>
              <span className="text-sm text-gray-600">💰 Tích điểm thưởng</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-gray-300 rounded-full mr-3"></div>
              <span className="text-sm text-gray-400">🎫 Voucher giảm giá</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-gray-300 rounded-full mr-3"></div>
              <span className="text-sm text-gray-400">🎊 Quà tặng sinh nhật</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-gray-300 rounded-full mr-3"></div>
              <span className="text-sm text-gray-400">👑 Hạng thành viên VIP</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
