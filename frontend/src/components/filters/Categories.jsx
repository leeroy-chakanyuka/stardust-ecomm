import { useState } from "react";

export default function Categories({
  title = "categories",
  types = [],
  selected = [],
  onToggle,
  onClear,
  defaultOpen = false,
}) {
  const [open, setOpen] = useState(defaultOpen);
  const [expanded, setExpanded] = useState(false);

  /* a single option filters nothing, so hide the group */
  if (types.length < 2) return null;

  const sortedByCount = [...types].sort(
    (a, b) => (b.count ?? 0) - (a.count ?? 0),
  );
  const visibleTypes = expanded ? sortedByCount : sortedByCount.slice(0, 5);
  const hiddenCount = types.length - visibleTypes.length;

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
          <ul className="mt-3 list-none space-y-2 p-0">
            {visibleTypes.map((type) => {
              const checked = selected.includes(type.id);
              return (
                <li key={type.id}>
                  <label className="flex cursor-pointer items-center gap-2 font-barlow text-sm lowercase text-neutral-700 hover:text-neutral-900">
                    <input
                      id={`type-${type.id}`}
                      type="checkbox"
                      checked={checked}
                      onChange={() => onToggle?.(type.id)}
                      className="h-4 w-4 shrink-0 rounded border-neutral-300 accent-neutral-900"
                    />
                    <span className="min-w-0 flex-1 truncate">
                      {type.name}
                    </span>
                    {typeof type.count === "number" && (
                      <span className="shrink-0 text-xs text-neutral-400">
                        {type.count}
                      </span>
                    )}
                  </label>
                </li>
              );
            })}
          </ul>

          {hiddenCount > 0 && (
            <button
              type="button"
              onClick={() => setExpanded(true)}
              className="mt-3 font-barlow text-xs font-semibold lowercase tracking-wider text-neutral-500 transition-colors hover:text-neutral-900"
            >
              more ({hiddenCount})
            </button>
          )}
          {expanded && types.length > 5 && (
            <button
              type="button"
              onClick={() => setExpanded(false)}
              className="mt-3 font-barlow text-xs font-semibold lowercase tracking-wider text-neutral-500 transition-colors hover:text-neutral-900"
            >
              show less
            </button>
          )}
        </>
      )}
    </div>
  );
}
