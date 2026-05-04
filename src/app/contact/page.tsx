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

export default function ContactPage() {
  return <ContactContent />;
}
