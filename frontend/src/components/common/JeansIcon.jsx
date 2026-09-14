function JeansIcon({ className = "" }) {
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
        d="M8 3.5h8l1 17h-3.4l-1.6-9-1.6 9H7l1-17zM8 6.5h8M12 6.5V10"
      />
    </svg>
  );
}

export default JeansIcon;
