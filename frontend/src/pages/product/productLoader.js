import catalog from "../../data/categories.json";

/* on click / when we are ready to navigate to the product page, we run this func which goes and gets the current product data. */
export async function productLoader({ params }) {
  const id = Number(params.id);

  /* find the prod by id in our cat */
  const product = catalog.products.find((p) => p.id === id) ?? null;
  if (!product) {
    throw new Response("product not found", { status: 404 });
  }

  /* these are used for the description section */
  const category = catalog.categories.find((c) => c.id === product.category_id);
  const typeName =
    category?.types?.find((t) => t.id === product.type_id)?.name ?? null;
  return {
    product,
    categoryName: category?.name ?? "shop",
    categoryPath: category?.path ?? "/shop",
    typeName,
    related: getRelated(product, catalog.products, 8),
  };
}

// TODO: MOVE THIS ALGO TO THE BACKEND
/* you may also like algo - will most likely be moved to the backend */
function getRelated(product, allProducts, limit = 8) {
  const priceOf = (p) => Number(p.price) || 0;
  const basePrice = priceOf(product) || 1;
  const baseColors = new Set(product.color || []);

  const scored = [];
  /* grab all products */
  for (const p of allProducts) {
    if (p.id === product.id) continue; /* not the current product */
    let score = 0;
    /* same type_id : + 3 */
    if (p.type_id === product.type_id) score += 3;
    /* same category_id : + 2 */
    if (p.category_id === product.category_id) score += 2;
    /* same gender : + 1 */
    if (p.gender && p.gender === product.gender) score += 1;
    /* shared color : + 1 */
    if ((p.color || []).some((c) => baseColors.has(c))) score += 1;
    /* close price (within 30% of base price) : + 1 */
    const diff = Math.abs(priceOf(p) - basePrice) / basePrice;
    if (diff <= 0.3) score += 1;
    /* pop in array */
    scored.push({ p, score });
  }

  scored.sort((a, b) => {
    /* sort by score */
    if (b.score !== a.score) return b.score - a.score;
    const rb = Number(b.p.rating) || 0;
    const ra = Number(a.p.rating) || 0;

    /* or instead, sort by rating */
    if (rb !== ra) return rb - ra;

    /* all else fails, sort by id - ascending order */

    return a.p.id - b.p.id;
  });

  return scored.slice(0, limit).map((s) => s.p);
}
