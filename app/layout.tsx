import type { Metadata, Viewport } from "next";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Mohamed Shakeel, GenAI & LLM Engineer",
  description:
    "Portfolio of Mohamed Shakeel. GenAI engineer building LLM systems that ship: RAG pipelines, model serving, FastAPI backends, and full-stack AI products. Open to full-time roles, remote or relocation.",
  keywords: [
    "GenAI Engineer",
    "LLM Engineer",
    "AI Engineer",
    "Machine Learning Engineer",
    "FastAPI",
    "RAG",
    "Mohamed Shakeel",
  ],
  authors: [{ name: "Mohamed Shakeel" }],
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Mohamed Shakeel",
    title: "Mohamed Shakeel, GenAI & LLM Engineer",
    description:
      "GenAI engineer building LLM systems that ship: RAG pipelines, model serving, and full-stack AI products.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohamed Shakeel, GenAI & LLM Engineer",
    description:
      "GenAI engineer building LLM systems that ship: RAG pipelines, model serving, and full-stack AI products.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#f4f4f2",
  width: "device-width",
  initialScale: 1,
};

/* Theme bootstrapping before first paint: stored choice wins, otherwise
   the clock decides (light 07:00-18:59, dark otherwise). Light is primary. */
const themeInit = `
(function(){
  try {
    var t = localStorage.getItem("theme");
    if (t !== "light" && t !== "dark") {
      var h = new Date().getHours();
      t = (h >= 7 && h < 19) ? "light" : "dark";
    }
    document.documentElement.dataset.theme = t;
  } catch (e) {
    document.documentElement.dataset.theme = "light";
  }
})();
`;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Mohamed Shakeel",
  jobTitle: "GenAI Engineer",
  email: "mailto:ahamedshakeel2005@gmail.com",
  telephone: "+91 9080065048",
  url: SITE_URL,
  sameAs: [
    "https://linkedin.com/in/mohamed-shakeel-720b2a29b",
    "https://github.com/shakeelscribes",
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Tirunelveli",
    addressCountry: "IN",
  },
  alumniOf: "Nellai College of Engineering",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-theme="light" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
