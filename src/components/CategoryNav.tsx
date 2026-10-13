"use client";

import { useEffect, useRef, useState } from "react";
import { SearchIcon } from "./icons";

interface CategoryNavProps {
  sections: { id: string; name: string }[];
  onSearchClick: () => void;
}

/** Distância do topo em que uma seção passa a contar como "atual" (altura da barra + folga). */
const ACTIVE_OFFSET = 96;

/** Barra fixa com as categorias; destaca a seção que está na tela enquanto o cliente rola. */
export function CategoryNav({ sections, onSearchClick }: CategoryNavProps) {
  const [active, setActive] = useState<string | undefined>(sections[0]?.id);
  const listRef = useRef<HTMLUListElement>(null);
  const ids = sections.map((section) => section.id).join("|");

  // Descobre a seção atual a partir da posição de rolagem
  useEffect(() => {
    const elements = ids
      .split("|")
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null);
    if (elements.length === 0) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      let current = elements[0].id;
      if (atBottom) {
        current = elements[elements.length - 1].id;
      } else {
        for (const element of elements) {
          if (element.getBoundingClientRect().top - ACTIVE_OFFSET > 0) break;
          current = element.id;
        }
      }
      setActive(current);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      cancelAnimationFrame(frame);
    };
  }, [ids]);

  // Mantém a categoria ativa visível na barra horizontal
  useEffect(() => {
    const list = listRef.current;
    const chip = list?.querySelector<HTMLElement>(`[data-section="${active}"]`);
    if (!list || !chip) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    list.scrollTo({
      left: chip.offsetLeft - list.clientWidth / 2 + chip.clientWidth / 2,
      behavior: reduceMotion ? "auto" : "smooth",
    });
  }, [active]);

  return (
    <nav
      aria-label="Categorias do cardápio"
      className="sticky top-0 z-20 mt-3.5 border-b border-divider bg-ink/90 backdrop-blur-md"
    >
      <div className="flex items-center gap-2 py-3 pl-4">
        <button
          type="button"
          onClick={onSearchClick}
          aria-label="Buscar no cardápio"
          className="grid size-11 shrink-0 place-items-center rounded-full border border-line bg-surface text-white transition-colors hover:border-white/40"
        >
          <SearchIcon className="size-5" />
        </button>
        <ul ref={listRef} className="no-scrollbar relative flex flex-1 gap-2 overflow-x-auto pr-4">
          {sections.map((section) => {
            const isActive = section.id === active;
            return (
              <li key={section.id} className="shrink-0">
                <a
                  href={`#${section.id}`}
                  data-section={section.id}
                  aria-current={isActive ? "true" : undefined}
                  onClick={() => setActive(section.id)}
                  className={`flex h-11 items-center rounded-full border px-[18px] text-sm whitespace-nowrap transition-colors ${
                    isActive
                      ? "border-brand bg-brand font-extrabold"
                      : "border-line bg-surface font-bold hover:border-white/40"
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
