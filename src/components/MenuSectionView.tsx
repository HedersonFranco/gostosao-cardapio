import Image from "next/image";
import { formatBRL } from "@/lib/format";
import type { Cents, ExtrasSection, ItemsSection, MenuItem, MenuSection } from "@/lib/types";

/** Linha "nome ........ R$ 0,00" dos cardápios clássicos. */
function PriceLine({ label, cents, strong = true }: { label: string; cents?: Cents; strong?: boolean }) {
  return (
    <div className="flex items-baseline gap-2">
      {strong ? (
        <h3 className="min-w-0 text-base leading-snug font-extrabold">{label}</h3>
      ) : (
        <span className="min-w-0 text-sm font-bold text-[#d6d6d6]">{label}</span>
      )}
      {cents !== undefined && (
        <>
          <span aria-hidden="true" className="min-w-4 flex-1 -translate-y-1 border-b-2 border-dotted border-leader" />
          <span
            className={`shrink-0 font-extrabold whitespace-nowrap text-brand-text tabular-nums ${strong ? "text-base" : "text-sm"}`}
          >
            {formatBRL(cents)}
          </span>
        </>
      )}
    </div>
  );
}

function MenuItemRow({ item }: { item: MenuItem }) {
  return (
    <li className="flex flex-col gap-1 border-b border-divider py-4">
      <PriceLine label={item.name} cents={item.price} />
      {item.description && <p className="text-[13px] leading-snug text-muted">{item.description}</p>}
      {item.variants && (
        <ul aria-label={`Tamanhos de ${item.name}`} className="flex flex-col gap-1 pt-1">
          {item.variants.map((variant) => (
            <li key={variant.label}>
              <PriceLine label={variant.label} cents={variant.price} strong={false} />
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}

function Highlight({ section }: { section: ItemsSection }) {
  const highlight = section.highlight;
  const item = highlight && section.items.find((candidate) => candidate.id === highlight.itemId);
  if (!highlight || !item || item.price === undefined) return null;

  return (
    // Celular: texto sobre a foto. Telas largas: foto à esquerda e texto à direita, sem esticar a imagem.
    <article className="relative mt-4 overflow-hidden rounded-[20px] bg-surface md:grid md:grid-cols-2">
      <div className="relative h-[232px] md:h-[280px] lg:h-[320px]">
        <Image
          src={highlight.image.src}
          alt={highlight.image.alt}
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover"
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-[200px] bg-[linear-gradient(180deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0.75)_45%,rgba(0,0,0,0.92)_100%)] md:hidden"
        />
      </div>
      <div className="absolute inset-x-4 bottom-3.5 flex items-end gap-3 md:static md:flex-col md:items-start md:justify-center md:gap-5 md:p-8 lg:p-10">
        <div className="flex min-w-0 flex-1 flex-col gap-1 md:flex-none md:gap-2">
          <span className="text-[11px] font-extrabold tracking-[1.5px] text-[#ff8a8d] uppercase md:text-xs">{highlight.label}</span>
          <span className="font-display text-[34px] leading-none uppercase md:text-5xl lg:text-6xl">{item.name}</span>
          {item.description && (
            <span className="text-xs leading-snug text-[#e6e6e6] md:text-sm md:text-muted">{item.description}</span>
          )}
        </div>
        <span className="shrink-0 font-display text-[26px] leading-none md:text-4xl md:text-brand-text">
          {formatBRL(item.price)}
        </span>
      </div>
    </article>
  );
}

function SectionTitle({ id, name, count }: { id: string; name: string; count: number }) {
  return (
    <div className="flex items-start gap-2">
      <h2 id={id} className="font-display text-[40px] leading-none tracking-[0.5px] uppercase lg:text-[56px]">
        {name}
      </h2>
      <span className="text-sm font-extrabold text-brand-text">
        {count}
        <span className="sr-only"> {count === 1 ? "opção" : "opções"}</span>
      </span>
    </div>
  );
}

function ItemsSectionView({ section }: { section: ItemsSection }) {
  const titleId = `${section.id}-titulo`;
  return (
    <section
      id={section.id}
      aria-labelledby={titleId}
      className="scroll-mt-[64px] px-5 pt-7 md:px-8 lg:scroll-mt-8 lg:px-0 lg:pt-14 lg:first-of-type:pt-0"
    >
      <SectionTitle id={titleId} name={section.name} count={section.items.length} />
      {section.note && <p className="pt-2 text-[13px] font-semibold text-muted">{section.note}</p>}
      <Highlight section={section} />
      <ul className="mt-2 md:grid md:grid-cols-2 md:gap-x-10">
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
    <section
      id={section.id}
      aria-labelledby={titleId}
      className="scroll-mt-[64px] px-5 pt-6 md:px-8 lg:scroll-mt-8 lg:px-0 lg:pt-10"
    >
      <div className="flex flex-col gap-3 rounded-2xl border border-dashed border-leader p-4 lg:p-6">
        <div className="flex items-baseline justify-between gap-3">
          <h2 id={titleId} className="font-display text-xl tracking-[0.5px] uppercase">
            {section.name}
          </h2>
          <span className="shrink-0 text-sm font-extrabold text-brand-text">{formatBRL(section.price)} cada</span>
        </div>
        {section.note && <p className="text-[13px] text-muted">{section.note}</p>}
        <ul className="flex flex-wrap gap-2">
          {section.options.map((option) => (
            <li key={option} className="rounded-full bg-surface px-3 py-2 text-[13px] font-bold">
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
