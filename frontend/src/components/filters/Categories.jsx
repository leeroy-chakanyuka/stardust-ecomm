export default function Categories({
  types = [],
  selected = [],
  onToggle,
  onClear,
}) {
  if (!types.length) return null;

  return (
    <div className="mt-5 border-t border-neutral-200 pt-4">
      <div className="flex items-center justify-between">
        <h3 className="font-barlow text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
          categories
        </h3>
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

      <ul className="mt-3 list-none space-y-2 p-0">
        {types.map((type) => {
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
                <span className="min-w-0 flex-1 truncate">{type.name}</span>
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
    </div>
  );
}
