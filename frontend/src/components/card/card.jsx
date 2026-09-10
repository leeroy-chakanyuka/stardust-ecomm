export default function Card({ title, image }) {
  return (
    <div className="transition-transform duration-300 hover:-translate-y-1">
      {image ? (
        <img
          src={image}
          alt={title}
          className="aspect-square w-full rounded-xl object-cover"
        />
      ) : (
        <div className="aspect-square rounded-xl bg-[#FAF7F2]" />
      )}
      <h3 className="mt-3 font-barlow text-sm font-semibold lowercase text-neutral-800">
        {title}
      </h3>
    </div>
  );
}
