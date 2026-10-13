"use client";

import { useDeferredValue, useMemo, useState } from "react";
import { plural } from "@/lib/format";
import { countItems, filterMenu } from "@/lib/search";
import type { MenuSection } from "@/lib/types";
import { CategoryNav } from "./CategoryNav";
import { MenuSectionView } from "./MenuSectionView";
import { SEARCH_INPUT_ID, SearchField } from "./SearchField";

/** Busca + navegação por categorias + lista. O HTML completo já sai pronto do build. */
export function MenuBrowser({ sections }: { sections: MenuSection[] }) {
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const visible = useMemo(() => filterMenu(sections, deferredQuery), [sections, deferredQuery]);
  const searching = deferredQuery.trim().length > 0;

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
    <main id="cardapio" className="mx-auto w-full max-w-xl">
      <SearchField value={query} onChange={setQuery} />
      {visible.length > 0 && <CategoryNav sections={visible} onSearchClick={focusSearch} />}

      <p role="status" className="sr-only">
        {status}
      </p>

      {visible.length === 0 ? (
        <div className="px-4 py-16 text-center">
          <p className="text-lg font-extrabold">Nada encontrado para “{deferredQuery.trim()}”</p>
          <p className="mt-2 text-sm text-muted">Tente outra palavra, como “bacon”, “suco” ou “cerveja”.</p>
          <button
            type="button"
            onClick={() => setQuery("")}
            className="mt-6 h-11 rounded-full border border-line px-5 text-sm font-bold transition-colors hover:border-white/40"
          >
            Limpar busca
          </button>
        </div>
      ) : (
        visible.map((section) => <MenuSectionView key={section.id} section={section} />)
      )}
    </main>
  );
}
