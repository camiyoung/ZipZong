/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors: {
      mainBlue: "#4094bf",
      lightBlue: "#8ccfd5",
      begie: "#f2ecda",
      white: "#ffffff",
      danger: "#ff4d4d",
      warning: "#fde047",
      success: "#3b82f6",
      info: "#34d399",
      darkGray: "#4b5563",
      lightGray: "#9ca3af",

      primary: {
        100: "#d9eaf2",
        200: "#b3d4e5",
        300: "#8cbfd9",
        400: "#66a9cc",
        500: "#4094bf",
        600: "#337699",
        700: "#265973",
        800: "#1a3b4c",
        900: "#0d1e26",
      },
      secondary: {
        100: "#fcfbf8",
        200: "#faf7f0",
        300: "#f7f4e9",
        400: "#f5f0e1",
        500: "#f2ecda",
        600: "#c2bdae",
        700: "#918e83",
        800: "#615e57",
        900: "#302f2c",
      },
      lgBlue: {
        100: "#e8f5f7",
        200: "#d1ecee",
        300: "#bae2e6",
        400: "#a3d9dd",
        500: "#8ccfd5",
        600: "#70a6aa",
        700: "#547c80",
        800: "#385355",
        900: "#1c292b",
      },
    },
    extend: {
      animation: {
        "slide-from-left":
          "slide-left 1.2s cubic-bezier(0.175, 0.885, 0.320, 1.275) 1s  both",
        "slide-from-right":
          "slide-right 1s cubic-bezier(0.175, 0.885, 0.320, 1.275) 0.5s both",
        "prize-gold":
          "scale-up-bottom 1s cubic-bezier(0.390, 0.575, 0.565, 1.000)  1s both ",
        "prize-silver":
          "scale-up-bottom 0.7s cubic-bezier(0.390, 0.575, 0.565, 1.000) 0.5s  both ",
        "prize-bronze":
          "scale-up-bottom 1s cubic-bezier(0.390, 0.575, 0.565, 1.000)   both ",
      },
      keyframes: {
        "slide-left": {
          "0%": {
            transform: "translateX(-500px)",
          },
          to: {
            transform: "translateX(0)",
          },
        },
        "slide-right": {
          "0%": {
            transform: "translateX(500px)",
          },
          to: {
            transform: "translateX(0)",
          },
        },
        "scale-up-bottom": {
          "0%": {
            transform: "scale(.5) ",
            "transform-origin": "50% 100%",
            opacity: 0,
          },
          to: {
            transform: "scale(1)",
            "transform-origin": "50% 100%",
          },
        },
      },
    },
  },
  plugins: [
    require("flowbite/plugin"),
    require("@tailwindcss/typography"),
    require("tailwind-scrollbar-hide"),
  ],
}
