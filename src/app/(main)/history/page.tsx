'use client';

import Link from 'next/link';

// import RepairHistoryPage from '@/components/dashboard/RepairHistoryPage';

export default function DashboardHistoryPage() {
  // return <RepairHistoryPage />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center">
      <div className="text-center p-8">
        {/* Icon */}
        <div className="mb-6">
          <div className="w-20 h-20 mx-auto bg-gradient-to-br from-blue-100 to-indigo-200 rounded-full flex items-center justify-center">
            <span className="text-4xl">🚧</span>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Tính năng đang được phát triển
        </h1>

        {/* Description */}
        <p className="text-lg text-gray-600 mb-6 max-w-md mx-auto">
          Chúng tôi đang tích cực phát triển tính năng lịch sử sửa chữa.
          Vui lòng quay lại sau để trải nghiệm!
        </p>

        {/* Progress Animation */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-1">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
          <p className="text-sm text-gray-500 mt-2">Đang phát triển...</p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            🏠 Về trang chủ
          </Link>
          <Link
            href="/services"
            className="px-6 py-3 bg-white text-gray-700 font-semibold rounded-lg border border-gray-300 hover:bg-gray-50 transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg"
          >
            🔧 Xem dịch vụ
          </Link>
        </div>

        {/* Timeline */}
        <div className="mt-12 p-6 bg-white rounded-xl shadow-lg border border-gray-100 max-w-sm mx-auto">
          <h3 className="font-bold text-gray-900 mb-4 flex items-center">
            <span className="mr-2">📅</span>
            Lộ trình phát triển
          </h3>
          <div className="space-y-3 text-left">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
              <span className="text-sm text-gray-600">✅ Đặt lịch hẹn</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
              <span className="text-sm text-gray-600">✅ Thông báo realtime</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-yellow-500 rounded-full mr-3 animate-pulse"></div>
              <span className="text-sm text-gray-600">🚧 Lịch sử sửa chữa</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-gray-300 rounded-full mr-3"></div>
              <span className="text-sm text-gray-400">⏳ Quản lý ví điểm</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
