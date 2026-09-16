import { useEffect, useMemo, useState } from "react";
import { useLoaderData, useNavigate, useNavigation } from "react-router-dom";
import Navigation from "../../components/navigation/Navigation";
import Footer from "../../components/footer/Footer";
import Loader from "../../components/common/Loader";
import Stars from "../../components/common/Stars";
import ArrowIcon from "../../components/common/ArrowIcon";
import { COLOR_HEX } from "../../data/taxonomy";

/* we'll randomly cycle through these colors when there arent extra images */
const STARDUST_PALETTE = [
  { name: "blush", hex: "#F4CFCF" },
  { name: "rosewood", hex: "#E8A0B4" },
  { name: "sage", hex: "#C9CFC0" },
  { name: "taupe", hex: "#8A7E78" },
  { name: "cocoa", hex: "#4A3F3A" },
  { name: "milk", hex: "#FAF7F2" },
];

/**
 * Deterministic pseudo-random shuffle seeded by product id so:
 * 1. Colors are uniquely distributed per product
 * 2. They don't change between re-renders/interactions
 */
function getShuffledPalette(seedId = 1) {
  const arr = [...STARDUST_PALETTE];
  let seed =
    typeof seedId === "string"
      ? seedId.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)
      : Number(seedId) || 42;

  for (let i = arr.length - 1; i > 0; i--) {
    seed = (seed * 9301 + 49297) % 233280;
    const j = Math.floor((seed / 233280) * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function fallbackSrc(id) {
  return `https://picsum.photos/seed/stardust-${id}/600/750`;
}

function parseReviewCount(description) {
  const m =
    typeof description === "string" &&
    description.match(/from\s*([\d,]+)\s*verified ratings/i);
  return m ? Number(m[1].replace(/,/g, "")) : undefined;
}

const LABEL_CLASS =
  "font-barlow text-sm font-semibold uppercase tracking-[0.2em] text-neutral-400";

/**
 * Builds gallery slides:
 * - If multi-image product: use the real image URLs.
 * - If single image: 1 real thumbnail + 3 unique color-filled squares = 4 slides.
 */
function buildGallery(product) {
  const realImages =
    product?.images && product.images.length > 1 ? product.images : null;

  if (realImages) {
    return realImages.map((src, i) => ({
      src,
      isColorBlock: false,
      colorHex: COLOR_HEX[product.color?.[i]] ?? null,
      colorName: product.color?.[i] ?? null,
    }));
  }

  // 1 thumbnail + 3 unique color-filled squares
  const singleThumbnail = product?.images?.[0] || product?.thumbnail;
  const uniqueColors = getShuffledPalette(product?.id).slice(0, 3);

  const colorSlides = uniqueColors.map((col, idx) => ({
    src: null,
    isColorBlock: true,
    colorHex: col.hex,
    colorName: col.name,
    label: `Palette color ${idx + 1} (${col.name})`,
  }));

  return [
    {
      src: singleThumbnail,
      isColorBlock: false,
      colorHex: product?.color?.[0]
        ? COLOR_HEX[product.color[0]] ?? null
        : null,
      colorName: product?.color?.[0] ?? null,
    },
    ...colorSlides,
  ];
}

export default function Product() {
  const { product, categoryName } = useLoaderData();
  const navigate = useNavigate();
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  const [selectedColor, setSelectedColor] = useState(
    product?.color?.[0] ?? null,
  );
  const [selectedSize, setSelectedSize] = useState(product?.size?.[0] ?? null);

  // FIX 1: gallery is an Array returned directly from buildGallery
  const gallery = useMemo(() => buildGallery(product), [product]);

  const [activeImage, setActiveImage] = useState(0);
  const [imageVisible, setImageVisible] = useState(true);

  useEffect(() => {
    setSelectedColor(product?.color?.[0] ?? null);
    setSelectedSize(product?.size?.[0] ?? null);
    setActiveImage(0);
    setImageVisible(true);
  }, [product?.id]);

  function handleSelectImage(index) {
    if (index === activeImage) return;
    setImageVisible(false);
    window.setTimeout(() => {
      setActiveImage(index);
      setImageVisible(true);
    }, 150);
  }

  const activeSlide = gallery[activeImage] ?? gallery[0];
  const reviewCount = parseReviewCount(product?.description);
  const details = [
    ["brand", product?.brand],
    ["category", categoryName],
  ].filter(Boolean);

  return (
    <>
      <Navigation />

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="group inline-flex cursor-pointer items-center gap-2 rounded-full border border-neutral-200 bg-white px-4 py-2 font-barlow text-sm font-semibold lowercase tracking-wider text-neutral-600 transition-all hover:border-neutral-900 hover:bg-neutral-900 hover:text-white"
        >
          <ArrowIcon className="h-4 w-4 rotate-180 transition-transform group-hover:-translate-x-0.5" />
          back
        </button>

        {isLoading ? (
          <Loader label="loading product..." />
        ) : (
          <div className="mt-4 grid gap-6 lg:grid-cols-2">
            <div className="flex gap-3">
              {/* Thumbnail Strip: Always 4+ slides */}
              <div className="flex shrink-0 flex-col gap-2">
                {gallery.map((slide, i) => {
                  const selected = i === activeImage;
                  return (
                    <button
                      key={i}
                      type="button"
                      onClick={() => handleSelectImage(i)}
                      aria-label={
                        slide.colorName
                          ? `view ${slide.colorName} slide`
                          : `view slide ${i + 1}`
                      }
                      aria-pressed={selected}
                      title={slide.colorName ?? undefined}
                      className={`h-16 w-14 cursor-pointer overflow-hidden rounded-lg border-2 transition-all sm:h-20 sm:w-16 ${
                        selected
                          ? "border-neutral-900 ring-2 ring-neutral-900/10"
                          : "border-neutral-200 hover:border-neutral-400"
                      }`}
                      style={{
                        backgroundColor: slide.colorHex ?? "transparent",
                      }}
                    >
                      {slide.src ? (
                        <img
                          src={slide.src}
                          alt=""
                          onError={(e) => {
                            const t = e.currentTarget;
                            t.onerror = null;
                            t.src = fallbackSrc(product.id);
                          }}
                          className={`h-full w-full object-cover ${
                            slide.colorHex
                              ? "opacity-80 mix-blend-multiply"
                              : ""
                          }`}
                        />
                      ) : (
                        <div className="h-full w-full" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Main Stage Display */}
              <div className="relative flex-1 overflow-hidden rounded-xl border border-neutral-200 bg-white">
                {/* FIX 2: Check activeSlide.isColorBlock so Slide 0 displays as an image */}
                {activeSlide?.isColorBlock ? (
                  <div
                    key={activeImage}
                    role="img"
                    aria-label={`Color sample ${activeSlide.colorName}`}
                    className={`aspect-square w-full rounded-xl transition-opacity duration-200 ease-out ${
                      imageVisible ? "opacity-100" : "opacity-0"
                    }`}
                    style={{ backgroundColor: activeSlide.colorHex }}
                  />
                ) : (
                  <img
                    key={activeImage}
                    src={activeSlide?.src ?? product?.thumbnail}
                    alt={product?.title}
                    onError={(e) => {
                      const t = e.currentTarget;
                      t.onerror = null;
                      t.src = fallbackSrc(product?.id);
                    }}
                    className={`aspect-[4/5] w-full object-cover transition-opacity duration-200 ease-out ${
                      imageVisible ? "opacity-100" : "opacity-0"
                    } ${activeSlide?.colorHex ? "mix-blend-multiply" : ""}`}
                    style={
                      activeSlide?.colorHex
                        ? { backgroundColor: activeSlide.colorHex }
                        : undefined
                    }
                  />
                )}
              </div>
            </div>

            <div className="rounded-xl border border-neutral-200 bg-white p-6 sm:p-8">
              <p className="font-barlow text-sm font-semibold uppercase tracking-[0.2em] text-neutral-400">
                {product?.brand} &middot; {categoryName}
              </p>
              <h1 className="mt-3 font-display text-4xl font-semibold lowercase tracking-tight text-neutral-800">
                {product?.title}
              </h1>

              <div className="mt-3">
                <Stars
                  value={product?.rating}
                  showValue
                  reviewCount={reviewCount}
                  size={20}
                />
              </div>

              <p className="mt-3 font-barlow text-2xl font-semibold uppercase text-neutral-800">
                R {product?.price?.toFixed(2)}
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

              {(product?.color?.length > 0 || product?.size?.length > 0) && (
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
                          const hex = COLOR_HEX[c] ?? "#FAF7F2";
                          const selected = c === selectedColor;
                          const colorIndex = product.color.indexOf(c);
                          return (
                            <button
                              key={c}
                              type="button"
                              title={c}
                              aria-label={`colour ${c}`}
                              aria-pressed={selected}
                              onClick={() => {
                                setSelectedColor(c);
                                if (
                                  colorIndex >= 0 &&
                                  colorIndex < gallery.length &&
                                  !gallery[colorIndex].isColorBlock
                                ) {
                                  handleSelectImage(colorIndex);
                                }
                              }}
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
