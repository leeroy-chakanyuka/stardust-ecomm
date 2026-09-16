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
    typeName,
  };
}
