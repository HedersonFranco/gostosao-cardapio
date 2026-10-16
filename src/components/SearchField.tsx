"use client";

import { CloseIcon, SearchIcon } from "./icons";

export const SEARCH_INPUT_ID = "busca";

interface SearchFieldProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchField({ value, onChange }: SearchFieldProps) {
  return (
    <div className="px-5 pt-7 md:px-8 lg:px-0 lg:pt-0">
      <label htmlFor={SEARCH_INPUT_ID} className="sr-only">
        Buscar no cardápio
      </label>
      <div className="flex h-[50px] items-center gap-2.5 rounded-[14px] border border-line bg-surface pr-1.5 pl-4 text-subtle transition-colors focus-within:border-white/60">
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
          placeholder="O que você procura?"
          autoComplete="off"
          enterKeyHint="search"
          // 16 px no mínimo: com fonte menor, o iPhone dá zoom na página ao focar o campo
          className="h-full min-w-0 flex-1 bg-transparent text-base font-semibold text-paper outline-none placeholder:text-subtle focus-visible:outline-none"
        />
        {value && (
          <button
            type="button"
            onClick={() => onChange("")}
            aria-label="Limpar busca"
            className="grid size-11 shrink-0 place-items-center rounded-full text-paper transition-colors hover:bg-white/10"
          >
            <CloseIcon className="size-5" />
          </button>
        )}
      </div>
    </div>
  );
}
