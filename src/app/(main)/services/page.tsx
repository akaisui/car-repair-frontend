import ServiceHero from '@/components/services/ServiceHero';
import ServicesPageContent from '@/components/services/ServicesPageContent';
import PricingSection from '@/components/services/PricingSection';

export default function ServicesPage() {
  return (
    <main className="min-h-screen">
      <ServiceHero />
      <ServicesPageContent />
      <PricingSection />
    </main>
  );
}
