"use client";

import { useState } from "react";
import { AlertIcon, PrinterIcon } from "@/components/icons";
import { qrUrlProblem } from "@/lib/qr";

interface QrSheetProps {
  /** Endereço gravado no QR code. */
  url: string;
  /** Imagem do QR code (SVG), gerada no build. */
  qrSrc: string;
  handle: string;
  address: string;
}

type CardSize = "a6" | "a5";

const SIZES: Record<CardSize, { label: string; perPage: number; page: { w: string; h: string } }> = {
  a6: { label: "A6 · 4 por folha A4", perPage: 4, page: { w: "210mm", h: "297mm" } },
  a5: { label: "A5 · 2 por folha A4", perPage: 2, page: { w: "297mm", h: "210mm" } },
};

/**
 * Cartão com o QR code. Todas as medidas usam `cqw` (porcentagem da largura do cartão),
 * então o mesmo desenho serve para A6 e A5.
 */
function MenuCard({ qrSrc, handle, address, copy }: Omit<QrSheetProps, "url"> & { copy: number }) {
  return (
    <article
      aria-label="Cartão com o QR code do cardápio"
      // As cópias são iguais: leitores de tela só anunciam a primeira
      aria-hidden={copy > 0 ? true : undefined}
      className="@container relative overflow-hidden bg-white text-[#111] outline-[0.2mm] outline-neutral-300 outline-dashed"
    >
      <div className="flex h-[37.6cqw] flex-col items-center justify-center gap-[2.2cqw] bg-brand">
        <span className="font-display text-[14cqw] leading-none tracking-[0.2cqw] text-white uppercase">Gostosão</span>
        <span className="rounded-[1.4cqw] bg-[#111] py-[1.25cqw] pr-[2.5cqw] pl-[3.75cqw] text-[3.2cqw] font-extrabold tracking-[1.25cqw] text-white uppercase">
          Lanches
        </span>
      </div>

      <div className="flex flex-col items-center px-[7.2cqw] pt-[6cqw]">
        <div className="rounded-[3.6cqw] border-[0.36cqw] border-[#e6e6e6] bg-white p-[2.5cqw]">
          {/* eslint-disable-next-line @next/next/no-img-element -- QR em SVG gerado no build */}
          <img src={qrSrc} alt="QR code do cardápio" className="block size-[47cqw]" />
        </div>
        <p className="mt-[3.9cqw] text-center font-display text-[9.5cqw] leading-none tracking-[0.1cqw] uppercase">Veja o cardápio</p>
        <p className="mt-[1.4cqw] text-center text-[3.2cqw] leading-[1.4] font-semibold text-[#333]">
          Aponte a câmera do celular para o código
        </p>
      </div>

      <div className="absolute right-[7.2cqw] bottom-[6.5cqw] left-[7.2cqw] flex flex-col items-center gap-[0.5cqw] text-center text-[2.86cqw]">
        <span className="font-bold">@{handle}</span>
        <span className="font-medium text-[#444]">{address}</span>
      </div>
    </article>
  );
}

export function QrSheet({ url, qrSrc, handle, address }: QrSheetProps) {
  const [size, setSize] = useState<CardSize>("a6");
  const config = SIZES[size];
  const problem = qrUrlProblem(url);
  const copies = Array.from({ length: config.perPage }, (_, index) => index);

  return (
    // Página clara: o contorno de foco branco do site some aqui, então ele fica escuro
    <main className="min-h-dvh bg-neutral-200 pb-10 text-[#111] print:bg-white print:p-0 [&_:focus-visible]:outline-[#111]">
      {/* Tamanho do papel na impressão: A4, sem margens (os cartões já têm respiro). */}
      <style>{`@page { size: A4 ${size === "a5" ? "landscape" : "portrait"}; margin: 0; }`}</style>

      <div className="mx-auto max-w-3xl px-4 py-8 print:hidden">
        <h1 className="font-display text-4xl uppercase">QR code do cardápio</h1>
        <p className="mt-2 text-sm leading-relaxed text-neutral-700">
          O mesmo código serve para todas as mesas: imprima a folha quantas vezes precisar e recorte na linha
          tracejada.
        </p>

        <p className="mt-4 rounded-xl bg-white p-4 text-sm">
          <span className="font-bold">Endereço gravado no código:</span> <span className="break-all">{url}</span>
        </p>

        {problem && (
          <p className="mt-3 flex gap-3 rounded-xl bg-red-100 p-4 text-sm leading-relaxed text-red-900">
            <AlertIcon className="mt-0.5 size-5 shrink-0" />
            {problem}
          </p>
        )}

        <div className="mt-6 flex flex-wrap items-end gap-3">
          <fieldset className="flex flex-wrap gap-2">
            <legend className="mb-2 text-sm font-bold">Tamanho do cartão</legend>
            {(Object.keys(SIZES) as CardSize[]).map((key) => (
              <label
                key={key}
                // O rádio é invisível (sr-only), então o foco do teclado aparece no rótulo
                className={`flex h-11 cursor-pointer items-center gap-2 rounded-full border px-4 text-sm font-bold has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-[#111] ${
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
            disabled={problem !== null}
            className="flex h-11 items-center gap-2 rounded-full bg-brand px-5 text-sm font-extrabold text-white transition-colors hover:bg-brand-strong disabled:cursor-not-allowed disabled:bg-neutral-500"
          >
            <PrinterIcon className="size-5" />
            Imprimir
          </button>
        </div>
        <p className="mt-3 text-xs text-neutral-600">
          Na janela de impressão, ative “Gráficos de plano de fundo” para sair o vermelho e use escala 100%.
        </p>
      </div>

      {/* Com o botão desabilitado, um Ctrl+P ainda imprimiria os cartões: sai o aviso no lugar deles */}
      {problem && <p className="hidden p-[15mm] text-lg print:block">Não imprima: {problem}</p>}

      {/* tabIndex: permite rolar a folha pelo teclado quando ela não cabe na tela */}
      <div
        role="region"
        aria-label="Prévia da folha para impressão"
        tabIndex={0}
        className={`flex flex-col items-center overflow-x-auto px-4 [-webkit-print-color-adjust:exact] [print-color-adjust:exact] print:block print:overflow-visible print:p-0 ${
          problem ? "print:hidden" : ""
        }`}
      >
        <section
          aria-label="Folha A4"
          className="grid shrink-0 grid-cols-2 bg-white shadow-lg print:shadow-none"
          style={{
            width: config.page.w,
            height: config.page.h,
            gridTemplateRows: size === "a6" ? "repeat(2, minmax(0, 1fr))" : "minmax(0, 1fr)",
          }}
        >
          {copies.map((copy) => (
            <MenuCard key={copy} copy={copy} qrSrc={qrSrc} handle={handle} address={address} />
          ))}
        </section>
      </div>
    </main>
  );
}
