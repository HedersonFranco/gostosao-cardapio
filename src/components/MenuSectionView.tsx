import Image from "next/image";
import { formatBRL, formatPrice, plural } from "@/lib/format";
import type { Cents, ExtrasSection, ItemsSection, MenuItem, MenuSection } from "@/lib/types";
import { TagBullet } from "./icons";

/** Preço na pílula vermelha do cardápio impresso. */
export function PricePill({ cents }: { cents: Cents }) {
  return (
    <span className="flex shrink-0 items-baseline gap-[3px] rounded-full bg-brand px-3 py-[7px] text-base font-extrabold tabular-nums">
      <span className="text-[11px] font-bold">R$</span>
      {formatPrice(cents)}
    </span>
  );
}

function MenuItemRow({ item }: { item: MenuItem }) {
  return (
    <li className={`flex gap-3 border-b border-divider py-3.5 ${item.variants ? "items-start" : "items-center"}`}>
      <TagBullet className={`h-3.5 w-[18px] shrink-0 ${item.variants ? "mt-[3px]" : ""}`} />
      <div className="flex min-w-0 flex-1 flex-col gap-[3px]">
        <h3 className="text-base leading-tight font-extrabold">{item.name}</h3>
        {item.description && <p className="text-[13px] leading-[1.35] font-medium text-muted">{item.description}</p>}
        {item.variants && (
          <ul aria-label={`Tamanhos de ${item.name}`} className="mt-1.5 flex flex-wrap gap-2">
            {item.variants.map((variant) => (
              <li
                key={variant.label}
                className="flex items-center gap-2 rounded-full border border-line py-1 pr-1 pl-3 text-[13px] font-bold"
              >
                {variant.label}
                <PricePill cents={variant.price} />
              </li>
            ))}
          </ul>
        )}
      </div>
      {item.price !== undefined && <PricePill cents={item.price} />}
    </li>
  );
}

function ItemsSectionView({ section }: { section: ItemsSection }) {
  const titleId = `${section.id}-titulo`;
  return (
    <section id={section.id} aria-labelledby={titleId} className="scroll-mt-[72px] px-4 pt-5">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 pt-2 pb-1.5">
        {section.image && (
          <div className="relative size-[52px] shrink-0 overflow-hidden rounded-full border-[3px] border-brand bg-surface">
            <Image src={section.image.src} alt="" fill sizes="52px" className="object-cover" />
          </div>
        )}
        <h2 id={titleId} className="rounded-lg bg-brand px-3 py-1.5 text-lg leading-tight font-black tracking-[1px] uppercase">
          {section.name}
        </h2>
        <span className="ml-auto shrink-0 text-[13px] font-semibold text-subtle">
          {plural(section.items.length, "opção", "opções")}
        </span>
      </div>
      {section.note && <p className="pt-1 text-[13px] font-semibold text-muted">{section.note}</p>}
      <ul>
        {section.items.map((item) => (
          <MenuItemRow key={item.id} item={item} />
        ))}
      </ul>
    </section>
  );
}

function ExtrasSectionView({ section }: { section: ExtrasSection }) {
  const titleId = `${section.id}-titulo`;
  return (
    <section id={section.id} aria-labelledby={titleId} className="scroll-mt-[72px] px-4 pt-[18px]">
      <div className="flex flex-col gap-3 rounded-2xl border border-line bg-surface p-4">
        <div className="flex items-center justify-between gap-3">
          <h2 id={titleId} className="text-[15px] font-black tracking-[1px] uppercase">
            {section.name}
          </h2>
          <span className="shrink-0 rounded-full bg-brand px-3 py-1.5 text-[13px] font-extrabold">
            {formatBRL(section.price)} cada
          </span>
        </div>
        {section.note && <p className="text-[13px] font-medium text-muted">{section.note}</p>}
        <ul className="flex flex-wrap gap-2">
          {section.options.map((option) => (
            <li key={option} className="rounded-full border border-[#333] px-3 py-2 text-[13px] font-bold">
              {option}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function MenuSectionView({ section }: { section: MenuSection }) {
  return section.kind === "extras" ? <ExtrasSectionView section={section} /> : <ItemsSectionView section={section} />;
}
