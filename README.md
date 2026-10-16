# Stardust Ecomm

Base monorepo for Stardust Ecomm inside `city-mart`.

## Structure

```text
stardust-ecomm/
  frontend/   # React + Vite + Tailwind v4 app
  backend/    # Java 21 + Spring Boot + MySQL API
  database/   # Versioned MySQL schema, catalog seed, and offline conversion tools
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

### Backend (Java 21 + Spring Boot + MySQL 8)

1. Copy `backend/.env.example` to `backend/.env` and set the database connection
   variables. `MEDIA_BASE_URL` defaults to `/images` for local product crops.
2. Apply the SQL before starting the backend; Hibernate now validates the schema:
   - **New database:** apply `database/migrations/V001__baseline.sql`, then
     `V002__ordered_product_media_and_colors.sql`. Load
     `database/seeds/catalog.sql` once into an empty catalog for the 850-product dataset.
   - **Existing Hibernate-created database:** compare the baseline and apply
     **only V002**. See [database setup and migration instructions](database/README.md).
3. Start from `backend/`:

   ```bash
   mvn spring-boot:run
   ```

Alternatively, import the catalog during an explicit startup. Apply the migrations first,
then run this from `backend/` with an empty catalog:

```powershell
mvn spring-boot:run "-Dspring-boot.run.arguments=--app.seed.enabled=true"
```

`CatalogSeedRunner` is disabled by default. Its SQL path defaults to
`../database/seeds/catalog.sql`, relative to the working directory. Override it
with `CATALOG_SEED_PATH` or `--app.seed.path=/absolute/path/to/catalog.sql`.
An enabled seed run fails on a missing/unreadable file or SQL error. The seed is
INSERT-only; import it once, then use the normal startup command.

Product API responses include ordered images, available sizes, and catalog
`colors` independently of inventory variants. Numeric source IDs are supported
at `GET /api/products/get/legacy/{legacyId}`; UUID lookup remains
`GET /api/products/get/{uuid}`. Product pagination starts at page `0`.

Approved local crops can be published from the repository root with:

```bash
python -B database/generate_catalog.py --copy-media
```

These files are gitignored under `frontend/public/images/products/`. Existing
absolute original-image URLs pass through the API unchanged. Generated crop keys
such as `products/1-center.jpg` resolve against `MEDIA_BASE_URL`; set it to the
public S3/CDN base later while keeping the same object keys.

Backend tests run from `backend/` with `mvn test`, using an isolated in-memory
database. The optional `python -B database/verify_mysql.py` command verifies the
SQL in disposable local MySQL databases; see the database README for details.

## Scripts (frontend)

- `npm run dev` — start Vite dev server
- `npm run build` — production build
- `npm run preview` — preview production build
- `npm run lint` — run ESLint
