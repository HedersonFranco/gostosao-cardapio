import type { Cents } from "./types";

const decimal = new Intl.NumberFormat("pt-BR", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

/** 1425 → "14,25" (como no cardápio impresso) */
export function formatPrice(cents: Cents): string {
  return decimal.format(cents / 100);
}

/** 1425 → "R$ 14,25" */
export function formatBRL(cents: Cents): string {
  return `R$ ${formatPrice(cents)}`;
}

/** plural(1, "opção", "opções") → "1 opção" */
export function plural(count: number, singular: string, pluralForm: string): string {
  return `${count} ${count === 1 ? singular : pluralForm}`;
}
