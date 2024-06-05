/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'selector', // or 'media' or 'class'
  theme: {
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    colors: {
      'transparent': 'transparent',
      'background-light': '#FBF9F7',
      'main-green': '#8AB17C',
      'main-brown': '#EB996E',
      'light-green': '#F2F9E9',
      'light-brown': '#F3D6B3',
      yellow: '#FFC400',
      'text-light': '#333333',
      'text-dark': '#FFFFFF',
      gray: '#909090'
    },
    fontFamily: {
      'logo': ['Kaushan Script', 'cursive'],
      'sans': ['Inter', 'sans-serif'],
    },
    extend: {
      screens: {
        '3xl': '1920px',
      },
      fontSize:{
        '7.5xl': '5.5rem',
        '6.5xl': '4.25rem',
        '5.5xl': '4rem',
        '4.5xl': '3rem',
      },
      spacing: {
        'sect-default': '10rem',
        'sect-medium': '20rem',
        'sect-long': '40rem'
      },
      inset: {
        '5p': '5%',
        '1/10': '10%',
        '1/5': '20%',
        '15p': '15%',
        '2/5': '40%',
      },
      scale: {
        '60': '.6',
      },
    },
  },
  variants: {
    extend: {
      fontSize: ['responsive'],
    },
  },
  plugins: [],
}
