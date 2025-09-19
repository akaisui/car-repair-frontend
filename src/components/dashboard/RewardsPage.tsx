'use client';

import { useState } from 'react';

// Mock data - In real app, this would come from API
const mockUserRewards = {
  currentPoints: 2350,
  totalEarned: 5670,
  totalRedeemed: 3320,
  membershipLevel: 'Gold',
  nextLevelPoints: 3000,
  memberSince: '2023-03-10',
};

const mockPointsHistory = [
  {
    id: 1,
    date: '2024-01-20',
    type: 'earn',
    points: 280,
    description: 'Đại tu động cơ - Honda Wave RSX',
    transactionAmount: 2800000,
  },
  {
    id: 2,
    date: '2024-01-18',
    type: 'redeem',
    points: -500,
    description: 'Đổi voucher giảm giá 10%',
    voucherCode: 'SAVE10-2024',
  },
  {
    id: 3,
    date: '2024-01-15',
    type: 'earn',
    points: 32,
    description: 'Bảo dưỡng định kỳ - Honda Wave RSX',
    transactionAmount: 320000,
  },
  {
    id: 4,
    date: '2024-01-10',
    type: 'bonus',
    points: 100,
    description: 'Thưởng sinh nhật tháng 1',
  },
  {
    id: 5,
    date: '2024-01-08',
    type: 'earn',
    points: 45,
    description: 'Sửa phanh trước - Honda Wave RSX',
    transactionAmount: 450000,
  },
];

const mockAvailableRewards = [
  {
    id: 1,
    name: 'Voucher giảm giá 10%',
    description: 'Giảm 10% cho đơn hàng từ 500.000đ',
    pointsCost: 500,
    category: 'discount',
    validDays: 30,
    maxDiscount: 200000,
    minOrder: 500000,
    icon: '🎟️',
  },
  {
    id: 2,
    name: 'Voucher giảm giá 15%',
    description: 'Giảm 15% cho đơn hàng từ 1.000.000đ',
    pointsCost: 800,
    category: 'discount',
    validDays: 30,
    maxDiscount: 300000,
    minOrder: 1000000,
    icon: '🎫',
  },
  {
    id: 3,
    name: 'Miễn phí thay nhớt',
    description: 'Dịch vụ thay nhớt hoàn toàn miễn phí',
    pointsCost: 300,
    category: 'service',
    validDays: 60,
    icon: '🛢️',
  },
  {
    id: 4,
    name: 'Kiểm tra tổng quát miễn phí',
    description: 'Kiểm tra 15 hạng mục cơ bản',
    pointsCost: 200,
    category: 'service',
    validDays: 90,
    icon: '🔍',
  },
  {
    id: 5,
    name: 'Voucher sinh nhật 20%',
    description: 'Giảm 20% trong tháng sinh nhật',
    pointsCost: 1000,
    category: 'special',
    validDays: 30,
    maxDiscount: 500000,
    icon: '🎂',
  },
  {
    id: 6,
    name: 'Gói bảo dưỡng VIP',
    description: 'Bảo dưỡng cao cấp + rửa xe miễn phí',
    pointsCost: 1500,
    category: 'premium',
    validDays: 45,
    icon: '⭐',
  },
];

const mockMembershipLevels = [
  {
    name: 'Bronze',
    pointsRequired: 0,
    benefits: ['Tích điểm cơ bản', 'Ưu đãi sinh nhật'],
    color: 'from-yellow-600 to-yellow-700',
    icon: '🥉',
  },
  {
    name: 'Silver',
    pointsRequired: 1000,
    benefits: ['Tích điểm x1.2', 'Ưu đãi sinh nhật', 'Voucher tháng'],
    color: 'from-gray-400 to-gray-500',
    icon: '🥈',
  },
  {
    name: 'Gold',
    pointsRequired: 2500,
    benefits: ['Tích điểm x1.5', 'Ưu đãi sinh nhật đặc biệt', 'Voucher tháng', 'Hỗ trợ ưu tiên'],
    color: 'from-yellow-400 to-yellow-500',
    icon: '🥇',
  },
  {
    name: 'Platinum',
    pointsRequired: 5000,
    benefits: ['Tích điểm x2', 'Ưu đãi sinh nhật VIP', 'Voucher tháng', 'Hỗ trợ 24/7', 'Bảo dưỡng miễn phí'],
    color: 'from-purple-400 to-purple-500',
    icon: '💎',
  },
];

