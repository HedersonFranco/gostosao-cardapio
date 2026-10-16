import Image from "next/image";
import { site } from "@/config/site";
import { ArrowDownIcon, InstagramIcon, PinIcon } from "./icons";

/**
 * Primeira tela.
 * Celular: foto de ponta a ponta com o texto por cima.
 * Computador: texto à esquerda e foto ocupando a metade direita, para a imagem não ser esticada.
 */
export function Hero() {
  return (
    <header className="relative h-[600px] w-full overflow-hidden md:h-[640px] lg:h-[min(88vh,800px)] lg:min-h-[620px]">
      <div className="absolute inset-0 lg:left-auto lg:w-[58%]">
        <Image
          src="/images/hero.webp"
          alt="Hambúrguer com batata frita no prato"
          fill
          sizes="(min-width: 1024px) 58vw, 100vw"
          className="object-cover object-[32%_50%] lg:object-[40%_50%]"
          loading="eager"
          fetchPriority="high"
        />
        {/* Computador: a foto se funde com o fundo à esquerda e embaixo (dentro da mesma caixa, sem emenda) */}
        <div
          aria-hidden="true"
          className="absolute inset-y-0 -left-px hidden w-[38%] bg-[linear-gradient(90deg,#0b0b0b_0%,rgba(11,11,11,0)_100%)] lg:block"
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 hidden h-[160px] bg-[linear-gradient(180deg,rgba(11,11,11,0)_0%,#0b0b0b_100%)] lg:block"
        />
      </div>

      {/* Sombras para o texto ficar legível sobre a foto */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-[130px] bg-[linear-gradient(180deg,rgba(11,11,11,0.78)_0%,rgba(11,11,11,0)_100%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-[480px] bg-[linear-gradient(180deg,rgba(11,11,11,0)_0%,rgba(11,11,11,0.9)_38%,#0b0b0b_100%)] lg:hidden"
      />

      <div className="absolute inset-x-0 top-0">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 pt-3 md:px-8 lg:px-10 lg:pt-6">
          <span aria-hidden="true" className="font-display text-2xl tracking-[1px] uppercase lg:text-3xl">
            Gostosão<span className="text-brand">.</span>
          </span>
          <a
            href={site.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Instagram do ${site.name} (@${site.instagram.handle})`}
            className="grid size-11 place-items-center rounded-full border border-white/25 bg-ink/60 backdrop-blur-sm transition-colors hover:border-white/60"
          >
            <InstagramIcon className="size-5" />
          </a>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 lg:top-0 lg:flex lg:items-center">
        <div className="mx-auto w-full max-w-6xl px-5 pb-6 md:px-8 md:pb-10 lg:px-10 lg:pb-0">
          <div className="flex flex-col lg:max-w-[560px]">
            <p className="mb-3 text-xs font-extrabold tracking-[3px] text-brand-text uppercase lg:mb-5 lg:text-sm">
              Cardápio · {site.address.neighborhood}, {site.address.city}
            </p>
            <h1 className="font-display text-[clamp(64px,21.5vw,84px)] leading-[0.9] tracking-[0.5px] uppercase md:text-[112px] lg:text-[clamp(112px,10.5vw,152px)]">
              <span className="block">Gostosão</span>{" "}
              <span className="block text-transparent [-webkit-text-stroke:2px_var(--color-paper)]">Lanches</span>
            </h1>
            <p className="mt-3.5 max-w-[300px] text-[15px] leading-relaxed text-[#d6d6d6] lg:mt-6 lg:max-w-[420px] lg:text-lg">
              Sanduíches, batata frita, tira-gosto e bebidas.
            </p>
            {/* Abaixo de 360 px os dois botões não cabem lado a lado: um fica embaixo do outro */}
            <div className="mt-[18px] flex flex-col gap-2.5 min-[360px]:flex-row md:max-w-[440px] lg:mt-8">
              <a
                href="#cardapio"
                className="flex h-[52px] items-center justify-center gap-2 rounded-[14px] bg-brand text-[15px] font-extrabold text-white transition-colors hover:bg-brand-strong min-[360px]:flex-1"
              >
                Ver cardápio
                <ArrowDownIcon className="size-[18px]" strokeWidth={2.4} />
              </a>
              <a
                href={site.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-[52px] items-center justify-center gap-2 rounded-[14px] border border-white/30 px-[18px] text-[15px] font-bold transition-colors hover:border-white/60"
              >
                <PinIcon className="size-[18px]" />
                Como chegar
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
