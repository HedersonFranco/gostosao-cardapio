"use client";

import { useEffect, useRef } from "react";
import type { MenuSection } from "@/lib/types";
import { SearchIcon } from "./icons";

interface NavProps {
  sections: MenuSection[];
  active: string | undefined;
  onSelect: (id: string) => void;
}

/** Celular e tablet: abas fixas no topo, com rolagem horizontal. */
export function CategoryTabs({ sections, active, onSelect, onSearchClick }: NavProps & { onSearchClick: () => void }) {
  const listRef = useRef<HTMLUListElement>(null);

  // Mantém a categoria ativa visível na barra horizontal
  useEffect(() => {
    const list = listRef.current;
    const tab = list?.querySelector<HTMLElement>(`[data-section="${active}"]`);
    if (!list || !tab || list.offsetParent === null) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    list.scrollTo({
      left: tab.offsetLeft - list.clientWidth / 2 + tab.clientWidth / 2,
      behavior: reduceMotion ? "auto" : "smooth",
    });
  }, [active]);

  return (
    <nav
      aria-label="Categorias do cardápio"
      className="sticky top-0 z-20 mt-1.5 border-b border-divider bg-ink/90 backdrop-blur-md lg:hidden"
    >
      <div className="flex items-center gap-3 pl-5 md:pl-8">
        <button
          type="button"
          onClick={onSearchClick}
          aria-label="Buscar no cardápio"
          className="grid size-11 shrink-0 place-items-center rounded-full text-subtle transition-colors hover:text-paper"
        >
          <SearchIcon className="size-5" />
        </button>
        <ul ref={listRef} className="no-scrollbar relative flex flex-1 gap-[22px] overflow-x-auto pr-5">
          {sections.map((section) => {
            const isActive = section.id === active;
            return (
              <li key={section.id} className="shrink-0">
                <a
                  href={`#${section.id}`}
                  data-section={section.id}
                  aria-current={isActive ? "true" : undefined}
                  onClick={() => onSelect(section.id)}
                  className={`flex h-[52px] min-w-11 items-center justify-center border-b-[3px] text-sm whitespace-nowrap transition-colors ${
                    isActive
                      ? "border-brand font-extrabold text-paper"
                      : "border-transparent font-bold text-subtle hover:text-paper"
                  }`}
                >
                  {section.name}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}

/** Computador: lista vertical na lateral, que acompanha a rolagem. */
export function CategorySidebar({ sections, active, onSelect }: NavProps) {
  return (
    <nav aria-label="Categorias do cardápio" className="mt-6 hidden lg:block">
      <ul className="flex flex-col">
        {sections.map((section) => {
          const isActive = section.id === active;
          const count = section.kind === "items" ? section.items.length : section.options.length;
          return (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                aria-current={isActive ? "true" : undefined}
                onClick={() => onSelect(section.id)}
                className={`flex h-11 items-center gap-3 border-l-[3px] pr-2 pl-4 text-[15px] transition-colors ${
                  isActive
                    ? "border-brand font-extrabold text-paper"
                    : "border-line font-semibold text-subtle hover:border-white/40 hover:text-paper"
                }`}
              >
                {section.name}
                <span className="ml-auto text-xs font-bold text-subtle tabular-nums">{count}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
