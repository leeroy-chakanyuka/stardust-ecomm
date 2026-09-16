export default function Loader({ label = "loading..." }) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex items-center justify-center gap-3 py-10"
    >
      <span
        aria-hidden="true"
        className="h-6 w-6 animate-spin rounded-full border-2 border-neutral-200 border-t-rose-500"
      />
      <span className="font-barlow text-sm font-semibold lowercase tracking-wider text-neutral-500">
        {label}
      </span>
    </div>
  );
}
