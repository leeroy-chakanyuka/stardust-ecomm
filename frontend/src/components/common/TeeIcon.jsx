function TeeIcon({ className = "" }) {
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
        d="M9 4l-5 3 2.5 4 2-1.5V20h7v-10.5l2 1.5L20 7l-5-3a3 3 0 01-6 0z"
      />
    </svg>
  );
}

export default TeeIcon;
