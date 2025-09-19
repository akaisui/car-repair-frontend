'use client';

import { useState, useEffect } from 'react';
import { repairApi, Repair, repairUtils } from '@/lib/api/repairs';
import { useAuth } from '@/contexts/AuthContext';

interface RepairTrackingProps {
  repairId?: number;
}

export default function RepairTrackingPage({ repairId }: RepairTrackingProps) {
  const { user } = useAuth();
  const [repairs, setRepairs] = useState<Repair[]>([]);
  const [selectedRepair, setSelectedRepair] = useState<Repair | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch repairs on component mount
  useEffect(() => {
    fetchRepairs();
  }, []);

  // Select specific repair if repairId provided
  useEffect(() => {
    if (repairId && repairs.length > 0) {
      const repair = repairs.find(r => r.id === repairId);
      if (repair) {
        setSelectedRepair(repair);
      }
    }
  }, [repairId, repairs]);

  const fetchRepairs = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await repairApi.getRepairHistory();

      if (response.success) {
        setRepairs(response.data);

        // Auto-select first repair if none selected
        if (response.data.length > 0 && !selectedRepair) {
          setSelectedRepair(response.data[0]);
        }
      } else {
        throw new Error(response.message || 'Không thể tải lịch sử sửa chữa');
      }
    } catch (err: any) {
      console.error('Error fetching repairs:', err);
      setError(err.message || 'Đã xảy ra lỗi khi tải dữ liệu');
    } finally {
      setLoading(false);
    }
  };

  const getTimelineSteps = (repair: Repair) => {
    const steps = [
      {
        key: 'pending',
        title: 'Tiếp nhận',
        description: 'Phiếu sửa chữa đã được tạo',
        completed: true, // Always completed since repair exists
        current: repair.status === 'pending'
      },
      {
        key: 'diagnosing',
        title: 'Chẩn đoán',
        description: 'Đang kiểm tra và chẩn đoán tình trạng xe',
        completed: ['diagnosing', 'waiting_parts', 'in_progress', 'completed'].includes(repair.status),
        current: repair.status === 'diagnosing'
      },
      {
        key: 'waiting_parts',
        title: 'Chờ phụ tùng',
        description: 'Đang chờ phụ tùng cần thiết',
        completed: ['waiting_parts', 'in_progress', 'completed'].includes(repair.status),
        current: repair.status === 'waiting_parts'
      },
      {
        key: 'in_progress',
        title: 'Đang sửa chữa',
        description: 'Đang tiến hành sửa chữa xe',
        completed: ['in_progress', 'completed'].includes(repair.status),
        current: repair.status === 'in_progress'
      },
      {
        key: 'completed',
        title: 'Hoàn thành',
        description: 'Xe đã được sửa xong và sẵn sàng nhận',
        completed: repair.status === 'completed',
        current: repair.status === 'completed'
      }
    ];

    // Handle cancelled status
    if (repair.status === 'cancelled') {
      return steps.map(step => ({
        ...step,
        completed: step.key === 'pending',
        current: false
      })).concat([{
        key: 'cancelled',
        title: 'Đã hủy',
        description: 'Phiếu sửa chữa đã được hủy',
        completed: true,
        current: true
      }]);
    }

    return steps;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Lỗi</h3>
              <div className="mt-2 text-sm text-red-700">{error}</div>
            </div>
          </div>
          <div className="mt-4">
            <button
              onClick={fetchRepairs}
              className="bg-red-100 hover:bg-red-200 text-red-800 px-4 py-2 rounded-md text-sm"
            >
              Thử lại
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (repairs.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 mx-auto bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mb-4">
            <span className="text-4xl">🔧</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Chưa có lịch sử sửa chữa</h3>
          <p className="text-gray-500">Bạn chưa có phiếu sửa chữa nào trong hệ thống.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            🔧 Theo Dõi Sửa Chữa
          </h1>
          <p className="text-gray-600 mt-2 text-sm md:text-base">
            Theo dõi tiến độ sửa chữa xe của bạn
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Repairs List */}
          <div className="lg:col-span-1">
            <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg border border-white/50 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Danh sách sửa chữa</h2>

              <div className="space-y-4">
                {repairs.map((repair) => (
                  <div
                    key={repair.id}
                    onClick={() => setSelectedRepair(repair)}
                    className={`
                      p-4 rounded-xl border-2 cursor-pointer transition-all duration-200
                      ${selectedRepair?.id === repair.id
                        ? 'border-blue-500 bg-blue-50 shadow-md'
                        : 'border-gray-200 bg-white hover:border-blue-300 hover:shadow-sm'
                      }
                    `}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-gray-900">#{repair.repair_code}</h3>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${repairUtils.getStatusColor(repair.status)}`}>
                        {repairUtils.getStatusLabel(repair.status)}
                      </span>
                    </div>

                    <div className="text-sm text-gray-600 space-y-1">
                      <div className="flex items-center">
                        <span className="mr-2">🚗</span>
                        <span>{repair.vehicle_license_plate}</span>
                        {repair.vehicle_brand && (
                          <span className="ml-2 text-gray-500">({repair.vehicle_brand} {repair.vehicle_model})</span>
                        )}
                      </div>
                      <div className="flex items-center">
                        <span className="mr-2">📅</span>
                        <span>{repairUtils.formatDate(repair.created_at)}</span>
                      </div>
                      {repair.total_cost && repair.total_cost > 0 && (
                        <div className="flex items-center">
                          <span className="mr-2">💰</span>
                          <span className="font-medium text-green-600">{repairUtils.formatCurrency(repair.total_cost)}</span>
                        </div>
                      )}
                    </div>

                    {/* Progress Bar */}
                    <div className="mt-3">
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
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Repair Details */}
          <div className="lg:col-span-2">
            {selectedRepair ? (
              <div className="space-y-6">
                {/* Header Card */}
                <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg border border-white/50 p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">#{selectedRepair.repair_code}</h2>
                      <div className="flex items-center mt-2 space-x-4 text-sm text-gray-600">
                        <div className="flex items-center">
                          <span className="mr-2">🚗</span>
                          <span>{selectedRepair.vehicle_license_plate}</span>
                        </div>
                        {selectedRepair.mechanic_name && (
                          <div className="flex items-center">
                            <span className="mr-2">👨‍🔧</span>
                            <span>{selectedRepair.mechanic_name}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="mt-4 sm:mt-0">
                      <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium border ${repairUtils.getStatusColor(selectedRepair.status)}`}>
                        {repairUtils.getStatusLabel(selectedRepair.status)}
                      </span>
                    </div>
                  </div>

                  {/* Diagnosis & Description */}
                  {(selectedRepair.diagnosis || selectedRepair.work_description) && (
                    <div className="mt-6 grid sm:grid-cols-2 gap-4">
                      {selectedRepair.diagnosis && (
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">🔍 Chẩn đoán</h4>
                          <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">{selectedRepair.diagnosis}</p>
                        </div>
                      )}
                      {selectedRepair.work_description && (
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">🔧 Mô tả công việc</h4>
                          <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">{selectedRepair.work_description}</p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Cost Summary */}
                  {selectedRepair.total_cost && selectedRepair.total_cost > 0 && (
                    <div className="mt-6 bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg">
                      <h4 className="font-medium text-gray-900 mb-3">💰 Chi phí ước tính</h4>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        {selectedRepair.labor_cost && selectedRepair.labor_cost > 0 && (
                          <div>
                            <div className="text-xs text-gray-500">Tiền công</div>
                            <div className="text-sm font-medium">{repairUtils.formatCurrency(selectedRepair.labor_cost)}</div>
                          </div>
                        )}
                        {selectedRepair.parts_cost && selectedRepair.parts_cost > 0 && (
                          <div>
                            <div className="text-xs text-gray-500">Phụ tùng</div>
                            <div className="text-sm font-medium">{repairUtils.formatCurrency(selectedRepair.parts_cost)}</div>
                          </div>
                        )}
                        <div>
                          <div className="text-xs text-gray-500">Tổng cộng</div>
                          <div className="text-lg font-bold text-green-600">{repairUtils.formatCurrency(selectedRepair.total_cost)}</div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Timeline */}
                <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg border border-white/50 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">📋 Tiến độ sửa chữa</h3>

                  <div className="space-y-6">
                    {getTimelineSteps(selectedRepair).map((step, index) => (
                      <div key={step.key} className="flex">
                        {/* Icon */}
                        <div className="flex-shrink-0">
                          <div className={`
                            w-10 h-10 rounded-full border-2 flex items-center justify-center
                            ${step.completed
                              ? 'bg-green-500 border-green-500'
                              : step.current
                                ? 'bg-blue-500 border-blue-500'
                                : 'bg-gray-200 border-gray-300'
                            }
                          `}>
                            {step.completed ? (
                              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            ) : step.current ? (
                              <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                            ) : (
                              <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                            )}
                          </div>
                        </div>

                        {/* Content */}
                        <div className="ml-4 flex-1">
                          <h4 className={`font-medium ${step.current ? 'text-blue-600' : 'text-gray-900'}`}>
                            {step.title}
                          </h4>
                          <p className="text-sm text-gray-600 mt-1">{step.description}</p>

                          {/* Show timestamp for completed steps */}
                          {step.completed && (
                            <div className="text-xs text-gray-500 mt-1">
                              {step.key === 'pending' && repairUtils.formatDateTime(selectedRepair.created_at)}
                              {step.key === 'in_progress' && selectedRepair.start_date && repairUtils.formatDateTime(selectedRepair.start_date)}
                              {step.key === 'completed' && selectedRepair.actual_completion && repairUtils.formatDateTime(selectedRepair.actual_completion)}
                            </div>
                          )}
                        </div>

                        {/* Connector Line */}
                        {index < getTimelineSteps(selectedRepair).length - 1 && (
                          <div className={`
                            absolute left-5 mt-10 w-0.5 h-6
                            ${step.completed ? 'bg-green-300' : 'bg-gray-200'}
                          `}></div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Additional Info */}
                {selectedRepair.notes && (
                  <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg border border-white/50 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">📝 Ghi chú</h3>
                    <p className="text-gray-600">{selectedRepair.notes}</p>
                  </div>
                )}

                {/* Contact Info for Completed Repairs */}
                {selectedRepair.status === 'completed' && (
                  <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl border border-green-200 p-6">
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-semibold text-green-800 mb-2">🎉 Xe đã sửa xong!</h3>
                        <p className="text-green-700 mb-4">
                          Xe của bạn đã được sửa chữa hoàn thành. Vui lòng liên hệ với chúng tôi để nhận xe.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3">
                          <a
                            href="tel:0368037868"
                            className="inline-flex items-center justify-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                          >
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            Gọi ngay
                          </a>
                          <a
                            href="https://maps.google.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                          >
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            Xem đường đi
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg border border-white/50 p-8 text-center">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Chọn một phiếu sửa chữa</h3>
                <p className="text-gray-600">Vui lòng chọn một phiếu sửa chữa từ danh sách để xem chi tiết.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}