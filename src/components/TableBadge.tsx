"use client";

import { useSyncExternalStore } from "react";
import { formatTable, parseTable } from "@/lib/table";
import { CutleryIcon } from "./icons";

// O endereço não muda enquanto o cardápio está aberto: não há o que assinar.
const subscribe = () => () => {};
const getTable = () => parseTable(new URLSearchParams(window.location.search).get("mesa"));
// No HTML gerado no build não existe mesa; ela aparece assim que a página carrega.
const getServerTable = () => null;

/** Mostra "Mesa 07" quando o cliente chega pelo QR code da mesa (?mesa=7). */
export function TableBadge() {
  const table = useSyncExternalStore(subscribe, getTable, getServerTable);
  if (table === null) return null;

  return (
    <p className="flex h-10 items-center gap-2 rounded-full border border-line bg-raised px-4 text-sm font-bold">
      <CutleryIcon className="size-[18px]" />
      Mesa {formatTable(table)}
    </p>
  );
}
