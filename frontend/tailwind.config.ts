import type { Config } from "tailwindcss";
import withMT from "@material-tailwind/react/utils/withMT";
// const withMT = require("@material-tailwind/react/utils/withMT");

const config: Config = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: "class", // or 'media' or 'class'
  safelist: [
    "bg-wilderness",
    "bg-cultureheritage",
    "bg-foodlovers",
    "bg-solojourneys",
    "bg-cityscape",
    "bg-seasonfestival",
    "bg-relaxation",
    "bg-firsttimeabroad",
  ],
  theme: {
    screens: {
      sm: "576px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    colors: {
      transparent: "transparent",
      "background-dark": "#1e2125",
      "background-dark-transparent": "#101010",
      "background-light": "#FBF9F7",
      "main-green": "#8AB17C",
      "main-brown": "#EB996E",
      "dark-brown": "#b56f49",
      "dark-green": "#658f55",
      "light-green": "#F8FCF3",
      "light-brown": "#FFF9F3",
      "background-dark-green": "#374137",
      "background-dark-brown": "#322d27",
      yellow: "#F1BA50",
      "text-light": "#333333",
      "text-dark": "#F2F2F2",
      gray: "#969696",
      "aurora-green": "#90B37F",
      "aurora-brown": "#FFDDAA",
      wilderness: "#8AB17C",
      cultureheritage: "#97764F",
      foodlovers: "#B17C8C",
      solojourneys: "#333333",
      cityscape: "#B9D1D1",
      seasonfestival: "#C35757",
      relaxation: "#A6DBB8",
      firsttimeabroad: "#EB996E",
    },
    fontFamily: {
      logo: ["Kaushan Script", "cursive"],
      sans: ["Inter", "sans-serif"],
      prima: ["MD Nichrome", "sans-serif"],
    },
    extend: {
      screens: {
        "3xl": "1920px",
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      boxShadow: {
        section: "-5px 5px 30px 10px rgba(51, 51, 51, 0.30)",
        "section-dark": "-5px 5px 20px 10px rgba(242, 242, 242, 0.20)",
        component: "-5px 5px 30px 0px rgba(51, 51, 51, 0.30)",
        "component-dark": "-5px 5px 30px 0px rgba(242, 242, 242, 0.20)",
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
        "sect-short-mobile": "2rem",
        "sect-default-mobile": "5rem",
        "sect-long-mobile": "10rem",
        "sect-short": "5rem",
        "sect-default": "20rem",
        "sect-medium": "30rem",
        "sect-semi": "40rem",
        "sect-long": "50rem",
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

const withMTConfig = withMT(config);

export default withMTConfig;
