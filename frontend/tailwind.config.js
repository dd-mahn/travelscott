/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: "selector", // or 'media' or 'class'
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    colors: {
      transparent: "transparent",
      "background-dark": "#21272F",
      "background-light": "#FBF9F7",
      "main-green": "#8AB17C",
      "main-brown": "#EB996E",
      "light-green": "#F8FCF3",
      "light-brown": "#FFF9F3",
      yellow: "#F1BA50",
      "text-light": "#333333",
      "text-dark": "#FFFFFF",
      gray: "#969696",
      "aurora-green": "90B37F",
      "aurora-brown": "FFDDAA",
    },
    fontFamily: {
      logo: ["Kaushan Script", "cursive"],
      sans: ["Inter", "sans-serif"],
      prima: ["MD Nichrome Test", "sans-serif"],
    },
    extend: {
      screens: {
        "3xl": "1920px",
      },
      borderRadius:{
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      boxShadow:{
        "section": "-5px 5px 30px 10px rgba(51, 51, 51, 0.30)",
      },
      fontSize: {
        "15xl": "24rem",
        "14xl": "22rem",
        "13xl": "16rem",
        "12xl": "14rem",
        "11xl": "12rem",
        "10xl": "10rem",
        "9.5xl": "9rem",
        "8.5xl": "7rem",
        "7.5xl": "5.5rem",
        "6.5xl": "4.5rem",
        "5.5xl": "4rem",
        "4.5xl": "2.75rem",
        "3.5xl": "2rem",
        "2.5xl": "1.75rem",
        "1.5xl": "1.375rem",
      },
      spacing: {
        "sect-short": "5rem",
        "sect-default": "20rem",
        "sect-medium": "30rem",
        "sect-semi": "40rem",
        "sect-long": "50rem",
      },
      inset: {
        "5p": "5%",
        "1/10": "10%",
        "1/5": "20%",
        "15p": "15%",
        "2/5": "40%",
      },
      scale: {
        40: ".4",
        60: ".6",
        70: ".7",
      },
      rotate: {
        30: "30deg",
      },
      height: {
        "0.5svh": "50svh",
        "0.75svh": "75svh",
        "1.25svh": "125svh",
        "1.5svh": "150svh",
        "1.75svh": "175svh",
        "2svh": "200svh",
        "2.25svh": "225svh",
      },
      width: {
        "0.3svw": "30svw",
        "0.35svw": "35svw",
        "0.4svw": "40svw",
        "0.5svw": "50svw",
        "0.6svw": "60svw",
        "0.7svw": "70svw",
        "0.8svw": "80svw",
        "0.9svw": "90svw",
        "2.5svw": "250svw",
        "3.5svw": "350svw",
        "4.5svw": "450svw",
        "5.5svw": "550svw",
        "45p": "45%",
      },
      gridAutoColumns: {
        0.35: "35%",
        "1/4": "25%",
        "1/3": "33.33%",
        "2/5": "40%",
        "1/2": "50%",
        "3/4": "75%",
      },
      gridAutoRows:{
        "1/5": "20%",
        "1/4": "25%",
        "1/3": "33.33%",
        "2/5": "40%",
        "1/2": "50%",
        "3/4": "75%",
      },
      minWidth: {
        "1/5": "20%",
        "1/4": "25%",
        "1/3": "33.33%",
        "2/5": "40%",
        "1/2": "50%",
        "3/4": "75%",
      },
      maxWidth: {
        "1/5": "20%",
        0.23: "23%",
        "1/4": "25%",
        "1/3": "33.33%",
        "2/5": "40%",
        "1/2": "50%",
        "3/4": "75%",
      },
    },
  },
  variants: {
    extend: {
      fontSize: ["responsive"],
    },
  },
  plugins: [],
};
