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

export default function ServicesPage() {
  return <ServicesContent />;
}
