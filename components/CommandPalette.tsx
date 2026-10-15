"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { Copy, CornerDownLeft, Moon, Sun, FileText, FolderGit2, GraduationCap, Layers, Mail, Search, Sparkles, User } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "./BrandIcons";
import { featuredRoute, routes } from "@/lib/routes";
import { profile } from "@/lib/content";
import { copyEmail } from "./CopyEmail";
import { toggleTheme, useTheme } from "@/lib/theme";

type Action = { label: string; group: "Go to" | "Links" | "Actions"; icon: ReactNode; run: () => void };

export default function CommandPalette({
  open,
  setOpen,
  onOpenTile,
}: {
  open: boolean;
  setOpen: (v: boolean) => void;
  onOpenTile: (route: string) => void;
}) {
  const [q, setQ] = useState("");
  const [active, setActive] = useState(0);
  const [toast, setToast] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const theme = useTheme();

  const actions: Action[] = useMemo(() => {
    const go = (r: string) => () => onOpenTile(r);
    const link = (url: string) => () => window.open(url, "_blank", "noreferrer");
    return [
      { label: "About me", group: "Go to", icon: <User size={16} />, run: go(routes.about) },
      { label: "CodeSync", group: "Go to", icon: <Sparkles size={16} />, run: go(featuredRoute) },
      { label: "All projects", group: "Go to", icon: <FolderGit2 size={16} />, run: go(routes.projects) },
      { label: "Stack", group: "Go to", icon: <Layers size={16} />, run: go(routes.stack) },
      { label: "Education", group: "Go to", icon: <GraduationCap size={16} />, run: go(routes.education) },
      { label: "Contact", group: "Go to", icon: <Mail size={16} />, run: go(routes.contact) },
      { label: "GitHub", group: "Links", icon: <GitHubIcon className="h-4 w-4" />, run: link(profile.links.github) },
      { label: "LinkedIn", group: "Links", icon: <LinkedInIcon className="h-4 w-4" />, run: link(profile.links.linkedin) },
      { label: "Resume", group: "Links", icon: <FileText size={16} />, run: link(profile.resumeUrl) },
      {
        label: theme === "dark" ? "Switch to light mode" : "Switch to dark mode",
        group: "Actions",
        icon: theme === "dark" ? <Sun size={16} /> : <Moon size={16} />,
        run: () => toggleTheme(),
      },
      {
        label: "Copy email address",
        group: "Actions",
        icon: <Copy size={16} />,
        run: async () => {
          if (await copyEmail()) {
            setToast("Email copied");
            setTimeout(() => setToast(null), 1800);
          }
        },
      },
    ];
  }, [onOpenTile, theme]);

  const filtered = actions.filter((a) => a.label.toLowerCase().includes(q.trim().toLowerCase()));

  // ⌘K / Ctrl+K anywhere toggles the palette
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen(!open);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, setOpen]);

  useEffect(() => {
    if (open) {
      setQ("");
      setActive(0);
      setTimeout(() => inputRef.current?.focus(), 10);
    }
  }, [open]);

  const choose = (a?: Action) => {
    if (!a) return;
    setOpen(false);
    a.run();
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => (i + 1) % Math.max(filtered.length, 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => (i - 1 + filtered.length) % Math.max(filtered.length, 1));
    } else if (e.key === "Enter") {
      choose(filtered[active]);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  let lastGroup = "";

  return (
    <>
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-[14vh]">
            <motion.div
              className="absolute inset-0 bg-overlay backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Command menu"
              initial={{ opacity: 0, scale: 0.96, y: -8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.18 }}
              data-lenis-prevent
              className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-line bg-surface shadow-2xl shadow-shadow"
            >
              <div className="flex items-center gap-3 border-b border-line px-4">
                <Search size={16} className="text-muted" />
                <input
                  ref={inputRef}
                  value={q}
                  onChange={(e) => {
                    setQ(e.target.value);
                    setActive(0);
                  }}
                  onKeyDown={onKey}
                  placeholder="Where do you want to go?"
                  aria-label="Search"
                  className="h-14 flex-1 bg-transparent text-[15px] text-fg outline-none placeholder:text-muted"
                />
                <span className="kbd">esc</span>
              </div>
              <ul className="max-h-[50vh] overflow-y-auto p-2" role="listbox">
                {filtered.length === 0 && (
                  <li className="px-3 py-8 text-center text-sm text-muted">
                    Nothing matches “{q}”. Try “projects” or “email”.
                  </li>
                )}
                {filtered.map((a, i) => {
                  const header = a.group !== lastGroup ? a.group : null;
                  lastGroup = a.group;
                  return (
                    <li key={a.label}>
                      {header && <div className="px-3 pb-1 pt-3 text-xs text-muted">{header}</div>}
                      <button
                        role="option"
                        aria-selected={i === active}
                        onMouseEnter={() => setActive(i)}
                        onClick={() => choose(a)}
                        className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${
                          i === active ? "bg-accent/15 text-fg" : "text-fg/80"
                        }`}
                      >
                        <span className={i === active ? "text-accent" : "text-muted"}>{a.icon}</span>
                        <span className="flex-1">{a.label}</span>
                        {i === active && <CornerDownLeft size={14} className="text-muted" />}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="fixed bottom-28 left-1/2 z-50 -translate-x-1/2 rounded-full border border-line bg-surface px-4 py-2 text-sm"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
