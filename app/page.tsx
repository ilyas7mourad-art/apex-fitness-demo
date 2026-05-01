import { SiteHeader } from "@/components/marketing/site-header";
import { HeroSection } from "@/components/marketing/hero-section";
import { MetricsStrip } from "@/components/marketing/metrics-strip";
import { FeaturePillars } from "@/components/marketing/feature-pillars";
import { FooterCta } from "@/components/marketing/footer-cta";
import { SiteFooter } from "@/components/marketing/site-footer";

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main className="flex flex-1 flex-col">
        <HeroSection />
        <MetricsStrip />
        <FeaturePillars />
        <FooterCta />
      </main>
      <SiteFooter />
    </>
  );
}
