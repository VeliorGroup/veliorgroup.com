import type { Metadata } from "next";
import { AboutContent } from "@/components/pages";
import { JsonLd } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "About Us · Velior, Salesforce & AI Consulting",
  description:
    "Velior Group is a European consultancy founded by engineers: 15+ certified Salesforce engineers and consultants, we work to milestones, no CRM-theatre, code and documentation that stays yours.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Us · Velior Group",
    description:
      "European consulting for ambitious operators: Salesforce, iPaaS automation, AI agents and custom software with the rigour of a product team.",
    url: "/about",
    type: "website",
  },
};

const BREADCRUMB_JSONLD = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://veliorgroup.com" },
    { "@type": "ListItem", position: 2, name: "About Us", item: "https://veliorgroup.com/about" },
  ],
};

export default function AboutPage() {
  return (
    <>
      <JsonLd data={BREADCRUMB_JSONLD} />
      <AboutContent />
    </>
  );
}
