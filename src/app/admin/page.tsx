'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { dashboardApi, DashboardStats } from '@/lib/api/dashboard';

export default function AdminDashboard() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && (!user || (user.role !== 'admin' && user.role !== 'staff'))) {
      router.push('/');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (user && (user.role === 'admin' || user.role === 'staff')) {
      fetchDashboardStats();
    }
  }, [user]);

  const fetchDashboardStats = async () => {
    try {
      setLoading(true);
      setError(null);
      const dashboardStats = await dashboardApi.getStats();
      console.log('Dashboard stats received:', dashboardStats); // Debug log
      setStats(dashboardStats);
    } catch (error: any) {
      console.error('Failed to fetch dashboard stats:', error);
      setError(error.message || 'Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center">
        <div className="relative">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200"></div>
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent absolute top-0"></div>
        </div>
      </div>
    );
  }

  if (!user || (user.role !== 'admin' && user.role !== 'staff')) {
    return null;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Không thể tải dữ liệu</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={fetchDashboardStats}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Thử lại
          </button>
        </div>
      </div>
    );
  }

  if (!stats) {
    return null;
  }

  const statCards = [
    {
      id: 'total',
      title: 'Tổng lịch hẹn',
      value: stats.appointments.total,
      icon: '📅',
      color: 'blue',
      gradient: 'from-blue-500 to-blue-600'
    },
    {
      id: 'pending',
      title: 'Chờ xác nhận',
      value: stats.appointments.pending,
      icon: '⏳',
      color: 'yellow',
      gradient: 'from-yellow-500 to-orange-500'
    },
    {
      id: 'confirmed',
      title: 'Đã xác nhận',
      value: stats.appointments.confirmed,
      icon: '✅',
      color: 'green',
      gradient: 'from-green-500 to-emerald-600'
    },
    {
      id: 'completed',
      title: 'Hoàn thành',
      value: stats.appointments.completed,
      icon: '🎉',
      color: 'purple',
      gradient: 'from-purple-500 to-indigo-600'
    },
    {
      id: 'today',
      title: 'Hôm nay',
      value: stats.appointments.today,
      icon: '🗓️',
      color: 'pink',
      gradient: 'from-pink-500 to-rose-500'
    },
    {
      id: 'revenue',
      title: 'Doanh thu',
      value: formatCurrency(stats.revenue.total),
      icon: '💰',
      color: 'emerald',
      gradient: 'from-emerald-500 to-green-600',
      isRevenue: true
    }
  ];

  const quickActions = [
    {
      title: 'Quản lý lịch hẹn',
      icon: '📅',
      path: '/admin/appointments',
      gradient: 'from-blue-500 to-blue-600',
      description: 'Xem và quản lý tất cả lịch hẹn'
    },
    {
      title: 'Quản lý dịch vụ',
      icon: '🔧',
      path: '/admin/services',
      gradient: 'from-green-500 to-emerald-600',
      description: 'Thêm và chỉnh sửa dịch vụ'
    },
    {
      title: 'Khách hàng',
      icon: '👥',
      path: '/admin/customers',
      gradient: 'from-purple-500 to-indigo-600',
      description: 'Quản lý thông tin khách hàng'
    },
    {
      title: 'Báo cáo',
      icon: '📊',
      path: '/admin/reports',
      gradient: 'from-orange-500 to-red-500',
      description: 'Xem báo cáo và thống kê'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8">
        {/* Welcome Section */}
        <div className="mb-6 sm:mb-8">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-4 sm:p-6 lg:p-8 text-white shadow-xl">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">
              Chào mừng trở lại! 👋
            </h1>
            <p className="text-xl sm:text-2xl font-medium mb-1 text-blue-100">
              {user.full_name}
            </p>
            <p className="text-blue-100 text-sm sm:text-base opacity-90">
              Tổng quan hoạt động garage hôm nay
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {statCards.map((stat) => (
            <div
              key={stat.id}
              className="group relative bg-white rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className={`inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-r ${stat.gradient} text-white text-xl sm:text-2xl mb-3 sm:mb-4 shadow-lg`}>
                    {stat.icon}
                  </div>
                  <h3 className="text-xs sm:text-sm font-medium text-gray-600 mb-1 sm:mb-2 uppercase tracking-wide">
                    {stat.title}
                  </h3>
                  <p className={`text-xl sm:text-2xl lg:text-3xl font-bold ${
                    stat.isRevenue ? 'text-lg sm:text-xl lg:text-2xl' : ''
                  } bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}>
                    {stat.value}
                  </p>
                </div>
              </div>
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${stat.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 sm:gap-8">
          {/* Quick Actions - Takes 2 columns on XL */}
          <div className="xl:col-span-2">
            <div className="bg-white rounded-2xl p-4 sm:p-6 lg:p-8 shadow-lg border border-gray-100">
              <div className="flex items-center mb-6">
                <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl p-2 mr-3">
                  <span className="text-white text-xl">🚀</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                  Thao tác nhanh
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                {quickActions.map((action, index) => (
                  <button
                    key={index}
                    onClick={() => router.push(action.path)}
                    className="group relative bg-gradient-to-br from-gray-50 to-gray-100 hover:from-white hover:to-gray-50 rounded-2xl p-4 sm:p-6 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg border border-gray-200"
                  >
                    <div className="flex flex-col items-center text-center space-y-3">
                      <div className={`inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-r ${action.gradient} text-white text-xl sm:text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        {action.icon}
                      </div>
                      <div>
                        <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-1">
                          {action.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-gray-600">
                          {action.description}
                        </p>
                      </div>
                    </div>
                    <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${action.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Activity - Takes 1 column on XL */}
          <div className="xl:col-span-1">
            <div className="bg-white rounded-2xl p-4 sm:p-6 lg:p-8 shadow-lg border border-gray-100 h-full">
              <div className="flex items-center mb-6">
                <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl p-2 mr-3">
                  <span className="text-white text-xl">📈</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                  Hoạt động gần đây
                </h2>
              </div>

              <div className="space-y-4 sm:space-y-6">
                {stats.recentActivity.length > 0 ? (
                  stats.recentActivity.map((activity, index) => {
                    const getStatusColor = (status: string) => {
                      switch (status) {
                        case 'pending': return 'bg-yellow-400';
                        case 'confirmed': return 'bg-blue-400';
                        case 'in_progress': return 'bg-orange-400';
                        case 'completed': return 'bg-green-400';
                        case 'cancelled': return 'bg-red-400';
                        default: return 'bg-gray-400';
                      }
                    };

                    const getStatusText = (status: string) => {
                      switch (status) {
                        case 'pending': return 'Lịch hẹn mới';
                        case 'confirmed': return 'Đã xác nhận lịch hẹn';
                        case 'in_progress': return 'Đang sửa chữa';
                        case 'completed': return 'Hoàn thành sửa chữa';
                        case 'cancelled': return 'Đã hủy lịch hẹn';
                        default: return 'Cập nhật lịch hẹn';
                      }
                    };

                    const timeAgo = (dateString: string) => {
                      const now = new Date();
                      const date = new Date(dateString);
                      const diffInMs = now.getTime() - date.getTime();
                      const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
                      const diffInHours = Math.floor(diffInMinutes / 60);
                      const diffInDays = Math.floor(diffInHours / 24);

                      if (diffInDays > 0) return `${diffInDays} ngày trước`;
                      if (diffInHours > 0) return `${diffInHours} giờ trước`;
                      if (diffInMinutes > 0) return `${diffInMinutes} phút trước`;
                      return 'Vừa xong';
                    };

                    return (
                      <div key={index} className="group flex items-start space-x-4 p-3 rounded-xl hover:bg-gray-50 transition-colors duration-200">
                        <div className={`w-3 h-3 ${getStatusColor(activity.status)} rounded-full mt-2 shadow-sm group-hover:scale-110 transition-transform duration-200`}></div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm sm:text-base text-gray-900 leading-relaxed">
                            {getStatusText(activity.status)}
                            {activity.customer_name && (
                              <span> cho <span className="font-semibold text-gray-800">{activity.customer_name}</span></span>
                            )}
                            {activity.license_plate && (
                              <span className="text-gray-600"> - {activity.brand} {activity.model} ({activity.license_plate})</span>
                            )}
                          </p>
                          <p className="text-xs sm:text-sm text-gray-500 mt-1">
                            {timeAgo(activity.created_at)}
                            {activity.service_name && (
                              <span className="ml-2">• {activity.service_name}</span>
                            )}
                          </p>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="text-center py-8">
                    <div className="text-4xl mb-2">📝</div>
                    <p className="text-gray-500">Chưa có hoạt động gần đây</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}