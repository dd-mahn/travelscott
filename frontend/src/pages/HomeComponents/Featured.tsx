import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import featured1 from "src/assets/images/ui/home/featured-1.jpg";
import featured2 from "src/assets/images/ui/home/featured-2.jpg";
import featured3 from "src/assets/images/ui/home/featured-3.jpg";
import featured4 from "src/assets/images/ui/home/featured-4.jpg";
import featured5 from "src/assets/images/ui/home/featured-5.jpg";
import featured6 from "src/assets/images/ui/home/featured-6.jpg";
import featured7 from "src/assets/images/ui/home/featured-7.jpg";
import featured8 from "src/assets/images/ui/home/featured-8.jpg";
import featured9 from "src/assets/images/ui/home/featured-9.jpg";
import featured10 from "src/assets/images/ui/home/featured-10.jpg";
import planeIcon from "src/assets/svg/plane-icon.svg";

import HorizontalScrollCarousel from "./FeaturedHorizontalScroller";

const featuredDemo = [
  {
    _id: "1",
    places: {},
    insight: {},
    continent: "",
    description: "",
    transportation: {},
    additionalInfo: {},
    summary: "",
    location: "",
    video: "",
    featured: true,
    images: [featured1],
    name: "A destination with culture",
    country: "Country",
    tags: ["Nature&Adventure", "Africa", "SoloTravel"],
  },
  {
    _id: "2",
    places: {},
    insight: {},
    continent: "",
    description: "",
    transportation: {},
    additionalInfo: {},
    summary: "",
    location: "",
    video: "",
    featured: true,
    images: [featured2],
    name: "A destination with nature",
    country: "Country",
    tags: ["Nature&Adventure", "North America", "SoloTravel"],
  },
  {
    _id: "3",
    places: {},
    insight: {},
    continent: "",
    description: "",
    transportation: {},
    additionalInfo: {},
    summary: "",
    location: "",
    video: "",
    featured: true,
    images: [featured3],
    name: "A destination with nature",
    country: "Country",
    tags: ["Nature&Adventure", "Europe", "SoloTravel"],
  },
  {
    _id: "4",
    places: {},
    insight: {},
    continent: "",
    description: "",
    transportation: {},
    additionalInfo: {},
    summary: "",
    location: "",
    video: "",
    featured: true,
    images: [featured4],
    name: "A destination with nature",
    country: "Country",
    tags: ["Nature&Adventure", "Asia", "SoloTravel"],
  },
  {
    _id: "5",
    places: {},
    insight: {},
    continent: "",
    description: "",
    transportation: {},
    additionalInfo: {},
    summary: "",
    location: "",
    video: "",
    featured: true,
    images: [featured5],
    name: "A destination with nature",
    country: "Country",
    tags: ["Nature&Adventure", "Europe", "SoloTravel"],
  },
  {
    _id: "6",
    places: {},
    insight: {},
    continent: "",
    description: "",
    transportation: {},
    additionalInfo: {},
    summary: "",
    location: "",
    video: "",
    featured: true,
    images: [featured6],
    name: "A destination with nature",
    country: "Country",
    tags: ["Nature&Adventure", "Europe", "SoloTravel"],
  },
  {
    _id: "7",
    places: {},
    insight: {},
    continent: "",
    description: "",
    transportation: {},
    additionalInfo: {},
    summary: "",
    location: "",
    video: "",
    featured: true,
    images: [featured7],
    name: "A destination with nature",
    country: "Country",
    tags: ["Nature&Adventure", "Europe", "SoloTravel"],
  },
  {
    _id: "8",
    places: {},
    insight: {},
    continent: "",
    description: "",
    transportation: {},
    additionalInfo: {},
    summary: "",
    location: "",
    video: "",
    featured: true,
    images: [featured8],
    name: "A destination with nature",
    country: "Country",
    tags: ["Nature&Adventure", "Europe", "SoloTravel"],
  },
  {
    _id: "9",
    places: {},
    insight: {},
    continent: "",
    description: "",
    transportation: {},
    additionalInfo: {},
    summary: "",
    location: "",
    video: "",
    featured: true,
    images: [featured9],
    name: "A destination with nature",
    country: "Country",
    tags: ["Nature&Adventure", "Europe", "SoloTravel"],
  },
  {
    _id: "10",
    places: {},
    insight: {},
    continent: "",
    description: "",
    transportation: {},
    additionalInfo: {},
    summary: "",
    location: "",
    video: "",
    featured: true,
    images: [featured10],
    name: "A destination with nature",
    country: "Country",
    tags: ["Nature&Adventure", "Europe", "SoloTravel"],
  },
];

const variants = {
  hiddenShort: {
    opacity: 0,
    y: 20,
  },
  hidden: {
    opacity: 0,
    y: 100,
  },
  visible: {
    opacity: 1,
    y: 0,
  },
};

const Featured: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="featured flex flex-col lg:gap-28 xl:gap-32 2xl:gap-36 3xl:gap-40">
      <div className="px-sect grid w-full place-items-center overflow-hidden">
        <motion.h1
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.4 }}
          variants={variants}
          className="h1-md relative"
        >
          <i className="ri-shining-2-fill rotate-30 absolute -left-[5%] -top-0 transform text-yellow lg:text-3xl xl:text-4xl 2xl:text-4xl 3xl:text-5xl"></i>{" "}
          Featured Destinations
        </motion.h1>
      </div>
      <HorizontalScrollCarousel data={featuredDemo} />
      <div className="px-sect flex w-full flex-row justify-between">
        <motion.p
          initial="hiddenShort"
          whileInView="visible"
          viewport={{ once: true, margin: "-300px" }}
          transition={{ duration: 0.5 }}
          variants={variants}
          className="p-large"
        >
          They are just so few among the{" "}
          <span className="font-semibold text-main-brown lg:text-xl xl:text-2xl 2xl:text-3xl 3xl:text-4xl">
            100
          </span>
          + <br />
          destinations that we have covered in our Catalogue.
        </motion.p>
        <motion.div
          initial="hiddenShort"
          whileInView="visible"
          viewport={{ once: true, margin: "-300px" }}
          transition={{ delay: 0.3, duration: 0.5 }}
          variants={variants}
          className="relative flex items-end"
        >
          <div className="blob blur-blob absolute z-0 h-full w-1/3"></div>
          <button
            title="navigate"
            className="btn btn-secondary z-5"
            onClick={() => {
              navigate("/discover");
            }}
          >
            discover them <img src={planeIcon} alt="" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Featured;
