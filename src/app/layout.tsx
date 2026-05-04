import type { Metadata, Viewport } from "next";
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

const SITE_URL = "https://veliorgroup.com";
const SITE_NAME = "Velior Group";
const SITE_TITLE = "Velior Group · Salesforce Consulting Partner · Italia & Albania";
const SITE_DESCRIPTION =
  "Velior Group è Salesforce Consulting Partner certificato: implementiamo Sales Cloud, Service Cloud, Marketing Cloud, Data Cloud, Agentforce, MuleSoft e Tableau, sviluppiamo software full-stack (Next.js, Node, Python) e automazioni iPaaS con n8n e Make. Sede a Tirana, lavoriamo con aziende in Italia, Albania e Europa.";

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
    "consulenza Salesforce",
    "automazione processi",
    "sviluppo software custom",
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
      "it-IT": SITE_URL,
      "en-US": SITE_URL,
      "en-GB": SITE_URL,
      "sq-AL": SITE_URL,
      "de-CH": SITE_URL,
      "fr-CH": SITE_URL,
      "x-default": SITE_URL,
    },
  },
  openGraph: {
    type: "website",
    locale: "it_IT",
    alternateLocale: ["en_US", "en_GB", "sq_AL", "de_CH", "fr_CH"],
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: "/assets/velior-logo.webp",
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
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
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
  "@type": "Organization",
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
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it" className={poppins.variable}>
      <head>
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger -- inline JSON-LD payload built from trusted constants
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORGANIZATION_JSONLD) }}
        />
      </head>
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
