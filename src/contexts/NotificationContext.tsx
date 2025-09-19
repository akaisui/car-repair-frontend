'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useAuth } from './AuthContext';
import { useSocket } from './SocketContext';
import { notificationApi, Notification } from '@/lib/api/notifications';

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  loading: boolean;
  error: string | null;
  fetchNotifications: () => Promise<void>;
  markAsRead: (id: number) => Promise<void>;
  markAllAsRead: () => Promise<void>;
  deleteNotification: (id: number) => Promise<void>;
  addNotification: (notification: Notification) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};

interface NotificationProviderProps {
  children: React.ReactNode;
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  const { socket, isConnected } = useSocket();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch notifications
  const fetchNotifications = useCallback(async () => {
    if (!user) return; // Only check user since isAuthenticated might be undefined

    try {
      setLoading(true);
      setError(null);

      const response = await notificationApi.getUserNotifications({ limit: 20 });

      if (response && response.notifications) {
        setNotifications(response.notifications);
        setUnreadCount(response.unread_count || 0);
      } else {
        throw new Error('Failed to fetch notifications');
      }

    } catch (err: any) {
      console.error('Error fetching notifications:', err);
      setError(err.message || 'Failed to fetch notifications');
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated, user]);

  // Fetch unread count only
  const fetchUnreadCount = useCallback(async () => {
    if (!user) return; // Only check user since isAuthenticated might be undefined

    try {
      const response = await notificationApi.getUnreadCount();
      if (response.success) {
        setUnreadCount(response.data.unread_count);
      }
    } catch (err: any) {
      console.error('Error fetching unread count:', err);
    }
  }, [isAuthenticated, user]);

  // Mark notification as read
  const markAsRead = async (id: number) => {
    try {
      const response = await notificationApi.markAsRead(id);

      console.log('Mark as read response:', response);

      if (response && response.success) {
        setNotifications(prev =>
          prev.map(notification =>
            notification.id === id
              ? { ...notification, is_read: true, read_at: new Date().toISOString() }
              : notification
          )
        );
        setUnreadCount(prev => Math.max(0, prev - 1));
      } else {
        console.error('Mark as read failed:', response);
      }
    } catch (err: any) {
      console.error('Error marking notification as read:', err);

      // Check if it's a network error
      if (!err.response) {
        console.error('Network error - backend may be down');
        throw new Error('Không thể kết nối tới server');
      }

      throw err;
    }
  };

  // Mark all notifications as read
  const markAllAsRead = async () => {
    try {
      const response = await notificationApi.markAllAsRead();

      if (response.success) {
        setNotifications(prev =>
          prev.map(notification => ({
            ...notification,
            is_read: true,
            read_at: new Date().toISOString()
          }))
        );
        setUnreadCount(0);
      }
    } catch (err: any) {
      console.error('Error marking all notifications as read:', err);
      throw err;
    }
  };

  // Delete notification
  const deleteNotification = async (id: number) => {
    try {
      const response = await notificationApi.deleteNotification(id);

      if (response.success) {
        const notificationToDelete = notifications.find(n => n.id === id);
        setNotifications(prev => prev.filter(notification => notification.id !== id));

        if (notificationToDelete && !notificationToDelete.is_read) {
          setUnreadCount(prev => Math.max(0, prev - 1));
        }
      }
    } catch (err: any) {
      console.error('Error deleting notification:', err);
      throw err;
    }
  };

  // Add new notification (for real-time)
  const addNotification = (notification: Notification) => {
    setNotifications(prev => [notification, ...prev]);
    if (!notification.is_read) {
      setUnreadCount(prev => prev + 1);
    }
  };

  // Fetch notifications on mount and when user changes
  useEffect(() => {
    if (user) {
      fetchNotifications();
    } else {
      // Reset state when user logs out
      setNotifications([]);
      setUnreadCount(0);
      setError(null);
    }
  }, [isAuthenticated, user, fetchNotifications]);

  // Socket.IO realtime notifications
  useEffect(() => {
    if (!socket || !isConnected) return;

    // Listen for new notifications
    socket.on('new_notification', (notificationData) => {
      console.log('🔔 Received realtime notification');

      // Create a notification object from the realtime data
      const newNotification: Notification = {
        id: Date.now(), // Temporary ID, will be replaced when fetching from server
        user_id: user?.id || 0,
        type: notificationData.type,
        title: notificationData.title,
        message: notificationData.message,
        data: notificationData.data,
        is_read: false,
        read_at: null,
        created_at: new Date().toISOString()
      };

      // Add to notifications list and increment unread count
      setNotifications(prev => [newNotification, ...prev]);
      setUnreadCount(prev => prev + 1);

      // Skip sync to prevent duplicate since we're skipping API
    });

    return () => {
      socket.off('new_notification');
    };
  }, [socket, isConnected, user, fetchNotifications]);

  // Backup polling (reduced frequency since we have realtime)
  useEffect(() => {
    if (!user) return; // Only check user since isAuthenticated might be undefined

    // Only poll if Socket.IO is not connected
    if (!isConnected) {
      const interval = setInterval(() => {
        fetchNotifications();
      }, 30000); // 30 seconds backup polling

      return () => clearInterval(interval);
    }
  }, [isAuthenticated, user, isConnected, fetchNotifications]);

  // DISABLED: Poll for recent notifications every 60 seconds (using Socket.IO instead)
  useEffect(() => {
    if (!user) return; // Only check user since isAuthenticated might be undefined

    // DISABLED: Using Socket.IO realtime instead of polling
    return;

    const interval = setInterval(async () => {
      try {
        const response = await notificationApi.getRecentNotifications(5);
        if (response.success && response.data.length > 0) {
          const latestNotification = response.data[0];

          // Check if we have a newer notification
          if (notifications.length === 0 ||
              new Date(latestNotification.created_at) > new Date(notifications[0].created_at)) {

            // Add only truly new notifications
            const newNotifications = response.data.filter(newNotif =>
              !notifications.some(existingNotif => existingNotif.id === newNotif.id)
            );

            if (newNotifications.length > 0) {
              setNotifications(prev => [...newNotifications, ...prev].slice(0, 50)); // Keep only latest 50

              const newUnreadCount = newNotifications.filter(n => !n.is_read).length;
              setUnreadCount(prev => prev + newUnreadCount);
            }
          }
        }
      } catch (err: any) {
        console.error('Error polling for new notifications:', err);
      }
    }, 60000); // 60 seconds

    return () => clearInterval(interval);
  }, [isAuthenticated, user, notifications]);

  const contextValue: NotificationContextType = {
    notifications,
    unreadCount,
    loading,
    error,
    fetchNotifications,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    addNotification
  };

  return (
    <NotificationContext.Provider value={contextValue}>
      {children}
    </NotificationContext.Provider>
  );
};