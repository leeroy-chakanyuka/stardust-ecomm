function MugIcon({ className = "" }) {
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
        d="M6 9h11v8a3 3 0 01-3 3H9a3 3 0 01-3-3V9zM17 10.5h1.5a2.5 2.5 0 010 5H17M9 3.5c-1 1 1 1.5 0 2.5M13 3.5c-1 1 1 1.5 0 2.5"
      />
    </svg>
  );
}

export default MugIcon;
