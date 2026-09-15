import { useState } from "react";

export default function Sizes({
  title = "sizes",
  groups = [],
  selected = [],
  onToggle,
  onClear,
  defaultOpen = false,
}) {
  const [open, setOpen] = useState(defaultOpen);

  const visibleGroups = groups.filter((g) => g.types.length > 0);
  const totalOptions = visibleGroups.reduce((n, g) => n + g.types.length, 0);

  /* a single option filters nothing, so hide the group */
  if (totalOptions < 2) return null;

  const selectedNames = visibleGroups
    .flatMap((g) => g.types)
    .filter((s) => selected.includes(s.id))
    .map((s) => s.name);

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
          {visibleGroups.map((group) => (
            <div key={group.id} className="mt-3">
              {visibleGroups.length > 1 && (
                <p className="font-barlow text-[11px] font-semibold uppercase tracking-[0.15em] text-neutral-400">
                  {group.name}
                </p>
              )}
              <div className="mt-1.5 flex flex-wrap gap-1.5">
                {group.types.map((size) => {
                  const active = selected.includes(size.id);
                  return (
                    <button
                      key={size.id}
                      type="button"
                      title={`${size.name} (${size.count ?? 0})`}
                      aria-label={`${size.name}, ${size.count ?? 0} products`}
                      aria-pressed={active}
                      onClick={() => onToggle?.(size.id)}
                      className={`cursor-pointer rounded-md border px-2.5 py-1 font-barlow text-xs lowercase transition-colors ${
                        active
                          ? "border-[#4A3F3A] bg-[#4A3F3A] font-semibold text-white"
                          : "border-neutral-300 bg-white text-neutral-700 hover:border-neutral-900"
                      }`}
                    >
                      {size.name}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
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
