/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.jsx", "./src/*.jsx"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins"],
      },
      aspectRatio: {
        "4/5": "4 / 5",
      },
    },
  },
  plugins: [],
};
