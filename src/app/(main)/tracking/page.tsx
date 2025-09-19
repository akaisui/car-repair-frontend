'use client';

import Link from 'next/link';

// import TrackingPage from '@/components/dashboard/TrackingPage';

export default function DashboardTrackingPage() {
  // return <TrackingPage />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 flex items-center justify-center">
      <div className="text-center p-8">
        {/* Icon */}
        <div className="mb-6">
          <div className="w-20 h-20 mx-auto bg-gradient-to-br from-green-100 to-emerald-200 rounded-full flex items-center justify-center">
            <span className="text-4xl">📍</span>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Tính năng theo dõi đang được phát triển
        </h1>

        {/* Description */}
        <p className="text-lg text-gray-600 mb-6 max-w-md mx-auto">
          Chúng tôi đang phát triển tính năng theo dõi tiến độ sửa chữa realtime.
          Sẽ sớm có mặt để phục vụ bạn!
        </p>

        {/* Progress Animation */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-1">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
            <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
          <p className="text-sm text-gray-500 mt-2">Đang phát triển...</p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            🏠 Về trang chủ
          </Link>
          <Link
            href="/book-appointment"
            className="px-6 py-3 bg-white text-gray-700 font-semibold rounded-lg border border-gray-300 hover:bg-gray-50 transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg"
          >
            📅 Đặt lịch ngay
          </Link>
        </div>

        {/* Feature Preview */}
        <div className="mt-12 p-6 bg-white rounded-xl shadow-lg border border-gray-100 max-w-sm mx-auto">
          <h3 className="font-bold text-gray-900 mb-4 flex items-center">
            <span className="mr-2">🚀</span>
            Tính năng sắp có
          </h3>
          <div className="space-y-3 text-left">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-yellow-500 rounded-full mr-3 animate-pulse"></div>
              <span className="text-sm text-gray-600">📍 Theo dõi realtime</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-gray-300 rounded-full mr-3"></div>
              <span className="text-sm text-gray-400">🔔 Thông báo tiến độ</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-gray-300 rounded-full mr-3"></div>
              <span className="text-sm text-gray-400">📊 Báo cáo chi tiết</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-gray-300 rounded-full mr-3"></div>
              <span className="text-sm text-gray-400">📱 Ứng dụng mobile</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
