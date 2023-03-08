/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
        './app/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            backgroundSize: {
                'size-200': '200% 200%',
            },
            backgroundPosition: {
                'pos-0': '0% 0%',
                'pos-100': '100% 100%',
            },

            keyframes: {
                wiggle: {
                    '0%, 100%': {transform: 'rotate(0deg)'},
                    '25%': {transform: 'rotate(-20deg)'},
                    '75%': {transform: 'rotate(20deg)'},
                }
            },
        },

    },
    plugins: [
        require('@tailwindcss/line-clamp'),
        require('@headlessui/tailwindcss')
    ],
}
