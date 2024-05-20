import React from "react";
import "remixicon/fonts/remixicon.css";
import "./header.css";
import { Container, Row, Col } from "react-bootstrap";
import { NavLink, Link, useNavigate } from "react-router-dom";

const navs = [
  {
    path: "/about",
    display: "About",
  },
  {
    path: "/destinations",
    display: "Discover",
  },
  {
    path: "/contact",
    display: "Contact",
  },
];
const Header = () => {
  return (
    <Container className="header">
      <Row className="flex justify-between items-center ">
        <Col>
          <NavLink to={"/"}>
            <h1 className="font-kaushan">TravelScott</h1>
          </NavLink>
        </Col>
        <Col>
          <ul className="flex flex-row justify-between">
            {navs.map((item, index) => (
              <li className="nav__item " key={index}>
                <NavLink
                  to={item.path}
                  className=""
                  activeClassName="active__link"
                >
                  {item.display}
                </NavLink>
              </li>
            ))}
          </ul>
        </Col>
        <Col className="">
          {/* <button className="mr-4">
            <i class="ri-search-2-line"></i>
          </button> */}
          <button className="">
            <i className="ri-contrast-2-fill"></i>
          </button>
        </Col>
      </Row>
    </Container>
  );
};

export default Header;
