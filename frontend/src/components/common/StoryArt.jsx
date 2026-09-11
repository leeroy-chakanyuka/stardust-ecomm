function StoryArt({ className = "" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 160"
      fill="none"
      className={className}
    >
      {/* ground shadow */}
      <ellipse cx="100" cy="142" rx="52" ry="8" fill="#F4CFCF" opacity="0.6" />
      {/* back bag */}
      <g stroke="#8A7E78" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M124 70h34l4 66H120l4-66z" fill="#C9CFC0" />
        <path d="M132 70v-6a9 9 0 0118 0v6" />
      </g>
      {/* front bag */}
      <g stroke="#4A3F3A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M62 78h44l5 62H57l5-62z" fill="#F4CFCF" />
        <path d="M73 78V70a11 11 0 0122 0v8" />
      </g>
      {/* star on front bag */}
      <path
        d="M84 102l3.2 6.8 6.8 3.2-6.8 3.2L84 122l-3.2-6.8L74 112l6.8-3.2L84 102z"
        fill="#E8A0B4"
      />
      {/* sparkles */}
      <g fill="#E8A0B4">
        <path d="M40 40l2.2 4.8 4.8 2.2-4.8 2.2-2.2 4.8-2.2-4.8-4.8-2.2 4.8-2.2 2.2-4.8z" />
        <path d="M162 36l1.8 3.7 3.7 1.8-3.7 1.8-1.8 3.7-1.8-3.7-3.7-1.8 3.7-1.8 1.8-3.7z" />
      </g>
      <g fill="#C9CFC0">
        <path d="M150 110l1.8 3.7 3.7 1.8-3.7 1.8-1.8 3.7-1.8-3.7-3.7-1.8 3.7-1.8 1.8-3.7z" />
        <path d="M48 100l1.5 3 3 1.5-3 1.5-1.5 3-1.5-3-3-1.5 3-1.5 1.5-3z" />
      </g>
    </svg>
  );
}

export default StoryArt;
