function LoungewearIcon({ className = "" }) {
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
        d="M19 14.5A7.5 7.5 0 019.5 5 7.5 7.5 0 1019 14.5zM18 3.5l.7 1.8 1.8.7-1.8.7-.7 1.8-.7-1.8-1.8-.7 1.8-.7.7-1.8z"
      />
    </svg>
  );
}

export default LoungewearIcon;
