import { describe, expect, it } from "vitest";
import { menu } from "@/data/menu";
import { countItems, filterMenu, normalize } from "./search";
import type { MenuSection } from "./types";

const names = (sections: MenuSection[]) =>
  sections.flatMap((section) => (section.kind === "items" ? section.items.map((item) => item.name) : section.options));

describe("normalize", () => {
  it("remove acentos e deixa em minúsculas", () => {
    expect(normalize("  Filé à Milanesa ")).toBe("file a milanesa");
    expect(normalize("CAJUÍNA")).toBe("cajuina");
  });
});

describe("filterMenu", () => {
  it("devolve o cardápio inteiro quando a busca está vazia", () => {
    expect(filterMenu(menu, "")).toBe(menu);
    expect(filterMenu(menu, "   ")).toBe(menu);
  });

  it("encontra pelo ingrediente, ignorando acentos e maiúsculas", () => {
    const result = names(filterMenu(menu, "BACON"));
    expect(result).toContain("EggBacon");
    expect(result).toContain("X-Tudo"); // bacon só aparece nos ingredientes
    expect(result).toContain("Bacon"); // adicional
    expect(result).not.toContain("Misto");
  });

  it("exige todas as palavras, em qualquer ordem", () => {
    const result = names(filterMenu(menu, "queijo frango ovo"));
    expect(result).toContain("EggFrango");
    expect(result).not.toContain("CheeseFrango"); // não leva ovo
  });

  it("considera o nome da categoria", () => {
    const result = filterMenu(menu, "suco caju");
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("sucos");
    expect(names(result)).toEqual(["Acerola · Abacaxi · Caju · Goiaba · Manga"]);
  });

  it("mostra a categoria inteira quando a busca é o nome dela", () => {
    const [cervejas] = filterMenu(menu, "cervejas");
    expect(cervejas.kind === "items" && cervejas.items).toHaveLength(14);
  });

  it("aceita nomes sem hífen ou espaço", () => {
    expect(names(filterMenu(menu, "xtudo"))).toContain("X-Tudo");
    expect(names(filterMenu(menu, "agua de coco"))).toEqual(["Água de Coco"]);
  });

  it("filtra os adicionais pela opção", () => {
    const result = filterMenu(menu, "milho");
    expect(result).toHaveLength(1);
    expect(result[0].kind === "extras" && result[0].options).toEqual(["Milho"]);
  });

  it("devolve lista vazia quando nada combina", () => {
    expect(filterMenu(menu, "pizza")).toEqual([]);
  });

  it("não altera o cardápio original", () => {
    const before = countItems(menu);
    filterMenu(menu, "bacon");
    expect(countItems(menu)).toBe(before);
  });
});
