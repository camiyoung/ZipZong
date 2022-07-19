/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./node_modules/flowbite/**/*.{html,js,jsx,ts,tsx}",
    "./src/**/*.{html,js,jsx,ts,tsx}",
  ],
  theme: {
    colors: {
      mainBlue: "#4094bf",
      lightBlue: "#8ccfd5",
      begie: "#f2ecda",
      white: "#ffffff",
    },
    extend: {},
  },
  plugins: [require("flowbite/plugin"), require("@tailwindcss/typography")],
}
