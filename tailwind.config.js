/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class", // Enables dark mode via a CSS class
  theme: {
    extend: {
      colors: {
        button: "#A68877", // BUTTON
        placeholder: "#BFAE9F", // PLACEHOLDER
        textcolor1: "#735F39", // textcolor
        textcolor2: "#210F04", // textcolor
        sidebar: "#FAF2F2", // sidebar
        landing: "#D6CCC2", // landing and footer
        gray1: "#B9B8B8", // gray one
        // Defining light theme colors
        light: {
          button: "#A68877",
          placeholder: "#BFAE9F",
          textcolor1: "#735F39",
          textcolor2: "#210F04",
          sidebar: "#FAF2F2",
          landing: "#D6CCC2",
          gray1: "#B9B8B8",
        },
        // Defining dark theme colors
        dark: {
          button: "#A68877",
          placeholder: "#BFAE9F",
          textcolor1: "#735F39",
          textcolor2: "#210F04",
          sidebar: "#FAF2F2",
          landing: "#D6CCC2",
          gray1: "#B9B8B8",
        },
      },
    },
  },
  plugins: [],
};
