import React from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import HeroCircle from "../assets/hero-circle.svg";
import HeroImg from "../assets/hero-img.svg";
import AboutVideo from "../assets/home-about.mp4";
import "../styles/home.css";
import Gallery from "./HomeComponents/Gallery";

const Home = () => {
  return (
    <>
      {/* Hero start */}
      <section className="hero">
        <Container>
          <Row className="flex">
            <Col lg="4" className="hero__content">
              <h1>
                <span>EXPLORE</span> LIKE <br /> NEVER BEFORE
              </h1>
              <button className="start__btn btn">GET STARTED</button>
            </Col>
            <Col lg="8" className="hero__circle">
              <img src={HeroCircle} alt="circle" />
              <img src={HeroImg} alt="Hero Img" />
            </Col>
          </Row>
        </Container>
      </section>
      {/* Hero end */}

      {/* About start */}
      <section className="about">
        <Container>
          <Row className="flex justify-between mb-40 row-1">
            <Col lg="2">
              <i className="ri-arrow-right-line"></i>
            </Col>
            <Col lg="8">
              <p>
                {" "}
                A <strong>Comprehensive Catalogue</strong> of <br />{" "}
                Destinations with Tailored Travel Insights
              </p>
            </Col>
          </Row>
          <Row className="flex justify-between gap-20 row-2">
            <Col lg="6">
              <video src={AboutVideo} autoPlay loop muted></video>
            </Col>
            <Col lg="4" className="flex flex-col gap-6">
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
              <p>
                <strong>Manh Do</strong> <br /> @godsadeser
              </p>
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
          <Row className="flex justify-between">
            <Col lg="6">
              <p>
                “TO
                <i class="ri-footprint-fill"></i>
                <span>TRAVEL</span>
                <br />
                IS TO <span>LIVE</span>
                <i class="ri-sun-line"></i>.”
              </p>
            </Col>
            <Col lg="4" className="flex items-end py-4">
              <span>- HANS CHRISTIAN ANDERSEN</span>
            </Col>
          </Row>
          <Row className="flex justify-end">
            <button className="start__btn btn">TAKE YOUR FIRST FOOTSTEP</button>
          </Row>
        </Container>
      </section>
      {/* Quote end */}

      {/* Contribution start */}
      <section className="contribution">
        <Container className="flex flex-col gap-20">
          <Row
            className="grid place-content-center
                    "
          >
            <h1>
              Contribution <i class="ri-shining-2-fill"></i>
            </h1>
          </Row>
          <Row className="flex justify-between gap-28">
            <Col lg="6">
              <Form className="form flex flex-col gap-4">
                <Form.Group controlId="name">
                  <Form.Label>Name*</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your name"
                    required
                  />
                </Form.Group>

                <Form.Group controlId="email">
                  <Form.Label>Email*</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter your email"
                    required
                  />
                </Form.Group>

                <Form.Group controlId="feedback">
                  <Form.Label>Message*</Form.Label>
                  <Form.Control
                    as="textarea"
                    required
                    placeholder="What you want to improve?"
                  />
                </Form.Group>

                <button className="submit__btn btn btn-color-2">Submit</button>
              </Form>
            </Col>
            <Col
              lg="6"
              className="form-side flex flex-col items-start justify-start gap-8"
            >
              <h1>Submit your feedback</h1>
              <p>
                The application is currently in its development phase and we’re
                seeking input from global users to enhance its functionality. We
                believe that collective insights and resources can propel our
                project forward. Whether you’re a developer, a user, or just
                someone with a keen interest in travel, your feedback is
                crucial. By sharing your thoughts and resources, you become an
                integral part of our journey towards innovation. Together, let’s
                shape an application that resonates with people from every
                corner of the world.
              </p>
            </Col>
          </Row>
          <Row className="flex justify-between mt-40">
            <h1>
              or share your preferred <br /> travel destinations and ideas with
              us.
            </h1>
            <button className="border-none bg-inherit underline">
              FOLLOW THIS LINK
            </button>
          </Row>
        </Container>
      </section>
      {/* Contribution end */}
    </>
  );
};

export default Home;
