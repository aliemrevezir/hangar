import HeroSection from '@/components/landing/HeroSection';
import TrustBar from '@/components/landing/TrustBar';
import HowItWorks from '@/components/landing/HowItWorks';
import FeaturedSellers from '@/components/landing/FeaturedSellers';
import PartRequestCTA from '@/components/landing/PartRequestCTA';
import OfferComparison from '@/components/landing/OfferComparison';
import SellerBenefits from '@/components/landing/SellerBenefits';
import PricingSection from '@/components/landing/PricingSection';
import BlogPreview from '@/components/landing/BlogPreview';
import FinalCTA from '@/components/landing/FinalCTA';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustBar />
      <HowItWorks />
      <FeaturedSellers />
      <PartRequestCTA />
      <OfferComparison />
      <SellerBenefits />
      <PricingSection />
      <BlogPreview />
      <FinalCTA />
    </>
  );
}
