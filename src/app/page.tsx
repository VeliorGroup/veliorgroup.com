import { Hero, PartnerSection, ServicesSection, TechStack, Testimonials } from "@/components/home";
import { ContactCTA, ProcessSection } from "@/components/shared";

export default function HomePage() {
  return (
    <>
      <Hero />
      <PartnerSection />
      <ServicesSection />
      <TechStack />
      <ProcessSection />
      <Testimonials />
      <ContactCTA />
    </>
  );
}
