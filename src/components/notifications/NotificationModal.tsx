'use client';

import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { notificationUtils, Notification } from '@/lib/api/notifications';
import AppointmentDetails from './AppointmentDetails';

interface NotificationModalProps {
  notification: Notification | null;
  isOpen: boolean;
  onClose: () => void;
  onMarkAsRead?: (id: number) => Promise<void>;
  onDelete?: (id: number) => Promise<void>;
}

export default function NotificationModal({
  notification,
  isOpen,
  onClose,
  onMarkAsRead,
  onDelete
}: NotificationModalProps) {
  if (!notification) return null;

  const isUrgent = notificationUtils.isUrgent(notification);
  const actionUrl = notificationUtils.getActionUrl(notification);
  const icon = notificationUtils.getIcon(notification.type);

  const handleMarkAsRead = async () => {
    if (!notification.is_read && onMarkAsRead) {
      await onMarkAsRead(notification.id);
    }
  };

  const handleDelete = async () => {
    if (onDelete) {
      await onDelete(notification.id);
      onClose();
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                      <span className="text-2xl">{icon}</span>
                    </div>
                    <div>
                      <Dialog.Title
                        as="h3"
                        className="text-lg font-semibold leading-6 text-gray-900 flex items-center"
                      >
                        {notification.title.replace(/✅|🔧|🎉|❌/g, '').trim()}
                        {isUrgent && (
                          <span className="ml-2 text-xs bg-red-500 text-white px-2 py-1 rounded">
                            URGENT
                          </span>
                        )}
                      </Dialog.Title>
                      <p className="text-sm text-gray-500 mt-1">
                        {notificationUtils.formatTime(notification.created_at)}
                      </p>
                    </div>
                  </div>

                  {/* Status dot */}
                  {!notification.is_read && (
                    <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
                  )}
                </div>

                {/* Content */}
                <div className="mb-6">
                  <p className="text-gray-700 leading-relaxed">
                    {notification.message}
                  </p>
                </div>

                {/* Appointment Details */}
                {notification.data?.appointment_code && (
                  <div className="bg-gray-50 rounded-lg p-4 mb-6">
                    <h4 className="text-sm font-semibold text-gray-900 mb-3">Thông tin lịch hẹn:</h4>
                    <AppointmentDetails appointmentCode={notification.data.appointment_code} />
                  </div>
                )}

                {/* Additional Info */}
                {notification.data && (
                  <div className="bg-blue-50 rounded-lg p-4 mb-6">
                    <h4 className="text-sm font-semibold text-gray-900 mb-2">Thông tin thêm:</h4>
                    <div className="grid grid-cols-2 gap-4">
                      {notification.data.repair_code && (
                        <div>
                          <span className="text-sm text-gray-600">Mã phiếu sửa:</span>
                          <p className="text-sm font-medium text-gray-900">
                            {notification.data.repair_code}
                          </p>
                        </div>
                      )}
                      {notification.data.status_label && (
                        <div>
                          <span className="text-sm text-gray-600">Trạng thái:</span>
                          <p className="text-sm font-medium text-gray-900">
                            {notification.data.status_label}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex items-center justify-between">
                  <div className="flex space-x-2">
                    {!notification.is_read && (
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        onClick={handleMarkAsRead}
                      >
                        Đánh dấu đã đọc
                      </button>
                    )}
                  </div>

                  <div className="flex space-x-2">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-3 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                      onClick={handleDelete}
                    >
                      Xóa
                    </button>

                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                      onClick={onClose}
                    >
                      Đóng
                    </button>
                  </div>
                </div>

                {/* Notification Meta */}
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>ID: {notification.id}</span>
                    <span>Loại: {notification.type}</span>
                  </div>
                  {notification.read_at && (
                    <p className="text-xs text-gray-500 mt-1">
                      Đã đọc: {notificationUtils.formatTime(notification.read_at)}
                    </p>
                  )}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}