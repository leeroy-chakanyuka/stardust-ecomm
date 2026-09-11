import { Link } from "react-router-dom";
import Heading from "./headings/Heading";
import ArrowIcon from "../common/ArrowIcon";
import TeeIcon from "../common/TeeIcon";
import BagIcon from "../common/BagIcon";
import TeddyIcon from "../common/TeddyIcon";
import MugIcon from "../common/MugIcon";

const categories = [
  { name: "men", slug: "mens", tile: "bg-[#E8EDF3]", Icon: TeeIcon },
  { name: "women", slug: "womens", tile: "bg-[#FBE4E9]", Icon: BagIcon },
  { name: "kids", slug: "kids", tile: "bg-[#EFE9DC]", Icon: TeddyIcon },
  { name: "home", slug: "home", tile: "bg-[#E4E9DF]", Icon: MugIcon },
];

function Categories() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-8 py-16">
        <div className="text-center">
          <Heading title="shop by category" eyebrow="find your thing" />
        </div>
        <ul className="mt-8 grid list-none grid-cols-2 gap-4 p-0 lg:grid-cols-4">
          {categories.map((category) => (
            <li key={category.slug}>
              <Link
                to={`/shop/${category.slug}`}
                className={`group relative flex aspect-[4/3] items-end overflow-hidden rounded-xl p-5 transition-transform hover:-translate-y-1 ${category.tile}`}
              >
                <div className="absolute inset-0 flex items-center justify-center text-[#4A3F3A]">
                  <category.Icon />
                </div>
                <span className="relative flex items-center gap-2 font-barlow text-base font-semibold lowercase text-neutral-800">
                  {category.name}
                  <ArrowIcon className="transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default Categories;
