import { useCallback, useId, useRef, useState } from "react";

const STAR_PATH =
  "M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.563.563 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.563.563 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z";

function clamp(n, min, max) {
  return Math.min(max, Math.max(min, n));
}

function StarRow({ count, size, gap, color }) {
  return (
    <div
      aria-hidden="true"
      className="flex w-max shrink-0"
      style={{ gap: `${gap}px`, color }}
    >
      {Array.from({ length: count }, (_, i) => (
        <svg
          key={i}
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="currentColor"
          className="block shrink-0"
        >
          <path d={STAR_PATH} />
        </svg>
      ))}
    </div>
  );
}

function formatCount(n) {
  if (typeof n !== "number" || Number.isNaN(n)) return null;
  if (n >= 10000) {
    const k = n / 1000;
    return `${k >= 100 ? Math.round(k) : k.toFixed(1).replace(/\.0$/, "")}k`;
  }
  return n.toLocaleString("en-ZA");
}

/**
 * Display uses a two-layer overflow technique (empty row behind, filled row
 * clipped on top by percentage), so ANY fractional value (4.3, 3.7, 2.5…)
 * renders pixel-perfect partial fill — no half-star icon swapping.
 *
 * @example display
 * <Stars value={4.3} />
 * <Stars value={4.5} showValue reviewCount={5300} size={14} />
 *
 * @example interactive (controlled)
 * const [rating, setRating] = useState(0);
 * <Stars editable value={rating} onChange={setRating} allowHalf allowClear />
 *
 * @example interactive (uncontrolled)
 * <Stars editable defaultValue={3} onChange={(v) => console.log(v)} />
 */
export default function Stars({
  value: controlledValue,
  defaultValue = 0,
  onChange,
  onHoverChange,
  count = 5,
  size = 16,
  gap = 2,
  allowHalf = true,
  editable = false,
  allowClear = true,
  disabled = false,
  showValue = false,
  reviewCount,
  fillColor = "#facc15",
  emptyColor = "#e5e4e7",
  label,
  className = "",
}) {
  const isControlled = controlledValue !== undefined;
  const [uncontrolled, setUncontrolled] = useState(defaultValue);
  const [hoverValue, setHoverValue] = useState(null);
  const trackRef = useRef(null);
  const labelId = useId();

  const committed = clamp(
    Number(isControlled ? controlledValue : uncontrolled) || 0,
    0,
    count,
  );
  // What the user currently sees: hover preview wins while pointing.
  const visible = hoverValue ?? committed;
  const fillPct = `${(clamp(visible, 0, count) / count) * 100}%`;

  const step = allowHalf ? 0.5 : 1;

  const valueFromPointer = useCallback(
    (clientX) => {
      const el = trackRef.current;
      if (!el) return step;
      const rect = el.getBoundingClientRect();
      if (rect.width <= 0) return step;
      const raw = ((clientX - rect.left) / rect.width) * count;
      return clamp(Math.round(raw / step) * step, step, count);
    },
    [count, step],
  );

  const commit = useCallback(
    (next) => {
      if (!isControlled) setUncontrolled(next);
      onChange?.(next);
    },
    [isControlled, onChange],
  );

  const handlePointerMove = (e) => {
    if (disabled) return;
    const v = valueFromPointer(e.clientX);
    setHoverValue((prev) => {
      if (prev !== v) onHoverChange?.(v);
      return v;
    });
  };

  const clearHover = () => {
    setHoverValue((prev) => {
      if (prev !== null) onHoverChange?.(null);
      return null;
    });
  };

  const handleClick = (e) => {
    if (disabled) return;
    const v = valueFromPointer(e.clientX);
    commit(allowClear && v === committed ? 0 : v);
  };

  const handleKeyDown = (e) => {
    if (disabled) return;
    let next = null;
    if (e.key === "ArrowRight" || e.key === "ArrowUp") next = committed + step;
    else if (e.key === "ArrowLeft" || e.key === "ArrowDown")
      next = committed - step;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = count;
    if (next !== null) {
      e.preventDefault();
      commit(clamp(Math.round(next / step) * step, 0, count));
    }
  };

  const accessibleLabel =
    label ?? (editable ? "rate this product" : `rated ${committed} out of ${count}`);
  const formattedCount = formatCount(reviewCount);

  return (
    <div className={`flex w-max max-w-full items-center gap-2 ${className}`}>
      {editable ? (
        <div
          ref={trackRef}
          role="slider"
          tabIndex={disabled ? -1 : 0}
          aria-label={accessibleLabel}
          aria-valuemin={0}
          aria-valuemax={count}
          aria-valuenow={committed}
          aria-valuetext={`${committed} out of ${count} stars`}
          aria-disabled={disabled || undefined}
          onPointerMove={handlePointerMove}
          onPointerLeave={clearHover}
          onClick={handleClick}
          onKeyDown={handleKeyDown}
          onBlur={clearHover}
          className={`relative w-max max-w-full select-none rounded-sm outline-none ${
            disabled
              ? "cursor-not-allowed opacity-60"
              : "cursor-pointer focus-visible:ring-2 focus-visible:ring-rose-400 focus-visible:ring-offset-2"
          }`}
          style={{ touchAction: "pan-y" }}
        >
          <StarRow count={count} size={size} gap={gap} color={emptyColor} />
          <div
            className="absolute inset-y-0 left-0 overflow-hidden"
            style={{ width: fillPct }}
          >
            <StarRow count={count} size={size} gap={gap} color={fillColor} />
          </div>
        </div>
      ) : (
        <div
          role="img"
          aria-label={`rated ${committed} out of ${count} stars`}
          title={`${committed} / ${count}`}
          className="relative w-max max-w-full"
        >
          <StarRow count={count} size={size} gap={gap} color={emptyColor} />
          <div
            className="absolute inset-y-0 left-0 overflow-hidden"
            style={{ width: fillPct }}
          >
            <StarRow count={count} size={size} gap={gap} color={fillColor} />
          </div>
        </div>
      )}

      {(showValue || formattedCount !== null) && (
        <span
          id={labelId}
          className="font-barlow text-xs whitespace-nowrap text-neutral-500"
        >
          {showValue && (
            <span className="font-semibold text-neutral-800">
              {committed.toFixed(allowHalf ? 1 : 0)}
            </span>
          )}
          {showValue && formattedCount !== null && " "}
          {formattedCount !== null && `(${formattedCount})`}
        </span>
      )}
    </div>
  );
}
