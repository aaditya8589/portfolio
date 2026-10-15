import type { Metadata } from "next";
import FullPage from "@/components/FullPage";
import { profile } from "@/lib/content";
import { routes } from "@/lib/routes";

export const metadata: Metadata = { title: `About · ${profile.name}` };

export default function Page() {
  return <FullPage route={routes.about} />;
}
