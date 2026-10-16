"use client";

import { useDeferredValue, useMemo, useState } from "react";
import { plural } from "@/lib/format";
import { countItems, filterMenu } from "@/lib/search";
import type { MenuSection } from "@/lib/types";
import { CategorySidebar, CategoryTabs } from "./CategoryNav";
import { MenuSectionView } from "./MenuSectionView";
import { SEARCH_INPUT_ID, SearchField } from "./SearchField";
import { useActiveSection } from "./useActiveSection";

/** Busca + navegação por categorias + lista. O HTML completo já sai pronto do build. */
export function MenuBrowser({ sections }: { sections: MenuSection[] }) {
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const visible = useMemo(() => filterMenu(sections, deferredQuery), [sections, deferredQuery]);
  const searching = deferredQuery.trim().length > 0;
  const [active, setActive] = useActiveSection(visible.map((section) => section.id));

  const focusSearch = () => {
    const input = document.getElementById(SEARCH_INPUT_ID);
    input?.scrollIntoView({ block: "center", behavior: "smooth" });
    input?.focus({ preventScroll: true });
  };

  const status = !searching
    ? ""
    : visible.length === 0
      ? "Nenhum item encontrado"
      : plural(countItems(visible), "item encontrado", "itens encontrados");

  return (
    <main
      id="cardapio"
      className="mx-auto w-full max-w-6xl lg:grid lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-14 lg:px-10 lg:pt-14"
    >
      {/* No computador, busca e categorias ficam numa coluna fixa à esquerda */}
      <aside className="lg:sticky lg:top-8 lg:max-h-[calc(100dvh-4rem)] lg:self-start lg:overflow-y-auto">
        <SearchField value={query} onChange={setQuery} />
        {visible.length > 0 && <CategorySidebar sections={visible} active={active} onSelect={setActive} />}
      </aside>

      <div className="min-w-0">
        {visible.length > 0 && (
          <CategoryTabs sections={visible} active={active} onSelect={setActive} onSearchClick={focusSearch} />
        )}

        <p role="status" className="sr-only">
          {status}
        </p>

        {visible.length === 0 ? (
        <div className="px-5 py-16 text-center lg:px-0 lg:pt-4 lg:text-left">
          <p className="text-lg font-extrabold">Nada encontrado para “{deferredQuery.trim()}”</p>
          <p className="mt-2 text-sm text-muted">Tente outra palavra, como “bacon”, “suco” ou “cerveja”.</p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              focusSearch();
            }}
            className="mt-6 h-11 rounded-full border border-line px-5 text-sm font-bold transition-colors hover:border-white/40"
          >
            Limpar busca
          </button>
        </div>
      ) : (
        visible.map((section) => <MenuSectionView key={section.id} section={section} />)
      )}
      </div>
    </main>
  );
}
