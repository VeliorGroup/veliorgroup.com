import type { Metadata } from "next";
import { ServicesContent } from "@/components/pages";

export const metadata: Metadata = {
  title: "Servizi · Salesforce, AI, automazione e full-stack",
  description:
    "Quattro pilastri Velior: ecosistema Salesforce (Sales/Service/Marketing/Data Cloud, Agentforce, Tableau, MuleSoft), sviluppo full-stack (Next.js, Node, Python, Go), AI & agenti LLM/RAG, automazione iPaaS con n8n e Make.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Servizi Velior · Salesforce, AI, automazione, full-stack",
    description:
      "Implementazione Salesforce end-to-end, software custom, agenti AI in produzione e workflow iPaaS su n8n / Make.",
    url: "/services",
    type: "website",
  },
};

const BREADCRUMB_JSONLD = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://veliorgroup.com" },
    { "@type": "ListItem", position: 2, name: "Servizi", item: "https://veliorgroup.com/services" },
  ],
};

export default function ServicesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger -- inline JSON-LD breadcrumb
        dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB_JSONLD) }}
      />
      <ServicesContent />
    </>
  );
}
