/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'wordle-green': '#6AAA64',
        'wordle-yellow': '#C9B458',
        'wordle-gray': '#787C7E',
      },
    },
  },
  plugins: [],
}

