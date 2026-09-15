import catalog from "../../data/categories.json";

/* Route loader: react-router runs this before rendering on click / direct visit.
 * Throwing a Response gives us the 404 path for a bad id. */
export async function productLoader({ params }) {
  const id = Number(params.id);
  const product = catalog.products.find((p) => p.id === id) ?? null;
  if (!product) {
    throw new Response("product not found", { status: 404 });
  }
  const category = catalog.categories.find(
    (c) => c.id === product.category_id,
  );
  const typeName =
    category?.types?.find((t) => t.id === product.type_id)?.name ?? null;
  return {
    product,
    categoryName: category?.name ?? "shop",
    typeName,
  };
}
