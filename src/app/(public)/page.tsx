import HeroSection from '@/components/landing/HeroSection';
import StatsBar from '@/components/landing/StatsBar';
import HowItLooks from '@/components/landing/HowItLooks';
import DealerDirectoryPreview from '@/components/landing/DealerDirectoryPreview';
import FeatureCards from '@/components/landing/FeatureCards';
import OperationPanelPreview from '@/components/landing/OperationPanelPreview';
import PricingSection from '@/components/landing/PricingSection';
import SeoContentSection from '@/components/landing/SeoContentSection';
import CtaBanner from '@/components/landing/CtaBanner';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsBar />
      <HowItLooks />
      <DealerDirectoryPreview />
      <FeatureCards />
      <OperationPanelPreview />
      <PricingSection />
      <SeoContentSection />
      <CtaBanner />
    </>
  );
}
