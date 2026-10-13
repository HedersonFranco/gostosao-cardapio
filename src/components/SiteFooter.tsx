import { site } from "@/config/site";
import { InstagramIcon, PinIcon } from "./icons";

export function SiteFooter() {
  const { address, developer } = site;
  return (
    <footer className="mx-auto mt-7 w-full max-w-xl border-t border-divider px-4 pt-6 pb-8">
      <div className="flex gap-2.5">
        <a
          href={site.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-brand text-[15px] font-extrabold transition-colors hover:bg-brand-strong"
        >
          <PinIcon className="size-[18px]" />
          Como chegar
        </a>
        <a
          href={site.instagram.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-12 flex-1 items-center justify-center gap-2 rounded-xl border border-[#3a3a3a] text-[15px] font-extrabold transition-colors hover:border-white/50"
        >
          <InstagramIcon className="size-[18px]" />
          Instagram
        </a>
      </div>

      <address className="mt-4 text-xs leading-relaxed text-subtle not-italic">
        {site.name} · {address.street} – {address.neighborhood}, {address.city} – {address.state}
      </address>
      <p className="mt-1 text-xs text-subtle">Preços sujeitos a alteração.</p>

      {developer.name && (
        <p className="mt-5 text-xs text-subtle">
          Site por{" "}
          {developer.url ? (
            <a href={developer.url} target="_blank" rel="noopener noreferrer" className="font-bold text-white underline-offset-2 hover:underline">
              {developer.name}
            </a>
          ) : (
            <span className="font-bold text-white">{developer.name}</span>
          )}
        </p>
      )}
    </footer>
  );
}
