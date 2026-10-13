import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { menu } from "./menu";

const items = menu.flatMap((section) => (section.kind === "items" ? section.items : []));

describe("dados do cardápio", () => {
  it("tem ids únicos nas seções e nos itens", () => {
    const sectionIds = menu.map((section) => section.id);
    const itemIds = items.map((item) => item.id);
    expect(new Set(sectionIds).size).toBe(sectionIds.length);
    expect(new Set(itemIds).size).toBe(itemIds.length);
  });

  it("usa ids que funcionam como âncora (#id)", () => {
    for (const id of [...menu.map((s) => s.id), ...items.map((i) => i.id)]) {
      expect(id).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
    }
  });

  it("tem preço válido em centavos para todo item", () => {
    for (const item of items) {
      const prices = item.variants ? item.variants.map((variant) => variant.price) : [item.price];
      expect(prices.length, item.name).toBeGreaterThan(0);
      for (const price of prices) {
        expect(Number.isInteger(price), item.name).toBe(true);
        expect(price, item.name).toBeGreaterThan(0);
      }
      // preço único OU tamanhos, nunca os dois
      expect(item.price !== undefined && item.variants !== undefined, item.name).toBe(false);
    }
  });

  it("não tem seção vazia", () => {
    for (const section of menu) {
      const size = section.kind === "items" ? section.items.length : section.options.length;
      expect(size, section.name).toBeGreaterThan(0);
    }
  });

  it("aponta para imagens que existem em /public", () => {
    for (const section of menu) {
      if (!section.image) continue;
      expect(existsSync(join(process.cwd(), "public", section.image.src)), section.image.src).toBe(true);
    }
  });

  it("confere com o cardápio impresso", () => {
    const sanduiches = menu.find((section) => section.id === "sanduiches");
    expect(sanduiches?.kind === "items" && sanduiches.items).toHaveLength(24);
    // 88 linhas no impresso; os 4 caldos (P e normal) viraram 2 itens com tamanhos
    expect(items).toHaveLength(86);
    expect(items.find((item) => item.id === "gostosao")?.price).toBe(3600);
  });
});
