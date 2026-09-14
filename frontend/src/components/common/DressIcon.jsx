function DressIcon({ className = "" }) {
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
        d="M10 3.5h4l1 3 3.5 10-2.2.8L12 14l-4.3 3.3-2.2-.8L9 6.5l1-3zM10 3.5L12 5.5l2-2M10.5 9.5h3"
      />
    </svg>
  );
}

export default DressIcon;
