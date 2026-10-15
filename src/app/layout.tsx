import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { site, siteUrl } from "@/config/site";
import "./globals.css";

// Fontes servidas pelo próprio site (SIL OFL 1.1): o build não depende do Google Fonts.
// Anton nos títulos, Manrope no texto.
const anton = localFont({
  src: "./fonts/anton-latin-400-normal.woff2",
  weight: "400",
  style: "normal",
  display: "swap",
  variable: "--font-anton",
});

const manrope = localFont({
  src: "./fonts/manrope-latin-wght-normal.woff2",
  weight: "200 800",
  style: "normal",
  display: "swap",
  variable: "--font-manrope",
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
  themeColor: "#0b0b0b",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`${anton.variable} ${manrope.variable}`}>
      <body className="min-h-dvh bg-ink font-sans text-paper antialiased">{children}</body>
    </html>
  );
}
