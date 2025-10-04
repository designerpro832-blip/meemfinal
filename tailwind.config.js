// tailwind.config.js
const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'paper-texture': "url('https://img-wrapper.vercel.app/image?url=https://www.transparenttextures.com/patterns/paper-fibers.png')",
      },
      colors: {
        'brand': {
          // Chocolate Inspired Palette
          'primary': '#98755B',      // Light Brown (accent)
          'secondary': '#3D1F12',    // Espresso (main action)
          'accent': '#FFFFFF',
          'text': '#3D1F12',        // Espresso
          'background': '#F1EADA',  // Milk
          
          // Legacy mapping for compatibility
          'dark-blue': '#3D1F12',    // Espresso
          'mid-blue': '#584738',     // Mahogany
          'light-blue': '#98755B',    // Light Brown
          'dark-teal': '#3D1F12',    // Espresso
          'coral': '#3D1F12',      // Espresso (primary buttons)
          'pink': '#98755B',        // Light Brown
        },
        'ui': {
          'background': '#F1EADA',    // Milk
          'surface': '#FFFFFF',       // White for cards
          'text-primary': '#3D1F12',    // Espresso
          'text-secondary': '#584738', // Mahogany
          'text-light': '#F1EADA',     // Milk (on dark backgrounds)
        }
      },
      fontFamily: {
        sans: ['Poppins', ...defaultTheme.fontFamily.sans],
        serif: ['Georgia', 'serif'],
      },
      borderRadius: {
        '4xl': '2rem',
      },
      boxShadow: {
        'subtle': '0 4px 12px 0 rgba(0, 0, 0, 0.05)',
        'subtle-lg': '0 8px 20px 0 rgba(0, 0, 0, 0.05)',
      }
    }
  },
  plugins: [],
};
