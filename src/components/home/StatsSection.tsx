'use client';

import { useState, useEffect, useRef } from 'react';

const stats = [
  {
    id: 1,
    icon: '👥',
    value: 2000,
    suffix: '+',
    label: 'Khách hàng tin tưởng',
    description: 'Đã phục vụ hơn 2000 khách hàng với chất lượng tốt nhất',
  },
  {
    id: 2,
    icon: '🏆',
    value: 10,
    suffix: '+',
    label: 'Năm kinh nghiệm',
    description: 'Hơn 10 năm trong ngành sửa chữa xe máy',
  },
  {
    id: 3,
    icon: '⚡',
    value: 5000,
    suffix: '+',
    label: 'Xe đã sửa chữa',
    description: 'Đã thực hiện thành công hơn 5000 ca sửa chữa',
  },
  {
    id: 4,
    icon: '🔧',
    value: 15,
    suffix: '',
    label: 'Dịch vụ chuyên nghiệp',
    description: 'Cung cấp đa dạng các dịch vụ từ cơ bản đến nâng cao',
  },
  {
    id: 5,
    icon: '💯',
    value: 98,
    suffix: '%',
    label: 'Khách hàng hài lòng',
    description: 'Tỉ lệ khách hàng hài lòng cao với dịch vụ của chúng tôi',
  },
  {
    id: 6,
    icon: '🚀',
    value: 24,
    suffix: '/7',
    label: 'Hỗ trợ khẩn cấp',
    description: 'Sẵn sàng hỗ trợ khách hàng 24/7 trong trường hợp khẩn cấp',
  },
];

// Custom hook for counting animation
function useCountUp(end: number, duration: number = 2000, start: boolean = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);

      setCount(Math.floor(progress * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [end, duration, start]);

  return count;
}

// Individual stat card component
interface StatCardProps {
  stat: (typeof stats)[0];
  isVisible: boolean;
  delay: number;
}

function StatCard({ stat, isVisible, delay }: StatCardProps) {
  const [hasStarted, setHasStarted] = useState(false);
  const count = useCountUp(stat.value, 2000, hasStarted);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setHasStarted(true);
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [isVisible, delay]);

  return (
    <div
      className={`bg-white rounded-xl p-6 text-center shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-500 group ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {/* Icon */}
      <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center text-white text-2xl group-hover:scale-110 transition-transform duration-300">
        {stat.icon}
      </div>

      {/* Number */}
      <div className="mb-2">
        <span className="text-3xl md:text-4xl font-bold text-gray-900">
          {hasStarted ? count : 0}
        </span>
        <span className="text-2xl md:text-3xl font-bold text-primary-600">{stat.suffix}</span>
      </div>

      {/* Label */}
      <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors duration-200">
        {stat.label}
      </h3>

      {/* Description */}
      <p className="text-sm text-gray-600 leading-relaxed">{stat.description}</p>
    </div>
  );
}

export default function StatsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    // Nếu là mobile, trigger ngay lập tức sau 1s
    if (isMobile) {
      const mobileTimer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
      return () => clearTimeout(mobileTimer);
    }

    // Desktop sử dụng intersection observer
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    // Fallback timeout
    const fallbackTimer = setTimeout(() => {
      setIsVisible(true);
    }, 3000);

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
      clearTimeout(fallbackTimer);
    };
  }, [isMobile]);

  return (
    <section
      ref={sectionRef}
      className="section bg-gradient-to-br p-6 from-primary-50 via-white to-primary-50 relative overflow-hidden"
    >
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-100 rounded-full opacity-20 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary-100 rounded-full opacity-20 blur-3xl" />
      </div>

      <div className="container-7xl relative">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <span>📊</span>
            <span>Thống kê ấn tượng</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Những Con Số
            <span className="text-primary-600"> Nói Lên Tất Cả</span>
          </h2>

          <p className="text-lg text-gray-600 leading-relaxed">
            Hơn 10 năm phục vụ trong ngành sửa chữa xe máy, chúng tôi tự hào với những thành tựu đạt
            được và sự tin tưởng của khách hàng.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {stats.map((stat, index) => (
            <StatCard key={stat.id} stat={stat} isVisible={isVisible} delay={index * 100} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div
          className={`text-center transition-all duration-1000 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
          style={{ transitionDelay: '600ms' }}
        >
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="text-left">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                  Bạn sẽ là khách hàng thứ <span className="text-primary-600">2001?</span>
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Hãy trở thành một phần trong cộng đồng khách hàng tin tưởng của chúng tôi. Đặt
                  lịch hẹn ngay hôm nay để trải nghiệm dịch vụ chất lượng.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a href="/book-appointment" className="btn btn-primary">
                    Đặt lịch ngay
                  </a>
                  <a href="tel:0901234567" className="btn btn-outline">
                    Gọi tư vấn
                  </a>
                </div>
              </div>

              <div className="relative">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gradient-to-br from-primary-500 to-primary-600 text-white p-6 rounded-lg text-center">
                    <div className="text-2xl font-bold">100%</div>
                    <div className="text-sm opacity-90">Cam kết chất lượng</div>
                  </div>
                  <div className="bg-gradient-to-br from-success-500 to-success-600 text-white p-6 rounded-lg text-center">
                    <div className="text-2xl font-bold">6 tháng</div>
                    <div className="text-sm opacity-90">Bảo hành dịch vụ</div>
                  </div>
                  <div className="bg-gradient-to-br from-secondary-500 to-secondary-600 text-white p-6 rounded-lg text-center">
                    <div className="text-2xl font-bold">30 phút</div>
                    <div className="text-sm opacity-90">Thời gian trung bình</div>
                  </div>
                  <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-lg text-center">
                    <div className="text-2xl font-bold">24/7</div>
                    <div className="text-sm opacity-90">Hỗ trợ khẩn cấp</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
