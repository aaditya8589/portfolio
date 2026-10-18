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

/**
 * What a shared link like /projects/codesync shows when opened fresh.
 * Same card look as the panel on the home grid, just roomier. The dock handles moving between sections.
 */
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
      <div className="relative z-10 mx-auto max-w-5xl px-4 pb-36 pt-6 sm:px-6 sm:pt-10">
        <motion.header
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-5 flex items-center"
        >
          <Link
            href="/"
            className="group inline-flex items-center gap-2 rounded-full border border-line bg-surface/70 px-3.5 py-1.5 text-sm text-muted backdrop-blur-sm transition hover:border-accent/50 hover:text-fg"
          >
            <ArrowLeft size={15} className="transition group-hover:-translate-x-0.5" />
            {profile.name}
          </Link>
        </motion.header>

        <motion.main
          initial={{ opacity: 0, y: 16, scale: 0.99 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{ borderRadius: 28 }}
          className="border border-line bg-surface/85 p-6 shadow-2xl shadow-shadow backdrop-blur-md sm:p-10 md:p-14"
        >
          <SectionContent route={route} mode="page" />
        </motion.main>

      </div>

      <Dock onOpen={go} onHome={() => router.push("/")} onPalette={() => setPalette(true)} />
      <CommandPalette open={palette} setOpen={setPalette} onOpenTile={go} />
    </>
  );
}
