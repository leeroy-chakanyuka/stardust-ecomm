export default function Heading({ title, eyebrow }) {
  return (
    <div>
      {eyebrow ? (
        /* borrow the font from canva, heading so unlike the rest of the app uppercase */
        <p className="font-barlow text-xs font-semibold uppercase tracking-[0.2em] text-rose-400">
          {eyebrow}
        </p>
      ) : null}
      <p className="mt-2 font-display text-3xl font-bold lowercase tracking-tight text-neutral-800">
        {title}
      </p>
    </div>
  );
}
