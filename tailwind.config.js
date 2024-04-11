/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./mdx-components.tsx",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#3b71ca",
        "vivid-red": "#FF0018",
        "deep-saffron": "#FFA52C",
        "maximum-yellow": "#FFFF41",
        ao: "#008018",
        blue: "#0000F9",
        "philippine-violet": "#86007D",
      },
    },
  },
  plugins: [],
};
