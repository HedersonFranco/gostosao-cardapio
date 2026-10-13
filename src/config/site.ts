/**
 * Dados da lanchonete e configurações do site.
 * Tudo que o dono pode querer mudar sem mexer em componentes fica aqui.
 */
export const site = {
  name: "Gostosão Lanches",
  shortName: "Gostosão",
  description:
    "Cardápio do Gostosão Lanches: sanduíches, batata frita, tira-gosto e bebidas. Av. São Raimundo, 2070 – Cristo Rei, Teresina – PI.",
  address: {
    street: "Av. São Raimundo, 2070",
    neighborhood: "Cristo Rei",
    city: "Teresina",
    state: "PI",
    country: "BR",
  },
  instagram: {
    handle: "gostosao_lanchesthe",
    url: "https://instagram.com/gostosao_lanchesthe",
  },
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Gostos%C3%A3o%20Lanches%2C%20Av.%20S%C3%A3o%20Raimundo%2C%202070%2C%20Teresina%20-%20PI",
  /** Quantidade de mesas: gera um QR code por mesa em /qrcodes. */
  tables: 20,
  /** Crédito discreto no rodapé. Deixe `url` vazio para mostrar só o nome. */
  developer: {
    name: "Hederson Lima",
    url: "",
  },
} as const;

/**
 * Endereço público do site, usado nos QR codes, no sitemap e nas tags de compartilhamento.
 *
 * Ordem de prioridade:
 * 1. NEXT_PUBLIC_SITE_URL (defina quando tiver o domínio final, ex.: https://gostosaolanches.com.br)
 * 2. VERCEL_PROJECT_PRODUCTION_URL (preenchida automaticamente pela Vercel no build)
 * 3. http://localhost:3000 (desenvolvimento)
 */
export function resolveSiteUrl(env: Record<string, string | undefined> = process.env): string {
  const explicit = env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit) return explicit.replace(/\/+$/, "");

  const vercel = env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (vercel) return `https://${vercel}`;

  return "http://localhost:3000";
}

export const siteUrl = resolveSiteUrl();
