import heroNoButton from "../../assets/img/hero_no_button.png";

function HeroPill({ className = "" }) {
  return (
    <div
      className={`overflow-hidden rounded-full border-2 border-rose-400 font-barlow text-sm font-semibold lowercase tracking-wider ${className}`}
    >
      <a
        href="#discover"
        className="w-1/3 bg-rose-400 px-4 py-3 text-center text-white transition-colors hover:bg-rose-500"
      >
        discover
      </a>
      <a
        href="#shop"
        className="flex-1 bg-white/70 px-4 py-3 text-center text-rose-500 transition-colors hover:bg-rose-50"
      >
        shop now
      </a>
    </div>
  );
}

function Hero() {
  return (
    <section className="flex min-h-[calc(100svh-6rem)] flex-1 flex-col justify-center bg-[#FAF7F2]">
      {/* will look into making this more responsive when the time avails itself
       * we render at full viewport, also look into getting a higher resolution image */}
      <div className="relative mx-auto w-full max-w-6xl">
        <img
          src={heroNoButton}
          alt="mega september sale, september 12 to 18 — clothing, cosmetics, electronics and furniture on campaign"
          className="block w-full"
        />
        {/* the buttons we generated */}
        <HeroPill className="absolute left-[16.5%] top-[70.5%] hidden w-[23%] lg:inline-flex" />
      </div>

      <div className="flex justify-center px-8 pb-10 lg:hidden">
        <HeroPill className="flex w-full max-w-xs" />
      </div>
    </section>
  );
}

export default Hero;
