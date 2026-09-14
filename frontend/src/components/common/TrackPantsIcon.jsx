function TrackPantsIcon({ className = "" }) {
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
        d="M8 3.5h8l.8 13-2.6.6L12 9.5 9.8 17.1 7.2 16.5 8 3.5zM8 6.5h8M7.5 14.3l2 .5M16.5 14.3l-2 .5"
      />
    </svg>
  );
}

export default TrackPantsIcon;