// Icons
const GiftIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
  </svg>
);

const StarIcon = () => (
  <svg className="w-5 h-5 fill-current text-yellow-400" viewBox="0 0 24 24">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

const TrendingUpIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
  </svg>
);

const ClockIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(amount);
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
};

const getPointsColor = (type: string) => {
  switch (type) {
    case 'earn':
      return 'text-green-600';
    case 'redeem':
      return 'text-red-600';
    case 'bonus':
      return 'text-blue-600';
    default:
      return 'text-gray-600';
  }
};

const getPointsIcon = (type: string) => {
  switch (type) {
    case 'earn':
      return '+';
    case 'redeem':
      return '-';
    case 'bonus':
      return '🎁';
    default:
      return '';
  }
};

const getCurrentLevel = () => {
  const currentPoints = mockUserRewards.currentPoints;
  for (let i = mockMembershipLevels.length - 1; i >= 0; i--) {
    if (currentPoints >= mockMembershipLevels[i].pointsRequired) {
      return mockMembershipLevels[i];
    }
  }
  return mockMembershipLevels[0];
};

const getNextLevel = () => {
  const currentPoints = mockUserRewards.currentPoints;
  for (let i = 0; i < mockMembershipLevels.length; i++) {
    if (currentPoints < mockMembershipLevels[i].pointsRequired) {
      return mockMembershipLevels[i];
    }
  }
  return null;
};

