function AccessoriesIcon({ className = "" }) {
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
        d="M4 10.5h4.5a2.5 2.5 0 012.5 2.5 2.5 2.5 0 01-2.5 2.5H6a2 2 0 01-2-2v-3zM20 10.5h-4.5a2.5 2.5 0 00-2.5 2.5 2.5 2.5 0 002.5 2.5H18a2 2 0 002-2v-3zM4 10.5L3 8.5M20 10.5l1-2M11 12h2"
      />
    </svg>
  );
}

export default AccessoriesIcon;
