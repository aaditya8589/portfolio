"use client";

import { useEffect, useState } from "react";

export type Theme = "dark" | "light";
import { THEME_KEY as KEY } from "./theme-script";
const EVENT = "themechange";

export function currentTheme(): Theme {
  return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}

function apply(t: Theme) {
  document.documentElement.dataset.theme = t;
  try {
    localStorage.setItem(KEY, t);
  } catch {}
  window.dispatchEvent(new Event(EVENT));
}

/**
 * Switch theme. If the browser supports view transitions, the new theme
 * spreads out in a circle from (x, y) — usually where the button was clicked.
 */
export function toggleTheme(x?: number, y?: number) {
  const next: Theme = currentTheme() === "dark" ? "light" : "dark";
  const doc = document as Document & { startViewTransition?: (cb: () => void) => { ready: Promise<void> } };
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!doc.startViewTransition || reduce) {
    apply(next);
    return;
  }

  const cx = x ?? window.innerWidth / 2;
  const cy = y ?? window.innerHeight / 2;
  const r = Math.hypot(Math.max(cx, window.innerWidth - cx), Math.max(cy, window.innerHeight - cy));

  const vt = doc.startViewTransition(() => apply(next));
  vt.ready
    .then(() => {
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${cx}px ${cy}px)`, `circle(${r}px at ${cx}px ${cy}px)`] },
        { duration: 650, easing: "cubic-bezier(0.65, 0, 0.35, 1)", pseudoElement: "::view-transition-new(root)" }
      );
    })
    .catch(() => {});
}

/** Current theme, kept in sync across every component that uses it. */
export function useTheme(): Theme {
  const [theme, setTheme] = useState<Theme>("dark");
  useEffect(() => {
    const sync = () => setTheme(currentTheme());
    sync();
    window.addEventListener(EVENT, sync);
    return () => window.removeEventListener(EVENT, sync);
  }, []);
  return theme;
}
