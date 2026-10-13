"use client";

import { useState } from "react";
import { AlertIcon, PrinterIcon } from "@/components/icons";

export interface TableCardData {
  table: number;
  label: string;
  url: string;
  qrSrc: string;
}

interface QrSheetProps {
  cards: TableCardData[];
  siteUrl: string;
  handle: string;
  street: string;
  area: string;
}

type CardSize = "a6" | "a5";

const SIZES: Record<CardSize, { label: string; perPage: number; page: { w: string; h: string } }> = {
  a6: { label: "A6 · 4 por folha A4", perPage: 4, page: { w: "210mm", h: "297mm" } },
  a5: { label: "A5 · 2 por folha A4", perPage: 2, page: { w: "297mm", h: "210mm" } },
};

function chunk<T>(list: T[], size: number): T[][] {
  const pages: T[][] = [];
  for (let i = 0; i < list.length; i += size) pages.push(list.slice(i, i + size));
  return pages;
}

function hostingNote(siteUrl: string): { tone: "error" | "info"; text: string } | null {
  const host = new URL(siteUrl).hostname;
  if (host === "localhost" || host === "127.0.0.1") {
    return {
      tone: "error",
      text: "Estes códigos apontam para o seu computador (localhost). Gere esta página pelo site publicado ou defina NEXT_PUBLIC_SITE_URL antes de imprimir.",
    };
  }
  if (host.endsWith(".vercel.app") || host.endsWith(".pages.dev") || host.endsWith(".workers.dev")) {
    return {
      tone: "info",
      text: "Este é o endereço gratuito da hospedagem. Se um dia o site mudar de hospedagem, ele muda junto e os cartões impressos param de funcionar. Com domínio próprio (ex.: .com.br) isso não acontece.",
    };
  }
  return null;
}

/**
 * Cartão de mesa. Todas as medidas usam `cqw` (porcentagem da largura do cartão),
 * então o mesmo desenho serve para A6 e A5.
 */
function TableCard({ card, handle, street, area }: { card: TableCardData } & Omit<QrSheetProps, "cards" | "siteUrl">) {
  return (
    <article
      aria-label={`Cartão da mesa ${card.label}`}
      className="@container relative overflow-hidden bg-white text-[#111] outline-[0.2mm] outline-neutral-300 outline-dashed"
    >
      <div className="flex h-[37.6cqw] flex-col items-center justify-center gap-[2.2cqw] bg-brand">
        <span className="text-[10.7cqw] leading-none font-black tracking-[-0.27cqw] text-white uppercase">Gostosão</span>
        <span className="rounded-[1.4cqw] bg-[#111] py-[1.25cqw] pr-[2.5cqw] pl-[3.75cqw] text-[3.2cqw] font-extrabold tracking-[1.25cqw] text-white uppercase">
          Lanches
        </span>
      </div>

      <div className="flex flex-col items-center px-[7.2cqw] pt-[6cqw]">
        <div className="rounded-[3.6cqw] border-[0.36cqw] border-[#e6e6e6] bg-white p-[2.5cqw]">
          {/* eslint-disable-next-line @next/next/no-img-element -- QR em SVG gerado no build */}
          <img src={card.qrSrc} alt={`QR code do cardápio, mesa ${card.label}`} className="block size-[41.5cqw]" />
        </div>
        <p className="mt-[3.9cqw] text-center text-[8.2cqw] leading-[1.05] font-black tracking-[-0.18cqw]">Veja o cardápio</p>
        <p className="mt-[1.4cqw] text-center text-[3.2cqw] leading-[1.4] font-semibold text-[#333]">
          Aponte a câmera do celular para o código
        </p>
      </div>

      <div className="absolute right-[7.2cqw] bottom-[7.2cqw] left-[7.2cqw] flex items-end justify-between gap-[4.3cqw]">
        <div className="flex flex-col gap-[0.7cqw]">
          <span className="text-[2.86cqw] font-extrabold tracking-[0.9cqw] uppercase">Mesa</span>
          <span className="text-[14.3cqw] leading-[0.9] font-black tracking-[-0.36cqw] text-brand">{card.label}</span>
        </div>
        <div className="flex flex-col items-end gap-[0.36cqw] text-right text-[2.86cqw]">
          <span className="font-bold">@{handle}</span>
          <span className="font-medium text-[#444]">{street}</span>
          <span className="font-medium text-[#444]">{area}</span>
        </div>
      </div>
    </article>
  );
}

