/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "mada-blue": {
          DEFAULT: "#003366",
          dark: "#002244",
          light: "#004080",
        },
        "mada-green": {
          DEFAULT: "#00A86B",
          dark: "#008F5A",
          light: "#00C27B",
        },
        "mada-white": "#FFFFFF",
      },
    },
  },
  plugins: [],
};
