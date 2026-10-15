"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { education, profile, projects, stack, type Project } from "@/lib/content";
import { routes } from "@/lib/routes";
import { GitHubIcon, LinkedInIcon } from "./BrandIcons";
import CopyEmail from "./CopyEmail";

type Props = {
  route: string;
  /** "panel" = shown in the expanding panel on the home grid, "page" = shown as a full page */
  mode: "panel" | "page";
  /** In panel mode, internal links open another panel instead of loading a page */
  onNavigate?: (route: string) => void;
};

/** The content for each page. Shared by the expanding panel and the full page, so they never drift apart. */
export default function SectionContent({ route, mode, onNavigate }: Props) {
  const big = mode === "page";
  const H = ({ children }: { children: React.ReactNode }) =>
    big ? (
      <h1 className="mb-8 text-5xl font-semibold tracking-[-0.03em] sm:text-6xl">{children}</h1>
    ) : (
      <h2 className="mb-6 text-3xl font-semibold tracking-tight">{children}</h2>
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

  if (route.startsWith("/projects/")) {
    const p = projects.find((x) => routes.project(x.slug) === route);
    if (!p) return <H>Project not found</H>;
    return (
      <>
        <H>{p.name}</H>
        <ProjectBlock p={p} />
        <div className="mt-10 border-t border-line pt-6">
          <InternalLink href={routes.projects} className="text-sm text-muted transition hover:text-fg">
            See all projects
          </InternalLink>
        </div>
      </>
    );
  }

  switch (route) {
    case routes.about:
      return (
        <>
          <H>About</H>
          <div className="max-w-prose space-y-4 text-[17px] leading-relaxed text-fg/85">
            <p>{profile.intro}</p>
            <p className="text-muted">
              Add a few more lines here: what got you into programming, what kind of problems you enjoy, and what you
              want to work on next.
            </p>
          </div>
        </>
      );
    case routes.projects:
      return (
        <>
          <H>Projects</H>
          <ul className="divide-y divide-line">
            {projects.map((p) => (
              <li key={p.slug}>
                <InternalLink
                  href={routes.project(p.slug)}
                  className="group/row -mx-3 flex items-center justify-between gap-4 rounded-xl px-3 py-5 transition hover:bg-surface-2"
                >
                  <div className="min-w-0">
                    <p className="text-lg font-medium">{p.name}</p>
                    <p className="truncate text-sm text-muted">{p.summary}</p>
                  </div>
                  <ArrowUpRight
                    size={18}
                    className="shrink-0 text-muted transition group-hover/row:-translate-y-0.5 group-hover/row:translate-x-0.5 group-hover/row:text-accent"
                  />
                </InternalLink>
              </li>
            ))}
          </ul>
        </>
      );
    case routes.stack:
      return (
        <>
          <H>Stack</H>
          <div className="space-y-6">
            {Object.entries(stack).map(([group, items]) => (
              <div key={group}>
                <h3 className="mb-3 text-sm text-muted">{group}</h3>
                <Chips items={items} />
              </div>
            ))}
          </div>
        </>
      );
    case routes.education:
      return (
        <>
          <H>Education</H>
          {education.map((e) => (
            <div key={e.place} className="space-y-1">
              <p className="text-lg font-medium">{e.place}</p>
              <p className="text-fg/80">{e.detail}</p>
              <p className="text-sm text-muted">{e.years}</p>
            </div>
          ))}
        </>
      );
    case routes.contact:
      return (
        <>
          <H>Say hello</H>
          <p className="mb-2 leading-relaxed text-muted">The fastest way to reach me is email. I usually reply within a day.</p>
          <p className="mb-6 select-all font-mono text-sm text-fg/90">{profile.email}</p>
          <div className="flex flex-wrap gap-3">
            <CopyEmail className="btn btn-primary" />
            <a href={profile.links.github} target="_blank" rel="noreferrer" className="btn">
              <GitHubIcon className="h-4 w-4" /> GitHub
            </a>
            <a href={profile.links.linkedin} target="_blank" rel="noreferrer" className="btn">
              <LinkedInIcon className="h-4 w-4" /> LinkedIn
            </a>
          </div>
        </>
      );
    default:
      return <H>Page not found</H>;
  }
}

function Chips({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((s) => (
        <span key={s} className="rounded-full border border-line bg-surface-2 px-3 py-1 text-sm text-fg/85">
          {s}
        </span>
      ))}
    </div>
  );
}

function ProjectBlock({ p }: { p: Project }) {
  return (
    <div className="space-y-4">
      <p className="text-lg leading-relaxed text-fg/90">{p.summary}</p>
      <p className="max-w-prose leading-relaxed text-muted">{p.description}</p>
      <Chips items={p.stack} />
      <div className="flex gap-3 pt-2">
        {p.repo && (
          <a href={p.repo} target="_blank" rel="noreferrer" className="btn">
            <GitHubIcon className="h-4 w-4" /> View code
          </a>
        )}
        {p.live && (
          <a href={p.live} target="_blank" rel="noreferrer" className="btn">
            <ArrowUpRight size={16} /> Open live site
          </a>
        )}
      </div>
    </div>
  );
}
