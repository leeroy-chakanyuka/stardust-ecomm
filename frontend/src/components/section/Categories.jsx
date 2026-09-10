import Heading from "./headings/Heading";
import ArrowIcon from "../common/ArrowIcon";

const categories = [
  { name: "mens", tile: "bg-[#E8EDF3]" },
  { name: "womens", tile: "bg-[#FBE4E9]" },
  { name: "kids", tile: "bg-[#EFE9DC]" },
  { name: "home", tile: "bg-[#E4E9DF]" },
];

function Categories() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-8 py-16">
        <div className="text-center">
          <Heading title="shop by category" eyebrow="find your thing" />
        </div>
        <ul className="mt-8 grid list-none grid-cols-2 gap-4 p-0 lg:grid-cols-4">
          {categories.map((category) => (
            <li key={category.name}>
              <a
                href={`#${category.name}`}
                className={`group flex aspect-[4/3] items-end rounded-xl p-5 transition-transform hover:-translate-y-1 ${category.tile}`}
              >
                <span className="flex items-center gap-2 font-barlow text-base font-semibold lowercase text-neutral-800">
                  {category.name}
                  <ArrowIcon className="transition-transform group-hover:translate-x-1" />
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default Categories;
