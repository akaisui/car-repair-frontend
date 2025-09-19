import HeroSection from '@/components/home/HeroSection';
import FeaturedServices from '@/components/home/FeaturedServices';
import CustomerReviews from '@/components/home/CustomerReviews';
import ContactSection from '@/components/home/ContactSection';
import StatsSection from '@/components/home/StatsSection';
import WhyChooseUs from '@/components/home/WhyChooseUs';

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <FeaturedServices />
      <StatsSection />
      <WhyChooseUs />
      <CustomerReviews />
      <ContactSection />
    </main>
  );
}
