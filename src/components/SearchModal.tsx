import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

type Locale = "es" | "en";

const buildItems = (locale: Locale) => {
  const basePath = locale === "en" ? "/en" : "/es";
  return [
    { label: locale === "es" ? "Inicio" : "Home", href: basePath },
    { label: "Blog", href: `${basePath}/blog` },
    { label: "Arsenal", href: `${basePath}/arsenal` },
    { label: locale === "es" ? "Sobre" : "About", href: `${basePath}/about` },
    {
      label: locale === "es" ? "Faceless / Setup" : "Faceless / Setup",
      href: `${basePath}/arsenal/faceless/setup`,
    },
  ];
};

const copy = {
  es: {
    quickSearch: "BUSQUEDA RAPIDA",
    placeholder: "Buscar comando o destino...",
    noMatches: "Sin resultados",
    hint: "Ctrl+K para abrir, Esc para cerrar",
  },
  en: {
    quickSearch: "QUICK SEARCH",
    placeholder: "Search command or destination...",
    noMatches: "No matches",
    hint: "Ctrl+K to open, Esc to close",
  },
} satisfies Record<Locale, Record<string, string>>;

export default function SearchModal({ locale = "es" }: { locale?: Locale }) {
  const safeLocale: Locale = locale === "en" ? "en" : "es";
  const items = useMemo(() => buildItems(safeLocale), [safeLocale]);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    if (!query) return items;
    const q = query.toLowerCase();
    return items.filter((item) => item.label.toLowerCase().includes(q));
  }, [items, query]);

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === "k" && (event.ctrlKey || event.metaKey)) {
        event.preventDefault();
        setOpen(true);
      }
      if (event.key === "Escape") {
        setOpen(false);
      }
    };
    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (target?.closest("[data-search-trigger]")) {
        event.preventDefault();
        setOpen(true);
      }
    };
    window.addEventListener("keydown", handleKey);
    window.addEventListener("click", handleClick);
    return () => {
      window.removeEventListener("keydown", handleKey);
      window.removeEventListener("click", handleClick);
    };
  }, []);

  useEffect(() => {
    if (!open) {
      setQuery("");
    }
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setOpen(false)}
        >
          <motion.div
            className="panel border-glow w-full max-w-xl rounded-md px-5 py-4"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center gap-2 text-xs text-terminal-cyan/70">
              <span className="h-2 w-2 rounded-full bg-terminal-green shadow-glow"></span>
              {copy[safeLocale].quickSearch}
            </div>
            <input
              autoFocus
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={copy[safeLocale].placeholder}
              className="mt-3 w-full border border-terminal-border bg-terminal-black px-3 py-2 text-sm text-terminal-green outline-none focus:border-terminal-green"
            />
            <div className="mt-3 space-y-2 text-sm">
              {results.map((item) => (
                <button
                  key={item.href}
                  className="flex w-full items-center justify-between border border-terminal-border px-3 py-2 text-left text-terminal-green/80 transition hover:border-terminal-green/70"
                  onClick={() => (window.location.href = item.href)}
                >
                  <span>{item.label}</span>
                  <span className="text-xs text-terminal-cyan/70">{item.href}</span>
                </button>
              ))}
              {!results.length && (
                <div className="border border-terminal-border px-3 py-2 text-terminal-green/60">
                  {copy[safeLocale].noMatches}
                </div>
              )}
            </div>
            <div className="mt-4 text-xs text-terminal-cyan/60">
              {copy[safeLocale].hint}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
