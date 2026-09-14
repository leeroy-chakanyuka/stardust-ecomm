import { useState } from "react";
import { COLOR_HEX } from "../../data/taxonomy";

export default function Colors({
  title = "colors",
  types = [],
  selected = [],
  onToggle,
  onClear,
  defaultOpen = false,
}) {
  const [open, setOpen] = useState(defaultOpen);

  /* a single option filters nothing, so hide the group */
  if (types.length < 2) return null;

  const sortedByCount = [...types].sort(
    (a, b) => (b.count ?? 0) - (a.count ?? 0),
  );
  const selectedNames = sortedByCount
    .filter((c) => selected.includes(c.id))
    .map((c) => c.name);

  return (
    <div className="mt-5 border-t border-neutral-200 pt-4">
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          className="flex cursor-pointer items-center gap-1.5 font-barlow text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500 transition-colors hover:text-neutral-900"
        >
          {title}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            className={`h-3 w-3 transition-transform ${open ? "" : "-rotate-90"}`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
            />
          </svg>
        </button>
        {selected.length > 0 && (
          <button
            type="button"
            onClick={onClear}
            className="font-barlow text-xs font-semibold lowercase tracking-wider text-rose-500 transition-colors hover:text-rose-600"
          >
            clear ({selected.length})
          </button>
        )}
      </div>

      {open && (
        <>
          <div className="mt-3 grid grid-cols-7 gap-2">
            {sortedByCount.map((color) => {
              const active = selected.includes(color.id);
              return (
                <button
                  key={color.id}
                  type="button"
                  title={`${color.name} (${color.count ?? 0})`}
                  aria-label={`${color.name}, ${color.count ?? 0} products`}
                  aria-pressed={active}
                  onClick={() => onToggle?.(color.id)}
                  style={{ backgroundColor: COLOR_HEX[color.id] ?? "#e5e5e5" }}
                  className={`aspect-square w-full cursor-pointer rounded-full border border-black/10 transition-transform hover:scale-110 ${
                    active ? "ring-2 ring-[#4A3F3A] ring-offset-2" : ""
                  }`}
                />
              );
            })}
          </div>
          {selectedNames.length > 0 && (
            <p className="mt-2 font-barlow text-xs lowercase text-neutral-500">
              {selectedNames.join(", ")}
            </p>
          )}
        </>
      )}
    </div>
  );
}
