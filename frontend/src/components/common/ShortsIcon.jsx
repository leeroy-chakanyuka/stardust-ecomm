function ShortsIcon({ className = "" }) {
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
        d="M8 3.5h8l1.2 9.5h-3.4L12 9.5l-1.8 3.5H6.8L8 3.5zM8 6.5h8"
      />
    </svg>
  );
}

export default ShortsIcon;
