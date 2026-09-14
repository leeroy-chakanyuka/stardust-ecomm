import { useState } from "react";
import RangeSliderModule from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import { PRICE_STEP } from "../../data/taxonomy";

/* the package ships CJS, so the default import is the module namespace
 * ({ default: Component }) rather than the component itself */
const RangeSlider = RangeSliderModule?.default ?? RangeSliderModule;

export default function Prices({
  bounds,
  value,
  onChange,
  onClear,
  defaultOpen = false,
  collapsible = true,
}) {
  const [open, setOpen] = useState(defaultOpen);
  const expanded = collapsible ? open : true;

  if (!bounds || bounds.max <= bounds.min) return null;
  const { min, max, capped } = bounds;

  /* value is [lo, hi]; hi is Infinity when parked on a capped rail */
  const thumbs = value
    ? [value[0], value[1] === Infinity ? max : value[1]]
    : [min, max];

  return (
    <div className="mt-5 border-t border-neutral-200 pt-4">
      <div className="flex items-center justify-between">
        {collapsible ? (
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            className="flex cursor-pointer items-center gap-1.5 font-barlow text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500 transition-colors hover:text-neutral-900"
          >
            price
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
        ) : (
          <h3 className="font-barlow text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
            price
          </h3>
        )}
        {value && (
          <button
            type="button"
            onClick={onClear}
            className="font-barlow text-xs font-semibold lowercase tracking-wider text-rose-500 transition-colors hover:text-rose-600"
          >
            clear
          </button>
        )}
      </div>

      {expanded && (
        <div className="mt-4 px-1">
          <RangeSlider
            min={min}
            max={max}
            step={PRICE_STEP}
            value={thumbs}
            onInput={(v) => {
              const lo = Math.min(v[0], v[1]);
              const hi = Math.max(v[0], v[1]);
              onChange?.([
                lo,
                capped && hi >= max ? Infinity : hi,
              ]);
            }}
          />
          <div className="mt-2 flex items-center justify-between font-barlow text-xs text-[#8A7E78]">
            <span>R{min}</span>
            <span>
              R{max}
              {capped ? "+" : ""}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
