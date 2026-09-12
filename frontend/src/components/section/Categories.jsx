import { Link } from "react-router-dom";
import Heading from "./headings/Heading";
import ArrowIcon from "../common/ArrowIcon";
import TeeIcon from "../common/TeeIcon";
import BagIcon from "../common/BagIcon";
import TeddyIcon from "../common/TeddyIcon";
import MugIcon from "../common/MugIcon";
import catalog from "../../data/categories.json";

/* maybe find images for these later  */
const tileByCode = {
  TEES: { tile: "bg-[#E8EDF3]", Icon: TeeIcon },
  JEANS: { tile: "bg-[#EFE9DC]", Icon: TeeIcon },
  SHIRTS: { tile: "bg-[#FBE4E9]", Icon: TeeIcon },
  SHORTS: { tile: "bg-[#E4E9DF]", Icon: TeeIcon },
  HOODIES: { tile: "bg-[#E8EDF3]", Icon: TeeIcon },
  DRESSES: { tile: "bg-[#FBE4E9]", Icon: BagIcon },
  TOPS: { tile: "bg-[#EFE9DC]", Icon: BagIcon },
  TRACKPANTS: { tile: "bg-[#E4E9DF]", Icon: TeeIcon },
  TROUSERS: { tile: "bg-[#E8EDF3]", Icon: TeeIcon },
  SHOES: { tile: "bg-[#FBE4E9]", Icon: BagIcon },
  ACCESSORIES: { tile: "bg-[#EFE9DC]", Icon: BagIcon },
  LOUNGEWEAR: { tile: "bg-[#E4E9DF]", Icon: TeeIcon },
  JACKETS: { tile: "bg-[#E8EDF3]", Icon: TeeIcon },
  HOME: { tile: "bg-[#E4E9DF]", Icon: MugIcon },
  KIDSSETS: { tile: "bg-[#EFE9DC]", Icon: TeddyIcon },
};

function Categories() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-8 py-16">
        <div className="text-center">
          <Heading title="shop by category" eyebrow="find your thing" />
        </div>
        <ul className="mt-8 grid list-none grid-cols-2 gap-4 p-0 lg:grid-cols-5">
          {catalog.categories.map((category) => {
            const ui = tileByCode[category.code] ?? tileByCode.TEES;
            const Icon = ui.Icon;
            return (
              <li key={category.id}>
                <Link
                  to={category.path}
                  className={`group relative flex aspect-[4/3] items-end overflow-hidden rounded-xl p-5 transition-transform hover:-translate-y-1 ${ui.tile}`}
                >
                  <div className="absolute inset-0 flex items-center justify-center text-[#4A3F3A]">
                    <Icon />
                  </div>
                  <span className="relative flex items-center gap-2 font-barlow text-base font-semibold lowercase text-neutral-800">
                    {category.name}
                    <ArrowIcon className="transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

export default Categories;
