import { Hero, PartnerSection, ServicesSection, TechStack } from "@/components/home";
import { ContactCTA, ProcessSection } from "@/components/shared";

export default function HomePage() {
  return (
    <>
      <Hero />
      <PartnerSection />
      <ServicesSection />
      <TechStack />
      <ProcessSection />
      {/* <Testimonials /> hidden until real testimonials are collected */}
      <ContactCTA />
    </>
  );
}
