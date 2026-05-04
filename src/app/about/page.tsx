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

export default function AboutPage() {
  return <AboutContent />;
}
