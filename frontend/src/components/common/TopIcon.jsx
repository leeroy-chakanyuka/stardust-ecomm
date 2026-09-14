function TopIcon({ className = "" }) {
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
        d="M9.5 3.5L10 8l-3 2 2.5 1.5L8 20.5h8L14.5 11.5 17 10l-3-2 .5-4.5A3.5 3.5 0 0112 5a3.5 3.5 0 01-2.5-1.5z"
      />
    </svg>
  );
}

export default TopIcon;
