function HoodieIcon({ className = "" }) {
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
        d="M12 2.5c-2.5 0-4 2-4 4L4.5 8.5 6 12l2.5-1v9.5h7V11L18 12l1.5-3.5L16 6.5c0-2-1.5-4-4-4zM9.5 14.5h5l-.7 3h-3.6l-.7-3z"
      />
    </svg>
  );
}

export default HoodieIcon;
