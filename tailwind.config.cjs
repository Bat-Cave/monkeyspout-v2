/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        patrick: ['"Patrick Hand"', "cursive"],
      },
    },
  },
  plugins: [require("daisyui")],
};

module.exports = config;
