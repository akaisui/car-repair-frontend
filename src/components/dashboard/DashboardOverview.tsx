'use client';

import { useState } from 'react';
import Link from 'next/link';

// Mock data - In real app, this would come from API
const mockUser = {
  name: 'Nguyễn Văn A',
  email: 'nguyenvana@gmail.com',
  phone: '0901234567',
  avatar: '/images/avatars/default-user.jpg',
  memberSince: '2023',
  loyaltyPoints: 2350,
  totalRepairs: 12,
  totalSpent: 15600000,
};

const mockStats = [
  {
    title: 'Lịch hẹn sắp tới',
    value: '2',
    description: 'Trong 7 ngày tới',
    icon: '📅',
    color: 'bg-blue-500',
    link: '/dashboard/appointments',
  },
  {
    title: 'Xe đang sửa',
    value: '1',
    description: 'Honda Wave RSX',
    icon: '🔧',
    color: 'bg-orange-500',
    link: '/dashboard/tracking',
  },
  {
    title: 'Điểm tích lũy',
    value: '2,350',
    description: 'Có thể đổi ưu đãi',
    icon: '🎁',
    color: 'bg-green-500',
    link: '/dashboard/rewards',
  },
  {
    title: 'Tổng chi tiêu',
    value: '15.6M',
    description: 'Từ khi tham gia',
    icon: '💰',
    color: 'bg-purple-500',
    link: '/dashboard/history',
  },
];

const mockRecentRepairs = [
  {
    id: 1,
    date: '2024-01-15',
    vehicle: 'Honda Wave RSX 110',
    service: 'Thay nhớt + Bảo dưỡng định kỳ',
    cost: 320000,
    status: 'completed',
  },
  {
    id: 2,
    date: '2024-01-08',
    vehicle: 'Honda Wave RSX 110',
    service: 'Sửa phanh trước',
    cost: 450000,
    status: 'completed',
  },
  {
    id: 3,
    date: '2024-01-20',
    vehicle: 'Honda Wave RSX 110',
    service: 'Đại tu động cơ',
    cost: 2800000,
    status: 'in_progress',
  },
];

const mockUpcomingAppointments = [
  {
    id: 1,
    date: '2024-01-25',
    time: '09:00',
    service: 'Bảo dưỡng định kỳ',
    vehicle: 'Honda Wave RSX 110',
    status: 'confirmed',
  },
  {
    id: 2,
    date: '2024-01-30',
    time: '14:00',
    service: 'Kiểm tra tổng quát',
    vehicle: 'Honda Wave RSX 110',
    status: 'pending',
  },
];

// Icons
const ChevronRightIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(amount);
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
};

const getStatusText = (status: string) => {
  switch (status) {
    case 'completed':
      return 'Hoàn thành';
    case 'in_progress':
      return 'Đang sửa';
    case 'confirmed':
      return 'Đã xác nhận';
    case 'pending':
      return 'Chờ xác nhận';
    default:
      return status;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'completed':
      return 'bg-green-100 text-green-800';
    case 'in_progress':
      return 'bg-blue-100 text-blue-800';
    case 'confirmed':
      return 'bg-green-100 text-green-800';
    case 'pending':
      return 'bg-yellow-100 text-yellow-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export default function DashboardOverview() {
  return (
    <div className="max-w-7xl mx-auto">
      {/* Welcome Section */}
      <div className="mb-8">
        <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold mb-2">Chào mừng trở lại, {mockUser.name}!</h1>
              <p className="text-primary-100">
                Thành viên từ năm {mockUser.memberSince} • {mockUser.totalRepairs} lần sửa chữa
              </p>
            </div>
            <div className="hidden md:block">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-2xl">👋</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {mockStats.map((stat, index) => (
          <Link
            key={index}
            href={stat.link}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200 group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center text-white text-xl`}>
                {stat.icon}
              </div>
              <ChevronRightIcon />
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
              <p className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</p>
              <p className="text-xs text-gray-500">{stat.description}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Repairs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Lịch sử sửa chữa gần đây</h2>
              <Link
                href="/dashboard/history"
                className="text-sm text-primary-600 hover:text-primary-700 font-medium"
              >
                Xem tất cả
              </Link>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {mockRecentRepairs.map((repair) => (
                <div key={repair.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="font-medium text-gray-900">{repair.service}</h3>
                      <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(repair.status)}`}>
                        {getStatusText(repair.status)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{repair.vehicle}</p>
                    <p className="text-xs text-gray-500">{formatDate(repair.date)}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">{formatCurrency(repair.cost)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Upcoming Appointments */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Lịch hẹn sắp tới</h2>
              <Link
                href="/dashboard/appointments"
                className="text-sm text-primary-600 hover:text-primary-700 font-medium"
              >
                Quản lý lịch hẹn
              </Link>
            </div>
          </div>
          <div className="p-6">
            {mockUpcomingAppointments.length > 0 ? (
              <div className="space-y-4">
                {mockUpcomingAppointments.map((appointment) => (
                  <div key={appointment.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="font-medium text-gray-900">{appointment.service}</h3>
                        <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(appointment.status)}`}>
                          {getStatusText(appointment.status)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">{appointment.vehicle}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">{formatDate(appointment.date)}</p>
                      <p className="text-sm text-gray-600">{appointment.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="text-4xl mb-4">📅</div>
                <p className="text-gray-500 mb-4">Bạn chưa có lịch hẹn nào</p>
                <Link
                  href="/book-appointment"
                  className="btn btn-primary"
                >
                  Đặt lịch ngay
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Thao tác nhanh</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            href="/book-appointment"
            className="flex items-center p-4 bg-primary-50 border border-primary-200 rounded-lg hover:bg-primary-100 transition-colors duration-200"
          >
            <div className="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center text-white mr-3">
              📅
            </div>
            <div>
              <h3 className="font-medium text-primary-900">Đặt lịch hẹn</h3>
              <p className="text-sm text-primary-700">Đặt lịch sửa xe mới</p>
            </div>
          </Link>

          <Link
            href="/dashboard/tracking"
            className="flex items-center p-4 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors duration-200"
          >
            <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center text-white mr-3">
              🔍
            </div>
            <div>
              <h3 className="font-medium text-blue-900">Theo dõi xe</h3>
              <p className="text-sm text-blue-700">Xem tiến độ sửa chữa</p>
            </div>
          </Link>

          <Link
            href="/contact"
            className="flex items-center p-4 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors duration-200"
          >
            <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center text-white mr-3">
              📞
            </div>
            <div>
              <h3 className="font-medium text-green-900">Liên hệ hỗ trợ</h3>
              <p className="text-sm text-green-700">Cần tư vấn hoặc hỗ trợ</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}