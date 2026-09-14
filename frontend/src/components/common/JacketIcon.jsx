function JacketIcon({ className = "" }) {
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
        d="M9 3.5L4.5 6 3 14l3 1 1.5-5v10.5h3L12 9l1.5 11.5h3V10l1.5 5 3-1-1.5-8L15 3.5a3 3 0 01-6 0z"
      />
    </svg>
  );
}

export default JacketIcon;
