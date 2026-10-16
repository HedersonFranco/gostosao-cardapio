import type { MetadataRoute } from "next";
import { siteUrl } from "@/config/site";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    // /qrcodes não entra em `disallow`: a página tem noindex, e o buscador só lê o noindex se puder abrir a página.
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
