import type { Metadata } from "next";
import { ContactContent } from "@/components/pages";

export const metadata: Metadata = {
  title: "Contact · Talk to Velior Group",
  description:
    "Contact Velior Group via WhatsApp Italy (+39 320 323 8814), Albania (+355 69 655 5559) or email info@veliorgroup.com. We reply within one business day with a concrete next step.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact · Velior Group",
    description:
      "WhatsApp Italy, Albania and direct email. No commercial theatre: we reply within one business day.",
    url: "/contact",
    type: "website",
  },
};

const BREADCRUMB_JSONLD = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://veliorgroup.com" },
    { "@type": "ListItem", position: 2, name: "Contact", item: "https://veliorgroup.com/contact" },
  ],
};

const CONTACT_JSONLD = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "@id": "https://veliorgroup.com/contact#contactpage",
  name: "Contact Velior Group",
  url: "https://veliorgroup.com/contact",
  description: "Contact Velior Group for Salesforce consulting, software development and automation.",
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
