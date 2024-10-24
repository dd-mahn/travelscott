import React, { memo, useState } from "react";
import "src/styles/contact.css";
import { AnimatePresence, motion } from "framer-motion";
import { sendFeedback } from "src/services/apis/sendFeedback";
import config from "src/config/config";
import { resetForm } from "src/utils/resetForm";
import StyledInput from "src/common/StyledInput";
import { SecondaryButton } from "src/common/Button";
import {
  HoverVariants,
  TapVariants,
  VisibilityVariants,
} from "src/utils/constants/variants";
import { useNotification } from "src/context/NotificationContext";
import { Link } from "react-router-dom";

// Define animation variants
const variants = {
  hidden: VisibilityVariants.hidden,
  hiddenY: VisibilityVariants.hiddenY,
  visible: VisibilityVariants.visible,
  dropHidden: VisibilityVariants.dropHidden,
  hoverScale: HoverVariants.hoverScale,
  tapScale: TapVariants.tapScale,
  rotate: VisibilityVariants.rotate,
  blobAnimation: {
    scale: [1, 1.5, 1],
    opacity: [0.6, 0.7, 0.6],
    zIndex: [0, 0, 0],
    transition: { duration: 5, repeat: Infinity },
  },
};

const Contact: React.FC = () => {
  const [visibleSection, setVisibleSection] = useState("");
  const [formValid, setFormValid] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);
  const { showNotification } = useNotification();

  // Toggle visibility of sections
  const toggleInfo = (sectionId: string) => {
    setVisibleSection((prevSection) =>
      prevSection === sectionId ? "" : sectionId,
    );
  };

  // Handle feedback form submission
  const handleFeedbackSend = async () => {
    const firstName = document.getElementById("firstName") as HTMLInputElement;
    const lastName = document.getElementById("lastName") as HTMLInputElement;
    const email = document.getElementById("email") as HTMLInputElement;
    const age = document.getElementById("age") as HTMLInputElement;
    const country = document.getElementById("country") as HTMLInputElement;
    const message = document.getElementById("message") as HTMLTextAreaElement;

    // Validate form fields
    if (
      firstName.value === "" ||
      lastName.value === "" ||
      email.value === "" ||
      age.value === "" ||
      country.value === "" ||
      message.value === ""
    ) {
      setFormValid(false);
      alert("All fields are required.");
      return;
    } else {
      setFormValid(true);
    }

    // Send feedback if form is valid
    if (formValid) {
      const feedbackData = {
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value,
        age: age.value,
        country: country.value,
        message: message.value,
      };

      const success = await sendFeedback(feedbackData);

      if (success) {
        resetForm();
        showNotification("Feedback sent successfully!");
      } else {
        showNotification("Failed to send feedback. Please try again later.");
      }
    }
  };

  // Copy email content to clipboard
  const copyContent = (content: string) => {
    navigator.clipboard.writeText(content);
    setCopiedEmail(content);
    setTimeout(() => setCopiedEmail(null), 1000);
  };

  // Handle email button click
  const emailButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    copyContent(e.currentTarget.textContent as string);
  };

  return (
    <main className="contact px-sect relative flex min-h-svh flex-col items-center overflow-hidden pb-20 pt-20 lg:pb-sect-default lg:pt-20 2xl:pt-40">
      {/* Emailing Section */}
      <motion.section
        initial="hiddenY"
        animate="visible"
        transition={{ duration: 0.5 }}
        variants={variants}
        className="emailing z-20 w-full rounded-xl bg-background-light px-4 pb-4 pt-2 shadow-section dark:bg-background-dark dark:shadow-section-dark md:rounded-2xl md:px-5 md:py-4 lg:rounded-3xl lg:px-8 lg:py-6"
      >
        <div className="flex flex-row items-center justify-between gap-4 border-b pb-3 lg:pb-8">
          <h2 className="h3-md">
            Need assistance planning your next adventure? <br />
            Looking to collaborate with us commercially?
          </h2>
          <motion.button
            whileHover="hoverScale"
            transition={{ duration: 0.4 }}
            whileTap="tapScale"
            animate={visibleSection === "emailing" ? "rotate" : ""}
            variants={variants}
            className={`rounded-full border px-1 md:h-16 md:w-16 lg:h-20 lg:w-20 xl:h-24 xl:w-24 2xl:h-28 2xl:w-28 3xl:h-28 3xl:w-28`}
            title="open btn"
            onClick={() => {
              toggleInfo("emailing");
            }}
          >
            <i className={`ri-arrow-up-line p-large pointer-events-none`}></i>
          </motion.button>
        </div>
        <AnimatePresence mode="popLayout">
          {visibleSection === "emailing" && (
            <div className="overflow-hidden">
              <motion.div
                key="emailingDrop"
                initial="dropHidden"
                animate="visible"
                exit="dropHidden"
                variants={variants}
                transition={{ duration: 0.2, ease: "easeInOut" }}
                className={`flex flex-col gap-2 py-4 lg:py-8`}
              >
                <p className="p-regular">Reach out to us via:</p>
                <div className="flex flex-col gap-1 md:flex-row md:gap-24">
                  <div className="span-medium relative flex items-center">
                    <i className="ri-arrow-right-line mr-4"></i>
                    <button
                      onClick={(e) => {
                        emailButtonClick(e);
                      }}
                      className="underline-btn span-medium"
                    >
                      hello@travelscott.com
                    </button>

                    <AnimatePresence>
                      {copiedEmail === "hello@travelscott.com" && (
                        <motion.div
                          key={copiedEmail}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.5 }}
                          className="absolute -top-full left-1/3 w-fit rounded-md bg-background-light px-3 py-2 shadow-md dark:bg-background-dark-transparent dark:shadow-component-dark"
                        >
                          <p className="span-small">Copied!</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="span-medium relative flex items-center">
                    <i className="ri-arrow-right-line mr-4"></i>
                    <button
                      onClick={(e) => {
                        emailButtonClick(e);
                      }}
                      className="underline-btn span-medium"
                    >
                      dev.manhdo@gmail.com
                    </button>
                    <AnimatePresence>
                      {copiedEmail === "dev.manhdo@gmail.com" && (
                        <motion.div
                          key={copiedEmail}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.5 }}
                          className="absolute -top-full left-1/3 w-fit rounded-md bg-background-light px-3 py-2 shadow-md dark:bg-background-dark-transparent dark:shadow-component-dark"
                        >
                          <p className="span-small">Copied!</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </motion.section>

      {/* Contribute Section */}
      <motion.section
        initial="hiddenY"
        animate="visible"
        transition={{ duration: 0.5, delay: 0.2 }}
        variants={variants}
        className="contribute z-20 w-full rounded-xl bg-background-light px-4 pb-4 pt-2 shadow-section dark:bg-background-dark dark:shadow-section-dark md:rounded-2xl md:px-5 md:py-4 lg:rounded-3xl lg:px-8 lg:py-6"
      >
        <div className="flex flex-row items-center justify-between gap-4 border-b pb-3 lg:pb-8">
          <h2 className="h3-md">Want to share your experience as resource?</h2>
          <motion.button
            whileHover="hoverScale"
            whileTap="tapScale"
            variants={variants}
            transition={{ duration: 0.4 }}
            animate={visibleSection === "contribute" ? "rotate" : ""}
            className={`rounded-full border px-1 md:h-16 md:w-16 lg:h-20 lg:w-20 xl:h-24 xl:w-24 2xl:h-28 2xl:w-28 3xl:h-28 3xl:w-28`}
            title="open btn"
            onClick={() => {
              toggleInfo("contribute");
            }}
          >
            <i className="ri-arrow-up-line p-large pointer-events-none"></i>
          </motion.button>
        </div>
        <AnimatePresence mode="popLayout">
          {visibleSection === "contribute" && (
            <div className="overflow-hidden">
              <motion.div
                key="contributeDrop"
                initial="dropHidden"
                animate="visible"
                exit="dropHidden"
                variants={variants}
                transition={{ duration: 0.2, ease: "easeInOut" }}
                className={`flex flex-col gap-4 py-4 md:flex-row md:items-center md:justify-between md:py-8`}
              >
                <p className="p-regular">
                  We love seeing your cherished memories and believe others will
                  too! <br />
                  Let us help you share them with the world.
                </p>
                <Link to="https://forms.gle/1nLkZA7btyHa22wFA" target="_blank">
                  <button className="underline-btn span-medium flex-grow-1 underline md:no-underline">
                    Follow this link <i className="ri-arrow-right-up-line"></i>
                  </button>
                </Link>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </motion.section>

      {/* Feedback Section */}
      <motion.section
        initial="hiddenY"
        animate="visible"
        transition={{ duration: 0.5, delay: 0.4 }}
        variants={variants}
        className="feedback z-20 w-full rounded-xl bg-background-light px-4 pb-4 pt-2 shadow-section dark:bg-background-dark dark:shadow-section-dark md:rounded-2xl md:px-5 md:py-4 lg:rounded-3xl lg:px-8 lg:py-6"
      >
        <div className="flex flex-row items-center justify-between gap-4 border-b pb-3 lg:pb-8">
          <h2 className="h3-md">Want to give us a feedback?</h2>
          <motion.button
            whileHover="hoverScale"
            whileTap="tapScale"
            variants={variants}
            transition={{ duration: 0.4 }}
            animate={visibleSection === "feedback" ? "rotate" : ""}
            className={`rounded-full border px-1 md:h-16 md:w-16 lg:h-20 lg:w-20 xl:h-24 xl:w-24 2xl:h-28 2xl:w-28 3xl:h-28 3xl:w-28`}
            title="open btn"
            onClick={() => {
              toggleInfo("feedback");
            }}
          >
            <i className="ri-arrow-up-line p-large pointer-events-none"></i>
          </motion.button>
        </div>
        <AnimatePresence mode="popLayout">
          {visibleSection === "feedback" && (
            <div className="overflow-hidden">
              <motion.div
                key="feedbackDrop"
                initial="dropHidden"
                animate="visible"
                exit="dropHidden"
                variants={variants}
                transition={{ duration: 0.2, ease: "easeInOut" }}
                className={`flex flex-row justify-between py-8`}
              >
                <p className="p-regular hidden md:w-1/2 lg:block lg:w-1/2 xl:w-1/2 2xl:w-1/2 3xl:w-1/2">
                  We’re seeking input from global users to enhance its
                  functionality. We believe that collective insights and
                  resources can propel our project forward. Whether who you are,
                  your feedback is crucial. By sharing your thoughts and
                  resources, you become an integral part of our journey towards
                  innovation. Together, let’s shape an application that
                  resonates with people from every corner of the world.
                </p>

                <form
                  action=""
                  className="flex w-[90%] flex-col gap-8 pt-2 md:w-4/5 lg:w-2/5 lg:gap-12 lg:pt-8"
                >
                  <StyledInput type="text" id="firstName" label="First name" />
                  <StyledInput type="text" id="lastName" label="Last name" />
                  <StyledInput type="email" id="email" label="Email address" />
                  <StyledInput type="text" id="age" label="Age" />
                  <StyledInput type="text" id="country" label="Country" />

                  <div className="flex w-full flex-col">
                    <label htmlFor="message" className="span-regular">
                      What you want to tell us
                    </label>
                    <textarea
                      id="message"
                      rows={6}
                      className="p-regular rounded-lg border bg-transparent pl-2 pt-1 outline-none"
                    ></textarea>
                  </div>
                  <SecondaryButton
                    onClick={handleFeedbackSend}
                    text="Send it"
                    type="button"
                  ></SecondaryButton>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </motion.section>

      {/* Animated Blobs */}
      <motion.div
        initial="hidden"
        animate="blobAnimation"
        variants={variants}
        layout
        className="blur-blob blob-brown -left-[10%] top-[5%] h-[40%] w-[30%] opacity-100 dark:opacity-60"
      ></motion.div>
      <motion.div
        initial="hidden"
        animate="blobAnimation"
        variants={variants}
        layout
        className="blur-blob blob-green -right-[10%] bottom-[20%] h-[40%] w-[30%] opacity-60 dark:opacity-40"
      ></motion.div>
    </main>
  );
};

export default memo(Contact);