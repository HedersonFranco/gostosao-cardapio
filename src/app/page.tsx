import { Hero } from "@/components/Hero";
import { MenuBrowser } from "@/components/MenuBrowser";
import { SiteFooter } from "@/components/SiteFooter";
import { site, siteUrl } from "@/config/site";
import { menu } from "@/data/menu";
import { buildRestaurantJsonLd, serializeJsonLd } from "@/lib/jsonld";

export default function Home() {
  const jsonLd = buildRestaurantJsonLd(
    {
      name: site.name,
      url: siteUrl,
      instagramUrl: site.instagram.url,
      address: site.address,
    },
    menu,
  );

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }} />
      <Hero />
      <MenuBrowser sections={menu} />
      <SiteFooter />
    </>
  );
}
