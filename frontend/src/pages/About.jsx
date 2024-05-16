import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import "../styles/about.css";
import aboutIcons from "../assets/svg/about-icons.svg";
import MarqueeSlider from "react-marquee-slider";
import circle from "../assets/circle-alt.png";
import aboutVideo1 from "../assets/about-1.mp4";
import aboutVideo2 from "../assets/about-2.mp4";
import aboutProfile from "../assets/about-profile.jpg";
import AboutSphere from "../common/AboutSphere";
// import Circle from "../common/Circle";

function About() {
  function toggle(e) {
    const creditsDiv = document.querySelector(".credit");
    const someWordsDiv = document.querySelector(".some__words");

    if (e.target.textContent === "SOME WORDS") {
      const creditsButton = e.target.nextElementSibling;
      creditsButton.classList.add("disabled");
      e.target.classList.remove("disabled");
      someWordsDiv.classList.remove("d-off");
      creditsDiv.classList.add("d-off");
    } else if (e.target.textContent === "CREDITS") {
      const someWordsButton = e.target.previousElementSibling;
      someWordsButton.classList.add("disabled");
      e.target.classList.remove("disabled");
      creditsDiv.classList.remove("d-off");
      someWordsDiv.classList.add("d-off");
    }
  }

  return (
    <div className="about-section">
      <section className="about__hero">
        <Container className="w-100">
          <Row className="flex justify-between">
            <Col className="">
              <h1>
                Ignite your <br></br> travel <span>inspiration</span>.
              </h1>
              <p>
                This platform is a canvas for your travel dreams, awakening the
                adventurer within. It celebrates creativity, inspiring journeys,
                and resonating stories. We invite you to explore our curated
                experiences, a mosaic of the world's beauty. Join us to discover
                the essence of travel and inspire your next odyssey. Let's
                embark on this voyage together.
              </p>
            </Col>
            <Col>
              <img src={aboutIcons} alt="About Icons" />
            </Col>
          </Row>
        </Container>
      </section>
      <section className="about__hook">
        <Container>
          <Row className="flex justify-center relative">
            <img src={circle} alt="circle" className="w-1/2" />
            {/* <AboutSphere/> */}
            <div className="absolute bg-transparent flex justify-between">
              <h1>EXCITING</h1>
              <h1>CREATIVE</h1>
              <h1>AUTHENTIC</h1>
            </div>
          </Row>
          <Row className="mt-40 font-medium">
            <a>
              Scroll <i className="ri-arrow-down-line"></i>
            </a>
          </Row>
        </Container>
      </section>
      <section className="about__feature">
        <Container>
          <h1>FEATURES</h1>
          <Row className="flex">
            <Col className="w-3/5 flex flex-col">
              <video src={aboutVideo1} autoPlay loop muted></video>
              <h2 className="font-semibold">Travel Personality Test</h2>
              <p>
                Choose your own way, let your emotions guide your journey.
                Question-based analysis of your travel spirit leads to bespoke
                destination suggestions that promise an unforgettable
                experience.{" "}
              </p>
            </Col>
            <Col className="w-3/5 flex flex-col">
              <video src={aboutVideo2} autoPlay loop muted></video>
              <h2 className="font-semibold">Destination Catalogue</h2>
              <p>
                Our virtual gallery of global travel destinations. Each
                destination is presented with stunning imagery and essential
                details from various sources, making it easy to plan your next
                adventure. Whether you’re seeking inspiration or ready to book
                your trip, our gallery is your passport to discovering the most
                worthwhile visits.
              </p>

              <a className="underline font-medium mt-20" href="/discover">
                DISCOVER THEM <i className="ri-arrow-right-line"></i>
              </a>
            </Col>
            <Col>
              <i class="ri-shining-2-fill"></i>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="about__credit relative">
        <img src={circle} alt="circle" className="absolute top-0 left-0" />
        <img src={circle} alt="circle" className="absolute bot-0 right-0" />
        <Container>
          <Row className="flex justify-between">
            <Col className="z-10">
              <div className="some__words bg-inherit flex flex-col">
                <p>
                  “I created and developed this website fueled by my passion for
                  travel and creativity. I was truly inspired by a famous
                  personality test in 2023; it was quite impressive and sparked
                  a significant surge in my imagination at that time. Thus, I
                  began to create one myself, albeit with a different purpose. I
                  love to travel, and I wish to share this joy with everyone. I
                  hope you find my website useful, and don’t forget to enjoy it
                  :). ”
                </p>
                <div className="flex gap-4">
                  <img src={aboutProfile} alt="avatar" />
                  <div className="flex flex-col">
                    <strong>Manh Do</strong>
                    <span>@godsadeser</span>
                  </div>
                </div>
              </div>
              <div className="credit d-off flex flex-col">
                <p>
                  This website is a project by Manh Do, a student at the
                  National Economic University, NEU-Hanoi.
                </p>
                <p>
                  The website is built using ReactJS, with the help of various
                  libraries and tools. The project is a showcase of the
                  student’s skills in web development, and it is not intended
                  for commercial purposes.
                </p>
                <p>
                  The website is a work in progress, and it may be updated in
                  the future with new features and improvements. The student
                  welcomes feedback and suggestions from users to help improve
                  the website.
                </p>
                <p className="font-medium uppercase">
                  The website content sources will be soon updated here.
                </p>
              </div>
            </Col>
            <Col className="flex bg-transparent flex-col items-start z-10">
              <button onClick={toggle}>SOME WORDS</button>
              <button className="disabled" onClick={toggle}>
                CREDITS
              </button>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
}

export default About;
