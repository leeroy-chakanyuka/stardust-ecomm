import { useState } from "react";
import { Link } from "react-router-dom";
import Navigation from "../../components/navigation/Navigation";
import Footer from "../../components/footer/Footer";
import catalog from "../../data/categories.json";
import { GENDERS, getTypeLabel, priceBoundsFor } from "../../data/taxonomy";
import Categories from "../../components/filters/Categories";
import Colors from "../../components/filters/Colors";
import Prices from "../../components/filters/Prices";

export default function Shop() {
  const allProducts = catalog.products;

  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedGenders, setSelectedGenders] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [priceRange, setPriceRange] = useState(null);

  const toggleType = (id) =>
    setSelectedTypes((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id],
    );

  const toggleGender = (id) =>
    setSelectedGenders((prev) =>
      prev.includes(id) ? prev.filter((g) => g !== id) : [...prev, id],
    );

  const toggleColor = (id) =>
    setSelectedColors((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id],
    );

  /* map every type id to its display name, so shop-all can list types */
  const typeNameById = new Map();
  catalog.categories.forEach((c) => {
    c.types.forEach((t) => {
      if (!typeNameById.has(t.id))
        typeNameById.set(t.id, getTypeLabel(t.id, t.name));
    });
  });

  /* gender options present in the full list, in men/women/kids/unisex order */
  const availableGenders = GENDERS.map((g) => ({
    ...g,
    count: allProducts.filter((p) => p.gender === g.id).length,
  })).filter((g) => g.count > 0);

  /* aggregate whatever types appear in the full list */
  const counts = {};
  allProducts.forEach((p) => {
    counts[p.type_id] = (counts[p.type_id] ?? 0) + 1;
  });
  const availableTypes = Object.entries(counts)
    .map(([id, count]) => ({
      id: Number(id),
      name: typeNameById.get(Number(id)) ?? `type ${id}`,
      count,
    }))
    .sort((a, b) => a.name.localeCompare(b.name));

  /* price rail bounds for this list */
  const priceBounds = priceBoundsFor(allProducts);

  /* color options present in the full list */
  const colorCounts = {};
  allProducts.forEach((p) => {
    (p.color || []).forEach((c) => {
      colorCounts[c] = (colorCounts[c] ?? 0) + 1;
    });
  });
  const availableColors = Object.entries(colorCounts)
    .map(([name, count]) => ({ id: name, name, count }))
    .sort((a, b) => a.name.localeCompare(b.name));

  /* apply the checked type + gender + color + price filters, if any */
  const products = allProducts.filter(
    (p) =>
      (selectedTypes.length === 0 || selectedTypes.includes(p.type_id)) &&
      (selectedGenders.length === 0 || selectedGenders.includes(p.gender)) &&
      (selectedColors.length === 0 ||
        (p.color || []).some((c) => selectedColors.includes(c))) &&
      (!priceRange || (p.price >= priceRange[0] && p.price <= priceRange[1])),
  );

  return (
    <>
      <Navigation />

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-6 lg:px-8 xl:max-w-[1400px] 2xl:max-w-[1600px]">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start xl:gap-6">
          <aside className="w-full shrink-0 rounded-xl border border-neutral-200 bg-white p-2 [scrollbar-width:none] sm:p-3 lg:sticky lg:top-28 lg:max-h-[calc(100vh-8rem)] lg:w-60 lg:overflow-y-auto xl:w-72 2xl:w-80 [&::-webkit-scrollbar]:hidden">
            <p className="font-barlow text-xs font-semibold uppercase tracking-[0.2em] text-neutral-400">
              stardust shop
            </p>
            <h1 className="mt-2 font-display text-3xl font-semibold lowercase tracking-tight text-neutral-800">
              shop all
            </h1>
            <p className="mt-3 font-barlow text-sm lowercase text-neutral-600">
              {products.length} products across all categories
            </p>
            <Prices
              bounds={priceBounds}
              value={priceRange}
              onChange={setPriceRange}
              onClear={() => setPriceRange(null)}
              collapsible={false}
            />
            <Categories
              title="gender"
              types={availableGenders}
              selected={selectedGenders}
              onToggle={toggleGender}
              onClear={() => setSelectedGenders([])}
            />
            <Categories
              title="style"
              types={availableTypes}
              selected={selectedTypes}
              onToggle={toggleType}
              onClear={() => setSelectedTypes([])}
            />
            <Colors
              types={availableColors}
              selected={selectedColors}
              onToggle={toggleColor}
              onClear={() => setSelectedColors([])}
            />
          </aside>

          <div className="min-w-0 flex-1">
            {products.length === 0 ? (
              <p className="font-barlow text-sm lowercase text-neutral-600">
                no products here yet.
              </p>
            ) : (
              <ul className="grid list-none grid-cols-2 gap-2.5 p-0 sm:grid-cols-3 sm:gap-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
                {products.map((product) => (
                  <li
                    key={product.id}
                    className="overflow-hidden rounded-lg border border-neutral-200 bg-white"
                  >
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                      loading="lazy"
                      onError={(e) => {
                        const t = e.currentTarget;
                        t.onerror = null;
                        t.src = `https://picsum.photos/seed/stardust-${product.id}/600/750`;
                      }}
                      className="aspect-[4/5] w-full object-cover"
                    />
                    <div className="p-3">
                      <p className="font-barlow text-[11px] font-semibold uppercase tracking-[0.15em] text-neutral-400">
                        {product.brand}
                      </p>
                      <h2 className="mt-0.5 truncate font-barlow text-sm font-semibold lowercase text-neutral-800">
                        {product.title}
                      </h2>
                      <p className="mt-0.5 font-barlow text-xs uppercase text-neutral-600">
                        R {product.price.toFixed(2)}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
            <Link
              to="/"
              className="mt-8 inline-block font-barlow text-base font-semibold lowercase tracking-wider text-rose-500 transition-colors hover:text-rose-600"
            >
              back home
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
