import React, { memo } from "react";
import "src/components/Footer/footer.css";
import { NavLink } from "react-router-dom";
import planeIcon from "src/assets/svg/plane-icon.svg";
import { motion } from "framer-motion";
import { scrollToTop } from "src/utils/scrollToTop";
import StaggerLogo from "../common/StaggerLogo";
import { Link } from "react-router-dom";
import { VisibilityVariants } from "src/utils/variants";

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
  hiddenY: VisibilityVariants.hiddenY,
  visible: VisibilityVariants.visible,
};

const Footer = () => {
  return (
    <footer className="flex flex-col self-end border-t border-solid border-gray xl:pt-20 2xl:pt-20">
      <div className="px-sect flex items-end justify-between">
        <motion.p
          initial="hiddenY"
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
            Leave your email
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
            whileHover={{ scale: 1.05, x: 5, transition: { duration: 0.2 } }}
            whileTap={{ scale: 0.95, x: 0 }}
            title="subscribe"
          >
            {" "}
            <img src={planeIcon} alt="" className="cursor-hover-small" />{" "}
          </motion.button>
        </div>
      </div>

      <motion.div
        initial="hiddenY"
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
                  <NavLink to={item.path} target="_top">{item.display}</NavLink>
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
                  <Link to={item.path}>{item.display}</Link>
                </motion.li>
              ))}
            </ul>
          </nav>
        </div>

        <button className="underline-btn" onClick={scrollToTop}>
          Back to top <i className="cursor-hover-small ri-arrow-up-line"></i>
        </button>
      </motion.div>

      <div className="flex justify-center border-t border-solid border-gray">
        <div className="w-screen select-none overflow-hidden text-center font-logo text-text-light lg:mr-16 lg:text-8xl xl:text-13xl 2xl:text-14xl 3xl:text-15xl">
          <StaggerLogo />
        </div>
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

export default memo(Footer);
