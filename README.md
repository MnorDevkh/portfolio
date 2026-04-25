# Boeurn Mnor — portfolio (client-only)

This repository is a **100% static** single-page portfolio: **no backend, no server-side code**, and no private APIs. Everything runs in the browser from the built `dist/` assets.

## Scripts

| Command        | Description                                      |
| -------------- | ------------------------------------------------ |
| `npm run dev`  | Local development server                         |
| `npm run build`| Generates PWA icons, type-checks, production build |
| `npm run preview` | Serves the production build locally           |

## PDF export

The **Download PDF** / **Export resume** actions generate **`BoeurnMnor_Final.pdf`** in the browser using [html2pdf.js](https://github.com/eKoopmans/html2pdf.js) (html2canvas + jsPDF). The export targets a dedicated off-screen `#pdf-root` block with print-oriented styling to reduce awkward page breaks.

If a browser produces a cramped PDF, try desktop Chrome or Edge; you can also use the browser’s **Print → Save as PDF** on the same page as a fallback (the filename may not match in that flow).

## Progressive Web App (PWA)

The app is installable and works offline after the first successful load.

### What is implemented

- **`manifest.webmanifest`** — generated at build time via [vite-plugin-pwa](https://vite-pwa-org.netlify.app/) with `name`, `short_name`, `theme_color`, `background_color`, `display: standalone`, icons (192 / 512 / maskable), `start_url`, and `scope` (both `./` so they resolve correctly under a GitHub Pages subpath).
- **Service worker** — Workbox `generateSW` precaches built static assets and registers a **navigation route** to `index.html` so reloads work offline (SPA shell).
- **Registration** — `virtual:pwa-register` in [`src/main.ts`](src/main.ts) with `immediate: true` and `registerType: 'autoUpdate'` so updates are picked up after new deploys.

### Install on mobile

1. Open the deployed HTTPS URL in Chrome (Android) or Safari (iOS).
2. Use **Add to Home screen** / **Install app** from the browser menu.
3. Launch from the home screen; the site should open standalone.

### After each deploy

Most users receive the new precache automatically. If something looks stale, clear **site data** for the origin or uninstall/reinstall the PWA.

### Lighthouse PWA score

Scores depend on hosting (HTTPS), real icon assets, manifest validity, and service worker control. This setup follows common PWA checks; run Lighthouse in Chrome DevTools on the **deployed** HTTPS URL (not `file://`) for an accurate PWA category score.

## GitHub Pages (GitHub Actions)

The workflow [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) builds on every push to `main` or `master` and deploys with **GitHub’s official Pages actions** (artifact + `deploy-pages`).

### One-time repository settings

1. **Settings → Pages → Build and deployment**
2. Set **Source** to **GitHub Actions** (not “Deploy from a branch” unless you switch workflows).

### Base path (`VITE_BASE_PATH`)

The workflow sets `VITE_BASE_PATH` automatically:

- **Project site** (`https://<user>.github.io/<repo>/`): base is `/<repo>/`.
- **User site** (repository named `<user>.github.io`): base is `/`.

This keeps asset URLs and the PWA manifest aligned with where the app is hosted.

### Alternative: `gh-pages` branch

If you prefer publishing only the `gh-pages` branch, replace the deploy job with an action such as [peaceiris/actions-gh-pages](https://github.com/peaceiris/actions-gh-pages) that pushes `dist/` to `gh-pages`, and set Pages **Source** to that branch. Keep the same `VITE_BASE_PATH` rules in the build step.

## Project structure

- [`src/App.vue`](src/App.vue) — page layout, PDF trigger, sections
- [`src/components/PdfResume.vue`](src/components/PdfResume.vue) — hidden `#pdf-root` used for PDF layout
- [`src/lib/exportPdf.ts`](src/lib/exportPdf.ts) — `BoeurnMnor_Final.pdf` download
- [`vite.config.ts`](vite.config.ts) — `base` from `VITE_BASE_PATH`, PWA plugin
- [`scripts/generate-pwa-icons.mjs`](scripts/generate-pwa-icons.mjs) — writes PNGs under `public/icons/` before build

## License

Private portfolio project; adjust as needed.
