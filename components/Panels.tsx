"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { Maximize2, X } from "lucide-react";
import Link from "next/link";
import { tileForRoute, titleForRoute } from "@/lib/routes";
import SectionContent from "./SectionContent";

type Props = {
  route: string | null;
  onClose: () => void;
  onNavigate: (route: string) => void;
  showFullPageButton?: boolean;
};

/** The expanding panel shown on top of the home grid. It grows out of the tile that was clicked. */
export default function Panels({ route, onClose, onNavigate, showFullPageButton = true }: Props) {
  useEffect(() => {
    if (!route) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [route, onClose]);

  const tile = route ? tileForRoute(route) : null;

  return (
    <AnimatePresence>
      {route && (
        <div className="fixed inset-0 z-40 grid place-items-center p-4 sm:p-8">
          <motion.div
            className="absolute inset-0 bg-overlay backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            key={tile ? undefined : route}
            layoutId={tile ? `tile-${tile}` : undefined}
            initial={tile ? undefined : { opacity: 0, scale: 0.96 }}
            animate={tile ? undefined : { opacity: 1, scale: 1 }}
            exit={tile ? undefined : { opacity: 0, scale: 0.97 }}
            style={{ borderRadius: 26 }}
            role="dialog"
            aria-modal="true"
            aria-label={titleForRoute(route)}
            data-lenis-prevent
            className="relative z-10 max-h-[85vh] w-full max-w-2xl overflow-y-auto border border-line bg-surface p-7 shadow-2xl shadow-shadow sm:p-10"
          >
            <div className="absolute right-5 top-5 flex gap-2">
              {showFullPageButton && (
              <Link
                href={route}
                onClick={(e) => {
                  // full reload so it shows the standalone page, exactly as a shared link would
                  e.preventDefault();
                  window.location.reload();
                }}
                aria-label="Open as full page"
                title="Open as full page"
                className="rounded-full border border-line p-2 text-muted transition hover:border-accent/60 hover:text-fg"
              >
                <Maximize2 size={16} />
              </Link>
              )}
              <button
                onClick={onClose}
                aria-label="Close"
                className="rounded-full border border-line p-2 text-muted transition hover:border-accent/60 hover:text-fg"
              >
                <X size={16} />
              </button>
            </div>
            <motion.div
              key={route}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.15 } }}
              exit={{ opacity: 0, transition: { duration: 0.1 } }}
            >
              <SectionContent route={route} mode="panel" onNavigate={onNavigate} />
            </motion.div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
