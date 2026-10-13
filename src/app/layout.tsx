import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { site, siteUrl } from "@/config/site";
import "./globals.css";

// Montserrat (SIL OFL 1.1) servida pelo próprio site: o build não depende do Google Fonts.
const montserrat = localFont({
  src: "./fonts/montserrat-latin-wght-normal.woff2",
  weight: "100 900",
  style: "normal",
  display: "swap",
  variable: "--font-montserrat",
});

const title = `${site.name} · Cardápio`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: site.name,
    title,
    description: site.description,
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: site.description,
  },
  formatDetection: { telephone: false, address: false, email: false },
};

export const viewport: Viewport = {
  themeColor: "#0d0d0d",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={montserrat.variable}>
      <body className="min-h-dvh bg-ink font-sans text-white antialiased">{children}</body>
    </html>
  );
}
