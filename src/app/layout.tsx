import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { LangProvider } from "@/lib/lang";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { WhatsAppWidget } from "@/components/WhatsAppWidget";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: { default: "Velior Group", template: "Velior Group" },
  description:
    "Salesforce Consulting Partner. CRM, automation, and AI engineered for growth — from Tirana, Albania.",
  metadataBase: new URL("https://veliorgroup.com"),
  openGraph: {
    title: "Velior Group",
    description: "CRM, automation, and AI engineered for growth.",
    url: "https://veliorgroup.com",
    siteName: "Velior Group",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={poppins.variable}>
      <body data-density="compact">
        <LangProvider>
          <Nav />
          <main>{children}</main>
          <Footer />
          <WhatsAppWidget />
        </LangProvider>
      </body>
    </html>
  );
}
