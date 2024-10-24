/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        generalsans: ["General Sans", "sans-serif"],
      },
      colors: {
        green: {
          DEFAULT: "#003523",
        },
        black: {
          DEFAULT: "#000",
        },
        white: {
          DEFAULT: "#FFFAE7",
        },
        lightgray: {
          DEFAULT: "#F8F7F3",
        },
        lightgreen: {
          DEFAULT: "#CAFFE0",
        },
        pink: {
          DEFAULT: "#FFC9FF",
        },
      },
    },
  },
  plugins: [],
};
