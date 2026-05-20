import type { Metadata } from "next";
import { ContactContent } from "@/components/pages";

export const metadata: Metadata = {
  title: "Contatti · Parla con Velior Group",
  description:
    "Contatta Velior Group via WhatsApp Italia (+39 320 323 8814), Albania (+355 69 655 5559) o email info@veliorgroup.com. Rispondiamo entro un giorno lavorativo con un passo concreto.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contatti · Velior Group",
    description:
      "WhatsApp Italia, Albania ed email diretta. Niente teatro commerciale: rispondiamo entro un giorno lavorativo.",
    url: "/contact",
    type: "website",
  },
};

const BREADCRUMB_JSONLD = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://veliorgroup.com" },
    { "@type": "ListItem", position: 2, name: "Contatti", item: "https://veliorgroup.com/contact" },
  ],
};

const CONTACT_JSONLD = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "@id": "https://veliorgroup.com/contact#contactpage",
  name: "Contatta Velior Group",
  url: "https://veliorgroup.com/contact",
  description: "Contatta Velior Group per consulenza Salesforce, sviluppo software e automazione.",
};

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger -- inline JSON-LD breadcrumb
        dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB_JSONLD) }}
      />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger -- inline JSON-LD contact page
        dangerouslySetInnerHTML={{ __html: JSON.stringify(CONTACT_JSONLD) }}
      />
      <ContactContent />
    </>
  );
}
