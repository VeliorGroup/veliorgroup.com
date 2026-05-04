import { Hero, PartnerSection, ServicesSection } from "@/components/home";
import { ContactCTA, ProcessSection } from "@/components/shared";
import { SalesforceFlowerSection } from "@/components/SalesforceFlower";

export default function HomePage() {
  return (
    <>
      <Hero />
      <SalesforceFlowerSection />
      <PartnerSection />
      <ServicesSection />
      <ProcessSection />
      {/* <Testimonials /> hidden until real testimonials are collected */}
      <ContactCTA />
    </>
  );
}
