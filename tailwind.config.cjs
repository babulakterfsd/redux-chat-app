/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            screens: {},

            colors: {
                darkChocolate: '#1C0A00',
                chocolate: '#361500',
                lightYellow: '#CC9544',
            },

            fontFamily: {
                body: ['Poppins', 'sans-serif'],
                montserrat: ['Montserrat', 'sans-serif'],
            },
        },
    },
    plugins: [],
};
