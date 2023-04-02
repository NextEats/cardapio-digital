/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './app/**/*.{js,ts,jsx,tsx}', // Note the addition of the `app` directory.
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
        './src/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        screens: {
            xs: '350px',
            '2xs': '440px',
            '3xs': '530px',
            sm: '640px',
            md: '768px',
            '2md': '900px',
            lg: '1024px',
            xl: '1280px',
            '1xl': '1360px',
            '2xl': '1536px',
        },

        extend: {
            keyframes: {
                slideUpAndFade: {
                    from: { opacity: 0, transform: 'translateY(2px)' },
                    to: { opacity: 1, transform: 'translateY(0)' },
                },
                slideRightAndFade: {
                    from: { opacity: 0, transform: 'translateX(-2px)' },
                    to: { opacity: 1, transform: 'translateX(0)' },
                },
                slideDownAndFade: {
                    from: { opacity: 0, transform: 'translateY(-2px)' },
                    to: { opacity: 1, transform: 'translateY(0)' },
                },
                slideLeftAndFade: {
                    from: { opacity: 0, transform: 'translateX(2px)' },
                    to: { opacity: 1, transform: 'translateX(0)' },
                },
            },
            animation: {
                slideUpAndFade: 'slideUpAndFade 400ms',
                slideRightAndFade: 'slideRightAndFade 400ms',
                slideDownAndFade: 'slideDownAndFade 400ms',
                slideLeftAndFade: 'slideLeftAndFade 400ms',
            },

            boxShadow: {
                sm: '0px 0px 2px rgba(0, 0, 0, 0.25);',
                md: '0px 0px 8px rgba(0, 0, 0, 0.3);',
            },
            gridTemplateColumns: {
                xlcharts: 'repeat(2, auto)',
            },
            colors: {
                primary: '#de6114eb',
                white: '#FFFFFF',
                'white-300': '#F7F7F7',
                'white-200': '#F7F8FC',
                'white-blue': '#E7F0FF',

                'purple-500': '#8047F8',

                'blue-400': '#007BFF',
                'blue-500': '#4066D5',

                'yellow-400': '#F7C443',
                'yellow-500': '#C47F17',

                'red-50': '#FEF2F2',
                'red-orange': '#FC3B1D',
                'red-400': '#FF371C',

                'gray-300': '#E2E2E2',
                'gray-350': '#898989',
                'gray-400': '#838383',
                'gray-500': '#727272',
                'gray-600': '#454545',
                'gray-700': '#3A3A3A',
                'gray-800': '#282828',
                'gray-900': '#1A1A1A',

                'gray-red-400': '#574F4D',

                'green-300': '#1DC88A',
                'green-100': '#1FA262',

                'brand-light-orange': '#FC892C',
                'brand-dark-orange': '#FC6E25',
            },
        },
    },
    plugins: [
        function ({ addVariant }) {
            addVariant('child', '& > *');
            addVariant('child-hover', '& > *:hover');
        },
    ],
};
