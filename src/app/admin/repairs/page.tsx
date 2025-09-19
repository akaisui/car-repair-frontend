'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { repairApi, Repair, RepairFilters, repairUtils } from '@/lib/api/repairs';
import Link from 'next/link';

const statusOptions = [
  { value: '', label: 'Tất cả trạng thái' },
  { value: 'pending', label: '⏳ Chờ tiếp nhận' },
  { value: 'diagnosing', label: '🔍 Đang chẩn đoán' },
  { value: 'waiting_parts', label: '⏰ Chờ phụ tùng' },
  { value: 'in_progress', label: '🔧 Đang sửa chữa' },
  { value: 'completed', label: '✅ Hoàn thành' },
  { value: 'cancelled', label: '❌ Đã hủy' }
];

export default function AdminRepairsPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [repairs, setRepairs] = useState<Repair[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [updating, setUpdating] = useState<number | null>(null);

  // Filters
  const [filters, setFilters] = useState<RepairFilters>({
    page: 1,
    limit: 10,
    status: '',
    repair_code: '',
    customer_phone: '',
    license_plate: '',
    order_by: 'created_at',
    order_direction: 'DESC'
  });

  // Check if user is admin/staff
  useEffect(() => {
    if (!authLoading && (!user || (user.role !== 'admin' && user.role !== 'staff'))) {
      router.push('/');
    }
  }, [user, authLoading, router]);

  // Fetch repairs when filters change
  useEffect(() => {
    if (user && (user.role === 'admin' || user.role === 'staff')) {
      fetchRepairs();
    }
  }, [user, filters]);

  const fetchRepairs = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await repairApi.getAllRepairs(filters);

      if (response.success) {
        setRepairs(response.data.repairs);
        setTotalPages(response.data.pagination.total_pages);
        setCurrentPage(response.data.pagination.current_page);
        setTotalCount(response.data.pagination.total_items);
      } else {
        throw new Error(response.message || 'Không thể tải danh sách sửa chữa');
      }
    } catch (err: any) {
      console.error('Error fetching repairs:', err);
      setError(err.message || 'Đã xảy ra lỗi khi tải dữ liệu');
    } finally {
      setLoading(false);
    }
  };

  const updateRepairStatus = async (repairId: number, newStatus: string) => {
    try {
      setUpdating(repairId);
      setError(null);

      const response = await repairApi.updateRepairStatus(repairId, newStatus);

      if (response.success) {
        // Update local state
        setRepairs(prev =>
          prev.map(repair =>
            repair.id === repairId
              ? { ...repair, status: newStatus as any }
              : repair
          )
        );
      } else {
        throw new Error(response.message || 'Không thể cập nhật trạng thái');
      }
    } catch (err: any) {
      console.error('Error updating repair status:', err);
      setError(err.message || 'Đã xảy ra lỗi khi cập nhật trạng thái');
    } finally {
      setUpdating(null);
    }
  };

  const handleFilterChange = (key: keyof RepairFilters, value: any) => {
    setFilters(prev => ({
      ...prev,
      [key]: value,
      page: key === 'page' ? value : 1
    }));
  };

  const handleSearch = () => {
    setFilters(prev => ({ ...prev, page: 1 }));
  };

  const clearFilters = () => {
    setFilters({
      page: 1,
      limit: 10,
      status: '',
      repair_code: '',
      customer_phone: '',
      license_plate: '',
      order_by: 'created_at',
      order_direction: 'DESC'
    });
  };

  const hasActiveFilters = filters.status || filters.repair_code || filters.customer_phone || filters.license_plate;

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
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                🔧 Quản Lý Sửa Chữa
              </h1>
              <p className="text-gray-600 mt-2 text-sm md:text-base">
                Xem và quản lý tất cả phiếu sửa chữa
              </p>
            </div>
            <div className="mt-4 sm:mt-0 flex flex-col sm:items-end space-y-2">
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>Đang hoạt động</span>
              </div>
              {totalCount > 0 && (
                <div className="text-sm text-gray-600 font-medium">
                  📊 Tổng cộng: <span className="text-blue-600">{totalCount}</span> phiếu sửa chữa
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg border border-white/50 p-4 md:p-6 mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Status Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                🎯 Trạng thái
              </label>
              <select
                value={filters.status || ''}
                onChange={(e) => handleFilterChange('status', e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80 transition-all duration-200"
              >
                {statusOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>

            {/* Repair Code Search */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                🔍 Mã phiếu
              </label>
              <input
                type="text"
                placeholder="Nhập mã phiếu..."
                value={filters.repair_code || ''}
                onChange={(e) => handleFilterChange('repair_code', e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80 transition-all duration-200"
              />
            </div>

            {/* Customer Phone Search */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                📱 SĐT khách hàng
              </label>
              <input
                type="text"
                placeholder="Nhập số điện thoại..."
                value={filters.customer_phone || ''}
                onChange={(e) => handleFilterChange('customer_phone', e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80 transition-all duration-200"
              />
            </div>

            {/* License Plate Search */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                🚗 Biển số xe
              </label>
              <input
                type="text"
                placeholder="Nhập biển số..."
                value={filters.license_plate || ''}
                onChange={(e) => handleFilterChange('license_plate', e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80 transition-all duration-200"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between items-center mt-4">
            <div className="flex gap-3">
              <button
                onClick={handleSearch}
                className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                🔍 Tìm kiếm
              </button>
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="px-4 py-2 text-gray-500 hover:text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-xl border border-gray-200 transition-all duration-200"
                >
                  ❌ Xóa bộ lọc
                </button>
              )}
            </div>

            {user.role === 'admin' && (
              <Link
                href="/admin/repairs/create"
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-xl transition-colors shadow-lg hover:shadow-xl"
              >
                ➕ Tạo phiếu mới
              </Link>
            )}
          </div>

          {/* Active Filters Display */}
          {hasActiveFilters && (
            <div className="mt-4 flex flex-wrap gap-2">
              {filters.status && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200">
                  🎯 {statusOptions.find(s => s.value === filters.status)?.label}
                </span>
              )}
              {filters.repair_code && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
                  🔍 Mã: {filters.repair_code}
                </span>
              )}
              {filters.customer_phone && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 border border-purple-200">
                  📱 SĐT: {filters.customer_phone}
                </span>
              )}
              {filters.license_plate && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800 border border-orange-200">
                  🚗 Biển số: {filters.license_plate}
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

        {/* Repairs Display */}
        <div className="space-y-6">
          {/* Desktop Table View */}
          <div className="hidden lg:block bg-white/70 backdrop-blur-sm rounded-xl shadow-lg border border-white/50 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-gray-50 to-blue-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      🔧 Phiếu sửa chữa
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      👤 Khách hàng
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      🚗 Xe
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      👨‍🔧 Thợ sửa
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      📊 Trạng thái
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      💰 Chi phí
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      ⚡ Hành động
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white/50 divide-y divide-gray-100">
                  {repairs.map((repair) => (
                    <tr key={repair.id} className="hover:bg-white/80 transition-colors duration-200">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm">
                          <div className="font-medium text-gray-900">
                            #{repair.repair_code}
                          </div>
                          <div className="text-gray-500">
                            {repairUtils.formatDate(repair.created_at)}
                          </div>
                          {repair.appointment_id && (
                            <div className="text-xs text-blue-600">
                              📅 Từ lịch hẹn
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm">
                          <div className="font-medium text-gray-900">
                            {repair.customer_name}
                          </div>
                          <div className="text-gray-500">
                            📞 {repair.customer_phone}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm">
                          <div className="font-medium text-gray-900">
                            🚗 {repair.vehicle_license_plate}
                          </div>
                          {repair.vehicle_brand && (
                            <div className="text-gray-500">
                              {repair.vehicle_brand} {repair.vehicle_model}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm">
                          {repair.mechanic_name ? (
                            <>
                              <div className="font-medium text-gray-900">
                                {repair.mechanic_name}
                              </div>
                              <div className="text-green-600 text-xs">Đã phân công</div>
                            </>
                          ) : (
                            <div className="text-gray-500">Chưa phân công</div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${repairUtils.getStatusColor(repair.status)}`}>
                          {repairUtils.getStatusLabel(repair.status)}
                        </span>
                        {/* Progress Bar */}
                        <div className="mt-2 w-full bg-gray-200 rounded-full h-1">
                          <div
                            className="bg-gradient-to-r from-blue-500 to-purple-500 h-1 rounded-full transition-all duration-500"
                            style={{ width: `${repairUtils.getProgressPercentage(repair.status)}%` }}
                          ></div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm">
                          {repair.total_cost && repair.total_cost > 0 ? (
                            <div className="font-semibold text-green-600">
                              {repairUtils.formatCurrency(repair.total_cost)}
                            </div>
                          ) : (
                            <div className="text-gray-500">Chưa tính</div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex gap-2">
                          <Link
                            href={`/admin/repairs/${repair.id}`}
                            className="text-blue-600 hover:text-blue-900 bg-blue-50 hover:bg-blue-100 px-3 py-1 rounded-lg border border-blue-200 transition-colors"
                          >
                            👁️ Chi tiết
                          </Link>

                          {/* Status Update Buttons */}
                          {repairUtils.getNextStatuses(repair.status).map(nextStatus => (
                            <button
                              key={nextStatus}
                              onClick={() => updateRepairStatus(repair.id, nextStatus)}
                              disabled={updating === repair.id}
                              className={`
                                px-3 py-1 rounded-lg border transition-colors disabled:opacity-50 text-xs
                                ${nextStatus === 'completed'
                                  ? 'text-green-600 hover:text-green-900 bg-green-50 hover:bg-green-100 border-green-200'
                                  : nextStatus === 'cancelled'
                                    ? 'text-red-600 hover:text-red-900 bg-red-50 hover:bg-red-100 border-red-200'
                                    : 'text-orange-600 hover:text-orange-900 bg-orange-50 hover:bg-orange-100 border-orange-200'
                                }
                              `}
                            >
                              {updating === repair.id ? '⏳' : repairUtils.getStatusLabel(nextStatus)}
                            </button>
                          ))}
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
            {repairs.map((repair) => (
              <div
                key={repair.id}
                className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg border border-white/50 p-4 hover:shadow-xl transition-all duration-300"
              >
                {/* Card Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                      <span className="text-white font-bold text-lg">🔧</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg">
                        #{repair.repair_code}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {repairUtils.formatDate(repair.created_at)}
                      </p>
                    </div>
                  </div>
                  <div className="mt-2 sm:mt-0">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${repairUtils.getStatusColor(repair.status)}`}>
                      {repairUtils.getStatusLabel(repair.status)}
                    </span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span>Tiến độ</span>
                    <span>{repairUtils.getProgressPercentage(repair.status)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${repairUtils.getProgressPercentage(repair.status)}%` }}
                    ></div>
                  </div>
                </div>

                {/* Card Content */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  {/* Customer Info */}
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold text-gray-600 flex items-center">
                      <span className="mr-2">👤</span>Khách hàng
                    </h4>
                    <div className="pl-6 space-y-1">
                      <p className="font-medium text-gray-900">{repair.customer_name}</p>
                      <p className="text-sm text-gray-500">📞 {repair.customer_phone}</p>
                    </div>
                  </div>

                  {/* Vehicle Info */}
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold text-gray-600 flex items-center">
                      <span className="mr-2">🚗</span>Xe
                    </h4>
                    <div className="pl-6 space-y-1">
                      <p className="font-medium text-gray-900">{repair.vehicle_license_plate}</p>
                      {repair.vehicle_brand && (
                        <p className="text-sm text-gray-500">
                          {repair.vehicle_brand} {repair.vehicle_model}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Mechanic Info */}
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold text-gray-600 flex items-center">
                      <span className="mr-2">👨‍🔧</span>Thợ sửa
                    </h4>
                    <div className="pl-6">
                      {repair.mechanic_name ? (
                        <p className="font-medium text-gray-900">{repair.mechanic_name}</p>
                      ) : (
                        <p className="text-gray-500">Chưa phân công</p>
                      )}
                    </div>
                  </div>

                  {/* Cost Info */}
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold text-gray-600 flex items-center">
                      <span className="mr-2">💰</span>Chi phí
                    </h4>
                    <div className="pl-6">
                      {repair.total_cost && repair.total_cost > 0 ? (
                        <p className="font-semibold text-green-600">
                          {repairUtils.formatCurrency(repair.total_cost)}
                        </p>
                      ) : (
                        <p className="text-gray-500">Chưa tính</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-100">
                  <Link
                    href={`/admin/repairs/${repair.id}`}
                    className="flex-1 sm:flex-none text-blue-600 hover:text-blue-900 bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-xl border border-blue-200 transition-all duration-200 text-sm font-medium text-center"
                  >
                    👁️ Chi tiết
                  </Link>

                  {repairUtils.getNextStatuses(repair.status).map(nextStatus => (
                    <button
                      key={nextStatus}
                      onClick={() => updateRepairStatus(repair.id, nextStatus)}
                      disabled={updating === repair.id}
                      className={`
                        flex-1 sm:flex-none px-4 py-2 rounded-xl transition-all duration-200 disabled:opacity-50 text-sm font-medium
                        ${nextStatus === 'completed'
                          ? 'text-green-600 hover:text-green-900 bg-green-50 hover:bg-green-100 border border-green-200'
                          : nextStatus === 'cancelled'
                            ? 'text-red-600 hover:text-red-900 bg-red-50 hover:bg-red-100 border border-red-200'
                            : 'text-orange-600 hover:text-orange-900 bg-orange-50 hover:bg-orange-100 border border-orange-200'
                        }
                      `}
                    >
                      {updating === repair.id ? '⏳' : repairUtils.getStatusLabel(nextStatus)}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {repairs.length === 0 && !loading && (
            <div className="text-center py-16">
              <div className="w-24 h-24 mx-auto bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mb-4">
                <span className="text-4xl">🔧</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Không có phiếu sửa chữa nào</h3>
              <p className="text-gray-500">Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm</p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-8">
            <nav className="flex items-center gap-1 bg-white/70 backdrop-blur-sm rounded-xl p-2 shadow-lg border border-white/50">
              <button
                onClick={() => handleFilterChange('page', Math.max(currentPage - 1, 1))}
                disabled={currentPage === 1}
                className="flex items-center px-4 py-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-white/80 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 text-sm font-medium"
              >
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Trước
              </button>

              <div className="flex items-center gap-1 mx-2">
                {[...Array(Math.min(totalPages, 5))].map((_, i) => {
                  const page = i + 1;
                  return (
                    <button
                      key={page}
                      onClick={() => handleFilterChange('page', page)}
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
                onClick={() => handleFilterChange('page', Math.min(currentPage + 1, totalPages))}
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