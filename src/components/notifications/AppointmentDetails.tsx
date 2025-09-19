'use client';

import { useState, useEffect } from 'react';
import apiClient from '@/lib/api';

interface Appointment {
  id: number;
  appointment_code: string;
  customer_name: string;
  customer_phone: string;
  customer_email: string;
  vehicle_info: string;
  service_name: string;
  appointment_date: string;
  appointment_time: string;
  description: string;
  status: string;
  status_label: string;
  estimated_cost: number;
  notes?: string;
}

interface AppointmentDetailsProps {
  appointmentCode: string;
}

export default function AppointmentDetails({ appointmentCode }: AppointmentDetailsProps) {
  const [appointment, setAppointment] = useState<Appointment | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        setLoading(true);
        setError(null);

        const response: any = await apiClient.get(`/appointments/by-code/${appointmentCode}`);

        if (response?.data?.success) {
          setAppointment(response.data.data);
        } else if (response?.data && response.data.id) {
          // Direct data response (không có success wrapper)
          setAppointment(response.data);
        } else {
          setError('Không tìm thấy thông tin lịch hẹn');
        }
      } catch (err: any) {
        console.error('Error fetching appointment:', err);
        setError('Lỗi khi tải thông tin lịch hẹn');
      } finally {
        setLoading(false);
      }
    };

    if (appointmentCode) {
      fetchAppointment();
    }
  }, [appointmentCode]);

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-2/3"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-600 text-sm">
        {error}
      </div>
    );
  }

  if (!appointment) {
    return null;
  }

  const formatDate = (dateStr: string) => {
    try {
      return new Date(dateStr).toLocaleDateString('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
    } catch {
      return dateStr;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-gray-700">Khách hàng</label>
          <p className="text-sm text-gray-900">{appointment.customer_name}</p>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">Số điện thoại</label>
          <p className="text-sm text-gray-900">{appointment.customer_phone}</p>
        </div>
      </div>

      <div>
        <label className="text-sm font-medium text-gray-700">Xe</label>
        <p className="text-sm text-gray-900">{appointment.vehicle_info}</p>
      </div>

      <div>
        <label className="text-sm font-medium text-gray-700">Dịch vụ</label>
        <p className="text-sm text-gray-900">{appointment.service_name}</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-gray-700">Ngày hẹn</label>
          <p className="text-sm text-gray-900">{formatDate(appointment.appointment_date)}</p>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">Giờ hẹn</label>
          <p className="text-sm text-gray-900">{appointment.appointment_time}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-gray-700">Trạng thái</label>
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            appointment.status === 'confirmed' ? 'bg-green-100 text-green-800' :
            appointment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
            appointment.status === 'cancelled' ? 'bg-red-100 text-red-800' :
            'bg-gray-100 text-gray-800'
          }`}>
            {appointment.status_label}
          </span>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">Chi phí dự kiến</label>
          <p className="text-sm text-gray-900 font-semibold">
            {formatCurrency(appointment.estimated_cost)}
          </p>
        </div>
      </div>

      {appointment.description && (
        <div>
          <label className="text-sm font-medium text-gray-700">Mô tả vấn đề</label>
          <p className="text-sm text-gray-900">{appointment.description}</p>
        </div>
      )}

      {appointment.notes && (
        <div>
          <label className="text-sm font-medium text-gray-700">Ghi chú</label>
          <p className="text-sm text-gray-900">{appointment.notes}</p>
        </div>
      )}
    </div>
  );
}