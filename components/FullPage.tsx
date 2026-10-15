"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { profile } from "@/lib/content";
import Background from "./Background";
import CommandPalette from "./CommandPalette";
import Dock from "./Dock";
import SectionContent from "./SectionContent";

/** What a shared link like /projects/codesync shows when opened fresh: a standalone page with the same look. */
export default function FullPage({ route }: { route: string }) {
  const router = useRouter();
  const [palette, setPalette] = useState(false);
  const go = (r: string) => {
    setPalette(false);
    router.push(r);
  };

  return (
    <>
      <Background />
      <div className="relative z-10 mx-auto max-w-3xl px-5 pb-40 pt-10 sm:px-8 sm:pt-16">
        <motion.header
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 flex items-center justify-between"
        >
          <Link
            href="/"
            className="group inline-flex items-center gap-2 rounded-full border border-line bg-surface/70 px-3.5 py-1.5 text-sm text-muted backdrop-blur-sm transition hover:border-accent/50 hover:text-fg"
          >
            <ArrowLeft size={15} className="transition group-hover:-translate-x-0.5" />
            {profile.name}
          </Link>
          <button onClick={() => setPalette(true)} className="hidden items-center gap-1.5 text-muted sm:inline-flex" aria-label="Open command menu">
            <span className="kbd">⌘</span>
            <span className="kbd">K</span>
          </button>
        </motion.header>

        <motion.main
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
        >
          <SectionContent route={route} mode="page" />
        </motion.main>
      </div>

      <Dock onOpen={go} onHome={() => router.push("/")} onPalette={() => setPalette(true)} />
      <CommandPalette open={palette} setOpen={setPalette} onOpenTile={go} />
    </>
  );
}
