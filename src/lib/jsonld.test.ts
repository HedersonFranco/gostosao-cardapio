import { describe, expect, it } from "vitest";
import { menu } from "@/data/menu";
import { buildRestaurantJsonLd, serializeJsonLd } from "./jsonld";

const info = {
  name: "Gostosão Lanches",
  url: "https://gostosao.com.br",
  instagramUrl: "https://instagram.com/gostosao_lanchesthe",
  address: { street: "Av. São Raimundo, 2070", city: "Teresina", state: "PI", country: "BR" },
};

describe("buildRestaurantJsonLd", () => {
  const data = buildRestaurantJsonLd(info, menu);

  it("descreve o restaurante e todas as seções", () => {
    expect(data["@type"]).toBe("Restaurant");
    expect(data.hasMenu.hasMenuSection).toHaveLength(menu.length);
  });

  it("converte centavos em preço com ponto e moeda BRL", () => {
    const misto = data.hasMenu.hasMenuSection[0].hasMenuItem[0];
    expect(misto.name).toBe("Misto");
    expect(misto.offers).toEqual([{ "@type": "Offer", price: "8.00", priceCurrency: "BRL" }]);
  });

  it("gera uma oferta por tamanho", () => {
    const pratos = data.hasMenu.hasMenuSection.find((section) => section.name === "Pratos Quentes");
    const caldo = pratos?.hasMenuItem.find((item) => item.name === "Caldo Simples");
    expect(caldo?.offers.map((offer) => [offer.name, offer.price])).toEqual([
      ["P", "9.90"],
      ["Normal", "17.90"],
    ]);
  });
});

describe("serializeJsonLd", () => {
  it("impede fechar a tag <script>", () => {
    expect(serializeJsonLd({ name: "</script><script>alert(1)</script>" })).not.toContain("</script>");
  });
});
