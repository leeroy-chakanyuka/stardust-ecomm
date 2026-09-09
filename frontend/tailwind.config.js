/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Space Grotesk"', 'Inter', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'Consolas', 'monospace'],
      },
      colors: {
        void: {
          DEFAULT: '#0b0a14',
          soft: '#16171d',
          card: '#1f2028',
        },
        nebula: {
          DEFAULT: '#7c3aed',
          light: '#a78bfa',
          pale: '#ede9fe',
          deep: '#5b21b6',
        },
        starlight: {
          DEFAULT: '#facc15',
          soft: '#fef08a',
          deep: '#a16207',
        },
        mist: '#f4f3ec',
      },
      boxShadow: {
        glow: '0 0 24px rgba(124, 58, 237, 0.35)',
        card: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      },
    },
  },
  plugins: [],
}
