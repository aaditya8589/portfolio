import { projects } from "./content";

/** Every page on the site. Each one works as an expanding panel on the home grid AND as a full page. */
export const routes = {
  about: "/about",
  projects: "/projects",
  project: (slug: string) => `/projects/${slug}`,
  stack: "/stack",
  education: "/education",
  contact: "/contact",
};

export const featuredRoute = routes.project(projects[0].slug);

/** Which grid tile a page expands out of (for the shared animation). Pages without a tile just fade in. */
export function tileForRoute(route: string): string | null {
  const map: Record<string, string> = {
    [routes.about]: "about",
    [featuredRoute]: "codesync",
    [routes.projects]: "projects",
    [routes.stack]: "stack",
    [routes.education]: "education",
    [routes.contact]: "contact",
  };
  return map[route] ?? null;
}

export function titleForRoute(route: string): string {
  if (route.startsWith("/projects/")) {
    const p = projects.find((x) => routes.project(x.slug) === route);
    return p?.name ?? "Project";
  }
  const titles: Record<string, string> = {
    [routes.about]: "About",
    [routes.projects]: "Projects",
    [routes.stack]: "Stack",
    [routes.education]: "Education",
    [routes.contact]: "Contact",
  };
  return titles[route] ?? "";
}
