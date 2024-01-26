/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
  purge: {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  },
};
