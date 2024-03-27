import React from "react";
import "./footer.css";
import { Container, Row, Col } from "react-bootstrap";
import { NavLink, Link, useNavigate } from "react-router-dom";

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
    path: "/contact",
    display: "Contact",
  },
];

const socials = [
  {
    path: "/",
    display: "Github",
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
    display: "LinkedIn",
  },
];

const legal = [
  {
    path: "/",
    display: "Privacy Policy",
  },
  {
    path: "/",
    display: "Terms of Service",
  },
  {
    path: "/",
    display: "Cookie Policy",
  },
  {
    path: "/",
    display: "Legal",
  },
];

const Footer = () => {
  return (
    <footer>
      <Container className="flex flex-col gap-24">
        <Row className="flex justify-between">
          <Col lg="4" className="flex gap-12">
            <Col lg="4" className="flex flex-col justify-start gap-4">
              <h1>Sitemap</h1>
              <ul>
                {sitemap.map((item, index) => (
                  <li key={index}>
                    <NavLink to={item.path}>{item.display}</NavLink>
                  </li>
                ))}
              </ul>
            </Col>
            <Col lg="4" className="flex flex-col justify-start gap-4">
              <h1>Socials</h1>
              <ul>
                {socials.map((item, index) => (
                  <li key={index}>
                    <NavLink to={item.path}>{item.display}</NavLink>
                  </li>
                ))}
              </ul>
            </Col>
            <Col lg="4" className="flex flex-col justify-start gap-4">
              <h1>Legal</h1>
              <ul>
                {legal.map((item, index) => (
                  <li key={index}>
                    <NavLink to={item.path}>{item.display}</NavLink>
                  </li>
                ))}
              </ul>
            </Col>
          </Col>
          <Col lg="6" className="flex flex-col gap-4">
            {/* <p>© 2024 TravelScott. All Rights Reserved</p> */}
            <span>dev.manhdo@gmail.com</span>
          </Col>
        </Row>
        <Row className="flex justify-between items-end">
          <Col>
            <h1 className="font-kaushan">TravelScott</h1>
          </Col>
          <Col>
            <button onClick={() => window.scrollTo(0, 0)}>
              <NavLink to={"/"}>
                BACK TO TOP <i class="ri-arrow-up-line"></i>
              </NavLink>
            </button>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
