import apiClient from './index';

export interface Repair {
  id: number;
  repair_code: string;
  appointment_id?: number;
  user_id: number;
  vehicle_id: number;
  mechanic_id?: number;
  status: 'pending' | 'diagnosing' | 'waiting_parts' | 'in_progress' | 'completed' | 'cancelled';
  diagnosis?: string;
  work_description?: string;
  start_date?: string;
  estimated_completion?: string;
  actual_completion?: string;
  total_cost?: number;
  labor_cost?: number;
  parts_cost?: number;
  discount?: number;
  notes?: string;
  created_at: string;
  updated_at: string;

  // Joined data
  customer_name?: string;
  customer_phone?: string;
  vehicle_license_plate?: string;
  vehicle_brand?: string;
  vehicle_model?: string;
  mechanic_name?: string;
  appointment_date?: string;
  services_count?: number;
  parts_count?: number;
}

export interface RepairService {
  id: number;
  repair_id: number;
  service_id: number;
  quantity: number;
  unit_price: number;
  total_price: number;
  notes?: string;
  created_at: string;

  // Joined data
  service_name?: string;
  service_description?: string;
  service_category_name?: string;
  duration_minutes?: number;
}

export interface RepairPart {
  id: number;
  repair_id: number;
  part_id: number;
  quantity: number;
  unit_price: number;
  total_price: number;
  notes?: string;
  created_at: string;

  // Joined data
  part_name?: string;
  part_code?: string;
  part_description?: string;
  category_name?: string;
  available_quantity?: number;
}

export interface RepairWithDetails extends Repair {
  services?: RepairService[];
  parts?: RepairPart[];
}

export interface RepairSummary {
  total_repairs: number;
  pending_repairs: number;
  in_progress_repairs: number;
  completed_repairs: number;
  cancelled_repairs: number;
  total_revenue: number;
  avg_completion_time: number;
  avg_repair_cost: number;
}

export interface RepairFilters {
  page?: number;
  limit?: number;
  status?: string;
  user_id?: number;
  vehicle_id?: number;
  mechanic_id?: number;
  date_from?: string;
  date_to?: string;
  repair_code?: string;
  customer_phone?: string;
  license_plate?: string;
  min_cost?: number;
  max_cost?: number;
  order_by?: string;
  order_direction?: 'ASC' | 'DESC';
}

export interface CreateRepairData {
  appointment_id?: number;
  user_id: number;
  vehicle_id: number;
  diagnosis?: string;
  work_description?: string;
  estimated_completion?: string;
  notes?: string;
  services?: Array<{
    service_id: number;
    quantity?: number;
    custom_price?: number;
    notes?: string;
  }>;
  parts?: Array<{
    part_id: number;
    quantity: number;
    custom_price?: number;
    notes?: string;
  }>;
}

export interface UpdateRepairData {
  mechanic_id?: number;
  status?: string;
  diagnosis?: string;
  work_description?: string;
  estimated_completion?: string;
  notes?: string;
}

