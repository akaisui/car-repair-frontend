'use client';

import { useState } from 'react';

// Mock data - In real app, this would come from API
const mockActiveRepairs = [
  {
    id: 1,
    appointmentId: 15,
    vehicle: 'Honda Wave RSX 110',
    licensePlate: '59A1-12345',
    service: 'Đại tu động cơ',
    startDate: '2024-01-22',
    estimatedCompletion: '2024-01-25',
    mechanic: 'Thợ Nguyễn Văn B',
    estimatedCost: 2800000,
    currentCost: 2650000,
    status: 'in_progress',
    progress: 75,
    steps: [
      {
        id: 1,
        name: 'Tiếp nhận xe',
        description: 'Kiểm tra tình trạng xe và lập phiếu tiếp nhận',
        status: 'completed',
        completedAt: '2024-01-22 08:30',
        notes: 'Xe trong tình trạng động cơ kêu lạ, cần đại tu',
      },
      {
        id: 2,
        name: 'Tháo rời động cơ',
        description: 'Tháo rời hoàn toàn động cơ để kiểm tra chi tiết',
        status: 'completed',
        completedAt: '2024-01-22 14:00',
        notes: 'Phát hiện piston và gioăng đầu máy bị hỏng',
        images: ['/images/repairs/engine-disassembly.jpg'],
      },
      {
        id: 3,
        name: 'Đặt mua phụ tùng',
        description: 'Đặt mua các phụ tùng cần thay thế',
        status: 'completed',
        completedAt: '2024-01-22 16:30',
        notes: 'Đã đặt piston, gioăng đầu máy, và các chi tiết khác',
        parts: [
          { name: 'Piston Honda Wave', quantity: 1, price: 350000 },
          { name: 'Gioăng đầu máy', quantity: 1, price: 120000 },
          { name: 'Bạc đạn', quantity: 2, price: 180000 },
        ],
      },
      {
        id: 4,
        name: 'Gia công và lắp đặt',
        description: 'Gia công chi tiết và lắp đặt phụ tùng mới',
        status: 'in_progress',
        startedAt: '2024-01-23 08:00',
        notes: 'Đang gia công và lắp đặt các phụ tùng mới',
        estimatedCompletion: '2024-01-24 17:00',
      },
      {
        id: 5,
        name: 'Lắp ráp động cơ',
        description: 'Lắp ráp lại động cơ và kiểm tra hoạt động',
        status: 'pending',
        estimatedStart: '2024-01-24 08:00',
      },
      {
        id: 6,
        name: 'Kiểm tra và bàn giao',
        description: 'Kiểm tra tổng thể và bàn giao xe cho khách hàng',
        status: 'pending',
        estimatedStart: '2024-01-25 08:00',
      },
    ],
    timeline: [
      {
        time: '22/01 08:30',
        title: 'Xe được tiếp nhận',
        description: 'Khách hàng đã giao xe và ký xác nhận phiếu tiếp nhận',
        type: 'success',
      },
      {
        time: '22/01 14:00',
        title: 'Hoàn thành tháo rời',
        description: 'Động cơ đã được tháo rời hoàn toàn, phát hiện các hư hỏng',
        type: 'success',
      },
      {
        time: '22/01 16:30',
        title: 'Đặt mua phụ tùng',
        description: 'Đã xác định và đặt mua các phụ tùng cần thiết',
        type: 'info',
      },
      {
        time: '23/01 08:00',
        title: 'Bắt đầu gia công',
        description: 'Thợ đã bắt đầu gia công và lắp đặt phụ tùng mới',
        type: 'warning',
      },
    ],
  },
  {
    id: 2,
    appointmentId: 18,
    vehicle: 'Yamaha Sirius',
    licensePlate: '59B2-67890',
    service: 'Sửa hệ thống phanh',
    startDate: '2024-01-23',
    estimatedCompletion: '2024-01-24',
    mechanic: 'Thợ Lê Văn C',
    estimatedCost: 450000,
    currentCost: 420000,
    status: 'waiting_parts',
    progress: 60,
    steps: [
      {
        id: 1,
        name: 'Tiếp nhận xe',
        description: 'Kiểm tra tình trạng xe và lập phiếu tiếp nhận',
        status: 'completed',
        completedAt: '2024-01-23 09:00',
        notes: 'Phanh không ăn, cần kiểm tra hệ thống',
      },
      {
        id: 2,
        name: 'Chẩn đoán hư hỏng',
        description: 'Kiểm tra và chẩn đoán nguyên nhân phanh không hoạt động',
        status: 'completed',
        completedAt: '2024-01-23 11:00',
        notes: 'Má phanh mòn hoàn toàn, dầu phanh bị ô nhiễm',
      },
      {
        id: 3,
        name: 'Đặt mua phụ tùng',
        description: 'Đặt mua má phanh và dầu phanh mới',
        status: 'waiting',
        notes: 'Đang chờ má phanh Yamaha chính hãng từ nhà cung cấp',
        estimatedArrival: '2024-01-24 10:00',
      },
      {
        id: 4,
        name: 'Thay thế và sửa chữa',
        description: 'Thay má phanh mới và thay dầu phanh',
        status: 'pending',
      },
      {
        id: 5,
        name: 'Kiểm tra và bàn giao',
        description: 'Kiểm tra hệ thống phanh và bàn giao xe',
        status: 'pending',
      },
    ],
    timeline: [
      {
        time: '23/01 09:00',
        title: 'Xe được tiếp nhận',
        description: 'Khách hàng phản ánh phanh không ăn',
        type: 'success',
      },
      {
        time: '23/01 11:00',
        title: 'Hoàn thành chẩn đoán',
        description: 'Xác định má phanh mòn và dầu phanh cần thay',
        type: 'info',
      },
      {
        time: '23/01 14:00',
        title: 'Đặt mua phụ tùng',
        description: 'Đã đặt má phanh Yamaha chính hãng, dự kiến về ngày mai',
        type: 'warning',
      },
    ],
  },
];

