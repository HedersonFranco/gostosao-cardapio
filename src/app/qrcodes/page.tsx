import type { Metadata } from "next";
import QRCode from "qrcode";
import { site, siteUrl } from "@/config/site";
import { formatTable, tableUrl } from "@/lib/table";
import { QrSheet, type TableCardData } from "./QrSheet";

export const metadata: Metadata = {
  title: "QR codes das mesas",
  robots: { index: false, follow: false },
};

/** Página para o dono imprimir os cartões de mesa. Os QR codes são gerados no build. */
export default async function QrCodesPage() {
  const tables = Array.from({ length: site.tables }, (_, index) => index + 1);

  const cards: TableCardData[] = await Promise.all(
    tables.map(async (table) => {
      const url = tableUrl(siteUrl, table);
      const svg = await QRCode.toString(url, {
        type: "svg",
        errorCorrectionLevel: "M",
        margin: 0,
        color: { dark: "#111111", light: "#ffffff" },
      });
      return {
        table,
        label: formatTable(table),
        url,
        qrSrc: `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`,
      };
    }),
  );

  return (
    <QrSheet
      cards={cards}
      siteUrl={siteUrl}
      handle={site.instagram.handle}
      street={site.address.street}
      area={`${site.address.neighborhood} · ${site.address.city}`}
    />
  );
}
