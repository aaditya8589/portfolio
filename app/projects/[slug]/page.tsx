import type { Metadata } from "next";
import { notFound } from "next/navigation";
import FullPage from "@/components/FullPage";
import { profile, projects } from "@/lib/content";
import { routes } from "@/lib/routes";

type Params = { params: Promise<{ slug: string }> };

// Build one page per project at build time: /projects/codesync, /projects/second-project, …
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  return { title: p ? `${p.name} · ${profile.name}` : profile.name, description: p?.summary };
}

export default async function Page({ params }: Params) {
  const { slug } = await params;
  if (!projects.some((p) => p.slug === slug)) notFound();
  return <FullPage route={routes.project(slug)} />;
}
