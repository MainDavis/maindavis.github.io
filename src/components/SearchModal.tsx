import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

const ITEMS = [
  { label: "Inicio", href: "/" },
  { label: "Blog", href: "/blog" },
  { label: "Proyectos", href: "/projects" },
  { label: "Proyecto Demo / Wiki / Instalacion", href: "/projects/proyecto-demo/wiki/instalacion" },
];

export default function SearchModal() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    if (!query) return ITEMS;
    const q = query.toLowerCase();
    return ITEMS.filter((item) => item.label.toLowerCase().includes(q));
  }, [query]);

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
              BUSCADOR RAPIDO
            </div>
            <input
              autoFocus
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Buscar comando o destino..."
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
                  Sin coincidencias
                </div>
              )}
            </div>
            <div className="mt-4 text-xs text-terminal-cyan/60">
              Ctrl+K para abrir, Esc para cerrar
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
