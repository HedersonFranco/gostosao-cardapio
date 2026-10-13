import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-dvh max-w-xl flex-col items-center justify-center gap-4 px-6 text-center">
      <p className="rounded-lg bg-brand px-3 py-1.5 text-sm font-black tracking-[2px] uppercase">Página não encontrada</p>
      <h1 className="text-3xl font-black">Esse lanche não está no cardápio.</h1>
      <Link
        href="/"
        className="mt-2 flex h-12 items-center rounded-xl bg-white px-6 text-[15px] font-extrabold text-ink transition-colors hover:bg-white/90"
      >
        Ver o cardápio
      </Link>
    </main>
  );
}
