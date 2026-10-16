import Image from "next/image";
import { plural } from "@/lib/format";
import type { MenuSection } from "@/lib/types";

/** Carrossel de atalhos com foto para as categorias que têm imagem. */
export function CategoryTiles({ sections }: { sections: MenuSection[] }) {
  const tiles = sections.filter((section) => section.image);

  return (
    <section aria-labelledby="categorias-titulo" className="mx-auto w-full max-w-6xl pt-7 lg:pt-4">
      <h2 id="categorias-titulo" className="mb-3.5 px-5 font-display text-[26px] tracking-[0.5px] uppercase md:px-8 lg:mb-5 lg:px-10 lg:text-4xl">
        Categorias
      </h2>
      {/* py-1 -my-1: espaço para o contorno de foco, que a rolagem horizontal cortaria em cima e embaixo */}
      <ul className="no-scrollbar -my-1 flex snap-x snap-mandatory scroll-px-5 gap-3 overflow-x-auto px-5 py-1 md:px-8 lg:grid lg:grid-cols-6 lg:gap-4 lg:overflow-visible lg:px-10">
        {tiles.map((section) => {
          const count = section.kind === "items" ? section.items.length : section.options.length;
          return (
            <li key={section.id} className="shrink-0 snap-start lg:shrink">
              <a
                href={`#${section.id}`}
                className="group relative block h-[172px] w-[136px] overflow-hidden rounded-[18px] bg-surface lg:aspect-[4/5] lg:h-auto lg:w-full"
              >
                {section.image && (
                  <Image
                    src={section.image.src}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 180px, 136px"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                )}
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-[110px] bg-[linear-gradient(180deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0.85)_100%)]"
                />
                <span className="absolute inset-x-3 bottom-3 flex flex-col gap-0.5">
                  <span className="font-display text-xl leading-[1.05] uppercase lg:text-2xl">{section.name}</span>
                  <span className="text-xs font-bold text-[#e6e6e6]">{plural(count, "opção", "opções")}</span>
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
