/**
 * Dados da lanchonete e configurações do site.
 * Tudo que o dono pode querer mudar sem mexer em componentes fica aqui.
 */

/**
 * O @ sai impresso nos cartões das mesas. Se trocar ou apagar a conta, reimprima os cartões antes:
 * o @ antigo fica livre e outra pessoa pode registrá-lo.
 */
const instagramHandle = "gostosao_lanchesthe";

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
    handle: instagramHandle,
    url: `https://instagram.com/${instagramHandle}`,
  },
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Gostos%C3%A3o%20Lanches%2C%20Av.%20S%C3%A3o%20Raimundo%2C%202070%2C%20Teresina%20-%20PI",
  /** Crédito discreto no rodapé. Deixe `url` vazio para mostrar só o nome. */
  developer: {
    name: "Hederson Franco",
    url: "",
  },
} as const;

/**
 * Endereço público do site, usado nos QR codes, no sitemap e nas tags de compartilhamento.
 *
 * Ordem de prioridade:
 * 1. NEXT_PUBLIC_SITE_URL (o domínio da lanchonete; obrigatório para imprimir os QR codes)
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
