import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Navigation from "../../components/navigation/Navigation";
import Footer from "../../components/footer/Footer";
import catalog from "../../data/categories.json";
import Categories from "../../components/filters/Categories";

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
};

export default function ProductList() {
  /* destructure the category but name it slug, then find the category,
   * if not category is found, check if we can just return gendered clothes instead */
  const { category: slug } = useParams();
  const category = findCategory(slug);
  const gender = !category ? FIELDS[slug?.toLowerCase()] : undefined;

  const [selectedTypes, setSelectedTypes] = useState([]);

  /* if we change the category ie men to women, reset the filters */
  useEffect(() => {
    setSelectedTypes([]);
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

  /* map every type id to its name, so shop-all can list types */
  const typeNameById = new Map();
  catalog.categories.forEach((c) => {
    c.types.forEach((t) => {
      if (!typeNameById.has(t.id)) typeNameById.set(t.id, t.name);
    });
  });

  /* pretty simple, just create a map for the types in the product array */
  let availableTypes;
  if (category?.types?.length) {
    availableTypes = category.types.map((t) => ({
      id: t.id,
      name: t.name,
      count: allProducts.filter((p) => p.type_id === t.id).length,
    }));
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

  /* apply the checked type filters, if any */
  const products =
    selectedTypes.length > 0
      ? allProducts.filter((p) => selectedTypes.includes(p.type_id))
      : allProducts;

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
            <div className="lg:sticky lg:top-0 z-10 -mx-2 bg-white px-2 pb-3 pt-2 sm:-mx-3 sm:px-3 sm:pt-3">
              <p className="font-barlow text-xs font-semibold uppercase tracking-[0.2em] text-neutral-400">
                {category?.code ?? "stardust shop"}
              </p>
              <h1 className="mt-2 font-display text-3xl font-semibold lowercase tracking-tight text-neutral-800">
                {title}
              </h1>
              <p className="mt-3 font-barlow text-sm lowercase text-neutral-600">
                {description}
              </p>
            </div>
            <Categories
              types={availableTypes}
              selected={selectedTypes}
              onToggle={toggleType}
              onClear={() => setSelectedTypes([])}
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