export function QrSheet({ cards, siteUrl, handle, street, area }: QrSheetProps) {
  const [size, setSize] = useState<CardSize>("a6");
  const config = SIZES[size];
  const pages = chunk(cards, config.perPage);
  const note = hostingNote(siteUrl);

  return (
    <main className="min-h-dvh bg-neutral-200 pb-10 text-[#111] print:bg-white print:p-0">
      {/* Tamanho do papel na impressão: A4, sem margens (os cartões já têm respiro). */}
      <style>{`@page { size: A4 ${size === "a5" ? "landscape" : "portrait"}; margin: 0; }`}</style>

      <div className="mx-auto max-w-3xl px-4 py-8 print:hidden">
        <h1 className="text-3xl font-black">QR codes das mesas</h1>
        <p className="mt-2 text-sm leading-relaxed text-neutral-700">
          {cards.length} cartões, um por mesa. Cada código abre o cardápio já com o número da mesa. Para mudar a
          quantidade de mesas, altere <code className="rounded bg-white px-1">tables</code> em{" "}
          <code className="rounded bg-white px-1">src/config/site.ts</code>.
        </p>

        <p className="mt-4 rounded-xl bg-white p-4 text-sm">
          <span className="font-bold">Endereço gravado nos códigos:</span>{" "}
          <span className="break-all">{cards[0]?.url ?? siteUrl}</span>
        </p>

        {note && (
          <p
            className={`mt-3 flex gap-3 rounded-xl p-4 text-sm leading-relaxed ${
              note.tone === "error" ? "bg-red-100 text-red-900" : "bg-amber-100 text-amber-950"
            }`}
          >
            <AlertIcon className="mt-0.5 size-5 shrink-0" />
            {note.text}
          </p>
        )}

        <div className="mt-6 flex flex-wrap items-end gap-3">
          <fieldset className="flex flex-wrap gap-2">
            <legend className="mb-2 text-sm font-bold">Tamanho do cartão</legend>
            {(Object.keys(SIZES) as CardSize[]).map((key) => (
              <label
                key={key}
                className={`flex h-11 cursor-pointer items-center gap-2 rounded-full border px-4 text-sm font-bold ${
                  size === key ? "border-[#111] bg-[#111] text-white" : "border-neutral-400 bg-white"
                }`}
              >
                <input
                  type="radio"
                  name="tamanho"
                  value={key}
                  checked={size === key}
                  onChange={() => setSize(key)}
                  className="sr-only"
                />
                {SIZES[key].label}
              </label>
            ))}
          </fieldset>
          <button
            type="button"
            onClick={() => window.print()}
            className="flex h-11 items-center gap-2 rounded-full bg-brand px-5 text-sm font-extrabold text-white transition-colors hover:bg-brand-strong"
          >
            <PrinterIcon className="size-5" />
            Imprimir
          </button>
        </div>
        <p className="mt-3 text-xs text-neutral-600">
          Na janela de impressão, ative “Gráficos de plano de fundo” para sair o vermelho e use escala 100%.
        </p>
      </div>

      {/* tabIndex: permite rolar as folhas pelo teclado quando não cabem na tela */}
      <div
        role="region"
        aria-label="Prévia das folhas para impressão"
        tabIndex={0}
        className="flex flex-col items-center gap-6 overflow-x-auto px-4 [-webkit-print-color-adjust:exact] [print-color-adjust:exact] print:block print:gap-0 print:overflow-visible print:p-0"
      >
        {pages.map((pageCards, index) => (
          <section
            key={index}
            aria-label={`Folha ${index + 1}`}
            className="grid shrink-0 grid-cols-2 bg-white shadow-lg break-after-page print:shadow-none print:last:break-after-auto"
            style={{
              width: config.page.w,
              height: config.page.h,
              gridTemplateRows: size === "a6" ? "repeat(2, minmax(0, 1fr))" : "minmax(0, 1fr)",
            }}
          >
            {pageCards.map((card) => (
              <TableCard key={card.table} card={card} handle={handle} street={street} area={area} />
            ))}
          </section>
        ))}
      </div>
    </main>
  );
}
