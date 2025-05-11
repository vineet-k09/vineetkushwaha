import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",

      },
      fontFamily: {
        sans: ['var(--poppins)'], // default font
        poppins: ['var(--poppins)'],
        zillaSlab: ["var(--font-zilla-slab)"], // Explicit reference
      }
    },
  },
  plugins: [],
} satisfies Config;
