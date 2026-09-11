import { Link, useParams } from "react-router-dom";
import Navigation from "../../components/navigation/Navigation";
import Footer from "../../components/footer/Footer";

export default function ProductList() {
  const { category } = useParams();
  const title = category ?? "shop all";

  return (
    <>
      <Navigation />
      <main className="mx-auto w-full max-w-6xl flex-1 px-8 py-16">
        <p className="font-barlow text-xs font-semibold uppercase tracking-[0.2em] text-neutral-400">
          stardust
        </p>
        <h1 className="mt-2 font-display text-3xl font-semibold lowercase tracking-tight text-neutral-800">
          {title}
        </h1>
        <p className="mt-3 font-barlow text-sm lowercase text-neutral-600">
          showing products for {title}.
        </p>
        <Link
          to="/"
          className="mt-5 inline-block font-barlow text-base font-semibold lowercase tracking-wider text-rose-500 transition-colors hover:text-rose-600"
        >
          back home
        </Link>
      </main>
      <Footer />
    </>
  );
}
