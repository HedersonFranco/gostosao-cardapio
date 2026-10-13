import { describe, expect, it } from "vitest";
import { formatBRL, formatPrice, plural } from "./format";

describe("formatPrice", () => {
  it("formata centavos no padrão brasileiro", () => {
    expect(formatPrice(800)).toBe("8,00");
    expect(formatPrice(1425)).toBe("14,25");
    expect(formatPrice(6590)).toBe("65,90");
  });

  it("usa separador de milhar", () => {
    expect(formatPrice(123456)).toBe("1.234,56");
  });
});

describe("formatBRL", () => {
  it("prefixa com R$", () => {
    expect(formatBRL(3600)).toBe("R$ 36,00");
  });
});

describe("plural", () => {
  it("escolhe singular ou plural", () => {
    expect(plural(1, "opção", "opções")).toBe("1 opção");
    expect(plural(24, "opção", "opções")).toBe("24 opções");
  });
});
