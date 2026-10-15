import { site } from "@/config/site";
import { InstagramIcon, PinIcon } from "./icons";

export function SiteFooter() {
  const { address, developer } = site;
  return (
    <footer className="mx-auto mt-8 flex w-full max-w-6xl flex-col gap-4 border-t border-divider px-5 pt-6 pb-8 md:px-8 lg:mt-20 lg:flex-row lg:items-end lg:justify-between lg:gap-12 lg:px-10 lg:pt-10 lg:pb-12">
      <div className="flex flex-col gap-3">
        <span aria-hidden="true" className="font-display text-[28px] tracking-[0.5px] uppercase lg:text-4xl">
          Gostosão<span className="text-brand">.</span>
        </span>
        <address className="text-[13px] leading-relaxed text-muted not-italic">
          {site.name} · {address.street} – {address.neighborhood}, {address.city} – {address.state}
        </address>
        <p className="text-[13px] text-muted">Preços sujeitos a alteração.</p>
      </div>

      <div className="flex flex-col gap-2 lg:items-end">
        <div className="flex flex-wrap gap-x-6">
          <a
            href={site.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-11 items-center gap-2 text-sm font-extrabold transition-colors hover:text-brand-text"
          >
            <PinIcon className="size-[18px]" />
            Como chegar
          </a>
          <a
            href={site.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-11 items-center gap-2 text-sm font-extrabold transition-colors hover:text-brand-text"
          >
            <InstagramIcon className="size-[18px]" />@{site.instagram.handle}
          </a>
        </div>

        {developer.name && (
          <p className="text-xs text-subtle">
            Site por{" "}
            {developer.url ? (
              <a
                href={developer.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-paper underline-offset-2 hover:underline"
              >
                {developer.name}
              </a>
            ) : (
              <span className="font-bold text-paper">{developer.name}</span>
            )}
          </p>
        )}
      </div>
    </footer>
  );
}
