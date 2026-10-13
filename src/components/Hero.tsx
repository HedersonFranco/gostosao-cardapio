import Image from "next/image";
import { site } from "@/config/site";
import { InstagramIcon, PinIcon } from "./icons";

interface PhotoProps {
  src: string;
  alt: string;
  size: number;
  className: string;
  /** Foto principal: carrega primeiro (é o maior elemento da primeira tela). */
  main?: boolean;
}

/** Foto redonda com aro vermelho, como no cardápio impresso. */
function Photo({ src, alt, size, className, main = false }: PhotoProps) {
  return (
    <div
      className={`absolute overflow-hidden rounded-full border-brand bg-surface ${className}`}
      style={{ width: size, height: size }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={`${size}px`}
        className="object-cover"
        loading={main ? "eager" : "lazy"}
        fetchPriority={main ? "high" : "auto"}
      />
    </div>
  );
}

export function Hero() {
  return (
    <header className="mx-auto w-full max-w-xl">
      <div className="flex items-center justify-end px-4 pt-3">
        <a
          href={site.instagram.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Instagram do ${site.name} (@${site.instagram.handle})`}
          className="grid size-11 place-items-center rounded-full border border-line bg-raised transition-colors hover:border-white/40"
        >
          <InstagramIcon className="size-5" />
        </a>
      </div>

      <div className="relative mx-auto mt-1.5 h-[250px] w-[390px] max-w-full">
        <Photo
          src="/images/fries-sq.webp"
          alt="Porção de batata frita"
          size={136}
          className="top-[74px] left-2 border-[5px] shadow-[0_12px_32px_rgba(0,0,0,0.7)]"
        />
        <Photo
          src="/images/burger-plate-sq.webp"
          alt="Hambúrguer com batata frita no prato"
          size={136}
          className="top-[74px] right-2 border-[5px] shadow-[0_12px_32px_rgba(0,0,0,0.7)]"
        />
        <Photo
          src="/images/burger-sq.webp"
          alt="Hambúrguer com batata frita sobre tábua"
          size={204}
          main
          className="top-2 left-1/2 z-10 -translate-x-1/2 border-[6px] shadow-[0_16px_40px_rgba(0,0,0,0.8)]"
        />
      </div>

      <div className="flex flex-col items-center px-5 text-center">
        <h1 className="flex flex-col items-center gap-2.5">
          <span className="text-[clamp(44px,15vw,54px)] leading-none font-black tracking-[-1.5px] uppercase">
            Gostosão
          </span>{" "}
          <span className="rounded-lg bg-brand py-[7px] pr-3.5 pl-5 text-base font-extrabold tracking-[6px] uppercase">
            Lanches
          </span>
        </h1>
        <p className="mt-4 flex items-center gap-1.5 text-[13px] font-semibold text-[#bdbdbd]">
          <PinIcon className="size-4 shrink-0" />
          {site.address.street} · {site.address.neighborhood}
        </p>
      </div>
    </header>
  );
}
