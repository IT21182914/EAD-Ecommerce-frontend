/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#FF8A00",
        secondary: "#ed8900",
      },
      fontFamily: {
        "dancing-script": [
          "Dancing Script",
          "cursive",
          "Lora",
          "serif",
          "Fascinate Inline",
          "system-ui",
        ],
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "3rem",
        },
      },
    },
  },
  plugins: [],
};
