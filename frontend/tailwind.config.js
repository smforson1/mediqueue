/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#344EC5",
        secondary: "#2a3db0",
        lightTheme: "#fefeff",
        darkTheme: "#131826",
        buttonBlue: "#0052CC",
        textBlue: "#344EC5",
      },
    },
  },
  plugins: [],
};
