import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Site 100% estático: `next build` gera a pasta `out/`, que roda em qualquer
  // hospedagem estática (Vercel, Cloudflare, GitHub Pages...) sem servidor.
  output: "export",
  images: {
    // Export estático não tem otimizador de imagens; as fotos em public/images
    // já estão em WebP e no tamanho em que aparecem.
    unoptimized: true,
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
