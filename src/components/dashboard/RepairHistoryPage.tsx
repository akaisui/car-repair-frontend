'use client';

import { useState } from 'react';
import Link from 'next/link';

// Mock data - In real app, this would come from API
const mockRepairHistory = [
  {
    id: 1,
    date: '2024-01-20',
    vehicle: 'Honda Wave RSX 110',
    licensePlate: '59A1-12345',
    services: [
      { name: 'Đại tu động cơ', price: 2500000 },
      { name: 'Thay dầu nhớt', price: 150000 },
      { name: 'Thay lọc gió', price: 80000 },
    ],
    parts: [
      { name: 'Piston Honda Wave', quantity: 1, price: 350000 },
      { name: 'Gioăng đầu máy', quantity: 1, price: 120000 },
      { name: 'Dầu nhớt Castrol 10W40', quantity: 1, price: 180000 },
    ],
    mechanic: 'Thợ Nguyễn Văn B',
    totalCost: 3380000,
    status: 'completed',
    warranty: '6 tháng',
    notes: 'Động cơ đã được đại tu hoàn toàn. Khách hàng nên thay dầu sau 1000km đầu.',
    images: ['/images/repairs/repair-1-1.jpg', '/images/repairs/repair-1-2.jpg'],
  },
  {
    id: 2,
    date: '2024-01-15',
    vehicle: 'Honda Wave RSX 110',
    licensePlate: '59A1-12345',
    services: [
      { name: 'Thay nhớt + Bảo dưỡng định kỳ', price: 280000 },
      { name: 'Kiểm tra hệ thống phanh', price: 50000 },
    ],
    parts: [
      { name: 'Dầu nhớt Shell 10W40', quantity: 1, price: 160000 },
      { name: 'Lọc dầu', quantity: 1, price: 45000 },
    ],
    mechanic: 'Thợ Lê Văn C',
    totalCost: 535000,
    status: 'completed',
    warranty: '3 tháng',
    notes: 'Bảo dưỡng định kỳ 5000km. Xe đang trong tình trạng tốt.',
    images: [],
  },
  {
    id: 3,
    date: '2024-01-08',
    vehicle: 'Honda Wave RSX 110',
    licensePlate: '59A1-12345',
    services: [
      { name: 'Sửa phanh trước', price: 200000 },
      { name: 'Cân chỉnh bánh xe', price: 100000 },
    ],
    parts: [
      { name: 'Má phanh trước Honda', quantity: 1, price: 150000 },
      { name: 'Dầu phanh DOT4', quantity: 1, price: 45000 },
    ],
    mechanic: 'Thợ Lê Văn C',
    totalCost: 495000,
    status: 'completed',
    warranty: '3 tháng',
    notes: 'Thay má phanh trước và bơm dầu phanh. Phanh hoạt động tốt.',
    images: ['/images/repairs/repair-3-1.jpg'],
  },
  {
    id: 4,
    date: '2023-12-20',
    vehicle: 'Yamaha Sirius',
    licensePlate: '59B2-67890',
    services: [
      { name: 'Thay nhớt', price: 120000 },
      { name: 'Vệ sinh xe', price: 50000 },
    ],
    parts: [
      { name: 'Dầu nhớt Yamaha 10W30', quantity: 1, price: 140000 },
    ],
    mechanic: 'Thợ Võ Văn E',
    totalCost: 310000,
    status: 'completed',
    warranty: '2 tháng',
    notes: 'Thay dầu định kỳ. Xe Yamaha Sirius hoạt động ổn định.',
    images: [],
  },
];

// Icons
const SearchIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const FilterIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.707A1 1 0 013 7V4z" />
  </svg>
);

const DownloadIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const CalendarIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const UserIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const EyeIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
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

const getStatusColor = (status: string) => {
  switch (status) {
    case 'completed':
      return 'bg-green-100 text-green-800';
    case 'in_progress':
      return 'bg-blue-100 text-blue-800';
    case 'pending':
      return 'bg-yellow-100 text-yellow-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case 'completed':
      return 'Hoàn thành';
    case 'in_progress':
      return 'Đang sửa';
    case 'pending':
      return 'Chờ xử lý';
    default:
      return status;
  }
};

