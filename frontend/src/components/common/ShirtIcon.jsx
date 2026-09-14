function ShirtIcon({ className = "" }) {
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
        d="M9 3.5L4 7l2 4 2-1v10.5h8V10l2 1 2-4-5-3.5a3 3 0 01-6 0zM9 3.5L12 6l3-2.5M12 7v13.5"
      />
    </svg>
  );
}

export default ShirtIcon;
