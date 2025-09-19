import AboutHero from '@/components/about/AboutHero';
import CompanyStory from '@/components/about/CompanyStory';
import TeamSection from '@/components/about/TeamSection';
import CertificationsSection from '@/components/about/CertificationsSection';
import FacilityTour from '@/components/about/FacilityTour';
import ValuesSection from '@/components/about/ValuesSection';

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <AboutHero />
      <div id="about-content">
        <CompanyStory />
        <ValuesSection />
        <TeamSection />
        <CertificationsSection />
        <FacilityTour />
      </div>
    </main>
  );
}
