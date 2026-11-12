# seating display

Guest-facing "find your seat" page: type your name, tap the result, and see your table highlighted on the floor plan. No import screen — the seating data is bundled into the app at build time from an export produced by the companion [seating-plan](https://github.com/supat0417/seating-plan) app.

React + TypeScript + Vite, organized as:

- `src/domain/` — pure business logic (floorplan/guest models, theme color math, bundled-data validation, i18n dictionaries). No React/DOM dependency; covered by Vitest.
- `src/data/` — the bundled seating data (`seating-data.json`) and its typed loader.
- `src/ui/` — React components, organized by feature (`hero/`, `search/`, `chips/`, `plan/`).

## Updating the displayed data

Place the exported `data.json` from seating-plan-app in `public/data.json`. The display loads this file when the page opens, so you can update the seating plan without rebuilding the app. If `public/data.json` is missing or invalid, it falls back to `src/data/seating-data.json`.

The export includes the floor plan, guests, theme, language, and optional embedded logo. Deploy `public/data.json` alongside the built display app.

## Event path

When the deployed `data.json` has a `"path"` field, the deploy workflow:

- builds the app with `--base=/seating-display/<path>/`
- publishes it at `https://vowsandvic.github.io/seating-display/<path>/`

The bare `/seating-display/` then returns 404. Pages serves only one site, so the previous event's path stops working. With no `path`, the app is published at `/seating-display/` as before. An invalid path fails the build. The run summary shows the live URL.

The **QR** button next to the language toggle shows a QR code for the current page, so guests can pass the link to the people with them. From the same screen they can also share or copy the link, or save the QR as an image.

## Development

```bash
npm install
npm run dev      # dev server
npm test         # domain-layer unit tests
npm run build    # production build to dist/
```

Deploys automatically to GitHub Pages on push to `main` (see `.github/workflows/deploy.yml`).
