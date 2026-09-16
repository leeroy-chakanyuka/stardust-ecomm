
/* catalogue carries a discount % on most products, but only about 30%
 * of products should render as on-sale we pick that subset deterministically
 * product id (Knuth hash, ~29% of ids), so its
 * stable across renders, routes and sessions without storing anything
 */

export function isDiscounted(product) {
  const id = Number(product?.id) || 0;
  return (Math.imul(id, 2654435761) >>> 0) % 10 < 3;
}

/* since the dataset only gives us the discounted price, we calc original*/
export function originalPrice(product) {
  if (!isDiscounted(product)) return null;
  const discount = Number(product?.discount) || 0;
  if (discount <= 0 || discount >= 90) return null;
  return product.price / (1 - discount / 100);
}
