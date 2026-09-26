/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        jollof: {
          DEFAULT: "rgb(var(--color-jollof) / <alpha-value>)",
          dark: "rgb(var(--color-jollof-dark) / <alpha-value>)",
          light: "rgb(var(--color-jollof-light) / <alpha-value>)",
        },
        palm: {
          DEFAULT: "rgb(var(--color-palm) / <alpha-value>)",
          dark: "rgb(var(--color-palm-dark) / <alpha-value>)",
          light: "rgb(var(--color-palm-light) / <alpha-value>)",
        },
        cream: "rgb(var(--color-cream) / <alpha-value>)",
        ink: "rgb(var(--color-ink) / <alpha-value>)",
        gold: "rgb(var(--color-gold) / <alpha-value>)",
      },
      fontFamily: {
        display: ["Fraunces", "serif"],
        body: ["Work Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
};
