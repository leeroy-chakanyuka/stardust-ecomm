import { useEffect, useState } from "react";
import { useLoaderData, useNavigate, useNavigation } from "react-router-dom";
import Navigation from "../../components/navigation/Navigation";
import Footer from "../../components/footer/Footer";
import Loader from "../../components/common/Loader";
import Stars from "../../components/common/Stars";
import { COLOR_HEX } from "../../data/taxonomy";

function fallbackSrc(id) {
  return `https://picsum.photos/seed/stardust-${id}/600/750`;
}

/* Descriptions are upstream rating summaries ("Brand · 4.1 stars from
 * 5,300 verified ratings") — the count is parsed out for the Stars row
 * instead of rendering the raw text twice. */
function parseReviewCount(description) {
  const m =
    typeof description === "string" &&
    description.match(/from\s*([\d,]+)\s*verified ratings/i);
  return m ? Number(m[1].replace(/,/g, "")) : undefined;
}

/* Section heading style shared with the colours / sizes blocks. */
const LABEL_CLASS =
  "font-barlow text-sm font-semibold uppercase tracking-[0.2em] text-neutral-400";

export default function Product() {
  const { product, categoryName, typeName } = useLoaderData();
  const navigate = useNavigate();
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";
  const [selectedColor, setSelectedColor] = useState(product.color?.[0] ?? null);
  const [selectedSize, setSelectedSize] = useState(product.size?.[0] ?? null);
  useEffect(() => {
    setSelectedColor(product.color?.[0] ?? null);
    setSelectedSize(product.size?.[0] ?? null);
  }, [product.id]);
  const reviewCount = parseReviewCount(product.description);
  const details = [
    ["brand", product.brand],
    ["category", categoryName],
  ].filter(Boolean);

  return (
    <>
      <Navigation />

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="cursor-pointer font-barlow text-sm font-semibold lowercase tracking-wider text-rose-500 transition-colors hover:text-rose-600"
        >
          &larr; back
        </button>

        {isLoading ? (
          <Loader label="loading product..." />
        ) : (
          <div className="mt-4 grid gap-6 lg:grid-cols-2">
            <div className="overflow-hidden rounded-xl border border-neutral-200 bg-white">
              <img
                src={product.thumbnail}
                alt={product.title}
                onError={(e) => {
                  const t = e.currentTarget;
                  t.onerror = null;
                  t.src = fallbackSrc(product.id);
                }}
                className="aspect-[4/5] w-full object-cover"
              />
            </div>

            <div className="rounded-xl border border-neutral-200 bg-white p-6 sm:p-8">
              <p className="font-barlow text-sm font-semibold uppercase tracking-[0.2em] text-neutral-400">
                {product.brand} &middot; {categoryName}
              </p>
              <h1 className="mt-3 font-display text-4xl font-semibold lowercase tracking-tight text-neutral-800">
                {product.title}
              </h1>

              <div className="mt-3">
                <Stars
                  value={product.rating}
                  showValue
                  reviewCount={reviewCount}
                  size={20}
                />
              </div>

              <p className="mt-3 font-barlow text-2xl font-semibold uppercase text-neutral-800">
                R {product.price.toFixed(2)}
              </p>

              <div className="mt-6 space-y-2 border-t border-neutral-100 pt-6">
                <p className={LABEL_CLASS}>details</p>
                {details.map(([term, desc]) => (
                  <div key={term} className="flex gap-2">
                    <span className="w-24 shrink-0 font-barlow text-base lowercase text-neutral-400">
                      {term}:
                    </span>
                    <span className="font-barlow text-base lowercase text-neutral-800">
                      {desc}
                    </span>
                  </div>
                ))}
              </div>

              {(product.color?.length > 0 || product.size?.length > 0) && (
                <div className="mt-6 space-y-5">
                  {product.color?.length > 0 && (
                    <div>
                      <p className={LABEL_CLASS}>
                        colours
                        {selectedColor && (
                          <span className="ml-2 normal-case tracking-normal text-neutral-500">
                            : {selectedColor}
                          </span>
                        )}
                      </p>
                      <div className="mt-3 flex flex-wrap gap-3">
                        {product.color.map((c) => {
                          const hex = COLOR_HEX[c] ?? "#e5e4e7";
                          const selected = c === selectedColor;
                          return (
                            <button
                              key={c}
                              type="button"
                              title={c}
                              aria-label={`colour ${c}`}
                              aria-pressed={selected}
                              onClick={() => setSelectedColor(c)}
                              style={{ backgroundColor: hex }}
                              className={`h-10 w-10 cursor-pointer rounded-full border border-neutral-300 transition-transform hover:scale-110 ${
                                selected
                                  ? "ring-2 ring-neutral-900 ring-offset-2"
                                  : ""
                              }`}
                            />
                          );
                        })}
                      </div>
                    </div>
                  )}
                  {product.size?.length > 0 && (
                    <div>
                      <p className={LABEL_CLASS}>sizes</p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {product.size.map((s) => {
                          const selected = s === selectedSize;
                          return (
                            <button
                              key={s}
                              type="button"
                              aria-pressed={selected}
                              onClick={() => setSelectedSize(s)}
                              className={`cursor-pointer rounded-lg border px-4 py-2 font-barlow text-sm uppercase transition-colors ${
                                selected
                                  ? "border-neutral-900 bg-neutral-900 text-white"
                                  : "border-neutral-200 text-neutral-700 hover:border-neutral-400"
                              }`}
                            >
                              {s}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              )}

              <button
                type="button"
                className="mt-8 w-full rounded-xl bg-neutral-900 px-4 py-4 font-barlow text-base font-semibold lowercase tracking-wider text-white transition-colors hover:bg-neutral-700"
              >
                add to bag
              </button>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
