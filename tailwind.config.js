/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // Enables dark mode with a class
  content: ['./src/**/*.{js,jsx,ts,tsx}'], // Adjust as needed
  theme: {
    extend: {
      colors: {
        primaryLight: '#ffffff', // Light theme colors
        primaryDark: '#1a1a1a', // Dark theme colors
        accentLight: '#007bff',
        accentDark: '#0056b3',
      },
    },
  },
  plugins: [],
};


