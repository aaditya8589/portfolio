"use client";

import { motion } from "framer-motion";
import type { ReactNode, MouseEvent, KeyboardEvent } from "react";

type Props = {
  id: string;
  index: number;
  className?: string;
  span?: string;
  onOpen?: () => void;
  label?: string;
  children: ReactNode;
};

/** A bento card. Glows under the cursor; if `onOpen` is set it expands into a full panel. */
export default function Tile({ id, index, className = "", span = "", onOpen, label, children }: Props) {
  const track = (e: MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--tx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--ty", `${e.clientY - r.top}px`);
  };
  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    if (onOpen && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      onOpen();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ delay: 0.15 + index * 0.06, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={span}
    >
      <motion.div
        layoutId={`tile-${id}`}
        onMouseMove={track}
        onClick={onOpen}
        onKeyDown={onKey}
        role={onOpen ? "button" : undefined}
        tabIndex={onOpen ? 0 : undefined}
        aria-label={label}
        style={{ borderRadius: 22 }}
        className={`tile group h-full overflow-hidden border border-line bg-surface/75 p-6 backdrop-blur-sm transition-colors ${
          onOpen ? "cursor-pointer hover:bg-surface/75" : ""
        } ${className}`}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
