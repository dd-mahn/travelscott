import React from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import circle from "../assets/circle-alt.png";
import circleSVG from "../assets/svg/hero-circle.svg";
import HeroImg from "../assets/svg/hero-img.svg";
import AboutVideo from "../assets/videos/home-about.mp4";
import "../styles/home.css";
import Gallery from "./HomeComponents/Gallery";
import StarButton from "../components/ui/StarButton";
import { BASE_URL } from "../utils/config";
import StarButtonForm from "../components/ui/StarButtonForm";

const Home = () => {
  const sendFeedback = async () => {
    // Get the form data
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("feedback").value;

    // Create the feedback object
    const feedback = {
      name: name,
      email: email,
      message: message,
    };

    try {
      const response = await fetch(`${BASE_URL}/feedback`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(feedback),
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        alert("Thank you for submitting your feedback!");

        // Clear the form after submitting feedback
        document.getElementById("name").value = "";
        document.getElementById("email").value = "";
        document.getElementById("feedback").value = "";
      } else {
        alert("Error: " + response.status);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {/* Hero start */}
      <section className="hero">
        <Container>
          <Row className="flex justify-between">
            <Col className="hero__heading flex flex-col">
              <h1>
                <span>EXPLORE</span> <br /> like never before.
              </h1>
              {/* <a href="/discover" className="start__btn btn">
                GET STARTED
              </a> */}
              {/* <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                facilisis eros diam, in tempor sem cursus nec. Vivamus
                facilisis, dui.
              </p> */}
              <StarButton title="GET STARTED" link="/destinations" />
            </Col>
            <Col className="hero__circle">
              {/* <HeroSphere/> */}
              <img src={circleSVG} alt="" />
              <img src={HeroImg} alt="Hero Img" />
            </Col>
          </Row>
        </Container>
      </section>
      {/* Hero end */}

      {/* About start */}
      <section className="about">
        <Container>
          <Row className="about__heading flex">
            <Col className="arrow">
              <i className="ri-arrow-right-line"></i>
            </Col>
            <Col className="heading">
              <p>
                A <strong>Comprehensive Catalogue</strong> of <br />
                Destinations with Tailored Travel Insights
              </p>
            </Col>
          </Row>
          <Row className="about__video flex justify-between">
            <Col className="video">
              <video src={AboutVideo} autoPlay loop muted></video>
            </Col>
            <Col className="description flex flex-col">
              <p>
                Let your emotions guide your journey. Question-based analysis of
                your travel spirit leads to bespoke destination and plan
                suggestions that promise an unforgettable experience.
              </p>
              <p>
                Or directly step into our virtual gallery of global travel
                destinations. Each destination is presented with stunning
                imagery and essential details, making it easy to plan your next
                adventure. Whether you’re seeking inspiration or ready to book
                your trip, our gallery is your passport to discovering the most
                worthwhile visits.
              </p>
              {/* <p>
                <strong>Manh Do</strong> <br /> @godsadeser
              </p> */}
            </Col>
          </Row>
        </Container>
      </section>
      {/* About end */}

      {/* Gallery Start */}
      <Gallery />
      {/* Gallery End */}

      {/* Quote start */}
      <section className="quote">
        <Container>
          <Row className="quote__main flex justify-between">
            <Col className="content">
              <p>
                “TO
                <i class="ri-footprint-fill"></i>
                <span>TRAVEL</span>
                <br />
                IS TO <span>LIVE</span>
                <i class="ri-sun-line"></i>.”
              </p>
            </Col>
            <Col className="author flex items-end py-4">
              <span>- HANS CHRISTIAN ANDERSEN</span>
            </Col>
          </Row>
          <Row className="quote__button flex justify-end">
            <StarButton title="TAKE YOUR FIRST FOOTSTEP" link="/test" />
          </Row>
        </Container>
      </section>
      {/* Quote end */}

      {/* Contribution start */}
      <section className="contribution relative">
        <img
          src={circleSVG}
          alt="circle"
          className="absolute bot-0 right-0 z-0"
        />
        <Container className="flex flex-col z-10">
          <Row className="contribution__heading grid place-content-center">
            <h1>
              Contribution <i class="ri-shining-2-fill"></i>
            </h1>
          </Row>
          <Row className="contribution__form flex justify-between ">
            <Col>
              <Form className="form flex flex-col relative z-10">
                <Form.Group controlId="name">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your name"
                    required
                  />
                </Form.Group>

                <Form.Group controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter your email"
                    required
                  />
                </Form.Group>

                <Form.Group controlId="feedback">
                  <Form.Label>Message</Form.Label>
                  <Form.Control
                    as="textarea"
                    required
                    placeholder="What you want to improve?"
                  />
                </Form.Group>

                {/* <button type="button" className="submit__btn btn btn-color-2" onClick={sendFeedback}>Submit</button> */}
                <StarButtonForm title="Submit" callback={sendFeedback} />
              </Form>
            </Col>
            <Col className="form-side flex flex-col items-start justify-start">
              <h1>Submit your feedback</h1>
              <p>
                The application is currently in its development phase and we’re
                seeking input from global users to enhance its functionality. We
                believe that collective insights and resources can propel our
                project forward. Whether you’re a developer, an user, or just
                someone with a keen interest in travel, your feedback is
                crucial. By sharing your thoughts and resources, you become an
                integral part of our journey towards innovation. Together, let’s
                shape an application that resonates with people from every
                corner of the world.
              </p>
            </Col>
          </Row>
          <Row className="contribution__other flex justify-between">
            <h1>
              or share your preferred <br /> travel destinations and ideas with
              us.
            </h1>
            <button className="bg-inherit underline__btn">
              Follow this link <i class="ri-arrow-right-up-line"></i>
            </button>
          </Row>
        </Container>
      </section>
      {/* Contribution end */}
    </>
  );
};

export default Home;
