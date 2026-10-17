import { describe, expect, it } from "vitest";
import { qrUrlProblem } from "./qr";

describe("qrUrlProblem", () => {
  it("libera domínio próprio com https", () => {
    expect(qrUrlProblem("https://gostosao.com.br/")).toBeNull();
    expect(qrUrlProblem("https://cardapio.gostosao.com.br/")).toBeNull();
  });

  it("bloqueia endereços do próprio computador ou da rede", () => {
    for (const url of [
      "http://localhost:3000/",
      "http://app.localhost/",
      "http://127.0.0.1:3000/",
      "http://0.0.0.0:3000/",
      "http://192.168.1.42:3000/",
      "http://[::1]:3000/",
    ]) {
      expect(qrUrlProblem(url), url).toMatch(/computador/);
    }
  });

  it("bloqueia subdomínio gratuito de hospedagem, inclusive com ponto no final", () => {
    for (const url of [
      "https://gostosao.vercel.app/",
      "https://gostosao.vercel.app./",
      "https://GOSTOSAO.Pages.Dev/",
      "https://gostosao.workers.dev/",
      "https://hedersonfranco.github.io/",
      "https://gostosao.netlify.app/",
    ]) {
      expect(qrUrlProblem(url), url).toMatch(/outra pessoa pode registrar/);
    }
  });

  it("não confunde domínio próprio que só contém o nome da hospedagem", () => {
    expect(qrUrlProblem("https://myvercel.app/")).toBeNull();
    expect(qrUrlProblem("https://vercel.app.gostosao.com.br/")).toBeNull();
  });

  it("bloqueia domínio próprio sem https", () => {
    expect(qrUrlProblem("http://gostosao.com.br/")).toMatch(/https/);
  });
});
