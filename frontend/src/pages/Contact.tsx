import React, { useState } from "react";
import planeIcon from "src/assets/svg/plane-icon.svg";
import StyledInput from "src/components/ui/StyledInput";
import "src/styles/contact.css";
import { BASE_URL } from "src/utils/config";

const Contact: React.FC = () => {
  const [visibleSection, setVisibleSection] = useState("");
  const [formValid, setFormValid] = useState(false);

  const toggleInfo = (sectionId: string) => {
    setVisibleSection((prevSection) =>
      prevSection === sectionId ? "" : sectionId,
    );
  };

  const resetForm = () => {
    const firstName = document.getElementById("firstName") as HTMLInputElement;
    const lastName = document.getElementById("lastName") as HTMLInputElement;
    const email = document.getElementById("email") as HTMLInputElement;
    const age = document.getElementById("age") as HTMLInputElement;
    const country = document.getElementById("country") as HTMLInputElement;
    const message = document.getElementById("message") as HTMLTextAreaElement;

    firstName.value = "";
    lastName.value = "";
    email.value = "";
    age.value = "";
    country.value = "";
    message.value = "";
  }

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
      return
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
    <main className="contact px-sect relative flex flex-col items-center pb-sect-default lg:pt-20 2xl:pt-60">
      <section className="emailing z-20 w-full rounded-3xl bg-background-light px-12 py-8 shadow-section">
        <div className="flex flex-row items-center justify-between border-b pb-8">
          <h2 className="h2-md">
            Need assistance planning your next adventure? <br />
            Looking to collaborate with us commercially?
          </h2>
          <button
            className={`${visibleSection === "emailing" ? "rotate-180" : ""} rounded-full border transition-all lg:h-20 lg:w-20 xl:h-24 xl:w-24 2xl:h-28 2xl:w-28 3xl:h-28 3xl:w-28`}
            title="open btn"
            onClick={() => {
              toggleInfo("emailing");
            }}
          >
            <i className="ri-arrow-up-line p-large"></i>
          </button>
        </div>
        <div
          className={`${visibleSection === "emailing" ? "flex" : "hidden"} flex-col gap-2 py-8`}
        >
          <p className="p-regular">Reach out to us via:</p>
          <div className="flex flex-row gap-24">
            <div className="span-medium flex items-center">
              <i className="ri-arrow-right-line mr-4"></i>
              <button className="underline-btn">hello@travelscott.com</button>
            </div>
            <div className="span-medium flex items-center">
              <i className="ri-arrow-right-line mr-4"></i>
              <button className="underline-btn p-large">
                dev.manhdo@gmail.com
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="contribute z-20 w-full rounded-3xl bg-background-light px-12 py-8 shadow-section">
        <div className="flex flex-row items-center justify-between border-b pb-8">
          <h2 className="h2-md">Want to share your experience as resource?</h2>
          <button
            className={`${visibleSection === "contribute" ? "rotate-180" : ""} rounded-full border transition-all lg:h-20 lg:w-20 xl:h-24 xl:w-24 2xl:h-28 2xl:w-28 3xl:h-28 3xl:w-28`}
            title="open btn"
            onClick={() => {
              toggleInfo("contribute");
            }}
          >
            <i className="ri-arrow-up-line p-large"></i>
          </button>
        </div>
        <div
          className={`${visibleSection === "contribute" ? "flex" : "hidden"} flex flex-row items-center justify-between py-8`}
        >
          <p className="p-regular">
            We love seeing your cherished memories and believe others will too!{" "}
            <br />
            Let us help you share them with the world.
          </p>
          <button className="underline-btn">
            Follow this link <i className="ri-arrow-right-up-line"></i>
          </button>
        </div>
      </section>

      <section className="feedback z-20 w-full rounded-3xl bg-background-light px-12 py-8 shadow-section">
        <div className="flex flex-row items-center justify-between border-b pb-8">
          <h2 className="h2-md">Want to give us a feedback?</h2>
          <button
            className={`${visibleSection === "feedback" ? "rotate-180" : ""} rounded-full border transition-all lg:h-20 lg:w-20 xl:h-24 xl:w-24 2xl:h-28 2xl:w-28 3xl:h-28 3xl:w-28`}
            title="open btn"
            onClick={() => {
              toggleInfo("feedback");
            }}
          >
            <i className="ri-arrow-up-line p-large"></i>
          </button>
        </div>
        <div
          className={`${visibleSection === "feedback" ? "flex" : "hidden"} flex flex-row justify-between py-8`}
        >
          <p className="p-regular lg:w-1/2 xl:w-1/2 2xl:w-1/2 3xl:w-1/2">
            We’re seeking input from global users to enhance its functionality.
            We believe that collective insights and resources can propel our
            project forward. Whether who you are, your feedback is crucial. By
            sharing your thoughts and resources, you become an integral part of
            our journey towards innovation. Together, let’s shape an application
            that resonates with people from every corner of the world.
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

            <button type="button" className="btn btn-secondary" onClick={handleFeedbackSend}>
              Send it <img src={planeIcon} alt="" />
            </button>
          </form>
        </div>
      </section>

      <div className="blur-blob blob-1 absolute z-0"></div>
      <div className="blur-blob blob-2 absolute z-0"></div>
    </main>
  );
};

export default Contact;
