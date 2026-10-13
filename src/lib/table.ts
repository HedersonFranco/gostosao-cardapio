/** Maior número de mesa aceito na URL (?mesa=...). */
export const MAX_TABLE = 999;

/**
 * Lê o número da mesa vindo do QR code (?mesa=7).
 * Retorna `null` para valores ausentes ou inválidos, para nunca exibir lixo na tela.
 */
export function parseTable(value: string | null | undefined): number | null {
  if (value == null) return null;
  const trimmed = value.trim();
  if (!/^\d{1,3}$/.test(trimmed)) return null;
  const table = Number.parseInt(trimmed, 10);
  return table >= 1 && table <= MAX_TABLE ? table : null;
}

/** 7 → "07" */
export function formatTable(table: number): string {
  return String(table).padStart(2, "0");
}

/** URL que vai no QR code de cada mesa: https://site/?mesa=7 */
export function tableUrl(siteUrl: string, table: number): string {
  const url = new URL(siteUrl);
  url.searchParams.set("mesa", String(table));
  return url.toString();
}
