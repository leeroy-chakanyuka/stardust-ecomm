import AccountIcon from "../common/AccountIcon";
import CartIcon from "../common/CartIcon";
import WishlistIcon from "../common/WishlistIcon";

function Navigation() {
  return (
    <nav className="flex items-center gap-8 py-6 px-8 justify-between">
      <div className="flex items-center gap-6">
        {/* logo would go here, for now we'll put an h2*/}
        <h2 className="font-display text-3xl font-semibold lowercase tracking-tight text-neutral-800 select-none">
          stardust<span className="text-rose-400">.</span>
        </h2>
      </div>

      {/* search bar - maybe later on we should make theese seperate components for better readability. rounded feels more neutral than rounded-full
       * neutral 200 gives it a nice white outline, some padding within it, on focus (click) red, nice lil transition */}
      <div className="flex flex-1 items-center">
        <div className="flex w-full max-w-xl items-center gap-2 rounded-xl border border-neutral-200 bg-white px-4 py-2.5 focus-within:border-rose-300 focus-within:ring-2 focus-within:ring-rose-100 transition">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="h-4 w-4 shrink-0 text-neutral-400"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
          <input
            type="text"
            placeholder="search..."
            className="min-w-0 flex-1 bg-transparent text-base lowercase text-neutral-800 placeholder:text-neutral-400 focus:outline-none"
          />
        </div>
      </div>

      {/* nav items - flex so we can have then vertically, then list none so no bullet points */}
      <div className="ml-4 flex items-center">
        <ul className="m-0 flex list-none items-center gap-8 p-0">
          <li>
            {/* keep all the text a grey, rose on hover */}
            <a
              href="#"
              className="text-base lowercase tracking-wide text-neutral-600 hover:text-rose-500 transition-colors"
            >
              shop
            </a>
          </li>
          <li>
            <a
              href="#"
              className="text-base lowercase tracking-wide text-neutral-600 hover:text-rose-500 transition-colors"
            >
              mens
            </a>
          </li>
          <li>
            <a
              href="#"
              className="text-base lowercase tracking-wide text-neutral-600 hover:text-rose-500 transition-colors"
            >
              womens
            </a>
          </li>
          <li>
            <a
              href="#"
              className="text-base lowercase tracking-wide text-neutral-600 hover:text-rose-500 transition-colors"
            >
              kids
            </a>
          </li>
          <li>
            <a
              href="#"
              className="text-base lowercase tracking-wide text-neutral-600 hover:text-rose-500 transition-colors"
            >
              home
            </a>
          </li>
          <li>
            <a
              href="#"
              className="text-base lowercase tracking-wide text-neutral-600 hover:text-rose-500 transition-colors"
            >
              gifts
            </a>
          </li>
        </ul>
      </div>

      <div className="flex items-center gap-5">
        <button type="button" aria-label="wishlist" className="cursor-pointer">
          <WishlistIcon />
        </button>
        <button type="button" aria-label="cart" className="cursor-pointer">
          <CartIcon />
        </button>
        <button type="button" aria-label="my account" className="cursor-pointer">
          <AccountIcon />
        </button>
      </div>
    </nav>
  );
}

export default Navigation;
