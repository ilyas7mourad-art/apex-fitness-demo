import { SiteHeader } from "@/components/marketing/site-header";
import { HeroSection } from "@/components/marketing/hero-section";
import { FeaturePillars } from "@/components/marketing/feature-pillars";
import { SiteFooter } from "@/components/marketing/site-footer";

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main className="flex flex-1 flex-col">
        <HeroSection />
        <FeaturePillars />
      </main>
      <SiteFooter />
    </>
  );
}
