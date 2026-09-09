# Stardust Ecomm

Base monorepo for Stardust Ecomm inside `city-mart`.

## Structure

```text
stardust-ecomm/
  frontend/   # React + Vite + Tailwind v4 app
  backend/    # Empty — reserved for future backend
```

## Getting started

### Frontend (React + Vite + Tailwind v4)

```bash
cd frontend
npm install
npm run dev
```

Styling: Tailwind v4 via `@tailwindcss/vite` (`frontend/vite.config.js`),
theme tokens in `frontend/src/index.css` (`@theme`) mirrored in
`frontend/tailwind.config.js`. Fonts (Google): Space Grotesk (display),
Inter (body), JetBrains Mono (mono).

### Backend

Reserved. Nothing here yet.

## Scripts (frontend)

- `npm run dev` — start Vite dev server
- `npm run build` — production build
- `npm run preview` — preview production build
- `npm run lint` — run ESLint
