/** Valores em centavos (inteiros), para não sofrer com arredondamento de ponto flutuante. */
export type Cents = number;

export interface PriceVariant {
  /** Ex.: "P", "Normal" */
  label: string;
  price: Cents;
}

export interface MenuItem {
  /** Identificador único em todo o cardápio (usado como `key` e em testes). */
  id: string;
  name: string;
  /** Ingredientes ou detalhes, quando houver. */
  description?: string;
  /** Preço único. Use `variants` quando o item tiver tamanhos. */
  price?: Cents;
  variants?: PriceVariant[];
}

export interface SectionImage {
  src: string;
  alt: string;
}

interface SectionBase {
  /** Também é a âncora da seção na página (#id). */
  id: string;
  name: string;
  /** Observação curta exibida abaixo do título, ex.: "Preço por dose". */
  note?: string;
  image?: SectionImage;
}

/** Categoria com lista de itens (sanduíches, cervejas...). */
export interface ItemsSection extends SectionBase {
  kind: "items";
  items: MenuItem[];
}

/** Grupo de adicionais com preço único por opção. */
export interface ExtrasSection extends SectionBase {
  kind: "extras";
  price: Cents;
  options: string[];
}

export type MenuSection = ItemsSection | ExtrasSection;
