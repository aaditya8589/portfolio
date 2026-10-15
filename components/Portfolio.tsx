"use client";

import { LayoutGroup } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowUpRight, GraduationCap, Layers, MapPin } from "lucide-react";
import Tile from "./Tile";
import Panels from "./Panels";
import Dock from "./Dock";
import CommandPalette from "./CommandPalette";
import CopyEmail from "./CopyEmail";
import { GitHubIcon } from "./BrandIcons";
import { education, profile, projects, stack } from "@/lib/content";
import { featuredRoute, routes } from "@/lib/routes";

// The live preview runs inside a sandbox where URLs can't change, so it skips the URL updates.
const URL_SYNC = process.env.NEXT_PUBLIC_PREVIEW !== "1";

export default function Portfolio() {
  const [open, setOpen] = useState<string | null>(null);
  const [palette, setPalette] = useState(false);
  const pushed = useRef(0); // how many history entries we've added since the grid was showing

  // Open a page as a panel on top of the grid, and put its real URL in the address bar.
  const openTile = useCallback((route: string) => {
    setPalette(false);
    setOpen(route);
    if (URL_SYNC && window.location.pathname !== route) {
      window.history.pushState(null, "", route);
      pushed.current += 1;
    }
  }, []);

  // Close the panel and put the address bar back to "/".
  const close = useCallback(() => {
    setOpen(null);
    if (!URL_SYNC) return;
    if (pushed.current > 0) {
      const n = pushed.current;
      pushed.current = 0;
      window.history.go(-n);
    } else {
      window.history.replaceState(null, "", "/");
    }
  }, []);

  // Browser back/forward buttons open and close panels.
  useEffect(() => {
    if (!URL_SYNC) return;
    const onPop = () => {
      const path = window.location.pathname.replace(/\/$/, "") || "/";
      pushed.current = Math.max(0, pushed.current - 1);
      setOpen(path === "/" ? null : path);
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const featured = projects[0];
  const others = projects.slice(1);
  const stackPreview = Object.values(stack).flat().slice(0, 8);

  return (
    <LayoutGroup>
      <main className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-4 pb-32 pt-10 sm:px-6 sm:pt-16">
        <div className="grid auto-rows-[minmax(160px,auto)] sm:auto-rows-[minmax(190px,auto)] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {/* Intro */}
          <Tile id="about" index={0} span="sm:col-span-2 sm:row-span-2" onOpen={() => openTile(routes.about)} label="About me">
            <div className="flex h-full flex-col justify-between gap-10">
              <span className="inline-flex w-fit items-center gap-2 rounded-full border border-ok/25 bg-ok/5 px-3 py-1 text-xs text-ok">
                <span className="status-dot h-1.5 w-1.5 rounded-full bg-ok" />
                {profile.status}
              </span>
              <div>
                <h1 className="text-5xl font-semibold leading-[0.95] tracking-[-0.04em] sm:text-6xl lg:text-7xl">
                  {profile.name.split(" ").map((w) => (
                    <span key={w} className="block">
                      {w}
                    </span>
                  ))}
                </h1>
                <p className="mt-5 max-w-md text-[15px] leading-relaxed text-muted">{profile.intro}</p>
              </div>
              <div className="flex items-center justify-between text-sm text-muted">
                <span>{profile.role}</span>
                <span className="hidden items-center gap-1.5 md:inline-flex">
                  <span className="kbd">⌘</span>
                  <span className="kbd">K</span>
                </span>
              </div>
            </div>
          </Tile>

          {/* Featured project */}
          <Tile id="codesync" index={1} span="sm:col-span-2 sm:row-span-2" onOpen={() => openTile(featuredRoute)} label="Open CodeSync">
            <div className="flex h-full flex-col gap-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted">Featured project</p>
                  <h2 className="mt-1 text-3xl font-semibold tracking-tight">{featured.name}</h2>
                </div>
                <ArrowUpRight className="text-muted transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
              </div>
              <EditorMock />
              <p className="max-w-md text-[15px] leading-relaxed text-muted">{featured.summary}</p>
            </div>
          </Tile>

          {/* Local time */}
          <Tile id="time" index={2}>
            <Clock />
          </Tile>

          {/* Stack */}
          <Tile id="stack" index={3} onOpen={() => openTile(routes.stack)} label="Open stack">
            <div className="flex h-full flex-col justify-between gap-4">
              <div className="flex items-center gap-2 text-sm text-muted">
                <Layers size={15} /> Stack
              </div>
              <div className="flex flex-wrap gap-1.5">
                {stackPreview.map((s) => (
                  <span key={s} className="rounded-md border border-line bg-surface-2 px-2 py-0.5 text-xs text-fg/80">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </Tile>

          {/* GitHub */}
          <Tile id="github" index={4}>
            <a
              href={profile.links.github}
              target="_blank"
              rel="noreferrer"
              className="flex h-full flex-col justify-between"
              aria-label="GitHub profile"
            >
              <div className="flex items-start justify-between">
                <GitHubIcon className="h-7 w-7 text-fg/90" />
                <ArrowUpRight size={18} className="text-muted transition group-hover:text-accent" />
              </div>
              <div>
                <p className="font-medium">GitHub</p>
                <p className="text-sm text-muted">@{profile.links.github.split("/").pop()}</p>
              </div>
            </a>
          </Tile>

          {/* Contact */}
          <Tile id="contact" index={5} onOpen={() => openTile(routes.contact)} label="Open contact">
            <div className="flex h-full flex-col justify-between gap-4">
              <p className="text-2xl font-semibold leading-tight tracking-tight">
                Have something
                <br />
                in mind?
              </p>
              <CopyEmail className="btn btn-primary w-fit" />
            </div>
          </Tile>

          {/* Other projects */}
          <Tile id="projects" index={6} span="sm:col-span-2" onOpen={() => openTile(routes.projects)} label="Open all projects">
            <div className="flex h-full flex-col gap-4">
              <div className="flex items-center justify-between text-sm text-muted">
                <span>More projects</span>
                <span className="transition group-hover:text-fg">See all</span>
              </div>
              <ul className="divide-y divide-line">
                {others.map((p) => (
                  <li key={p.name} className="flex items-baseline justify-between gap-4 py-3 first:pt-0 last:pb-0">
                    <span className="shrink-0 font-medium">{p.name}</span>
                    <span className="truncate text-sm text-muted">{p.summary}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Tile>

          {/* Education */}
          <Tile id="education" index={7} span="sm:col-span-2" onOpen={() => openTile(routes.education)} label="Open education">
            <div className="flex h-full flex-col justify-between gap-4">
              <div className="flex items-center gap-2 text-sm text-muted">
                <GraduationCap size={15} /> Education
              </div>
              <div>
                <p className="text-lg font-medium">{education[0].place}</p>
                <p className="text-sm text-muted">{education[0].detail}</p>
              </div>
            </div>
          </Tile>
        </div>
      </main>

      <Panels route={open} onClose={close} onNavigate={openTile} showFullPageButton={URL_SYNC} />
      <Dock
        onOpen={openTile}
        onHome={() => {
          setOpen(null);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        onPalette={() => setPalette(true)}
      />
      <CommandPalette open={palette} setOpen={setPalette} onOpenTile={openTile} />
    </LayoutGroup>
  );
}

/** Live local time — small detail that makes the page feel alive. */
function Clock() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  const time = now?.toLocaleTimeString("en-IN", {
    timeZone: "Asia/Kolkata",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
  return (
    <div className="flex h-full flex-col justify-between">
      <div className="flex items-center gap-2 text-sm text-muted">
        <MapPin size={15} /> {profile.location}
      </div>
      <div>
        <p className="font-mono text-4xl font-medium tabular-nums tracking-tight">{time ?? "--:--"}</p>
        <p className="mt-1 text-sm text-muted">Local time</p>
      </div>
    </div>
  );
}

/** Abstract editor with two live cursors — a visual nod to "sync". */
function EditorMock() {
  const lines = [
    [18, 34, 22],
    [10, 46],
    [10, 20, 30],
    [26, 18],
    [10, 38, 14],
    [18, 24],
  ];
  return (
    <div className="relative flex-1 overflow-hidden rounded-xl border border-line bg-bg/70 p-4">
      <div className="mb-4 flex gap-1.5">
        <span className="h-2.5 w-2.5 rounded-full bg-line" />
        <span className="h-2.5 w-2.5 rounded-full bg-line" />
        <span className="h-2.5 w-2.5 rounded-full bg-line" />
      </div>
      <div className="space-y-2.5">
        {lines.map((segs, i) => (
          <div key={i} className="flex items-center gap-2">
            <span className="w-4 text-right font-mono text-[10px] text-muted/60">{i + 1}</span>
            {segs.map((w, j) => (
              <span
                key={j}
                className="h-2 rounded-full"
                style={{
                  width: `${w}%`,
                  background:
                    j === 0 && i % 2 === 0
                      ? "color-mix(in srgb, var(--color-accent) 50%, transparent)"
                      : j === 1
                        ? "var(--color-code-1)"
                        : "var(--color-code-2)",
                }}
              />
            ))}
            {i === 1 && <Cursor color="var(--color-accent)" name="you" />}
            {i === 4 && <Cursor color="var(--color-accent-2)" name="teammate" />}
          </div>
        ))}
      </div>
    </div>
  );
}

function Cursor({ color, name }: { color: string; name: string }) {
  return (
    <span className="relative inline-flex h-4 items-center">
      <span className="h-4 w-0.5 animate-pulse rounded-full" style={{ background: color }} />
      <span
        className="absolute -top-5 left-0 whitespace-nowrap rounded px-1.5 py-0.5 text-[10px] font-medium text-white"
        style={{ background: color }}
      >
        {name}
      </span>
    </span>
  );
}
