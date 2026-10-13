import type { Metadata } from "next";
import QRCode from "qrcode";
import { site, siteUrl } from "@/config/site";
import { QrSheet } from "./QrSheet";

export const metadata: Metadata = {
  title: "QR code do cardápio",
  robots: { index: false, follow: false },
};

/** Página para imprimir o cartão com o QR code. O mesmo código serve para todas as mesas. */
export default async function QrCodePage() {
  const url = new URL(siteUrl).toString();
  const svg = await QRCode.toString(url, {
    type: "svg",
    errorCorrectionLevel: "M",
    margin: 0,
    color: { dark: "#111111", light: "#ffffff" },
  });

  return (
    <QrSheet
      url={url}
      qrSrc={`data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`}
      handle={site.instagram.handle}
      address={`${site.address.street} · ${site.address.neighborhood}`}
    />
  );
}
