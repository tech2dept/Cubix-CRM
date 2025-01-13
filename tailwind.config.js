/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", 
  ],
  plugins: [require('tailwind-scrollbar')],
  theme: {
    extend: {
      colors: {
        customBlue: 'rgba(25, 118, 210, 0.12)', // Add your RGBA color here
        newLabel: 'FE9B0F',
        contacted: '#FF3030',
        attemptedToContact: 'FF8989',
        qualified: '46FD09',
        unqualified: '#FB4584',
        biegeBackground: '#F4F1EA'
      },
      fontFamily: {
        figtree: ['Figtree', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
}

