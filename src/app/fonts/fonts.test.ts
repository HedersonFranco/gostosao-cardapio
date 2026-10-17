import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

// O git mostra só "Bin" quando um .woff2 muda, então uma fonte trocada passaria pela revisão
// sem ninguém ver, e ela desenha todos os preços. Trocou de propósito? Atualize o hash aqui.
// Anton 2.116 e Manrope 4.504 (tabela name), nomes de arquivo no padrão do Fontsource.
const FONTS = {
  "anton-latin-400-normal.woff2": "d0fa07ff63dd60cbc0e2f58e29c802dca2a5ae0276c999f59c6111ab7bbaec3b",
  "manrope-latin-wght-normal.woff2": "a30ddcd349703aff7464c34bef3fffdff405ee50c113440d7c8693c02d210972",
};

describe("fontes", () => {
  it.each(Object.entries(FONTS))("%s continua com o mesmo conteúdo", (file, sha256) => {
    const bytes = readFileSync(new URL(file, import.meta.url));
    expect(createHash("sha256").update(bytes).digest("hex")).toBe(sha256);
  });
});
