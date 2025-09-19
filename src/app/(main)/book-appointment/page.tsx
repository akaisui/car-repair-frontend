'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import BookingForm from '@/components/booking/BookingForm';
import { serviceApi } from '@/lib/api/services';
import { Service } from '@/types';
import { useAuth } from '@/contexts/AuthContext';

function BookAppointmentPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const preSelectedServiceSlug = searchParams.get('service');

  const [services, setServices] = useState<Service[]>([]);
  const [preSelectedService, setPreSelectedService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);

  // Check authentication
  useEffect(() => {
    if (!authLoading && !user) {
      // Not logged in -> redirect to login with return URL
      const currentUrl = `/book-appointment${preSelectedServiceSlug ? `?service=${preSelectedServiceSlug}` : ''}`;
      router.push(`/login?returnUrl=${encodeURIComponent(currentUrl)}`);
    }
  }, [user, authLoading, router, preSelectedServiceSlug]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch all active services for selection
        const servicesResponse = await serviceApi.getActiveServices({ limit: 50 });
        setServices(servicesResponse.data || []);

        // If there's a pre-selected service, fetch it
        if (preSelectedServiceSlug) {
          try {
            const serviceResponse = await serviceApi.getServiceBySlug(preSelectedServiceSlug);
            setPreSelectedService(serviceResponse.data || null);
          } catch (error) {
            console.warn('Could not find pre-selected service:', preSelectedServiceSlug);
          }
        }
      } catch (error) {
        console.error('Failed to fetch booking data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [preSelectedServiceSlug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải form đặt lịch...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Đặt Lịch Sửa Xe</h1>
            <p className="text-gray-600">Chỉ mất 2 phút để đặt lịch hẹn</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <BookingForm
          services={services}
          preSelectedService={preSelectedService}
          user={user}
        />
      </div>
    </div>
  );
}

export default function BookAppointmentPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50 flex items-center justify-center">Đang tải...</div>}>
      <BookAppointmentPageContent />
    </Suspense>
  );
}