export default function RewardsPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showRedeemModal, setShowRedeemModal] = useState(false);
  const [selectedReward, setSelectedReward] = useState<any>(null);

  const currentLevel = getCurrentLevel();
  const nextLevel = getNextLevel();

  const filteredRewards = selectedCategory === 'all'
    ? mockAvailableRewards
    : mockAvailableRewards.filter(reward => reward.category === selectedCategory);

  const handleRedeemReward = (reward: any) => {
    setSelectedReward(reward);
    setShowRedeemModal(true);
  };

  const confirmRedeem = () => {
    // In real app, this would make API call
    console.log('Redeeming reward:', selectedReward);
    setShowRedeemModal(false);
    setSelectedReward(null);
  };

  const tabs = [
    { id: 'overview', name: 'Tổng quan' },
    { id: 'rewards', name: 'Đổi quà' },
    { id: 'history', name: 'Lịch sử điểm' },
    { id: 'membership', name: 'Hạng thành viên' },
  ];

  const rewardCategories = [
    { id: 'all', name: 'Tất cả' },
    { id: 'discount', name: 'Giảm giá' },
    { id: 'service', name: 'Dịch vụ' },
    { id: 'premium', name: 'Cao cấp' },
    { id: 'special', name: 'Đặc biệt' },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Điểm tích lũy & Ưu đãi</h1>
        <p className="text-gray-600">Tích điểm và đổi những ưu đãi hấp dẫn</p>
      </div>

      {/* Points Overview Card */}
      <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl p-8 text-white mb-8">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${currentLevel.color} flex items-center justify-center text-2xl`}>
                {currentLevel.icon}
              </div>
              <div>
                <h2 className="text-2xl font-bold">{mockUserRewards.currentPoints.toLocaleString()} điểm</h2>
                <p className="text-primary-100">Hạng {currentLevel.name}</p>
              </div>
            </div>

            {nextLevel && (
              <div className="mt-4">
                <p className="text-primary-100 text-sm mb-2">
                  Cần thêm {(nextLevel.pointsRequired - mockUserRewards.currentPoints).toLocaleString()} điểm để lên hạng {nextLevel.name}
                </p>
                <div className="w-64 bg-primary-400 rounded-full h-2">
                  <div
                    className="bg-white h-2 rounded-full transition-all duration-300"
                    style={{
                      width: `${Math.min(100, (mockUserRewards.currentPoints / nextLevel.pointsRequired) * 100)}%`
                    }}
                  ></div>
                </div>
              </div>
            )}
          </div>

          <div className="text-right">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold">{mockUserRewards.totalEarned.toLocaleString()}</div>
                <div className="text-xs text-primary-100">Tổng tích lũy</div>
              </div>
              <div>
                <div className="text-2xl font-bold">{mockUserRewards.totalRedeemed.toLocaleString()}</div>
                <div className="text-xs text-primary-100">Đã sử dụng</div>
              </div>
            </div>
          </div>
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
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                  activeTab === tab.id
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-100 text-sm mb-1">Điểm hiện tại</p>
                      <p className="text-2xl font-bold">{mockUserRewards.currentPoints.toLocaleString()}</p>
                    </div>
                    <GiftIcon />
                  </div>
                </div>

                <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-100 text-sm mb-1">Hạng thành viên</p>
                      <p className="text-xl font-bold">{currentLevel.name}</p>
                    </div>
                    <div className="text-2xl">{currentLevel.icon}</div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-purple-100 text-sm mb-1">Thành viên từ</p>
                      <p className="text-xl font-bold">{formatDate(mockUserRewards.memberSince)}</p>
                    </div>
                    <StarIcon />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Quick Rewards */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Ưu đãi nổi bật</h3>
                  <div className="space-y-4">
                    {mockAvailableRewards.slice(0, 3).map((reward) => (
                      <div key={reward.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="text-2xl">{reward.icon}</div>
                          <div>
                            <h4 className="font-medium text-gray-900">{reward.name}</h4>
                            <p className="text-sm text-gray-600">{reward.pointsCost} điểm</p>
                          </div>
                        </div>
                        <button
                          onClick={() => handleRedeemReward(reward)}
                          disabled={mockUserRewards.currentPoints < reward.pointsCost}
                          className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                            mockUserRewards.currentPoints >= reward.pointsCost
                              ? 'bg-primary-600 text-white hover:bg-primary-700'
                              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          }`}
                        >
                          Đổi
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Activity */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Hoạt động gần đây</h3>
                  <div className="space-y-3">
                    {mockPointsHistory.slice(0, 5).map((activity) => (
                      <div key={activity.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex-1">
                          <p className="font-medium text-gray-900 text-sm">{activity.description}</p>
                          <p className="text-xs text-gray-500">{formatDate(activity.date)}</p>
                        </div>
                        <div className={`font-bold ${getPointsColor(activity.type)}`}>
                          {getPointsIcon(activity.type)}{Math.abs(activity.points)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Rewards Tab */}
          {activeTab === 'rewards' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Đổi quà tặng</h3>
                <div className="flex space-x-2">
                  {rewardCategories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                        selectedCategory === category.id
                          ? 'bg-primary-100 text-primary-700'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredRewards.map((reward) => (
                  <div key={reward.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow duration-200">
                    <div className="text-center mb-4">
                      <div className="text-4xl mb-3">{reward.icon}</div>
                      <h4 className="font-semibold text-gray-900 mb-2">{reward.name}</h4>
                      <p className="text-sm text-gray-600 mb-3">{reward.description}</p>
                      <div className="text-2xl font-bold text-primary-600 mb-2">
                        {reward.pointsCost} điểm
                      </div>
                    </div>

                    <div className="space-y-2 text-sm text-gray-600 mb-4">
                      <div className="flex items-center space-x-2">
                        <ClockIcon />
                        <span>Có hiệu lực {reward.validDays} ngày</span>
                      </div>
                      {reward.minOrder && (
                        <div className="flex items-center space-x-2">
                          <span>💳</span>
                          <span>Đơn tối thiểu: {formatCurrency(reward.minOrder)}</span>
                        </div>
                      )}
                      {reward.maxDiscount && (
                        <div className="flex items-center space-x-2">
                          <span>🔄</span>
                          <span>Giảm tối đa: {formatCurrency(reward.maxDiscount)}</span>
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() => handleRedeemReward(reward)}
                      disabled={mockUserRewards.currentPoints < reward.pointsCost}
                      className={`w-full py-3 rounded-lg font-medium transition-colors duration-200 ${
                        mockUserRewards.currentPoints >= reward.pointsCost
                          ? 'bg-primary-600 text-white hover:bg-primary-700'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      {mockUserRewards.currentPoints >= reward.pointsCost ? 'Đổi ngay' : 'Không đủ điểm'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* History Tab */}
          {activeTab === 'history' && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Lịch sử điểm thưởng</h3>

              <div className="space-y-4">
                {mockPointsHistory.map((activity) => (
                  <div key={activity.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-1">
                        <h4 className="font-medium text-gray-900">{activity.description}</h4>
                        {activity.type === 'bonus' && <span className="text-xl">🎁</span>}
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span>{formatDate(activity.date)}</span>
                        {activity.transactionAmount && (
                          <span>Đơn hàng: {formatCurrency(activity.transactionAmount)}</span>
                        )}
                        {activity.voucherCode && (
                          <span>Mã: {activity.voucherCode}</span>
                        )}
                      </div>
                    </div>
                    <div className={`text-lg font-bold ${getPointsColor(activity.type)}`}>
                      {getPointsIcon(activity.type)}{Math.abs(activity.points)} điểm
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Membership Tab */}
          {activeTab === 'membership' && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Hạng thành viên</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {mockMembershipLevels.map((level, index) => (
                  <div
                    key={level.name}
                    className={`border-2 rounded-xl p-6 transition-all duration-200 ${
                      level.name === currentLevel.name
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${level.color} flex items-center justify-center text-2xl`}>
                          {level.icon}
                        </div>
                        <div>
                          <h4 className="text-xl font-bold text-gray-900">{level.name}</h4>
                          <p className="text-sm text-gray-600">
                            {level.pointsRequired === 0 ? 'Miễn phí' : `${level.pointsRequired.toLocaleString()} điểm`}
                          </p>
                        </div>
                      </div>
                      {level.name === currentLevel.name && (
                        <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
                          Hiện tại
                        </span>
                      )}
                    </div>

                    <div className="space-y-2">
                      {level.benefits.map((benefit, benefitIndex) => (
                        <div key={benefitIndex} className="flex items-center space-x-2 text-sm text-gray-700">
                          <div className="w-1.5 h-1.5 bg-primary-500 rounded-full"></div>
                          <span>{benefit}</span>
                        </div>
                      ))}
                    </div>

                    {mockUserRewards.currentPoints < level.pointsRequired && (
                      <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <p className="text-sm text-yellow-800">
                          Cần thêm {(level.pointsRequired - mockUserRewards.currentPoints).toLocaleString()} điểm
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
                <h4 className="font-semibold text-blue-900 mb-2">💡 Cách tích điểm</h4>
                <div className="space-y-2 text-sm text-blue-800">
                  <p>• Mỗi 10.000đ chi tiêu = 1 điểm</p>
                  <p>• Điểm thưởng sinh nhật: 100 điểm</p>
                  <p>• Giới thiệu bạn bè: 50 điểm/người</p>
                  <p>• Đánh giá dịch vụ: 10 điểm/lần</p>
                  <p>• Hạng thành viên cao nhận điểm gấp đôi</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Redeem Modal */}
      {showRedeemModal && selectedReward && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Xác nhận đổi quà</h2>

            <div className="text-center mb-6">
              <div className="text-4xl mb-3">{selectedReward.icon}</div>
              <h3 className="font-semibold text-gray-900 mb-2">{selectedReward.name}</h3>
              <p className="text-sm text-gray-600 mb-4">{selectedReward.description}</p>
              <div className="text-2xl font-bold text-primary-600">
                {selectedReward.pointsCost} điểm
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <div className="flex justify-between text-sm mb-2">
                <span>Điểm hiện tại:</span>
                <span className="font-medium">{mockUserRewards.currentPoints.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm mb-2">
                <span>Điểm sử dụng:</span>
                <span className="font-medium text-red-600">-{selectedReward.pointsCost.toLocaleString()}</span>
              </div>
              <div className="border-t border-gray-200 pt-2">
                <div className="flex justify-between font-bold">
                  <span>Điểm còn lại:</span>
                  <span>{(mockUserRewards.currentPoints - selectedReward.pointsCost).toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => setShowRedeemModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                Hủy
              </button>
              <button
                onClick={confirmRedeem}
                className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200"
              >
                Xác nhận đổi
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}