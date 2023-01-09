/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", // Note the addition of the `app` directory.
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {

        "white-300": "#F7F7F7", 

        "purple-500": "#8047F8", 
        
        "yellow-500": "#C47F17",

        "gray-300": "#E2E2E2",
        "gray-400": "#838383",
        "gray-500": "#727272",
        "gray-700": "#3A3A3A",
        "gray-600": "#454545",

        "green-100": "#1FA262",
      }
    },
  },
  plugins: [],
};
