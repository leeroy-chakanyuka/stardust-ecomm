import CarouselImport from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Heading from "./headings/Heading";
import Card from "../card/card";
import jeansImg from "../../assets/img/jeans.jpg";
import teeImg from "../../assets/img/tee.jpeg";
import dressImg from "../../assets/img/dress.jpg";
import shortsImg from "../../assets/img/shorts.jpg";
import flowerPotImg from "../../assets/img/flower_pot.jpg";

const Carousel = CarouselImport?.default ?? CarouselImport;

const responsive = {
  desktop: { breakpoint: { max: 3000, min: 1024 }, items: 3 },
  tablet: { breakpoint: { max: 1024, min: 640 }, items: 2 },
  mobile: { breakpoint: { max: 640, min: 0 }, items: 1 },
};

const items = [
  { name: " t-shirts      ", tag: "womens", image: teeImg },
  { name: "jeans", tag: "mens", image: jeansImg },
  { name: "summer dresses", tag: "womens", image: dressImg },
  { name: "shorts", tag: "mens", image: shortsImg },
  { name: "flower_pot", tag: "home", image: flowerPotImg },
];

function NewArrivals() {
  return (
    <section className="bg-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-1 py-16 lg:grid-cols-[1fr_2fr]">
        {/* heading third */}
        <div className="text-center lg:text-left">
          <Heading title="new arrivals" eyebrow="just landed" />
          <p className="mt-3 font-barlow text-sm lowercase text-neutral-600">
            fresh picks across home and wardrobe.
          </p>
          <a
            href="#shop"
            className="mt-5 inline-block font-barlow text-base font-semibold lowercase tracking-wider text-rose-500 transition-colors hover:text-rose-600"
          >
            shop all
          </a>
        </div>
        {/* cards two-thirds */}
        <Carousel
          autoPlay={false}
          swipeable={true}
          draggable={false}
          responsive={responsive}
          infinite={false}
        >
          {items.map((item) => (
            <div key={item.name} className="px-3">
              <Card title={item.name} image={item.image} />
            </div>
          ))}
        </Carousel>
      </div>
    </section>
  );
}

export default NewArrivals;
