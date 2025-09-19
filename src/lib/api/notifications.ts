import apiClient from './index';

export interface Notification {
  id: number;
  user_id: number;
  type: string;
  title: string;
  message: string;
  data?: any;
  is_read: boolean;
  read_at?: string;
  created_at: string;
}

export interface NotificationResponse {
  notifications: Notification[];
  unread_count: number;
}

export const notificationApi = {
  // Get user notifications with pagination and filters
  getUserNotifications: async (params: {
    limit?: number;
    offset?: number;
    type?: string;
    is_read?: boolean;
  } = {}): Promise<{ success: boolean; data: NotificationResponse }> => {
    const queryParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        queryParams.append(key, value.toString());
      }
    });

    const response: any = await apiClient.get(`/notifications?${queryParams.toString()}`);
    return response.data;
  },

  // Get unread count
  getUnreadCount: async (): Promise<{ success: boolean; data: { unread_count: number } }> => {
    const response: any = await apiClient.get('/notifications/unread-count');
    return response.data;
  },

  // Get recent notifications (for real-time updates)
  getRecentNotifications: async (limit: number = 5): Promise<{ success: boolean; data: Notification[] }> => {
    const response: any = await apiClient.get(`/notifications/recent?limit=${limit}`);
    return response.data;
  },

  // Mark notification as read
  markAsRead: async (id: number): Promise<{ success: boolean; message: string }> => {
    const response: any = await apiClient.put(`/notifications/${id}/read`);
    return response.data;
  },

  // Mark all notifications as read
  markAllAsRead: async (): Promise<{ success: boolean; message: string }> => {
    const response: any = await apiClient.put('/notifications/mark-all-read');
    return response.data;
  },

  // Delete notification
  deleteNotification: async (id: number): Promise<{ success: boolean; message: string }> => {
    const response: any = await apiClient.delete(`/notifications/${id}`);
    return response.data;
  }
};

// Utility functions for notifications
export const notificationUtils = {
  // Get notification icon based on type
  getIcon: (type: string): string => {
    const iconMap: { [key: string]: string } = {
      appointment_confirmed: '✅',
      repair_status_update: '🔧',
      repair_completed: '🎉',
      appointment_cancelled: '❌',
      default: '🔔'
    };
    return iconMap[type] || iconMap.default;
  },

  // Get notification color based on type
  getColor: (type: string): string => {
    const colorMap: { [key: string]: string } = {
      appointment_confirmed: 'text-green-600 bg-green-50 border-green-200',
      repair_status_update: 'text-blue-600 bg-blue-50 border-blue-200',
      repair_completed: 'text-purple-600 bg-purple-50 border-purple-200',
      appointment_cancelled: 'text-red-600 bg-red-50 border-red-200',
      default: 'text-gray-600 bg-gray-50 border-gray-200'
    };
    return colorMap[type] || colorMap.default;
  },

  // Format relative time
  formatTime: (dateString: string): string => {
    // Parse date as Vietnam timezone (+7) instead of UTC
    // Database stores in Vietnam time but without timezone info
    const date = new Date(dateString.replace('Z', '+07:00'));
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) {
      return 'Vừa xong';
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `${minutes} phút trước`;
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return `${hours} giờ trước`;
    } else if (diffInSeconds < 604800) { // 7 days
      const days = Math.floor(diffInSeconds / 86400);
      return `${days} ngày trước`;
    } else {
      // For older notifications, show date
      return date.toLocaleDateString('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
    }
  },

  // Check if notification is urgent
  isUrgent: (notification: Notification): boolean => {
    return notification.data?.urgent === true || notification.type === 'repair_completed';
  },

  // Get action URL from notification data
  getActionUrl: (notification: Notification): string | null => {
    return notification.data?.action_url || null;
  }
};

export default notificationApi;