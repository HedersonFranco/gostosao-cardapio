import type { MenuSection } from "./types";

/** Minúsculas e sem acentos: "Filé à Milanesa" → "file a milanesa". */
export function normalize(text: string): string {
  return text
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .trim();
}

/** Remove tudo que não é letra ou número: "X-Tudo" → "xtudo". */
function compact(text: string): string {
  return normalize(text).replace(/[^\p{L}\p{N}]+/gu, "");
}

function matches(text: string, query: string): boolean {
  const haystack = normalize(text);
  const terms = normalize(query).split(/\s+/).filter(Boolean);
  if (terms.every((term) => haystack.includes(term))) return true;
  // Permite "xtudo", "eggbacon" etc. sem hífen ou espaço
  const q = compact(query);
  return q.length > 1 && compact(text).includes(q);
}

/**
 * Filtra o cardápio pela busca do cliente.
 * - Todas as palavras precisam aparecer (em qualquer ordem), sem diferenciar acentos.
 * - Procura no nome, nos ingredientes e no nome da categoria ("suco caju" encontra os sucos).
 * - Seções sem resultado somem; seções cujo nome bate aparecem inteiras.
 */
export function filterMenu(sections: MenuSection[], query: string): MenuSection[] {
  if (!normalize(query)) return sections;

  const result: MenuSection[] = [];
  for (const section of sections) {
    if (matches(section.name, query)) {
      result.push(section);
      continue;
    }

    if (section.kind === "items") {
      const items = section.items.filter((item) =>
        matches(`${item.name} ${item.description ?? ""} ${section.name}`, query),
      );
      if (items.length > 0) result.push({ ...section, items });
    } else {
      const options = section.options.filter((option) => matches(`${option} ${section.name}`, query));
      if (options.length > 0) result.push({ ...section, options });
    }
  }
  return result;
}

/** Quantidade de itens exibidos (adicionais contam como um grupo). */
export function countItems(sections: MenuSection[]): number {
  return sections.reduce(
    (total, section) => total + (section.kind === "items" ? section.items.length : section.options.length),
    0,
  );
}
