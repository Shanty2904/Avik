/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Times New Roman"', "Times", "serif"],
        shackleton: ['"shackleton"', "serif"],
        "shackleton-wide": ['"shackleton-wide"', "serif"],
        "shackleton-condensed": ['"shackleton-condensed"', "serif"],
        "shackleton-narrow": ['"shackleton-narrow"', "serif"],
      },
      animation: {
        "film-scroll": "film-scroll 20s linear infinite",
        fadeIn: "fadeIn 1.2s ease forwards",
        "bounce-slow": "bounce-slow 1.5s infinite",
      },
      keyframes: {
        "film-scroll": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        fadeIn: {
          to: { opacity: "1" },
        },
        "bounce-slow": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(8px)" },
        },
      },
    },
  },
  plugins: [],
};
