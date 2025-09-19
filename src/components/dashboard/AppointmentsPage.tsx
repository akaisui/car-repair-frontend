'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { appointmentApi, Appointment } from '@/lib/api/appointments';
import { useAuth } from '@/contexts/AuthContext';

// All data now comes from real API - no more mock data

// Icons
const CalendarIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
    />
  </svg>
);

const ClockIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const UserIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
    />
  </svg>
);

const EditIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
    />
  </svg>
);

const TrashIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
    />
  </svg>
);

const PlusIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
    />
  </svg>
);

const PhoneIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
    />
  </svg>
);

// formatCurrency removed - database doesn't have cost fields

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('vi-VN', {
    weekday: 'long',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
};

const formatTime = (timeString: string) => {
  return timeString;
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'confirmed':
      return 'bg-green-100 text-green-800';
    case 'pending':
      return 'bg-yellow-100 text-yellow-800';
    case 'completed':
      return 'bg-blue-100 text-blue-800';
    case 'cancelled':
      return 'bg-red-100 text-red-800';
    case 'in_progress':
      return 'bg-purple-100 text-purple-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case 'confirmed':
      return 'Đã xác nhận';
    case 'pending':
      return 'Chờ xác nhận';
    case 'completed':
      return 'Hoàn thành';
    case 'cancelled':
      return 'Đã hủy';
    case 'in_progress':
      return 'Đang thực hiện';
    default:
      return status;
  }
};

const canCancelAppointment = (appointment: any) => {
  const appointmentDate = new Date(
    `${appointment.appointment_date} ${appointment.appointment_time}`
  );
  const now = new Date();
  const timeDiff = appointmentDate.getTime() - now.getTime();
  const hoursDiff = timeDiff / (1000 * 3600);

  return appointment.status === 'confirmed' || (appointment.status === 'pending' && hoursDiff > 2);
};

const canRescheduleAppointment = (appointment: any) => {
  const appointmentDate = new Date(
    `${appointment.appointment_date} ${appointment.appointment_time}`
  );
  const now = new Date();
  const timeDiff = appointmentDate.getTime() - now.getTime();
  const hoursDiff = timeDiff / (1000 * 3600);

  return (appointment.status === 'confirmed' || appointment.status === 'pending') && hoursDiff > 4;
};

