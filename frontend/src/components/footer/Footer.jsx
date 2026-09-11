const columns = [
  {
    title: "shop",
    links: ["mens", "womens", "kids", "home"],
  },
  {
    title: "company",
    links: ["about", "contact"],
  },
  {
    title: "support",
    links: ["shipping", "returns", "faq"],
  },
];

function Footer() {
  return (
    <footer className="bg-[#FAF7F2]">
      <div className="mx-auto max-w-7xl px-8 py-14">
        <div className="grid gap-10 md:grid-cols-[1fr_2fr]">
          <div>
            <p className="font-display text-2xl font-semibold lowercase tracking-tight text-neutral-800 select-none">
              stardust<span className="text-rose-400">.</span>
            </p>
            <p className="mt-3 font-barlow text-sm lowercase text-neutral-600">
              soft things for everyone.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {columns.map((column) => (
              <div key={column.title}>
                <p className="font-barlow text-xs font-semibold uppercase tracking-[0.2em] text-neutral-400">
                  {column.title}
                </p>
                <ul className="mt-4 list-none space-y-3 p-0">
                  {column.links.map((link) => (
                    <li key={link}>
                      <a
                        href={`#${link}`}
                        className="font-barlow text-sm lowercase text-neutral-600 transition-colors hover:text-rose-500"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-neutral-200 pt-6 sm:flex-row">
          <p className="font-barlow text-xs lowercase text-neutral-500">
            © 2026 stardust. all rights reserved.
          </p>
          <p className="font-barlow text-xs lowercase text-neutral-500">
            mega september · sept 12–18
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
