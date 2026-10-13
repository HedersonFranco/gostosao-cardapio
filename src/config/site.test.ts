import { describe, expect, it } from "vitest";
import { resolveSiteUrl } from "./site";

describe("resolveSiteUrl", () => {
  it("prefere o domínio definido em NEXT_PUBLIC_SITE_URL", () => {
    expect(
      resolveSiteUrl({
        NEXT_PUBLIC_SITE_URL: "https://gostosao.com.br/",
        VERCEL_PROJECT_PRODUCTION_URL: "gostosao.vercel.app",
      }),
    ).toBe("https://gostosao.com.br");
  });

  it("usa o domínio de produção da Vercel quando não há domínio próprio", () => {
    expect(resolveSiteUrl({ VERCEL_PROJECT_PRODUCTION_URL: "gostosao.vercel.app" })).toBe(
      "https://gostosao.vercel.app",
    );
  });

  it("cai para localhost no desenvolvimento", () => {
    expect(resolveSiteUrl({})).toBe("http://localhost:3000");
    expect(resolveSiteUrl({ NEXT_PUBLIC_SITE_URL: "   " })).toBe("http://localhost:3000");
  });
});
