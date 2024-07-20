/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      colors: {
        primary: "#478CCF",
        secondary: "#ef863e",
        cardbg: "#478CCF",
      }
    },
  },
  plugins: [],
}

