import apiClient from './index';

export interface DashboardStats {
  appointments: {
    total: number;
    pending: number;
    confirmed: number;
    completed: number;
    inProgress: number;
    today: number;
  };
  revenue: {
    total: number;
    completedRepairs: number;
  };
  users: {
    total: number;
    customers: number;
    admins: number;
    staff: number;
  };
  recentActivity: Array<{
    appointment_code: string;
    status: string;
    appointment_date: string;
    appointment_time: string;
    created_at: string;
    license_plate: string;
    brand: string;
    model: string;
    service_name: string;
    customer_name: string;
  }>;
}

export interface MonthlyStats {
  monthlyAppointments: Array<{
    month: string;
    count: number;
    completed: number;
  }>;
  monthlyRevenue: Array<{
    month: string;
    revenue: number;
  }>;
}

export const dashboardApi = {
  /**
   * Get dashboard statistics
   */
  getStats: async (): Promise<DashboardStats> => {
    const response: any = await apiClient.get('/dashboard/stats');
    return response.data;
  },

  /**
   * Get monthly statistics for charts
   */
  getMonthlyStats: async (): Promise<MonthlyStats> => {
    const response: any = await apiClient.get('/dashboard/monthly-stats');
    return response.data;
  }
};