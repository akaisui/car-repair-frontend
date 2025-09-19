'use client';

import { useState, useEffect, useRef } from 'react';
import { useNotifications } from '@/contexts/NotificationContext';
import { notificationUtils, Notification } from '@/lib/api/notifications';
import Link from 'next/link';
import NotificationModal from '@/components/notifications/NotificationModal';

export default function NotificationDropdown() {
  const {
    notifications,
    unreadCount,
    loading,
    markAsRead,
    markAllAsRead,
    deleteNotification
  } = useNotifications();

  const [isOpen, setIsOpen] = useState(false);
  const [actionLoading, setActionLoading] = useState<number | null>(null);
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNotificationClick = async (notification: Notification) => {
    // Mark as read if it's unread
    if (!notification.is_read) {
      try {
        await markAsRead(notification.id);
      } catch (error) {
        console.error('Error marking notification as read:', error);
      }
    }

    // Open modal with notification details
    setSelectedNotification(notification);
    setIsModalOpen(true);
    setIsOpen(false); // Close dropdown
  };

  const handleMarkAllAsRead = async () => {
    if (unreadCount === 0) return;

    try {
      setActionLoading(-1);
      await markAllAsRead();
    } catch (error) {
      console.error('Error marking all as read:', error);
    } finally {
      setActionLoading(null);
    }
  };

  const handleDeleteNotification = async (e: React.MouseEvent, notificationId: number) => {
    e.stopPropagation();

    try {
      setActionLoading(notificationId);
      await deleteNotification(notificationId);
    } catch (error) {
      console.error('Error deleting notification:', error);
    } finally {
      setActionLoading(null);
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Notification Bell */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label="Thông báo"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
          />
        </svg>

        {/* Unread Badge */}
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center animate-pulse">
            {unreadCount > 99 ? '99+' : unreadCount}
          </span>
        )}

        {/* Pulse Animation for New Notifications */}
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-400 rounded-full min-w-[18px] h-[18px] animate-ping"></span>
        )}
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 max-h-96 overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-purple-50">
            <h3 className="font-semibold text-gray-900 flex items-center">
              <span className="mr-2">🔔</span>
              Thông báo
              {unreadCount > 0 && (
                <span className="ml-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                  {unreadCount}
                </span>
              )}
            </h3>
            {unreadCount > 0 && (
              <button
                onClick={handleMarkAllAsRead}
                disabled={actionLoading === -1}
                className="text-xs text-blue-600 hover:text-blue-800 disabled:opacity-50"
              >
                {actionLoading === -1 ? 'Đang xử lý...' : 'Đánh dấu tất cả'}
              </button>
            )}
          </div>

          {/* Loading State */}
          {loading && (
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              <p className="text-gray-500 mt-2">Đang tải...</p>
            </div>
          )}

          {/* Empty State */}
          {!loading && notifications.length === 0 && (
            <div className="p-8 text-center">
              <span className="text-4xl mb-4 block">🔕</span>
              <h4 className="font-medium text-gray-900 mb-1">Chưa có thông báo</h4>
              <p className="text-sm text-gray-500">Thông báo sẽ xuất hiện ở đây</p>
            </div>
          )}

          {/* Notifications List */}
          {!loading && notifications.length > 0 && (
            <div className="max-h-80 overflow-y-auto">
              {notifications.slice(0, 10).map((notification) => {
                const actionUrl = notificationUtils.getActionUrl(notification);
                const isUrgent = notificationUtils.isUrgent(notification);

                const NotificationContent = (
                  <div
                    className={`
                      p-4 hover:bg-gray-50 transition-colors duration-200 cursor-pointer border-l-4 relative
                      ${!notification.is_read
                        ? 'bg-blue-50 border-l-blue-500'
                        : 'bg-white border-l-transparent'
                      }
                      ${isUrgent ? 'bg-gradient-to-r from-purple-50 to-pink-50 border-l-purple-500' : ''}
                      ${actionLoading === notification.id ? 'opacity-50 pointer-events-none' : ''}
                    `}
                    onClick={() => handleNotificationClick(notification)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center mb-1">
                          <span className="text-lg mr-2">
                            {notificationUtils.getIcon(notification.type)}
                          </span>
                          <h4 className="text-sm font-semibold text-gray-900 truncate">
                            {notification.title}
                          </h4>
                          {isUrgent && (
                            <span className="ml-2 text-xs bg-red-500 text-white px-1 py-0.5 rounded">
                              URGENT
                            </span>
                          )}
                        </div>

                        <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                          {notification.message}
                        </p>

                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-400">
                            {notificationUtils.formatTime(notification.created_at)}
                          </span>

                          {!notification.is_read && (
                            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                          )}
                        </div>
                      </div>

                      {/* Delete Button */}
                      <button
                        onClick={(e) => handleDeleteNotification(e, notification.id)}
                        disabled={actionLoading === notification.id}
                        className="ml-2 p-1 text-gray-400 hover:text-red-600 transition-colors duration-200 opacity-0 group-hover:opacity-100"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>

                    {actionLoading === notification.id && (
                      <div className="absolute inset-0 flex items-center justify-center bg-white/50">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                      </div>
                    )}
                  </div>
                );

                return (
                  <div key={notification.id} className="group">
                    {NotificationContent}
                  </div>
                );
              })}
            </div>
          )}

          {/* Footer */}
          {notifications.length > 0 && (
            <div className="p-3 border-t border-gray-100 bg-gray-50">
              <Link
                href="/dashboard/notifications"
                className="text-sm text-blue-600 hover:text-blue-800 font-medium block text-center"
                onClick={() => setIsOpen(false)}
              >
                Xem tất cả thông báo
              </Link>
            </div>
          )}
        </div>
      )}

      {/* Notification Modal */}
      <NotificationModal
        notification={selectedNotification}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedNotification(null);
        }}
        onMarkAsRead={markAsRead}
        onDelete={deleteNotification}
      />
    </div>
  );
}