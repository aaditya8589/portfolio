"use client";

import { AnimatePresence, motion, useMotionValue, useSpring, useTransform, type MotionValue } from "framer-motion";
import { useEffect, useRef, useState, type MouseEvent, type ReactNode } from "react";
import { FileText, Search, FolderGit2, House, Layers, Mail, Moon, Sun } from "lucide-react";
import { toggleTheme, useTheme } from "@/lib/theme";
import { GitHubIcon } from "./BrandIcons";
import { routes } from "@/lib/routes";
import { profile } from "@/lib/content";

type Item = { label: string; icon: ReactNode; onClick?: (e: MouseEvent<HTMLButtonElement>) => void; href?: string };

export default function Dock({
  onOpen,
  onHome,
  onPalette,
}: {
  onOpen: (route: string) => void;
  onHome: () => void;
  onPalette: () => void;
}) {
  const mouseX = useMotionValue(Infinity);
  const theme = useTheme();

  const items: (Item | "sep")[] = [
    { label: "Home", icon: <House size={18} />, onClick: onHome },
    { label: "Projects", icon: <FolderGit2 size={18} />, onClick: () => onOpen(routes.projects) },
    { label: "Stack", icon: <Layers size={18} />, onClick: () => onOpen(routes.stack) },
    { label: "Contact", icon: <Mail size={18} />, onClick: () => onOpen(routes.contact) },
    "sep",
    { label: "GitHub", icon: <GitHubIcon className="h-[18px] w-[18px]" />, href: profile.links.github },
    { label: "Resume", icon: <FileText size={18} />, href: profile.resumeUrl },
    "sep",
    { label: "Search  ⌘K", icon: <Search size={18} />, onClick: onPalette },
    {
      label: theme === "dark" ? "Light mode" : "Dark mode",
      icon: <ThemeIcon theme={theme} />,
      onClick: (e) => toggleTheme(e.clientX, e.clientY),
    },
  ];

  return (
    <motion.nav
      aria-label="Site"
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.8, type: "spring", stiffness: 200, damping: 22 }}
      className="fixed inset-x-0 bottom-5 z-30 flex justify-center px-4"
    >
      <div
        onMouseMove={(e) => mouseX.set(e.clientX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        className="flex h-16 items-end gap-1.5 rounded-2xl border border-line bg-surface/80 px-2.5 sm:gap-2 sm:px-3 pb-2.5 shadow-xl shadow-shadow backdrop-blur-xl"
      >
        {items.map((it, i) =>
          it === "sep" ? (
            <div key={i} className="mx-1 mb-2 hidden h-7 w-px self-end bg-line sm:block" />
          ) : (
            <DockIcon key={it.label} item={it} mouseX={mouseX} />
          )
        )}
      </div>
    </motion.nav>
  );
}

function DockIcon({ item, mouseX }: { item: Item; mouseX: MotionValue<number> }) {
  const ref = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState(false);
  // Slightly smaller icons on narrow phones so the whole dock fits
  const [base, setBase] = useState(40);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 420px)");
    const set = () => setBase(mq.matches ? 35 : 40);
    set();
    mq.addEventListener("change", set);
    return () => mq.removeEventListener("change", set);
  }, []);

  const dist = useTransform(mouseX, (x) => {
    const b = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return x - b.x - b.width / 2;
  });
  const size = useSpring(useTransform(dist, (d) => (Math.abs(d) > 130 ? base : base + (18 * (130 - Math.abs(d))) / 130)), {
    mass: 0.1,
    stiffness: 170,
    damping: 14,
  });

  const inner = (
    <motion.div
      ref={ref}
      style={{ width: size, height: size }}
      className="relative grid place-items-center rounded-xl border border-line bg-surface-2 text-fg/80 transition-colors hover:border-accent/50 hover:text-fg"
      onHoverStart={() => setHover(true)}
      onHoverEnd={() => setHover(false)}
    >
      {item.icon}
      {hover && (
        <motion.span
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="pointer-events-none absolute -top-9 whitespace-pre rounded-md border border-line bg-surface px-2 py-1 text-xs text-fg"
        >
          {item.label}
        </motion.span>
      )}
    </motion.div>
  );

  return item.href ? (
    <a href={item.href} target="_blank" rel="noreferrer" aria-label={item.label}>
      {inner}
    </a>
  ) : (
    <button onClick={item.onClick} aria-label={item.label.trim()}>
      {inner}
    </button>
  );
}

/** Sun/moon that spins as it swaps */
function ThemeIcon({ theme }: { theme: "dark" | "light" }) {
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.span
        key={theme}
        initial={{ rotate: -90, scale: 0.5, opacity: 0 }}
        animate={{ rotate: 0, scale: 1, opacity: 1 }}
        exit={{ rotate: 90, scale: 0.5, opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="grid place-items-center"
      >
        {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
      </motion.span>
    </AnimatePresence>
  );
}
