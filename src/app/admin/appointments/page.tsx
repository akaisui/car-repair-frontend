'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { appointmentApi, Appointment } from '@/lib/api/appointments';

interface ApiResponse {
  success: boolean;
  data: Appointment[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  confirmed: 'bg-blue-100 text-blue-800 border-blue-200',
  in_progress: 'bg-orange-100 text-orange-800 border-orange-200',
  completed: 'bg-green-100 text-green-800 border-green-200',
  cancelled: 'bg-red-100 text-red-800 border-red-200'
};

const statusLabels = {
  pending: 'Chờ xác nhận',
  confirmed: 'Đã xác nhận',
  in_progress: 'Đang thực hiện',
  completed: 'Hoàn thành',
  cancelled: 'Đã hủy'
};

export default function AdminAppointmentsPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [totalCount, setTotalCount] = useState(0);
  const [updating, setUpdating] = useState<number | null>(null);

  // Check if user is admin/staff
  useEffect(() => {
    if (!authLoading && (!user || (user.role !== 'admin' && user.role !== 'staff'))) {
      router.push('/');
    }
  }, [user, authLoading, router]);

  // Fetch appointments
  const fetchAppointments = async (page = 1, status = statusFilter, search = searchTerm) => {
    try {
      setLoading(true);
      setError(null);

      const params: any = {
        page,
        limit: 10
      };

      if (status !== 'all') {
        params.status = status;
      }

      if (search.trim()) {
        params.search = search.trim();
      }

      const response: any = await appointmentApi.getAllAppointments(params);

      if (response.success) {
        setAppointments(response.data);
        setTotalPages(response.pagination.totalPages);
        setCurrentPage(response.pagination.page);
        setTotalCount(response.pagination.total);
      } else {
        throw new Error('Không thể tải danh sách lịch hẹn');
      }
    } catch (err: any) {
      setError(err.message || 'Đã xảy ra lỗi khi tải danh sách lịch hẹn');
    } finally {
      setLoading(false);
    }
  };

  // Update appointment status
  const updateAppointmentStatus = async (appointmentId: number, newStatus: string) => {
    try {
      setUpdating(appointmentId);
      setError(null);

      const response: any = await appointmentApi.updateAppointmentStatus(appointmentId, newStatus);

      if (response.success) {
        // Update local state
        setAppointments(prev =>
          prev.map(apt =>
            apt.id === appointmentId
              ? { ...apt, status: newStatus as any }
              : apt
          )
        );
      } else {
        throw new Error('Không thể cập nhật trạng thái');
      }
    } catch (err: any) {
      setError(err.message || 'Đã xảy ra lỗi khi cập nhật trạng thái');
    } finally {
      setUpdating(null);
    }
  };

  // Load appointments on mount and when filters change
  useEffect(() => {
    if (user && (user.role === 'admin' || user.role === 'staff')) {
      fetchAppointments(currentPage, statusFilter, searchTerm);
    }
  }, [user, currentPage, statusFilter]);

  // Handle search
  const handleSearch = () => {
    setCurrentPage(1);
    fetchAppointments(1, statusFilter, searchTerm);
  };

  // Handle Enter key for search
  const handleSearchKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  // Clear all filters
  const clearFilters = () => {
    setStatusFilter('all');
    setSearchTerm('');
    setCurrentPage(1);
    fetchAppointments(1, 'all', '');
  };

