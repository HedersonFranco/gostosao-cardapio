import { describe, expect, it } from "vitest";
import { formatTable, parseTable, tableUrl } from "./table";

describe("parseTable", () => {
  it("aceita números de 1 a 999", () => {
    expect(parseTable("7")).toBe(7);
    expect(parseTable("07")).toBe(7);
    expect(parseTable(" 12 ")).toBe(12);
    expect(parseTable("999")).toBe(999);
  });

  it("ignora valores ausentes ou inválidos", () => {
    for (const value of [null, undefined, "", "0", "abc", "1.5", "-3", "1000", "7a", "<script>"]) {
      expect(parseTable(value)).toBeNull();
    }
  });
});

describe("formatTable", () => {
  it("usa dois dígitos", () => {
    expect(formatTable(7)).toBe("07");
    expect(formatTable(12)).toBe("12");
    expect(formatTable(120)).toBe("120");
  });
});

describe("tableUrl", () => {
  it("monta a URL do QR code de cada mesa", () => {
    expect(tableUrl("https://gostosao.com.br", 7)).toBe("https://gostosao.com.br/?mesa=7");
    expect(tableUrl("https://gostosao.com.br/", 12)).toBe("https://gostosao.com.br/?mesa=12");
  });
});
