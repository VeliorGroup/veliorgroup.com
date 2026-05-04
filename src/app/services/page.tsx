import type { Metadata } from "next";
import { ServicesContent } from "@/components/pages";

export const metadata: Metadata = {
  description: "Four pillars: Salesforce ecosystem, full-stack engineering, AI & agents, process automation.",
};

export default function ServicesPage() {
  return <ServicesContent />;
}
