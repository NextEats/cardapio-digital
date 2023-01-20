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
      "2xs": "440px",
      "3xs": "530px",
      sm: "640px",
      md: "768px",
      "2md": "900px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },

    extend: {
      boxShadow: {
        sm: "0px 0px 2px rgba(0, 0, 0, 0.25);",
        md: "0px 0px 8px rgba(0, 0, 0, 0.3);",
      },
      gridTemplateColumns: {
        'xlcharts': 'repeat(2, auto)'
      },
      colors: {
        white: "#FFFFFF",
        "white-300": "#F7F7F7",
        "white-200": "#F7F8FC",

        "purple-500": "#8047F8",

        "blue-500": "#4066D5",

        "yellow-400": "#F7C443",
        "yellow-500": "#C47F17",

        "red-50": "#FEF2F2",
        "red-400": "#FF371C",

        "gray-300": "#E2E2E2",
        "gray-400": "#838383",
        "gray-500": "#727272",
        "gray-700": "#3A3A3A",
        "gray-600": "#454545",
        "gray-800": "#282828",

        "green-300": "#1DC88A",
        "green-100": "#1FA262",
      },
    },
  },
  plugins: [],
};
