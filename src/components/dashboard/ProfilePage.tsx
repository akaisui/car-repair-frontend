'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';

// Icons
const EditIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
    />
  </svg>
);

const UserIcon = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
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

const MailIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
    />
  </svg>
);

const ShieldCheckIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
    />
  </svg>
);

const KeyIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
    />
  </svg>
);

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
};

export default function ProfilePage() {
  const { user, updateProfile } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    full_name: '',
    phone: '',
    email: '',
  });

  // Update formData when user data changes
  useEffect(() => {
    if (user) {
      setFormData({
        full_name: user.full_name || '',
        phone: user.phone || '',
        email: user.email || '',
      });
    }
  }, [user]);

  const handleSave = async () => {
    if (!user) return;

    try {
      setLoading(true);
      await updateProfile(formData);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    if (user) {
      setFormData({
        full_name: user.full_name || '',
        phone: user.phone || '',
        email: user.email || '',
      });
    }
    setIsEditing(false);
  };

  const tabs = [
    { id: 'profile', name: 'Thông tin cá nhân', icon: UserIcon },
    { id: 'security', name: 'Bảo mật', icon: ShieldCheckIcon },
  ];

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Đang tải thông tin...</p>
        </div>
      </div>
    );
  }

  // Get initials for avatar
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((word) => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="min-h-screen bg-gray-50 sm:bg-white">
      <div className="max-w-4xl mx-auto py-4 sm:py-8 px-4 sm:px-6">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Hồ sơ cá nhân</h1>
          <p className="text-gray-600">Quản lý thông tin tài khoản của bạn</p>
        </div>

        {/* Profile Header Card */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm sm:shadow-lg border border-gray-100 p-4 sm:p-8 mb-4 sm:mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
            {/* Avatar and basic info */}
            <div className="flex items-center space-x-4 sm:space-x-0 sm:block">
              <div className="relative flex-shrink-0">
                <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white text-lg sm:text-2xl font-bold border-2 sm:border-4 border-white shadow-lg">
                  {getInitials(user.full_name)}
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 sm:w-8 sm:h-8 bg-green-500 rounded-full border-2 sm:border-4 border-white flex items-center justify-center">
                  <div className="w-2 h-2 sm:w-3 sm:h-3 bg-white rounded-full"></div>
                </div>
              </div>

              {/* Mobile role badge */}
              <div className="sm:hidden">
                <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                  {user.role === 'customer'
                    ? 'Khách hàng'
                    : user.role === 'staff'
                      ? 'Nhân viên'
                      : 'Quản trị viên'}
                </div>
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-1 truncate">{user.full_name}</h2>

              {/* Contact info */}
              <div className="space-y-2 sm:space-y-0 sm:flex sm:items-center sm:space-x-4 text-gray-600 mb-3">
                <div className="flex items-center space-x-2">
                  <PhoneIcon />
                  <span className="text-sm sm:text-base">{user.phone}</span>
                </div>
                {user.email && (
                  <div className="flex items-center space-x-2">
                    <span className="hidden sm:inline">•</span>
                    <MailIcon />
                    <span className="text-sm sm:text-base truncate">{user.email}</span>
                  </div>
                )}
              </div>

              {/* Status info */}
              <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-4 text-xs sm:text-sm text-gray-500">
                <span>Thành viên từ {formatDate(user.created_at)}</span>
                <div className="flex items-center space-x-1">
                  <span className="hidden sm:inline">•</span>
                  <span
                    className={`inline-block w-2 h-2 rounded-full ${user.is_active ? 'bg-green-500' : 'bg-red-500'}`}
                  ></span>
                  <span>{user.is_active ? 'Hoạt động' : 'Không hoạt động'}</span>
                </div>
              </div>
            </div>

            {/* Desktop role badge */}
            <div className="hidden sm:block text-right">
              <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800">
                {user.role === 'customer'
                  ? 'Khách hàng'
                  : user.role === 'staff'
                    ? 'Nhân viên'
                    : 'Quản trị viên'}
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm sm:shadow-lg border border-gray-100 overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="flex px-4 sm:px-6 -mb-px overflow-x-auto hide-scrollbar">
              {tabs.map((tab) => {
                const IconComponent = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-shrink-0 py-3 sm:py-4 px-2 sm:px-1 mr-6 sm:mr-8 border-b-2 font-medium text-sm sm:text-base transition-all duration-200 flex items-center space-x-2 ${
                      activeTab === tab.id
                        ? 'border-primary-500 text-primary-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <IconComponent />
                    <span className="whitespace-nowrap">{tab.name}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="p-4 sm:p-8">
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 sm:mb-8 space-y-3 sm:space-y-0">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900">Thông tin cá nhân</h3>
                  {!isEditing ? (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="flex items-center justify-center space-x-2 px-4 py-2 bg-primary-50 text-primary-600 rounded-lg hover:bg-primary-100 transition-colors duration-200 w-full sm:w-auto"
                    >
                      <EditIcon />
                      <span>Chỉnh sửa</span>
                    </button>
                  ) : (
                    <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
                      <button
                        onClick={handleCancel}
                        className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 w-full sm:w-auto"
                      >
                        Hủy
                      </button>
                      <button
                        onClick={handleSave}
                        disabled={loading}
                        className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
                      >
                        {loading ? 'Đang lưu...' : 'Lưu'}
                      </button>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Họ và tên</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={formData.full_name}
                        onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                        placeholder="Nhập họ và tên"
                      />
                    ) : (
                      <div className="py-2.5 sm:py-3 px-3 sm:px-4 bg-gray-50 rounded-lg border border-gray-200">
                        <p className="text-gray-900 text-sm sm:text-base">{formData.full_name}</p>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Số điện thoại
                    </label>
                    {isEditing ? (
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                        placeholder="Nhập số điện thoại"
                      />
                    ) : (
                      <div className="py-2.5 sm:py-3 px-3 sm:px-4 bg-gray-50 rounded-lg border border-gray-200">
                        <p className="text-gray-900 text-sm sm:text-base">{formData.phone}</p>
                      </div>
                    )}
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    {isEditing ? (
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                        placeholder="Nhập địa chỉ email (tùy chọn)"
                      />
                    ) : (
                      <div className="py-2.5 sm:py-3 px-3 sm:px-4 bg-gray-50 rounded-lg border border-gray-200">
                        <p className="text-gray-900 text-sm sm:text-base">{formData.email || 'Chưa cập nhật'}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Account Info */}
                <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-200">
                  <h4 className="text-base sm:text-lg font-medium text-gray-900 mb-4">Thông tin tài khoản</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Vai trò</label>
                      <div className="py-2.5 sm:py-3 px-3 sm:px-4 bg-gray-50 rounded-lg border border-gray-200">
                        <p className="text-gray-900 text-sm sm:text-base">
                          {user.role === 'customer'
                            ? 'Khách hàng'
                            : user.role === 'staff'
                              ? 'Nhân viên'
                              : 'Quản trị viên'}
                        </p>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Ngày tham gia
                      </label>
                      <div className="py-2.5 sm:py-3 px-3 sm:px-4 bg-gray-50 rounded-lg border border-gray-200">
                        <p className="text-gray-900 text-sm sm:text-base">{formatDate(user.created_at)}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Security Tab */}
            {activeTab === 'security' && (
              <div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-6 sm:mb-8">Bảo mật tài khoản</h3>

                <div className="space-y-4 sm:space-y-6">
                  <div className="bg-gray-50 rounded-lg p-4 sm:p-6 border border-gray-200">
                    <h4 className="font-medium text-gray-900 mb-3 sm:mb-4 flex items-center space-x-2">
                      <KeyIcon />
                      <span className="text-sm sm:text-base">Mật khẩu</span>
                    </h4>
                    <p className="text-gray-600 mb-4 text-sm sm:text-base leading-relaxed">
                      Đổi mật khẩu định kỳ để bảo mật tài khoản của bạn
                    </p>
                    <button className="w-full sm:w-auto px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200 text-sm sm:text-base">
                      Đổi mật khẩu
                    </button>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4 sm:p-6 border border-gray-200">
                    <h4 className="font-medium text-gray-900 mb-3 sm:mb-4 flex items-center space-x-2">
                      <ShieldCheckIcon />
                      <span className="text-sm sm:text-base">Bảo mật nâng cao</span>
                    </h4>
                    <div className="space-y-3">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 sm:p-4 bg-white rounded-lg border border-gray-200 space-y-2 sm:space-y-0">
                        <div className="flex-1">
                          <p className="font-medium text-gray-900 text-sm sm:text-base">Xác thực 2 bước</p>
                          <p className="text-xs sm:text-sm text-gray-600">Tăng cường bảo mật với mã xác thực</p>
                        </div>
                        <button className="self-start sm:self-auto px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs sm:text-sm">
                          Đang bật
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="bg-red-50 rounded-lg p-4 sm:p-6 border border-red-200">
                    <h4 className="font-medium text-red-600 mb-3 sm:mb-4 text-sm sm:text-base">Vùng nguy hiểm</h4>
                    <p className="text-red-600 mb-4 text-sm sm:text-base leading-relaxed">
                      Hành động này không thể hoàn tác. Tài khoản và tất cả dữ liệu sẽ bị xóa vĩnh viễn.
                    </p>
                    <button className="w-full sm:w-auto px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 text-sm sm:text-base">
                      Xóa tài khoản
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
