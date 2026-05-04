import { Hero, PartnerSection, ServicesSection } from "@/components/home";
import { ContactCTA, ProcessSection } from "@/components/shared";

export default function HomePage() {
  return (
    <>
      <Hero />
      <PartnerSection />
      <ServicesSection />
      <ProcessSection />
      {/* <Testimonials /> hidden until real testimonials are collected */}
      <ContactCTA />
    </>
  );
}
