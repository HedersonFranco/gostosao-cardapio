"use client";

import { CloseIcon, SearchIcon } from "./icons";

export const SEARCH_INPUT_ID = "busca";

interface SearchFieldProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchField({ value, onChange }: SearchFieldProps) {
  return (
    <div className="px-4 pt-[22px]">
      <label htmlFor={SEARCH_INPUT_ID} className="sr-only">
        Buscar no cardápio
      </label>
      <div className="flex h-[52px] items-center gap-2.5 rounded-[14px] border border-line bg-surface pr-1.5 pl-4 text-subtle transition-colors focus-within:border-white/60">
        <SearchIcon className="size-5 shrink-0" />
        <input
          id={SEARCH_INPUT_ID}
          type="search"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onKeyDown={(event) => {
            // "Buscar" no teclado do celular: fecha o teclado e mostra os resultados
            if (event.key === "Enter") event.currentTarget.blur();
          }}
          placeholder="Buscar lanche, bebida ou ingrediente"
          autoComplete="off"
          enterKeyHint="search"
          className="h-full min-w-0 flex-1 bg-transparent text-[15px] font-semibold text-white outline-none placeholder:text-subtle focus-visible:outline-none"
        />
        {value && (
          <button
            type="button"
            onClick={() => onChange("")}
            aria-label="Limpar busca"
            className="grid size-10 shrink-0 place-items-center rounded-full text-white transition-colors hover:bg-white/10"
          >
            <CloseIcon className="size-5" />
          </button>
        )}
      </div>
    </div>
  );
}
