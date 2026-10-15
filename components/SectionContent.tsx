"use client";

import Link from "next/link";
import { ArrowUpRight, GraduationCap, MapPin, Sparkles } from "lucide-react";
import { education, profile, projects, stack, type Project } from "@/lib/content";
import { routes } from "@/lib/routes";
import { GitHubIcon, LinkedInIcon } from "./BrandIcons";
import CopyEmail from "./CopyEmail";

type Props = {
  route: string;
  /** "panel" = the expanding panel on the home grid, "page" = a full page opened from a link */
  mode: "panel" | "page";
  /** In panel mode, internal links open another panel instead of loading a page */
  onNavigate?: (route: string) => void;
};

/** The content for each page. Shared by the expanding panel and the full page, so they never drift apart. */
export default function SectionContent({ route, mode, onNavigate }: Props) {
  const page = mode === "page";

  const H = ({ children }: { children: React.ReactNode }) =>
    page ? (
      <h1 className="text-balance text-5xl font-semibold tracking-[-0.035em] sm:text-6xl">{children}</h1>
    ) : (
      <h2 className="text-balance text-3xl font-semibold tracking-tight">{children}</h2>
    );

  const InternalLink = ({ href, className, children }: { href: string; className?: string; children: React.ReactNode }) => (
    <Link
      href={href}
      className={className}
      onClick={(e) => {
        if (onNavigate) {
          e.preventDefault();
          onNavigate(href);
        }
      }}
    >
      {children}
    </Link>
  );

  // Two columns on a full page (main + side), one column in the panel
  const Split = ({ main, side }: { main: React.ReactNode; side: React.ReactNode }) => (
    <div className={page ? "grid gap-10 md:grid-cols-[minmax(0,1fr)_260px] md:gap-14" : "space-y-8"}>
      <div className="min-w-0 space-y-8">{main}</div>
      <aside className="min-w-0 space-y-8">{side}</aside>
    </div>
  );

  /* ---------- One project ---------- */
  if (route.startsWith("/projects/")) {
    const p = projects.find((x) => routes.project(x.slug) === route);
    if (!p) return <H>Project not found</H>;
    const featured = p.slug === projects[0].slug;
    return (
      <div className="space-y-10">
        <header className="space-y-4">
          {featured && (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs text-accent">
              <Sparkles size={12} /> Featured project
            </span>
          )}
          <H>{p.name}</H>
          <p className={`max-w-2xl leading-relaxed text-fg/85 ${page ? "text-xl" : "text-lg"}`}>{p.summary}</p>
        </header>

        <Split
          main={
            <>
              {p.description && <p className="max-w-prose leading-relaxed text-muted">{p.description}</p>}
              {p.features && p.features.length > 0 && (
                <section>
                  <Label>What it does</Label>
                  <ul className="grid gap-x-6 gap-y-3 sm:grid-cols-2">
                    {p.features.map((f) => (
                      <li key={f} className="flex gap-3 leading-snug text-fg/85">
                        <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </section>
              )}
            </>
          }
          side={
            <>
              <section>
                <Label>Built with</Label>
                <Chips items={p.stack} />
              </section>
              {(p.repo || p.live) && (
                <section className="flex flex-wrap gap-3">
                  {p.repo && (
                    <a href={p.repo} target="_blank" rel="noreferrer" className="btn">
                      <GitHubIcon className="h-4 w-4" /> View code
                    </a>
                  )}
                  {p.live && (
                    <a href={p.live} target="_blank" rel="noreferrer" className="btn btn-primary">
                      <ArrowUpRight size={16} /> Open live site
                    </a>
                  )}
                </section>
              )}
            </>
          }
        />

        {!page && (
          <div className="border-t border-line pt-6">
            <InternalLink href={routes.projects} className="text-sm text-muted transition hover:text-fg">
              See all projects
            </InternalLink>
          </div>
        )}
      </div>
    );
  }

  switch (route) {
    /* ---------- About ---------- */
    case routes.about:
      return (
        <div className="space-y-10">
          <H>About</H>
          <Split
            main={
              <div className="max-w-prose space-y-4 text-[17px] leading-relaxed text-fg/85">
                <p>{profile.intro}</p>
                <p className="text-muted">
                  Add a few more lines here: what got you into programming, what kind of problems you enjoy, and what
                  you want to work on next.
                </p>
              </div>
            }
            side={
              <dl className="space-y-4 text-sm">
                <Fact icon={<span className="status-dot block h-2 w-2 rounded-full bg-ok" />} label="Status">
                  {profile.status}
                </Fact>
                <Fact icon={<MapPin size={15} />} label="Based in">
                  {profile.location}
                </Fact>
                <Fact icon={<GraduationCap size={15} />} label="Studying">
                  {education[0].detail}
                </Fact>
              </dl>
            }
          />
        </div>
      );

    /* ---------- All projects ---------- */
    case routes.projects:
      return (
        <div className="space-y-8">
          <H>Projects</H>
          <ul className={`grid gap-3 ${page ? "sm:grid-cols-2" : ""}`}>
            {projects.map((p, i) => (
              <li key={p.slug} className={page && i === 0 ? "sm:col-span-2" : ""}>
                <InternalLink
                  href={routes.project(p.slug)}
                  className="group/row flex h-full flex-col gap-4 rounded-2xl border border-line bg-surface-2/60 p-5 transition hover:border-accent/40"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <p className="text-lg font-medium">{p.name}</p>
                      <p className="mt-1 text-sm leading-relaxed text-muted">{p.summary}</p>
                    </div>
                    <ArrowUpRight
                      size={18}
                      className="shrink-0 text-muted transition group-hover/row:-translate-y-0.5 group-hover/row:translate-x-0.5 group-hover/row:text-accent"
                    />
                  </div>
                  <div className="mt-auto flex flex-wrap gap-1.5">
                    {p.stack.slice(0, 5).map((s) => (
                      <span key={s} className="rounded-md border border-line px-2 py-0.5 text-xs text-fg/70">
                        {s}
                      </span>
                    ))}
                  </div>
                </InternalLink>
              </li>
            ))}
          </ul>
        </div>
      );

    /* ---------- Stack ---------- */
    case routes.stack:
      return (
        <div className="space-y-8">
          <H>Stack</H>
          <div className={`grid gap-3 ${page ? "sm:grid-cols-2" : "sm:grid-cols-2"}`}>
            {Object.entries(stack).map(([group, items]) => (
              <section key={group} className="rounded-2xl border border-line bg-surface-2/60 p-5 sm:last:odd:col-span-2">
                <div className="mb-4 flex items-baseline justify-between">
                  <h3 className="font-medium">{group}</h3>
                  <span className="font-mono text-xs tabular-nums text-muted">{items.length}</span>
                </div>
                <Chips items={items} />
              </section>
            ))}
          </div>
        </div>
      );

    /* ---------- Education ---------- */
    case routes.education:
      return (
        <div className="space-y-8">
          <H>Education</H>
          {education.map((e) => (
            <div key={e.place} className="flex gap-4 rounded-2xl border border-line bg-surface-2/60 p-5">
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-line bg-surface text-accent">
                <GraduationCap size={20} />
              </div>
              <div className="space-y-1">
                <p className="text-lg font-medium leading-snug">{e.place}</p>
                <p className="text-fg/80">{e.detail}</p>
                <p className="font-mono text-sm tabular-nums text-muted">{e.years}</p>
              </div>
            </div>
          ))}
        </div>
      );

    /* ---------- Contact ---------- */
    case routes.contact:
      return (
        <div className="space-y-8">
          <H>Say hello</H>
          <p className="max-w-prose leading-relaxed text-muted">
            The fastest way to reach me is email. I usually reply within a day.
          </p>
          <div className="rounded-2xl border border-line bg-surface-2/60 p-5">
            <p className="mb-1 text-sm text-muted">Email</p>
            <p className="select-all break-all text-lg">{profile.email}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <CopyEmail className="btn btn-primary" />
            <a href={profile.links.github} target="_blank" rel="noreferrer" className="btn">
              <GitHubIcon className="h-4 w-4" /> GitHub
            </a>
            <a href={profile.links.linkedin} target="_blank" rel="noreferrer" className="btn">
              <LinkedInIcon className="h-4 w-4" /> LinkedIn
            </a>
          </div>
        </div>
      );

    default:
      return <H>Page not found</H>;
  }
}

function Label({ children }: { children: React.ReactNode }) {
  return <h3 className="mb-3 text-sm text-muted">{children}</h3>;
}

function Chips({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((s) => (
        <span key={s} className="rounded-full border border-line bg-surface px-3 py-1 text-sm text-fg/85">
          {s}
        </span>
      ))}
    </div>
  );
}

function Fact({ icon, label, children }: { icon: React.ReactNode; label: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-3">
      <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center text-muted">{icon}</span>
      <div>
        <dt className="text-muted">{label}</dt>
        <dd className="text-fg/90">{children}</dd>
      </div>
    </div>
  );
}

