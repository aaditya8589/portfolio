# Aaditya Agarwal — portfolio

Next.js + Tailwind CSS + Framer Motion + Lenis.

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Edit the content

All text (name, intro, projects, stack, education, links, email) lives in `lib/content.ts`. Lines marked `TODO` still need your real details.

## Change the colors

The palette is at the top of `app/globals.css`: dark values under `@theme`, light values under `:root[data-theme="light"]`. Change `--color-accent` in both to recolor the whole site.

## Dark and light mode

The sun/moon button at the end of the dock (and "Switch to light mode" in ⌘K) toggles the theme. A first-time visitor gets whatever their device is set to; after that, their choice is remembered.

## Pages

Every tile has a real URL: `/about`, `/projects`, `/projects/<slug>`, `/stack`, `/education`, `/contact`.

- Clicking a tile on the home grid opens it as an expanding panel and updates the address bar.
- Opening that URL directly (a shared link, a bookmark, a search result) shows it as a full page.
- Back and forward buttons open and close panels.

To add a project, add an entry to `projects` in `lib/content.ts` with a new `slug`. Its page is created automatically.

## Where things are

| File | What it does |
|---|---|
| `components/Portfolio.tsx` | The bento grid and every tile |
| `components/Panels.tsx` | The expanding panel on the home grid |
| `components/FullPage.tsx` | The standalone page layout for a URL opened directly |
| `components/SectionContent.tsx` | The content of each page, shared by the panel and the full page |
| `lib/routes.ts` | The list of pages and which tile each one expands from |
| `components/Dock.tsx` | Floating bottom dock with magnify-on-hover |
| `components/CommandPalette.tsx` | ⌘K / Ctrl+K menu |
| `lib/theme.ts` | Theme toggle, the circular reveal animation, and remembering the choice |
| `components/Background.tsx` | Dot grid that lights up under the cursor, plus smooth scroll |

## Deploy

Push to GitHub, then import the repo on vercel.com. No settings needed.
