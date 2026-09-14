function ShoesIcon({ className = "" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className={`h-20 w-20 transition-transform duration-300 group-hover:scale-110 ${className}`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.5 16v-2.2l2.5-.5L8.5 9l2.5 1 3-1.5 3.5 1 2.5 1.8.5 2.7-1.5 2h-13L3.5 16zM5 16h14M8.5 9l2 2.5M11 8.5l2 2.5"
      />
    </svg>
  );
}

export default ShoesIcon;
