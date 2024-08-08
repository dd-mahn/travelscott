import React from "react";
import "src/components/Footer/footer.css";
import { NavLink } from "react-router-dom";
import planeIcon from "src/assets/svg/plane-icon.svg";
import footerVideo from "src/assets/videos/footer.mp4";
import { motion } from "framer-motion";

const sitemap = [
  {
    path: "/",
    display: "Home",
  },
  {
    path: "/about",
    display: "About",
  },
  {
    path: "/discover",
    display: "Discover",
  },
  {
    path: "/inspiration",
    display: "Inspiration",
  },
  {
    path: "/contact",
    display: "Contact",
  },
];

const socials = [
  {
    path: "/",
    display: "ProductHunt",
  },
  {
    path: "/",
    display: "Twitter",
  },
  {
    path: "/",
    display: "Instagram",
  },
  {
    path: "/",
    display: "Facebook",
  },
];

const otherLinks = [
  {
    path: "/privacy",
    display: "Privacy Policy",
  },
];

const variants = {
  hidden: { opacity: 0, y: 50 },
  hiddenY: (y: string) => {
    return {
      y: y,
    };
  },
  visible: { opacity: 1, y: 0 },
};

const Footer = () => {
  return (
    <footer className="flex flex-col self-end border-t border-solid border-gray xl:pt-20 2xl:pt-20">
      <div className="px-sect flex items-end justify-between">
        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={variants}
          transition={{ duration: 0.6 }}
          className="p-large text-text-light"
        >
          Made and curated by people with <br />
          passion in travel, Travel, and TRAVEL.
        </motion.p>
        <div className="styled-input flex w-fit items-center justify-between border-b border-solid border-text-light">
          <label
            htmlFor="subscribe-email"
            className="label span-regular uppercase"
          >
            Subscribe with email
          </label>
          <input
            type="email"
            id="subscribe-email"
            className="input p-regular border-0 bg-transparent focus:outline-none"
            onFocus={() => {
              const input = document.getElementById("subscribe-email");
              if (input) {
                const styledInput = input.closest(".styled-input");
                if (styledInput) styledInput.classList.add("active");
              }
            }}
            onBlur={() => {
              const input = document.getElementById("subscribe-email");
              if (input && (input as HTMLInputElement).value === "") {
                const styledInput = input.closest(".styled-input");
                if (styledInput) styledInput.classList.remove("active");
              }
            }}
          />
          <motion.button
            initial={{ x: -40, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.1 }}
            whileHover={{ scale: 1.05, x: 10 }}
            whileTap={{ scale: 0.95, x: 0 }}
            title="subscribe"
          >
            {" "}
            <img src={planeIcon} alt="" />{" "}
          </motion.button>
        </div>
      </div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={variants}
        transition={{ duration: 0.6 }}
        className="px-sect flex items-end justify-between"
      >
        <div className="z-10 flex lg:gap-8 xl:gap-10 2xl:gap-12 3xl:gap-12">
          <nav className="flex flex-col lg:gap-2 2xl:gap-4">
            <span className="font-medium text-text-light lg:text-lg 2xl:text-xl">
              Sitemap
            </span>
            <ul className="flex flex-col justify-start">
              {sitemap.map((item, index) => (
                <motion.li
                  whileHover={{ color: "var(--text-light)" }}
                  transition={{ duration: 0.2 }}
                  key={index}
                  className="text-gray"
                >
                  <NavLink to={item.path}>{item.display}</NavLink>
                </motion.li>
              ))}
            </ul>
          </nav>

          <nav className="flex flex-col lg:gap-2 2xl:gap-4">
            <span className="font-medium text-text-light lg:text-lg 2xl:text-xl">
              Socials
            </span>
            <ul className="flex flex-col justify-start">
              {socials.map((item, index) => (
                <motion.li
                  whileHover={{ color: "var(--text-light)" }}
                  transition={{ duration: 0.2 }}
                  key={index}
                  className="text-gray"
                >
                  <NavLink to={item.path}>{item.display}</NavLink>
                </motion.li>
              ))}
            </ul>
          </nav>
        </div>

        <button className="underline-btn" onClick={() => window.scrollTo(0, 0)}>
          Back to top <i className="ri-arrow-up-line"></i>
        </button>
      </motion.div>

      <div className="flex justify-center border-t border-solid border-gray">
        {/* <video
          autoPlay
          muted
          loop
          src={footerVideo}
          className="absolute left-0 top-0 h-full w-full object-cover"
        ></video> */}
        {/* <div className="overflow-hidden"> */}
        <div className="font-kaushan 230:mr-32 w-screen select-none overflow-hidden text-center text-text-light lg:mr-16 lg:text-8xl lg:[--y-from:250px] xl:text-13xl 2xl:text-14xl 2xl:[--y-from:200px] 3xl:text-15xl">
          <motion.div
            initial={variants.hiddenY("var(--y-from)")}
            whileInView="visible"
            viewport={{ once: true }}
            variants={variants}
            transition={{ duration: 0.6, delay: 0 }}
            className="inline-block lg:[--y-from:250px] 2xl:[--y-from:300px]"
          >
            T
          </motion.div>
          <motion.div
            initial={variants.hiddenY("var(--y-from)")}
            whileInView="visible"
            viewport={{ once: true }}
            variants={variants}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="inline-block lg:[--y-from:250px] 2xl:[--y-from:300px]"
          >
            r
          </motion.div>
          <motion.div
            initial={variants.hiddenY("var(--y-from)")}
            whileInView="visible"
            viewport={{ once: true }}
            variants={variants}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="inline-block lg:[--y-from:250px] 2xl:[--y-from:300px]"
          >
            a
          </motion.div>
          <motion.div
            initial={variants.hiddenY("var(--y-from)")}
            whileInView="visible"
            viewport={{ once: true }}
            variants={variants}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="inline-block lg:[--y-from:250px] 2xl:[--y-from:300px]"
          >
            v
          </motion.div>
          <motion.div
            initial={variants.hiddenY("var(--y-from)")}
            whileInView="visible"
            viewport={{ once: true }}
            variants={variants}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="inline-block lg:[--y-from:250px] 2xl:[--y-from:300px]"
          >
            e
          </motion.div>
          <motion.div
            initial={variants.hiddenY("var(--y-from)")}
            whileInView="visible"
            viewport={{ once: true }}
            variants={variants}
            transition={{ duration: 0.4, delay: 0.25 }}
            className="inline-block lg:[--y-from:250px] 2xl:[--y-from:300px]"
          >
            l
          </motion.div>
          <motion.div
            initial={variants.hiddenY("var(--y-from)")}
            whileInView="visible"
            viewport={{ once: true }}
            variants={variants}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="inline-block lg:[--y-from:250px] 2xl:[--y-from:300px]"
          >
            S
          </motion.div>
          <motion.div
            initial={variants.hiddenY("var(--y-from)")}
            whileInView="visible"
            viewport={{ once: true }}
            variants={variants}
            transition={{ duration: 0.4, delay: 0.35 }}
            className="inline-block lg:[--y-from:250px] 2xl:[--y-from:300px]"
          >
            c
          </motion.div>
          <motion.div
            initial={variants.hiddenY("var(--y-from)")}
            whileInView="visible"
            viewport={{ once: true }}
            variants={variants}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="inline-block lg:[--y-from:250px] 2xl:[--y-from:300px]"
          >
            o
          </motion.div>
          <motion.div
            initial={variants.hiddenY("var(--y-from)")}
            whileInView="visible"
            viewport={{ once: true }}
            variants={variants}
            transition={{ duration: 0.4, delay: 0.45 }}
            className="inline-block lg:[--y-from:250px] 2xl:[--y-from:300px]"
          >
            t
          </motion.div>
          <motion.div
            initial={variants.hiddenY("var(--y-from)")}
            whileInView="visible"
            viewport={{ once: true }}
            variants={variants}
            transition={{ duration: 0.4, delay: 0.5 }}
            className="inline-block lg:[--y-from:250px] 2xl:[--y-from:300px]"
          >
            t
          </motion.div>
        </div>
        {/* </div> */}
      </div>

      <div className="px-sect flex flex-row items-center justify-between border-t border-solid border-gray lg:h-8 2xl:h-10">
        <span className="select-none font-medium uppercase text-gray lg:text-base xl:text-sm 2xl:text-lg">
          Copyright TravelScott 2024
        </span>
        <nav>
          <ul className="flex flex-row justify-start">
            {otherLinks.map((item, index) => (
              <motion.li
                whileHover={{ color: "var(--text-light)" }}
                transition={{ duration: 0.2 }}
                key={index}
                className="text-gray"
              >
                <NavLink to={item.path}>{item.display}</NavLink>
              </motion.li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
