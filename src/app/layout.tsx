import type { Metadata } from "next";
import "./globals.css";
import { LangProvider } from "@/lib/lang";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Velior Group · CRM, Automation & AI",
  description:
    "Salesforce Consulting Partner. CRM, automation, and AI engineered for growth — from Tirana and Tallinn.",
  metadataBase: new URL("https://veliorgroup.com"),
  openGraph: {
    title: "Velior Group · CRM, Automation & AI",
    description: "CRM, automation, and AI engineered for growth.",
    url: "https://veliorgroup.com",
    siteName: "Velior Group",
    type: "website",
  },
  icons: {
    icon: "/assets/velior-logo.webp",
  },
};

const FONTS_HREF =
  "https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href={FONTS_HREF} rel="stylesheet" />
      </head>
      <body data-density="compact">
        <LangProvider>
          <Nav />
          <main>{children}</main>
          <Footer />
        </LangProvider>
      </body>
    </html>
  );
}
