import type { Metadata } from "next";
import { AboutContent } from "@/components/pages";

export const metadata: Metadata = {
  title: "Chi siamo · Velior, consulenza Salesforce e AI",
  description:
    "Velior Group è una consulenza europea fondata da ingegneri: 15+ tra ingegneri e consulenti Salesforce certificati, lavoriamo a milestone, niente CRM-theatre, codice e documentazione che resta tua.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "Chi siamo · Velior Group",
    description:
      "Consulenza europea per operatori ambiziosi: Salesforce, automazione iPaaS, AI agents e software custom con il rigore di un team di prodotto.",
    url: "/about",
    type: "website",
  },
};

const BREADCRUMB_JSONLD = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://veliorgroup.com" },
    { "@type": "ListItem", position: 2, name: "Chi siamo", item: "https://veliorgroup.com/about" },
  ],
};

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger -- inline JSON-LD breadcrumb
        dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB_JSONLD) }}
      />
      <AboutContent />
    </>
  );
}
