/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        InterTight: ["Inter Tight", "sans-serif"],
      },
      colors: {
        BLACK: "#111111",
        GRAY: {
          LIGH: "#F8F8F8",
          LIGHTER: "#EEEEEE",
          DARKER: "#9D9D9D",
        },
        BLUE: "#B4EFF3",
        RED: { DARK: "#880B0B" },
        YELLOW: "#FFEC8B",
      },
    },
  },
  plugins: [],
}