// Icons
const CheckIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

const ClockIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const UserIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const RefreshIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
  </svg>
);

const PhoneIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
);

const MessageIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
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

const formatDateTime = (dateTimeString: string) => {
  return new Date(dateTimeString).toLocaleString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'completed':
      return 'bg-green-100 text-green-800';
    case 'in_progress':
      return 'bg-blue-100 text-blue-800';
    case 'waiting':
    case 'waiting_parts':
      return 'bg-yellow-100 text-yellow-800';
    case 'pending':
      return 'bg-gray-100 text-gray-600';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case 'completed':
      return 'Hoàn thành';
    case 'in_progress':
      return 'Đang thực hiện';
    case 'waiting':
      return 'Đang chờ';
    case 'waiting_parts':
      return 'Chờ phụ tùng';
    case 'pending':
      return 'Chưa bắt đầu';
    default:
      return status;
  }
};

const getStepIcon = (status: string) => {
  switch (status) {
    case 'completed':
      return (
        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
          <CheckIcon />
        </div>
      );
    case 'in_progress':
      return (
        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center animate-pulse">
          <ClockIcon />
        </div>
      );
    case 'waiting':
      return (
        <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
          <ClockIcon />
        </div>
      );
    default:
      return (
        <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
          <div className="w-3 h-3 bg-white rounded-full"></div>
        </div>
      );
  }
};

