import React, { memo } from "react";
import "src/styles/components/footer.css";
import { NavLink, Link } from "react-router-dom";
import planeIcon from "src/assets/svg/plane-icon.svg";
import { motion } from "framer-motion";
import { scrollToTop } from "src/utils/scrollToTop";
import StaggerLogo from "src/common/StaggerLogo/StaggerLogo";
import { VisibilityVariants } from "src/utils/constants/variants";
import { useNotification } from "src/context/NotificationContext/NotificationContext";
import { sendSubscribe } from "src/services/apis/sendSubscribe";
import { useViewportWidth } from "src/hooks/useViewportWidth/useViewportWidth";

// Sitemap links
const sitemap = [
  { path: "/", display: "Home" },
  { path: "/about", display: "About" },
  { path: "/discover", display: "Discover" },
  { path: "/inspiration", display: "Inspiration" },
  { path: "/contact", display: "Contact" },
];

// Social media links
const socials = [
  { path: "/", display: "ProductHunt" },
  { path: "/", display: "Twitter" },
  { path: "/", display: "Instagram" },
  { path: "/", display: "Facebook" },
];

// Other links
const otherLinks = [{ path: "/privacy", display: "Privacy Policy" }];

// Animation variants
const variants = {
  hiddenY: VisibilityVariants.hiddenY,
  visible: VisibilityVariants.visible,
  blobAnimation: {
    scale: [1, 1.5, 1],
    opacity: [0.6, 0.7, 0.6],
    zIndex: [0, 0, 0],
    transition: { duration: 5, repeat: Infinity },
  },
};

const Footer = () => {
  const viewportWidth = useViewportWidth();
  const { showNotification } = useNotification();

  // Handle subscription
  const handleSubscribe = async (email: string) => {
    const success = await sendSubscribe(email);
    if (success) {
      showNotification("Thank you for subscribing!");
    } else {
      showNotification("Failed to send. Please try again later.");
    }
  };

  return (
    <footer className="relative flex flex-col self-end overflow-hidden border-t border-solid border-gray pt-6 lg:pt-12 xl:pt-20 2xl:pt-20">
      <motion.div
        initial="hidden"
        animate="blobAnimation"
        variants={variants}
        className="blob-brown blur-blob absolute -right-1/3 top-[40%] z-0 h-[80%] w-1/2 opacity-60"
      ></motion.div>

      <div className="px-sect z-10 flex flex-col items-center gap-8 md:flex-row md:items-start md:justify-between">
        <motion.p
          initial="hiddenY"
          whileInView="visible"
          viewport={{ once: true }}
          variants={variants}
          transition={{ duration: 0.6 }}
          className="p-large w-full text-center text-text-light md:w-fit md:text-left"
        >
          Made and curated by people with <br />
          passion in travel, Travel, and TRAVEL.
        </motion.p>
        <div className="styled-input flex w-[90%] items-center justify-between border-b border-solid border-text-light dark:border-text-dark md:mt-2 md:w-fit">
          <label
            htmlFor="subscribe-email"
            className="label span-regular uppercase"
          >
            Leave your email
          </label>
          <input
            type="email"
            id="subscribe-email"
            className="input p-regular border-0 bg-transparent valid:text-main-green invalid:text-main-brown focus:outline-none"
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
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSubscribe(
                  (document.getElementById("subscribe-email") as HTMLInputElement)
                    .value
                );
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
            onClick={() =>
              handleSubscribe(
                (document.getElementById("subscribe-email") as HTMLInputElement)
                  .value,
              )
            }
          >
            <img
              src={planeIcon}
              alt=""
              className="cursor-hover-small dark:invert"
            />
          </motion.button>
        </div>
      </div>

      <motion.div
        initial="hiddenY"
        whileInView="visible"
        viewport={{ once: true }}
        variants={variants}
        transition={{ duration: 0.6 }}
        className="px-sect z-10 flex items-center justify-center pb-4 md:mt-4 md:items-end md:justify-between md:pb-4"
      >
        {viewportWidth >= 768 && (
          <div className="z-10 flex gap-6 lg:gap-8 xl:gap-10 2xl:gap-12 3xl:gap-12">
            <nav className="flex flex-col gap-1 lg:gap-2 2xl:gap-4">
              <span className="p-medium font-medium text-text-light">
                Sitemap
              </span>
              <ul className="flex flex-col justify-start">
                {sitemap.map((item, index) => (
                  <motion.li
                    initial={{ opacity: 0.6 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                    key={index}
                    className="p-regular"
                  >
                    <NavLink to={item.path}>{item.display}</NavLink>
                  </motion.li>
                ))}
              </ul>
            </nav>

            <nav className="flex flex-col gap-1 lg:gap-2 2xl:gap-4">
              <span className="p-medium font-medium text-text-light">
                Socials
              </span>
              <ul className="flex flex-col justify-start">
                {socials.map((item, index) => (
                  <motion.li
                    initial={{ opacity: 0.6 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                    key={index}
                    className="p-regular"
                  >
                    <Link to={item.path}>{item.display}</Link>
                  </motion.li>
                ))}
              </ul>
            </nav>
          </div>
        )}

        <button
          className="underline-btn span-medium border-b border-text-light dark:border-text-dark md:border-none mt-8 md:mt-0"
          onClick={scrollToTop}
        >
          Back to top <i className="cursor-hover-small ri-arrow-up-line"></i>
        </button>
      </motion.div>

      {viewportWidth > 768 && (
        <div className="z-10 grid w-screen place-items-center border-t border-solid border-gray py-2">
          <div className="pointer-events-none w-screen overflow-hidden">
            <StaggerLogo />
          </div>
        </div>
      )}

      <div className="px-sect z-10 flex flex-col items-center justify-between border-t border-solid border-gray py-2 md:flex-row">
        <span className="span-small select-none font-medium uppercase text-gray">
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
                <NavLink to={item.path} className="span-small">
                  {item.display}
                </NavLink>
              </motion.li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
};

export default memo(Footer);
