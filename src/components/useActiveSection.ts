"use client";

import { useEffect, useState } from "react";

/** Distância do topo em que uma seção passa a contar como "atual" (altura da barra + folga). */
const ACTIVE_OFFSET = 80;

/**
 * Descobre qual seção está na tela enquanto o cliente rola.
 * Devolve o id ativo e uma função para marcar uma seção na hora (ao clicar no menu).
 */
export function useActiveSection(ids: string[]) {
  const key = ids.join("|");
  const [active, setActive] = useState<string | undefined>(ids[0]);

  useEffect(() => {
    const elements = key
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
  }, [key]);

  return [active, setActive] as const;
}
