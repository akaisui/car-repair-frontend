import { Suspense } from 'react';
import ServiceHero from '@/components/services/ServiceHero';
import ServicesPageContent from '@/components/services/ServicesPageContent';
import PricingSection from '@/components/services/PricingSection';

export default function ServicesPage() {
  return (
    <main className="min-h-screen">
      <ServiceHero />
      <Suspense fallback={<div>Đang tải...</div>}>
        <ServicesPageContent />
      </Suspense>
      <PricingSection />
    </main>
  );
}
