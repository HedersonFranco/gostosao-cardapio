import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-dvh max-w-xl flex-col items-start justify-center gap-4 px-6">
      <p className="text-xs font-extrabold tracking-[3px] text-brand-text uppercase">Erro 404</p>
      <h1 className="font-display text-6xl leading-[0.9] uppercase">
        <span className="block">Esse lanche</span>{" "}
        <span className="block text-transparent [-webkit-text-stroke:2px_var(--color-paper)]">não existe</span>
      </h1>
      <p className="text-[15px] text-muted">A página que você procurou não está no cardápio.</p>
      <Link
        href="/"
        className="mt-2 flex h-[52px] items-center rounded-[14px] bg-brand px-6 text-[15px] font-extrabold text-white transition-colors hover:bg-brand-strong"
      >
        Ver o cardápio
      </Link>
    </main>
  );
}
