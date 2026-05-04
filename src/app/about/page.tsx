import type { Metadata } from "next";
import { AboutContent } from "@/components/pages";

export const metadata: Metadata = {
  title: "About · Velior Group",
  description: "A European consultancy for ambitious operators — Salesforce, automation, and AI.",
};

export default function AboutPage() {
  return <AboutContent />;
}
