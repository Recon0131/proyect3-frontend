/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "background-dark":"#0F1319",
        "background-input-dark":"#1F2329",
        "background-buttom-dark":"#5492F7",
        "background-buttom-dark-hover":"#297af4",
      },
      screens:{
        "movil":{"max":"450px"},

        "tablet":{"min":"451px","max":"1000px"},
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}