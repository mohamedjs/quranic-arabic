import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        emerald: {
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
        },
        amber: {
          500: '#f59e0b',
          600: '#d97706',
        }
      },
      fontFamily: {
        arabic: ['"Amiri"', '"Scheherazade New"', 'Traditional Arabic', 'serif'],
      }
    },
  },
  plugins: [],
} satisfies Config;
