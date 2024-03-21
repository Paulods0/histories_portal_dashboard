/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Oswald: ["Oswald", "sans-serif"],
      },
      colors: {
        BLACK: "#111111",
        GRAY: {
          LIGHTER: "#EEEEEE",
          DARKER: "#9D9D9D",
        },
        PINK: { LIGHT: "#FEB1C8" },
        RED: { DARK: "#880B0B" },
        YELLOW: "#FFD600",
      },
    },
  },
  plugins: [],
}
