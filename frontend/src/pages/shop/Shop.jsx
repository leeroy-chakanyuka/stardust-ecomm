import { Link } from "react-router-dom";
import Navigation from "../../components/navigation/Navigation";
import Footer from "../../components/footer/Footer";
import catalog from "../../data/categories.json";

export default function Shop() {
  const products = catalog.products;

  return (
    <>
      <Navigation />
      <main className="mx-auto w-full max-w-6xl flex-1 px-8 py-16">
        <p className="font-barlow text-xs font-semibold uppercase tracking-[0.2em] text-neutral-400">
          stardust shop
        </p>
        <h1 className="mt-2 font-display text-3xl font-semibold lowercase tracking-tight text-neutral-800">
          shop all
        </h1>
        <p className="mt-3 font-barlow text-sm lowercase text-neutral-600">
          {products.length} products across all categories
        </p>
        <ul className="mt-8 grid list-none grid-cols-2 gap-4 p-0 lg:grid-cols-4">
          {products.map((product) => (
            <li
              key={product.id}
              className="overflow-hidden rounded-xl border border-neutral-200 bg-white"
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
              <div className="p-4">
                <p className="font-barlow text-xs font-semibold uppercase tracking-[0.2em] text-neutral-400">
                  {product.brand}
                </p>
                <h2 className="mt-1 font-barlow text-base font-semibold lowercase text-neutral-800">
                  {product.title}
                </h2>
                <p className="mt-1 font-barlow text-sm lowercase text-neutral-600">
                    R {product.price.toFixed(2)}
                </p>
              </div>
            </li>
          ))}
        </ul>
        <Link
          to="/"
          className="mt-8 inline-block font-barlow text-base font-semibold lowercase tracking-wider text-rose-500 transition-colors hover:text-rose-600"
        >
          back home
        </Link>
      </main>
      <Footer />
    </>
  );
}
