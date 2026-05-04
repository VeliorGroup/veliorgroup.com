import type { Metadata } from "next";
import { ContactContent } from "@/components/pages";

export const metadata: Metadata = {
  title: "Contact · Velior Group",
  description: "Tell us about your next move. Reply within one business day.",
};

export default function ContactPage() {
  return <ContactContent />;
}
