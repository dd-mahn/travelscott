import React, { memo, useState } from "react";
import "src/styles/contact.css";
import { AnimatePresence, motion } from "framer-motion";

import { BASE_URL } from "src/utils/config";
import { resetForm } from "src/utils/resetForm";
import StyledInput from "src/common/StyledInput";
import { SecondaryButton } from "src/common/Button";
import {
  HoverVariants,
  TapVariants,
  VisibilityVariants,
} from "src/utils/variants";

const variants = {
  hiddenY: VisibilityVariants.hiddenY,
  visible: VisibilityVariants.visible,
  dropHidden: VisibilityVariants.dropHidden,
  hoverScale: HoverVariants.hoverScale,
  tapScale: TapVariants.tapScale,
  rotate: VisibilityVariants.rotate,
};

const Contact: React.FC = () => {
  const [visibleSection, setVisibleSection] = useState("");
  const [formValid, setFormValid] = useState(false);

  const toggleInfo = (sectionId: string) => {
    setVisibleSection((prevSection) =>
      prevSection === sectionId ? "" : sectionId,
    );
  };

  const handleFeedbackSend = async () => {
    // handle feedback form submission
    const firstName = document.getElementById("firstName") as HTMLInputElement;
    const lastName = document.getElementById("lastName") as HTMLInputElement;
    const email = document.getElementById("email") as HTMLInputElement;
    const age = document.getElementById("age") as HTMLInputElement;
    const country = document.getElementById("country") as HTMLInputElement;
    const message = document.getElementById("message") as HTMLTextAreaElement;

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

    // send feedback data to backend
    if (formValid) {
      try {
        const feedbackData = {
          firstName: firstName.value,
          lastName: lastName.value,
          email: email.value,
          age: age.value,
          country: country.value,
          message: message.value,
        };

        const res = await fetch(`${BASE_URL}/feedback`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(feedbackData),
        });

        if (res.ok) {
          alert("Feedback sent successfully!");
          resetForm();
        } else {
          alert("Failed to send feedback. Please try again later.");
        }
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message);
        } else {
          console.error("An error occurred while processing your request.");
        }
      }
    }
  };

  return (
    <main className="contact px-sect relative flex flex-col items-center pb-sect-default lg:pt-20 2xl:pt-40">
      <motion.section
        initial="hiddenY"
        animate="visible"
        transition={{ duration: 0.5 }}
        variants={variants}
        className="emailing z-20 w-full rounded-3xl bg-background-light px-12 py-8 shadow-section"
      >
        <div className="flex flex-row items-center justify-between border-b pb-8">
          <h2 className="h2-md">
            Need assistance planning your next adventure? <br />
            Looking to collaborate with us commercially?
          </h2>
          <motion.button
            whileHover="hoverScale"
            transition={{ duration: 0.4 }}
            whileTap="tapScale"
            animate={visibleSection === "emailing" ? "rotate" : ""}
            variants={variants}
            className={`rounded-full border lg:h-20 lg:w-20 xl:h-24 xl:w-24 2xl:h-28 2xl:w-28 3xl:h-28 3xl:w-28`}
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
                // className={`${visibleSection === "emailing" ? "flex" : "hiddenY"} flex-col gap-2 py-8`}
                className={`flex flex-col gap-2 py-8`}
              >
                <p className="p-regular">Reach out to us via:</p>
                <div className="flex flex-row gap-24">
                  <div className="span-medium flex items-center">
                    <i className="ri-arrow-right-line mr-4"></i>
                    <button className="underline-btn">
                      hello@travelscott.com
                    </button>
                  </div>
                  <div className="span-medium flex items-center">
                    <i className="ri-arrow-right-line mr-4"></i>
                    <button className="underline-btn p-large">
                      dev.manhdo@gmail.com
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </motion.section>

      <motion.section
        initial="hiddenY"
        animate="visible"
        transition={{ duration: 0.5, delay: 0.2 }}
        variants={variants}
        className="contribute z-20 w-full rounded-3xl bg-background-light px-12 py-8 shadow-section"
      >
        <div className="flex flex-row items-center justify-between border-b pb-8">
          <h2 className="h2-md">Want to share your experience as resource?</h2>
          <motion.button
            whileHover="hoverScale"
            whileTap="tapScale"
            variants={variants}
            transition={{ duration: 0.4 }}
            animate={visibleSection === "contribute" ? "rotate" : ""}
            className={`rounded-full border lg:h-20 lg:w-20 xl:h-24 xl:w-24 2xl:h-28 2xl:w-28 3xl:h-28 3xl:w-28`}
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
                // className={`${visibleSection === "contribute" ? "flex" : "hiddenY"} flex flex-row items-center justify-between py-8`}
                className={`flex flex-row items-center justify-between py-8`}
              >
                <p className="p-regular">
                  We love seeing your cherished memories and believe others will
                  too! <br />
                  Let us help you share them with the world.
                </p>
                <button className="underline-btn">
                  Follow this link <i className="ri-arrow-right-up-line"></i>
                </button>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </motion.section>

      <motion.section
        initial="hiddenY"
        animate="visible"
        transition={{ duration: 0.5, delay: 0.4 }}
        variants={variants}
        className="feedback z-20 w-full rounded-3xl bg-background-light px-12 py-8 shadow-section"
      >
        <div className="flex flex-row items-center justify-between border-b pb-8">
          <h2 className="h2-md">Want to give us a feedback?</h2>
          <motion.button
            whileHover="hoverScale"
            whileTap="tapScale"
            variants={variants}
            transition={{ duration: 0.4 }}
            animate={visibleSection === "feedback" ? "rotate" : ""}
            className={`rounded-full border lg:h-20 lg:w-20 xl:h-24 xl:w-24 2xl:h-28 2xl:w-28 3xl:h-28 3xl:w-28`}
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
                // className={`${visibleSection === "feedback" ? "flex" : "hiddenY"} flex flex-row justify-between py-8`}
                className={`flex flex-row justify-between py-8`}
              >
                <p className="p-regular lg:w-1/2 xl:w-1/2 2xl:w-1/2 3xl:w-1/2">
                  We’re seeking input from global users to enhance its
                  functionality. We believe that collective insights and
                  resources can propel our project forward. Whether who you are,
                  your feedback is crucial. By sharing your thoughts and
                  resources, you become an integral part of our journey towards
                  innovation. Together, let’s shape an application that
                  resonates with people from every corner of the world.
                </p>

                <form action="" className="flex w-2/5 flex-col gap-12 pt-8">
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
                  ></SecondaryButton>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </motion.section>

      <motion.div
        layout
        className="blur-blob blob-brown -left-[10%] top-[5%] h-[40%] w-[30%] opacity-100"
      ></motion.div>
      <motion.div
        layout
        className="blur-blob blob-green -right-[10%] bottom-[20%] h-[40%] w-[30%] opacity-60"
      ></motion.div>
    </main>
  );
};

export default memo(Contact);
