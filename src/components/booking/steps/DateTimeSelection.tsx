'use client';

import { useState, useEffect } from 'react';
import { BookingData } from '../BookingWizard';

interface DateTimeSelectionProps {
  data: BookingData;
  onDataChange: (data: Partial<BookingData>) => void;
  onValidation: (isValid: boolean) => void;
}

const timeSlots = [
  { time: '07:00', available: true, rush: false },
  { time: '07:30', available: true, rush: false },
  { time: '08:00', available: false, rush: true },
  { time: '08:30', available: true, rush: true },
  { time: '09:00', available: true, rush: true },
  { time: '09:30', available: false, rush: true },
  { time: '10:00', available: true, rush: false },
  { time: '10:30', available: true, rush: false },
  { time: '11:00', available: true, rush: false },
  { time: '11:30', available: true, rush: false },
  { time: '12:00', available: false, rush: false },
  { time: '12:30', available: false, rush: false },
  { time: '13:00', available: true, rush: false },
  { time: '13:30', available: true, rush: false },
  { time: '14:00', available: true, rush: true },
  { time: '14:30', available: true, rush: true },
  { time: '15:00', available: true, rush: true },
  { time: '15:30', available: false, rush: true },
  { time: '16:00', available: true, rush: false },
  { time: '16:30', available: true, rush: false },
  { time: '17:00', available: true, rush: false },
  { time: '17:30', available: true, rush: false },
  { time: '18:00', available: true, rush: false },
  { time: '18:30', available: false, rush: false }
];

const ClockIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const CalendarIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const ChevronLeftIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
  </svg>
);

const ChevronRightIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

const AlertIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export default function DateTimeSelection({ data, onDataChange, onValidation }: DateTimeSelectionProps) {
  const [selectedDate, setSelectedDate] = useState(data.selectedDate || '');
  const [selectedTime, setSelectedTime] = useState(data.selectedTime || '');
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [calendarDays, setCalendarDays] = useState<Array<{
    date: string;
    day: number;
    isCurrentMonth: boolean;
    isToday: boolean;
    isPast: boolean;
    isWeekend: boolean;
    available: boolean;
  }>>([]);

  // Generate calendar days
  useEffect(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // First day of the month and how many days
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    const days = [];
    const currentDate = new Date(startDate);

    // Generate 42 days (6 weeks)
    for (let i = 0; i < 42; i++) {
      const dateStr = currentDate.toISOString().split('T')[0];
      const isCurrentMonth = currentDate.getMonth() === month;
      const isToday = currentDate.getTime() === today.getTime();
      const isPast = currentDate < today;
      const isWeekend = currentDate.getDay() === 0; // Sunday is closed

      // Mock availability (closed on Sundays, random closures)
      const available = !isPast && !isWeekend && Math.random() > 0.1;

      days.push({
        date: dateStr,
        day: currentDate.getDate(),
        isCurrentMonth,
        isToday,
        isPast,
        isWeekend,
        available
      });

      currentDate.setDate(currentDate.getDate() + 1);
    }

    setCalendarDays(days);
  }, [currentMonth]);

  // Validate selection
  useEffect(() => {
    const isValid = selectedDate !== '' && selectedTime !== '';
    onValidation(isValid);

    if (isValid) {
      onDataChange({ selectedDate, selectedTime });
    }
  }, [selectedDate, selectedTime, onDataChange, onValidation]);

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    setSelectedTime(''); // Reset time when date changes
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentMonth(prev => {
      const newMonth = new Date(prev);
      if (direction === 'prev') {
        newMonth.setMonth(newMonth.getMonth() - 1);
      } else {
        newMonth.setMonth(newMonth.getMonth() + 1);
      }
      return newMonth;
    });
  };

  const getAvailableTimeSlotsForDate = (date: string) => {
    const selectedDateObj = new Date(date);
    const today = new Date();
    const isToday = selectedDateObj.toDateString() === today.toDateString();
    const currentHour = today.getHours();
    const currentMinute = today.getMinutes();

    return timeSlots.filter(slot => {
      if (!slot.available) return false;

      if (isToday) {
        const [hour, minute] = slot.time.split(':').map(Number);
        const slotTime = hour * 60 + minute;
        const currentTime = currentHour * 60 + currentMinute;
        return slotTime > currentTime + 30; // Need at least 30 minutes notice
      }

      return true;
    });
  };

  const monthNames = [
    'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6',
    'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'
  ];

  const dayNames = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];

  const availableTimeSlots = selectedDate ? getAvailableTimeSlotsForDate(selectedDate) : [];

  return (
    <div className="p-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Chọn ngày và giờ
        </h2>
        <p className="text-gray-600">
          Lựa chọn thời gian phù hợp với lịch trình của bạn
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Calendar */}
        <div>
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            {/* Calendar Header */}
            <div className="flex items-center justify-between p-4 bg-gray-50 border-b border-gray-200">
              <button
                onClick={() => navigateMonth('prev')}
                className="p-2 hover:bg-gray-200 rounded-md transition-colors duration-200"
              >
                <ChevronLeftIcon />
              </button>

              <h3 className="font-semibold text-gray-900">
                {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
              </h3>

              <button
                onClick={() => navigateMonth('next')}
                className="p-2 hover:bg-gray-200 rounded-md transition-colors duration-200"
              >
                <ChevronRightIcon />
              </button>
            </div>

            {/* Day Headers */}
            <div className="grid grid-cols-7 border-b border-gray-200">
              {dayNames.map((day) => (
                <div key={day} className="p-3 text-center text-sm font-medium text-gray-500">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Days */}
            <div className="grid grid-cols-7">
              {calendarDays.map((day, index) => (
                <button
                  key={index}
                  onClick={() => day.available && day.isCurrentMonth && handleDateSelect(day.date)}
                  disabled={!day.available || !day.isCurrentMonth || day.isPast}
                  className={`aspect-square p-2 text-sm transition-all duration-200 ${
                    !day.isCurrentMonth
                      ? 'text-gray-300 cursor-not-allowed'
                      : day.isPast || !day.available
                        ? 'text-gray-400 cursor-not-allowed'
                        : selectedDate === day.date
                          ? 'bg-primary-500 text-white'
                          : day.isToday
                            ? 'bg-primary-100 text-primary-700 hover:bg-primary-200'
                            : 'text-gray-700 hover:bg-gray-100'
                  } ${day.isWeekend && day.isCurrentMonth ? 'bg-red-50 text-red-400' : ''}`}
                >
                  <div className="flex flex-col items-center">
                    <span>{day.day}</span>
                    {day.isWeekend && day.isCurrentMonth && (
                      <span className="text-xs">Nghỉ</span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Calendar Legend */}
          <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-primary-500 rounded"></div>
              <span className="text-gray-600">Ngày được chọn</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-red-50 border border-red-200 rounded"></div>
              <span className="text-gray-600">Ngày nghỉ</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-primary-100 rounded"></div>
              <span className="text-gray-600">Hôm nay</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-gray-100 rounded"></div>
              <span className="text-gray-600">Có lịch trống</span>
            </div>
          </div>
        </div>

        {/* Time Slots */}
        <div>
          <div className="mb-4">
            <h3 className="font-semibold text-gray-900 mb-2 flex items-center space-x-2">
              <ClockIcon />
              <span>Chọn giờ</span>
            </h3>
            {selectedDate ? (
              <p className="text-sm text-gray-600">
                Ngày đã chọn: {new Date(selectedDate).toLocaleDateString('vi-VN')}
              </p>
            ) : (
              <p className="text-sm text-gray-500">
                Vui lòng chọn ngày trước
              </p>
            )}
          </div>

          {selectedDate ? (
            availableTimeSlots.length > 0 ? (
              <div>
                {/* Time Slots Grid */}
                <div className="grid grid-cols-3 gap-3 mb-6">
                  {availableTimeSlots.map((slot) => (
                    <button
                      key={slot.time}
                      onClick={() => handleTimeSelect(slot.time)}
                      className={`p-3 text-sm font-medium rounded-lg border-2 transition-all duration-200 ${
                        selectedTime === slot.time
                          ? 'border-primary-500 bg-primary-500 text-white'
                          : 'border-gray-200 text-gray-700 hover:border-primary-300 hover:bg-primary-50'
                      } ${slot.rush ? 'bg-yellow-50 border-yellow-200' : ''}`}
                    >
                      <div className="flex flex-col items-center">
                        <span>{slot.time}</span>
                        {slot.rush && (
                          <span className="text-xs text-yellow-600 mt-1">Giờ cao điểm</span>
                        )}
                      </div>
                    </button>
                  ))}
                </div>

                {/* Time Info */}
                <div className="space-y-3">
                  <div className="flex items-start space-x-2 p-3 bg-blue-50 rounded-lg">
                    <AlertIcon />
                    <div className="text-sm text-blue-700">
                      <strong>Lưu ý:</strong> Thời gian có thể thay đổi tùy thuộc vào độ phức tạp của dịch vụ.
                      Chúng tôi sẽ liên hệ xác nhận chính xác.
                    </div>
                  </div>

                  <div className="p-3 bg-gray-50 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">Thời gian làm việc:</h4>
                    <div className="text-sm text-gray-600 space-y-1">
                      <div>Thứ 2 - Thứ 7: 7:00 - 19:00</div>
                      <div>Chủ nhật: Nghỉ</div>
                    </div>
                  </div>

                  {data.estimatedDuration > 0 && (
                    <div className="p-3 bg-green-50 rounded-lg">
                      <div className="text-sm text-green-700">
                        <strong>Thời gian dự kiến:</strong> {data.estimatedDuration} phút
                      </div>
                      {selectedTime && (
                        <div className="text-sm text-green-600 mt-1">
                          Dự kiến hoàn thành: {
                            (() => {
                              const [hour, minute] = selectedTime.split(':').map(Number);
                              const endTime = new Date();
                              endTime.setHours(hour, minute + data.estimatedDuration);
                              return endTime.toLocaleTimeString('vi-VN', {
                                hour: '2-digit',
                                minute: '2-digit'
                              });
                            })()
                          }
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <CalendarIcon />
                <h4 className="font-medium text-gray-900 mt-2 mb-1">
                  Không có lịch trống
                </h4>
                <p className="text-sm text-gray-600">
                  Vui lòng chọn ngày khác hoặc liên hệ để được hỗ trợ
                </p>
                <a
                  href="tel:0901234567"
                  className="btn btn-outline btn-sm mt-4"
                >
                  Gọi tư vấn
                </a>
              </div>
            )
          ) : (
            <div className="text-center py-8 text-gray-500">
              <CalendarIcon />
              <p className="mt-2">Chọn ngày để xem giờ có sẵn</p>
            </div>
          )}

          {/* Emergency Booking */}
          <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <h4 className="font-medium text-red-900 mb-2">Cần sửa khẩn cấp?</h4>
            <p className="text-sm text-red-700 mb-3">
              Xe hỏng giữa đường hoặc cần sửa gấp? Gọi hotline 24/7
            </p>
            <a
              href="tel:0901234567"
              className="btn btn-sm bg-red-600 hover:bg-red-700 text-white"
            >
              Gọi ngay: 0901 234 567
            </a>
          </div>
        </div>
      </div>

      {/* Selected Summary */}
      {selectedDate && selectedTime && (
        <div className="mt-8 p-6 bg-primary-50 rounded-xl">
          <h4 className="font-semibold text-primary-900 mb-3">Thời gian đã chọn:</h4>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-3">
              <CalendarIcon />
              <div>
                <div className="font-medium text-primary-900">
                  {new Date(selectedDate).toLocaleDateString('vi-VN', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <ClockIcon />
              <div>
                <div className="font-medium text-primary-900">
                  {selectedTime}
                  {data.estimatedDuration > 0 && (
                    <span className="text-sm text-primary-700 ml-2">
                      (~ {data.estimatedDuration} phút)
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}