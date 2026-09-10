import heroNoButton from "../../assets/img/hero_no_button.png";

function HeroPill({ className = "" }) {
  return (
    <div
      className={`relative overflow-hidden rounded-full font-barlow text-sm font-semibold lowercase tracking-wider ${className}`}
    >
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox="0 0 100 46"
        preserveAspectRatio="none"
        fill="none"
      >
        <rect
          x="1"
          y="1"
          width="98"
          height="44"
          rx="22"
          stroke="#fb7185"
          strokeWidth="2"
          vectorEffect="non-scaling-stroke"
        />
        <path
          d="M 37 1 Q 44 23 37 45"
          stroke="#fb7185"
          strokeWidth="2"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      <a
        href="#discover"
        className="relative z-10 -mr-4 w-[38%] rounded-r-full bg-rose-400 px-4 py-3 text-center text-white transition-colors hover:bg-rose-500"
      >
        discover
      </a>
      <a
        href="#shop"
        className="flex-1 bg-white/70 py-3 pl-8 pr-4 text-center text-rose-500 transition-colors hover:bg-rose-50"
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
