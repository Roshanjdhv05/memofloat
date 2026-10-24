# MemoFloat landing page

React + TypeScript + Tailwind CSS (Vite). No runtime animation libraries: all motion is CSS and respects `prefers-reduced-motion`.

## Run it

```bash
npm install
npm run dev      # local dev server
npm run build    # type-check + production build into dist/
npm run preview  # preview the production build
```

## Before you publish

Open `src/config.ts` and replace the placeholder links (`DOWNLOAD_URL`, `SUPPORT_URL`, `PRIVACY_URL`, `TERMS_URL`) with your real destinations. The nav and hero "Get MemoFloat" buttons scroll to the final call-to-action; the final button uses `DOWNLOAD_URL`.

The FAQ intentionally says that supported platforms and pricing are listed on the download page, because those details were not provided. Update `src/components/Faq.tsx` once you have them.

## Structure

- `public/logo.png`, `logo-sm.png`: your sticky-note logo (resized copies)
- `src/components/EdgeTabs.tsx`: the Strand / Semi-Circle tab layout engine
- `src/components/NavStyles.tsx`: the interactive toggle section
- `tailwind.config.js`: palette (cream, butter, candy, mint, sky, espresso) and keyframes
