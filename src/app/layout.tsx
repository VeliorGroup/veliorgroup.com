import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { LangProvider } from "@/lib/lang";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Velior Group · CRM, Automation & AI",
  description:
    "Salesforce Consulting Partner. CRM, automation, and AI engineered for growth — from Tirana, Albania.",
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={poppins.variable}>
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
