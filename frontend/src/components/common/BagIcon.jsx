function BagIcon({ className = "" }) {
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
        d="M7 8h10l1 12H6L7 8zM9.5 10V6.5a2.5 2.5 0 015 0V10"
      />
    </svg>
  );
}

export default BagIcon;