export default function TrackingPage() {
  const [selectedRepair, setSelectedRepair] = useState<any>(mockActiveRepairs[0]);
  const [activeTab, setActiveTab] = useState('progress');

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Theo dõi tiến độ sửa xe</h1>
            <p className="text-gray-600">Xem tiến độ sửa chữa xe của bạn theo thời gian thực</p>
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 bg-primary-50 text-primary-600 rounded-lg hover:bg-primary-100 transition-colors duration-200">
            <RefreshIcon />
            <span>Cập nhật</span>
          </button>
        </div>
      </div>

      {mockActiveRepairs.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <div className="text-6xl mb-4">🔧</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Không có xe đang sửa</h3>
          <p className="text-gray-600 mb-6">Hiện tại bạn không có xe nào đang được sửa chữa</p>
          <a href="/book-appointment" className="btn btn-primary">
            Đặt lịch sửa xe
          </a>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Repair List */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Xe đang sửa ({mockActiveRepairs.length})</h2>
              </div>
              <div className="divide-y divide-gray-200">
                {mockActiveRepairs.map((repair) => (
                  <div
                    key={repair.id}
                    onClick={() => setSelectedRepair(repair)}
                    className={`p-6 cursor-pointer hover:bg-gray-50 transition-colors duration-200 ${
                      selectedRepair?.id === repair.id ? 'bg-primary-50 border-r-4 border-primary-500' : ''
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-gray-900">{repair.service}</h3>
                        <p className="text-sm text-gray-600">{repair.vehicle} ({repair.licensePlate})</p>
                      </div>
                      <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(repair.status)}`}>
                        {getStatusText(repair.status)}
                      </span>
                    </div>

                    <div className="mb-3">
                      <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>Tiến độ</span>
                        <span>{repair.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-primary-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${repair.progress}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Dự kiến hoàn thành:</span>
                      <span className="font-medium">{formatDate(repair.estimatedCompletion)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Repair Details */}
          <div className="lg:col-span-2">
            {selectedRepair && (
              <div className="space-y-6">
                {/* Repair Info Card */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h2 className="text-xl font-bold text-gray-900 mb-2">{selectedRepair.service}</h2>
                      <div className="space-y-1 text-sm text-gray-600">
                        <p>{selectedRepair.vehicle} ({selectedRepair.licensePlate})</p>
                        <div className="flex items-center space-x-2">
                          <UserIcon />
                          <span>{selectedRepair.mechanic}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary-600 mb-1">
                        {selectedRepair.progress}%
                      </div>
                      <span className={`px-3 py-1 text-sm rounded-full ${getStatusColor(selectedRepair.status)}`}>
                        {getStatusText(selectedRepair.status)}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-lg font-bold text-gray-900">{formatDate(selectedRepair.startDate)}</div>
                      <div className="text-sm text-gray-600">Ngày bắt đầu</div>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-lg font-bold text-gray-900">{formatDate(selectedRepair.estimatedCompletion)}</div>
                      <div className="text-sm text-gray-600">Dự kiến hoàn thành</div>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-lg font-bold text-primary-600">{formatCurrency(selectedRepair.currentCost)}</div>
                      <div className="text-sm text-gray-600">Chi phí hiện tại</div>
                    </div>
                  </div>

                  <div className="flex justify-center space-x-4">
                    <a
                      href="tel:058-615-4540"
                      className="flex items-center space-x-2 px-4 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors duration-200"
                    >
                      <PhoneIcon />
                      <span>Gọi tiệm</span>
                    </a>
                    <button className="flex items-center space-x-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors duration-200">
                      <MessageIcon />
                      <span>Nhắn tin</span>
                    </button>
                  </div>
                </div>

                {/* Progress Steps */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">Tiến độ chi tiết</h3>

                  <div className="space-y-6">
                    {selectedRepair.steps.map((step: any, index: number) => (
                      <div key={step.id} className="flex items-start space-x-4">
                        <div className="flex flex-col items-center">
                          {getStepIcon(step.status)}
                          {index < selectedRepair.steps.length - 1 && (
                            <div className={`w-0.5 h-12 mt-2 ${
                              step.status === 'completed' ? 'bg-green-500' : 'bg-gray-200'
                            }`}></div>
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h4 className="font-semibold text-gray-900">{step.name}</h4>
                              <p className="text-sm text-gray-600 mt-1">{step.description}</p>

                              {step.notes && (
                                <p className="text-sm text-blue-600 mt-2 bg-blue-50 p-2 rounded">
                                  {step.notes}
                                </p>
                              )}

                              {step.parts && step.parts.length > 0 && (
                                <div className="mt-3">
                                  <p className="text-sm font-medium text-gray-700 mb-2">Phụ tùng:</p>
                                  <div className="space-y-1">
                                    {step.parts.map((part: any, partIndex: number) => (
                                      <div key={partIndex} className="flex justify-between text-sm">
                                        <span className="text-gray-600">{part.name} x{part.quantity}</span>
                                        <span className="font-medium">{formatCurrency(part.price)}</span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>

                            <div className="text-right ml-4">
                              {step.completedAt && (
                                <div className="text-xs text-gray-500">
                                  {formatDateTime(step.completedAt)}
                                </div>
                              )}
                              {step.estimatedCompletion && step.status === 'in_progress' && (
                                <div className="text-xs text-yellow-600">
                                  Dự kiến: {formatDateTime(step.estimatedCompletion)}
                                </div>
                              )}
                              {step.estimatedStart && step.status === 'pending' && (
                                <div className="text-xs text-gray-500">
                                  Dự kiến bắt đầu: {formatDateTime(step.estimatedStart)}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Timeline */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">Lịch sử cập nhật</h3>

                  <div className="space-y-4">
                    {selectedRepair.timeline.map((event: any, index: number) => (
                      <div key={index} className="flex items-start space-x-4">
                        <div className={`w-3 h-3 rounded-full mt-1.5 ${
                          event.type === 'success' ? 'bg-green-500' :
                          event.type === 'warning' ? 'bg-yellow-500' :
                          event.type === 'info' ? 'bg-blue-500' : 'bg-gray-500'
                        }`}></div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium text-gray-900">{event.title}</h4>
                            <span className="text-xs text-gray-500">{event.time}</span>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">{event.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}