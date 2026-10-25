export default function Spinner() {
  return (
    <div role="status" className="flex items-center justify-center p-6">
      <span className="sr-only">Loading...</span>
      <span aria-hidden="true" className="relative block size-10">
        <span className="absolute inset-0 rounded-full border-[3px] border-[#c9cfc0]/40" />
        <span className="absolute inset-0 animate-spin rounded-full border-[3px] border-transparent border-t-[#e8a0b4] border-r-[#e8a0b4]/40 motion-reduce:animate-none" />
        <span className="absolute inset-4 rounded-full bg-[#e8a0b4]/70" />
      </span>
    </div>
  );
}
