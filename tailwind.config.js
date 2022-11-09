/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./layouts/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite-react/**/*.js",
  ],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#EC0B0E",
          secondary: "#A01717",
          accent: "#141113",
          neutral: "#18182F",
          "base-100": "#FFFFFF",
          info: "#3ABFF8",
          success: "#36D399",
          warning: "#FFD500",
          error: "#F87272",
          white: "#FFF",
        },
      },
    ],
  },
  theme: {
    extend: {
      colors: {
        rouge: "#EC0B0E",
        bordeaux: "#A01717",
        rose: "#5F4040",
        noir: "#141113",
        noirfonce: "#000000",
        blanc: "#FFFFFF",
        warning: "#FFD500",
        "gris-clair": "#B4B9C7",
        gris: "#BABABA",
        success: "#36D399",
        info: "#3ABFF8",
        error: "#F87272",
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
};
