import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { LangProvider } from "@/lib/lang";
import { JsonLd } from "@/lib/jsonld";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { WhatsAppWidget } from "@/components/WhatsAppWidget";
import { ScrollProgress, SpotlightFx } from "@/components/fx";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-poppins",
});

const SITE_URL = "https://veliorgroup.com";
const SITE_NAME = "Velior Group";
const SITE_TITLE = "Velior Group · Salesforce Consulting Partner · Italy & Albania";
const SITE_DESCRIPTION =
  "Velior Group is a certified Salesforce Consulting Partner: we implement Sales Cloud, Service Cloud, Marketing Cloud, Data Cloud, Agentforce, MuleSoft and Tableau, develop full-stack software (Next.js, Node, Python) and iPaaS automations with n8n and Make. Headquartered in Tirana, we work with companies across Italy, Albania and Europe.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: "%s · Velior Group",
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  generator: "Next.js",
  keywords: [
    "Salesforce Consulting Partner",
    "Salesforce Albania",
    "Salesforce Italia",
    "Sales Cloud",
    "Service Cloud",
    "Marketing Cloud",
    "Data Cloud",
    "Agentforce",
    "MuleSoft",
    "Tableau",
    "Apex",
    "Lightning",
    "n8n",
    "Make automation",
    "iPaaS",
    "process automation",
    "AI agents",
    "RAG pipelines",
    "LLM integration",
    "vector search",
    "Next.js development",
    "Node.js",
    "Python",
    "FastAPI",
    "full-stack development",
    "Salesforce consulting",
    "process automation",
    "custom software development",
    "Tirana",
    "Velior Group",
  ],
  authors: [{ name: "Velior Group", url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "Technology Consulting",
  alternates: {
    canonical: SITE_URL,
    languages: {
      "en-US": SITE_URL,
      "x-default": SITE_URL,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ["en_US", "en_GB", "sq_AL", "de_CH", "fr_CH", "ar_SA"],
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: "/assets/velior-logo-dark.webp",
        width: 1200,
        height: 630,
        alt: "Velior Group · Salesforce Consulting Partner",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/assets/velior-logo.webp"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [{ url: "/favicon.ico", sizes: "any" }],
    apple: "/assets/velior-logo.webp",
  },
  formatDetection: {
    telephone: true,
    email: true,
    address: false,
  },
};

export const viewport: Viewport = {
  themeColor: "#000032",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

const ORGANIZATION_JSONLD = {
  "@context": "https://schema.org",
  "@type": ["Organization", "ProfessionalService"],
  "@id": `${SITE_URL}#organization`,
  name: SITE_NAME,
  legalName: "Velior Group sh.p.k.",
  alternateName: "Velior",
  url: SITE_URL,
  logo: `${SITE_URL}/assets/velior-logo.webp`,
  description: SITE_DESCRIPTION,
  foundingDate: "2025",
  email: "info@veliorgroup.com",
  taxID: "M51817050C",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Tirana",
    addressCountry: "AL",
  },
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: "+355696555559",
      contactType: "customer service",
      areaServed: ["AL", "CH", "GB", "US"],
      availableLanguage: ["it", "en", "sq", "de", "fr"],
    },
    {
      "@type": "ContactPoint",
      telephone: "+393203238814",
      contactType: "sales",
      areaServed: ["IT", "CH"],
      availableLanguage: ["it", "en", "fr", "de"],
    },
  ],
  areaServed: ["IT", "AL", "CH", "GB", "US"],
  sameAs: [],
  knowsAbout: [
    "Salesforce",
    "Sales Cloud",
    "Service Cloud",
    "Marketing Cloud",
    "Data Cloud",
    "Agentforce",
    "MuleSoft",
    "Tableau",
    "Apex",
    "Lightning",
    "n8n",
    "Make",
    "Process automation",
    "AI agents",
    "Retrieval-Augmented Generation",
    "Next.js",
    "Node.js",
    "Python",
    "Go",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Velior Group services",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Salesforce ecosystem", description: "Sales Cloud, Service Cloud, Marketing Cloud, Data Cloud, Agentforce, Tableau, MuleSoft." } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Full-stack engineering", description: "Custom software in Next.js, Node, Python, Go." } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "AI & agents", description: "LLM, RAG and agent systems engineered for production." } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Process automation", description: "End-to-end iPaaS workflows on n8n and Make." } },
    ],
  },
};

const WEBSITE_JSONLD = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}#website`,
  url: SITE_URL,
  name: SITE_NAME,
  description: SITE_DESCRIPTION,
  inLanguage: ["it", "en", "sq", "de", "fr", "ar"],
  publisher: { "@id": `${SITE_URL}#organization` },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={poppins.variable}>
      <head>
        <JsonLd data={ORGANIZATION_JSONLD} />
        <JsonLd data={WEBSITE_JSONLD} />
        <noscript>
          <style>{`.reveal{opacity:1 !important;transform:none !important;filter:none !important}`}</style>
        </noscript>
      </head>
      <body data-density="compact">
        <a href="#main-content" className="skip-link">Skip to main content</a>
        <ScrollProgress />
        <SpotlightFx />
        <LangProvider>
          <Nav />
          <main id="main-content">{children}</main>
          <Footer />
          <WhatsAppWidget />
        </LangProvider>
      </body>
    </html>
  );
}
