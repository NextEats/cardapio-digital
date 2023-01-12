/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", // Note the addition of the `app` directory.
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      xs: "350px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },

    extend: {
      boxShadow: {
        sm: "0px 0px 2px rgba(0, 0, 0, 0.25);"
      },
      colors: {
        "white-300": "#F7F7F7",

        "purple-500": "#8047F8",

        "yellow-500": "#C47F17",

        "gray-300": "#E2E2E2",
        "gray-400": "#838383",
        "gray-500": "#727272",
        "gray-700": "#3A3A3A",
        "gray-600": "#454545",
        "gray-800": "#282828",

        "green-100": "#1FA262",
      },
    },
  },
  plugins: [],
};
