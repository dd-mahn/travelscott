import React from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import circle from "../assets/circle-alt.png";
import HeroImg from "../assets/svg/hero-img.svg";
import AboutVideo from "../assets/home-about.mp4";
import "../styles/home.css";
import Gallery from "./HomeComponents/Gallery";
import { Navigate } from "react-router-dom";
import HeroSphere from "../common/HeroSphere";

const Home = () => {
  return (
    <>
      {/* Hero start */}
      <section className="hero">
        <Container>
          <Row className="flex justify-between">
            <Col className="hero__content">
              <h1>
                <span>EXPLORE</span> LIKE <br /> NEVER BEFORE
              </h1>
              <a href="/discover" className="start__btn btn">
                GET STARTED
              </a>
            </Col>
            <Col className="hero__circle">
              {/* <HeroSphere/> */}
              <img src={circle} alt="" />
              <img src={HeroImg} alt="Hero Img" />
              
            </Col>
          </Row>
        </Container>
      </section>
      {/* Hero end */}

      {/* About start */}
      <section className="about">
        <Container>
          <Row className="flex justify-between">
            <Col>
              <i className="ri-arrow-right-line"></i>
            </Col>
            <Col className="">
              <p>
                A <strong>Comprehensive Catalogue</strong> of <br />
                Destinations with Tailored Travel Insights
              </p>
            </Col>
          </Row>
          <Row className="flex justify-between">
            <Col>
              <video src={AboutVideo} autoPlay loop muted></video>
            </Col>
            <Col className="flex flex-col">
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
          <Row className="flex justify-between">
            <Col>
              <p>
                “TO
                <i class="ri-footprint-fill"></i>
                <span>TRAVEL</span>
                <br />
                IS TO <span>LIVE</span>
                <i class="ri-sun-line"></i>.”
              </p>
            </Col>
            <Col className="flex items-end py-4">
              <span>- HANS CHRISTIAN ANDERSEN</span>
            </Col>
          </Row>
          <Row className="flex justify-end">
            <a href="/test" className="start__btn btn">
              TAKE YOUR FIRST FOOTSTEP
            </a>
          </Row>
        </Container>
      </section>
      {/* Quote end */}

      {/* Contribution start */}
      <section className="contribution relative">
        <img
          src={circle}
          alt="circle"
          className="absolute bot-0 right-0 z-0"
        />
        <Container className="flex flex-col z-10">
          <Row className="grid place-content-center">
            <h1>
              Contribution <i class="ri-shining-2-fill"></i>
            </h1>
          </Row>
          <Row className="flex justify-between">
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

                <button className="submit__btn btn btn-color-2">Submit</button>
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
          <Row className="flex justify-between">
            <h1>
              or share your preferred <br /> travel destinations and ideas with
              us.
            </h1>
            <button className="border-none bg-inherit underline">
              FOLLOW THIS LINK <i class="ri-arrow-right-up-line"></i>
            </button>
          </Row>
        </Container>
      </section>
      {/* Contribution end */}
    </>
  );
};

export default Home;