export const repairApi = {
  // Get all repairs with filters and pagination
  getAllRepairs: async (filters: RepairFilters = {}) => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        params.append(key, value.toString());
      }
    });

    const response = await apiClient.get(`/repairs?${params.toString()}`);
    return response.data;
  },

  // Get repair by ID with details
  getRepairById: async (id: number): Promise<{ success: boolean; data: RepairWithDetails }> => {
    const response = await apiClient.get(`/repairs/${id}`);
    return response.data;
  },

  // Create new repair
  createRepair: async (data: CreateRepairData) => {
    const response = await apiClient.post('/repairs', data);
    return response.data;
  },

  // Update repair
  updateRepair: async (id: number, data: UpdateRepairData) => {
    const response = await apiClient.put(`/repairs/${id}`, data);
    return response.data;
  },

  // Update repair status
  updateRepairStatus: async (id: number, status: string, notes?: string) => {
    const response = await apiClient.put(`/repairs/${id}/status`, { status, notes });
    return response.data;
  },

  // Assign mechanic to repair
  assignMechanic: async (id: number, mechanic_id: number) => {
    const response = await apiClient.put(`/repairs/${id}/assign-mechanic`, { mechanic_id });
    return response.data;
  },

  // Delete repair
  deleteRepair: async (id: number) => {
    const response = await apiClient.delete(`/repairs/${id}`);
    return response.data;
  },

  // Get repair history for current user
  getRepairHistory: async (params: { user_id?: number; vehicle_id?: number; limit?: number } = {}) => {
    const queryParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        queryParams.append(key, value.toString());
      }
    });

    const response = await apiClient.get(`/repairs/history?${queryParams.toString()}`);
    return response.data;
  },

  // Get repair summary/statistics
  getRepairSummary: async (date_from?: string, date_to?: string): Promise<{ success: boolean; data: RepairSummary }> => {
    const params = new URLSearchParams();
    if (date_from) params.append('date_from', date_from);
    if (date_to) params.append('date_to', date_to);

    const response = await apiClient.get(`/repairs/summary?${params.toString()}`);
    return response.data;
  },

  // Get repairs by status
  getRepairsByStatus: async (status: string, limit: number = 20) => {
    const response = await apiClient.get(`/repairs/status/${status}?limit=${limit}`);
    return response.data;
  },

  // Get mechanic's repairs
  getMechanicRepairs: async (mechanic_id: number, status?: string, limit: number = 20) => {
    const params = new URLSearchParams();
    if (status) params.append('status', status);
    params.append('limit', limit.toString());

    const response = await apiClient.get(`/repairs/mechanic/${mechanic_id}?${params.toString()}`);
    return response.data;
  },

  // Recalculate repair costs
  calculateCosts: async (id: number) => {
    const response = await apiClient.post(`/repairs/${id}/calculate-costs`);
    return response.data;
  },

  // Service management
  addService: async (repairId: number, data: { service_id: number; quantity?: number; custom_price?: number; notes?: string }) => {
    const response = await apiClient.post(`/repairs/${repairId}/services`, data);
    return response.data;
  },

  updateService: async (repairId: number, serviceId: number, data: { quantity?: number; unit_price?: number; notes?: string }) => {
    const response = await apiClient.put(`/repairs/${repairId}/services/${serviceId}`, data);
    return response.data;
  },

  removeService: async (repairId: number, serviceId: number) => {
    const response = await apiClient.delete(`/repairs/${repairId}/services/${serviceId}`);
    return response.data;
  },

  // Parts management
  addPart: async (repairId: number, data: { part_id: number; quantity: number; custom_price?: number; notes?: string }) => {
    const response = await apiClient.post(`/repairs/${repairId}/parts`, data);
    return response.data;
  },

  updatePart: async (repairId: number, partId: number, data: { quantity?: number; unit_price?: number; notes?: string }) => {
    const response = await apiClient.put(`/repairs/${repairId}/parts/${partId}`, data);
    return response.data;
  },

  removePart: async (repairId: number, partId: number) => {
    const response = await apiClient.delete(`/repairs/${repairId}/parts/${partId}`);
    return response.data;
  }
};

// Utility functions
export const repairUtils = {
  // Format repair status with Vietnamese labels
  getStatusLabel: (status: string): string => {
    const statusLabels: { [key: string]: string } = {
      pending: 'Chờ tiếp nhận',
      diagnosing: 'Đang chẩn đoán',
      waiting_parts: 'Chờ phụ tùng',
      in_progress: 'Đang sửa chữa',
      completed: 'Hoàn thành',
      cancelled: 'Đã hủy',
    };
    return statusLabels[status] || status;
  },

  // Get status color for UI
  getStatusColor: (status: string): string => {
    const statusColors: { [key: string]: string } = {
      pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      diagnosing: 'bg-blue-100 text-blue-800 border-blue-200',
      waiting_parts: 'bg-purple-100 text-purple-800 border-purple-200',
      in_progress: 'bg-orange-100 text-orange-800 border-orange-200',
      completed: 'bg-green-100 text-green-800 border-green-200',
      cancelled: 'bg-red-100 text-red-800 border-red-200',
    };
    return statusColors[status] || 'bg-gray-100 text-gray-800 border-gray-200';
  },

  // Format currency
  formatCurrency: (amount: number): string => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  },

  // Format date
  formatDate: (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  },

  // Format datetime
  formatDateTime: (dateString: string): string => {
    return new Date(dateString).toLocaleString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  },

  // Calculate repair progress percentage
  getProgressPercentage: (status: string): number => {
    const progressMap: { [key: string]: number } = {
      pending: 0,
      diagnosing: 20,
      waiting_parts: 40,
      in_progress: 70,
      completed: 100,
      cancelled: 0,
    };
    return progressMap[status] || 0;
  },

  // Get next possible statuses
  getNextStatuses: (currentStatus: string): string[] => {
    const statusFlow: { [key: string]: string[] } = {
      pending: ['diagnosing', 'cancelled'],
      diagnosing: ['waiting_parts', 'in_progress', 'cancelled'],
      waiting_parts: ['in_progress', 'cancelled'],
      in_progress: ['completed', 'cancelled'],
      completed: [],
      cancelled: [],
    };
    return statusFlow[currentStatus] || [];
  },

  // Check if status can be updated
  canUpdateStatus: (currentStatus: string, newStatus: string): boolean => {
    const nextStatuses = repairUtils.getNextStatuses(currentStatus);
    return nextStatuses.includes(newStatus);
  }
};

export default repairApi;