export default function AppointmentsPage() {
  const { user } = useAuth();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('upcoming');
  const [selectedAppointment, setSelectedAppointment] = useState<any>(null);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelReason, setCancelReason] = useState('');
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showSuccessBanner, setShowSuccessBanner] = useState(false);
  const [newAppointmentCode, setNewAppointmentCode] = useState<string | null>(null);

  // Check for success parameters from booking
  useEffect(() => {
    const success = searchParams.get('success');
    const code = searchParams.get('code');
    const isNew = searchParams.get('new');

    if (success === 'true' && code && isNew === 'true') {
      setShowSuccessBanner(true);
      setNewAppointmentCode(code);
      // Clear URL parameters
      router.replace('/appointments', { scroll: false });
    }
  }, [searchParams, router]);

  // Fetch appointments from API
  useEffect(() => {
    const fetchAppointments = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        console.log('🔍 Fetching appointments for user:', user?.email);
        const response = await appointmentApi.getMyAppointments();
        console.log('📋 API Response:', response);
        if (response.success) {
          console.log('✅ Appointments data:', response.data);
          console.log('📊 Number of appointments:', response.data?.length || 0);
          setAppointments(response.data || []);
        } else {
          console.error('❌ API failed:', response);
          setError('Không thể tải danh sách lịch hẹn');
        }
      } catch (err) {
        console.error('💥 Error fetching appointments:', err);
        setError('Có lỗi xảy ra khi tải danh sách lịch hẹn');
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [user]);

  const upcomingAppointments = appointments.filter(
    (apt) => apt.status === 'confirmed' || apt.status === 'pending'
  );

  const pastAppointments = appointments.filter(
    (apt) => apt.status === 'completed' || apt.status === 'cancelled'
  );

  const handleCancelAppointment = (appointment: any) => {
    setSelectedAppointment(appointment);
    setShowCancelModal(true);
  };

  const generateCalendarFile = () => {
    // Find the next upcoming appointment
    const nextAppointment = upcomingAppointments.length > 0 ? upcomingAppointments[0] : null;

    if (!nextAppointment) {
      alert('Không có lịch hẹn sắp tới để thêm vào lịch');
      return;
    }

    // Create ICS file content
    const startDate = new Date(
      `${nextAppointment.appointment_date} ${nextAppointment.appointment_time}`
    );
    const endDate = new Date(startDate.getTime() + 60 * 60 * 1000); // Add 1 hour

    const formatDate = (date: Date) => {
      return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    };

    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Car Repair Shop//Appointment//EN
BEGIN:VEVENT
UID:${nextAppointment.id}-${Date.now()}@carrepair.com
DTSTAMP:${formatDate(new Date())}
DTSTART:${formatDate(startDate)}
DTEND:${formatDate(endDate)}
SUMMARY:${nextAppointment.service_name || 'Lịch hẹn sửa xe'}
DESCRIPTION:Lịch hẹn tại Tiệm Sửa Xe ABC\\nDịch vụ: ${nextAppointment.service_name || 'N/A'}\\nXe: ${nextAppointment.vehicle_info || nextAppointment.license_plate || 'N/A'}\\nMã lịch hẹn: ${nextAppointment.appointment_code}\\nLiên hệ: 058-615-4540
LOCATION:123 Đường Nguyễn Văn A, Quận 1, TP.HCM
BEGIN:VALARM
TRIGGER:-PT1H
ACTION:DISPLAY
DESCRIPTION:Nhắc nhở lịch hẹn sửa xe
END:VALARM
BEGIN:VALARM
TRIGGER:-PT30M
ACTION:DISPLAY
DESCRIPTION:Nhắc nhở lịch hẹn sửa xe trong 30 phút
END:VALARM
END:VEVENT
END:VCALENDAR`;

    // Download ICS file
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `lich-hen-${nextAppointment.appointment_code}.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
  };

  const confirmCancelAppointment = async () => {
    if (!selectedAppointment) return;

    try {
      const response = await appointmentApi.cancelAppointment(selectedAppointment.id, cancelReason);
      if (response.success) {
        // Refresh appointments list
        const updatedResponse = await appointmentApi.getMyAppointments();
        if (updatedResponse.success) {
          setAppointments(updatedResponse.data);
        }
      } else {
        setError('Không thể hủy lịch hẹn');
      }
    } catch (err) {
      console.error('Error cancelling appointment:', err);
      setError('Có lỗi xảy ra khi hủy lịch hẹn');
    } finally {
      setShowCancelModal(false);
      setSelectedAppointment(null);
      setCancelReason('');
    }
  };

  const tabs = [
    { id: 'upcoming', name: 'Sắp tới', count: upcomingAppointments.length },
    { id: 'past', name: 'Lịch sử', count: pastAppointments.length },
  ];

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Success Banner */}
      {showSuccessBanner && (
        <div className="mb-6 bg-green-50 border border-green-200 rounded-xl p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                ✅
              </div>
              <div>
                <h3 className="text-lg font-semibold text-green-800 mb-2">Đặt lịch thành công!</h3>
                <p className="text-green-700 mb-3">
                  Lịch hẹn của bạn đã được tạo với mã số: <strong>{newAppointmentCode}</strong>
                </p>
                <div className="bg-green-100 rounded-lg p-3 text-sm text-green-800">
                  <p className="mb-1">
                    📞 <strong>Chúng tôi sẽ liên hệ xác nhận trong vòng 2 giờ</strong>
                  </p>
                  <p className="mb-1">📧 Email xác nhận đã được gửi đến hộp thư của bạn</p>
                  <p>
                    💬 Để thay đổi lịch hẹn, vui lòng gọi:{' '}
                    <a href="tel:058-615-4540" className="font-semibold hover:underline">
                      058-615-4540
                    </a>
                  </p>
                </div>
              </div>
            </div>
            <button
              onClick={() => setShowSuccessBanner(false)}
              className="text-green-600 hover:text-green-800 p-1"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Error Banner */}
      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-red-600">⚠️</span>
              <span className="text-red-800">{error}</span>
            </div>
            <button onClick={() => setError(null)} className="text-red-600 hover:text-red-800">
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Quản lý lịch hẹn</h1>
            <p className="text-gray-600">Theo dõi và quản lý các lịch hẹn sửa chữa xe của bạn</p>
          </div>
          <Link
            href="/book-appointment"
            className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200"
          >
            <PlusIcon />
            <span>Đặt lịch mới</span>
          </Link>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Lịch hẹn sắp tới</p>
              <p className="text-2xl font-bold text-blue-600">{upcomingAppointments.length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              📅
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Đã hoàn thành</p>
              <p className="text-2xl font-bold text-green-600">
                {pastAppointments.filter((apt) => apt.status === 'completed').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              ✅
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Đã hủy</p>
              <p className="text-2xl font-bold text-red-600">
                {pastAppointments.filter((apt) => apt.status === 'cancelled').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              ❌
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Tổng cộng</p>
              <p className="text-2xl font-bold text-gray-900">{appointments.length}</p>
            </div>
            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
              📊
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">🚀 Thao tác nhanh</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <a
            href="tel:058-615-4540"
            className="flex flex-col items-center p-4 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors duration-200 text-green-600 hover:text-green-700"
          >
            <PhoneIcon />
            <span className="text-sm font-medium mt-2">Gọi tiệm</span>
          </a>

          <a
            href="https://www.google.com/maps/place/S%E1%BB%ADa+Xe+H%E1%BB%93ng+H%E1%BA%ADu/@9.5868415,105.9238976,13z/data=!4m14!1m7!3m6!1s0x31a052741a666a83:0xb7c6274858d83667!2zU-G7rWEgWGUgSOG7k25nIEjhuq11!8m2!3d9.5867593!4d105.9651832!16s%2Fg%2F11wfpk6gwk!3m5!1s0x31a052741a666a83:0xb7c6274858d83667!8m2!3d9.5867593!4d105.9651832!16s%2Fg%2F11wfpk6gwk?entry=ttu&g_ep=EgoyMDI1MDkxMC4wIKXMDSoASAFQAw%3D%3D"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center p-4 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors duration-200 text-blue-600 hover:text-blue-700"
          >
            <span className="w-5 h-5">🗺️</span>
            <span className="text-sm font-medium mt-2">Xem đường đi</span>
          </a>

          <button
            onClick={() => generateCalendarFile()}
            className="flex flex-col items-center p-4 bg-purple-50 border border-purple-200 rounded-lg hover:bg-purple-100 transition-colors duration-200 text-purple-600 hover:text-purple-700"
          >
            <CalendarIcon />
            <span className="text-sm font-medium mt-2">Thêm vào lịch</span>
          </button>

          <Link
            href="/book-appointment"
            className="flex flex-col items-center p-4 bg-primary-50 border border-primary-200 rounded-lg hover:bg-primary-100 transition-colors duration-200 text-primary-600 hover:text-primary-700"
          >
            <PlusIcon />
            <span className="text-sm font-medium mt-2">Đặt lịch mới</span>
          </Link>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 flex items-center space-x-2 ${
                  activeTab === tab.id
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span>{tab.name}</span>
                <span
                  className={`px-2 py-1 text-xs rounded-full ${
                    activeTab === tab.id
                      ? 'bg-primary-100 text-primary-600'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {/* Loading State */}
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Đang tải danh sách lịch hẹn...</p>
              </div>
            </div>
          ) : (
            <div>
              {/* Upcoming Appointments Tab */}
              {activeTab === 'upcoming' && (
                <div>
                  {upcomingAppointments.length > 0 ? (
                    <div className="space-y-6">
                      {upcomingAppointments.map((appointment) => (
                        <div
                          key={appointment.id}
                          className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow duration-200"
                        >
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                              <div className="flex items-center space-x-3 mb-2">
                                <h3 className="text-lg font-semibold text-gray-900">
                                  {appointment.service_name || 'Dịch vụ'}
                                </h3>
                                <span
                                  className={`px-3 py-1 text-sm rounded-full ${getStatusColor(appointment.status)}`}
                                >
                                  {getStatusText(appointment.status)}
                                </span>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div className="flex items-center space-x-2 text-gray-600">
                                  <CalendarIcon />
                                  <span>{formatDate(appointment.appointment_date)}</span>
                                </div>
                                <div className="flex items-center space-x-2 text-gray-600">
                                  <ClockIcon />
                                  <span>{formatTime(appointment.appointment_time)}</span>
                                </div>
                                <div className="flex items-center space-x-2 text-gray-600">
                                  <span>🏍️</span>
                                  <span>
                                    {appointment.vehicle_info ||
                                      appointment.license_plate ||
                                      'Xe của bạn'}
                                  </span>
                                </div>
                                <div className="flex items-center space-x-2 text-gray-600">
                                  <UserIcon />
                                  <span>Chưa phân công</span>
                                </div>
                              </div>

                              {appointment.notes && (
                                <div className="mb-4">
                                  <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                                    <strong>Ghi chú:</strong> {appointment.notes}
                                  </p>
                                </div>
                              )}

                              <div className="text-lg font-semibold text-primary-600">
                                Dịch vụ: {appointment.service_name || 'Chưa xác định'}
                              </div>
                            </div>

                            <div className="flex flex-col space-y-2 ml-4">
                              {canRescheduleAppointment(appointment) && (
                                <button className="flex items-center space-x-2 px-3 py-2 text-primary-600 border border-primary-200 rounded-lg hover:bg-primary-50 transition-colors duration-200">
                                  <EditIcon />
                                  <span>Đổi lịch</span>
                                </button>
                              )}

                              {canCancelAppointment(appointment) && (
                                <button
                                  onClick={() => handleCancelAppointment(appointment)}
                                  className="flex items-center space-x-2 px-3 py-2 text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors duration-200"
                                >
                                  <TrashIcon />
                                  <span>Hủy lịch</span>
                                </button>
                              )}

                              <a
                                href="tel:058-615-4540"
                                className="flex items-center space-x-2 px-3 py-2 text-green-600 border border-green-200 rounded-lg hover:bg-green-50 transition-colors duration-200"
                              >
                                <PhoneIcon />
                                <span>Gọi tiệm</span>
                              </a>
                            </div>
                          </div>

                          {appointment.status === 'pending' && (
                            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                              <p className="text-yellow-800 text-sm">
                                ⏳ <strong>Chờ xác nhận:</strong> Lịch hẹn của bạn đang được xử lý.
                                Chúng tôi sẽ liên hệ xác nhận trong vòng 2 giờ.
                              </p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <div className="text-6xl mb-4">📅</div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        Chưa có lịch hẹn nào
                      </h3>
                      <p className="text-gray-600 mb-6">
                        Đặt lịch hẹn để được chăm sóc xe máy tốt nhất
                      </p>
                      <Link href="/book-appointment" className="btn btn-primary">
                        Đặt lịch ngay
                      </Link>
                    </div>
                  )}
                </div>
              )}

              {/* Past Appointments Tab */}
              {activeTab === 'past' && (
                <div>
                  {pastAppointments.length > 0 ? (
                    <div className="space-y-4">
                      {pastAppointments.map((appointment) => (
                        <div key={appointment.id} className="border border-gray-200 rounded-lg p-6">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-3 mb-2">
                                <h3 className="font-semibold text-gray-900">
                                  {appointment.service_name || 'Dịch vụ'}
                                </h3>
                                <span
                                  className={`px-2 py-1 text-sm rounded-full ${getStatusColor(appointment.status)}`}
                                >
                                  {getStatusText(appointment.status)}
                                </span>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600 mb-2">
                                <div className="flex items-center space-x-2">
                                  <CalendarIcon />
                                  <span>{formatDate(appointment.appointment_date)}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <ClockIcon />
                                  <span>{formatTime(appointment.appointment_time)}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <span>🏍️</span>
                                  <span>
                                    {appointment.vehicle_info ||
                                      appointment.license_plate ||
                                      'Xe của bạn'}
                                  </span>
                                </div>
                              </div>

                              {appointment.notes && (
                                <p className="text-sm text-gray-600 mb-2">{appointment.notes}</p>
                              )}

                              {appointment.status === 'cancelled' && appointment.cancelReason && (
                                <p className="text-sm text-red-600">
                                  <strong>Lý do hủy:</strong> {appointment.cancelReason}
                                </p>
                              )}
                            </div>

                            <div className="text-right">
                              <div>
                                <p className="font-semibold text-gray-600">
                                  {appointment.service_name || 'Dịch vụ'}
                                </p>
                                <p className="text-sm text-gray-500">
                                  {appointment.status === 'completed' ? 'Hoàn thành' : 'Chờ xử lý'}
                                </p>
                              </div>

                              {appointment.status === 'completed' && (
                                <Link
                                  href="/book-appointment"
                                  className="inline-block mt-2 text-sm text-primary-600 hover:text-primary-700"
                                >
                                  Đặt lại dịch vụ này
                                </Link>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <div className="text-6xl mb-4">📋</div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Chưa có lịch sử</h3>
                      <p className="text-gray-600">Các lịch hẹn đã hoàn thành sẽ hiển thị ở đây</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Cancel Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Hủy lịch hẹn</h2>

            <div className="mb-4">
              <p className="text-gray-600 mb-2">
                Bạn có chắc chắn muốn hủy lịch hẹn{' '}
                <strong>{selectedAppointment?.service_name || 'dịch vụ'}</strong> vào ngày{' '}
                <strong>{formatDate(selectedAppointment?.appointment_date)}</strong>?
              </p>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Lý do hủy (tùy chọn)
              </label>
              <textarea
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Nhập lý do hủy lịch..."
              />
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => setShowCancelModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                Đóng
              </button>
              <button
                onClick={confirmCancelAppointment}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
              >
                Xác nhận hủy
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