  // Check if any filters are active
  const hasActiveFilters = statusFilter !== 'all' || searchTerm.trim() !== '';

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      weekday: 'short',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user || (user.role !== 'admin' && user.role !== 'staff')) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        {/* Modern Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                📅 Quản Lý Lịch Hẹn
              </h1>
              <p className="text-gray-600 mt-2 text-sm md:text-base">
                Xem và quản lý tất cả lịch hẹn từ khách hàng
              </p>
            </div>
            <div className="mt-4 sm:mt-0 flex flex-col sm:items-end space-y-2">
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>Đang hoạt động</span>
              </div>
              {totalCount > 0 && (
                <div className="text-sm text-gray-600 font-medium">
                  📊 Tổng cộng: <span className="text-blue-600">{totalCount}</span> lịch hẹn
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Modern Filters and Search */}
        <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg border border-white/50 p-4 md:p-6 mb-6">
          <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:items-end md:gap-6">
            {/* Status Filter */}
            <div className="flex-1">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                🎯 Trạng thái
              </label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80 transition-all duration-200 hover:bg-white"
              >
                <option value="all">Tất cả trạng thái</option>
                <option value="pending">⏳ Chờ xác nhận</option>
                <option value="confirmed">✅ Đã xác nhận</option>
                <option value="in_progress">🔧 Đang thực hiện</option>
                <option value="completed">✨ Hoàn thành</option>
                <option value="cancelled">❌ Đã hủy</option>
              </select>
            </div>

            {/* Search */}
            <div className="flex-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                🔍 Tìm kiếm
              </label>
              <div className="flex gap-3">
                <input
                  type="text"
                  placeholder="Mã lịch hẹn, tên khách hàng, SĐT..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyPress={handleSearchKeyPress}
                  className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80 transition-all duration-200 hover:bg-white"
                />
                <button
                  onClick={handleSearch}
                  className="px-5 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center min-w-[52px]"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Clear Filters */}
            {hasActiveFilters && (
              <div className="flex justify-center md:justify-start mt-4 md:mt-0">
                <button
                  onClick={clearFilters}
                  className="flex items-center px-4 py-2 text-gray-500 hover:text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-xl border border-gray-200 transition-all duration-200 text-sm font-medium"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Xóa bộ lọc
                </button>
              </div>
            )}
          </div>

          {/* Active Filters Display */}
          {hasActiveFilters && (
            <div className="mt-4 flex flex-wrap gap-2">
              {statusFilter !== 'all' && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200">
                  🎯 Trạng thái: {statusLabels[statusFilter as keyof typeof statusLabels]}
                  <button
                    onClick={() => setStatusFilter('all')}
                    className="ml-2 hover:bg-blue-200 rounded-full p-0.5"
                  >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </span>
              )}
              {searchTerm.trim() && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
                  🔍 Tìm kiếm: "{searchTerm}"
                  <button
                    onClick={() => setSearchTerm('')}
                    className="ml-2 hover:bg-green-200 rounded-full p-0.5"
                  >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </span>
              )}
            </div>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Modern Appointments Display */}
        <div className="space-y-6">
          {/* Desktop Table View */}
          <div className="hidden lg:block bg-white/70 backdrop-blur-sm rounded-xl shadow-lg border border-white/50 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-gray-50 to-blue-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      📅 Lịch Hẹn
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      👤 Khách Hàng
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      🔧 Dịch Vụ
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      🚗 Xe
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      📊 Trạng Thái
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      ⚡ Hành Động
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white/50 divide-y divide-gray-100">
                  {appointments.map((appointment) => (
                    <tr key={appointment.id} className="hover:bg-white/80 transition-colors duration-200">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm">
                        <div className="font-medium text-gray-900">
                          #{appointment.appointment_code}
                        </div>
                        <div className="text-gray-500">
                          {formatDate(appointment.appointment_date)} - {appointment.appointment_time}
                        </div>
                        <div className="text-xs text-gray-400">
                          Tạo: {formatDate(appointment.created_at)}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm">
                        <div className="font-medium text-gray-900">
                          {appointment.customer_name}
                        </div>
                        <div className="text-gray-500">
                          📞 {appointment.customer_phone}
                        </div>
                        {appointment.customer_email && (
                          <div className="text-gray-500">
                            📧 {appointment.customer_email}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm">
                        <div className="font-medium text-gray-900">
                          {appointment.service_name}
                        </div>
                        <div className="text-green-600 font-semibold">
                          {formatCurrency((appointment as any).service_price || 0)}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm">
                        <div className="font-medium text-gray-900">
                          🚗 {(appointment as any).vehicle_license_plate || 'N/A'}
                        </div>
                        {(appointment as any).vehicle_brand && (
                          <div className="text-gray-500">
                            {(appointment as any).vehicle_brand} {(appointment as any).vehicle_model} {(appointment as any).vehicle_year}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${statusColors[appointment.status]}`}>
                        {statusLabels[appointment.status]}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex gap-2">
                        {appointment.status === 'pending' && (
                          <>
                            <button
                              onClick={() => updateAppointmentStatus(appointment.id, 'confirmed')}
                              disabled={updating === appointment.id}
                              className="text-green-600 hover:text-green-900 bg-green-50 hover:bg-green-100 px-3 py-1 rounded-lg border border-green-200 transition-colors disabled:opacity-50"
                            >
                              {updating === appointment.id ? '...' : 'Chấp nhận'}
                            </button>
                            <button
                              onClick={() => updateAppointmentStatus(appointment.id, 'cancelled')}
                              disabled={updating === appointment.id}
                              className="text-red-600 hover:text-red-900 bg-red-50 hover:bg-red-100 px-3 py-1 rounded-lg border border-red-200 transition-colors disabled:opacity-50"
                            >
                              {updating === appointment.id ? '...' : 'Từ chối'}
                            </button>
                          </>
                        )}

                        {appointment.status === 'confirmed' && (
                          <button
                            onClick={() => updateAppointmentStatus(appointment.id, 'in_progress')}
                            disabled={updating === appointment.id}
                            className="text-orange-600 hover:text-orange-900 bg-orange-50 hover:bg-orange-100 px-3 py-1 rounded-lg border border-orange-200 transition-colors disabled:opacity-50"
                          >
                            {updating === appointment.id ? '...' : 'Bắt đầu'}
                          </button>
                        )}

                        {appointment.status === 'in_progress' && (
                          <button
                            onClick={() => updateAppointmentStatus(appointment.id, 'completed')}
                            disabled={updating === appointment.id}
                            className="text-green-600 hover:text-green-900 bg-green-50 hover:bg-green-100 px-3 py-1 rounded-lg border border-green-200 transition-colors disabled:opacity-50"
                          >
                            {updating === appointment.id ? '...' : 'Hoàn thành'}
                          </button>
                        )}

                        {appointment.notes && (
                          <button
                            title={appointment.notes}
                            className="text-blue-600 hover:text-blue-900 bg-blue-50 hover:bg-blue-100 px-2 py-1 rounded-lg border border-blue-200 transition-colors"
                          >
                            📝
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile Card View */}
          <div className="lg:hidden space-y-4">
            {appointments.map((appointment) => (
              <div
                key={appointment.id}
                className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg border border-white/50 p-4 hover:shadow-xl transition-all duration-300"
              >
                {/* Card Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                      <span className="text-white font-bold text-lg">📅</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg">
                        #{appointment.appointment_code}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {formatDate(appointment.appointment_date)} - {appointment.appointment_time}
                      </p>
                    </div>
                  </div>
                  <div className="mt-2 sm:mt-0">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${statusColors[appointment.status]}`}>
                      {statusLabels[appointment.status]}
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  {/* Customer Info */}
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold text-gray-600 flex items-center">
                      <span className="mr-2">👤</span>Khách Hàng
                    </h4>
                    <div className="pl-6 space-y-1">
                      <p className="font-medium text-gray-900">{appointment.customer_name}</p>
                      <p className="text-sm text-gray-500">📞 {appointment.customer_phone}</p>
                      {appointment.customer_email && (
                        <p className="text-sm text-gray-500">📧 {appointment.customer_email}</p>
                      )}
                    </div>
                  </div>

                  {/* Service Info */}
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold text-gray-600 flex items-center">
                      <span className="mr-2">🔧</span>Dịch Vụ
                    </h4>
                    <div className="pl-6 space-y-1">
                      <p className="font-medium text-gray-900">{appointment.service_name}</p>
                      <p className="text-green-600 font-semibold">
                        {formatCurrency((appointment as any).service_price || 0)}
                      </p>
                    </div>
                  </div>

                  {/* Vehicle Info */}
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold text-gray-600 flex items-center">
                      <span className="mr-2">🚗</span>Phương Tiện
                    </h4>
                    <div className="pl-6 space-y-1">
                      <p className="font-medium text-gray-900">{(appointment as any).vehicle_license_plate || 'N/A'}</p>
                      {(appointment as any).vehicle_brand && (
                        <p className="text-sm text-gray-500">
                          {(appointment as any).vehicle_brand} {(appointment as any).vehicle_model} {(appointment as any).vehicle_year}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Additional Info */}
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold text-gray-600 flex items-center">
                      <span className="mr-2">📋</span>Thông Tin
                    </h4>
                    <div className="pl-6">
                      <p className="text-xs text-gray-400">
                        Tạo: {formatDate(appointment.created_at)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-100">
                  {appointment.status === 'pending' && (
                    <>
                      <button
                        onClick={() => updateAppointmentStatus(appointment.id, 'confirmed')}
                        disabled={updating === appointment.id}
                        className="flex-1 sm:flex-none text-green-600 hover:text-green-900 bg-green-50 hover:bg-green-100 px-4 py-2 rounded-xl border border-green-200 transition-all duration-200 disabled:opacity-50 font-medium text-sm"
                      >
                        {updating === appointment.id ? '⏳' : '✅ Chấp nhận'}
                      </button>
                      <button
                        onClick={() => updateAppointmentStatus(appointment.id, 'cancelled')}
                        disabled={updating === appointment.id}
                        className="flex-1 sm:flex-none text-red-600 hover:text-red-900 bg-red-50 hover:bg-red-100 px-4 py-2 rounded-xl border border-red-200 transition-all duration-200 disabled:opacity-50 font-medium text-sm"
                      >
                        {updating === appointment.id ? '⏳' : '❌ Từ chối'}
                      </button>
                    </>
                  )}

                  {appointment.status === 'confirmed' && (
                    <button
                      onClick={() => updateAppointmentStatus(appointment.id, 'in_progress')}
                      disabled={updating === appointment.id}
                      className="flex-1 sm:flex-none text-orange-600 hover:text-orange-900 bg-orange-50 hover:bg-orange-100 px-4 py-2 rounded-xl border border-orange-200 transition-all duration-200 disabled:opacity-50 font-medium text-sm"
                    >
                      {updating === appointment.id ? '⏳' : '🔧 Bắt đầu'}
                    </button>
                  )}

                  {appointment.status === 'in_progress' && (
                    <button
                      onClick={() => updateAppointmentStatus(appointment.id, 'completed')}
                      disabled={updating === appointment.id}
                      className="flex-1 sm:flex-none text-green-600 hover:text-green-900 bg-green-50 hover:bg-green-100 px-4 py-2 rounded-xl border border-green-200 transition-all duration-200 disabled:opacity-50 font-medium text-sm"
                    >
                      {updating === appointment.id ? '⏳' : '✨ Hoàn thành'}
                    </button>
                  )}

                  {appointment.notes && (
                    <button
                      title={appointment.notes}
                      className="text-blue-600 hover:text-blue-900 bg-blue-50 hover:bg-blue-100 px-3 py-2 rounded-xl border border-blue-200 transition-all duration-200 text-sm"
                    >
                      📝 Ghi chú
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {appointments.length === 0 && !loading && (
            <div className="text-center py-16">
              <div className="w-24 h-24 mx-auto bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mb-4">
                <span className="text-4xl">📅</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Không có lịch hẹn nào</h3>
              <p className="text-gray-500">Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm</p>
            </div>
          )}
        </div>

        {/* Modern Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-8">
            <nav className="flex items-center gap-1 bg-white/70 backdrop-blur-sm rounded-xl p-2 shadow-lg border border-white/50">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="flex items-center px-4 py-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-white/80 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 text-sm font-medium"
              >
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Trước
              </button>

              <div className="flex items-center gap-1 mx-2">
                {[...Array(totalPages)].map((_, i) => {
                  const page = i + 1;
                  return (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-10 h-10 rounded-lg text-sm font-semibold transition-all duration-200 ${
                        currentPage === page
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg transform scale-110'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-white/60'
                      }`}
                    >
                      {page}
                    </button>
                  );
                })}
              </div>

              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="flex items-center px-4 py-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-white/80 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 text-sm font-medium"
              >
                Sau
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </nav>
          </div>
        )}
      </div>
    </div>
  );
}