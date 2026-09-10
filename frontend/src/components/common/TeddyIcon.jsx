function TeddyIcon({ className = "" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className={`h-20 w-20 transition-transform duration-300 group-hover:scale-110 ${className}`}
    >
      <circle cx="7.5" cy="5.5" r="2" />
      <circle cx="16.5" cy="5.5" r="2" />
      <circle cx="12" cy="10" r="4.5" />
      <ellipse cx="12" cy="18" rx="3.5" ry="3" />
      <ellipse cx="12" cy="11" rx="1.5" ry="1" />
    </svg>
  );
}

export default TeddyIcon;
