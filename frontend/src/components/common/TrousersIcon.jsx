function TrousersIcon({ className = "" }) {
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
        d="M8 3.5h8l.7 17h-3L12 10l-1.7 10.5h-3L8 3.5zM8 6.5h8M10.5 6.5V10M13.5 6.5V10"
      />
    </svg>
  );
}

export default TrousersIcon;
