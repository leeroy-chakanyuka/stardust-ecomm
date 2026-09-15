import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Navigation from "../../components/navigation/Navigation";
import Footer from "../../components/footer/Footer";
import catalog from "../../data/categories.json";
import { GENDERS, SIZE_GROUPS, getTypeLabel, priceBoundsFor } from "../../data/taxonomy";
import Categories from "../../components/filters/Categories";
import Colors from "../../components/filters/Colors";
import Sizes from "../../components/filters/Sizes";
import Prices from "../../components/filters/Prices";
import Loader from "../../components/common/Loader";

/* make the recieved url parameter lowercase then look for a category match in recieved data it could from clicking category
 * to illustrate, our data would look something like this:
 *   "categories": [
 *    {
 *      "id": 1,
 *      "name": "Tees",
 *      "code": "TEES",
 *      "path": "/shop/tees",
 *      "description": "T-shirts for everyone",
 *      "types": [],
 *      "meta_data": {
 *        "colors": [],
 *        "sizes": []
 *      }
 *    }
 */
function findCategory(slug) {
  if (!slug) return null;
  const lower = slug.toLowerCase();
  return (
    catalog.categories.find(
      (c) =>
        c.path.toLowerCase() === `/shop/${lower}` ||
        c.code.toLowerCase() === lower ||
        c.name.toLowerCase() === lower,
    ) ?? null
  );
}

const FIELDS = {
  men: "men",
  mens: "men",
  women: "women",
  womens: "women",
  kids: "kids",
  kid: "kids",
  unisex: "unisex",
};

export default function ProductList() {
  /* destructure the category but name it slug, then find the category,
   * if not category is found, check if we can just return gendered clothes instead */
  const { category: slug } = useParams();
  const category = findCategory(slug);
  const gender = !category ? FIELDS[slug?.toLowerCase()] : undefined;

  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedGenders, setSelectedGenders] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [priceRange, setPriceRange] = useState(null);
  const [pendingId, setPendingId] = useState(null);

  /* if we change the category ie men to women, reset the filters */
  useEffect(() => {
    setSelectedTypes([]);
    setSelectedGenders([]);
    setSelectedColors([]);
    setSelectedSizes([]);
    setPriceRange(null);
  }, [slug]);

  /* category exists, so just return products filtered by this category id */
  const allProducts = category
    ? catalog.products.filter((p) => p.category_id === category.id)
    : gender /* category does not exist so check if gender is defined and return by that instead */
      ? catalog.products.filter((p) => p.gender === gender)
      : catalog.products; /* both are falsy so return ALL products */

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

  const toggleSize = (id) =>
    setSelectedSizes((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id],
    );

  /* map every type id to its display name, so shop-all can list types */
  const typeNameById = new Map();
  catalog.categories.forEach((c) => {
    c.types.forEach((t) => {
      if (!typeNameById.has(t.id))
        typeNameById.set(t.id, getTypeLabel(t.id, t.name));
    });
  });

  /* gender options present in this list, in men/women/kids/unisex order */
  const availableGenders = GENDERS.map((g) => ({
    ...g,
    count: allProducts.filter((p) => p.gender === g.id).length,
  })).filter((g) => g.count > 0);

  /* price rail bounds for this list */
  const priceBounds = priceBoundsFor(allProducts);

  /* color options present in this list */
  const colorCounts = {};
  allProducts.forEach((p) => {
    (p.color || []).forEach((c) => {
      colorCounts[c] = (colorCounts[c] ?? 0) + 1;
    });
  });
  const availableColors = Object.entries(colorCounts)
    .map(([name, count]) => ({ id: name, name, count }))
    .sort((a, b) => a.name.localeCompare(b.name));

  /* size sections present in this list */
  const sizeCounts = {};
  allProducts.forEach((p) => {
    (p.size || []).forEach((s) => {
      sizeCounts[s] = (sizeCounts[s] ?? 0) + 1;
    });
  });
  const availableSizeGroups = SIZE_GROUPS.map((g) => ({
    ...g,
    types: g.sizes
      .filter((s) => (sizeCounts[s] ?? 0) > 0)
      .map((s) => ({ id: s, name: s, count: sizeCounts[s] })),
  })).filter((g) => g.types.length > 0);

  /* pretty simple, just create a map for the types in the product array */
  let availableTypes;
  if (category?.types?.length) {
    availableTypes = category.types
      .map((t) => ({
        id: t.id,
        name: getTypeLabel(t.id, t.name),
        count: allProducts.filter((p) => p.type_id === t.id).length,
      }))
      .filter((t) => t.count > 0);
  } else {
    const counts = {};
    allProducts.forEach((p) => {
      counts[p.type_id] = (counts[p.type_id] ?? 0) + 1;
    });
    availableTypes = Object.entries(counts)
      .map(([id, count]) => ({
        id: Number(id),
        name: typeNameById.get(Number(id)) ?? `type ${id}`,
        count,
      }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }

  /* apply the checked type + gender + color + size + price filters, if any */
  const products = allProducts.filter(
    (p) =>
      (selectedTypes.length === 0 || selectedTypes.includes(p.type_id)) &&
      (selectedGenders.length === 0 || selectedGenders.includes(p.gender)) &&
      (selectedColors.length === 0 ||
        (p.color || []).some((c) => selectedColors.includes(c))) &&
      (selectedSizes.length === 0 ||
        (p.size || []).some((s) => selectedSizes.includes(s))) &&
      (!priceRange || (p.price >= priceRange[0] && p.price <= priceRange[1])),
  );

  let title;
  /* a break from ternaries */
  if (category?.name) {
    title = category.name;
  } else if (gender) {
    title = gender[0].toUpperCase() + gender.slice(1);
  } else {
    title = "shop all";
  }

  const description = category?.description ?? `${products.length} products`;

  return (
    <>
      <Navigation />

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-6 lg:px-8 xl:max-w-[1400px] 2xl:max-w-[1600px]">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start xl:gap-6">
          <aside className="w-full shrink-0 rounded-xl border border-neutral-200 bg-white p-2 [scrollbar-width:none] sm:p-3 lg:sticky lg:top-28 lg:max-h-[calc(100vh-8rem)] lg:w-60 lg:overflow-y-auto xl:w-72 2xl:w-80 [&::-webkit-scrollbar]:hidden">
            <p className="font-barlow text-xs font-semibold uppercase tracking-[0.2em] text-neutral-400">
              {category?.code ?? "stardust shop"}
            </p>
            <h1 className="mt-2 font-display text-3xl font-semibold lowercase tracking-tight text-neutral-800">
              {title}
            </h1>
            <p className="mt-3 font-barlow text-sm lowercase text-neutral-600">
              {description}
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
            <Sizes
              groups={availableSizeGroups}
              selected={selectedSizes}
              onToggle={toggleSize}
              onClear={() => setSelectedSizes([])}
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
                    className="relative overflow-hidden rounded-lg border border-neutral-200 bg-white transition-shadow hover:shadow-md"
                  >
                    <Link
                      to={`/product/${product.id}`}
                      onClick={() => setPendingId(product.id)}
                      aria-label={`view ${product.title}`}
                      className="block"
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
                    </Link>
                    {pendingId === product.id && (
                      <div className="absolute inset-0 flex items-center justify-center bg-white/80">
                        <Loader label="loading..." />
                      </div>
                    )}
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
