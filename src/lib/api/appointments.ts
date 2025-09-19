import apiClient from './index';
import { ApiResponse } from '@/types';

export interface AppointmentBookingData {
  service_id: number;
  appointment_date: string;
  appointment_time: string;
  customer_info: {
    full_name: string;
    phone: string;
    email?: string;
  };
  vehicle_info: {
    license_plate: string;
    brand?: string;
    model?: string;
    year?: string;
  };
  notes?: string;
}

export interface Appointment {
  id: number;
  appointment_code: string;
  customer_id: number;
  vehicle_id?: number;
  service_id?: number;
  appointment_date: string;
  appointment_time: string;
  status: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';
  notes?: string;
  reminder_sent?: boolean;
  created_at: string;
  updated_at: string;
  // Joined fields
  customer_name?: string;
  customer_phone?: string;
  customer_email?: string;
  service_name?: string;
  service_duration?: number;
  vehicle_info?: string;
  license_plate?: string;
}

/**
 * Appointment API functions
 */
export const appointmentApi = {
  /**
   * Book a new appointment
   */
  bookAppointment: async (bookingData: AppointmentBookingData): Promise<ApiResponse<Appointment>> => {
    return apiClient.post<ApiResponse<Appointment>>('/appointments/book', bookingData);
  },

  /**
   * Get user's appointments
   */
  getUserAppointments: async (params?: {
    page?: number;
    limit?: number;
    status?: string;
  }): Promise<ApiResponse<Appointment[]>> => {
    return apiClient.get<ApiResponse<Appointment[]>>('/appointments/my-appointments', params);
  },

  /**
   * Get all appointments (for logged in users)
   */
  getMyAppointments: async (params?: {
    page?: number;
    limit?: number;
    status?: string;
  }): Promise<ApiResponse<Appointment[]>> => {
    return apiClient.get<ApiResponse<Appointment[]>>('/appointments/user-appointments', params);
  },

  /**
   * Get appointment by code
   */
  getAppointmentByCode: async (code: string): Promise<ApiResponse<Appointment>> => {
    return apiClient.get<ApiResponse<Appointment>>(`/appointments/code/${code}`);
  },

  /**
   * Get appointment by ID
   */
  getAppointmentById: async (id: number): Promise<ApiResponse<Appointment>> => {
    return apiClient.get<ApiResponse<Appointment>>(`/appointments/${id}`);
  },

  /**
   * Cancel appointment
   */
  cancelAppointment: async (id: number, reason?: string): Promise<ApiResponse<Appointment>> => {
    return apiClient.put<ApiResponse<Appointment>>(`/appointments/${id}/cancel`, { reason });
  },

  /**
   * Reschedule appointment
   */
  rescheduleAppointment: async (
    id: number,
    newDate: string,
    newTime: string,
    reason?: string
  ): Promise<ApiResponse<Appointment>> => {
    return apiClient.put<ApiResponse<Appointment>>(`/appointments/${id}/reschedule`, {
      appointment_date: newDate,
      appointment_time: newTime,
      reason
    });
  },

  /**
   * Check time slot availability
   */
  checkTimeSlotAvailability: async (date: string, time?: string): Promise<ApiResponse<any[]>> => {
    const params = { date, time };
    return apiClient.get<ApiResponse<any[]>>('/appointments/check-availability', params);
  },

  // ===== ADMIN FUNCTIONS =====

  /**
   * Get all appointments (admin/staff only)
   */
  getAllAppointments: async (params?: {
    page?: number;
    limit?: number;
    status?: string;
    search?: string;
    date_from?: string;
    date_to?: string;
  }) => {
    const response: any = await apiClient.get('/appointments', params);
    return response;
  },

  /**
   * Update appointment status (admin/staff only)
   */
  updateAppointmentStatus: async (id: number, status: string) => {
    const response: any = await apiClient.put(`/appointments/${id}/status`, { status });
    return response;
  },

  /**
   * Update appointment (admin/staff only)
   */
  updateAppointment: async (id: number, data: Partial<Appointment>) => {
    const response: any = await apiClient.put(`/appointments/${id}`, data);
    return response;
  },

  /**
   * Get appointment statistics (admin only)
   */
  getAppointmentStatistics: async () => {
    const response: any = await apiClient.get('/appointments/statistics');
    return response;
  },
};