export default function RepairHistoryPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedVehicle, setSelectedVehicle] = useState('all');
  const [selectedYear, setSelectedYear] = useState('all');
  const [selectedRepair, setSelectedRepair] = useState<typeof mockRepairHistory[0] | null>(null);

  const filteredHistory = mockRepairHistory.filter((repair) => {
    const matchesSearch = repair.vehicle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         repair.services.some(service => service.name.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesVehicle = selectedVehicle === 'all' || repair.vehicle.includes(selectedVehicle);

    const repairYear = new Date(repair.date).getFullYear().toString();
    const matchesYear = selectedYear === 'all' || repairYear === selectedYear;

    return matchesSearch && matchesVehicle && matchesYear;
  });

  const totalSpent = filteredHistory.reduce((sum, repair) => sum + repair.totalCost, 0);
  const totalRepairs = filteredHistory.length;

  const vehicles = Array.from(new Set(mockRepairHistory.map(repair => repair.vehicle)));
  const years = Array.from(new Set(mockRepairHistory.map(repair => new Date(repair.date).getFullYear().toString()))).sort().reverse();

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Lịch sử sửa chữa</h1>
        <p className="text-gray-600">Theo dõi tất cả các lần bảo dưỡng và sửa chữa xe của bạn</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Tổng số lần sửa</p>
              <p className="text-2xl font-bold text-gray-900">{totalRepairs}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <span className="text-blue-600 text-xl">🔧</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Tổng chi tiêu</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalSpent)}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <span className="text-green-600 text-xl">💰</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Chi phí trung bình</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalSpent / totalRepairs || 0)}</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <span className="text-purple-600 text-xl">📊</span>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm kiếm theo tên dịch vụ..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          <select
            value={selectedVehicle}
            onChange={(e) => setSelectedVehicle(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="all">Tất cả xe</option>
            {vehicles.map((vehicle) => (
              <option key={vehicle} value={vehicle}>{vehicle}</option>
            ))}
          </select>

          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="all">Tất cả năm</option>
            {years.map((year) => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>

          <button className="flex items-center space-x-2 px-4 py-2 bg-primary-50 text-primary-600 rounded-lg hover:bg-primary-100 transition-colors duration-200">
            <DownloadIcon />
            <span>Xuất báo cáo</span>
          </button>
        </div>
      </div>

      {/* Repair History List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            Danh sách sửa chữa ({filteredHistory.length})
          </h2>
        </div>

        <div className="divide-y divide-gray-200">
          {filteredHistory.map((repair) => (
            <div key={repair.id} className="p-6 hover:bg-gray-50 transition-colors duration-200">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="font-semibold text-gray-900">{repair.vehicle}</h3>
                    <span className="text-sm text-gray-500">({repair.licensePlate})</span>
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(repair.status)}`}>
                      {getStatusText(repair.status)}
                    </span>
                  </div>

                  <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                    <div className="flex items-center space-x-1">
                      <CalendarIcon />
                      <span>{formatDate(repair.date)}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <UserIcon />
                      <span>{repair.mechanic}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-2">
                    {repair.services.map((service, index) => (
                      <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                        {service.name}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-xl font-bold text-gray-900 mb-2">{formatCurrency(repair.totalCost)}</p>
                  <button
                    onClick={() => setSelectedRepair(repair)}
                    className="flex items-center space-x-1 text-primary-600 hover:text-primary-700 text-sm"
                  >
                    <EyeIcon />
                    <span>Chi tiết</span>
                  </button>
                </div>
              </div>

              {repair.warranty && (
                <div className="flex items-center space-x-2 text-sm">
                  <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">
                    Bảo hành: {repair.warranty}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>

        {filteredHistory.length === 0 && (
          <div className="p-12 text-center">
            <div className="text-4xl mb-4">🔍</div>
            <p className="text-gray-500 mb-4">Không tìm thấy lịch sử sửa chữa nào</p>
            <Link href="/book-appointment" className="btn btn-primary">
              Đặt lịch sửa xe
            </Link>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {selectedRepair && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Chi tiết sửa chữa</h2>
                <button
                  onClick={() => setSelectedRepair(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Ngày sửa</label>
                  <p className="text-gray-900">{formatDate(selectedRepair.date)}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phương tiện</label>
                  <p className="text-gray-900">{selectedRepair.vehicle} ({selectedRepair.licensePlate})</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Thợ phụ trách</label>
                  <p className="text-gray-900">{selectedRepair.mechanic}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bảo hành</label>
                  <p className="text-gray-900">{selectedRepair.warranty}</p>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">Dịch vụ đã thực hiện</h3>
                <div className="space-y-2">
                  {selectedRepair.services.map((service, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-900">{service.name}</span>
                      <span className="font-medium text-gray-900">{formatCurrency(service.price)}</span>
                    </div>
                  ))}
                </div>
              </div>

              {selectedRepair.parts.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Phụ tùng đã thay</h3>
                  <div className="space-y-2">
                    {selectedRepair.parts.map((part, index) => (
                      <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <div>
                          <span className="text-gray-900">{part.name}</span>
                          <span className="text-sm text-gray-500 ml-2">x{part.quantity}</span>
                        </div>
                        <span className="font-medium text-gray-900">{formatCurrency(part.price)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {selectedRepair.notes && (
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Ghi chú</h3>
                  <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">{selectedRepair.notes}</p>
                </div>
              )}

              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between items-center text-lg font-bold">
                  <span>Tổng cộng:</span>
                  <span className="text-primary-600">{formatCurrency(selectedRepair.totalCost)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}