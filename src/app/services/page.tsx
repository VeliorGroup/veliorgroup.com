import type { Metadata } from "next";
import { ServicesContent } from "@/components/pages";
import { JsonLd } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "Services · Salesforce, AI, Automation & Full-Stack",
  description:
    "Four Velior pillars: Salesforce ecosystem (Sales/Service/Marketing/Data Cloud, Agentforce, Tableau, MuleSoft), full-stack development (Next.js, Node, Python, Go), AI & LLM/RAG agents, iPaaS automation with n8n and Make.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Velior Services · Salesforce, AI, Automation, Full-Stack",
    description:
      "End-to-end Salesforce implementation, custom software, production AI agents and iPaaS workflows on n8n / Make.",
    url: "/services",
    type: "website",
  },
};

const BREADCRUMB_JSONLD = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://veliorgroup.com" },
    { "@type": "ListItem", position: 2, name: "Services", item: "https://veliorgroup.com/services" },
  ],
};

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={BREADCRUMB_JSONLD} />
      <ServicesContent />
    </>
  );
}
