'use client';

import { Suspense } from 'react';
import AppointmentsPage from '@/components/dashboard/AppointmentsPage';

export default function DashboardAppointmentsPage() {
  return (
    <Suspense fallback={<div>Đang tải...</div>}>
      <AppointmentsPage />
    </Suspense>
  );
}
