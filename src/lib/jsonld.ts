import type { Cents, MenuSection } from "./types";

interface RestaurantInfo {
  name: string;
  url: string;
  instagramUrl: string;
  address: { street: string; city: string; state: string; country: string };
}

interface Offer {
  "@type": "Offer";
  name?: string;
  price: string;
  priceCurrency: "BRL";
}

interface MenuItemLd {
  "@type": "MenuItem";
  name: string;
  description?: string;
  offers: Offer[];
}

interface MenuSectionLd {
  "@type": "MenuSection";
  name: string;
  hasMenuItem: MenuItemLd[];
}

const offer = (price: Cents, name?: string): Offer => ({
  "@type": "Offer",
  ...(name ? { name } : {}),
  price: (price / 100).toFixed(2),
  priceCurrency: "BRL",
});

function toSection(section: MenuSection): MenuSectionLd {
  const hasMenuItem: MenuItemLd[] =
    section.kind === "items"
      ? section.items.map((item) => ({
          "@type": "MenuItem",
          name: item.name,
          ...(item.description ? { description: item.description } : {}),
          offers: item.variants
            ? item.variants.map((variant) => offer(variant.price, variant.label))
            : [offer(item.price ?? 0)],
        }))
      : section.options.map((option) => ({
          "@type": "MenuItem",
          name: `${section.name}: ${option}`,
          offers: [offer(section.price)],
        }));

  return { "@type": "MenuSection", name: section.name, hasMenuItem };
}

/**
 * Dados estruturados (schema.org) do restaurante e do cardápio,
 * para buscadores entenderem categorias e preços.
 */
export function buildRestaurantJsonLd(info: RestaurantInfo, sections: MenuSection[]) {
  return {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: info.name,
    url: info.url,
    servesCuisine: "Lanches",
    priceRange: "R$",
    sameAs: [info.instagramUrl],
    address: {
      "@type": "PostalAddress",
      streetAddress: info.address.street,
      addressLocality: info.address.city,
      addressRegion: info.address.state,
      addressCountry: info.address.country,
    },
    hasMenu: {
      "@type": "Menu",
      name: "Cardápio",
      inLanguage: "pt-BR",
      hasMenuSection: sections.map(toSection),
    },
  };
}

/** Serializa para <script type="application/ld+json"> sem permitir fechar a tag. */
export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
