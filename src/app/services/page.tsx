import type { Metadata } from "next";
import { ServicesContent } from "@/components/pages";

export const metadata: Metadata = {
  title: "Services · Velior Group",
  description: "Four pillars: Salesforce ecosystem, full-stack engineering, AI & agents, process automation.",
};

export default function ServicesPage() {
  return <ServicesContent />;
}
